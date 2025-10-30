/**
 * Demo data generators for the TA Management System
 * This provides static seed data for development and demo purposes
 */

import type { TA, Course, Assignment, Timesheet, Activity, ScheduleSlot, ScheduleConflict, CapacityRule, CapacityUtilization } from './types'

// Sample TA data
export const mockTAs: TA[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.j@university.edu',
    studentId: 'STU001',
    status: 'active',
    hoursPerWeek: 20,
    courses: ['CS101', 'CS102'],
    gpa: 3.9,
    graduationYear: 2025,
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.s@university.edu',
    studentId: 'STU002',
    status: 'active',
    hoursPerWeek: 15,
    courses: ['MATH201'],
    gpa: 3.7,
    graduationYear: 2024,
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.d@university.edu',
    studentId: 'STU003',
    status: 'active',
    hoursPerWeek: 20,
    courses: ['CS201', 'CS301'],
    gpa: 3.85,
    graduationYear: 2025,
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.w@university.edu',
    studentId: 'STU004',
    status: 'inactive',
    hoursPerWeek: 0,
    courses: [],
    gpa: 3.6,
    graduationYear: 2024,
  },
  {
    id: '5',
    name: 'Emma Brown',
    email: 'emma.b@university.edu',
    studentId: 'STU005',
    status: 'active',
    hoursPerWeek: 10,
    courses: ['CS101'],
    gpa: 3.95,
    graduationYear: 2026,
  },
  {
    id: '6',
    name: 'Frank Miller',
    email: 'frank.m@university.edu',
    studentId: 'STU006',
    status: 'on-leave',
    hoursPerWeek: 0,
    courses: [],
    gpa: 3.75,
    graduationYear: 2025,
  },
  {
    id: '7',
    name: 'Grace Lee',
    email: 'grace.l@university.edu',
    studentId: 'STU007',
    status: 'active',
    hoursPerWeek: 15,
    courses: ['MATH101', 'MATH201'],
    gpa: 3.8,
    graduationYear: 2024,
  },
  {
    id: '8',
    name: 'Henry Chen',
    email: 'henry.c@university.edu',
    studentId: 'STU008',
    status: 'active',
    hoursPerWeek: 20,
    courses: ['CS301'],
    gpa: 3.92,
    graduationYear: 2025,
  },
]

// Sample Course data
export const mockCourses: Course[] = [
  {
    id: '1',
    code: 'CS101',
    name: 'Introduction to Computer Science',
    instructor: 'Prof. Sarah Johnson',
    taCount: 2,
    semester: 'Fall 2024',
    enrollmentCount: 120,
    maxTAs: 3,
  },
  {
    id: '2',
    code: 'CS102',
    name: 'Data Structures',
    instructor: 'Prof. Michael Lee',
    taCount: 1,
    semester: 'Fall 2024',
    enrollmentCount: 80,
    maxTAs: 2,
  },
  {
    id: '3',
    code: 'CS201',
    name: 'Algorithms',
    instructor: 'Prof. Emily Davis',
    taCount: 1,
    semester: 'Fall 2024',
    enrollmentCount: 60,
    maxTAs: 2,
  },
  {
    id: '4',
    code: 'CS301',
    name: 'Operating Systems',
    instructor: 'Prof. James Wilson',
    taCount: 2,
    semester: 'Fall 2024',
    enrollmentCount: 45,
    maxTAs: 2,
  },
  {
    id: '5',
    code: 'MATH101',
    name: 'Calculus I',
    instructor: 'Prof. Robert Brown',
    taCount: 1,
    semester: 'Fall 2024',
    enrollmentCount: 150,
    maxTAs: 4,
  },
  {
    id: '6',
    code: 'MATH201',
    name: 'Linear Algebra',
    instructor: 'Prof. Jennifer Taylor',
    taCount: 2,
    semester: 'Fall 2024',
    enrollmentCount: 90,
    maxTAs: 3,
  },
]

