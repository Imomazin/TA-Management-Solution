import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { updateNotificationSchema } from "@/lib/validators"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const notification = await db.notification.findUnique({
      where: { id },
      include: {
        user: true,
      },
    })

    if (!notification) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ notification })
  } catch (error) {
    console.error("Error fetching notification:", error)
    return NextResponse.json(
      { error: "Failed to fetch notification" },
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
    const validated = updateNotificationSchema.parse(body)

    const notification = await db.notification.update({
      where: { id },
      data: validated,
      include: {
        user: true,
      },
    })

    return NextResponse.json({ notification })
  } catch (error) {
    console.error("Error updating notification:", error)
    return NextResponse.json(
      { error: "Failed to update notification" },
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
    await db.notification.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting notification:", error)
    return NextResponse.json(
      { error: "Failed to delete notification" },
      { status: 500 }
    )
  }
}
