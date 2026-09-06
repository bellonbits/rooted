import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Star, Leaf, Heart, BookOpen, Smile, Shield, Sparkles } from 'lucide-react'

const FEATURES = [
  { icon: Leaf,      title: 'ROOTI the Seedling',    desc: "A joyful AI companion that answers kids' big questions about God, Jesus, and the Bible with warmth and wonder." },
  { icon: BookOpen,  title: 'Bible Stories',         desc: 'Illustrated, age-appropriate Bible stories that make Scripture come alive for young explorers.' },
  { icon: Star,      title: 'Prayer Adventures',     desc: 'Guided prayer activities that teach kids how to talk to God in their own words.' },
  { icon: Heart,     title: 'Character & Values',    desc: 'Stories and activities that build godly character — kindness, forgiveness, courage, and love.' },
  { icon: Smile,     title: 'Fun Discovery',         desc: 'Games, questions, and exploration exercises that make learning about faith delightful and memorable.' },
  { icon: Shield,    title: 'Safe Environment',      desc: 'Fully child-safe. No ads. No user-generated content. Parent-controlled, spiritually guided.' },
]

const QUESTIONS = [
  { q: 'Why did God make me?', emoji: '🌟' },
  { q: "How big is God's love?", emoji: '❤️' },
  { q: 'What happens when we pray?', emoji: '🙏' },
  { q: 'Who is the Holy Spirit?', emoji: '🕊️' },
  { q: 'Why is the Bible special?', emoji: '📖' },
  { q: 'Can God hear me?', emoji: '👂' },
]

const ROOTI_RESPONSE = "Great question, Little Explorer! 🌱 God made YOU with so much love and purpose! Just like a little seed knows how to grow into a tall tree, you are growing into exactly who God made you to be. Jeremiah 29:11 says God has wonderful plans for your life — plans full of hope and good things! 🌳✨"

