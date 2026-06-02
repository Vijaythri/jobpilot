import { createClient } from '@/lib/supabase/server'
import { Resume } from '@/lib/types'
import { ResumeUploadForm } from '@/components/ResumeUploadForm'
import { ResumeList } from '@/components/ResumeList'

export default async function ResumesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  const resumes: Resume[] = data ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Resumes</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          Upload and organize your resumes by domain
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ResumeUploadForm />
        </div>
        <div className="lg:col-span-2">
          <ResumeList resumes={resumes} />
        </div>
      </div>
    </div>
  )
}