// Sample Assignment data
export const mockAssignments: Assignment[] = [
  {
    id: '1',
    taId: '1',
    taName: 'Alice Johnson',
    courseId: '1',
    courseName: 'CS101 - Introduction to Computer Science',
    hoursPerWeek: 10,
    startDate: '2024-09-01',
    endDate: '2024-12-15',
    status: 'active',
  },
  {
    id: '2',
    taId: '1',
    taName: 'Alice Johnson',
    courseId: '2',
    courseName: 'CS102 - Data Structures',
    hoursPerWeek: 10,
    startDate: '2024-09-01',
    endDate: '2024-12-15',
    status: 'active',
  },
  {
    id: '3',
    taId: '2',
    taName: 'Bob Smith',
    courseId: '6',
    courseName: 'MATH201 - Linear Algebra',
    hoursPerWeek: 15,
    startDate: '2024-09-01',
    endDate: '2024-12-15',
    status: 'active',
  },
  {
    id: '4',
    taId: '3',
    taName: 'Carol Davis',
    courseId: '3',
    courseName: 'CS201 - Algorithms',
    hoursPerWeek: 10,
    startDate: '2024-09-01',
    endDate: '2024-12-15',
    status: 'active',
  },
  {
    id: '5',
    taId: '3',
    taName: 'Carol Davis',
    courseId: '4',
    courseName: 'CS301 - Operating Systems',
    hoursPerWeek: 10,
    startDate: '2024-09-01',
    endDate: '2024-12-15',
    status: 'active',
  },
  {
    id: '6',
    taId: '5',
    taName: 'Emma Brown',
    courseId: '1',
    courseName: 'CS101 - Introduction to Computer Science',
    hoursPerWeek: 10,
    startDate: '2024-09-01',
    endDate: '2024-12-15',
    status: 'active',
  },
  {
    id: '7',
    taId: '7',
    taName: 'Grace Lee',
    courseId: '5',
    courseName: 'MATH101 - Calculus I',
    hoursPerWeek: 8,
    startDate: '2024-09-01',
    endDate: '2024-12-15',
    status: 'active',
  },
  {
    id: '8',
    taId: '7',
    taName: 'Grace Lee',
    courseId: '6',
    courseName: 'MATH201 - Linear Algebra',
    hoursPerWeek: 7,
    startDate: '2024-09-01',
    endDate: '2024-12-15',
    status: 'active',
  },
  {
    id: '9',
    taId: '8',
    taName: 'Henry Chen',
    courseId: '4',
    courseName: 'CS301 - Operating Systems',
    hoursPerWeek: 20,
    startDate: '2024-09-01',
    endDate: '2024-12-15',
    status: 'active',
  },
]

// Sample Timesheet data
export const mockTimesheets: Timesheet[] = [
  {
    id: '1',
    taId: '1',
    taName: 'Alice Johnson',
    weekStarting: '2024-10-21',
    hoursWorked: 20,
    status: 'approved',
    courseName: 'CS101',
    description: 'Grading assignments, office hours, lab prep',
  },
  {
    id: '2',
    taId: '1',
    taName: 'Alice Johnson',
    weekStarting: '2024-10-28',
    hoursWorked: 18.5,
    status: 'submitted',
    courseName: 'CS101',
    description: 'Grading midterm exams, office hours',
  },
  {
    id: '3',
    taId: '2',
    taName: 'Bob Smith',
    weekStarting: '2024-10-21',
    hoursWorked: 15,
    status: 'approved',
    courseName: 'MATH201',
    description: 'Tutorial sessions, grading homework',
  },
  {
    id: '4',
    taId: '3',
    taName: 'Carol Davis',
    weekStarting: '2024-10-28',
    hoursWorked: 19,
    status: 'draft',
    courseName: 'CS201',
    description: 'Lab assistance, assignment grading',
  },
  {
    id: '5',
    taId: '5',
    taName: 'Emma Brown',
    weekStarting: '2024-10-21',
    hoursWorked: 10,
    status: 'approved',
    courseName: 'CS101',
    description: 'Office hours, email support',
  },
  {
    id: '6',
    taId: '7',
    taName: 'Grace Lee',
    weekStarting: '2024-10-28',
    hoursWorked: 14.5,
    status: 'submitted',
    courseName: 'MATH101',
    description: 'Tutorial sessions, exam prep',
  },
  {
    id: '7',
    taId: '8',
    taName: 'Henry Chen',
    weekStarting: '2024-10-21',
    hoursWorked: 20,
    status: 'approved',
    courseName: 'CS301',
    description: 'Lab sessions, project guidance, office hours',
  },
]

