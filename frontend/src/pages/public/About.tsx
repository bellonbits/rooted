import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Heart, Globe, BookOpen, Sparkles, ArrowRight, Leaf } from 'lucide-react'
import { Tilt3DCard } from '@/components/ui/Tilt3DCard'

const VALUES = [
  { icon: BookOpen, title: 'Scripture First',    desc: "Everything in ROOTED is grounded in God's Word. Technology serves the text — never the other way around." },
  { icon: Heart,    title: 'Grace-Led',          desc: 'We build for the seeker, the new believer, the backslider returning home — met with grace, not judgment.' },
  { icon: Globe,    title: 'Africa & the World', desc: 'Born in Africa, built for the world. We prioritise African believers while welcoming every nation into our community.' },
  { icon: Sparkles, title: 'Simple Delight',     desc: 'Faith tools should be beautiful and joyful to use. We sweat every detail so the experience never gets in the way of the Spirit.' },
  { icon: Leaf,     title: 'Rooted Growth',      desc: 'We measure success not in users, but in lives transformed — daily rhythms deepened, prayers answered, families strengthened.' },
]

const FOUNDER = {
  initials: 'PGM',
  name: 'Peter Gatitu Mwangi',
  role: 'Founder & CEO',
  location: 'Nairobi, Kenya',
  bio: 'Driven by a deep passion for Scripture and digital ministry, Peter founded ROOTED to help believers across Africa and the world build a vibrant, daily walk with God through beautiful, distraction-free, and biblically grounded technology.',
}

export function About() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-200/35 blur-3xl" />

      {/* HERO */}
      <section className="mx-auto max-w-4xl px-6 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-100/90 px-4 py-1.5 text-xs font-semibold text-purple-800 ring-1 ring-purple-200">
          <Leaf className="h-3.5 w-3.5 text-purple-600" />
          Our Story
        </div>
        <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-indigo-900 sm:text-5xl lg:text-6xl">
          About{' '}
          <span className="bg-gradient-to-r from-purple-700 via-purple-600 to-coral-500 bg-clip-text text-transparent">
            ROOTED
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-indigo-600">
          ROOTED exists to help new believers — and those returning to faith — move from curiosity to a rooted, daily walk with God. Building tools that help every believer grow in faith and follow Jesus.
        </p>
      </section>

      {/* MISSION STATEMENT */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <Tilt3DCard glow maxTilt={4}>
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-purple-700 via-purple-600 to-purple-800 p-10 shadow-2xl shadow-purple-900/25 sm:p-16">
            <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_30%_70%,white_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="relative text-center text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-purple-200">Our Mission</p>
              <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl">
                &ldquo;Grow deeper. Live the Word.&rdquo;
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-purple-100">
                We believe every believer — from Nairobi to New York, from new convert to seasoned elder — deserves access to Scripture that is beautifully presented, deeply explained, and practically applicable. ROOTED is our act of obedience to that conviction.
              </p>
            </div>
          </div>
        </Tilt3DCard>
      </section>

      {/* VALUES */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-600">What Drives Us</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-indigo-900 sm:text-4xl">Our values</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => {
            const Icon = v.icon
            return (
              <Tilt3DCard key={v.title} maxTilt={6}>
                <div className="h-full rounded-3xl border border-purple-100 bg-white/90 p-6 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100">
                    <Icon className="h-5 w-5 text-purple-700" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-semibold text-indigo-900">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-indigo-600">{v.desc}</p>
                </div>
              </Tilt3DCard>
            )
          })}
        </div>
      </section>

      {/* LEADERSHIP / FOUNDER */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="mb-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-purple-600">Leadership</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-indigo-900 sm:text-4xl">Founder &amp; CEO</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-indigo-600">
            Founded with faith, purpose, and a conviction that discipleship tools should be world-class.
          </p>
        </div>

        <div className="mx-auto max-w-md">
          <Tilt3DCard glow maxTilt={6}>
            <div className="rounded-[32px] border border-purple-100/90 bg-white/95 p-8 sm:p-10 text-center shadow-xl shadow-purple-900/5 backdrop-blur-md">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 text-2xl font-bold text-white shadow-xl shadow-purple-600/30 ring-4 ring-purple-100">
                {FOUNDER.initials}
              </div>
              <h3 className="mt-5 font-serif text-2xl font-bold text-indigo-900">{FOUNDER.name}</h3>
              <p className="mt-1 text-sm font-semibold text-purple-600">{FOUNDER.role}</p>
              <p className="mt-1 text-xs text-indigo-400 font-medium">{FOUNDER.location}</p>
              <p className="mt-5 text-sm leading-relaxed text-indigo-600">
                {FOUNDER.bio}
              </p>
            </div>
          </Tilt3DCard>
        </div>
      </section>

      {/* VISION */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <Tilt3DCard maxTilt={4}>
          <div className="rounded-[32px] border border-purple-100 bg-white/90 p-10 shadow-md sm:p-14">
            <p className="text-xs font-bold uppercase tracking-widest text-purple-600">Where We&apos;re Going</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-indigo-900 sm:text-4xl">Our vision for 2025 and beyond</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {[
                { stat: '100K+', label: 'Believers rooted in daily Scripture', note: 'Across Africa and the global diaspora' },
                { stat: '50+',   label: 'Languages and translations',          note: 'Every tribe, every tongue' },
                { stat: '1M+',   label: 'Prayers logged & lifted',            note: 'A community that prays together' },
              ].map((item) => (
                <div key={item.stat} className="text-center">
                  <p className="font-serif text-5xl font-bold text-purple-600">{item.stat}</p>
                  <p className="mt-2 text-sm font-semibold text-indigo-900">{item.label}</p>
                  <p className="mt-1 text-xs text-indigo-400">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        </Tilt3DCard>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-24 text-center">
        <h2 className="font-serif text-3xl font-bold text-indigo-900 sm:text-4xl">Join us on the journey</h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-indigo-600">
          Start your 7-day free trial. No credit card. Just you, God, and His Word.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link to="/onboarding/splash">
            <Button size="lg" className="shadow-lg shadow-purple-600/25">
              Begin Your Journey <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="secondary" size="lg">Get in Touch</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
