'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function saveResumeMetadata(
  filePath: string,
  name: string,
  category: string,
  fileSize: number | null
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  await supabase.from('resumes').insert({
    user_id: user.id,
    name,
    category,
    file_path: filePath,
    file_size: fileSize,
  })

  revalidatePath('/dashboard/resumes')
}

export async function deleteResume(id: string, filePath: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  await supabase.storage.from('Resumes').remove([filePath])

  await supabase
    .from('resumes')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  revalidatePath('/dashboard/resumes')
}
