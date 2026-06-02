'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Application, Status } from '@/lib/types'

const COLORS: Record<Status, string> = {
  Applied: '#3B82F6',
  Interview: '#EAB308',
  Offer: '#22C55E',
  Rejected: '#EF4444',
}

export function StatusChart({ apps }: { apps: Application[] }) {
  const counts: Record<Status, number> = { Applied: 0, Interview: 0, Offer: 0, Rejected: 0 }
  apps.forEach(a => counts[a.status]++)

  const data = (Object.entries(counts) as [Status, number][])
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name, value }))

  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 flex items-center justify-center h-64">
        <p className="text-sm text-gray-400 dark:text-gray-500">No data yet</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
      <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Status Breakdown</h2>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name as Status]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
