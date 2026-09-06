import { Link } from 'react-router-dom'

export function GuestBanner({ message = "You're browsing as a guest — your progress won't be saved." }: { message?: string }) {
  return (
    <div
      className="mb-4 flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm"
      style={{
        background: 'rgba(240, 180, 41, 0.12)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderColor: 'rgba(240, 180, 41, 0.3)',
      }}
    >
      <p className="text-forest-900">{message}</p>
      <Link to="/register" className="shrink-0 font-semibold text-mint-500 hover:underline">
        Sign up
      </Link>
    </div>
  )
}
