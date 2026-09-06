import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'

type Plan = {
  id: string
  title: string
  category: string
  duration: string
  description: string
  progress?: number
  isCurrent?: boolean
}

const CATEGORIES = [
  'All',
  'New Believer',
  'Knowing Jesus',
  'Prayer',
  'Faith',
  'Anxiety & Peace',
  'Purpose',
  'Young Adults',
]

const PLANS: Plan[] = [
  {
    id: 'foundations-romans',
    title: 'Foundations of Faith: The Book of Romans',
    category: 'Faith',
    duration: '14 Days',
    description: 'Explore the depths of God’s grace, justification, and living by the Spirit in Paul’s masterwork.',
    progress: 65,
    isCurrent: true,
  },
  {
    id: 'start-here',
    title: 'Start Here: Walking with Jesus',
    category: 'New Believer',
    duration: '7 Days',
    description: 'A gentle, clear introduction to reading Scripture, talking with God in prayer, and understanding redemption.',
    progress: 0,
  },
  {
    id: 'gospel-of-mark',
    title: 'The Servant King: Gospel of Mark',
    category: 'Knowing Jesus',
    duration: '21 Days',
    description: 'Journey through the life, miracles, and compassionate power of Jesus through Mark’s fast-paced narrative.',
    progress: 15,
  },
  {
    id: 'peace-over-anxiety',
    title: 'Peace in the Storm: Overcoming Worry',
    category: 'Anxiety & Peace',
    duration: '5 Days',
    description: 'Anchor your soul in God’s unfailing promises when life feels overwhelming and uncertain.',
    progress: 0,
  },
  {
    id: 'secret-place',
    title: 'The Secret Place: Deepening Daily Prayer',
    category: 'Prayer',
    duration: '10 Days',
    description: 'Learn ancient rhythms of solitude, surrender, and listening for the gentle voice of the Holy Spirit.',
    progress: 0,
  },
  {
    id: 'young-leaders-africa',
    title: 'Rooted Leadership: Integrity & Calling',
    category: 'Young Adults',
    duration: '12 Days',
    description: 'Biblical wisdom for African students and young professionals seeking to lead with godly character.',
    progress: 0,
  },
]

export function ReadingPlans() {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPlans =
    selectedCategory === 'All'
      ? PLANS
      : PLANS.filter((p) => p.category === selectedCategory)

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-purple-600">
          Guided Reading
        </p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-indigo-900">
          Reading Plans
        </h1>
        <p className="mt-2 text-sm text-indigo-600 max-w-xl">
          Build a consistent daily reading habit with structured guides designed for every season of life.
        </p>
      </div>

      {/* Categories Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-warm-card border border-purple-100 text-indigo-700 hover:bg-purple-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Plans Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className={`flex flex-col justify-between rounded-[28px] border p-6 shadow-md transition-all hover:shadow-lg ${
              plan.isCurrent
                ? 'border-purple-300 bg-gradient-to-b from-purple-50/70 via-white to-white ring-1 ring-purple-200'
                : 'border-purple-100 bg-warm-card'
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-purple-100 px-3 py-1 text-[10.5px] font-bold text-purple-700">
                  {plan.category}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-indigo-500">
                  <Clock className="h-3.5 w-3.5" />
                  {plan.duration}
                </span>
              </div>

              <h3 className="mt-4 font-serif text-xl font-bold text-indigo-900 leading-snug">
                {plan.title}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-indigo-600">
                {plan.description}
              </p>
            </div>

            <div className="mt-6 border-t border-purple-100 pt-4">
              {plan.isCurrent && plan.progress !== undefined ? (
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-indigo-700 mb-1.5">
                    <span>Active Plan</span>
                    <span className="font-serif font-bold text-purple-700">{plan.progress}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-indigo-100 mb-4">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-coral-500 to-coral-400"
                      style={{ width: `${plan.progress}%` }}
                    />
                  </div>
                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() => navigate('/app/bible/romans/8')}
                  >
                    Continue Plan →
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full"
                  size="sm"
                  variant="secondary"
                  onClick={() => navigate('/app/bible')}
                >
                  Start Plan
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
