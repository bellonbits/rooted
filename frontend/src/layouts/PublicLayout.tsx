import { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { PageTransition } from '@/components/layout/PageTransition'
import { Sparkles, Menu, X, ChevronRight, BookOpen, Compass, Smile, Info, Mail } from 'lucide-react'

const LINKS = [
  { label: 'How It Works', path: '/how-it-works', icon: Compass },
  { label: 'Bible Experience', path: '/bible-preview', icon: BookOpen },
  { label: 'AI Companion', path: '/ai-companion', icon: Sparkles },
  { label: 'Kids Mode', path: '/kids', icon: Smile },
  { label: 'About ROOTED', path: '/about', icon: Info },
  { label: 'Contact', path: '/contact', icon: Mail },
]

export function PublicLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-lavender-50 text-indigo-900 selection:bg-purple-200">
      {/* Top Glassmorphic Navigation */}
      <header className="sticky top-0 z-40 border-b border-purple-100/70 bg-lavender-50/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-6 sm:py-4">
          <Link to="/" className="transition-transform hover:opacity-95 shrink-0">
            <Logo tagline={true} />
          </Link>

          {/* Desktop Links */}
          <nav className="hidden items-center gap-7 text-sm font-medium text-indigo-700 md:flex">
            {LINKS.slice(0, 6).map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                className={({ isActive }) =>
                  `transition-colors hover:text-purple-600 ${
                    isActive ? 'text-purple-700 font-semibold' : ''
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop & Mobile Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Link
              to="/login"
              className="text-sm font-semibold text-indigo-700 hover:text-purple-600 px-3 py-1.5 hidden sm:inline-block transition-colors"
            >
              Log in
            </Link>

            <Link to="/onboarding/splash" className="hidden sm:inline-flex">
              <Button size="sm" className="shadow-sm shadow-purple-600/20">
                <Sparkles className="h-4 w-4" />
                Start Your Journey
              </Button>
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-purple-200/80 bg-white/90 text-indigo-900 shadow-xs backdrop-blur-md transition-colors hover:bg-purple-50 active:scale-95 md:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 text-purple-700" /> : <Menu className="h-5 w-5 text-indigo-900" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navbar Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="overflow-hidden border-t border-purple-100/70 bg-lavender-50/95 shadow-xl backdrop-blur-2xl md:hidden"
            >
              <div className="flex flex-col gap-1 px-5 py-4">
                {LINKS.map((link) => {
                  const Icon = link.icon
                  return (
                    <NavLink
                      key={link.label}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                          isActive
                            ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/20'
                            : 'text-indigo-900 hover:bg-purple-100/60 hover:text-purple-700'
                        }`
                      }
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4 opacity-75" />
                        <span>{link.label}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 opacity-50" />
                    </NavLink>
                  )
                })}

                {/* Mobile Menu Action CTAs */}
                <div className="mt-4 flex flex-col gap-2.5 border-t border-purple-100 pt-4">
                  <Link to="/onboarding/splash" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="lg" className="w-full justify-center rounded-2xl shadow-md shadow-purple-600/25">
                      <Sparkles className="h-4 w-4" />
                      Start Your Journey Free
                    </Button>
                  </Link>

                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center rounded-xl border border-purple-200/80 bg-white/90 py-2.5 text-xs font-semibold text-indigo-900 shadow-xs hover:bg-purple-50 transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/app"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center rounded-xl border border-purple-200/80 bg-white/90 py-2.5 text-xs font-semibold text-purple-700 shadow-xs hover:bg-purple-50 transition-colors"
                    >
                      Open App →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content View */}
      <main>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>

      {/* Modern Editorial Footer */}
      <footer className="border-t border-purple-100/70 bg-warm-card/60 px-6 py-16 text-center text-sm text-indigo-500">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex justify-center">
            <Logo tagline={true} />
          </div>

          <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-indigo-500">
            A peaceful, modern Christian discipleship platform helping believers across Africa and the world
            read Scripture, understand God&apos;s Word, and grow deeper every day.
          </p>

          <nav className="mb-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-medium text-indigo-700">
            <Link to="/about" className="hover:text-purple-600">About</Link>
            <Link to="/how-it-works" className="hover:text-purple-600">How It Works</Link>
            <Link to="/bible-preview" className="hover:text-purple-600">Bible Experience</Link>
            <Link to="/ai-companion" className="hover:text-purple-600">AI Companion</Link>
            <Link to="/kids" className="hover:text-purple-600">Kids Mode</Link>
            <Link to="/contact" className="hover:text-purple-600">Contact</Link>
            <Link to="/app" className="text-purple-600 font-semibold hover:underline">Open Web App →</Link>
          </nav>

          <div className="border-t border-purple-100/60 pt-8 text-xs text-indigo-400">
            &copy; {new Date().getFullYear()} ROOTED. Grow deeper. Live the Word. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
