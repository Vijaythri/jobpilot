import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Nav */}
      <header className="px-8 py-5 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <Logo size="md" />
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/auth/login"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-4">
          Your job search, organized
        </span>
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white max-w-2xl leading-tight">
          Navigate your career with <span className="text-indigo-600 dark:text-indigo-400">JobPilot</span>
        </h1>
        <p className="mt-5 text-lg text-gray-500 dark:text-gray-400 max-w-xl">
          Track every application, follow up on time, and land your next role faster. All in one clean dashboard.
        </p>
        <div className="mt-10 flex items-center gap-4">
          <Link
            href="/auth/signup"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            Start tracking for free
          </Link>
          <Link
            href="/auth/login"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Already have an account →
          </Link>
        </div>
      </main>
    </div>
  )
}
