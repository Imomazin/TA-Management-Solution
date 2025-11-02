import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createApplicationSchema } from "@/lib/validators"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const userId = searchParams.get("userId")

    const where: any = {}
    if (status) where.status = status
    if (userId) where.userId = userId

    const applications = await prisma.application.findMany({
      where,
      include: {
        user: true,
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ applications })
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = createApplicationSchema.parse(body)

    const application = await prisma.application.create({
      data: validated,
      include: {
        user: true,
      },
    })

    return NextResponse.json({ application }, { status: 201 })
  } catch (error) {
    console.error("Error creating application:", error)
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 400 }
    )
  }
}
