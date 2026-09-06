import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import anime from 'animejs'
import { Button } from '@/components/ui/Button'
import { Tilt3DCard } from '@/components/ui/Tilt3DCard'
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Heart,
  Share2,
  Bookmark,
  Volume2,
  Smile,
  Users,
  Compass,
  ChevronRight,
} from 'lucide-react'

export function Home() {
  const [savedPrayer, setSavedPrayer] = useState(false)
  const [savedVerse, setSavedVerse] = useState(false)
  const [journeySteps, setJourneySteps] = useState([
    { id: 1, title: "Read today's Scripture", ref: "Mark 4:1–20", completed: true },
    { id: 2, title: "Reflect on the Word", ref: "Understanding the Seed", completed: true },
    { id: 3, title: "Complete today's prayer", ref: "A quiet moment with God", completed: false },
    { id: 4, title: "Answer today's reflection", ref: "What is God speaking to you?", completed: false },
  ])

  // Refs for Anime.js animations
  const blob1Ref = useRef<HTMLDivElement>(null)
  const blob2Ref = useRef<HTMLDivElement>(null)
  const floatCard1Ref = useRef<HTMLDivElement>(null)
  const floatCard2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Ambient breathing background blobs
    if (blob1Ref.current) {
      anime({
        targets: blob1Ref.current,
        translateY: ['-20px', '20px'],
        translateX: ['-12px', '12px'],
        scale: [1, 1.08],
        opacity: [0.35, 0.5],
        duration: 6200,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
      })
    }

    if (blob2Ref.current) {
      anime({
        targets: blob2Ref.current,
        translateY: ['18px', '-18px'],
        scale: [1, 1.14],
        opacity: [0.3, 0.48],
        duration: 7400,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
      })
    }

    // Hero floating badge 1: Study Progress card
    if (floatCard1Ref.current) {
      anime({
        targets: floatCard1Ref.current,
        translateY: ['-8px', '8px'],
        duration: 3600,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutQuad',
      })
    }

    // Hero floating badge 2: Daily Prayer pill (out of sync)
    if (floatCard2Ref.current) {
      anime({
        targets: floatCard2Ref.current,
        translateY: ['8px', '-8px'],
        duration: 4400,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutQuad',
      })
    }
  }, [])

  const toggleStep = (id: number) => {
    setJourneySteps((steps) =>
      steps.map((s) => (s.id === id ? { ...s, completed: !s.completed } : s)),
    )
  }

  const completedCount = journeySteps.filter((s) => s.completed).length
  const journeyProgress = Math.round((completedCount / journeySteps.length) * 100)

  return (
    <div className="relative overflow-hidden">
      {/* ── Anime.js Animated Ambient Glow Blobs ── */}
      <div
        ref={blob1Ref}
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[550px] w-[800px] -translate-x-1/2 rounded-full bg-purple-200/40 blur-3xl"
      />
      <div
        ref={blob2Ref}
        className="pointer-events-none absolute top-[850px] -left-40 -z-10 h-[500px] w-[500px] rounded-full bg-purple-100/50 blur-3xl"
      />

      {/* ========================================================================= */}
      {/* SECTION: HERO WITH 3D INTERACTIVE PHONE & ANIME.JS FLOATING BADGES        */}
      {/* ========================================================================= */}
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-24 md:pt-16 lg:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Headline, Description & CTAs (Framer Motion entrance) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-start lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100/90 px-4 py-1.5 text-xs font-semibold text-purple-800 shadow-xs ring-1 ring-purple-200">
              <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              <span>Grow deeper · Live the Word</span>
            </div>

            <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-indigo-900 sm:text-5xl lg:text-6xl lg:leading-[1.12]">
              Grow deeper in{' '}
              <span className="bg-gradient-to-r from-purple-700 via-purple-600 to-coral-500 bg-clip-text text-transparent">
                God&apos;s Word.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-indigo-700">
              A simple, beautiful way to read Scripture, understand what it means, and build a daily
              habit that transforms your heart. Built for African believers, youth, and families.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link to="/onboarding/splash">
                  <Button size="lg" className="shadow-lg shadow-purple-600/25">
                    Start Your Journey
                    <ArrowRight className="h-4.5 w-4.5" />
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link to="/app/bible">
                  <Button variant="secondary" size="lg">
                    <BookOpen className="h-4.5 w-4.5 text-purple-700" />
                    Explore the Bible
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* Micro stat endorsement */}
            <div className="mt-10 flex items-center gap-4 border-t border-purple-100/80 pt-6">
              <div className="flex -space-x-2">
                <div className="h-9 w-9 rounded-full ring-2 ring-white overflow-hidden bg-purple-200">
                  <img src="/images/african-prayer-portrait.jpg" alt="" className="h-full w-full object-cover" />
                </div>
                <div className="h-9 w-9 rounded-full ring-2 ring-white overflow-hidden bg-purple-300">
                  <img src="/images/african-couple-bible.jpg" alt="" className="h-full w-full object-cover" />
                </div>
                <div className="h-9 w-9 rounded-full ring-2 ring-white overflow-hidden bg-coral-400 flex items-center justify-center text-xs font-bold text-white">
                  +10k
                </div>
              </div>
              <p className="text-xs font-medium text-indigo-500">
                Join thousands of believers reading &amp; growing together across the continent.
              </p>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Floating Mockup with Anime.js Badges */}
          <div className="relative lg:col-span-6">
            <div className="relative mx-auto max-w-[420px] lg:max-w-none">
              {/* Main Phone Frame with 3D Tilt */}
              <Tilt3DCard glow maxTilt={6}>
                <div className="relative mx-auto w-full max-w-[340px] overflow-hidden rounded-[40px] border-4 border-white/80 bg-gradient-to-b from-purple-700 via-purple-600 to-purple-800 p-4 shadow-2xl shadow-purple-900/25 ring-1 ring-purple-300/40">
                  {/* Phone Top Header */}
                  <div className="flex items-center justify-between px-2 pt-2 pb-3 text-white">
                    <div>
                      <h3 className="font-serif text-xl font-bold tracking-tight">ROOTED</h3>
                      <p className="text-[10px] text-purple-200/90 flex items-center gap-1">
                        Into the Divine Realm <span>▾</span>
                      </p>
                    </div>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs">
                      ✦
                    </div>
                  </div>

                  {/* Primary Photo Card with Scripture Overlay */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[28px] shadow-lg">
                    <img
                      src="/images/african-couple-bible.jpg"
                      alt="Young African couple reading Scripture peacefully"
                      className="h-full w-full object-cover"
                    />
                    {/* Subtle dark gradient overlay for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                    {/* Scripture Text Overlay (Psalm 37:4) */}
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <p className="font-serif text-sm font-semibold text-purple-200">
                        Psalm 37:4
                      </p>
                      <p className="mt-1 font-serif text-sm italic leading-relaxed text-white/95">
                        &ldquo;Take delight in the Lord, and He will give you the desires of your heart.&rdquo;
                      </p>
                      <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-2 text-[11px] text-white/80">
                        <span>Today&apos;s Word</span>
                        <Link to="/app/bible/psalms/37" className="flex items-center gap-1 text-purple-200 font-medium hover:text-white transition-colors">
                          Read Scripture →
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Carousel Dots */}
                  <div className="mt-3 flex justify-center gap-1.5 py-1">
                    <span className="h-1.5 w-5 rounded-full bg-white" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                  </div>

                  {/* Bottom Floating Bar */}
                  <div className="mt-2 flex items-center justify-around rounded-full bg-white/10 px-4 py-2 text-white/80 backdrop-blur-md">
                    <div className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-purple-800 shadow-sm">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Bible</span>
                    </div>
                    <Compass className="h-4 w-4" />
                    <Sparkles className="h-4 w-4" />
                  </div>
                </div>
              </Tilt3DCard>

              {/* Floating Element 1: Top Right Study Progress Card (Anime.js floating) */}
              <div
                ref={floatCard1Ref}
                className="pointer-events-auto absolute -top-6 -right-6 hidden sm:flex w-64 flex-col gap-2 rounded-3xl border border-purple-100/80 bg-white/95 p-4 shadow-xl shadow-purple-900/10 backdrop-blur-md transition-all hover:scale-[1.03] z-20"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-500">
                    Study Progress Update
                  </span>
                  <span className="rounded-full bg-coral-100 px-2 py-0.5 text-[10px] font-bold text-coral-500">
                    Keep going
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-indigo-700">
                  &ldquo;You are 65% through studying the Book of Romans. God&apos;s word is transforming your heart and mind!&rdquo;
                </p>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="font-serif text-2xl font-bold text-indigo-900">65%</span>
                  <span className="text-[11px] text-indigo-400">Romans 8 of 16</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-indigo-100">
                  <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-coral-500 to-coral-400 shadow-xs" />
                </div>
              </div>

              {/* Floating Element 2: Bottom Left Daily Prayer Pill (Anime.js floating) */}
              <div
                ref={floatCard2Ref}
                className="pointer-events-auto absolute -bottom-8 -left-8 hidden sm:flex w-72 items-center gap-3.5 rounded-3xl border border-purple-100/80 bg-white/95 p-3.5 shadow-xl shadow-purple-900/10 backdrop-blur-md transition-all hover:scale-[1.03] z-20"
              >
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-purple-400/40">
                  <img
                    src="/images/african-prayer-portrait.jpg"
                    alt="African young man in prayer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-xs font-bold text-indigo-900">Daily Prayer</h4>
                    <span className="text-[10px] font-medium text-purple-600">Numbers 6</span>
                  </div>
                  <p className="line-clamp-2 text-[11px] leading-snug text-indigo-600 mt-0.5">
                    &ldquo;Lord, make your face shine on us and give us peace.&rdquo;
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSavedPrayer(!savedPrayer)}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors cursor-pointer ${
                    savedPrayer ? 'bg-purple-600 text-white' : 'bg-purple-100/70 text-purple-700 hover:bg-purple-200'
                  }`}
                  aria-label="Save prayer"
                >
                  <Heart className="h-4 w-4" fill={savedPrayer ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION: TODAY'S SCRIPTURE (3D TILT DEVOTIONAL CARD)                       */}
      {/* ========================================================================= */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-purple-600">
            Scripture for the Heart
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-indigo-900 sm:text-4xl">
            Today&apos;s Word
          </h2>
        </motion.div>

        <Tilt3DCard glow maxTilt={5}>
          <div className="relative overflow-hidden rounded-[32px] border border-purple-200/70 bg-gradient-to-br from-white via-purple-50/40 to-cream-50 p-8 sm:p-12 shadow-xl shadow-purple-900/5">
            <div className="flex flex-col items-center text-center">
              <span className="rounded-full bg-purple-100 px-4 py-1 text-xs font-bold uppercase tracking-wider text-purple-700">
                Psalm 37:4 · ESV
              </span>

              <blockquote className="mt-6 max-w-2xl font-serif text-2xl font-medium leading-snug text-indigo-900 sm:text-3xl sm:leading-relaxed">
                &ldquo;Take delight in the Lord, and he will give you the desires of your heart.&rdquo;
              </blockquote>

              <p className="mt-4 max-w-lg text-sm leading-relaxed text-indigo-600">
                True joy begins when our deepest affections are centered on God. As we delight in Him,
                He transforms our desires to align with His divine purpose.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/app/bible/psalms/37">
                  <Button size="sm">
                    <BookOpen className="h-4 w-4" />
                    Read the verse in context
                  </Button>
                </Link>
                <Link to="/app/journal">
                  <Button variant="secondary" size="sm">
                    Reflect
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSavedVerse(!savedVerse)}
                >
                  <Bookmark className="h-4 w-4" fill={savedVerse ? 'currentColor' : 'none'} />
                  {savedVerse ? 'Saved' : 'Save'}
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </Tilt3DCard>
      </section>

      {/* ========================================================================= */}
      {/* SECTION: HOW ROOTED WORKS (4 DISTINCT 3D TILT CARDS)                      */}
      {/* ========================================================================= */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-purple-600">
            A Daily Spiritual Rhythm
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-indigo-900 sm:text-4xl">
            How ROOTED Works
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-indigo-600">
            Four simple practices designed to weave God&apos;s Word into your everyday life.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* 01 Read */}
          <Tilt3DCard maxTilt={8}>
            <div className="group relative flex flex-col justify-between h-full rounded-3xl border border-purple-100 bg-white p-7 shadow-md transition-all hover:shadow-xl hover:shadow-purple-900/10">
              <div>
                <span className="font-serif text-3xl font-black text-purple-200 group-hover:text-purple-600 transition-colors">
                  01
                </span>
                <h3 className="mt-3 font-serif text-xl font-bold text-indigo-900">Read</h3>
                <p className="mt-2 text-sm leading-relaxed text-indigo-600">
                  Engage Scripture in a clean, distraction-free reader designed for peaceful contemplation.
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-semibold text-purple-600">
                <span>Distraction-free</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </Tilt3DCard>

          {/* 02 Understand */}
          <Tilt3DCard maxTilt={8}>
            <div className="group relative flex flex-col justify-between h-full rounded-3xl border border-purple-200/60 bg-gradient-to-b from-purple-50/50 to-white p-7 shadow-md transition-all hover:shadow-xl hover:shadow-purple-900/10">
              <div>
                <span className="font-serif text-3xl font-black text-purple-300 group-hover:text-purple-600 transition-colors">
                  02
                </span>
                <h3 className="mt-3 font-serif text-xl font-bold text-indigo-900">Understand</h3>
                <p className="mt-2 text-sm leading-relaxed text-indigo-600">
                  Ask tough questions and explore historical context with an AI companion grounded strictly in Scripture.
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-semibold text-purple-600">
                <span>Biblically grounded AI</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </Tilt3DCard>

          {/* 03 Reflect */}
          <Tilt3DCard maxTilt={8}>
            <div className="group relative flex flex-col justify-between h-full rounded-3xl border border-purple-100 bg-white p-7 shadow-md transition-all hover:shadow-xl hover:shadow-purple-900/10">
              <div>
                <span className="font-serif text-3xl font-black text-purple-200 group-hover:text-purple-600 transition-colors">
                  03
                </span>
                <h3 className="mt-3 font-serif text-xl font-bold text-indigo-900">Reflect</h3>
                <p className="mt-2 text-sm leading-relaxed text-indigo-600">
                  Journal your personal lessons, thoughts, and spiritual insights in a private, encrypted sanctuary.
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-semibold text-purple-600">
                <span>Spiritual Journal</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </Tilt3DCard>

          {/* 04 Grow */}
          <Tilt3DCard maxTilt={8}>
            <div className="group relative flex flex-col justify-between h-full rounded-3xl border border-coral-200/60 bg-gradient-to-b from-coral-50/40 to-white p-7 shadow-md transition-all hover:shadow-xl hover:shadow-coral-500/10">
              <div>
                <span className="font-serif text-3xl font-black text-coral-300 group-hover:text-coral-500 transition-colors">
                  04
                </span>
                <h3 className="mt-3 font-serif text-xl font-bold text-indigo-900">Grow</h3>
                <p className="mt-2 text-sm leading-relaxed text-indigo-600">
                  Build a consistent, life-long habit of discipleship. Track growth without stressful pressure.
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-semibold text-coral-600">
                <span>Gentle Encouragement</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </Tilt3DCard>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION: TODAY'S JOURNEY INTERACTIVE CHECKLIST                             */}
      {/* ========================================================================= */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <Tilt3DCard glow maxTilt={5}>
          <div className="rounded-[36px] border border-purple-200/80 bg-warm-card p-8 sm:p-12 shadow-xl shadow-purple-900/10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-800">
                  <span>Today&apos;s Journey</span>
                  <span>·</span>
                  <span>September 5</span>
                </div>
                <h2 className="mt-3 font-serif text-3xl font-bold text-indigo-900 sm:text-4xl">
                  Your walk continues.
                </h2>
                <p className="mt-2 text-sm text-indigo-600">
                  Step through today&apos;s reading, reflection, and quiet prayer.
                </p>
              </div>

              {/* Live Progress Indicator */}
              <div className="flex flex-col items-start lg:items-end">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl font-bold text-purple-700">
                    {journeyProgress}%
                  </span>
                  <span className="text-xs font-semibold uppercase text-indigo-400">Complete</span>
                </div>
                <div className="mt-2 h-3 w-48 overflow-hidden rounded-full bg-indigo-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-600 to-coral-500 transition-all duration-500"
                    style={{ width: `${journeyProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Interactive Steps Checklist */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {journeySteps.map((step) => (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => toggleStep(step.id)}
                  className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all cursor-pointer ${
                    step.completed
                      ? 'border-purple-200 bg-purple-50/50'
                      : 'border-purple-100 bg-white hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                        step.completed ? 'bg-purple-600 text-white' : 'border border-indigo-300 bg-white'
                      }`}
                    >
                      {step.completed && <CheckCircle2 className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${step.completed ? 'text-indigo-900 line-through opacity-75' : 'text-indigo-900'}`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-indigo-500">{step.ref}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-purple-600">
                    {step.completed ? 'Done' : 'Start'}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-purple-100 pt-6">
              <p className="text-xs text-indigo-500">
                💡 Complete all 4 steps to keep your 12-day reading streak glowing.
              </p>
              <Link to="/app/journey">
                <Button>
                  Continue Journey Fullscreen
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Tilt3DCard>
      </section>

      {/* ========================================================================= */}
      {/* SECTION: BIBLE EXPERIENCE (READER PREVIEW WITH 3D DEPTH)                  */}
      {/* ========================================================================= */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-purple-600">
            Distraction-Free Reading
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-indigo-900 sm:text-4xl">
            A Bible reader designed for quiet reflection.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-indigo-600">
            Featuring generous whitespace, elegant serif typography, audio narration, and instant AI insights.
          </p>
        </motion.div>

        <Tilt3DCard maxTilt={5}>
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[36px] border border-purple-100 bg-warm-card p-8 sm:p-14 shadow-2xl shadow-purple-900/10">
            {/* Top controls bar */}
            <div className="flex items-center justify-between text-indigo-400 pb-6 border-b border-purple-100/60">
              <span className="text-xs font-medium text-purple-600">‹ Mark 3</span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Mark 4</span>
              <span className="text-xs font-medium text-purple-600">Mark 5 ›</span>
            </div>

            {/* Chapter Watermark */}
            <div className="relative pt-6">
              <span className="pointer-events-none absolute -top-8 left-0 select-none font-serif text-8xl font-black text-purple-100/70 sm:text-9xl">
                4
              </span>

              <h3 className="relative font-serif text-3xl font-bold text-indigo-950 sm:text-4xl">
                Mark
              </h3>
              <p className="relative mt-1 text-sm font-medium text-indigo-600 pb-4 border-b border-indigo-100">
                The Parable of the Sower
              </p>

              {/* Scripture Verses */}
              <div className="relative mt-6 space-y-4 font-serif text-base leading-relaxed text-indigo-900 sm:text-lg sm:leading-loose">
                <p>
                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-[11px] font-bold text-purple-700">
                    1
                  </span>
                  Again Jesus began to teach beside the sea. And a very large crowd gathered about him, so
                  that he got into a boat and sat in it on the sea, and the whole crowd was beside the sea on
                  the land.
                </p>
                <p>
                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-[11px] font-bold text-purple-700">
                    2
                  </span>
                  And he was teaching them many things in parables, and in his teaching he said to them:
                </p>
                <p>
                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-[11px] font-bold text-purple-700">
                    3
                  </span>
                  &ldquo;Listen! Behold, a sower went out to sow.
                </p>
                <p>
                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-[11px] font-bold text-purple-700">
                    4
                  </span>
                  And as he sowed, some seed fell along the path, and the birds came and devoured it.&rdquo;
                </p>
              </div>

              {/* Controls pill */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-lavender-50 p-4">
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="secondary">
                    <Volume2 className="h-3.5 w-3.5 text-purple-700" />
                    Listen Audio
                  </Button>
                  <Button size="sm" variant="ghost">
                    Aa Font Size
                  </Button>
                </div>
                <Link to="/app/bible/mark/4">
                  <Button size="sm">
                    Open in Full Reader →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Tilt3DCard>
      </section>

      {/* ========================================================================= */}
      {/* SECTION: AI COMPANION SECTION                                             */}
      {/* ========================================================================= */}
      <section id="ai-companion" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800">
              <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              <span>Biblically Grounded AI</span>
            </div>

            <h2 className="mt-4 font-serif text-3xl font-bold text-indigo-900 sm:text-4xl">
              Understand Scripture more deeply.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-indigo-700">
              Ask questions about difficult passages, cultural background, and cross-references.
              ROOTED&apos;s AI companion is trained strictly to explore Scripture without theological speculation.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700 mt-0.5">
                  ✓
                </div>
                <p className="text-sm text-indigo-700">
                  <strong>Rooted in original context:</strong> Understand Greek, Hebrew, and cultural history.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700 mt-0.5">
                  ✓
                </div>
                <p className="text-sm text-indigo-700">
                  <strong>Automatic scripture linking:</strong> Every insight points directly back to related verses.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700 mt-0.5">
                  ✓
                </div>
                <p className="text-sm text-indigo-700">
                  <strong>Save to journal:</strong> Convert any insight into your personal devotional entry with one tap.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link to="/app/ai">
                <Button size="lg">
                  Ask ROOTED Companion
                  <Sparkles className="h-4.5 w-4.5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Interactive AI Chat Mockup with 3D Tilt */}
          <div className="lg:col-span-7">
            <Tilt3DCard glow maxTilt={6}>
              <div className="rounded-[32px] border border-purple-200/80 bg-warm-card p-6 sm:p-8 shadow-xl shadow-purple-900/10">
                {/* User Bubble */}
                <div className="flex items-start gap-3.5 justify-end">
                  <div className="max-w-md rounded-3xl rounded-tr-sm bg-gradient-to-r from-purple-600 to-purple-700 p-4 text-sm text-white shadow-md">
                    <p className="text-[11px] font-bold text-purple-200 mb-1">You</p>
                    <p>What does Jesus mean by &ldquo;the seed&rdquo; in Mark 4?</p>
                  </div>
                </div>

                {/* ROOTED AI Bubble */}
                <div className="mt-6 flex items-start gap-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-sm">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="max-w-xl rounded-3xl rounded-tl-sm border border-purple-100 bg-lavender-50/70 p-5 text-sm text-indigo-900 shadow-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="font-serif text-xs font-bold text-purple-800">ROOTED Companion</p>
                      <span className="text-[10px] text-indigo-400">Grounded in Scripture</span>
                    </div>
                    <p className="leading-relaxed">
                      In the Parable of the Sower (Mark 4:14), Jesus explicitly explains that{' '}
                      <strong>&ldquo;the sower sows the word.&rdquo;</strong> The seed represents the message
                      of God&apos;s Kingdom — full of life, power, and transformative potential.
                    </p>
                    <p className="mt-2 leading-relaxed text-indigo-700">
                      The different soils represent human hearts and how we receive God&apos;s truth.
                      Notice that the seed itself never fails; the outcome depends on whether our hearts are
                      receptive, deeply rooted, or choked by cares.
                    </p>

                    {/* Related Scripture Tags */}
                    <div className="mt-4 border-t border-purple-200/50 pt-3">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-purple-700 mb-2">
                        Related Scripture
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-purple-700 shadow-xs ring-1 ring-purple-200">
                          Luke 8:11
                        </span>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-purple-700 shadow-xs ring-1 ring-purple-200">
                          Matthew 13:23
                        </span>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-purple-700 shadow-xs ring-1 ring-purple-200">
                          John 15:7
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tilt3DCard>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION: KIDS MODE ("LITTLE EXPLORERS")                                    */}
      {/* ========================================================================= */}
      <section id="kids-mode" className="mx-auto max-w-7xl px-6 py-20">
        <div className="overflow-hidden rounded-[40px] bg-gradient-to-br from-indigo-950 via-[#19152e] to-purple-950 p-8 sm:p-14 text-white shadow-2xl">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-coral-300 ring-1 ring-white/15">
                <Smile className="h-4 w-4 text-coral-400" />
                <span>Special Experience · Little Explorers</span>
              </div>

              <h2 className="mt-5 font-serif text-3xl font-bold tracking-tight sm:text-5xl lg:leading-tight">
                Turn on Kids Mode for playful learning.
              </h2>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-purple-200/90">
                Let little explorers discover the Bible with bigger text, simple words, animated stories,
                and a safe, ad-free environment.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p className="font-serif text-lg font-bold text-coral-300">Bigger Text</p>
                  <p className="text-xs text-purple-200/70 mt-1">Easy to read typography for young readers</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p className="font-serif text-lg font-bold text-coral-300">Safe Space</p>
                  <p className="text-xs text-purple-200/70 mt-1">100% parental controls & zero ads</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p className="font-serif text-lg font-bold text-coral-300">Audio Stories</p>
                  <p className="text-xs text-purple-200/70 mt-1">Vibrant storytelling for bedtime</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
                  <p className="font-serif text-lg font-bold text-coral-300">Memory Verses</p>
                  <p className="text-xs text-purple-200/70 mt-1">Fun interactive games & rewards</p>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Link to="/app/kids">
                  <Button variant="coral" size="lg">
                    Enter Kids Mode
                    <ArrowRight className="h-4.5 w-4.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Kids Mode Visual Card (David & Goliath) with 3D Tilt */}
            <div className="lg:col-span-6">
              <Tilt3DCard maxTilt={8}>
                <div className="relative mx-auto max-w-sm overflow-hidden rounded-[32px] border-4 border-white/10 shadow-2xl">
                  <img
                    src="/images/african-david-goliath.jpg"
                    alt="Young African shepherd boy David facing giant Goliath"
                    className="aspect-[3/4] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <span className="rounded-full bg-coral-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                      Story of the Week
                    </span>
                    <h3 className="mt-2 font-serif text-2xl font-bold">David &amp; Goliath</h3>
                    <p className="mt-1 text-xs text-purple-200/90 leading-relaxed">
                      &ldquo;David trusted God even when Goliath looked very big.&rdquo;
                    </p>
                    <Link to="/app/kids">
                      <button type="button" className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-white py-2.5 text-xs font-bold text-indigo-950 shadow-md hover:bg-cream-50 cursor-pointer">
                        Start Story Together →
                      </button>
                    </Link>
                  </div>
                </div>
              </Tilt3DCard>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION: AFRICAN FELLOWSHIP & COMMUNITY                                    */}
      {/* ========================================================================= */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <Tilt3DCard maxTilt={6}>
              <div className="overflow-hidden rounded-[32px] border border-purple-100 shadow-xl shadow-purple-900/10">
                <img
                  src="/images/african-group-study.jpg"
                  alt="Young African adults discussing the Bible together in fellowship"
                  className="w-full object-cover"
                />
              </div>
            </Tilt3DCard>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 lg:col-span-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3.5 py-1 text-xs font-semibold text-purple-800">
              <Users className="h-3.5 w-3.5 text-purple-600" />
              <span>Fellowship &amp; Community</span>
            </div>

            <h2 className="mt-4 font-serif text-3xl font-bold text-indigo-900 sm:text-4xl">
              You weren&apos;t meant to walk alone.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-indigo-700">
              Connect with Christian small groups, campus ministries, and church families across Africa.
              Share prayer requests, encourage one another, and celebrate answered prayers together.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/app/community">
                <Button>
                  Explore Community Wall
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/app/prayer">
                <Button variant="secondary">
                  Join Prayer Wall
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION: FINAL CALL TO ACTION (3D TILT WITH GLOW)                         */}
      {/* ========================================================================= */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <Tilt3DCard glow maxTilt={4}>
          <div className="rounded-[40px] bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800 p-10 sm:p-16 text-white shadow-2xl shadow-purple-900/30">
            <h2 className="font-serif text-3xl font-bold sm:text-5xl">
              Begin your walk with God today.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-purple-100 sm:text-lg">
              Free forever for daily reading. No intrusive advertisements. Just you, the Word, and a
              supportive community.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/onboarding/splash">
                <Button size="lg" variant="inverse" className="shadow-lg">
                  Start Your Journey Free
                  <ArrowRight className="h-4.5 w-4.5" />
                </Button>
              </Link>
            </div>
          </div>
        </Tilt3DCard>
      </section>
    </div>
  )
}
