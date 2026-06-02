import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { StatsCards } from '@/components/StatsCards'
import { StatusChart } from '@/components/StatusChart'
import { ApplicationTable } from '@/components/ApplicationTable'
import { Application } from '@/lib/types'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data } = await supabase
    .from('applications')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const apps: Application[] = data ?? []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Applications</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Track your job search progress</p>
        </div>
        <Link
          href="/dashboard/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          + Add Application
        </Link>
      </div>

      <StatsCards apps={apps} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <StatusChart apps={apps} />
        </div>
        <div className="lg:col-span-2">
          <ApplicationTable apps={apps} />
        </div>
      </div>
    </div>
  )
}
