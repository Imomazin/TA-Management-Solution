"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Shield, Download, AlertTriangle, User, FileText, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BackgroundStreaks } from "@/components/ui/background-streaks"
import { mockAuditLogs, mockTAs, mockCourses, mockAssignments, mockTimesheets } from "@/lib/data"
import { toast } from "sonner"

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (!data) {
          router.push('/login')
        } else if (data.role !== 'admin') {
          toast.error('Access denied. Admin privileges required.')
          router.push('/dashboard')
        } else {
          setUser(data)
        }
      })
  }, [router])

  if (!user) return null

  const exportBackup = () => {
    const backup = {
      tas: mockTAs,
      courses: mockCourses,
      assignments: mockAssignments,
      timesheets: mockTimesheets,
      auditLogs: mockAuditLogs,
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
    }

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ta-system-backup-${Date.now()}.json`
    a.click()

    toast.success('Backup exported successfully')
  }

  const getActionBadge = (action: string) => {
    const variants: Record<string, 'default' | 'destructive' | 'outline' | 'secondary'> = {
      create: 'default',
      update: 'secondary',
      delete: 'destructive',
      approve: 'default',
    }
    return variants[action] || 'outline'
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6 relative">
      <BackgroundStreaks variant="subtle" />

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">
              System management, audit logs, and data backup
            </p>
          </div>
        </div>
        <Button onClick={exportBackup}>
          <Download className="mr-2 h-4 w-4" />
          Export Backup
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 relative z-10">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTAs.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockTAs.filter(ta => ta.status === 'active').length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Audit Logs</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAuditLogs.length}</div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockAuditLogs.filter(log =>
                new Date(log.timestamp).getTime() > Date.now() - 3600000
              ).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Past hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <AlertTriangle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">Healthy</div>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Audit Logs */}
      <Tabs defaultValue="logs" className="relative z-10">
        <TabsList>
          <TabsTrigger value="logs">Audit Logs</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="system">System Info</TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Audit Logs</CardTitle>
              <CardDescription>
                Track all system changes and user actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAuditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="text-sm">
                        {formatTimestamp(log.timestamp)}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm font-medium">{log.userName}</p>
                          <p className="text-xs text-muted-foreground capitalize">{log.userRole}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getActionBadge(log.action)}>
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {log.entity}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-xs">
                        {log.changes ? (
                          <div className="space-y-1">
                            {Object.entries(log.changes).map(([key, value]) => (
                              <div key={key}>
                                <span className="font-medium">{key}:</span>{' '}
                                {String(value.old)} → {String(value.new)}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">No changes recorded</span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs font-mono">
                        {log.ipAddress || 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage teaching assistants and their assignments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Hours/Week</TableHead>
                    <TableHead>Courses</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTAs.map((ta) => (
                    <TableRow key={ta.id}>
                      <TableCell className="font-medium">{ta.name}</TableCell>
                      <TableCell className="text-sm">{ta.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={ta.status === 'active' ? 'default' : 'secondary'}
                        >
                          {ta.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{ta.hoursPerWeek}h</TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {ta.courses.map((course, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>
                Application version and deployment details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Version</p>
                  <p className="text-sm text-muted-foreground">1.0.0-beta</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Environment</p>
                  <p className="text-sm text-muted-foreground">Production</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Last Deployed</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Database</p>
                  <p className="text-sm text-muted-foreground">PostgreSQL (Connected)</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Cache</p>
                  <p className="text-sm text-muted-foreground">Redis (Active)</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Storage</p>
                  <p className="text-sm text-muted-foreground">Supabase Storage</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
