import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Logo } from '@/components/ui/Logo'

export function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => navigate('/onboarding'), 2000)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <button
      type="button"
      onClick={() => navigate('/onboarding')}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-indigo-950 px-6 text-center cursor-pointer select-none"
      aria-label="Click to continue"
    >
      {/* ── Full Background Image with Slow Breathing & Fading ── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 0.38, scale: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <img
          src="/images/bible-sunrise.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* ── Dark Fading Gradient Overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-950 via-indigo-950/80 to-indigo-950/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-indigo-950/90" />

      {/* Ambient glowing blobs */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600/30 blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-coral-500/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 shadow-2xl backdrop-blur-md ring-1 ring-white/20">
          <div className="scale-125">
            <Logo variant="white" tagline={false} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl">
            ROOTED
          </h1>
          <p className="mt-2 text-sm font-medium tracking-wide text-purple-200/80">
            Grow Deep · Live the Word
          </p>
        </motion.div>

        {/* Pulsing loading dots */}
        <div className="mt-10 flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.3, scale: 0.8 }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
              className="h-2 w-2 rounded-full bg-purple-300"
            />
          ))}
        </div>
      </motion.div>
    </button>
  )
}
