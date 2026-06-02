type LogoSize = 'sm' | 'md' | 'lg'

const sizes: Record<LogoSize, { icon: number; text: string }> = {
  sm: { icon: 24, text: 'text-base' },
  md: { icon: 32, text: 'text-xl' },
  lg: { icon: 40, text: 'text-2xl' },
}

export function Logo({ size = 'md' }: { size?: LogoSize }) {
  const { icon, text } = sizes[size]

  return (
    <div className="flex items-center gap-2.5">
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="10" fill="#4F46E5" />
        {/* Briefcase body */}
        <rect x="8" y="17" width="24" height="14" rx="2.5" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.8" />
        {/* Briefcase handle */}
        <path
          d="M15 17V15C15 13.9 15.9 13 17 13H23C24.1 13 25 13.9 25 15V17"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* Center divider line */}
        <line x1="8" y1="23" x2="32" y2="23" stroke="white" strokeWidth="1.8" strokeOpacity="0.5" />
        {/* Clasp dot */}
        <circle cx="20" cy="23" r="2.2" fill="white" />
        {/* Upward arrow suggesting career growth */}
        <path d="M20 7L23 11H21V14H19V11H17L20 7Z" fill="white" fillOpacity="0.8" />
      </svg>
      <span className={`${text} font-bold tracking-tight text-gray-900 dark:text-white`}>
        Job<span className="text-indigo-600">Pilot</span>
      </span>
    </div>
  )
}
