import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Sparkles, ArrowRight, MessageSquare, BookOpen, Shield, Zap, Brain, Heart } from 'lucide-react'

const SAMPLE_QA = [
  {
    q: 'What does it mean to be "born again"?',
    a: "Jesus uses this phrase in John 3:3 to describe a spiritual rebirth. Being \"born again\" means receiving new life through faith in Jesus Christ — the Holy Spirit renews your heart, making you a new creation (2 Corinthians 5:17). It's not about religion, but a personal encounter with the living God.",
    ref: 'John 3:3 · 2 Corinthians 5:17',
  },
  {
    q: 'Why did God allow suffering in the world?',
    a: 'Scripture acknowledges the reality of suffering deeply. Romans 8:28 assures us that God works all things for good for those who love Him. Suffering entered through human choice (Genesis 3), but God never abandons us in it — He enters it with us in the person of Jesus (Isaiah 53:3-4).',
    ref: 'Romans 8:28 · Isaiah 53:3-4',
  },
  {
    q: "How do I know God's will for my life?",
    a: 'Scripture gives clear guidance: commit your ways to God (Proverbs 3:5-6), immerse yourself in His Word (Psalm 119:105), seek wise counsel (Proverbs 15:22), and act on what you know is right. God reveals His will progressively as you walk in obedience.',
    ref: 'Proverbs 3:5-6 · Psalm 119:105',
  },
]

const FEATURES = [
  { icon: BookOpen, title: 'Grounded in Scripture',   desc: 'Every answer is rooted in the Bible — the AI explains, never replaces, God\'s Word.' },
  { icon: Shield,   title: 'Theologically Safe',      desc: 'Trained to stay within orthodox Christian theology. It won\'t speculate or add to Scripture.' },
  { icon: Zap,      title: 'Instant Answers',         desc: 'Ask anything about faith, Scripture, or Christian living — get a thoughtful answer in seconds.' },
  { icon: Brain,    title: 'Historical Context',       desc: 'Get the cultural, historical, and linguistic background of any passage or concept.' },
  { icon: Heart,    title: 'Pastoral Warmth',         desc: 'Designed to feel like a knowledgeable, encouraging brother or sister in Christ.' },
  { icon: MessageSquare, title: 'Conversation Memory', desc: 'Ask follow-up questions naturally — the companion remembers your conversation context.' },
]

export function AICompanionPage() {
  const [activeQ, setActiveQ] = useState(0)
  const [typed, setTyped] = useState('')

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-200/35 blur-3xl" />

      {/* HERO */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-100/90 px-4 py-1.5 text-xs font-semibold text-purple-800 ring-1 ring-purple-200">
          <Sparkles className="h-3.5 w-3.5 text-purple-600" />
          AI Companion · Biblically Grounded
        </div>
        <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-indigo-900 sm:text-5xl lg:text-6xl">
          Your Biblical{' '}
          <span className="bg-gradient-to-r from-purple-700 via-purple-600 to-coral-500 bg-clip-text text-transparent">
            AI Companion
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-indigo-600">
          Ask any question about faith, Scripture, or Christian living. Get warm, biblically grounded answers with full verse references — not generic spiritual advice.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/onboarding/splash">
            <Button size="lg" className="shadow-lg shadow-purple-600/25">
              Try the AI Companion <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/bible-preview">
            <Button variant="secondary" size="lg">
              <BookOpen className="h-4 w-4 text-purple-700" /> See the Bible
            </Button>
          </Link>
        </div>
      </section>

      {/* INTERACTIVE DEMO */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="rounded-[32px] border border-purple-100 bg-white/90 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-purple-100 px-6 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-purple-500 shadow">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-indigo-900">ROOTED AI Companion</p>
              <p className="text-xs text-indigo-400">Biblically grounded · Always available</p>
            </div>
            <div className="ml-auto flex h-2 w-2 rounded-full bg-green-500" />
          </div>

          {/* Question tabs */}
          <div className="flex gap-2 overflow-x-auto border-b border-purple-50 px-6 py-3">
            {SAMPLE_QA.map((qa, i) => (
              <button
                key={i}
                onClick={() => setActiveQ(i)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${activeQ === i ? 'bg-purple-600 text-white' : 'bg-purple-50 text-indigo-600 hover:bg-purple-100'}`}
              >
                {qa.q.length > 30 ? qa.q.slice(0, 30) + '…' : qa.q}
              </button>
            ))}
          </div>

          {/* Chat bubbles */}
          <div className="space-y-4 px-6 py-6">
            <div className="flex justify-end">
              <div className="max-w-xs rounded-[20px] rounded-tr-md bg-gradient-to-r from-purple-600 to-purple-500 px-4 py-3 text-sm text-white shadow-md">
                {SAMPLE_QA[activeQ].q}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-purple-200 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-purple-600" />
              </div>
              <div className="rounded-[20px] rounded-tl-md border border-purple-100 bg-purple-50/60 px-4 py-3">
                <p className="text-sm leading-relaxed text-indigo-800">{SAMPLE_QA[activeQ].a}</p>
                <p className="mt-2 text-[11px] font-semibold text-purple-500">📖 {SAMPLE_QA[activeQ].ref}</p>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-purple-100 px-6 py-4">
            <div className="flex items-center gap-3 rounded-full border border-purple-200 bg-purple-50/50 px-4 py-3">
              <input
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                placeholder="Ask anything about faith or Scripture…"
                className="flex-1 bg-transparent text-sm text-indigo-800 placeholder-indigo-300 outline-none"
              />
              <Link to="/onboarding/splash">
                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-purple-500 shadow-md transition-all hover:brightness-110">
                  <ArrowRight className="h-4 w-4 text-white" />
                </button>
              </Link>
            </div>
            <p className="mt-2 text-center text-[11px] text-indigo-300">
              Sign up to ask your own questions · 7-day free trial
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-600">What Makes It Different</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-indigo-900 sm:text-4xl">
            AI that serves the Word, not the other way around
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="rounded-3xl border border-purple-100 bg-white/90 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-purple-500 shadow-md shadow-purple-500/20">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-4 font-serif text-base font-semibold text-indigo-900">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-indigo-500">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* DISCLAIMER + CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <div className="rounded-2xl border border-purple-100 bg-purple-50/60 px-6 py-5 text-center mb-10">
          <p className="text-xs text-indigo-500">
            <strong className="text-indigo-700">A note on AI and Scripture:</strong>{' '}
            The ROOTED AI Companion is a study aid, not a spiritual authority. Always weigh its answers against God's Word directly, and the wisdom of your church community. The Holy Spirit remains your ultimate guide.
          </p>
        </div>
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-indigo-900 sm:text-4xl">Ask your first question</h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-indigo-600">
            Unlimited Ask AI conversations included in your Pro plan. Start free today.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/onboarding/splash">
              <Button size="lg" className="shadow-lg shadow-purple-600/25">
                Try Free for 7 Days <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
