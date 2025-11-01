import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { z } from "zod"

const checkScheduleSchema = z.object({
  taId: z.string().min(1),
  courseId: z.string().min(1),
  hours: z.number().int().positive(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { taId, courseId, hours } = checkScheduleSchema.parse(body)

    // Get TA's current assignments
    const ta = await db.teachingAssistant.findUnique({
      where: { id: taId },
      include: {
        assignments: true,
      },
    })

    if (!ta) {
      return NextResponse.json(
        { error: "TA not found" },
        { status: 404 }
      )
    }

    // Calculate current hours
    const currentHours = ta.assignments.reduce((sum: number, a: { hours: number }) => sum + a.hours, 0)
    const totalHours = currentHours + hours

    // Check if TA would exceed max hours
    const conflicts: string[] = []
    const warnings: string[] = []

    if (totalHours > ta.maxHours) {
      conflicts.push(
        `TA would exceed maximum hours (${totalHours}/${ta.maxHours})`
      )
    }

    // Check if TA is already assigned to this course
    const existingAssignment = ta.assignments.find(
      (a: { courseId: string }) => a.courseId === courseId
    )
    if (existingAssignment) {
      conflicts.push("TA is already assigned to this course")
    }

    // Check course capacity
    const course = await db.course.findUnique({
      where: { id: courseId },
      include: {
        assignments: true,
      },
    })

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      )
    }

    if (course.assignments.length >= course.capacity) {
      conflicts.push(
        `Course is at capacity (${course.assignments.length}/${course.capacity})`
      )
    }

    // Add warnings
    if (totalHours > ta.maxHours * 0.8) {
      warnings.push(
        `TA will be at ${Math.round((totalHours / ta.maxHours) * 100)}% capacity`
      )
    }

    return NextResponse.json({
      canAssign: conflicts.length === 0,
      conflicts,
      warnings,
      details: {
        currentHours,
        newTotalHours: totalHours,
        maxHours: ta.maxHours,
        courseCapacity: course.capacity,
        currentCourseAssignments: course.assignments.length,
      },
    })
  } catch (error) {
    console.error("Error checking schedule:", error)
    return NextResponse.json(
      { error: "Failed to check schedule" },
      { status: 400 }
    )
  }
}
