import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { createAssignmentSchema } from "@/lib/validators"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get("courseId")
    const taId = searchParams.get("taId")

    const where: any = {}
    if (courseId) where.courseId = courseId
    if (taId) where.taId = taId

    const assignments = await db.assignment.findMany({
      where,
      include: {
        course: true,
        ta: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ assignments })
  } catch (error) {
    console.error("Error fetching assignments:", error)
    return NextResponse.json(
      { error: "Failed to fetch assignments" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = createAssignmentSchema.parse(body)

    const assignment = await db.assignment.create({
      data: validated,
      include: {
        course: true,
        ta: {
          include: {
            user: true,
          },
        },
      },
    })

    return NextResponse.json({ assignment }, { status: 201 })
  } catch (error) {
    console.error("Error creating assignment:", error)
    return NextResponse.json(
      { error: "Failed to create assignment" },
      { status: 400 }
    )
  }
}
