import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { AppShell } from '@/components/shell/app-shell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Search } from 'lucide-react'
import { mockTAs } from '@/lib/data'

export default async function TAsPage() {
  const user = await getUser()
  if (!user) redirect('/login')

  return (
    <AppShell user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Teaching Assistants</h1>
            <p className="text-muted-foreground">Manage your TA roster</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add TA
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>TA Directory</CardTitle>
                <CardDescription>A list of all teaching assistants</CardDescription>
              </div>
              <div className="w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Search TAs..." className="pl-9" />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Hours/Week</TableHead>
                  <TableHead>GPA</TableHead>
                  <TableHead>Graduation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTAs.map((ta) => (
                  <TableRow key={ta.id}>
                    <TableCell className="font-medium">{ta.name}</TableCell>
                    <TableCell>{ta.email}</TableCell>
                    <TableCell>{ta.studentId}</TableCell>
                    <TableCell>
                      <Badge variant={
                        ta.status === 'active' ? 'default' :
                        ta.status === 'inactive' ? 'secondary' :
                        'outline'
                      }>
                        {ta.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{ta.hoursPerWeek}</TableCell>
                    <TableCell>{ta.gpa.toFixed(2)}</TableCell>
                    <TableCell>{ta.graduationYear}</TableCell>
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
