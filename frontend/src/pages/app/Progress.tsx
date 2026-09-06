import {
  TrendingUp,
  Flame,
  BookOpen,
  Feather,
  HandHeart,
  Sparkles,
  Award,
} from 'lucide-react'

export function Progress() {

  const stats = [
    {
      label: 'Reading Streak',
      value: '12 Days',
      detail: 'Consistent daily walk',
      icon: Flame,
      color: 'text-coral-500 bg-coral-100',
    },
    {
      label: 'Current Plan',
      value: '65%',
      detail: 'Foundations of Faith: Romans',
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-100',
    },
    {
      label: 'Bible Read',
      value: '34%',
      detail: '402 chapters completed',
      icon: BookOpen,
      color: 'text-indigo-600 bg-indigo-100',
    },
    {
      label: 'Journal Entries',
      value: '18',
      detail: 'Personal reflections',
      icon: Feather,
      color: 'text-purple-600 bg-purple-100',
    },
    {
      label: 'Prayers Lifted',
      value: '42',
      detail: '14 answered praises',
      icon: HandHeart,
      color: 'text-coral-500 bg-coral-100',
    },
    {
      label: 'Verses Memorized',
      value: '9',
      detail: 'Stored in your heart',
      icon: Sparkles,
      color: 'text-purple-600 bg-purple-100',
    },
  ]

  // 14-day activity dots
  const activityDays = [
    { day: 'Mon', active: true },
    { day: 'Tue', active: true },
    { day: 'Wed', active: true },
    { day: 'Thu', active: true },
    { day: 'Fri', active: true },
    { day: 'Sat', active: true },
    { day: 'Sun', active: true },
    { day: 'Mon', active: true },
    { day: 'Tue', active: true },
    { day: 'Wed', active: true },
    { day: 'Thu', active: true },
    { day: 'Fri', active: true },
    { day: 'Today', active: true },
    { day: 'Tomorrow', active: false },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 space-y-8">
      {/* Header */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-purple-600">
          Spiritual Habit &amp; Encouragement
        </p>
        <h1 className="mt-1 font-serif text-3xl sm:text-4xl font-bold text-indigo-900">
          Your Growth in Faith
        </h1>
        <p className="mt-2 text-sm text-indigo-600 max-w-xl">
          Grace-filled tracking to encourage consistency in your daily walk with God.
        </p>
      </div>

      {/* Featured Encouragement Card (Romans 65% from Reference Image) */}
      <div className="rounded-[36px] border border-purple-200/80 bg-warm-card p-8 sm:p-10 shadow-xl shadow-purple-900/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-purple-100 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-coral-100 px-3 py-1 text-xs font-bold text-coral-600">
              <Flame className="h-3.5 w-3.5" />
              <span>12-Day Streak · Keep Going</span>
            </div>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl font-bold text-indigo-900">
              You are 65% through Romans.
            </h2>
            <p className="mt-1 text-sm text-indigo-600">
              &ldquo;God&apos;s word is transforming your heart and mind day by day.&rdquo;
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end">
            <span className="font-serif text-4xl font-bold text-indigo-900">65%</span>
            <span className="text-xs text-indigo-400 font-semibold uppercase">Plan Completion</span>
            <div className="mt-2 h-3 w-48 overflow-hidden rounded-full bg-indigo-100">
              <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-coral-500 to-coral-400 shadow-xs" />
            </div>
          </div>
        </div>

        {/* 14-day Habit Calendar */}
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-500 mb-3">
            Last 14 Days Activity Rhythm
          </p>
          <div className="grid grid-cols-7 sm:grid-cols-14 gap-2">
            {activityDays.map((item, i) => (
              <div
                key={i}
                className={`flex flex-col items-center justify-center rounded-2xl py-3 text-center border transition-all ${
                  item.active
                    ? 'border-purple-200 bg-gradient-to-b from-purple-50 to-purple-100/50 text-purple-800 font-bold'
                    : 'border-dashed border-indigo-200 bg-white text-indigo-400'
                }`}
              >
                <span className="text-[10px] uppercase">{item.day}</span>
                <span className="mt-1 text-sm">{item.active ? '✓' : '○'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Spiritual Milestones */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <div
              key={s.label}
              className="flex items-center gap-4 rounded-[28px] border border-purple-100 bg-warm-card p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${s.color}`}>
                <Icon className="h-7 w-7" />
              </div>
              <div>
                <p className="text-xs font-semibold text-indigo-500">{s.label}</p>
                <p className="font-serif text-2xl font-bold text-indigo-900 mt-0.5">{s.value}</p>
                <p className="text-[11px] text-indigo-400 mt-0.5">{s.detail}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Discipleship Milestones */}
      <div className="rounded-[32px] border border-purple-100 bg-warm-card p-6 sm:p-8 shadow-md">
        <h3 className="font-serif text-xl font-bold text-indigo-900 mb-4">
          Spiritual Milestones
        </h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3 rounded-2xl border border-purple-100 p-4 bg-purple-50/40">
            <Award className="h-8 w-8 text-purple-600 shrink-0" />
            <div>
              <p className="text-sm font-bold text-indigo-900">First Steps</p>
              <p className="text-xs text-indigo-500">Completed 7-day starter plan</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-purple-100 p-4 bg-purple-50/40">
            <Award className="h-8 w-8 text-coral-500 shrink-0" />
            <div>
              <p className="text-sm font-bold text-indigo-900">Faithful Prayer</p>
              <p className="text-xs text-indigo-500">30 prayers logged</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-purple-100 p-4 bg-purple-50/40">
            <Award className="h-8 w-8 text-purple-600 shrink-0" />
            <div>
              <p className="text-sm font-bold text-indigo-900">Gospel Seeker</p>
              <p className="text-xs text-indigo-500">Read the Gospel of Mark</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
