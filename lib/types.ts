/**
 * Type definitions for the TA Management System
 */

export interface TA {
  id: string
  name: string
  email: string
  studentId: string
  status: 'active' | 'inactive' | 'on-leave'
  hoursPerWeek: number
  courses: string[]
  gpa: number
  graduationYear: number
}

export interface Course {
  id: string
  code: string
  name: string
  instructor: string
  taCount: number
  semester: string
  enrollmentCount: number
  maxTAs: number
}

export interface Assignment {
  id: string
  taId: string
  taName: string
  courseId: string
  courseName: string
  hoursPerWeek: number
  startDate: string
  endDate: string
  status: 'active' | 'completed' | 'cancelled'
}

export interface Timesheet {
  id: string
  taId: string
  taName: string
  weekStarting: string
  hoursWorked: number
  status: 'draft' | 'submitted' | 'approved' | 'rejected'
  courseName: string
  description: string
}

export interface Activity {
  id: string
  type: 'application' | 'assignment' | 'timesheet' | 'notification'
  title: string
  description: string
  timestamp: string
  user: string
}

export interface ScheduleSlot {
  id: string
  taId: string
  taName: string
  courseId: string
  courseName: string
  dayOfWeek: number // 0 = Sunday, 1 = Monday, etc.
  startTime: string // e.g., "09:00"
  endTime: string // e.g., "11:00"
  location: string
  type: 'lab' | 'office-hours' | 'lecture' | 'grading'
  recurring: boolean
  color?: string
}

export interface ScheduleConflict {
  id: string
  taId: string
  taName: string
  conflictType: 'overlap' | 'capacity' | 'back-to-back'
  severity: 'warning' | 'error'
  description: string
  affectedSlots: string[] // slot IDs
}

export interface CapacityRule {
  id: string
  name: string
  type: 'max-hours-per-week' | 'max-hours-per-day' | 'min-break-time' | 'max-courses'
  value: number
  unit: string
  enforced: boolean
}

export interface CapacityUtilization {
  taId: string
  taName: string
  hoursScheduled: number
  hoursCapacity: number
  utilizationPercent: number
  conflictCount: number
  status: 'under' | 'optimal' | 'over'
}

export interface WeekView {
  weekNumber: number
  startDate: string
  endDate: string
  slots: ScheduleSlot[]
}
