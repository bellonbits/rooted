import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AuthLayout } from '@/components/layout/AuthLayout'

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <AuthLayout subtitle={sent ? 'Check your email for a reset link' : 'Reset your ROOTED password'}>
      <div className="p-7">
        <h2 className="font-serif text-2xl font-bold text-white text-center mb-2 tracking-tight">
          {sent ? 'Email Sent!' : 'Reset Password'}
        </h2>

        {sent ? (
          <div className="flex flex-col items-center gap-5 py-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/15 ring-4 ring-green-500/20">
              <CheckCircle2 className="h-8 w-8 text-green-400" strokeWidth={1.5} />
            </div>
            <p className="text-center text-sm leading-relaxed text-purple-200/70">
              If an account exists for{' '}
              <span className="font-semibold text-white">{email}</span>,
              a reset link is on its way. Check your spam folder if needed.
            </p>
            <Button variant="secondary" onClick={() => setSent(false)} className="w-full rounded-2xl">
              Try a different email
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10.5px] font-bold text-purple-300/70 uppercase tracking-widest">
                Email Address
              </label>
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

            <Button type="submit" size="lg" className="mt-1 w-full rounded-2xl">
              <span className="flex items-center gap-2">
                Send Reset Link <ArrowRight className="h-4 w-4" />
              </span>
            </Button>
          </form>
        )}

        <div className="mt-6 flex justify-center">
          <Link
            to="/login"
            className="flex items-center gap-1.5 text-xs font-medium text-purple-300/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </AuthLayout>
  )
}
