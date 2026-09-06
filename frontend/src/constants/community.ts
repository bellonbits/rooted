export const CATEGORIES = ['Toddlers', 'Teen Years', 'Marriage', 'Faith Talk', 'General'] as const

export const CATEGORY_IMAGES: Record<string, string> = {
  Toddlers: '/images/family-meal.jpg',
  'Teen Years': '/images/community-prayer.jpg',
  Marriage: '/images/praying-with-bible.jpg',
  'Faith Talk': '/images/bible-sunrise.jpg',
  General: '/images/bible-sunrise.jpg',
}

export function categoryImage(category: string) {
  return CATEGORY_IMAGES[category] ?? CATEGORY_IMAGES.General
}

export function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString()
}

export function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
