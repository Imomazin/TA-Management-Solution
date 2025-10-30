import { describe, it, expect } from 'vitest'
import { mockTAs, mockCourses, mockNotifications, calculateHoursFromSlot } from '@/lib/data'

describe('Mock Data', () => {
  it('should have valid TA data', () => {
    expect(mockTAs).toBeDefined()
    expect(mockTAs.length).toBeGreaterThan(0)
    expect(mockTAs[0]).toHaveProperty('name')
    expect(mockTAs[0]).toHaveProperty('email')
  })

  it('should have valid course data', () => {
    expect(mockCourses).toBeDefined()
    expect(mockCourses.length).toBeGreaterThan(0)
    expect(mockCourses[0]).toHaveProperty('code')
    expect(mockCourses[0]).toHaveProperty('name')
  })

  it('should have valid notifications', () => {
    expect(mockNotifications).toBeDefined()
    expect(mockNotifications.length).toBeGreaterThan(0)
    expect(mockNotifications[0]).toHaveProperty('title')
    expect(mockNotifications[0]).toHaveProperty('message')
  })

  it('should calculate hours correctly', () => {
    const hours = calculateHoursFromSlot('09:00', '11:00')
    expect(hours).toBe(2)

    const hours2 = calculateHoursFromSlot('14:00', '16:30')
    expect(hours2).toBe(2.5)
  })
})
