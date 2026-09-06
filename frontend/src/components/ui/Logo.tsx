type LogoProps = {
  className?: string
  withWordmark?: boolean
  tagline?: boolean
  variant?: 'purple' | 'white' | 'dark'
}

export function Logo({
  className = '',
  withWordmark = true,
  tagline = false,
  variant = 'purple',
}: LogoProps) {
  const isWhite = variant === 'white'
  const isDark = variant === 'dark'

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Modern ROOTED Leaf & Root Symbol */}
      <div
        className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl shadow-sm transition-transform hover:scale-105 ${
          isWhite
            ? 'bg-white/15 text-white ring-1 ring-white/30'
            : isDark
            ? 'bg-purple-900 text-purple-200'
            : 'bg-gradient-to-tr from-purple-600 via-purple-500 to-purple-400 text-white shadow-purple-500/20'
        }`}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Main Stem */}
          <path d="M12 22V7" strokeWidth="2.2" />
          {/* Top Sprouting Leaves */}
          <path d="M12 7c-2.5-4-7-4-8 0 3 1.5 6 1.5 8 0z" fill="currentColor" fillOpacity="0.25" />
          <path d="M12 7c2.5-4 7-4 8 0-3 1.5-6 1.5-8 0z" fill="currentColor" fillOpacity="0.25" />
          {/* Deeper Root Branches */}
          <path d="M9 14c-2 1-3.5 3-4.5 5" strokeWidth="1.8" />
          <path d="M15 14c2 1 3.5 3 4.5 5" strokeWidth="1.8" />
          <path d="M10 18c-1 .5-2 1.5-2.5 2.5" strokeWidth="1.5" />
          <path d="M14 18c1 .5 2 1.5 2.5 2.5" strokeWidth="1.5" />
        </svg>
      </div>

      {withWordmark && (
        <div className="flex flex-col">
          <span
            className={`font-serif text-xl font-bold tracking-tight leading-none ${
              isWhite ? 'text-white' : isDark ? 'text-white' : 'text-indigo-900'
            }`}
          >
            ROOTED
          </span>
          {tagline && (
            <span
              className={`text-[9.5px] font-medium tracking-widest uppercase mt-0.5 ${
                isWhite ? 'text-purple-200/80' : 'text-purple-600/80'
              }`}
            >
              Grow Deep · Walk With God
            </span>
          )}
        </div>
      )}
    </div>
  )
}
