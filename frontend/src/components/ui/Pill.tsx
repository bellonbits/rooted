import type { ButtonHTMLAttributes } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/utils/cn'

type PillProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof HTMLMotionProps<'button'>> &
  HTMLMotionProps<'button'> & {
    active?: boolean
  }

export function Pill({ active, className, ...props }: PillProps) {
  return (
    <motion.button
      type="button"
      animate={{ scale: active ? 1.03 : 1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      className={cn(
        'rounded-full border px-4 py-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer',
        active
          ? 'border-purple-600 bg-purple-600 text-white shadow-md shadow-purple-600/20 ring-2 ring-purple-400/30'
          : 'border-purple-200/80 bg-white/90 text-indigo-900 hover:border-purple-300 hover:bg-purple-50/70 shadow-xs',
        className,
      )}
      {...props}
    />
  )
}
