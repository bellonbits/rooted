import { useState } from 'react'
import { ShieldCheck, Lock, X, Volume2 } from 'lucide-react'

type KidsParentModalProps = {
  isOpen: boolean
  onClose: () => void
  soundEnabled: boolean
  onToggleSound: () => void
}

export function KidsParentModal({
  isOpen,
  onClose,
  soundEnabled,
  onToggleSound,
}: KidsParentModalProps) {
  const [pin, setPin] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [pinError, setPinError] = useState(false)
  const [selectedAge, setSelectedAge] = useState<'5-7' | '8-10' | '11-13'>('8-10')
  const [safeAIToggled, setSafeAIToggled] = useState(true)
  const screenReminder = '20 minutes'

  if (!isOpen) return null

  const handleVerifyPIN = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple parental verification (default PIN: 1234 or any 4 digits)
    if (pin.length >= 4) {
      setIsUnlocked(true)
      setPinError(false)
    } else {
      setPinError(true)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
      <div className="relative w-full max-w-lg rounded-[36px] border border-white/20 bg-gradient-to-b from-indigo-950 via-purple-950 to-indigo-950 p-6 sm:p-8 text-white shadow-2xl space-y-6">
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {!isUnlocked ? (
          /* PIN Gate */
          <form onSubmit={handleVerifyPIN} className="text-center space-y-5 py-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-400/40">
              <Lock className="h-7 w-7" />
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold">Parent Access Gate</h2>
              <p className="text-xs text-purple-200/80 mt-1">
                Enter your 4-digit parent PIN to review your child&apos;s progress and adjust safety settings.
              </p>
            </div>

            <div className="mx-auto max-w-[200px]">
              <input
                type="password"
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="• • • •"
                className="w-full text-center tracking-[1em] text-2xl rounded-2xl border border-white/20 bg-white/10 p-3 text-white focus:border-emerald-400 focus:outline-none"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-rose-400 mt-2 font-semibold">
                  Please enter 4 digits (e.g. 1234)
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="rounded-full bg-emerald-500 px-8 py-3 text-xs font-black text-indigo-950 shadow-md hover:bg-emerald-400 transition-colors"
              >
                Unlock Parent Dashboard
              </button>
            </div>
          </form>
        ) : (
          /* Unlocked Parent Dashboard */
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <ShieldCheck className="h-7 w-7 text-emerald-400" />
              <div>
                <h2 className="font-serif text-xl font-bold">Child&apos;s ROOTED Journey</h2>
                <p className="text-xs text-purple-200/75">Peter · Explorer Account</p>
              </div>
            </div>

            {/* Weekly Activity Summary */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl bg-white/5 p-4 border border-white/10 text-center">
              <div>
                <p className="font-serif text-2xl font-black text-coral-400">12</p>
                <p className="text-[10px] uppercase font-bold text-purple-200">Stories</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-black text-amber-300">8</p>
                <p className="text-[10px] uppercase font-bold text-purple-200">Verses</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-black text-emerald-400">74%</p>
                <p className="text-[10px] uppercase font-bold text-purple-200">Progress</p>
              </div>
            </div>

            {/* Age Tier Selection (Section 27) */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-purple-300">
                Age-Adapted Experience Tier
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '5-7', label: 'Ages 5–7', desc: 'Audio & Visual' },
                  { id: '8-10', label: 'Ages 8–10', desc: 'Stories & Quizzes' },
                  { id: '11-13', label: 'Ages 11–13', desc: 'Deeper Scripture' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedAge(tier.id as '5-7' | '8-10' | '11-13')}
                    className={`rounded-2xl border p-3 text-center transition-all ${
                      selectedAge === tier.id
                        ? 'border-emerald-400 bg-emerald-500/30 ring-1 ring-emerald-400'
                        : 'border-white/10 bg-white/5'
                    }`}
                  >
                    <p className="text-xs font-bold text-white">{tier.label}</p>
                    <p className="text-[9px] text-purple-200/70">{tier.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="space-y-3 border-t border-white/10 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Kid-Safe Biblical AI Guide</p>
                  <p className="text-[10px] text-purple-200/70">Only pre-approved questions &amp; answers</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSafeAIToggled(!safeAIToggled)}
                  className={`h-6 w-11 rounded-full p-0.5 transition-colors ${
                    safeAIToggled ? 'bg-emerald-400' : 'bg-white/20'
                  }`}
                >
                  <div
                    className={`h-5 w-5 rounded-full bg-indigo-950 transition-transform ${
                      safeAIToggled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">Daily Screen-Time Reminder</p>
                  <p className="text-[10px] text-purple-200/70">Encourages healthy offline family time</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-coral-300">
                  {screenReminder}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-purple-300" />
                  <div>
                    <p className="text-xs font-bold text-white">Sound &amp; Background Ambience</p>
                    <p className="text-[10px] text-purple-200/70">Audio narration and gentle melody</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onToggleSound}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition-colors ${
                    soundEnabled
                      ? 'bg-emerald-400 text-indigo-950'
                      : 'bg-white/10 text-purple-300'
                  }`}
                >
                  {soundEnabled ? 'Enabled' : 'Muted'}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-full bg-emerald-500 py-3 text-xs font-black text-indigo-950 shadow-md hover:bg-emerald-400 transition-colors"
              >
                Save &amp; Return to Kids Mode
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
