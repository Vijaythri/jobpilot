export type Status = 'Applied' | 'Interview' | 'Offer' | 'Rejected'

export interface Application {
  id: string
  user_id: string
  company: string
  role: string
  status: Status
  applied_date: string | null
  job_url: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export const RESUME_CATEGORIES = [
  'Software Engineering',
  'Data Science',
  'Product Management',
  'Design / UX',
  'Marketing',
  'Finance',
  'DevOps / Cloud',
  'Other',
] as const

export type ResumeCategory = typeof RESUME_CATEGORIES[number]

export interface Resume {
  id: string
  user_id: string
  name: string
  category: string
  file_path: string
  file_size: number | null
  created_at: string
}
