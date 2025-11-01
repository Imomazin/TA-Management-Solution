import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    // Get counts
    const totalTAs = await prisma.teachingAssistant.count()
    const totalCourses = await prisma.course.count()
    const totalAssignments = await prisma.assignment.count()
    const pendingApplications = await prisma.application.count({
      where: { status: "PENDING" },
    })

    // Get total hours from assignments
    const assignments = await prisma.assignment.findMany()
    const totalHours = assignments.reduce((sum: number, a: { hours: number }) => sum + a.hours, 0)

    // Get timesheet stats
    const timesheets = await prisma.timesheet.findMany({
      where: {
        status: "APPROVED",
      },
    })
    const approvedHours = timesheets.reduce((sum: number, t: { hours: number }) => sum + t.hours, 0)

    // Calculate utilization (approved hours / total allocated hours * 100)
    const utilization = totalHours > 0 ? Math.round((approvedHours / totalHours) * 100) : 0

    // Get recent activity
    const recentApplications = await prisma.application.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
      },
    })

    const recentTimesheets = await prisma.timesheet.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        ta: {
          include: {
            user: true,
          },
        },
      },
    })

    return NextResponse.json({
      summary: {
        totalTAs,
        totalCourses,
        totalAssignments,
        pendingApplications,
        totalHours,
        approvedHours,
        utilization,
      },
      recentActivity: {
        applications: recentApplications,
        timesheets: recentTimesheets,
      },
    })
  } catch (error) {
    console.error("Error fetching analytics summary:", error)
    return NextResponse.json(
      { error: "Failed to fetch analytics summary" },
      { status: 500 }
    )
  }
}
