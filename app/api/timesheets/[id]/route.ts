import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { updateTimesheetSchema } from "@/lib/validators"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const timesheet = await prisma.timesheet.findUnique({
      where: { id },
      include: {
        ta: {
          include: {
            user: true,
          },
        },
      },
    })

    if (!timesheet) {
      return NextResponse.json(
        { error: "Timesheet not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ timesheet })
  } catch (error) {
    console.error("Error fetching timesheet:", error)
    return NextResponse.json(
      { error: "Failed to fetch timesheet" },
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
    const validated = updateTimesheetSchema.parse(body)

    const timesheet = await prisma.timesheet.update({
      where: { id },
      data: validated,
      include: {
        ta: {
          include: {
            user: true,
          },
        },
      },
    })

    return NextResponse.json({ timesheet })
  } catch (error) {
    console.error("Error updating timesheet:", error)
    return NextResponse.json(
      { error: "Failed to update timesheet" },
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
    await prisma.timesheet.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting timesheet:", error)
    return NextResponse.json(
      { error: "Failed to delete timesheet" },
      { status: 500 }
    )
  }
}
