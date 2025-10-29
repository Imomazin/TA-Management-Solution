"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/shell/app-shell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { WeekCalendar } from '@/components/schedule/week-calendar'
import { Calendar, AlertCircle, Filter } from 'lucide-react'
import { mockScheduleSlots, mockScheduleConflicts, detectTimeConflicts } from '@/lib/data'
import type { User } from '@/lib/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function SchedulePage() {
  const [user, setUser] = useState<User | null>(null)
  const [selectedTA, setSelectedTA] = useState<string>('all')
  const [selectedCourse, setSelectedCourse] = useState<string>('all')
  const router = useRouter()

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user)
        } else {
          router.push('/login')
        }
      })
      .catch(() => router.push('/login'))
  }, [router])

  if (!user) return null

  // Filter slots
  let filteredSlots = mockScheduleSlots
  if (selectedTA !== 'all') {
    filteredSlots = filteredSlots.filter(slot => slot.taId === selectedTA)
  }
  if (selectedCourse !== 'all') {
    filteredSlots = filteredSlots.filter(slot => slot.courseId === selectedCourse)
  }

  // Get unique TAs and courses
  const uniqueTAs = Array.from(
    new Map(mockScheduleSlots.map(s => [s.taId, { id: s.taId, name: s.taName }])).values()
  )
  const uniqueCourses = Array.from(
    new Map(mockScheduleSlots.map(s => [s.courseId, { id: s.courseId, name: s.courseName }])).values()
  )

  // Get conflict slot IDs
  const conflictSlotIds = mockScheduleConflicts.flatMap(c => c.affectedSlots)

  return (
    <AppShell user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <Calendar className="h-8 w-8" />
              Schedule
            </h1>
            <p className="text-muted-foreground">Visual calendar for TA scheduling</p>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  TA: {selectedTA === 'all' ? 'All' : uniqueTAs.find(t => t.id === selectedTA)?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedTA('all')}>
                  All TAs
                </DropdownMenuItem>
                {uniqueTAs.map(ta => (
                  <DropdownMenuItem key={ta.id} onClick={() => setSelectedTA(ta.id)}>
                    {ta.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Course: {selectedCourse === 'all' ? 'All' : uniqueCourses.find(c => c.id === selectedCourse)?.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedCourse('all')}>
                  All Courses
                </DropdownMenuItem>
                {uniqueCourses.map(course => (
                  <DropdownMenuItem key={course.id} onClick={() => setSelectedCourse(course.id)}>
                    {course.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Conflicts Alert */}
        {mockScheduleConflicts.length > 0 && (
          <Card className="border-destructive/50 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-5 w-5" />
                {mockScheduleConflicts.length} Scheduling Conflicts Detected
              </CardTitle>
              <CardDescription>
                Please review and resolve the following conflicts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockScheduleConflicts.map(conflict => (
                <div key={conflict.id} className="flex items-start gap-3 p-3 bg-background rounded-lg">
                  <Badge variant={conflict.severity === 'error' ? 'destructive' : 'secondary'}>
                    {conflict.severity}
                  </Badge>
                  <div className="flex-1">
                    <p className="font-medium">{conflict.taName}</p>
                    <p className="text-sm text-muted-foreground">{conflict.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Slots</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredSlots.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active TAs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueTAs.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{uniqueCourses.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Conflicts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{mockScheduleConflicts.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Schedule</CardTitle>
            <CardDescription>
              View TA schedules by week. Conflicts are highlighted in red.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WeekCalendar slots={filteredSlots} conflicts={conflictSlotIds} />
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Schedule Types</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(var(--chart-1))' }} />
              <span className="text-sm">Lab Sessions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(var(--chart-2))' }} />
              <span className="text-sm">Office Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: 'hsl(var(--chart-3))' }} />
              <span className="text-sm">Grading</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded border-2 border-destructive bg-muted" />
              <span className="text-sm">Conflict</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
