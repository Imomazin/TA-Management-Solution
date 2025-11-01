import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createNotificationSchema } from "@/lib/validators"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const read = searchParams.get("read")

    const where: any = {}
    if (userId) where.userId = userId
    if (read !== null) where.read = read === "true"

    const notifications = await prisma.notification.findMany({
      where,
      include: {
        user: true,
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ notifications })
  } catch (error) {
    console.error("Error fetching notifications:", error)
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = createNotificationSchema.parse(body)

    const notification = await prisma.notification.create({
      data: validated,
      include: {
        user: true,
      },
    })

    return NextResponse.json({ notification }, { status: 201 })
  } catch (error) {
    console.error("Error creating notification:", error)
    return NextResponse.json(
      { error: "Failed to create notification" },
      { status: 400 }
    )
  }
}