// Sample Activity data
export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'timesheet',
    title: 'Timesheet Submitted',
    description: 'Alice Johnson submitted timesheet for week of Oct 28',
    timestamp: '2024-10-29T14:30:00Z',
    user: 'Alice Johnson',
  },
  {
    id: '2',
    type: 'assignment',
    title: 'New Assignment Created',
    description: 'Henry Chen assigned to CS301 - Operating Systems',
    timestamp: '2024-10-28T10:15:00Z',
    user: 'Admin',
  },
  {
    id: '3',
    type: 'application',
    title: 'New TA Application',
    description: 'John Doe applied for TA position in CS201',
    timestamp: '2024-10-27T16:45:00Z',
    user: 'John Doe',
  },
  {
    id: '4',
    type: 'timesheet',
    title: 'Timesheet Approved',
    description: 'Bob Smith\'s timesheet approved for 15 hours',
    timestamp: '2024-10-26T09:00:00Z',
    user: 'Prof. Jennifer Taylor',
  },
  {
    id: '5',
    type: 'notification',
    title: 'Course Capacity Alert',
    description: 'CS101 needs additional TA support',
    timestamp: '2024-10-25T11:20:00Z',
    user: 'System',
  },
  {
    id: '6',
    type: 'assignment',
    title: 'Assignment Modified',
    description: 'Grace Lee\'s hours increased to 15/week',
    timestamp: '2024-10-24T13:30:00Z',
    user: 'Admin',
  },
]

// Chart data
export interface ChartDataPoint {
  name: string
  value?: number
  [key: string]: string | number | undefined
}

export const mockWeeklyHoursData: ChartDataPoint[] = [
  { name: 'Week 1', hours: 145, capacity: 180 },
  { name: 'Week 2', hours: 152, capacity: 180 },
  { name: 'Week 3', hours: 138, capacity: 180 },
  { name: 'Week 4', hours: 165, capacity: 180 },
  { name: 'Week 5', hours: 158, capacity: 180 },
  { name: 'Week 6', hours: 142, capacity: 180 },
  { name: 'Week 7', hours: 170, capacity: 180 },
  { name: 'Week 8', hours: 155, capacity: 180 },
]

export const mockTADistributionData: ChartDataPoint[] = [
  { name: 'Computer Science', value: 6, color: 'hsl(var(--chart-1))' },
  { name: 'Mathematics', value: 3, color: 'hsl(var(--chart-2))' },
  { name: 'Engineering', value: 2, color: 'hsl(var(--chart-3))' },
  { name: 'Physics', value: 1, color: 'hsl(var(--chart-4))' },
]

// KPI data
export interface KPIData {
  totalTAs: number
  activeCourses: number
  assignmentsDue: number
  hoursThisWeek: number
  trendTAs: number
  trendCourses: number
  trendAssignments: number
  trendHours: number
}

