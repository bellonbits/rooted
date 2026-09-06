import { Link, useNavigate } from 'react-router-dom'
import { Bell, Settings, Award, Flame, BookOpen, Feather } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Card } from '@/components/ui/Card'
import { Pill } from '@/components/ui/Pill'
import { Switch } from '@/components/ui/Switch'
import { Button } from '@/components/ui/Button'
import { SPIRITUAL_STAGES } from '@/constants/nav'
import { userService } from '@/services/user.service'
import { useAuthStore } from '@/store/authStore'

const STATS = [
  { label: 'Day Streak', value: '12', icon: Flame, color: 'text-coral-500 bg-coral-100' },
  { label: 'Bible Read', value: '34%', icon: BookOpen, color: 'text-purple-600 bg-purple-100' },
  { label: 'Journals', value: '18', icon: Feather, color: 'text-indigo-600 bg-indigo-100' },
  { label: 'Badges', value: '5', icon: Award, color: 'text-coral-500 bg-coral-100' },
]

function ProfileHero({ initial }: { initial?: string }) {
  const navigate = useNavigate()
  return (
    <div className="relative mb-2 overflow-hidden">
      {/* Background gradient */}
      <div className="h-36 w-full bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 relative">
        <div className="pointer-events-none absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_30%_30%,white_1px,transparent_1px)] [background-size:20px_20px]" />
        {/* Toolbar */}
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-5">
          <h1 className="font-serif text-xl font-bold text-white">My Profile</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/app/notifications')}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={() => navigate('/app/settings')}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm hover:bg-white/25 transition-colors"
              aria-label="Settings"
            >
              <Settings className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Avatar */}
      <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '72px' }}>
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-gradient-to-tr from-purple-600 to-purple-400 font-serif text-2xl font-bold text-white shadow-lg">
          {initial ?? '?'}
        </div>
      </div>

      {/* Spacer to clear the avatar */}
      <div className="h-12" />
    </div>
  )
}

export function Profile() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const logout = useAuthStore((s) => s.logout)
  const isGuest = useAuthStore((s) => s.isGuest)

  const { data: user, isLoading } = useQuery({
    queryKey: ['me'],
    queryFn: userService.me,
    retry: 1,
    enabled: !isGuest,
  })

  const { mutate: update } = useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: (updated) => queryClient.setQueryData(['me'], updated),
  })

  function handleLogout() {
    logout()
    navigate('/login')
  }

  if (isGuest) {
    return (
      <div>
        <ProfileHero />
        <div className="mx-auto max-w-2xl px-5 pb-12 md:px-8">
          <Card className="text-center mt-2">
            <p className="font-serif text-lg font-semibold text-indigo-900">
              You're browsing as a guest
            </p>
            <p className="mt-1.5 text-sm text-indigo-500">
              Create a free account to save your progress, journal entries, prayers, and streak.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <Link to="/register">
                <Button className="w-full">Create Account</Button>
              </Link>
              <Link to="/login">
                <Button variant="ghost" className="w-full">Log in instead</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div>
      <ProfileHero initial={user?.name?.[0]} />
      <div className="mx-auto max-w-2xl px-5 pb-12 md:px-8">

        {isLoading && (
          <p className="mt-4 text-center text-sm text-indigo-400">Loading profile…</p>
        )}

        {user && (
          <>
            {/* Name & email */}
            <div className="mt-3 text-center">
              <p className="font-serif text-2xl font-bold text-indigo-900">{user.name}</p>
              <p className="mt-0.5 text-sm text-indigo-500">{user.email}</p>
            </div>

            {/* Stats row */}
            <div className="mt-6 grid grid-cols-4 gap-3">
              {STATS.map(({ label, value, icon: Icon, color }) => (
                <div
                  key={label}
                  className="flex flex-col items-center rounded-[20px] border border-purple-100/70 bg-warm-card py-4 shadow-sm"
                >
                  <span className={`flex h-8 w-8 items-center justify-center rounded-xl ${color}`}>
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <p className="mt-1.5 font-serif text-lg font-bold text-indigo-900">{value}</p>
                  <p className="text-[10px] font-medium text-indigo-400">{label}</p>
                </div>
              ))}
            </div>

            {/* Spiritual stage */}
            <div className="mt-6 overflow-hidden rounded-[20px] border border-purple-100/70 bg-warm-card p-5 shadow-sm">
              <h2 className="text-[10.5px] font-bold uppercase tracking-wider text-indigo-400 mb-3">
                Spiritual Stage
              </h2>
              <div className="flex flex-wrap gap-2">
                {SPIRITUAL_STAGES.map((stage) => (
                  <Pill
                    key={stage.value}
                    active={user.spiritualStage === stage.value}
                    onClick={() => update({ spiritualStage: stage.value })}
                  >
                    {stage.label}
                  </Pill>
                ))}
              </div>
            </div>

            {/* Notifications toggle */}
            <div className="mt-4 flex items-center justify-between rounded-[20px] border border-purple-100/70 bg-warm-card px-5 py-4 shadow-sm">
              <div>
                <p className="text-sm font-semibold text-indigo-900">Notifications</p>
                <p className="text-xs text-indigo-500">Daily verses, community updates &amp; prayer alerts</p>
              </div>
              <Switch
                checked={user.notificationsEnabled}
                onChange={(enabled) => update({ notificationsEnabled: enabled })}
                label="Notifications"
              />
            </div>

            {/* Sign out */}
            <button
              onClick={handleLogout}
              className="mt-4 w-full rounded-[20px] border border-red-100 bg-red-50 px-4 py-3.5 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-100 transition-colors"
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  )
}
