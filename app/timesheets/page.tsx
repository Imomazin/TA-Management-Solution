import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AppShell } from '@/components/shell/app-shell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { mockTimesheets } from '@/lib/data'

export default async function TimesheetsPage() {
  const user = await getUser()
  if (!user) redirect('/login')

  return (
    <AppShell user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Timesheets</h1>
            <p className="text-muted-foreground">Review and approve TA hours</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Timesheet
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Timesheets</CardTitle>
            <CardDescription>TA hour submissions and approvals</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>TA Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Week Starting</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTimesheets.map((timesheet) => (
                  <TableRow key={timesheet.id}>
                    <TableCell className="font-medium">{timesheet.taName}</TableCell>
                    <TableCell>{timesheet.courseName}</TableCell>
                    <TableCell>{new Date(timesheet.weekStarting).toLocaleDateString()}</TableCell>
                    <TableCell>{timesheet.hoursWorked}</TableCell>
                    <TableCell>
                      <Badge variant={
                        timesheet.status === 'approved' ? 'default' :
                        timesheet.status === 'submitted' ? 'secondary' :
                        'outline'
                      }>
                        {timesheet.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-xs truncate">
                      {timesheet.description}
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
