-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'COORDINATOR', 'TA');
CREATE TYPE "ApplicationStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'STAFF_REVIEW', 'RECOMMENDED', 'COMMITTEE_REVIEW', 'OFFER_APPROVED', 'OFFER_DECLINED', 'REJECTED', 'WITHDRAWN');
CREATE TYPE "ApplicationRecommendation" AS ENUM ('STRONGLY_RECOMMEND', 'RECOMMEND', 'NEUTRAL', 'NOT_RECOMMEND');
CREATE TYPE "TimeStatus" AS ENUM ('SUBMITTED', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL DEFAULT 3,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeachingAssistant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "maxHours" INTEGER NOT NULL DEFAULT 20,
    "skills" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeachingAssistant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "gpa" DOUBLE PRECISION,
    "skills" TEXT[],
    "answersJson" JSONB NOT NULL,
    "resumeUrl" TEXT,
    "resumeText" TEXT,
    "resumeKeywords" TEXT[],
    "aiScore" INTEGER,
    "aiRationale" TEXT,
    "aiRecommendation" "ApplicationRecommendation",
    "status" "ApplicationStatus" NOT NULL DEFAULT 'DRAFT',

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationHistory" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "applicationId" TEXT NOT NULL,
    "actorUserId" TEXT,
    "action" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "ApplicationHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assignment" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "taId" TEXT NOT NULL,
    "hours" INTEGER NOT NULL DEFAULT 10,
    "role" TEXT NOT NULL DEFAULT 'TA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Timesheet" (
    "id" TEXT NOT NULL,
    "taId" TEXT NOT NULL,
    "weekOf" TIMESTAMP(3) NOT NULL,
    "hours" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "status" "TimeStatus" NOT NULL DEFAULT 'SUBMITTED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Timesheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "target" TEXT,
    "meta" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TeachingAssistant_userId_key" ON "TeachingAssistant"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_email_key" ON "Application"("email");

-- CreateIndex
CREATE INDEX "Application_email_idx" ON "Application"("email");

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "Application"("status");

-- CreateIndex
CREATE INDEX "ApplicationHistory_applicationId_idx" ON "ApplicationHistory"("applicationId");

-- AddForeignKey
ALTER TABLE "TeachingAssistant" ADD CONSTRAINT "TeachingAssistant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationHistory" ADD CONSTRAINT "ApplicationHistory_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_taId_fkey" FOREIGN KEY ("taId") REFERENCES "TeachingAssistant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timesheet" ADD CONSTRAINT "Timesheet_taId_fkey" FOREIGN KEY ("taId") REFERENCES "TeachingAssistant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
