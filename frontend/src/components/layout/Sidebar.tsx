import { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BookOpen,
  Home,
  User,
  HandHeart,
  Sparkles,
  Compass,
  BookMarked,
  Feather,
  TrendingUp,
  Smile,
  GraduationCap,
  Settings,
  Bell,
  Search,
  Users2,
  X,
} from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import {
  SIDEBAR_PRIMARY_NAV,
  SIDEBAR_GROWTH_NAV,
  SIDEBAR_SPECIAL_NAV,
  type NavItem,
} from '@/constants/nav'
import { useUIStore } from '@/store/uiStore'
import { cn } from '@/utils/cn'

const ICON_MAP: Record<NavItem['icon'], typeof Home> = {
  home: Home,
  bible: BookOpen,
  journey: Sparkles,
  plans: BookMarked,
  discover: Compass,
  ai: Sparkles,
  journal: Feather,
  prayer: HandHeart,
  progress: TrendingUp,
  courses: GraduationCap,
  kids: Smile,
  search: Search,
  profile: User,
  community: Users2,
}

function NavLinksList({ onNavClick }: { onNavClick?: () => void }) {
  return (
    <>
      {/* Nav groups container */}
      <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-3.5 py-5 scrollbar-thin">
        {/* Core Navigation */}
        <div>
          <p className="px-3 pb-2 text-[10.5px] font-bold uppercase tracking-wider text-indigo-400">
            Navigation
          </p>
          <div className="flex flex-col gap-1">
            {SIDEBAR_PRIMARY_NAV.map(({ label, path, icon, badge }) => {
              const Icon = ICON_MAP[icon]
              return (
                <NavLink
                  key={path}
                  to={path}
                  end={path === '/app'}
                  onClick={onNavClick}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-sm shadow-purple-500/25'
                        : 'text-indigo-700 hover:bg-purple-50 hover:text-purple-900',
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                    <span>{label}</span>
                  </div>
                  {badge && (
                    <span className="rounded-full bg-coral-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                      {badge}
                    </span>
                  )}
                </NavLink>
              )
            })}
          </div>
        </div>

        {/* Growth & Spiritual Life */}
        <div>
          <p className="px-3 pb-2 text-[10.5px] font-bold uppercase tracking-wider text-indigo-400">
            Spiritual Growth
          </p>
          <div className="flex flex-col gap-1">
            {SIDEBAR_GROWTH_NAV.map(({ label, path, icon }) => {
              const Icon = ICON_MAP[icon]
              return (
                <NavLink
                  key={path}
                  to={path}
                  onClick={onNavClick}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-sm shadow-purple-500/25'
                        : 'text-indigo-700 hover:bg-purple-50 hover:text-purple-900',
                    )
                  }
                >
                  <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                  <span>{label}</span>
                </NavLink>
              )
            })}
          </div>
        </div>

        {/* Special Experiences */}
        <div>
          <p className="px-3 pb-2 text-[10.5px] font-bold uppercase tracking-wider text-indigo-400">
            Experiences
          </p>
          <div className="flex flex-col gap-1">
            {SIDEBAR_SPECIAL_NAV.map(({ label, path, icon, badge }) => {
              const Icon = ICON_MAP[icon]
              return (
                <NavLink
                  key={path}
                  to={path}
                  onClick={onNavClick}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-all',
                      isActive
                        ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-sm shadow-purple-500/25'
                        : 'text-indigo-700 hover:bg-purple-50 hover:text-purple-900',
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                    <span>{label}</span>
                  </div>
                  {badge && (
                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                      {badge}
                    </span>
                  )}
                </NavLink>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom Profile & Settings */}
      <div className="border-t border-purple-100/60 p-3.5">
        <div className="flex flex-col gap-1">
          <NavLink
            to="/app/notifications"
            onClick={onNavClick}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-purple-100 text-purple-900'
                  : 'text-indigo-700 hover:bg-purple-50 hover:text-purple-900',
              )
            }
          >
            <Bell className="h-4.5 w-4.5" strokeWidth={2} />
            <span>Notifications</span>
          </NavLink>
          <NavLink
            to="/app/settings"
            onClick={onNavClick}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-purple-100 text-purple-900'
                  : 'text-indigo-700 hover:bg-purple-50 hover:text-purple-900',
              )
            }
          >
            <Settings className="h-4.5 w-4.5" strokeWidth={2} />
            <span>Settings</span>
          </NavLink>
          <NavLink
            to="/app/profile"
            onClick={onNavClick}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-all',
                isActive
                  ? 'bg-purple-100 text-purple-900'
                  : 'text-indigo-700 hover:bg-purple-50 hover:text-purple-900',
              )
            }
          >
            <User className="h-4.5 w-4.5" strokeWidth={2} />
            <span>Profile</span>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export function Sidebar() {
  const { mobileSidebarOpen, setMobileSidebarOpen } = useUIStore()
  const location = useLocation()

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileSidebarOpen(false)
  }, [location.pathname, setMobileSidebarOpen])

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-purple-100/70 bg-warm-card/90 backdrop-blur-md md:flex">
        <div className="border-b border-purple-100/60 px-6 py-6">
          <NavLink to="/app">
            <Logo tagline={true} />
          </NavLink>
        </div>
        <NavLinksList />
      </aside>

      {/* Mobile Slide-Out Drawer Navigation */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative z-10 flex h-full w-72 max-w-[85vw] flex-col border-r border-purple-100 bg-warm-card shadow-2xl"
            >
              {/* Header with Logo and Close Button */}
              <div className="flex items-center justify-between border-b border-purple-100/60 px-5 py-5">
                <NavLink to="/app" onClick={() => setMobileSidebarOpen(false)}>
                  <Logo tagline={true} />
                </NavLink>
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-100 bg-white/80 text-indigo-700 shadow-xs hover:bg-purple-50 transition-colors cursor-pointer"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <NavLinksList onNavClick={() => setMobileSidebarOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
