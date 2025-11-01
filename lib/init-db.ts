import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function initDatabase() {
  try {
    // Check if database is initialized by querying users
    const userCount = await prisma.user.count()

    if (userCount > 0) {
      // Database already has data
      return
    }

    // Seed with minimal data for demo
    console.log("🌱 Initializing database with seed data...")

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        id: "u_admin_1",
        email: "admin@example.edu",
        name: "Dr. Sarah Admin",
        role: "ADMIN",
      },
    })

    // Create a few courses
    const course1 = await prisma.course.create({
      data: {
        code: "CS 101",
        title: "Introduction to Programming",
        term: "Fall 2025",
        capacity: 3,
      },
    })

    const course2 = await prisma.course.create({
      data: {
        code: "CS 201",
        title: "Data Structures",
        term: "Fall 2025",
        capacity: 2,
      },
    })

    console.log("✅ Database initialized successfully")
  } catch (error) {
    console.error("❌ Database initialization failed:", error)
    // Don't throw - allow app to continue even if seeding fails
  }
}
