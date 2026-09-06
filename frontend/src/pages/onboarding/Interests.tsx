import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  ArrowRight,
  Sparkles,
  Check,
  Flame,
  Shield,
  HelpCircle,
  Compass,
  HeartHandshake,
  BookOpen,
  Users,
  ShieldCheck,
  Music,
  Globe,
  Volume2,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useOnboardingStore } from '@/store/onboardingStore'

const TOPICS = [
  { id: 'Daily Prayer', icon: Flame },
  { id: 'Inner Peace & Anxiety', icon: Sparkles },
  { id: 'Identity in Christ', icon: Shield },
  { id: 'Faith & Hard Questions', icon: HelpCircle },
  { id: 'Purpose & Calling', icon: Compass },
  { id: 'Grace & Forgiveness', icon: HeartHandshake },
  { id: 'Reading Scripture Daily', icon: BookOpen },
  { id: 'Family & Marriage', icon: Users },
  { id: 'Spiritual Warfare', icon: ShieldCheck },
  { id: 'Praising in Difficulty', icon: Music },
  { id: 'Fellowship & Community', icon: Globe },
  { id: 'Hearing God’s Voice', icon: Volume2 },
]

export function Interests() {
  const navigate = useNavigate()
  const { interests, toggleInterest } = useOnboardingStore()

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
            src="/images/african-couple-bible.jpg"
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
          onClick={() => navigate('/onboarding')}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md ring-1 ring-white/20 transition-all hover:bg-white/25 active:scale-95"
          aria-label="Back to onboarding intro"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-purple-200 backdrop-blur-md">
          Step 1 of 2 · Topics
        </span>

        <button
          type="button"
          onClick={() => navigate('/onboarding/personalize')}
          className="rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md ring-1 ring-white/20 transition-all hover:bg-white/25 active:scale-95 cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* ── Main Content Layer with Fading Backdrop ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 mx-auto my-auto flex w-full max-w-lg flex-col px-6 py-6"
      >
        <h1 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-tight">
          What resonates with your heart right now?
        </h1>
        <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-purple-100/85">
          Choose a few topics you&apos;d like Scripture, guided reflections, and daily prayers to speak into.
        </p>

        {/* Interactive Topic Cards / Chips with Icons */}
        <div className="mt-6 flex flex-wrap gap-2.5">
          {TOPICS.map(({ id, icon: Icon }) => {
            const isSelected = interests.includes(id)
            return (
              <motion.button
                key={id}
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleInterest(id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer backdrop-blur-md ${
                  isSelected
                    ? 'border border-purple-300 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-950/50 ring-2 ring-purple-400/50 scale-[1.02]'
                    : 'border border-white/15 bg-white/10 text-white/90 hover:border-white/30 hover:bg-white/20 hover:text-white'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isSelected ? 'text-white' : 'text-purple-300'}`} />
                <span>{id}</span>
                {isSelected && <Check className="h-3.5 w-3.5 text-white ml-0.5 stroke-[2.5]" />}
              </motion.button>
            )
          })}
        </div>

        {/* Selected count pill */}
        {interests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-5"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium text-purple-200 backdrop-blur-md">
              <Check className="h-3.5 w-3.5 text-emerald-400 stroke-[3]" />
              {interests.length} {interests.length === 1 ? 'topic' : 'topics'} selected
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* ── Bottom Controls ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center px-6 pb-10 pt-4">
        <Button
          onClick={() => navigate('/onboarding/personalize')}
          size="lg"
          className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white shadow-xl shadow-purple-900/40 border border-white/20"
        >
          <span className="flex items-center justify-center gap-2 font-semibold">
            Continue to Personalize
            <ArrowRight className="h-4 w-4" />
          </span>
        </Button>
      </div>
    </div>
  )
}
