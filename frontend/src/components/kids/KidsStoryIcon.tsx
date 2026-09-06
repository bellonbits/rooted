import {
  Sparkles,
  Star,
  Leaf,
  Sprout,
  Heart,
  BookOpen,
  Sun,
  Moon,
  Apple,
  Trees,
  Flower2,
  Waves,
  Droplets,
  Fish,
  Feather,
  PawPrint,
  Shield,
  Sword,
  Ship,
  Flame,
  Lightbulb,
  Compass,
  Trophy,
  Award,
  Wind,
  Zap,
  Hand,
  Eye,
  CheckCircle2,
} from 'lucide-react'

type IconKey =
  | 'sparkles'
  | 'star'
  | 'leaf'
  | 'sprout'
  | 'heart'
  | 'bookOpen'
  | 'sun'
  | 'moon'
  | 'apple'
  | 'trees'
  | 'flower'
  | 'waves'
  | 'droplets'
  | 'fish'
  | 'feather'
  | 'pawPrint'
  | 'shield'
  | 'sword'
  | 'ship'
  | 'flame'
  | 'lightbulb'
  | 'compass'
  | 'trophy'
  | 'award'
  | 'wind'
  | 'zap'
  | 'hand'
  | 'help'
  | 'eye'
  | 'check'
  | string

interface KidsStoryIconProps {
  name: IconKey
  className?: string
}

export function KidsStoryIcon({ name, className = 'h-4 w-4' }: KidsStoryIconProps) {
  // Normalize key from name or legacy emojis
  const key = name.toLowerCase().trim()

  if (key === 'sparkles' || key === '✨' || key === '🌟') {
    return <Sparkles className={className} />
  }
  if (key === 'star' || key === '⭐') {
    return <Star className={className} />
  }
  if (key === 'leaf' || key === '🍃' || key === '🌿') {
    return <Leaf className={className} />
  }
  if (key === 'sprout' || key === '🌱') {
    return <Sprout className={className} />
  }
  if (key === 'heart' || key === '❤️' || key === '💖') {
    return <Heart className={className} />
  }
  if (key === 'bookopen' || key === '📖') {
    return <BookOpen className={className} />
  }
  if (key === 'sun' || key === '☀️') {
    return <Sun className={className} />
  }
  if (key === 'moon' || key === '🌙') {
    return <Moon className={className} />
  }
  if (key === 'apple' || key === '🍎') {
    return <Apple className={className} />
  }
  if (key === 'trees' || key === '🌳') {
    return <Trees className={className} />
  }
  if (key === 'flower' || key === '🌸' || key === '🌼') {
    return <Flower2 className={className} />
  }
  if (key === 'waves' || key === '🌊') {
    return <Waves className={className} />
  }
  if (key === 'droplets' || key === '💧') {
    return <Droplets className={className} />
  }
  if (key === 'fish' || key === '🐳' || key === '🐟') {
    return <Fish className={className} />
  }
  if (key === 'feather' || key === '🐦' || key === '🕊️' || key === '🕊') {
    return <Feather className={className} />
  }
  if (
    key === 'pawprint' ||
    key === '🐘' ||
    key === '🦒' ||
    key === '🦁' ||
    key === '🐑' ||
    key === '🐒'
  ) {
    return <PawPrint className={className} />
  }
  if (key === 'shield') {
    return <Shield className={className} />
  }
  if (key === 'sword') {
    return <Sword className={className} />
  }
  if (key === 'ship' || key === '🚢' || key === '⛵') {
    return <Ship className={className} />
  }
  if (key === 'flame' || key === '🔥') {
    return <Flame className={className} />
  }
  if (key === 'lightbulb' || key === '💡') {
    return <Lightbulb className={className} />
  }
  if (key === 'compass') {
    return <Compass className={className} />
  }
  if (key === 'trophy' || key === '🏆') {
    return <Trophy className={className} />
  }
  if (key === 'award') {
    return <Award className={className} />
  }
  if (key === 'wind' || key === '💨') {
    return <Wind className={className} />
  }
  if (key === 'zap' || key === '⚡') {
    return <Zap className={className} />
  }
  if (key === 'hand' || key === '👋' || key === '🙏') {
    return <Hand className={className} />
  }
  if (key === 'eye' || key === '👂') {
    return <Eye className={className} />
  }
  if (key === 'check') {
    return <CheckCircle2 className={className} />
  }

  return <Sparkles className={className} />
}