export function KidsModePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Playful background blobs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-200/35 blur-3xl" />
      <div className="pointer-events-none absolute top-[800px] -right-40 -z-10 h-[400px] w-[400px] rounded-full bg-coral-100/60 blur-3xl" />

      {/* HERO */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-coral-100 px-4 py-1.5 text-xs font-semibold text-coral-500 ring-1 ring-coral-100">
          <Leaf className="h-3.5 w-3.5 text-coral-500" />
          Kids Mode · Ages 6–12 · Child-Safe
        </div>
        <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-indigo-900 sm:text-5xl lg:text-6xl">
          Little Explorers{' '}
          <span className="bg-gradient-to-r from-coral-500 via-purple-600 to-purple-700 bg-clip-text text-transparent">
            Kids Mode
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-indigo-600">
          A safe, joyful, and beautifully illustrated space where children ages 6–12 can explore God's Word, ask ROOTI big questions, and grow in faith at their own pace.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/onboarding/splash">
            <Button size="lg" className="shadow-lg shadow-purple-600/25">
              Start Free — For the Whole Family <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/how-it-works">
            <Button variant="secondary" size="lg">
              <BookOpen className="h-4 w-4 text-purple-700" /> How It Works
            </Button>
          </Link>
        </div>
      </section>

      {/* ROOTI DEMO */}
      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="rounded-[32px] border border-coral-100 bg-white/90 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-coral-100/60 bg-gradient-to-r from-coral-50 to-purple-50 px-6 py-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-coral-400 to-coral-500 text-2xl shadow-md">
              🌱
            </div>
            <div>
              <p className="text-sm font-bold text-indigo-900">ROOTI</p>
              <p className="text-xs text-indigo-400">Your friendly Bible explorer seedling</p>
            </div>
            <div className="ml-auto rounded-full bg-green-100 px-2.5 py-1 text-[11px] font-semibold text-green-600">Online</div>
          </div>

          {/* Question bubbles */}
          <div className="px-6 py-5">
            <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-indigo-300">Kids love asking ROOTI…</p>
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {QUESTIONS.map((q) => (
                <div key={q.q} className="flex items-center gap-1.5 rounded-full border border-purple-100 bg-purple-50 px-3 py-2 text-xs font-medium text-indigo-700">
                  <span>{q.emoji}</span> {q.q}
                </div>
              ))}
            </div>

            {/* Sample conversation */}
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="max-w-xs rounded-[20px] rounded-tr-md bg-gradient-to-r from-coral-500 to-coral-400 px-4 py-3 text-sm text-white shadow-md">
                  Why did God make me? 🌟
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-coral-100 to-coral-200 text-xl">
                  🌱
                </div>
                <div className="rounded-[20px] rounded-tl-md border border-coral-100 bg-coral-50/50 px-4 py-3">
                  <p className="text-sm leading-relaxed text-indigo-800">{ROOTI_RESPONSE}</p>
                  <div className="mt-3 flex gap-2">
                    <span className="rounded-full bg-purple-100 px-2.5 py-1 text-[11px] font-semibold text-purple-600">
                      📖 Jeremiah 29:11
                    </span>
                    <span className="rounded-full bg-coral-100 px-2.5 py-1 text-[11px] font-semibold text-coral-600">
                      Explore More →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Explore questions */}
          <div className="border-t border-coral-100/60 bg-coral-50/30 px-6 py-4">
            <p className="mb-3 text-xs font-bold text-indigo-400">🌿 ROOTI's Explore Questions for today:</p>
            <div className="flex flex-col gap-2">
              <button className="rounded-2xl border border-purple-100 bg-white px-4 py-2.5 text-left text-xs font-medium text-indigo-700 hover:bg-purple-50 transition-colors">
                🌳 If God made the whole world, what is your favourite thing He made?
              </button>
              <button className="rounded-2xl border border-purple-100 bg-white px-4 py-2.5 text-left text-xs font-medium text-indigo-700 hover:bg-purple-50 transition-colors">
                🙏 Can you thank God for something special about YOU today?
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED STORYBOOK SHOWCASE */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-[36px] border-4 border-amber-300/50 bg-gradient-to-br from-indigo-900 via-purple-950 to-[#120d24] p-8 sm:p-12 text-white shadow-2xl">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-4 py-1 text-xs font-black uppercase tracking-wider text-amber-300 border border-amber-400/30">
                <Sparkles className="h-3.5 w-3.5" />
                Kindle-Style Interactive Storybook
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-black text-white leading-tight">
                When God Made Everything
              </h2>
              <p className="text-amber-200 font-serif italic text-base">
                21 Illustrated Panels · Touch Hotspots · Speech Voice Narration
              </p>
              <p className="text-sm leading-relaxed text-purple-200/90">
                Turn pages like a real children&apos;s book! Kids can tap stars to count them, blow the breath of life into Adam, toggle day and night, and hear splashing blue whales and singing birds.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link to="/app/kids">
                  <Button size="lg" className="bg-gradient-to-r from-amber-400 via-amber-300 to-coral-400 text-indigo-950 font-black shadow-xl hover:scale-105 active:scale-95 transition-all">
                    <BookOpen className="h-4 w-4" /> Open Storybook in Kids Mode →
                  </Button>
                </Link>
                <Link to="/app/kids">
                  <Button variant="secondary" size="lg" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                    Explore All Stories
                  </Button>
                </Link>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative mx-auto max-w-xs overflow-hidden rounded-3xl border-4 border-amber-300/40 shadow-2xl group">
                <img
                  src="/bible_stories/story1/panel_01_title.png"
                  alt="When God Made Everything - Bible for Children Storybook"
                  className="aspect-[4/4.5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 inset-x-3 text-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-black text-amber-300 backdrop-blur-md shadow-lg border border-amber-300/30">
                    <Sparkles className="h-3.5 w-3.5" /> 21 Illustrated Panels
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-coral-500">Everything for Young Believers</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-indigo-900 sm:text-4xl">What's in Kids Mode?</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="rounded-3xl border border-purple-100 bg-white/90 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-coral-400 to-coral-500 shadow-md shadow-coral-500/20">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-4 font-serif text-base font-semibold text-indigo-900">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-indigo-500">{f.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* PARENT REASSURANCE */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="rounded-[32px] border border-purple-100 bg-white/90 p-10 shadow-md sm:p-14">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-600">For Parents</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-indigo-900">Your child is safe with ROOTI</h2>
          <p className="mt-4 text-base leading-relaxed text-indigo-600">
            Kids Mode is fully isolated from adult content. ROOTI's AI is specifically configured for ages 6–12 — warm, simple, and always biblically grounded. There are no ads, no social features exposing children to strangers, and no in-app purchases hidden behind cute buttons.
          </p>
          <p className="mt-4 text-base leading-relaxed text-indigo-600">
            Parents can enable or disable Kids Mode from the family account settings, and review all of ROOTI's conversations with their child at any time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {['No ads', 'No chat with strangers', 'Parental controls', 'Conversation history visible to parents', 'Biblically grounded AI'].map((badge) => (
              <span key={badge} className="rounded-full border border-purple-200 bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700">
                ✓ {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-indigo-900 sm:text-4xl">
          Give your child a love for God's Word
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-indigo-600">
          Kids Mode is included in every Pro plan. Start your family's 7-day free trial today.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/onboarding/splash">
            <Button size="lg" className="shadow-lg shadow-purple-600/25">
              Start Free — Whole Family <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
