import { Trees, Plus, Flower2, Sun, Cloud, Sprout, Leaf } from 'lucide-react'

type KidsTreeGardenProps = {
  treeStage: number // 1: Seed, 2: Sprout, 3: Small Tree, 4: Growing Tree, 5: Fruitful Tree
  memorizedVerses: { ref: string; text: string; plantName: string; plantEmoji?: string }[]
  onOpenMemoryGame: () => void
}

const TREE_STAGES = [
  { stage: 1, name: 'Little Seed', description: 'Your faith journey begins with a tiny seed planted in God’s truth.' },
  { stage: 2, name: 'Tender Sprout', description: 'Growing green and thirsty for God’s living water!' },
  { stage: 3, name: 'Young Sapling', description: 'Your roots are digging deep into Scripture every day.' },
  { stage: 4, name: 'Strong Acacia', description: 'Standing brave and tall in the African sunshine!' },
  { stage: 5, name: 'Fruitful Tree', description: 'Bearing sweet fruits of love, joy, peace, patience, and kindness!' },
]

export function KidsTreeGarden({
  treeStage,
  memorizedVerses,
  onOpenMemoryGame,
}: KidsTreeGardenProps) {
  const currentStageInfo = TREE_STAGES[Math.min(treeStage - 1, TREE_STAGES.length - 1)]

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Trees className="h-5 w-5 text-emerald-400" />
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            Personal Spiritual Growth
          </p>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-black text-white tracking-tight mt-1">
          My ROOTED Tree
        </h1>
        <p className="text-xs sm:text-sm text-purple-200/80 max-w-lg mt-1">
          Watch your own tree grow taller and your verse garden blossom as you read and talk with God!
        </p>
      </div>

      {/* ========================================================================= */}
      {/* SIGNATURE FEATURE: THE LIVING TREE DISPLAY                                */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-[36px] border border-emerald-400/30 bg-gradient-to-b from-purple-950 via-indigo-950 to-[#0e171b] p-8 sm:p-12 text-center shadow-2xl">
        {/* Sun & Clouds visual decoration */}
        <div className="absolute top-4 left-6 select-none animate-pulse">
          <Sun className="h-8 w-8 text-amber-300" />
        </div>
        <div className="absolute top-8 right-10 select-none opacity-60">
          <Cloud className="h-7 w-7 text-purple-200" />
        </div>

        {/* Huge Animated Tree Icon Display */}
        <div className="my-6 inline-flex flex-col items-center justify-center">
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-emerald-500/15 ring-4 ring-emerald-400/30 shadow-2xl backdrop-blur-md">
            {treeStage === 1 && <Sprout className="h-16 w-16 text-emerald-400" />}
            {treeStage === 2 && <Leaf className="h-16 w-16 text-emerald-400" />}
            {treeStage === 3 && <Sprout className="h-20 w-20 text-emerald-300" />}
            {treeStage === 4 && <Trees className="h-20 w-20 text-emerald-300" />}
            {treeStage >= 5 && <Trees className="h-24 w-24 text-emerald-200" />}
          </div>

          <div className="mt-5">
            <span className="rounded-full bg-emerald-400 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-indigo-950 shadow-md">
              Stage {treeStage} of 5 · {currentStageInfo.name}
            </span>
            <p className="mt-3 font-serif text-base sm:text-lg italic text-purple-100 max-w-md mx-auto">
              &ldquo;{currentStageInfo.description}&rdquo;
            </p>
          </div>
        </div>

        {/* Tree Growth Milestones Progress bar */}
        <div className="mx-auto mt-6 max-w-md">
          <div className="flex justify-between text-[11px] font-bold text-emerald-300 mb-2">
            <span>Seed</span>
            <span>Sprout</span>
            <span>Sapling</span>
            <span>Tree</span>
            <span>Fruitful</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-white/10 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-300 shadow-sm transition-all duration-700"
              style={{ width: `${(treeStage / 5) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VERSE GARDEN (ONE VERSE = ONE PLANT)                                      */}
      {/* ========================================================================= */}
      <div className="rounded-[36px] border border-white/15 bg-white/5 p-6 sm:p-8 backdrop-blur-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-600/60 text-white">
              <Flower2 className="h-6 w-6 text-pink-300" />
            </span>
            <div>
              <h3 className="font-serif text-xl font-bold text-white">My Verse Garden</h3>
              <p className="text-xs text-purple-200/80">
                {memorizedVerses.length} flowers blooming from Scripture memorized
              </p>
            </div>
          </div>

          <button
            onClick={onOpenMemoryGame}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-coral-500 to-coral-400 px-5 py-2.5 text-xs font-black text-white shadow-md hover:scale-105 transition-all"
          >
            <Plus className="h-4 w-4" />
            Learn New Verse to Plant Flower
          </button>
        </div>

        {/* Garden Plots Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {memorizedVerses.map((v, i) => (
            <div
              key={i}
              className="flex items-start gap-3.5 rounded-3xl border border-pink-400/25 bg-gradient-to-b from-purple-900/40 to-indigo-950/50 p-4 transition-all hover:scale-[1.02]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-500/20 text-white shadow-xs ring-1 ring-pink-400/40">
                <Flower2 className="h-6 w-6 text-pink-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-pink-300">
                    {v.plantName}
                  </span>
                  <span className="text-[10px] text-purple-200">· {v.ref}</span>
                </div>
                <p className="font-serif text-xs italic text-white mt-1 leading-snug">
                  &ldquo;{v.text}&rdquo;
                </p>
              </div>
            </div>
          ))}

          {/* Empty Garden Plot Invitation */}
          <button
            onClick={onOpenMemoryGame}
            className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/20 p-6 text-center hover:border-coral-400 hover:bg-white/5 transition-all group"
          >
            <span className="text-3xl opacity-60 group-hover:scale-110 transition-transform">
              🌱
            </span>
            <p className="mt-2 text-xs font-bold text-coral-300">
              Plant a New Flower
            </p>
            <p className="text-[10px] text-purple-200/70">
              Memorize a verse to sprout your next bloom!
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}
