/**
 * AuthLayout
 * Shared wrapper for Login / Register / ForgotPassword.
 *
 * 3-D tilt behaviour:
 *  - When cursor is OUTSIDE the card (on background):
 *    Moving mouse tilts card in 3D (perspective, rotateX, rotateY).
 *    Clicking outside activates / keeps 3D tilt active.
 *  - When cursor ENTERS or CLICKS inside the card (form / buttons):
 *    Card smoothly flattens to 0° and locks in place.
 *    No animations run during clicks so every button, input, and icon
 *    responds IMMEDIATELY to left click without needing Tab.
 *  - Clickable ROOTED logo links directly to the homepage.
 */

import { useEffect, useRef, useCallback, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import anime from 'animejs'
import { Logo } from '@/components/ui/Logo'

type AuthLayoutProps = {
  children: ReactNode
  subtitle?: string
}

export function AuthLayout({ children, subtitle }: AuthLayoutProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)
  const isInsideCardRef = useRef(false)
  const isFormFocusedRef = useRef(false)
  const isOutsideActiveRef = useRef(true)

  /* ── Anime.js: ambient breathing blob in background ── */
  useEffect(() => {
    if (!blobRef.current) return
    const anim = anime({
      targets: blobRef.current,
      translateY: ['-16px', '16px'],
      scale: [1, 1.12],
      opacity: [0.15, 0.28],
      duration: 5400,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
    })
    return () => {
      anim.pause()
    }
  }, [])

  /* ── Smoothly flatten card ── */
  const flattenCard = useCallback((duration = 220) => {
    const card = cardRef.current
    if (!card) return
    anime.remove(card)
    anime({
      targets: card,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration,
      easing: 'easeOutCubic',
      complete: () => {
        if (card && (isInsideCardRef.current || isFormFocusedRef.current)) {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
        }
      },
    })
  }, [])

  /* ── Global mouse & click handling ── */
  useEffect(() => {
    let rafId: number | null = null

    const handleMouseMove = (e: MouseEvent) => {
      // If user is hovering card or filling form, do not tilt
      if (isInsideCardRef.current || isFormFocusedRef.current) {
        return
      }

      const card = cardRef.current
      if (!card) return

      // Only tilt when active from outside
      if (!isOutsideActiveRef.current) return

      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (e.clientX - cx) / (window.innerWidth / 2)
        const dy = (e.clientY - cy) / (window.innerHeight / 2)
        const maxDeg = 9

        card.style.transform = `perspective(1000px) rotateX(${-dy * maxDeg}deg) rotateY(${dx * maxDeg}deg) scale3d(1.01, 1.01, 1.01)`
      })
    }

    const handleMouseDown = (e: MouseEvent) => {
      const card = cardRef.current
      if (!card) return

      const clickedInside = card.contains(e.target as Node)

      if (clickedInside) {
        // User clicked inside the card (input, button, etc.)
        isInsideCardRef.current = true
        isOutsideActiveRef.current = false
        flattenCard(120) // Quickly flatten without elastic shift
      } else {
        // User clicked outside the card (background)
        isFormFocusedRef.current = false
        isInsideCardRef.current = false
        isOutsideActiveRef.current = true

        // Subtle 3D tilt reaction on background click
        const rect = card.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (e.clientX - cx) / (window.innerWidth / 2)
        const dy = (e.clientY - cy) / (window.innerHeight / 2)
        const maxDeg = 10

        anime.remove(card)
        anime({
          targets: card,
          rotateX: -dy * maxDeg,
          rotateY: dx * maxDeg,
          scale: 1.02,
          duration: 350,
          easing: 'easeOutQuad',
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [flattenCard])

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-indigo-900 px-4 py-10">

      {/* ── Animated ambient blobs ── */}
      <div
        ref={blobRef}
        className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-3xl"
      />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-coral-500/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-purple-400/8 blur-2xl" />

      {/* ── Dot grid ── */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative z-10 w-full max-w-sm">

        {/* ── Logo → Home ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-8 flex flex-col items-center gap-2"
        >
          <Link
            to="/"
            className="group flex flex-col items-center gap-1 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-950"
            aria-label="Go to ROOTED homepage"
          >
            <motion.div
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Logo variant="white" tagline={false} />
            </motion.div>
            <span className="text-[10px] font-medium tracking-widest text-purple-400/60 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              ← Back to home
            </span>
          </Link>
          {subtitle && (
            <p className="text-sm text-purple-200/70 text-center">{subtitle}</p>
          )}
        </motion.div>

        {/* ── 3-D card container ── */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative"
        >
          {/* Glow halo */}
          <div className="pointer-events-none absolute -inset-1 rounded-[32px] bg-gradient-to-br from-purple-600/20 to-coral-500/10 blur-xl" />

          {/* Tiltable card shell */}
          <div
            ref={cardRef}
            onMouseEnter={() => {
              isInsideCardRef.current = true
              flattenCard(200)
            }}
            onMouseLeave={() => {
              isInsideCardRef.current = false
              if (!isFormFocusedRef.current) {
                isOutsideActiveRef.current = true
              }
            }}
            onFocus={() => {
              isFormFocusedRef.current = true
              flattenCard(100)
            }}
            onBlur={(e) => {
              // If focus moved outside the card completely
              if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                isFormFocusedRef.current = false
              }
            }}
            style={{
              transformStyle: 'preserve-3d',
              transition: 'transform 0.1s ease-out',
              willChange: 'transform',
            }}
            className="relative rounded-[28px] border border-white/10 bg-white/[0.07] shadow-2xl backdrop-blur-xl"
          >
            {children}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
