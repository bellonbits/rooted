import { ChevronRight, ChevronLeft, ArrowRight, Check, Bell, BookMarked, UserX } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useMutation } from '@tanstack/react-query'
import { Button } from '@/components/ui/Button'
import { Switch } from '@/components/ui/Switch'
import { SPIRITUAL_STAGES } from '@/constants/nav'
import { useOnboardingStore } from '@/store/onboardingStore'
import { useAuthStore } from '@/store/authStore'
import { userService } from '@/services/user.service'

const STAGE_DESCRIPTIONS: Record<string, string> = {
  beginner: 'Taking my first steps in understanding Scripture and following Jesus',
  growing: 'Building daily spiritual habits and deepening my prayer life',
  mature: 'Rooted in the Word, exploring deep study and encouraging others',
}

export function Personalize() {
  const navigate = useNavigate()
  const { token, continueAsGuest } = useAuthStore()
  const { spiritualStage, setSpiritualStage, interests, notificationsEnabled, setNotificationsEnabled } =
    useOnboardingStore()

  const { mutate: saveAndContinue, isPending } = useMutation({
    mutationFn: async () => {
      if (token) {
        await userService.updateProfile({ spiritualStage, interests, notificationsEnabled })
      }
    },
    onSettled: () => {
      if (token) {
        navigate('/app')
      } else {
        navigate('/register')
      }
    },
  })

  async function skipAsGuest() {
    await continueAsGuest()
    navigate('/app')
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-indigo-950 text-white select-none">
      {/* ── Full-Bleed Background Image with Fading Effect ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.85, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src="/images/african-prayer-portrait.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </motion.div>

        {/* Fading gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/85 via-50% to-indigo-950/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-purple-900/25 mix-blend-multiply" />
      </div>

      {/* ── Top Bar ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-lg items-center justify-between px-6 pt-8 sm:pt-10">
        <button
          type="button"
          onClick={() => navigate('/onboarding/interests')}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md ring-1 ring-white/20 transition-all hover:bg-white/25 active:scale-95"
          aria-label="Back to topics"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-purple-200 backdrop-blur-md">
          Step 2 of 2 · Journey Stage
        </span>

        <button
          type="button"
          onClick={() => (token ? navigate('/app') : navigate('/register'))}
          className="rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md ring-1 ring-white/20 transition-all hover:bg-white/25 active:scale-95 cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* ── Main Content Layer ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 mx-auto my-auto flex w-full max-w-lg flex-col px-6 py-6"
      >
        <h1 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-tight">
          Where are you on your walk of faith?
        </h1>
        <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-purple-100/85">
          ROOTED personalizes your daily Scripture plans, reflections, and insights based on your spiritual season.
        </p>

        {/* Spiritual Stages Selection Cards */}
        <div className="mt-6 flex flex-col gap-3">
          {SPIRITUAL_STAGES.map((stage) => {
            const isSelected = spiritualStage === stage.value
            return (
              <button
                key={stage.value}
                type="button"
                onClick={() => setSpiritualStage(stage.value)}
                className={`flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all cursor-pointer backdrop-blur-md ${
                  isSelected
                    ? 'border-purple-300 bg-gradient-to-r from-purple-900/70 to-indigo-900/70 text-white shadow-xl shadow-purple-950/60 ring-2 ring-purple-400/40'
                    : 'border-white/15 bg-white/10 text-white/90 hover:border-white/30 hover:bg-white/20'
                }`}
              >
                <div
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                    isSelected
                      ? 'border-purple-400 bg-purple-500 text-white'
                      : 'border-white/40 bg-white/10'
                  }`}
                >
                  {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{stage.label}</p>
                  <p className="mt-0.5 text-xs text-purple-200/80 leading-relaxed">
                    {STAGE_DESCRIPTIONS[stage.value]}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Preferences Section */}
        <h2 className="mt-7 text-xs font-bold uppercase tracking-wider text-purple-300/80">
          Preferences
        </h2>

        <div className="mt-2.5 divide-y divide-white/10 rounded-2xl border border-white/15 bg-white/10 shadow-lg backdrop-blur-md">
          {/* Notifications Toggle */}
          <div className="flex items-center justify-between px-4 py-3.5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-500/30 text-purple-200 ring-1 ring-white/20">
                <Bell className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Daily Reminders</p>
                <p className="text-xs text-purple-200/70">Morning devotional &amp; prayer prompt</p>
              </div>
            </div>
            <Switch
              checked={notificationsEnabled}
              onChange={setNotificationsEnabled}
              label="Daily Reminders"
            />
          </div>

          {/* Selected Topics Link */}
          <button
            type="button"
            onClick={() => navigate('/onboarding/interests')}
            className="flex w-full items-center justify-between px-4 py-3.5 text-left hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-500/30 text-purple-200 ring-1 ring-white/20">
                <BookMarked className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Selected Topics</p>
                <p className="text-xs text-purple-200/70">
                  {interests.length > 0 ? `${interests.length} topics chosen` : 'Select topics'}
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-purple-300" />
          </button>
        </div>
      </motion.div>

      {/* ── Bottom Controls ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center gap-3 px-6 pb-10 pt-4">
        <Button
          onClick={() => saveAndContinue()}
          disabled={isPending}
          size="lg"
          className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white shadow-xl shadow-purple-900/40 border border-white/20"
        >
          <span className="flex items-center justify-center gap-2 font-semibold">
            {isPending ? 'Saving…' : token ? 'Continue to App' : 'Create Free Account & Save'}
            <ArrowRight className="h-4 w-4" />
          </span>
        </Button>

        {!token && (
          <button
            type="button"
            onClick={skipAsGuest}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-purple-200 backdrop-blur-md hover:bg-white/20 hover:text-white transition-all cursor-pointer"
          >
            <UserX className="h-3.5 w-3.5" />
            Join as Guest
          </button>
        )}
      </div>
    </div>
  )
}
