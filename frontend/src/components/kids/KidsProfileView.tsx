import { useState } from 'react'
import { Shield } from 'lucide-react'

type KidsProfileViewProps = {
  growthPoints: number
  level: number
  levelName: string
  streakDays: number
  unlockedArtifacts: string[]
  onOpenParentModal: () => void
}

const ALL_ARTIFACTS = [
  { name: 'David’s Leather Sling', emoji: '🏹', story: 'Shepherd Hills', required: 'David & Goliath' },
  { name: 'Five Smooth Stones', emoji: '🪨', story: 'Shepherd Hills', required: 'David & Goliath' },
  { name: 'The Shepherd’s Harp', emoji: '🎵', story: 'Shepherd Hills', required: 'David & Goliath' },
  { name: 'Noah’s Ark', emoji: '🚢', story: 'Ark Valley', required: 'Noah' },
  { name: 'Peaceful Dove', emoji: '🕊️', story: 'Ark Valley', required: 'Noah' },
  { name: 'Rainbow Promise', emoji: '🌈', story: 'Ark Valley', required: 'Noah' },
]

const ACHIEVEMENTS = [
  { title: 'First Explorer', desc: 'Completed your first Bible adventure', icon: '🌟', unlocked: true },
  { title: 'Brave Heart', desc: 'Faced giant Goliath with David', icon: '🦁', unlocked: true },
  { title: 'Verse Planter', desc: 'Grew your first Verse Garden blossom', icon: '🌸', unlocked: true },
  { title: 'Prayer Warrior', desc: 'Talked with God 5 times', icon: '🕊️', unlocked: false },
  { title: 'Bible Detective', desc: 'Found all hidden artifacts in 3 stories', icon: '🔍', unlocked: false },
]

export function KidsProfileView({
  growthPoints,
  level,
  levelName,
  streakDays,
  unlockedArtifacts,
  onOpenParentModal,
}: KidsProfileViewProps) {
  const [activeTab, setActiveTab] = useState<'artifacts' | 'badges'>('artifacts')

  return (
    <div className="space-y-6 pb-20">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[36px] border border-white/15 bg-white/5 p-6 sm:p-8 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-tr from-coral-500 to-amber-400 text-3xl shadow-xl shadow-coral-500/30">
            🦁
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-coral-500 px-2.5 py-0.5 text-[10px] font-black uppercase text-white">
                Level {level}
              </span>
              <span className="text-xs text-purple-300 font-bold">{levelName}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-black text-white mt-1">
              Explorer Peter
            </h1>
            <p className="text-xs text-purple-200/75 mt-0.5">
              ⭐ {growthPoints} Growth Points · 🔥 {streakDays}-Day Exploring Rhythm
            </p>
          </div>
        </div>

        <button
          onClick={onOpenParentModal}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-950/40 px-5 py-2.5 text-xs font-bold text-emerald-300 hover:bg-emerald-900/40 transition-colors self-start sm:self-auto"
        >
          <Shield className="h-4 w-4" />
          Parent Dashboard
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('artifacts')}
          className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
            activeTab === 'artifacts'
              ? 'bg-coral-500 text-white shadow-md'
              : 'bg-white/10 text-purple-200 hover:bg-white/20'
          }`}
        >
          My Bible Artifacts
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
            activeTab === 'badges'
              ? 'bg-coral-500 text-white shadow-md'
              : 'bg-white/10 text-purple-200 hover:bg-white/20'
          }`}
        >
          Badges &amp; Achievements
        </button>
      </div>

      {/* Artifacts Grid */}
      {activeTab === 'artifacts' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ALL_ARTIFACTS.map((art) => {
            const isUnlocked =
              unlockedArtifacts.includes(art.name) ||
              art.name.includes('Sling') ||
              art.name.includes('Stones')

            return (
              <div
                key={art.name}
                className={`flex items-center gap-4 rounded-3xl border p-5 transition-all ${
                  isUnlocked
                    ? 'border-amber-400/40 bg-white/10 shadow-lg shadow-amber-400/5'
                    : 'border-white/10 bg-white/5 opacity-50'
                }`}
              >
                <span className="text-3xl select-none">{art.emoji}</span>
                <div>
                  <h3 className="font-serif text-sm font-bold text-white">
                    {art.name}
                  </h3>
                  <p className="text-[11px] text-purple-200/70">{art.story}</p>
                  <span className="inline-block mt-1 text-[10px] font-bold text-coral-400">
                    {isUnlocked ? '✓ Discovered' : '🔒 Explore Story to Unlock'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* Badges Grid */
        <div className="grid gap-4 sm:grid-cols-2">
          {ACHIEVEMENTS.map((ach) => (
            <div
              key={ach.title}
              className={`flex items-start gap-4 rounded-3xl border p-5 ${
                ach.unlocked
                  ? 'border-emerald-400/40 bg-white/10'
                  : 'border-white/10 bg-white/5 opacity-50'
              }`}
            >
              <span className="text-3xl">{ach.icon}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-sm font-bold text-white">{ach.title}</h3>
                  {ach.unlocked && (
                    <span className="rounded-full bg-emerald-400 px-2 py-0.5 text-[9px] font-black text-indigo-950">
                      Unlocked
                    </span>
                  )}
                </div>
                <p className="text-xs text-purple-200/80 mt-0.5">{ach.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
