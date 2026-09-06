import { Link, useNavigate } from 'react-router-dom'
import { useState, type FormEvent } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { authService } from '@/services/auth.service'
import { userService } from '@/services/user.service'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/utils/cn'

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: 'At least 8 characters', ok: password.length >= 8 },
    { label: 'Contains a number', ok: /\d/.test(password) },
    { label: 'Contains a letter', ok: /[a-zA-Z]/.test(password) },
  ]
  if (password.length === 0) return null
  const score = checks.filter((c) => c.ok).length
  const barColor = score === 1 ? 'bg-red-400' : score === 2 ? 'bg-amber-400' : 'bg-green-400'

  return (
    <div className="mt-1.5 space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              'h-1 flex-1 rounded-full transition-all duration-300',
              i <= score ? barColor : 'bg-white/10',
            )}
          />
        ))}
      </div>
      <div className="space-y-0.5">
        {checks.map((c) => (
          <div key={c.label} className="flex items-center gap-1.5">
            {c.ok
              ? <CheckCircle2 className="h-3 w-3 text-green-400" />
              : <XCircle className="h-3 w-3 text-white/20" />}
            <span className={cn('text-[10.5px]', c.ok ? 'text-green-300' : 'text-purple-300/40')}>
              {c.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const { setToken, setUser } = useAuthStore()

  const passwordsMatch = confirmPassword.length === 0 || password === confirmPassword
  const canSubmit = agreed && password === confirmPassword && confirmPassword.length > 0 && name.trim().length > 0 && email.trim().length > 0

  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      const token = await authService.register(name, email, password)
      setToken(token)
      const user = await userService.me()
      setUser(user)
    },
    onSuccess: () => navigate('/app'),
  })

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!canSubmit) return
    mutate()
  }

  return (
    <AuthLayout subtitle="Join ROOTED and grow deeper in God's Word">
      <div className="p-7">
        <h2 className="font-serif text-2xl font-bold text-white text-center mb-6 tracking-tight">
          Create Account
        </h2>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10.5px] font-bold text-purple-300/70 uppercase tracking-widest">Full Name</label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-300/60" />
              <input
                required
                placeholder="Sarah Jenkins"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/6 py-3 pl-10 pr-4 text-sm text-white placeholder-purple-300/40 outline-none transition-all focus:border-purple-400/60 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10.5px] font-bold text-purple-300/70 uppercase tracking-widest">Email Address</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-300/60" />
              <input
                type="email"
                required
                placeholder="sarah@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/6 py-3 pl-10 pr-4 text-sm text-white placeholder-purple-300/40 outline-none transition-all focus:border-purple-400/60 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/20"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10.5px] font-bold text-purple-300/70 uppercase tracking-widest">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-300/60" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/6 py-3 pl-10 pr-11 text-sm text-white placeholder-purple-300/40 outline-none transition-all focus:border-purple-400/60 focus:bg-white/10 focus:ring-2 focus:ring-purple-500/20"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-300/60 hover:text-white transition-colors"
                aria-label="Toggle password">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <PasswordStrength password={password} />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10.5px] font-bold text-purple-300/70 uppercase tracking-widest">Confirm Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-300/60" />
              <input
                type={showConfirm ? 'text' : 'password'}
                required
                minLength={8}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={cn(
                  'w-full rounded-2xl border bg-white/6 py-3 pl-10 pr-11 text-sm text-white placeholder-purple-300/40 outline-none transition-all focus:ring-2',
                  passwordsMatch
                    ? 'border-white/10 focus:border-purple-400/60 focus:ring-purple-500/20'
                    : 'border-red-400/50 focus:ring-red-500/20',
                )}
              />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-300/60 hover:text-white transition-colors"
                aria-label="Toggle confirm">
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {!passwordsMatch && (
              <span className="flex items-center gap-1.5 text-xs text-red-300">
                <XCircle className="h-3.5 w-3.5" /> Passwords don't match
              </span>
            )}
          </div>

          {/* Terms */}
          <label className="flex cursor-pointer items-start gap-2.5">
            <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="peer sr-only"
              />
              <div className={cn(
                'h-4 w-4 rounded border transition-all flex items-center justify-center',
                agreed ? 'border-purple-500 bg-purple-600' : 'border-white/20 bg-white/5'
              )}>
                {agreed && <CheckCircle2 className="h-3 w-3 text-white" />}
              </div>
            </div>
            <span className="text-xs leading-relaxed text-purple-300/60">
              I agree to the{' '}
              <span className="font-semibold text-purple-200 hover:text-white cursor-pointer">Terms of Service</span>
              {' '}&amp;{' '}
              <span className="font-semibold text-purple-200 hover:text-white cursor-pointer">Privacy Policy</span>
            </span>
          </label>

          {error && (
            <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300">
              Could not create your account. Try a different email address.
            </div>
          )}

          <Button type="submit" disabled={isPending || !canSubmit} size="lg" className="mt-1 w-full rounded-2xl">
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Creating account…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Create Account <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-xs text-purple-300/50">or sign up with</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        {/* Social */}
        <div className="grid grid-cols-2 gap-3">
          <button type="button" className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/6 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors">
            <GoogleIcon /> Google
          </button>
          <button type="button" className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/6 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors">
            <AppleIcon /> Apple
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-purple-200/60">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-white hover:text-purple-200 transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}
