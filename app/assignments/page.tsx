import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AppShell } from '@/components/shell/app-shell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { mockAssignments } from '@/lib/data'

export default async function AssignmentsPage() {
  const user = await getUser()
  if (!user) redirect('/login')

  return (
    <AppShell user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
            <p className="text-muted-foreground">Track TA course assignments</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Assignment
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Assignments</CardTitle>
            <CardDescription>Current TA-to-course assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>TA Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Hours/Week</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAssignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell className="font-medium">{assignment.taName}</TableCell>
                    <TableCell>{assignment.courseName}</TableCell>
                    <TableCell>{assignment.hoursPerWeek}</TableCell>
                    <TableCell>{new Date(assignment.startDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(assignment.endDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={
                        assignment.status === 'active' ? 'default' :
                        assignment.status === 'completed' ? 'secondary' :
                        'outline'
                      }>
                        {assignment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}
