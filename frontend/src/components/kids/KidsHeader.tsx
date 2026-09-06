import { useNavigate } from 'react-router-dom'
import {
  Flame,
  Star,
  Volume2,
  VolumeX,
  Shield,
  ArrowLeft,
} from 'lucide-react'

type KidsHeaderProps = {
  growthPoints: number
  level: number
  levelName: string
  streakDays: number
  soundEnabled: boolean
  onToggleSound: () => void
  onOpenParentModal: () => void
}

export function KidsHeader({
  growthPoints,
  level,
  levelName,
  streakDays,
  soundEnabled,
  onToggleSound,
  onOpenParentModal,
}: KidsHeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-indigo-950/85 px-4 py-3 backdrop-blur-md sm:px-6">
      {/* Left: Exit & Level Badge */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/app')}
          className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-colors"
          title="Exit Kids Mode"
          aria-label="Exit to adult app"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-700/80 to-purple-600/80 px-3 py-1.5 ring-1 ring-white/15">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-coral-500 text-xs font-black text-white shadow-xs">
            {level}
          </span>
          <div className="hidden sm:block">
            <p className="text-[10px] font-medium uppercase tracking-wider text-purple-200">Level {level}</p>
            <p className="text-xs font-bold text-white leading-none">{levelName}</p>
          </div>
        </div>
      </div>

      {/* Center: Growth Points & Streak */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Growth Points */}
        <div className="flex items-center gap-1.5 rounded-2xl bg-white/10 px-3.5 py-1.5 ring-1 ring-white/10">
          <Star className="h-4 w-4 text-amber-300 fill-amber-300 animate-pulse" />
          <span className="font-serif text-sm sm:text-base font-black text-white">
            {growthPoints}
          </span>
          <span className="hidden sm:inline text-[10px] font-semibold text-purple-200 uppercase">
            XP
          </span>
        </div>

        {/* Gentle Encouraging Streak */}
        <div className="flex items-center gap-1.5 rounded-2xl bg-coral-500/20 px-3.5 py-1.5 ring-1 ring-coral-400/40 text-coral-300">
          <Flame className="h-4 w-4 fill-coral-400 text-coral-400" />
          <span className="font-serif text-sm sm:text-base font-black text-white">
            {streakDays}
          </span>
          <span className="hidden sm:inline text-[10px] font-semibold uppercase text-coral-200">
            Days
          </span>
        </div>
      </div>

      {/* Right: Sound & Parent Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSound}
          className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-colors ${
            soundEnabled
              ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
              : 'bg-white/10 text-purple-300 hover:bg-white/20'
          }`}
          title={soundEnabled ? 'Mute Sounds' : 'Turn On Music & Sounds'}
          aria-label="Toggle Sound"
        >
          {soundEnabled ? <Volume2 className="h-4.5 w-4.5" /> : <VolumeX className="h-4.5 w-4.5" />}
        </button>

        <button
          onClick={onOpenParentModal}
          className="flex h-10 items-center gap-1.5 rounded-2xl bg-white/10 px-3 py-1.5 text-xs font-bold text-white hover:bg-white/20 transition-colors ring-1 ring-white/10"
          title="Parent Dashboard"
        >
          <Shield className="h-4 w-4 text-emerald-400" />
          <span className="hidden md:inline">Parents</span>
        </button>
      </div>
    </header>
  )
}
