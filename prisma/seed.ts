import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // Clean existing data
  await prisma.auditLog.deleteMany()
  await prisma.notification.deleteMany()
  await prisma.timesheet.deleteMany()
  await prisma.assignment.deleteMany()
  await prisma.application.deleteMany()
  await prisma.teachingAssistant.deleteMany()
  await prisma.course.deleteMany()
  await prisma.user.deleteMany()

  // Create Users
  const admin = await prisma.user.create({
    data: {
      id: "u_admin_1",
      email: "admin@example.edu",
      name: "Dr. Sarah Admin",
      role: "ADMIN",
    },
  })

  const coordinator = await prisma.user.create({
    data: {
      email: "coordinator@example.edu",
      name: "John Coordinator",
      role: "COORDINATOR",
    },
  })

  const ta1 = await prisma.user.create({
    data: {
      email: "alice.smith@example.edu",
      name: "Alice Smith",
      role: "TA",
    },
  })

  const ta2 = await prisma.user.create({
    data: {
      email: "bob.johnson@example.edu",
      name: "Bob Johnson",
      role: "TA",
    },
  })

  const ta3 = await prisma.user.create({
    data: {
      email: "carol.williams@example.edu",
      name: "Carol Williams",
      role: "TA",
    },
  })

  const ta4 = await prisma.user.create({
    data: {
      email: "david.brown@example.edu",
      name: "David Brown",
      role: "TA",
    },
  })

  const ta5 = await prisma.user.create({
    data: {
      email: "emma.davis@example.edu",
      name: "Emma Davis",
      role: "TA",
    },
  })

  const applicant1 = await prisma.user.create({
    data: {
      email: "frank.miller@example.edu",
      name: "Frank Miller",
      role: "TA",
    },
  })

  const applicant2 = await prisma.user.create({
    data: {
      email: "grace.wilson@example.edu",
      name: "Grace Wilson",
      role: "TA",
    },
  })

  console.log("✅ Created users")

  // Create Teaching Assistants
  const taProfile1 = await prisma.teachingAssistant.create({
    data: {
      userId: ta1.id,
      maxHours: 20,
      skills: "JavaScript, React, Node.js",
    },
  })

  const taProfile2 = await prisma.teachingAssistant.create({
    data: {
      userId: ta2.id,
      maxHours: 15,
      skills: "Python, Django, Data Science",
    },
  })

  const taProfile3 = await prisma.teachingAssistant.create({
    data: {
      userId: ta3.id,
      maxHours: 20,
      skills: "Java, Spring Boot, Databases",
    },
  })

  const taProfile4 = await prisma.teachingAssistant.create({
    data: {
      userId: ta4.id,
      maxHours: 10,
      skills: "C++, Algorithms, Data Structures",
    },
  })

  const taProfile5 = await prisma.teachingAssistant.create({
    data: {
      userId: ta5.id,
      maxHours: 20,
      skills: "Web Development, UI/UX, TypeScript",
    },
  })

  console.log("✅ Created TA profiles")

  // Create Courses
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
      title: "Data Structures and Algorithms",
      term: "Fall 2025",
      capacity: 2,
    },
  })

  const course3 = await prisma.course.create({
    data: {
      code: "CS 301",
      title: "Database Systems",
      term: "Fall 2025",
      capacity: 2,
    },
  })

  const course4 = await prisma.course.create({
    data: {
      code: "CS 401",
      title: "Web Development",
      term: "Fall 2025",
      capacity: 3,
    },
  })

  const course5 = await prisma.course.create({
    data: {
      code: "CS 501",
      title: "Machine Learning",
      term: "Spring 2026",
      capacity: 2,
    },
  })

  const course6 = await prisma.course.create({
    data: {
      code: "CS 601",
      title: "Advanced Algorithms",
      term: "Spring 2026",
      capacity: 2,
    },
  })

  console.log("✅ Created courses")

  // Create Applications
  await prisma.application.create({
    data: {
      userId: applicant1.id,
      status: "PENDING",
      statement: "I am passionate about helping students learn programming.",
    },
  })

  await prisma.application.create({
    data: {
      userId: applicant2.id,
      status: "UNDER_REVIEW",
      statement: "I have strong experience in data science and machine learning.",
    },
  })

  await prisma.application.create({
    data: {
      userId: ta1.id,
      status: "ACCEPTED",
      statement: "Excited to contribute to the CS department.",
    },
  })

  await prisma.application.create({
    data: {
      userId: ta2.id,
      status: "ACCEPTED",
      statement: "Looking forward to sharing my knowledge with students.",
    },
  })

  console.log("✅ Created applications")

  // Create Assignments
  await prisma.assignment.create({
    data: {
      courseId: course1.id,
      taId: taProfile1.id,
      hours: 10,
      role: "Head TA",
    },
  })

  await prisma.assignment.create({
    data: {
      courseId: course1.id,
      taId: taProfile5.id,
      hours: 8,
      role: "TA",
    },
  })

  await prisma.assignment.create({
    data: {
      courseId: course2.id,
      taId: taProfile4.id,
      hours: 10,
      role: "TA",
    },
  })

  await prisma.assignment.create({
    data: {
      courseId: course3.id,
      taId: taProfile3.id,
      hours: 12,
      role: "Head TA",
    },
  })

  await prisma.assignment.create({
    data: {
      courseId: course4.id,
      taId: taProfile1.id,
      hours: 8,
      role: "TA",
    },
  })

  await prisma.assignment.create({
    data: {
      courseId: course4.id,
      taId: taProfile5.id,
      hours: 10,
      role: "TA",
    },
  })

  await prisma.assignment.create({
    data: {
      courseId: course5.id,
      taId: taProfile2.id,
      hours: 12,
      role: "Head TA",
    },
  })

  console.log("✅ Created assignments")

  // Create Timesheets
  const currentWeek = new Date()
  currentWeek.setDate(currentWeek.getDate() - currentWeek.getDay()) // Start of week

  await prisma.timesheet.create({
    data: {
      taId: taProfile1.id,
      weekOf: currentWeek,
      hours: 18,
      notes: "Graded assignments and held office hours",
      status: "APPROVED",
    },
  })

  await prisma.timesheet.create({
    data: {
      taId: taProfile2.id,
      weekOf: currentWeek,
      hours: 12,
      notes: "Led lab sessions and graded homework",
      status: "APPROVED",
    },
  })

  await prisma.timesheet.create({
    data: {
      taId: taProfile3.id,
      weekOf: currentWeek,
      hours: 12,
      notes: "Office hours and exam preparation",
      status: "SUBMITTED",
    },
  })

  await prisma.timesheet.create({
    data: {
      taId: taProfile4.id,
      weekOf: currentWeek,
      hours: 10,
      notes: "Graded coding assignments",
      status: "APPROVED",
    },
  })

  await prisma.timesheet.create({
    data: {
      taId: taProfile5.id,
      weekOf: currentWeek,
      hours: 16,
      notes: "Lab assistance and project mentoring",
      status: "SUBMITTED",
    },
  })

  // Previous week timesheets
  const previousWeek = new Date(currentWeek)
  previousWeek.setDate(previousWeek.getDate() - 7)

  await prisma.timesheet.create({
    data: {
      taId: taProfile1.id,
      weekOf: previousWeek,
      hours: 18,
      notes: "Regular weekly duties",
      status: "APPROVED",
    },
  })

  await prisma.timesheet.create({
    data: {
      taId: taProfile2.id,
      weekOf: previousWeek,
      hours: 12,
      notes: "Lab sessions and grading",
      status: "APPROVED",
    },
  })

  console.log("✅ Created timesheets")

  // Create Notifications
  await prisma.notification.create({
    data: {
      userId: ta1.id,
      kind: "timesheet",
      title: "Timesheet Approved",
      body: "Your timesheet for the week of " + currentWeek.toDateString() + " has been approved.",
      read: false,
    },
  })

  await prisma.notification.create({
    data: {
      userId: ta2.id,
      kind: "timesheet",
      title: "Timesheet Approved",
      body: "Your timesheet has been approved for 12 hours.",
      read: true,
    },
  })

  await prisma.notification.create({
    data: {
      userId: ta3.id,
      kind: "assignment",
      title: "New Assignment",
      body: "You have been assigned to CS 301 - Database Systems",
      read: false,
    },
  })

  await prisma.notification.create({
    data: {
      userId: applicant1.id,
      kind: "application",
      title: "Application Received",
      body: "Your TA application has been received and is under review.",
      read: false,
    },
  })

  await prisma.notification.create({
    data: {
      userId: admin.id,
      kind: "system",
      title: "New Applications",
      body: "There are 2 new TA applications pending review.",
      read: false,
    },
  })

  console.log("✅ Created notifications")

  // Create Audit Logs
  await prisma.auditLog.create({
    data: {
      actorId: admin.id,
      action: "CREATE_COURSE",
      target: course1.id,
      meta: JSON.stringify({ code: "CS 101", title: "Introduction to Programming" }),
    },
  })

  await prisma.auditLog.create({
    data: {
      actorId: admin.id,
      action: "APPROVE_TIMESHEET",
      target: taProfile1.id,
      meta: JSON.stringify({ hours: 18, weekOf: currentWeek.toISOString() }),
    },
  })

  await prisma.auditLog.create({
    data: {
      actorId: coordinator.id,
      action: "CREATE_ASSIGNMENT",
      target: course1.id,
      meta: JSON.stringify({ taId: taProfile1.id, hours: 10 }),
    },
  })

  console.log("✅ Created audit logs")

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