export const mockKPIData: KPIData = {
  totalTAs: 8,
  activeCourses: 6,
  assignmentsDue: 12,
  hoursThisWeek: 155,
  trendTAs: 12.5, // percentage
  trendCourses: 0,
  trendAssignments: -8.3,
  trendHours: 5.2,
}
// Schedule Slots
export const mockScheduleSlots: ScheduleSlot[] = [
  // Alice Johnson - CS101 & CS102
  {
    id: 's1',
    taId: '1',
    taName: 'Alice Johnson',
    courseId: '1',
    courseName: 'CS101',
    dayOfWeek: 1, // Monday
    startTime: '09:00',
    endTime: '11:00',
    location: 'Lab 101',
    type: 'lab',
    recurring: true,
    color: 'hsl(var(--chart-1))',
  },
  {
    id: 's2',
    taId: '1',
    taName: 'Alice Johnson',
    courseId: '1',
    courseName: 'CS101',
    dayOfWeek: 3, // Wednesday
    startTime: '14:00',
    endTime: '16:00',
    location: 'Office 205',
    type: 'office-hours',
    recurring: true,
    color: 'hsl(var(--chart-1))',
  },
  {
    id: 's3',
    taId: '1',
    taName: 'Alice Johnson',
    courseId: '2',
    courseName: 'CS102',
    dayOfWeek: 2, // Tuesday
    startTime: '10:00',
    endTime: '12:00',
    location: 'Lab 102',
    type: 'lab',
    recurring: true,
    color: 'hsl(var(--chart-2))',
  },
  {
    id: 's4',
    taId: '1',
    taName: 'Alice Johnson',
    courseId: '2',
    courseName: 'CS102',
    dayOfWeek: 4, // Thursday
    startTime: '13:00',
    endTime: '15:00',
    location: 'Office 205',
    type: 'grading',
    recurring: true,
    color: 'hsl(var(--chart-2))',
  },

  // Bob Smith - MATH201
  {
    id: 's5',
    taId: '2',
    taName: 'Bob Smith',
    courseId: '6',
    courseName: 'MATH201',
    dayOfWeek: 1, // Monday
    startTime: '14:00',
    endTime: '17:00',
    location: 'Math Building 301',
    type: 'office-hours',
    recurring: true,
    color: 'hsl(var(--chart-3))',
  },
  {
    id: 's6',
    taId: '2',
    taName: 'Bob Smith',
    courseId: '6',
    courseName: 'MATH201',
    dayOfWeek: 3, // Wednesday
    startTime: '10:00',
    endTime: '12:00',
    location: 'Math Building 301',
    type: 'lab',
    recurring: true,
    color: 'hsl(var(--chart-3))',
  },
  {
    id: 's7',
    taId: '2',
    taName: 'Bob Smith',
    courseId: '6',
    courseName: 'MATH201',
    dayOfWeek: 5, // Friday
    startTime: '09:00',
    endTime: '11:00',
    location: 'Math Building 301',
    type: 'grading',
    recurring: true,
    color: 'hsl(var(--chart-3))',
  },

  // Carol Davis - CS201 & CS301
  {
    id: 's8',
    taId: '3',
    taName: 'Carol Davis',
    courseId: '3',
    courseName: 'CS201',
    dayOfWeek: 2, // Tuesday
    startTime: '09:00',
    endTime: '11:00',
    location: 'Lab 201',
    type: 'lab',
    recurring: true,
    color: 'hsl(var(--chart-4))',
  },
  {
    id: 's9',
    taId: '3',
    taName: 'Carol Davis',
    courseId: '3',
    courseName: 'CS201',
    dayOfWeek: 4, // Thursday
    startTime: '10:00',
    endTime: '12:00',
    location: 'Office 310',
    type: 'office-hours',
    recurring: true,
    color: 'hsl(var(--chart-4))',
  },
  {
    id: 's10',
    taId: '3',
    taName: 'Carol Davis',
    courseId: '4',
    courseName: 'CS301',
    dayOfWeek: 1, // Monday
    startTime: '13:00',
    endTime: '15:00',
    location: 'Lab 301',
    type: 'lab',
    recurring: true,
    color: 'hsl(var(--chart-5))',
  },
  {
    id: 's11',
    taId: '3',
    taName: 'Carol Davis',
    courseId: '4',
    courseName: 'CS301',
    dayOfWeek: 3, // Wednesday
    startTime: '15:00',
    endTime: '17:00',
    location: 'Office 310',
    type: 'office-hours',
    recurring: true,
    color: 'hsl(var(--chart-5))',
  },

  // Emma Brown - CS101
  {
    id: 's12',
    taId: '5',
    taName: 'Emma Brown',
    courseId: '1',
    courseName: 'CS101',
    dayOfWeek: 2, // Tuesday
    startTime: '14:00',
    endTime: '16:00',
    location: 'Lab 101',
    type: 'lab',
    recurring: true,
    color: 'hsl(var(--chart-1))',
  },
  {
    id: 's13',
    taId: '5',
    taName: 'Emma Brown',
    courseId: '1',
    courseName: 'CS101',
    dayOfWeek: 4, // Thursday
    startTime: '10:00',
    endTime: '12:00',
    location: 'Office 105',
    type: 'office-hours',
    recurring: true,
    color: 'hsl(var(--chart-1))',
  },

  // Grace Lee - MATH101 & MATH201
  {
    id: 's14',
    taId: '7',
    taName: 'Grace Lee',
    courseId: '5',
    courseName: 'MATH101',
    dayOfWeek: 1, // Monday
    startTime: '10:00',
    endTime: '12:00',
    location: 'Math Building 101',
    type: 'lab',
    recurring: true,
    color: 'hsl(var(--chart-2))',
  },
  {
    id: 's15',
    taId: '7',
    taName: 'Grace Lee',
    courseId: '5',
    courseName: 'MATH101',
    dayOfWeek: 3, // Wednesday
    startTime: '09:00',
    endTime: '11:00',
    location: 'Math Building 101',
    type: 'office-hours',
    recurring: true,
    color: 'hsl(var(--chart-2))',
  },
  {
    id: 's16',
    taId: '7',
    taName: 'Grace Lee',
    courseId: '6',
    courseName: 'MATH201',
    dayOfWeek: 2, // Tuesday
    startTime: '14:00',
    endTime: '16:00',
    location: 'Math Building 301',
    type: 'lab',
    recurring: true,
    color: 'hsl(var(--chart-3))',
  },

  // Henry Chen - CS301
  {
    id: 's17',
    taId: '8',
    taName: 'Henry Chen',
    courseId: '4',
    courseName: 'CS301',
    dayOfWeek: 1, // Monday
    startTime: '09:00',
    endTime: '12:00',
    location: 'Lab 301',
    type: 'lab',
    recurring: true,
    color: 'hsl(var(--chart-5))',
  },
  {
    id: 's18',
    taId: '8',
    taName: 'Henry Chen',
    courseId: '4',
    courseName: 'CS301',
    dayOfWeek: 3, // Wednesday
    startTime: '10:00',
    endTime: '13:00',
    location: 'Lab 301',
    type: 'lab',
    recurring: true,
    color: 'hsl(var(--chart-5))',
  },
  {
    id: 's19',
    taId: '8',
    taName: 'Henry Chen',
    courseId: '4',
    courseName: 'CS301',
    dayOfWeek: 5, // Friday
    startTime: '14:00',
    endTime: '17:00',
    location: 'Office 315',
    type: 'office-hours',
    recurring: true,
    color: 'hsl(var(--chart-5))',
  },
]

