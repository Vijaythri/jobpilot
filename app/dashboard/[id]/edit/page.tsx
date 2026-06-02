import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { updateApplication } from '@/app/dashboard/actions'
import { ApplicationForm } from '@/components/ApplicationForm'

export default async function EditApplicationPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: app } = await supabase
    .from('applications')
    .select('*')
    .eq('id', id)
    .eq('user_id', user!.id)
    .single()

  if (!app) notFound()

  async function action(formData: FormData) {
    'use server'
    await updateApplication(id, formData)
  }

  return (
    <div className="max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Application</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          {app.company} — {app.role}
        </p>
      </div>
      <ApplicationForm action={action} initial={app} />
    </div>
  )
}
