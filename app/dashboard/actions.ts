'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createApplication(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  await supabase.from('applications').insert({
    user_id: user.id,
    company: formData.get('company') as string,
    role: formData.get('role') as string,
    status: formData.get('status') as string,
    applied_date: (formData.get('applied_date') as string) || null,
    job_url: (formData.get('job_url') as string) || null,
    notes: (formData.get('notes') as string) || null,
  })

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function updateApplication(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  await supabase
    .from('applications')
    .update({
      company: formData.get('company') as string,
      role: formData.get('role') as string,
      status: formData.get('status') as string,
      applied_date: (formData.get('applied_date') as string) || null,
      job_url: (formData.get('job_url') as string) || null,
      notes: (formData.get('notes') as string) || null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .eq('user_id', user.id)

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

export async function deleteApplication(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  await supabase
    .from('applications')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  revalidatePath('/dashboard')
}