// Schedule Conflicts
export const mockScheduleConflicts: ScheduleConflict[] = [
  {
    id: 'c1',
    taId: '3',
    taName: 'Carol Davis',
    conflictType: 'capacity',
    severity: 'warning',
    description: 'Approaching maximum 20 hours per week (currently at 18 hours)',
    affectedSlots: ['s8', 's9', 's10', 's11'],
  },
  {
    id: 'c2',
    taId: '8',
    taName: 'Henry Chen',
    conflictType: 'capacity',
    severity: 'error',
    description: 'Exceeds maximum 20 hours per week (currently at 22 hours)',
    affectedSlots: ['s17', 's18', 's19'],
  },
  {
    id: 'c3',
    taId: '2',
    taName: 'Bob Smith',
    conflictType: 'back-to-back',
    severity: 'warning',
    description: 'Back-to-back sessions with less than 30 minutes break',
    affectedSlots: ['s6', 's7'],
  },
]

// Capacity Rules
export const mockCapacityRules: CapacityRule[] = [
  {
    id: 'r1',
    name: 'Maximum Weekly Hours',
    type: 'max-hours-per-week',
    value: 20,
    unit: 'hours',
    enforced: true,
  },
  {
    id: 'r2',
    name: 'Maximum Daily Hours',
    type: 'max-hours-per-day',
    value: 8,
    unit: 'hours',
    enforced: true,
  },
  {
    id: 'r3',
    name: 'Minimum Break Time',
    type: 'min-break-time',
    value: 30,
    unit: 'minutes',
    enforced: false,
  },
  {
    id: 'r4',
    name: 'Maximum Courses',
    type: 'max-courses',
    value: 2,
    unit: 'courses',
    enforced: false,
  },
]

// Capacity Utilization
export const mockCapacityUtilization: CapacityUtilization[] = [
  {
    taId: '1',
    taName: 'Alice Johnson',
    hoursScheduled: 18,
    hoursCapacity: 20,
    utilizationPercent: 90,
    conflictCount: 0,
    status: 'optimal',
  },
  {
    taId: '2',
    taName: 'Bob Smith',
    hoursScheduled: 15,
    hoursCapacity: 15,
    utilizationPercent: 100,
    conflictCount: 1,
    status: 'optimal',
  },
  {
    taId: '3',
    taName: 'Carol Davis',
    hoursScheduled: 18,
    hoursCapacity: 20,
    utilizationPercent: 90,
    conflictCount: 1,
    status: 'optimal',
  },
  {
    taId: '5',
    taName: 'Emma Brown',
    hoursScheduled: 8,
    hoursCapacity: 10,
    utilizationPercent: 80,
    conflictCount: 0,
    status: 'optimal',
  },
  {
    taId: '7',
    taName: 'Grace Lee',
    hoursScheduled: 12,
    hoursCapacity: 15,
    utilizationPercent: 80,
    conflictCount: 0,
    status: 'optimal',
  },
  {
    taId: '8',
    taName: 'Henry Chen',
    hoursScheduled: 22,
    hoursCapacity: 20,
    utilizationPercent: 110,
    conflictCount: 1,
    status: 'over',
  },
]

