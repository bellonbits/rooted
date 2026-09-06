import { useState } from 'react'
import { Star, Sparkles, ArrowLeft } from 'lucide-react'

type KidsMemoryGameProps = {
  onBack: () => void
  onMemorizeComplete: (verse: { ref: string; text: string; plantName: string; plantEmoji: string }) => void
  onRewardXP: (amount: number) => void
}

export function KidsMemoryGame({
  onBack,
  onMemorizeComplete,
  onRewardXP,
}: KidsMemoryGameProps) {
  const [slot1, setSlot1] = useState<string | null>(null)
  const [slot2, setSlot2] = useState<string | null>(null)
  const [isUnlocked, setIsUnlocked] = useState(false)

  const wordChoices = ['all', 'some', 'Christ', 'myself', 'giants']

  const handleSelectWord = (word: string) => {
    if (!slot1) {
      setSlot1(word)
    } else if (!slot2) {
      setSlot2(word)
      if (slot1 === 'all' && word === 'Christ') {
        setIsUnlocked(true)
        onRewardXP(40)
        onMemorizeComplete({
          ref: 'Philippians 4:13',
          text: 'I can do all things through Christ who strengthens me.',
          plantName: 'Courage Blossom',
          plantEmoji: '🌸',
        })
      }
    }
  }

  const handleReset = () => {
    setSlot1(null)
    setSlot2(null)
    setIsUnlocked(false)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 pb-20">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold text-purple-200 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="rounded-[36px] border border-amber-400/30 bg-gradient-to-b from-purple-950 via-indigo-950 to-purple-950 p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-amber-300">
            <Star className="h-5 w-5 fill-amber-300" />
            <span className="text-xs font-black uppercase tracking-wider">
              Memory Challenge · Philippians 4:13
            </span>
          </div>
          <span className="rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300">
            +40 XP
          </span>
        </div>

        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-white">
            Fill in the Missing Words!
          </h2>
          <p className="mt-1 text-xs text-purple-200/80">
            Tap the correct words below to lock God&apos;s Word into your heart.
          </p>
        </div>

        {/* Verse Board with Interactive Missing Slots */}
        <div className="rounded-3xl border border-white/15 bg-white/5 p-6 text-center">
          <div className="font-serif text-xl sm:text-2xl leading-loose text-white">
            &ldquo;I can do{' '}
            <span
              onClick={() => setSlot1(null)}
              className={`inline-block min-w-[70px] cursor-pointer rounded-xl border-2 px-3 py-1 text-sm sm:text-base font-black transition-all ${
                slot1 === 'all'
                  ? 'border-emerald-400 bg-emerald-500/30 text-emerald-300 ring-2 ring-emerald-400/50'
                  : slot1
                  ? 'border-rose-400 bg-rose-500/30 text-rose-300'
                  : 'border-dashed border-amber-300/80 bg-white/10 text-amber-200 animate-pulse'
              }`}
            >
              {slot1 || '___'}
            </span>{' '}
            things through{' '}
            <span
              onClick={() => setSlot2(null)}
              className={`inline-block min-w-[70px] cursor-pointer rounded-xl border-2 px-3 py-1 text-sm sm:text-base font-black transition-all ${
                slot2 === 'Christ'
                  ? 'border-emerald-400 bg-emerald-500/30 text-emerald-300 ring-2 ring-emerald-400/50'
                  : slot2
                  ? 'border-rose-400 bg-rose-500/30 text-rose-300'
                  : 'border-dashed border-amber-300/80 bg-white/10 text-amber-200 animate-pulse'
              }`}
            >
              {slot2 || '___'}
            </span>{' '}
            who strengthens me.&rdquo;
          </div>
          <p className="mt-4 font-serif text-sm font-semibold text-coral-300">
            — Philippians 4:13
          </p>
        </div>

        {/* Word Choices */}
        {!isUnlocked ? (
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-purple-300">
              Tap a word to place it:
            </p>
            <div className="flex flex-wrap gap-2.5">
              {wordChoices.map((w) => (
                <button
                  key={w}
                  onClick={() => handleSelectWord(w)}
                  disabled={slot1 === w || slot2 === w}
                  className="rounded-2xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-black text-white hover:bg-white/25 active:scale-95 disabled:opacity-40 transition-all"
                >
                  {w}
                </button>
              ))}
            </div>

            {slot1 && slot2 && (slot1 !== 'all' || slot2 !== 'Christ') && (
              <div className="flex items-center justify-between rounded-2xl bg-rose-500/20 p-3 border border-rose-400/40 text-xs text-rose-200">
                <span>Oops! That&apos;s close. Try putting &quot;all&quot; and &quot;Christ&quot; in place!</span>
                <button
                  onClick={handleReset}
                  className="font-bold underline text-white ml-2"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Unlocked Celebration Banner */
          <div className="rounded-3xl border border-emerald-400/50 bg-gradient-to-r from-emerald-950/60 to-purple-950/60 p-6 text-center text-white space-y-4 animate-fade-in">
            <div className="flex items-center justify-center gap-2 text-emerald-300 text-lg font-black">
              <Sparkles className="h-6 w-6" />
              <span>⭐ Memory Unlocked!</span>
            </div>
            <p className="text-sm text-purple-100">
              A brand new <strong>Courage Blossom 🌸</strong> just sprouted in your Verse Garden!
            </p>
            <button
              onClick={onBack}
              className="rounded-full bg-emerald-400 px-6 py-2.5 text-xs font-black text-indigo-950 shadow-md hover:bg-emerald-300 transition-colors"
            >
              See My Verse Garden →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
