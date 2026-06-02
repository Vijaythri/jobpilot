import { createApplication } from '@/app/dashboard/actions'
import { ApplicationForm } from '@/components/ApplicationForm'

export default function NewApplicationPage() {
  return (
    <div className="max-w-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Application</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Track a new job application</p>
      </div>
      <ApplicationForm action={createApplication} />
    </div>
  )
}
