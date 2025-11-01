import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { updateAssignmentSchema } from "@/lib/validators"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const assignment = await db.assignment.findUnique({
      where: { id },
      include: {
        course: true,
        ta: {
          include: {
            user: true,
          },
        },
      },
    })

    if (!assignment) {
      return NextResponse.json(
        { error: "Assignment not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ assignment })
  } catch (error) {
    console.error("Error fetching assignment:", error)
    return NextResponse.json(
      { error: "Failed to fetch assignment" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validated = updateAssignmentSchema.parse(body)

    const assignment = await db.assignment.update({
      where: { id },
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

    return NextResponse.json({ assignment })
  } catch (error) {
    console.error("Error updating assignment:", error)
    return NextResponse.json(
      { error: "Failed to update assignment" },
      { status: 400 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await db.assignment.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting assignment:", error)
    return NextResponse.json(
      { error: "Failed to delete assignment" },
      { status: 500 }
    )
  }
}
