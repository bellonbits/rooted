export function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="font-serif text-3xl font-semibold text-forest-900">{title}</h1>
      <p className="mt-3 text-ink-500">{description}</p>
    </div>
  )
}
