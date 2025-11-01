export type SessionUser = {
  id: string
  email: string
  name: string
  role: "ADMIN" | "COORDINATOR" | "TA"
}

// Backward compatible User type
export type User = {
  id: string
  email: string
  name: string
  role: 'admin' | 'staff' | 'ta' | 'instructor'
}

// Simple dev-only mock. Swap with Supabase later.
export function getSessionUser(): SessionUser {
  return {
    id: process.env.MOCK_USER_ID ?? "u_admin_1",
    email: "admin@example.edu",
    name: "Admin User",
    role: "ADMIN"
  }
}

// Backward compatible function for existing code
export async function getUser(): Promise<User | null> {
  const session = getSessionUser()
  return {
    ...session,
    role: session.role.toLowerCase() as 'admin' | 'staff' | 'ta' | 'instructor'
  }
}

// Mock login function for backward compatibility
export async function login(email: string, password: string): Promise<User | null> {
  // Simple mock - always returns admin user for valid credentials
  if (email && password) {
    const session = getSessionUser()
    return {
      ...session,
      role: session.role.toLowerCase() as 'admin' | 'staff' | 'ta' | 'instructor'
    }
  }
  return null
}

// Mock logout function for backward compatibility
export async function logout(): Promise<void> {
  // In a real app, this would clear cookies/sessions
  return Promise.resolve()
}
