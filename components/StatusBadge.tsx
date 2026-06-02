import { Status } from '@/lib/types'

const styles: Record<Status, string> = {
  Applied: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Interview: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300',
  Offer: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  Rejected: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  )
}
