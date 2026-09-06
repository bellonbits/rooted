import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

export function RequireAuth() {
  const token = useAuthStore((s) => s.token)
  const isGuest = useAuthStore((s) => s.isGuest)
  const location = useLocation()

  if (!token && !isGuest) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
