import { useNavigate } from 'react-router-dom'
import { Bell, Menu } from 'lucide-react'
import { motion } from 'framer-motion'
import { useUIStore } from '@/store/uiStore'

export function TopBar({ title }: { title: string }) {
  const navigate = useNavigate()
  const toggleMobileSidebar = useUIStore((s) => s.toggleMobileSidebar)

  return (
    <header className="flex items-center justify-between px-5 py-4 md:px-8 md:py-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleMobileSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple-200/80 bg-warm-card shadow-xs hover:bg-purple-50 transition-colors md:hidden cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5 text-indigo-900" />
        </button>
        <h1 className="font-serif text-lg font-semibold text-indigo-900 md:text-xl">{title}</h1>
      </div>

      <motion.button
        type="button"
        aria-label="Notifications"
        onClick={() => navigate('/app/notifications')}
        className="relative flex h-9 w-9 items-center justify-center rounded-full border border-purple-100 bg-warm-card shadow-sm hover:bg-purple-50 transition-colors cursor-pointer"
        whileTap={{ scale: 0.92 }}
      >
        <motion.span
          animate={{ rotate: [0, -12, 10, -8, 0] }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeInOut' }}
        >
          <Bell className="h-4.5 w-4.5 text-purple-600" strokeWidth={2} />
        </motion.span>
        <motion.span
          className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-coral-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.15 }}
        />
      </motion.button>
    </header>
  )
}
