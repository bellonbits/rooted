import type { ReactNode } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

type EmptyStateProps = {
  illustration: ReactNode
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

/** Shared empty/error state: illustration, warm human copy, optional retry
 * action. Used instead of raw error text or dead space, per the rule that
 * every API-driven view needs an on-brand empty/error state, not a dev
 * artifact. */
export function EmptyState({ illustration, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <Card className="flex flex-col items-center px-6 py-10 text-center">
      <div className="h-16 w-24">{illustration}</div>
      <p className="mt-5 font-serif text-lg font-semibold text-forest-900">{title}</p>
      <p className="mt-2 max-w-xs text-sm text-ink-500">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-5 px-6 py-2.5 text-sm">
          {actionLabel}
        </Button>
      )}
    </Card>
  )
}
