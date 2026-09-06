import { NavLink } from 'react-router-dom'
import { BookOpen, Menu, Search, Sparkles, User } from 'lucide-react'
import { cn } from '@/utils/cn'
import { useAuthStore } from '@/store/authStore'
import { useUIStore } from '@/store/uiStore'

const NAV_ITEMS = [
  { label: 'Bible', path: '/app/bible', icon: BookOpen },
  { label: 'Search', path: '/app/bible/search', icon: Search },
  { label: 'Journey', path: '/app/journey', icon: Sparkles },
]

export function BottomNav() {
  const initial = useAuthStore((s) => s.user?.name?.[0])
  const toggleMobileSidebar = useUIStore((s) => s.toggleMobileSidebar)

  return (
    <div className="fixed inset-x-0 bottom-4 z-30 flex justify-center px-4 md:hidden pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-between gap-1 rounded-full bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 px-6 py-2.5 shadow-xl shadow-purple-900/30 ring-1 ring-white/20 backdrop-blur-lg">
        <button
          type="button"
          onClick={toggleMobileSidebar}
          aria-label="Open navigation menu"
          className="flex h-11 w-11 flex-col items-center justify-center rounded-full transition-all"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-purple-200/80 transition-all hover:text-white">
            <Menu className="h-5 w-5" strokeWidth={2} />
          </div>
        </button>

        {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            aria-label={label}
            className="flex h-11 w-11 flex-col items-center justify-center rounded-full transition-all"
          >
            {({ isActive }) => (
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full transition-all',
                  isActive
                    ? 'bg-white text-purple-700 shadow-md scale-105'
                    : 'text-purple-200/80 hover:text-white',
                )}
              >
                <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              </div>
            )}
          </NavLink>
        ))}

        <NavLink
          to="/app/profile"
          aria-label="Profile"
          className="flex h-11 w-11 flex-col items-center justify-center rounded-full transition-all"
        >
          {({ isActive }) => (
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-full font-serif font-bold transition-all',
                isActive
                  ? 'bg-white text-purple-700 shadow-md scale-105'
                  : 'bg-white/15 text-purple-100 hover:bg-white/25 hover:text-white',
              )}
            >
              {initial ? (
                <span className="text-sm uppercase">{initial}</span>
              ) : (
                <User className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              )}
            </div>
          )}
        </NavLink>

        {/* Quick AI Companion floating trigger */}
        <NavLink
          to="/app/ai"
          aria-label="Ask ROOTED AI"
          className="ml-1 flex h-10 w-10 items-center justify-center rounded-full bg-coral-500 text-white shadow-md shadow-coral-500/40 hover:scale-105 transition-all"
        >
          <Sparkles className="h-4.5 w-4.5" />
        </NavLink>
      </nav>
    </div>
  )
}
