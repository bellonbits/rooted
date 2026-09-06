import type { Variants } from 'framer-motion'

// Shared stagger variants for list entrances (suggested prompts, verse
// list, course/lesson cards) — restrained, ~40ms per item, no bounce.
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04 },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
}
