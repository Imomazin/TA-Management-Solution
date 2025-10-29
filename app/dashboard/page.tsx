import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import UserMenu from '@/components/UserMenu'

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">
                TA Management System
              </h1>
            </div>
            <div className="flex items-center">
              <UserMenu user={user} />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-700 rounded-lg h-96 p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Welcome to the Dashboard!
            </h2>
            <p className="text-gray-300 mb-4">
              You are logged in as: <strong>{user.email}</strong>
            </p>
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Quick Links
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li>
                    <a
                      href="/tas"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Manage TAs
                    </a>
                  </li>
                  <li>
                    <a
                      href="/courses"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Manage Courses
                    </a>
                  </li>
                  <li>
                    <a
                      href="/assignments"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Manage Assignments
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