// Helper function to calculate hours from time slots
export function calculateHoursFromSlot(startTime: string, endTime: string): number {
  const [startHour, startMin] = startTime.split(':').map(Number)
  const [endHour, endMin] = endTime.split(':').map(Number)
  const startMinutes = startHour * 60 + startMin
  const endMinutes = endHour * 60 + endMin
  return (endMinutes - startMinutes) / 60
}

// Helper function to detect conflicts
export function detectTimeConflicts(slots: ScheduleSlot[]): ScheduleConflict[] {
  const conflicts: ScheduleConflict[] = []

  // Group by TA
  const slotsByTA = slots.reduce((acc, slot) => {
    if (!acc[slot.taId]) acc[slot.taId] = []
    acc[slot.taId].push(slot)
    return acc
  }, {} as Record<string, ScheduleSlot[]>)

  // Check for overlaps and capacity for each TA
  Object.entries(slotsByTA).forEach(([taId, taSlots]) => {
    // Check for time overlaps on same day
    const slotsByDay = taSlots.reduce((acc, slot) => {
      if (!acc[slot.dayOfWeek]) acc[slot.dayOfWeek] = []
      acc[slot.dayOfWeek].push(slot)
      return acc
    }, {} as Record<number, ScheduleSlot[]>)

    Object.values(slotsByDay).forEach(daySlots => {
      for (let i = 0; i < daySlots.length; i++) {
        for (let j = i + 1; j < daySlots.length; j++) {
          const slot1 = daySlots[i]
          const slot2 = daySlots[j]

          if (slot1.startTime < slot2.endTime && slot2.startTime < slot1.endTime) {
            conflicts.push({
              id: `overlap-${slot1.id}-${slot2.id}`,
              taId: slot1.taId,
              taName: slot1.taName,
              conflictType: 'overlap',
              severity: 'error',
              description: `Time overlap between ${slot1.courseName} and ${slot2.courseName}`,
              affectedSlots: [slot1.id, slot2.id],
            })
          }
        }
      }
    })

    // Check total weekly hours
    const totalHours = taSlots.reduce((sum, slot) => {
      return sum + calculateHoursFromSlot(slot.startTime, slot.endTime)
    }, 0)

    if (totalHours > 20) {
      conflicts.push({
        id: `capacity-${taId}`,
        taId,
        taName: taSlots[0].taName,
        conflictType: 'capacity',
        severity: 'error',
        description: `Exceeds maximum 20 hours per week (${totalHours} hours scheduled)`,
        affectedSlots: taSlots.map(s => s.id),
      })
    } else if (totalHours > 18) {
      conflicts.push({
        id: `capacity-warning-${taId}`,
        taId,
        taName: taSlots[0].taName,
        conflictType: 'capacity',
        severity: 'warning',
        description: `Approaching maximum 20 hours per week (${totalHours} hours scheduled)`,
        affectedSlots: taSlots.map(s => s.id),
      })
    }
  })

  return conflicts
}

// Notifications
import type { Notification, EmailTemplate, AuditLog } from './types'

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'info',
    category: 'schedule',
    title: 'Schedule Updated',
    message: 'Your office hours for CS101 have been moved to Wednesday 2-4 PM',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    read: false,
    actionUrl: '/schedule',
    actionText: 'View Schedule',
  },
  {
    id: 'n2',
    type: 'success',
    category: 'timesheet',
    title: 'Timesheet Approved',
    message: 'Your timesheet for week of Oct 21 has been approved (20 hours)',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: false,
    actionUrl: '/timesheets',
    actionText: 'View Timesheets',
  },
  {
    id: 'n3',
    type: 'warning',
    category: 'schedule',
    title: 'Capacity Warning',
    message: 'You are approaching maximum 20 hours per week (currently at 18 hours)',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    read: true,
    actionUrl: '/capacity',
    actionText: 'Check Capacity',
  },
  {
    id: 'n4',
    type: 'info',
    category: 'assignment',
    title: 'New Assignment',
    message: 'You have been assigned to assist with CS301 - Operating Systems',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: true,
    actionUrl: '/assignments',
    actionText: 'View Assignment',
  },
  {
    id: 'n5',
    type: 'error',
    category: 'timesheet',
    title: 'Timesheet Rejected',
    message: 'Your timesheet for week of Oct 14 was rejected. Please revise and resubmit.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    read: true,
    actionUrl: '/timesheets',
    actionText: 'Revise Timesheet',
  },
  {
    id: 'n6',
    type: 'info',
    category: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance on Nov 5, 2024 from 2-4 AM EST',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    read: true,
  },
]

