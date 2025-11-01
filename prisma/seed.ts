import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Create admin user using upsert (won't fail if already exists)
  const admin = await prisma.user.upsert({
    where: { email: "demo@fau.edu" },
    update: {},
    create: {
      id: "u_admin_1",
      email: "demo@fau.edu",
      name: "Demo User",
      role: "ADMIN",
    },
  })

  console.log("✅ Created admin user:", admin.email)

  // Create a demo TA
  const ta = await prisma.user.upsert({
    where: { email: "ta@fau.edu" },
    update: {},
    create: {
      id: "u_ta_1",
      email: "ta@fau.edu",
      name: "Demo TA",
      role: "TA",
    },
  })

  console.log("✅ Created TA user:", ta.email)

  // Create TA profile
  const taProfile = await prisma.teachingAssistant.upsert({
    where: { userId: ta.id },
    update: {},
    create: {
      userId: ta.id,
      maxHours: 20,
      skills: "JavaScript, React, Node.js",
    },
  })

  console.log("✅ Created TA profile")

  // Create a few demo courses
  const course1 = await prisma.course.upsert({
    where: { id: "course_cs101" },
    update: {},
    create: {
      id: "course_cs101",
      code: "CS 101",
      title: "Introduction to Programming",
      term: "Fall 2025",
      capacity: 3,
    },
  })

  const course2 = await prisma.course.upsert({
    where: { id: "course_cs201" },
    update: {},
    create: {
      id: "course_cs201",
      code: "CS 201",
      title: "Data Structures",
      term: "Fall 2025",
      capacity: 2,
    },
  })

  console.log("✅ Created courses:", course1.code, course2.code)

  // Create a demo assignment
  const existingAssignment = await prisma.assignment.findFirst({
    where: {
      courseId: course1.id,
      taId: taProfile.id,
    },
  })

  if (!existingAssignment) {
    await prisma.assignment.create({
      data: {
        courseId: course1.id,
        taId: taProfile.id,
        hours: 10,
        role: "TA",
      },
    })
    console.log("✅ Created assignment")
  }

  console.log("🎉 Seeding complete!")
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
