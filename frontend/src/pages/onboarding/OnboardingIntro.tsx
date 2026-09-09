import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, HeartHandshake, Sprout, ChevronLeft, Check, ArrowRight, UserX } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { useAuthStore } from '@/store/authStore'

const BENEFITS = [
  { icon: BookOpen, label: 'Understand Scripture with context' },
  { icon: Sprout, label: 'Build consistent daily prayer habits' },
  { icon: HeartHandshake, label: 'Grow in your walk with God' },
]

const SLIDES = [
  {
    kind: 'benefits' as const,
    title: 'Welcome to ROOTED',
    subtitle: 'Grow Deep · Live the Word',
    body: 'A beautiful, distraction-free space designed to help you connect with God’s Word every single day.',
    image: '/images/african-couple-bible.jpg',
  },
  {
    kind: 'text' as const,
    title: 'Make Scripture part of your day',
    subtitle: 'Daily Rhythms & Prayer',
    body: 'Receive Scripture readings, quiet reflections, and guided prayers tailored to nurture your spiritual growth.',
    image: '/images/african-prayer-portrait.jpg',
  },
  {
    kind: 'text' as const,
    title: 'A Faith-Filled Community',
    subtitle: 'Walk Together',
    body: 'Connect with fellow believers across Africa, share prayer requests, and encourage one another on the journey.',
    image: '/images/african-group-study.jpg',
  },
]

export function OnboardingIntro() {
  const [index, setIndex] = useState(0)
  const navigate = useNavigate()
  const continueAsGuest = useAuthStore((s) => s.continueAsGuest)
  const slide = SLIDES[index]
  const isLast = index === SLIDES.length - 1

  function next() {
    if (isLast) {
      navigate('/onboarding/interests')
    } else {
      setIndex((i) => i + 1)
    }
  }

  async function skipAsGuest() {
    await continueAsGuest()
    navigate('/app')
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-indigo-950 text-white select-none">
      {/* ── Full-Bleed Background Images with Fading Crossfade ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.image}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic Fading Gradient Overlays */}
        {/* Dark bottom fade for content readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/85 via-45% to-indigo-950/30" />
        {/* Subtle top vignette for navigation buttons */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
        {/* Violet ambient tint */}
        <div className="absolute inset-0 bg-purple-900/20 mix-blend-multiply pointer-events-none" />
      </div>

      {/* ── Top Bar ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-lg items-center justify-between px-6 pt-8 sm:pt-10">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          className={`flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md ring-1 ring-white/20 transition-all hover:bg-white/25 active:scale-95 ${
            index === 0 ? 'invisible pointer-events-none' : ''
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Centered Small Logo */}
        <div className="flex items-center gap-2">
          <Logo variant="white" tagline={false} />
        </div>

        <button
          type="button"
          onClick={() => navigate('/onboarding/interests')}
          className="rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md ring-1 ring-white/20 transition-all hover:bg-white/25 active:scale-95 cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* ── Middle/Bottom Slide Content with Smooth Fade Transitions ── */}
      <div className="relative z-10 mx-auto mt-auto flex w-full max-w-lg flex-col items-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex w-full flex-col items-center"
          >
            {/* Tagline Badge */}
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-purple-200 backdrop-blur-md">
              {slide.subtitle}
            </span>

            {/* Title */}
            <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-tight">
              {slide.title}
            </h1>

            {/* Description Body */}
            <p className="mt-3 max-w-md text-sm sm:text-base leading-relaxed text-purple-100/85">
              {slide.body}
            </p>

            {/* Benefits Checklist (Slide 1) */}
            {slide.kind === 'benefits' && (
              <div className="mt-6 flex w-full flex-col gap-2.5">
                {BENEFITS.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3.5 rounded-2xl border border-white/15 bg-white/10 p-3.5 text-left backdrop-blur-md shadow-lg"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-500/30 text-purple-200 ring-1 ring-white/20">
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-white">{label}</span>
                    <Check className="ml-auto h-4 w-4 text-emerald-400 stroke-[2.5]" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom Controls & Actions ── */}
      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center gap-4 px-6 pb-10 pt-6">
        {/* Carousel indicator dots */}
        <div className="flex items-center gap-2 mb-1">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-7 bg-white shadow-sm' : 'w-2 bg-white/35 hover:bg-white/55'
              }`}
            />
          ))}
        </div>

        {/* Primary CTA */}
        <Button
          onClick={next}
          size="lg"
          className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white shadow-xl shadow-purple-900/40 border border-white/20"
        >
          <span className="flex items-center justify-center gap-2 font-semibold">
            {isLast ? 'Get Started' : 'Continue'}
            <ArrowRight className="h-4 w-4" />
          </span>
        </Button>

        {/* Join as Guest Pill Button */}
        <div className="flex flex-col items-center gap-2.5 mt-1">
          <button
            type="button"
            onClick={skipAsGuest}
            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-purple-200 backdrop-blur-md hover:bg-white/20 hover:text-white transition-all cursor-pointer"
          >
            <UserX className="h-3.5 w-3.5" />
            Join as Guest
          </button>

          <p className="text-xs text-purple-300/70">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-white hover:text-purple-200 underline underline-offset-2">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
