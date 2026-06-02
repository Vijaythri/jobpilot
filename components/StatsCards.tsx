import { Application } from '@/lib/types'

export function StatsCards({ apps }: { apps: Application[] }) {
  const total = apps.length
  const applied = apps.filter(a => a.status === 'Applied').length
  const interview = apps.filter(a => a.status === 'Interview').length
  const offer = apps.filter(a => a.status === 'Offer').length

  const cards = [
    { label: 'Total', value: total, color: 'text-gray-900 dark:text-white' },
    { label: 'Applied', value: applied, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Interviewing', value: interview, color: 'text-yellow-600 dark:text-yellow-400' },
    { label: 'Offers', value: offer, color: 'text-green-600 dark:text-green-400' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map(c => (
        <div key={c.label} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
          <p className="text-sm text-gray-500 dark:text-gray-400">{c.label}</p>
          <p className={`text-3xl font-bold mt-1 ${c.color}`}>{c.value}</p>
        </div>
      ))}
    </div>
  )
}
