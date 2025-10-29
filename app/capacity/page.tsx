"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/shell/app-shell'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TrendingUp, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { mockCapacityUtilization, mockCapacityRules } from '@/lib/data'
import type { User } from '@/lib/auth'
import { Progress } from '@/components/ui/progress'

export default function CapacityPage() {
  const [user, setUser] = useState<User | null>(null)
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

  const totalCapacity = mockCapacityUtilization.reduce((sum, ta) => sum + ta.hoursCapacity, 0)
  const totalScheduled = mockCapacityUtilization.reduce((sum, ta) => sum + ta.hoursScheduled, 0)
  const overCapacityCount = mockCapacityUtilization.filter(ta => ta.status === 'over').length
  const underUtilizedCount = mockCapacityUtilization.filter(ta => ta.utilizationPercent < 70).length

  return (
    <AppShell user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <TrendingUp className="h-8 w-8" />
            Capacity Planning
          </h1>
          <p className="text-muted-foreground">Monitor TA capacity and workload distribution</p>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCapacity}h</div>
              <Progress value={(totalScheduled / totalCapacity) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {totalScheduled}h scheduled ({Math.round((totalScheduled / totalCapacity) * 100)}%)
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active TAs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockCapacityUtilization.length}</div>
            </CardContent>
          </Card>
          <Card className="border-destructive/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-destructive">Over Capacity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{overCapacityCount}</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-500/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-yellow-600 dark:text-yellow-500">
                Under-Utilized
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-500">
                {underUtilizedCount}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Capacity Rules */}
        <Card>
          <CardHeader>
            <CardTitle>Capacity Rules</CardTitle>
            <CardDescription>Active rules governing TA workload limits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockCapacityRules.map(rule => (
                <div key={rule.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {rule.enforced ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium">{rule.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Maximum: {rule.value} {rule.unit}
                      </p>
                    </div>
                  </div>
                  <Badge variant={rule.enforced ? 'default' : 'secondary'}>
                    {rule.enforced ? 'Enforced' : 'Suggested'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* TA Utilization Table */}
        <Card>
          <CardHeader>
            <CardTitle>TA Capacity Utilization</CardTitle>
            <CardDescription>Current workload status for each TA</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>TA Name</TableHead>
                  <TableHead>Scheduled</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Utilization</TableHead>
                  <TableHead>Conflicts</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCapacityUtilization.map(ta => (
                  <TableRow key={ta.taId}>
                    <TableCell className="font-medium">{ta.taName}</TableCell>
                    <TableCell>{ta.hoursScheduled}h</TableCell>
                    <TableCell>{ta.hoursCapacity}h</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-24">
                          <Progress
                            value={Math.min(ta.utilizationPercent, 100)}
                            className={ta.utilizationPercent > 100 ? 'bg-destructive/20' : ''}
                          />
                        </div>
                        <span className={`text-sm font-medium ${
                          ta.utilizationPercent > 100 ? 'text-destructive' :
                          ta.utilizationPercent < 70 ? 'text-yellow-600 dark:text-yellow-500' :
                          'text-green-600 dark:text-green-500'
                        }`}>
                          {ta.utilizationPercent}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {ta.conflictCount > 0 ? (
                        <Badge variant="destructive">{ta.conflictCount}</Badge>
                      ) : (
                        <Badge variant="outline">0</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        ta.status === 'over' ? 'destructive' :
                        ta.status === 'optimal' ? 'default' :
                        'secondary'
                      }>
                        {ta.status === 'over' && <AlertTriangle className="mr-1 h-3 w-3" />}
                        {ta.status}
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
