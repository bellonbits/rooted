import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Feather,
  HandHeart,
  ArrowLeft,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function TodaysJourney() {
  const navigate = useNavigate()
  const [completedSteps, setCompletedSteps] = useState<number[]>([1, 2])

  const steps = [
    {
      id: 1,
      num: '01',
      title: 'Read',
      passage: 'Mark 4:1–20',
      description: 'The Parable of the Sower and its divine meaning.',
      icon: BookOpen,
      actionLabel: 'Open Scripture Reader',
      actionUrl: '/app/bible/mark/4',
    },
    {
      id: 2,
      num: '02',
      title: 'Understand',
      passage: 'The Secret of the Seed',
      description: 'What is Jesus teaching about the receptivity of our hearts?',
      icon: HelpCircle,
      actionLabel: 'Discuss with ROOTED AI',
      actionUrl: '/app/ai',
    },
    {
      id: 3,
      num: '03',
      title: 'Reflect',
      passage: 'Personal Application',
      description: 'What is God showing you about your own soil today?',
      icon: Feather,
      actionLabel: 'Write in Journal',
      actionUrl: '/app/journal',
    },
    {
      id: 4,
      num: '04',
      title: 'Pray',
      passage: 'Stillness & Surrender',
      description: 'Spend quiet moments surrendering your desires to the Lord.',
      icon: HandHeart,
      actionLabel: 'Enter Prayer Room',
      actionUrl: '/app/prayer',
    },
  ]

  const toggleComplete = (id: number) => {
    setCompletedSteps((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )
  }

  const progressPercent = Math.round((completedSteps.length / steps.length) * 100)

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-8 space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/app')}
          className="flex items-center gap-2 text-xs font-semibold text-indigo-500 hover:text-purple-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>
        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700">
          Daily Discipleship
        </span>
      </div>

      {/* Main Hero Card */}
      <div className="rounded-[36px] border border-purple-200/80 bg-warm-card p-8 sm:p-10 shadow-xl shadow-purple-900/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-100 pb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-purple-600">
              Today&apos;s Journey · September 5
            </p>
            <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-indigo-900">
              Grow in faith.
            </h1>
            <p className="mt-1 text-sm text-indigo-600">
              Complete each spiritual rhythm to nurture a deep root in God&apos;s truth.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-3xl font-bold text-purple-700">
                {progressPercent}%
              </span>
              <span className="text-xs uppercase font-semibold text-indigo-400">Complete</span>
            </div>
            {/* Coral accent progress bar */}
            <div className="mt-2 h-2.5 w-40 overflow-hidden rounded-full bg-indigo-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-coral-500 to-coral-400 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Steps List */}
        <div className="mt-8 space-y-4">
          {steps.map((step) => {
            const isDone = completedSteps.includes(step.id)
            const StepIcon = step.icon

            return (
              <div
                key={step.id}
                className={`overflow-hidden rounded-3xl border transition-all ${
                  isDone
                    ? 'border-purple-200/80 bg-purple-50/40'
                    : 'border-purple-100 bg-white hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleComplete(step.id)}
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isDone
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'border-2 border-indigo-200 bg-white text-transparent hover:border-purple-400'
                      }`}
                      aria-label="Toggle step"
                    >
                      <CheckCircle2 className="h-5 w-5" />
                    </button>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-sm font-black text-purple-400">
                          {step.num}
                        </span>
                        <h3 className={`font-serif text-lg font-bold ${isDone ? 'text-indigo-900 line-through opacity-75' : 'text-indigo-900'}`}>
                          {step.title}
                        </h3>
                        <span className="text-xs font-semibold text-indigo-400">· {step.passage}</span>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-indigo-600">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      variant={isDone ? 'ghost' : 'secondary'}
                      onClick={() => navigate(step.actionUrl)}
                    >
                      <StepIcon className="h-3.5 w-3.5" />
                      {step.actionLabel}
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom completion note */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-purple-100 pt-6">
          <div className="flex items-center gap-2 text-xs text-indigo-500">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span>Today&apos;s Journey is <strong>{progressPercent}% Complete</strong>. Well done!</span>
          </div>
          <Button
            size="sm"
            onClick={() => {
              setCompletedSteps([1, 2, 3, 4])
            }}
          >
            Mark All Completed ✓
          </Button>
        </div>
      </div>
    </div>
  )
}
