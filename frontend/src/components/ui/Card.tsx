import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-[24px] border border-purple-100/60 bg-warm-card p-6 shadow-md transition-shadow hover:shadow-lg',
        className,
      )}
      {...props}
    />
  )
}
