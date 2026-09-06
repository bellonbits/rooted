import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

/** Wraps route content with a settled fade + upward slide on navigation —
 * calm and premium rather than an instant snap-cut, per the motion spec.
 * Keyed by pathname so it retriggers on every route change. */
export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation()
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
