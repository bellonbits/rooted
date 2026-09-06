import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import {
  BookOpen, Sparkles, PenLine, Heart, ArrowRight,
  CheckCircle2, Users, Baby, Compass,
} from 'lucide-react'

const STEPS = [
  {
    number: '01', icon: BookOpen,
    gradient: 'from-purple-600 to-purple-500',
    title: 'Read Scripture',
    subtitle: 'Daily Bread for Your Soul',
    description: "Every day starts with a curated passage from God's Word. Over 1,200 Bible translations available — BSB, NIV, KJV, NLT and more. Highlight verses, bookmark what speaks to you, and listen with audio narration.",
    features: ['1,256+ Bible translations', 'Highlight & bookmark verses', 'Audio narration', 'Offline access'],
  },
  {
    number: '02', icon: Sparkles,
    gradient: 'from-coral-500 to-coral-400',
    title: 'Understand with AI',
    subtitle: 'Context, Not Doctrine',
    description: 'Our AI Companion explains what a passage means — historically, theologically, and practically — without replacing the Holy Spirit\'s work. Ask anything and get a biblically grounded answer.',
    features: ['Historical & cultural context', 'Cross-references', 'Ask follow-up questions', 'Safe & Scripture-grounded'],
  },
  {
    number: '03', icon: PenLine,
    gradient: 'from-indigo-600 to-purple-600',
    title: 'Reflect & Journal',
    subtitle: 'Write What God Is Saying',
    description: 'The S.O.A.P method built right in — Scripture, Observation, Application, Prayer. A private, sacred space for your spiritual journey.',
    features: ['S.O.A.P journal format', 'Private & secure', 'Scripture-linked entries', 'Prayer log included'],
  },
  {
    number: '04', icon: Heart,
    gradient: 'from-purple-500 to-coral-500',
    title: 'Pray & Grow',
    subtitle: 'Consistent, Transformed Living',
    description: 'Build a daily rhythm that sticks. ROOTED guides you through 21-day discipleship courses, tracks your progress, and celebrates every milestone.',
    features: ['21-day growth journeys', 'Prayer community wall', 'Progress tracking', 'Discipleship courses'],
  },
]

const FOR_WHOM = [
  { icon: BookOpen, title: 'New Believers', desc: 'A gentle guided path through the essentials of Christian life — no jargon, no overwhelm.' },
  { icon: Users, title: 'Families & Groups', desc: 'Read together, pray together, grow together. Perfect for family devotions and cell groups.' },
  { icon: Baby, title: 'Children (Kids Mode)', desc: 'ROOTI the seedling makes Scripture delightful for kids 6–12 with joyful illustrated discovery.' },
  { icon: Compass, title: 'Mature Believers', desc: '1,200+ translations, advanced search, cross-references, and AI for serious Bible exploration.' },
]

export function HowItWorks() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-200/35 blur-3xl" />

      {/* HERO */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-100/90 px-4 py-1.5 text-xs font-semibold text-purple-800 ring-1 ring-purple-200">
          <Sparkles className="h-3.5 w-3.5 text-purple-600" />
          Simple. Beautiful. Transforming.
        </div>
        <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-indigo-900 sm:text-5xl lg:text-6xl">
          How ROOTED works
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-indigo-600">
          A simple four-step daily rhythm — Read, Understand, Reflect, Grow — designed to take you from curious reader to rooted disciple, one day at a time.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/onboarding/splash">
            <Button size="lg" className="shadow-lg shadow-purple-600/25">
              Start Free — No Card Needed <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/bible-preview">
            <Button variant="secondary" size="lg">
              <BookOpen className="h-4 w-4 text-purple-700" /> See the Bible Experience
            </Button>
          </Link>
        </div>
      </section>

      {/* 4 STEPS */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="space-y-8">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            const flip = i % 2 === 1
            return (
              <div key={step.number} className={`flex flex-col gap-8 rounded-[32px] border border-purple-100 bg-white/80 p-8 shadow-md shadow-purple-900/5 sm:p-12 lg:flex-row lg:items-center ${flip ? 'lg:flex-row-reverse' : ''}`}>
                <div className="flex shrink-0 flex-col items-center gap-3 lg:w-56">
                  <div className={`flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${step.gradient} shadow-lg`}>
                    <Icon className="h-9 w-9 text-white" />
                  </div>
                  <span className="font-serif text-7xl font-bold text-purple-100 leading-none select-none">{step.number}</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-purple-600">{step.subtitle}</p>
                  <h2 className="mt-2 font-serif text-3xl font-bold text-indigo-900">{step.title}</h2>
                  <p className="mt-4 text-base leading-relaxed text-indigo-600 max-w-xl">{step.description}</p>
                  <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {step.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-indigo-700">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-purple-500" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-600">Built for Everyone</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-indigo-900 sm:text-4xl">Who is ROOTED for?</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-indigo-600">
            Whether you just said yes to Jesus or have walked with Him for decades — ROOTED meets you where you are.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FOR_WHOM.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="rounded-3xl border border-purple-100 bg-white/90 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100">
                  <Icon className="h-5 w-5 text-purple-700" />
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-indigo-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-indigo-600">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800 p-10 text-center text-white shadow-2xl shadow-purple-900/25 sm:p-16">
          <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_30%_30%,white_1px,transparent_1px)] [background-size:24px_24px]" />
          <p className="relative font-serif text-2xl font-medium italic leading-relaxed sm:text-3xl">
            "I used to struggle to read my Bible consistently. ROOTED gave me a simple daily rhythm and for the first time in years I haven't missed a day. God's Word finally feels alive to me."
          </p>
          <div className="relative mt-8 flex items-center justify-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-coral-400 to-coral-500 flex items-center justify-center text-sm font-bold text-white ring-2 ring-white/30">A</div>
            <div className="text-left">
              <p className="text-sm font-semibold">Amara O.</p>
              <p className="text-xs text-purple-200">Lagos, Nigeria · New Believer</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-indigo-900 sm:text-4xl">Ready to grow deeper?</h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-indigo-600">
          Start your 7-day free trial today. No credit card required. Your daily walk with God, transformed.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/onboarding/splash">
            <Button size="lg" className="shadow-lg shadow-purple-600/25">
              Begin Your Journey <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
