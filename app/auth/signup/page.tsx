'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Logo } from '@/components/Logo'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    if (data.session) {
      router.push('/dashboard')
      router.refresh()
    } else {
      setMessage('Check your email to confirm your account, then log in.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="mb-8">
        <Logo size="lg" />
      </div>

      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Create an account</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Start navigating your job search</p>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              placeholder="Min. 6 characters"
            />
          </div>

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          {message && <p className="text-sm text-green-600 dark:text-green-400">{message}</p>}

          <button
            type="submit"
            disabled={loading || !!message}
            className="w-full bg-indigo-600 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
