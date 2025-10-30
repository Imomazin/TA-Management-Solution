import { cookies } from 'next/headers'

/**
 * Mock authentication system using cookies
 * In a real app, this would connect to Supabase Auth or another auth provider
 */

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'staff' | 'ta' | 'instructor'
}

const COOKIE_NAME = 'ta-mgmt-session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

// Mock user database
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@test.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@test.com',
      name: 'Admin User',
      role: 'admin',
    },
  },
  'staff@test.com': {
    password: 'staff123',
    user: {
      id: '2',
      email: 'staff@test.com',
      name: 'Staff Member',
      role: 'staff',
    },
  },
  'ta@test.com': {
    password: 'ta123',
    user: {
      id: '3',
      email: 'ta@test.com',
      name: 'TA User',
      role: 'ta',
    },
  },
}

/**
 * Login function - validates credentials and sets a cookie
 */
export async function login(email: string, password: string): Promise<User | null> {
  const mockUser = mockUsers[email]

  if (!mockUser || mockUser.password !== password) {
    return null
  }

  // Set cookie
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, JSON.stringify(mockUser.user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })

  return mockUser.user
}

/**
 * Logout function - clears the session cookie
 */
export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

/**
 * Get current user from cookie
 */
export async function getUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(COOKIE_NAME)

  if (!sessionCookie?.value) {
    return null
  }

  try {
    return JSON.parse(sessionCookie.value) as User
  } catch {
    return null
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getUser()
  return user !== null
}

/**
 * Higher-order function to protect routes
 * Usage: const user = await requireAuth()
 */
export async function requireAuth(): Promise<User> {
  const user = await getUser()

  if (!user) {
    throw new Error('Unauthorized - please log in')
  }

  return user
}