// Email Templates
export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: 'et1',
    name: 'Welcome Email',
    subject: 'Welcome to TA Management System, {{userName}}!',
    body: `Hi {{userName}},

Welcome to the TA Management System at Florida Atlantic University!

Your account has been created successfully. You can now:
- View your schedule and assignments
- Submit timesheets
- Manage your availability
- Communicate with instructors

Log in to get started: {{loginUrl}}

If you have any questions, please contact support@fau.edu.

Best regards,
TA Management Team`,
    variables: ['userName', 'loginUrl'],
  },
  {
    id: 'et2',
    name: 'Schedule Change Notification',
    subject: 'Schedule Change for {{courseName}}',
    body: `Hi {{taName}},

Your schedule for {{courseName}} has been updated:

Previous: {{oldSchedule}}
New: {{newSchedule}}

Please review your updated schedule and confirm your availability.

View full schedule: {{scheduleUrl}}

If you have any conflicts, please contact {{instructorName}} at {{instructorEmail}}.

Best regards,
TA Management Team`,
    variables: ['taName', 'courseName', 'oldSchedule', 'newSchedule', 'scheduleUrl', 'instructorName', 'instructorEmail'],
  },
  {
    id: 'et3',
    name: 'Weekly Summary',
    subject: 'Your Weekly TA Summary - Week of {{weekStart}}',
    body: `Hi {{taName}},

Here's your TA activity summary for the week of {{weekStart}}:

📊 Hours Worked: {{hoursWorked}}/{{hoursCapacity}}
📚 Courses: {{coursesList}}
✅ Timesheets: {{timesheetStatus}}
📅 Upcoming: {{upcomingEvents}}

Utilization: {{utilizationPercent}}%

{{#if hasConflicts}}
⚠️ You have {{conflictCount}} scheduling conflict(s) that need attention.
{{/if}}

View detailed dashboard: {{dashboardUrl}}

Keep up the great work!

Best regards,
TA Management Team`,
    variables: ['taName', 'weekStart', 'hoursWorked', 'hoursCapacity', 'coursesList', 'timesheetStatus', 'upcomingEvents', 'utilizationPercent', 'hasConflicts', 'conflictCount', 'dashboardUrl'],
  },
]

// Audit Logs
export const mockAuditLogs: AuditLog[] = [
  {
    id: 'al1',
    userId: '1',
    userName: 'Alice Johnson',
    userRole: 'ta',
    action: 'update',
    entity: 'timesheet',
    entityId: 'ts1',
    changes: {
      hoursWorked: { old: 18, new: 20 },
      status: { old: 'draft', new: 'submitted' },
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    ipAddress: '192.168.1.100',
  },
  {
    id: 'al2',
    userId: 'admin1',
    userName: 'John Admin',
    userRole: 'admin',
    action: 'create',
    entity: 'assignment',
    entityId: 'a1',
    changes: {
      taId: { old: null, new: '5' },
      courseId: { old: null, new: '1' },
      hoursPerWeek: { old: null, new: 10 },
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    ipAddress: '192.168.1.50',
  },
  {
    id: 'al3',
    userId: 'instructor1',
    userName: 'Prof. Sarah Johnson',
    userRole: 'instructor',
    action: 'approve',
    entity: 'timesheet',
    entityId: 'ts2',
    changes: {
      status: { old: 'submitted', new: 'approved' },
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    ipAddress: '192.168.1.75',
  },
  {
    id: 'al4',
    userId: 'admin1',
    userName: 'John Admin',
    userRole: 'admin',
    action: 'delete',
    entity: 'schedule_slot',
    entityId: 's20',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    ipAddress: '192.168.1.50',
  },
]
