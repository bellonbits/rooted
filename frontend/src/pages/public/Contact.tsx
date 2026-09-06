import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Mail, MessageSquare, MapPin, Send, CheckCircle2, Sparkles, Heart } from 'lucide-react'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: 'general', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-purple-200/35 blur-3xl" />

      {/* HERO */}
      <section className="mx-auto max-w-3xl px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-purple-100/90 px-4 py-1.5 text-xs font-semibold text-purple-800 ring-1 ring-purple-200">
          <Sparkles className="h-3.5 w-3.5 text-purple-600" />
          We would love to hear from you
        </div>
        <h1 className="mt-6 font-serif text-4xl font-bold tracking-tight text-indigo-900 sm:text-5xl">
          Get in touch with us
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-indigo-600">
          Whether you have a question about our Bible studies, need technical support, want to partner with us, or simply want to share a testimony — we are here.
        </p>
      </section>

      {/* MAIN CONTENT */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid gap-12 lg:grid-cols-5">

          {/* Contact Information & Channels (2 cols) */}
          <div className="space-y-8 lg:col-span-2">
            <div className="rounded-[28px] border border-purple-100 bg-white/90 p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-indigo-900">Direct Channels</h2>
              <p className="mt-2 text-sm text-indigo-500">
                Our support and community teams typically respond within 24 hours.
              </p>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Support & Feedback</div>
                    <a href="mailto:support@rooted.app" className="font-medium text-indigo-900 hover:text-purple-600">
                      support@rooted.app
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coral-100 text-coral-600">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Pastoral & Prayer Requests</div>
                    <a href="mailto:prayer@rooted.app" className="font-medium text-indigo-900 hover:text-purple-600">
                      prayer@rooted.app
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                    <Heart className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Church & Ministry Partnerships</div>
                    <a href="mailto:partners@rooted.app" className="font-medium text-indigo-900 hover:text-purple-600">
                      partners@rooted.app
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Locations Card */}
            <div className="rounded-[28px] border border-purple-100 bg-warm-card/80 p-8 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-indigo-900">Our Hubs</h3>
              <p className="mt-1 text-xs text-indigo-500">Rooted in Africa, serving disciples everywhere.</p>
              
              <div className="mt-4 space-y-3 text-sm text-indigo-700">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-purple-600 shrink-0" />
                  <span>Nairobi, Kenya — Headquarters</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-purple-600 shrink-0" />
                  <span>Kampala, Uganda — Product & Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-purple-600 shrink-0" />
                  <span>Lagos, Nigeria — Community & Content</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form (3 cols) */}
          <div className="lg:col-span-3">
            <div className="rounded-[32px] border border-purple-100 bg-white p-8 shadow-lg shadow-purple-900/5 sm:p-10">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 font-serif text-2xl font-bold text-indigo-900">Message Received!</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-indigo-600">
                    Thank you for reaching out to ROOTED. We will read your message and respond to {form.email || 'your email'} as soon as possible.
                  </p>
                  <Button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: 'general', message: '' }) }} className="mt-8">
                    Send Another Note
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-indigo-900">Send us a message</h2>
                    <p className="mt-1 text-sm text-indigo-500">
                      Fill out the form below and we will get back to you swiftly.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-2">
                        Your Name
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. David Mwangi"
                        value={form.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, name: e.target.value })}
                        className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-sm text-indigo-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-2">
                        Email Address
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="david@example.com"
                        value={form.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-sm text-indigo-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-2">
                      Topic
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-sm text-indigo-900 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">App Support & Help</option>
                      <option value="prayer">Prayer Request</option>
                      <option value="church">Church or Group Plan</option>
                      <option value="feedback">Product Feedback & Ideas</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-indigo-700 mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="How can we help or pray for you today?"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full rounded-2xl border border-purple-200 bg-white p-4 text-sm text-indigo-900 placeholder:text-indigo-300 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
