import { Sparkles, Sprout } from 'lucide-react'

type RootiBubbleProps = {
  message: string
  onClickAction?: () => void
  actionLabel?: string
}

export function RootiBubble({
  message,
  onClickAction,
  actionLabel,
}: RootiBubbleProps) {
  return (
    <div className="flex items-start gap-3.5 rounded-3xl border border-white/15 bg-gradient-to-r from-purple-900/70 via-indigo-900/70 to-purple-900/70 p-4 shadow-xl backdrop-blur-md">
      {/* ROOTI Character Icon Avatar */}
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-300 text-indigo-950 shadow-md ring-2 ring-white/30">
        <Sprout className="h-6 w-6 text-indigo-950" />
        <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-coral-500 text-[8px] font-black text-white">
          ✦
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="font-serif text-xs font-black uppercase tracking-wider text-emerald-300">
            ROOTI the Sprout
          </p>
          <span className="text-[10px] text-purple-200/80 font-medium">Bible Friend</span>
        </div>

        <p className="mt-1 text-xs sm:text-sm font-medium leading-relaxed text-white">
          &ldquo;{message}&rdquo;
        </p>

        {onClickAction && actionLabel && (
          <button
            onClick={onClickAction}
            className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-emerald-400 px-3 py-1 text-xs font-bold text-indigo-950 shadow-xs hover:bg-emerald-300 transition-colors"
          >
            <Sparkles className="h-3 w-3" />
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  )
}
