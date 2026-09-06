import {
  ChevronRight,
  User,
  Lock,
  Link2,
  Bell,
  Users,
  HandHeart,
  BookOpen,
  Type,
  BookMarked,
  HelpCircle,
  Mail,
  AlertTriangle,
  FileText,
  Shield,
  Sparkles,
  LogOut,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TopBar } from '@/components/layout/TopBar'
import { Switch } from '@/components/ui/Switch'
import { userService } from '@/services/user.service'
import { useAuthStore } from '@/store/authStore'

type SectionProps = { title: string; children: React.ReactNode }

function Section({ title, children }: SectionProps) {
  return (
    <div className="mt-6">
      <h2 className="px-1 pb-2 text-[10.5px] font-bold uppercase tracking-wider text-indigo-400">
        {title}
      </h2>
      <div className="overflow-hidden rounded-[20px] border border-purple-100/70 bg-warm-card shadow-sm divide-y divide-purple-100/60">
        {children}
      </div>
    </div>
  )
}

type RowProps = {
  label: string
  description?: string
  icon?: React.ElementType
  onClick?: () => void
}

function Row({ label, description, icon: Icon, onClick }: RowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3.5 px-4 py-3.5 text-left transition-colors hover:bg-purple-50/60 group"
    >
      {Icon && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-100/70 text-purple-600 group-hover:bg-purple-200/60 transition-colors">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-indigo-900">{label}</p>
        {description && (
          <p className="text-[11.5px] text-indigo-500">{description}</p>
        )}
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-indigo-400 group-hover:text-purple-600 transition-colors" />
    </button>
  )
}

type ToggleRowProps = {
  label: string
  description?: string
  icon?: React.ElementType
  checked: boolean
  onChange: (v: boolean) => void
}

function ToggleRow({ label, description, icon: Icon, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center gap-3.5 px-4 py-3.5">
      {Icon && (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-purple-100/70 text-purple-600">
          <Icon className="h-4 w-4" strokeWidth={2} />
        </span>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-indigo-900">{label}</p>
        {description && (
          <p className="text-[11.5px] text-indigo-500">{description}</p>
        )}
      </div>
      <Switch checked={checked} onChange={onChange} label={label} />
    </div>
  )
}

export function Settings() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const isGuest = useAuthStore((s) => s.isGuest)
  const logout = useAuthStore((s) => s.logout)

  const { data: user } = useQuery({
    queryKey: ['me'],
    queryFn: userService.me,
    retry: 1,
    enabled: !isGuest,
  })

  const { mutate: update } = useMutation({
    mutationFn: userService.updateProfile,
    onSuccess: (updated) => queryClient.setQueryData(['me'], updated),
  })

  function handleSignOut() {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <TopBar title="Settings" />
      <div className="mx-auto max-w-2xl px-5 pb-12 md:px-8">

        {/* Account */}
        <Section title="Account">
          <Row
            label="Edit Profile"
            description="Name, photo, and spiritual stage"
            icon={User}
            onClick={() => navigate('/app/profile')}
          />
          <Row
            label="Change Password"
            description="Update your login credentials"
            icon={Lock}
          />
          <Row
            label="Linked Accounts"
            description="Google, Apple, and social connections"
            icon={Link2}
          />
        </Section>

        {/* Notifications */}
        <Section title="Notifications">
          <ToggleRow
            label="Daily Devotional"
            description="A morning reminder to start the day in the Word"
            icon={Bell}
            checked={user?.notificationsEnabled ?? true}
            onChange={(enabled) => isGuest ? undefined : update({ notificationsEnabled: enabled })}
          />
          <ToggleRow
            label="Community Activity"
            description="Replies, likes, and new discussions"
            icon={Users}
            checked={false}
            onChange={() => undefined}
          />
          <ToggleRow
            label="Prayer Responses"
            description="When someone prays for your request"
            icon={HandHeart}
            checked={true}
            onChange={() => undefined}
          />
        </Section>

        {/* Bible */}
        <Section title="Bible">
          <Row
            label="Default Translation"
            description="BSB, NIV, KJV, NLT, and more"
            icon={BookOpen}
            onClick={() => navigate('/app/bible/translations')}
          />
          <Row
            label="Text Size"
            description="Adjust reading font size"
            icon={Type}
          />
          <Row
            label="Reading Preferences"
            description="Highlights, bookmarks, and verse numbers"
            icon={BookMarked}
          />
        </Section>

        {/* Support */}
        <Section title="Support">
          <Row
            label="Help Center"
            description="FAQs and how-to guides"
            icon={HelpCircle}
          />
          <Row
            label="Contact Us"
            description="Send a message to our team"
            icon={Mail}
            onClick={() => navigate('/contact')}
          />
          <Row
            label="Report a Problem"
            description="Help us improve ROOTED"
            icon={AlertTriangle}
          />
        </Section>

        {/* Legal */}
        <Section title="Legal">
          <Row label="Terms of Service" icon={FileText} />
          <Row label="Privacy Policy" icon={Shield} />
          <Row label="AI Disclaimer" description="How ROOTED AI is designed to serve you" icon={Sparkles} />
        </Section>

        {/* Sign Out */}
        {!isGuest && (
          <button
            onClick={handleSignOut}
            className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-[20px] border border-red-100 bg-red-50 px-4 py-3.5 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-100 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        )}

        <p className="mt-8 text-center text-[11px] text-indigo-400">
          ROOTED v1.0 · Rooted in the Word, Grounded in Grace
        </p>
      </div>
    </div>
  )
}
