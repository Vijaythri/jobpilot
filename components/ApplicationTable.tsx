'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Application } from '@/lib/types'
import { StatusBadge } from '@/components/StatusBadge'
import { deleteApplication } from '@/app/dashboard/actions'

export function ApplicationTable({ apps }: { apps: Application[] }) {
  const [deleting, setDeleting] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  async function handleDelete(id: string) {
    if (!confirm('Delete this application?')) return
    setDeleting(id)
    await deleteApplication(id)
    setDeleting(null)
  }

  const filtered = apps.filter(app => {
    const q = query.toLowerCase()
    return (
      app.company.toLowerCase().includes(q) ||
      app.role.toLowerCase().includes(q) ||
      (app.applied_date ?? '').includes(q)
    )
  })

  if (apps.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-10 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">No applications yet.</p>
        <Link
          href="/dashboard/new"
          className="mt-3 inline-block text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
        >
          Add your first one →
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
        <input
          type="text"
          placeholder="Search by company, role, or date..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full text-sm px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
        />
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-sm text-gray-400 dark:text-gray-500 py-8">No results for &quot;{query}&quot;</p>
      )}
      {filtered.length > 0 && (
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Company</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Role</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
            <th className="text-left px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Applied</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {filtered.map(app => (
            <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                {app.job_url ? (
                  <a
                    href={app.job_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    {app.company}
                  </a>
                ) : (
                  app.company
                )}
              </td>
              <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{app.role}</td>
              <td className="px-4 py-3">
                <StatusBadge status={app.status} />
              </td>
              <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                {app.applied_date
                  ? new Date(app.applied_date + 'T00:00:00').toLocaleDateString('en-US')
                  : '—'}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/dashboard/${app.id}/edit`}
                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(app.id)}
                    disabled={deleting === app.id}
                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 font-medium disabled:opacity-40"
                  >
                    {deleting === app.id ? '...' : 'Delete'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  )
}
