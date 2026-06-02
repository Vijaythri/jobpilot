'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Application, Status } from '@/lib/types'

const STATUSES: Status[] = ['Applied', 'Interview', 'Offer', 'Rejected']

interface Props {
  action: (formData: FormData) => Promise<void>
  initial?: Partial<Application>
}

export function ApplicationForm({ action, initial }: Props) {
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(() => action(formData))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Company <span className="text-red-500">*</span>
        </label>
        <input
          name="company"
          required
          defaultValue={initial?.company ?? ''}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g. Acme Corp"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Role <span className="text-red-500">*</span>
        </label>
        <input
          name="role"
          required
          defaultValue={initial?.role ?? ''}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g. Software Engineer"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
        <select
          name="status"
          defaultValue={initial?.status ?? 'Applied'}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {STATUSES.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Applied Date</label>
        <input
          name="applied_date"
          type="date"
          defaultValue={initial?.applied_date ?? ''}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job URL</label>
        <input
          name="job_url"
          type="url"
          defaultValue={initial?.job_url ?? ''}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes</label>
        <textarea
          name="notes"
          rows={3}
          defaultValue={initial?.notes ?? ''}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          placeholder="Any notes about this application..."
        />
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
        >
          {pending ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
