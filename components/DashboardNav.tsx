'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/dashboard', label: 'Applications' },
  { href: '/dashboard/resumes', label: 'Resumes' },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6">
      <div className="flex gap-1 max-w-7xl mx-auto">
        {links.map(({ href, label }) => {
          const active =
            href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`px-3 py-3 text-sm font-medium border-b-2 transition-colors ${
                active
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
