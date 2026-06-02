'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { saveResumeMetadata } from '@/app/dashboard/resumes/actions'
import { RESUME_CATEGORIES, ResumeCategory } from '@/lib/types'

export function ResumeUploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [name, setName] = useState('')
  const [category, setCategory] = useState<ResumeCategory>(RESUME_CATEGORIES[0])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return
    setError('')
    setSuccess(false)
    setUploading(true)

    try {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const ext = file.name.split('.').pop()
      const filePath = `${user.id}/${crypto.randomUUID()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('Resumes')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      await saveResumeMetadata(filePath, name.trim() || file.name, category, file.size)

      setFile(null)
      setName('')
      setCategory(RESUME_CATEGORIES[0])
      if (inputRef.current) inputRef.current.value = ''
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 space-y-4"
    >
      <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Upload Resume</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          File <span className="text-red-500">*</span>
        </label>
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          required
          onChange={e => setFile(e.target.files?.[0] ?? null)}
          className="w-full text-sm text-gray-600 dark:text-gray-300
            file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0
            file:text-xs file:font-medium
            file:bg-indigo-50 file:text-indigo-700
            dark:file:bg-indigo-900/30 dark:file:text-indigo-400
            hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/50
            transition-colors cursor-pointer"
        />
        {file && (
          <p className="mt-1 text-xs text-gray-400">
            {file.name} &middot; {(file.size / 1024).toFixed(0)} KB
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Label</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={file?.name ?? 'e.g. Backend Engineer Resume'}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Domain / Category <span className="text-red-500">*</span>
        </label>
        <select
          value={category}
          onChange={e => setCategory(e.target.value as ResumeCategory)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {RESUME_CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      {success && <p className="text-sm text-green-600 dark:text-green-400">Resume uploaded successfully!</p>}

      <button
        type="submit"
        disabled={uploading || !file}
        className="w-full bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
      >
        {uploading ? 'Uploading...' : 'Upload Resume'}
      </button>
    </form>
  )
}
