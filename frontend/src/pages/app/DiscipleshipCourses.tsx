import { useNavigate } from 'react-router-dom'
import { GraduationCap, CheckCircle2, Clock, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

type Lesson = {
  id: number
  num: string
  title: string
  scripture: string
  duration: string
  completed: boolean
}

const LESSONS: Lesson[] = [
  { id: 1, num: '01', title: 'Who is God?', scripture: 'Genesis 1:1, Psalm 103', duration: '15 min', completed: true },
  { id: 2, num: '02', title: 'Who is Jesus?', scripture: 'John 1:1–14, Colossians 1:15–20', duration: '20 min', completed: true },
  { id: 3, num: '03', title: 'What is the Gospel?', scripture: '1 Corinthians 15:1–4, Romans 5:8', duration: '15 min', completed: false },
  { id: 4, num: '04', title: 'Understanding Grace', scripture: 'Ephesians 2:8–10, Titus 3:4–7', duration: '18 min', completed: false },
  { id: 5, num: '05', title: 'Talking with God: Prayer', scripture: 'Matthew 6:5–15, Luke 11:1–13', duration: '20 min', completed: false },
  { id: 6, num: '06', title: 'Reading Scripture', scripture: '2 Timothy 3:16–17, Psalm 119:105', duration: '15 min', completed: false },
  { id: 7, num: '07', title: 'Living by Faith', scripture: 'Hebrews 11:1–6, Galatians 2:20', duration: '25 min', completed: false },
]

export function DiscipleshipCourses() {
  const navigate = useNavigate()
  const completedCount = LESSONS.filter((l) => l.completed).length
  const progressPercent = Math.round((completedCount / LESSONS.length) * 100)

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:px-8 space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-purple-600">
          Structured Discipleship
        </p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-indigo-900">
          Foundations of Faith
        </h1>
        <p className="mt-2 text-sm text-indigo-600 max-w-xl">
          A systematic journey through the essential truths of following Jesus, designed for new believers and growing disciples.
        </p>
      </div>

      {/* Course Overview Card */}
      <div className="rounded-[36px] border border-purple-200/80 bg-warm-card p-8 sm:p-10 shadow-xl shadow-purple-900/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-100 pb-6">
          <div className="flex items-center gap-3.5">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
              <GraduationCap className="h-6 w-6" />
            </span>
            <div>
              <h2 className="font-serif text-xl font-bold text-indigo-900">Course Progress</h2>
              <p className="text-xs text-indigo-500">{completedCount} of {LESSONS.length} modules completed</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-serif text-3xl font-bold text-purple-700">{progressPercent}%</span>
            <div className="h-3 w-32 overflow-hidden rounded-full bg-indigo-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-coral-500 to-coral-400"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Modules List */}
        <div className="mt-6 space-y-3">
          {LESSONS.map((lesson) => (
            <div
              key={lesson.id}
              className={`flex items-center justify-between rounded-2xl border p-4 sm:p-5 transition-all ${
                lesson.completed
                  ? 'border-purple-200/60 bg-purple-50/40'
                  : 'border-purple-100 bg-white hover:border-purple-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    lesson.completed
                      ? 'bg-purple-600 text-white'
                      : 'border-2 border-indigo-200 text-indigo-600'
                  }`}
                >
                  {lesson.completed ? <CheckCircle2 className="h-4 w-4" /> : lesson.num}
                </div>

                <div>
                  <h3 className="font-serif text-base font-bold text-indigo-900">
                    {lesson.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-indigo-500 mt-0.5">
                    <span>{lesson.scripture}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {lesson.duration}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                size="sm"
                variant={lesson.completed ? 'ghost' : 'secondary'}
                onClick={() => navigate('/app/bible')}
              >
                {lesson.completed ? 'Review' : 'Start'}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
