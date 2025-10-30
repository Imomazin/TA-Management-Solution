"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, TrendingUp, Users, Clock, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BackgroundStreaks } from "@/components/ui/background-streaks"
import { mockTAs, mockCourses, mockScheduleSlots, mockCapacityUtilization } from "@/lib/data"

export default function ReportsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) router.push('/login')
        else setUser(data)
      })
  }, [router])

  if (!user) return null

  // Hours per TA per week
  const hoursPerTA = mockCapacityUtilization.map(ta => ({
    name: ta.taName.split(' ')[0],
    hours: ta.hoursScheduled,
    capacity: ta.hoursCapacity,
  }))

  // Course coverage
  const courseCoverage = mockCourses.map(course => ({
    name: course.code,
    coverage: (course.taCount / course.maxTAs) * 100,
    tas: course.taCount,
    max: course.maxTAs,
  }))

  // Capacity vs Allocation
  const capacityData = mockCapacityUtilization.map(ta => ({
    name: ta.taName.split(' ')[0],
    allocated: ta.hoursScheduled,
    capacity: ta.hoursCapacity,
    utilization: ta.utilizationPercent,
  }))

  // TA Distribution by Course
  const taDistribution = [
    { name: 'CS Courses', value: 6, color: 'hsl(var(--chart-1))' },
    { name: 'Math Courses', value: 3, color: 'hsl(var(--chart-2))' },
    { name: 'Unassigned', value: 2, color: 'hsl(var(--chart-3))' },
  ]

  // Weekly trends (mock data)
  const weeklyTrends = [
    { week: 'W1', hours: 145, tas: 8 },
    { week: 'W2', hours: 152, tas: 8 },
    { week: 'W3', hours: 138, tas: 7 },
    { week: 'W4', hours: 165, tas: 8 },
    { week: 'W5', hours: 158, tas: 8 },
    { week: 'W6', hours: 142, tas: 7 },
  ]

  const exportReport = (format: 'pdf' | 'csv') => {
    const data = {
      hoursPerTA,
      courseCoverage,
      capacityData,
      generated: new Date().toISOString(),
    }

    // Mock export - in production, generate actual file
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ta-report-${Date.now()}.json`
    a.click()
  }

  return (
    <div className="space-y-6 relative">
      <BackgroundStreaks variant="subtle" />

      <div className="flex items-center justify-between relative z-10">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into TA performance and resource allocation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportReport('csv')}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button onClick={() => exportReport('pdf')}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4 relative z-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCapacityUtilization.reduce((sum, ta) => sum + ta.hoursScheduled, 0)}h
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active TAs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockTAs.filter(ta => ta.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Out of {mockTAs.length} total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Covered</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCourses.length}</div>
            <p className="text-xs text-muted-foreground">
              98% coverage rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                mockCapacityUtilization.reduce((sum, ta) => sum + ta.utilizationPercent, 0) /
                mockCapacityUtilization.length
              )}%
            </div>
            <p className="text-xs text-muted-foreground">
              Optimal range: 80-95%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="hours" className="relative z-10">
        <TabsList>
          <TabsTrigger value="hours">Hours per TA</TabsTrigger>
          <TabsTrigger value="coverage">Course Coverage</TabsTrigger>
          <TabsTrigger value="capacity">Capacity Analysis</TabsTrigger>
          <TabsTrigger value="trends">Weekly Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="hours" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hours per TA per Week</CardTitle>
              <CardDescription>
                Scheduled hours vs capacity for each teaching assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={hoursPerTA}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="hours" fill="hsl(var(--chart-1))" name="Scheduled Hours" />
                  <Bar dataKey="capacity" fill="hsl(var(--chart-2))" name="Capacity" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coverage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Coverage (%)</CardTitle>
              <CardDescription>
                Percentage of TA positions filled for each course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={courseCoverage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="coverage" fill="hsl(var(--chart-2))" name="Coverage %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capacity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Capacity vs Allocation</CardTitle>
              <CardDescription>
                Comparison of allocated hours against maximum capacity
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-8">
              <ResponsiveContainer width="60%" height={350}>
                <BarChart data={capacityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="allocated" fill="hsl(var(--chart-1))" name="Allocated" />
                  <Bar dataKey="capacity" fill="hsl(var(--chart-3))" name="Capacity" />
                </BarChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="40%" height={350}>
                <PieChart>
                  <Pie
                    data={taDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={entry => `${entry.name}: ${entry.value}`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {taDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={String(entry.color)} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Trends</CardTitle>
              <CardDescription>
                Total hours and active TAs over the past 6 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={weeklyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="hours" stroke="hsl(var(--chart-1))" name="Total Hours" strokeWidth={2} />
                  <Line yAxisId="right" type="monotone" dataKey="tas" stroke="hsl(var(--chart-2))" name="Active TAs" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
