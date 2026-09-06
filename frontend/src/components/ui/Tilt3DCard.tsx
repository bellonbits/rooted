/**
 * Tilt3DCard
 * Interactive 3D tilt card combining Framer Motion and Anime.js.
 *
 * Features:
 *  – Framer Motion entrance / scroll-in-view animation
 *  – Anime.js & CSS 3D perspective rotation tracking mouse position
 *  – Instant flattening when clicking or focusing buttons/links so clicks never miss
 *  – Smooth elastic snap-back on mouse leave
 */

import { useRef, useCallback, type ReactNode, type MouseEvent } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import anime from 'animejs'
import { cn } from '@/utils/cn'

interface Tilt3DCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  className?: string
  maxTilt?: number // Max tilt angle in degrees (default: 8)
  glow?: boolean // Optional glowing gradient backplate
  floating?: boolean // Optional gentle Anime.js continuous float
}

export function Tilt3DCard({
  children,
  className,
  maxTilt = 7,
  glow = false,
  floating = false,
  ...motionProps
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isHoveredRef = useRef(false)
  const isLockedRef = useRef(false)

  /* Flatten card cleanly with Anime.js */
  const flatten = useCallback((duration = 200) => {
    const el = cardRef.current
    if (!el) return
    anime.remove(el)
    anime({
      targets: el,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration,
      easing: 'easeOutCubic',
      complete: () => {
        if (el) {
          el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
        }
      },
    })
  }, [])

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isLockedRef.current) return
    const el = cardRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)

    el.style.transform = `perspective(1000px) rotateX(${-dy * maxTilt}deg) rotateY(${dx * maxTilt}deg) scale3d(1.015, 1.015, 1.015)`
  }

  const handleMouseEnter = () => {
    isHoveredRef.current = true
    isLockedRef.current = false
  }

  const handleMouseLeave = () => {
    isHoveredRef.current = false
    isLockedRef.current = false
    flatten(350)
  }

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    // If the click is on an interactive child (button, link, input, etc.), freeze flat immediately
    const target = e.target as HTMLElement
    const isInteractive = Boolean(
      target.closest('button, a, input, [role="button"], label, select, textarea')
    )

    if (isInteractive) {
      isLockedRef.current = true
      flatten(100)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      {...motionProps}
    >
      {glow && (
        <div className="pointer-events-none absolute -inset-2 rounded-[36px] bg-gradient-to-br from-purple-500/15 via-coral-500/10 to-indigo-500/15 blur-xl" />
      )}

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.08s ease-out',
          willChange: 'transform',
        }}
        className={cn('relative', className)}
      >
        {children}
      </div>
    </motion.div>
  )
}
