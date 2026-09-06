import { useState } from 'react'
import { HandHeart, CheckCircle2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'

type PrayerItem = {
  id: string
  text: string
  category: string
  date: string
  answered: boolean
}

const CATEGORIES = ['Personal', 'Family', 'Church', 'Work & Studies', 'Gratitude', 'Other']

const INITIAL_PRAYERS: PrayerItem[] = [
  {
    id: '1',
    text: 'For my grandmother’s health and recovery in Nairobi, and peace for our family.',
    category: 'Family',
    date: 'Sep 3, 2026',
    answered: false,
  },
  {
    id: '2',
    text: 'Gratitude for God’s provision of school tuition this semester.',
    category: 'Gratitude',
    date: 'Aug 28, 2026',
    answered: true,
  },
  {
    id: '3',
    text: 'Guidance and wisdom for the university campus Christian union ministry.',
    category: 'Church',
    date: 'Sep 1, 2026',
    answered: false,
  },
]

export function PrayerRoom() {
  const [prayers, setPrayers] = useState<PrayerItem[]>(() => {
    try {
      const saved = localStorage.getItem('rooted_user_prayers')
      return saved ? JSON.parse(saved) : INITIAL_PRAYERS
    } catch {
      return INITIAL_PRAYERS
    }
  })
  const [newText, setNewText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Personal')
  const [activeTab, setActiveTab] = useState<'all' | 'answered'>('all')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newText.trim()) return

    const item: PrayerItem = {
      id: Date.now().toString(),
      text: newText.trim(),
      category: selectedCategory,
      date: 'Today',
      answered: false,
    }

    const updated = [item, ...prayers]
    setPrayers(updated)
    try {
      localStorage.setItem('rooted_user_prayers', JSON.stringify(updated))
    } catch {
      // ignore
    }
    setNewText('')
  }

  const toggleAnswered = (id: string) => {
    const updated = prayers.map((p) => (p.id === id ? { ...p, answered: !p.answered } : p))
    setPrayers(updated)
    try {
      localStorage.setItem('rooted_user_prayers', JSON.stringify(updated))
    } catch {
      // ignore
    }
  }

  const filtered =
    activeTab === 'answered' ? prayers.filter((p) => p.answered) : prayers

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 space-y-10">
      {/* Minimal Contemplative Hero Section */}
      <div className="rounded-[40px] border border-purple-200/80 bg-gradient-to-b from-purple-50/80 via-white to-warm-card p-8 sm:p-14 text-center shadow-xl shadow-purple-900/5">
        <span className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-purple-700">
          <HandHeart className="h-3.5 w-3.5" />
          The Secret Place
        </span>

        <h1 className="mt-4 font-serif text-3xl sm:text-5xl font-bold text-indigo-900 leading-tight">
          Be still.
        </h1>
        <p className="mt-3 font-serif text-lg sm:text-xl text-purple-800 italic">
          Take a moment. Slow down. Pray.
        </p>

        <p className="mx-auto mt-4 max-w-md text-xs sm:text-sm text-indigo-600 leading-relaxed">
          &ldquo;Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.&rdquo; — Philippians 4:6
        </p>
      </div>

      {/* Write Prayer Card */}
      <form
        onSubmit={handleAdd}
        className="rounded-[32px] border border-purple-100 bg-warm-card p-6 sm:p-8 shadow-md space-y-5"
      >
        <div className="flex items-center justify-between border-b border-purple-100 pb-3">
          <h2 className="font-serif text-lg font-bold text-indigo-900">
            What would you like to pray about?
          </h2>
          <span className="text-xs text-indigo-400">Private &amp; Encrypted</span>
        </div>

        <textarea
          rows={3}
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Pour out your heart honestly before God..."
          className="w-full rounded-2xl border border-purple-100 bg-lavender-50/40 p-4 text-sm text-indigo-900 placeholder-indigo-400 focus:border-purple-400 focus:bg-white focus:outline-none transition-colors"
        />

        {/* Category Radio Pills */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-indigo-500 mb-2">
            Select Category
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-lavender-50 text-indigo-700 hover:bg-purple-100/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={!newText.trim()}>
            <Plus className="h-4 w-4" />
            Add to Prayer List
          </Button>
        </div>
      </form>

      {/* Prayer List & Answered Prayers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h3 className="font-serif text-xl font-bold text-indigo-900">My Prayers</h3>
            <div className="flex rounded-full bg-lavender-100/70 p-1">
              <button
                onClick={() => setActiveTab('all')}
                className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                  activeTab === 'all' ? 'bg-white text-purple-700 shadow-xs' : 'text-indigo-600'
                }`}
              >
                All ({prayers.length})
              </button>
              <button
                onClick={() => setActiveTab('answered')}
                className={`rounded-full px-3 py-1 text-xs font-bold transition-all ${
                  activeTab === 'answered' ? 'bg-white text-purple-700 shadow-xs' : 'text-indigo-600'
                }`}
              >
                Answered ({prayers.filter((p) => p.answered).length})
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((prayer) => (
            <div
              key={prayer.id}
              className={`flex items-start justify-between gap-4 rounded-3xl border p-5 shadow-xs transition-all ${
                prayer.answered
                  ? 'border-purple-200/60 bg-purple-50/40'
                  : 'border-purple-100 bg-warm-card hover:border-purple-300'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <button
                  onClick={() => toggleAnswered(prayer.id)}
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
                    prayer.answered
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'border-2 border-indigo-200 bg-white hover:border-purple-400'
                  }`}
                  aria-label="Mark answered"
                >
                  <CheckCircle2 className="h-4 w-4" />
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-700">
                      {prayer.category}
                    </span>
                    <span className="text-[11px] text-indigo-400">{prayer.date}</span>
                    {prayer.answered && (
                      <span className="rounded-full bg-coral-100 px-2 py-0.5 text-[10px] font-bold text-coral-600">
                        Answered Praise!
                      </span>
                    )}
                  </div>
                  <p className={`mt-2 text-sm leading-relaxed ${prayer.answered ? 'text-indigo-700 line-through opacity-80' : 'text-indigo-900 font-medium'}`}>
                    {prayer.text}
                  </p>
                </div>
              </div>

              <button
                onClick={() => toggleAnswered(prayer.id)}
                className="text-xs font-semibold text-purple-600 hover:text-purple-800 shrink-0"
              >
                {prayer.answered ? 'Uncheck' : 'Mark Answered'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
