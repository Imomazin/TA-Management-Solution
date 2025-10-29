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
