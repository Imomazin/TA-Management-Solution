"use client"

import { ScheduleSlot } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const HOURS = Array.from({ length: 13 }, (_, i) => i + 8) // 8 AM to 8 PM

interface WeekCalendarProps {
  slots: ScheduleSlot[]
  conflicts?: string[]
}

export function WeekCalendar({ slots, conflicts = [] }: WeekCalendarProps) {
  const slotsByDay = slots.reduce((acc, slot) => {
    if (!acc[slot.dayOfWeek]) acc[slot.dayOfWeek] = []
    acc[slot.dayOfWeek].push(slot)
    return acc
  }, {} as Record<number, ScheduleSlot[]>)

  const calculatePosition = (startTime: string, endTime: string) => {
    const [startHour, startMin] = startTime.split(':').map(Number)
    const [endHour, endMin] = endTime.split(':').map(Number)

    const startPos = ((startHour - 8) + startMin / 60) * 60 // 60px per hour
    const endPos = ((endHour - 8) + endMin / 60) * 60

    return { top: startPos, height: endPos - startPos }
  }

  return (
    <div className="bg-card border rounded-lg overflow-hidden">
      <div className="grid grid-cols-8 border-b">
        <div className="p-4 border-r bg-muted/50" />
        {DAYS.map((day, i) => (
          <div key={i} className="p-4 text-center font-medium border-r last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-8 relative">
        {/* Time column */}
        <div className="border-r">
          {HOURS.map(hour => (
            <div key={hour} className="h-[60px] p-2 text-sm text-muted-foreground border-b">
              {hour}:00
            </div>
          ))}
        </div>

        {/* Day columns */}
        {[...Array(7)].map((_, dayIndex) => (
          <div key={dayIndex} className="border-r last:border-r-0 relative">
            {HOURS.map((hour, i) => (
              <div key={`${dayIndex}-${hour}`} className="h-[60px] border-b" />
            ))}

            {/* Schedule slots */}
            {slotsByDay[dayIndex]?.map(slot => {
              const { top, height } = calculatePosition(slot.startTime, slot.endTime)
              const hasConflict = conflicts.includes(slot.id)

              return (
                <div
                  key={slot.id}
                  className="absolute left-1 right-1 rounded p-1 text-xs overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                  style={{
                    top: `${top}px`,
                    height: `${height}px`,
                    backgroundColor: slot.color || 'hsl(var(--primary))',
                    border: hasConflict ? '2px solid hsl(var(--destructive))' : 'none',
                  }}
                  title={`${slot.courseName}\n${slot.startTime} - ${slot.endTime}\n${slot.location}`}
                >
                  <div className="font-semibold text-primary-foreground truncate">
                    {slot.courseName}
                  </div>
                  <div className="text-primary-foreground/80 truncate text-[10px]">
                    {slot.startTime} - {slot.endTime}
                  </div>
                  {hasConflict && (
                    <Badge variant="destructive" className="mt-1 text-[8px] px-1 py-0">
                      Conflict
                    </Badge>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
