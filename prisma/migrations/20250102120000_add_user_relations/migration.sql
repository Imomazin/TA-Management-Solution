-- AlterTable: Add userId to Assignment
ALTER TABLE "Assignment" ADD COLUMN "userId" TEXT;

-- AlterTable: Add userId to Timesheet
ALTER TABLE "Timesheet" ADD COLUMN "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timesheet" ADD CONSTRAINT "Timesheet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
