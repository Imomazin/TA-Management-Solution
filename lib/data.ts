/**
 * Demo data generators for the TA Management System
 * This provides static seed data for development and demo purposes
 */

import type { TA, Course, Assignment, Timesheet, Activity } from './types'

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
