import { z } from "zod"

// Course validators
export const createCourseSchema = z.object({
  code: z.string().min(1, "Course code is required"),
  title: z.string().min(1, "Course title is required"),
  term: z.string().min(1, "Term is required"),
  capacity: z.number().int().positive().default(3),
})

export const updateCourseSchema = createCourseSchema.partial()

// Application validators
export const createApplicationSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  status: z.enum(["PENDING", "UNDER_REVIEW", "ACCEPTED", "REJECTED"]).default("PENDING"),
  resumeUrl: z.string().url().optional().or(z.literal("")),
  statement: z.string().optional(),
})

export const updateApplicationSchema = createApplicationSchema.partial()

// Assignment validators
export const createAssignmentSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  taId: z.string().min(1, "TA ID is required"),
  hours: z.number().int().positive().default(10),
  role: z.string().default("TA"),
})

export const updateAssignmentSchema = createAssignmentSchema.partial()

// Timesheet validators
export const createTimesheetSchema = z.object({
  taId: z.string().min(1, "TA ID is required"),
  weekOf: z.string().or(z.date()).transform((val) => new Date(val)),
  hours: z.number().int().nonnegative().default(0),
  notes: z.string().optional(),
  status: z.enum(["SUBMITTED", "APPROVED", "REJECTED"]).default("SUBMITTED"),
})

export const updateTimesheetSchema = createTimesheetSchema.partial()

// Notification validators
export const createNotificationSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  kind: z.string().min(1, "Notification kind is required"),
  title: z.string().min(1, "Title is required"),
  body: z.string().min(1, "Body is required"),
  read: z.boolean().default(false),
})

export const updateNotificationSchema = createNotificationSchema.partial()

// TeachingAssistant validators
export const createTeachingAssistantSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  maxHours: z.number().int().positive().default(20),
  skills: z.string().default(""),
})

export const updateTeachingAssistantSchema = createTeachingAssistantSchema.partial()
