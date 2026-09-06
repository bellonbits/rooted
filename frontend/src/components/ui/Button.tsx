import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverse' | 'coral' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 text-white shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 hover:brightness-105 active:scale-[0.98]',
  secondary:
    'bg-purple-100/80 text-purple-900 border border-purple-200/50 hover:bg-purple-200/70 active:scale-[0.98]',
  ghost:
    'bg-transparent text-purple-700 hover:bg-purple-50 active:bg-purple-100/50',
  inverse:
    'bg-white text-purple-900 shadow-md hover:bg-cream-50 active:scale-[0.98]',
  coral:
    'bg-gradient-to-r from-coral-500 to-coral-400 text-white shadow-md shadow-coral-500/25 hover:brightness-105 active:scale-[0.98]',
  outline:
    'border-2 border-purple-600/30 text-purple-700 hover:border-purple-600 hover:bg-purple-50 active:scale-[0.98]',
}

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-xs font-semibold',
  md: 'px-6 py-3 text-sm font-medium',
  lg: 'px-8 py-4 text-base font-medium',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
