import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createCourseSchema } from "@/lib/validators"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const term = searchParams.get("term")

    const where = term ? { term } : {}

    const courses = await prisma.course.findMany({
      where,
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ courses })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = createCourseSchema.parse(body)

    const course = await prisma.course.create({
      data: validated,
    })

    return NextResponse.json({ course }, { status: 201 })
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 400 }
    )
  }
}
