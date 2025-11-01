import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { createTimesheetSchema } from "@/lib/validators"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const taId = searchParams.get("taId")
    const status = searchParams.get("status")

    const where: any = {}
    if (taId) where.taId = taId
    if (status) where.status = status

    const timesheets = await prisma.timesheet.findMany({
      where,
      include: {
        ta: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { weekOf: "desc" },
    })

    return NextResponse.json({ timesheets })
  } catch (error) {
    console.error("Error fetching timesheets:", error)
    return NextResponse.json(
      { error: "Failed to fetch timesheets" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = createTimesheetSchema.parse(body)

    const timesheet = await prisma.timesheet.create({
      data: validated,
      include: {
        ta: {
          include: {
            user: true,
          },
        },
      },
    })

    return NextResponse.json({ timesheet }, { status: 201 })
  } catch (error) {
    console.error("Error creating timesheet:", error)
    return NextResponse.json(
      { error: "Failed to create timesheet" },
      { status: 400 }
    )
  }
}
