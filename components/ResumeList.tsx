'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Resume } from '@/lib/types'
import { deleteResume } from '@/app/dashboard/resumes/actions'

export function ResumeList({ resumes }: { resumes: Resume[] }) {
  const [downloading, setDownloading] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)

  async function handleDownload(resume: Resume) {
    setDownloading(resume.id)
    const supabase = createClient()
    const { data, error } = await supabase.storage
      .from('Resumes')
      .createSignedUrl(resume.file_path, 60, { download: resume.name })

    if (!error && data?.signedUrl) {
      const a = document.createElement('a')
      a.href = data.signedUrl
      a.download = resume.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
    setDownloading(null)
  }

  async function handleDelete(resume: Resume) {
    if (!confirm(`Delete "${resume.name}"?`)) return
    setDeleting(resume.id)
    await deleteResume(resume.id, resume.file_path)
    setDeleting(null)
  }

  if (resumes.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-10 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-sm">No resumes uploaded yet.</p>
        <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">Upload your first resume using the form.</p>
      </div>
    )
  }

  const grouped = resumes.reduce<Record<string, Resume[]>>((acc, r) => {
    if (!acc[r.category]) acc[r.category] = []
    acc[r.category].push(r)
    return acc
  }, {})

  return (
    <div className="space-y-5">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2 px-1">
            {category}
          </h3>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {items.map(r => (
                  <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900 dark:text-white">{r.name}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 dark:text-gray-500 text-xs whitespace-nowrap">
                      {r.file_size ? `${(r.file_size / 1024).toFixed(0)} KB` : '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-400 dark:text-gray-500 text-xs whitespace-nowrap">
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleDownload(r)}
                          disabled={downloading === r.id}
                          className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 disabled:opacity-40 transition-colors"
                        >
                          {downloading === r.id ? 'Preparing...' : 'Download'}
                        </button>
                        <button
                          onClick={() => handleDelete(r)}
                          disabled={deleting === r.id}
                          className="text-xs font-medium text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 disabled:opacity-40 transition-colors"
                        >
                          {deleting === r.id ? '...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}
