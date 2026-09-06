import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/utils/cn'

type MarkdownRendererProps = {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={cn('markdown-body text-sm text-indigo-950 leading-relaxed', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...props }) => (
            <h1 className="font-serif text-2xl font-bold text-indigo-950 mt-4 mb-2 tracking-tight" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="font-serif text-xl font-bold text-indigo-950 mt-4 mb-2 tracking-tight" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="font-serif text-lg font-bold text-purple-900 mt-3.5 mb-1.5 tracking-tight" {...props} />
          ),
          h4: ({ ...props }) => (
            <h4 className="font-serif text-base font-bold text-indigo-950 mt-3 mb-1" {...props} />
          ),
          p: ({ ...props }) => (
            <p className="mb-3 leading-relaxed text-indigo-950/90" {...props} />
          ),
          strong: ({ ...props }) => (
            <strong className="font-bold text-indigo-950" {...props} />
          ),
          em: ({ ...props }) => (
            <em className="italic text-indigo-900" {...props} />
          ),
          blockquote: ({ ...props }) => (
            <blockquote
              className="my-3 border-l-4 border-purple-600 bg-purple-50/70 p-3.5 pl-4 rounded-r-2xl font-serif italic text-indigo-900 text-sm shadow-2xs"
              {...props}
            />
          ),
          ul: ({ ...props }) => (
            <ul className="my-2.5 ml-4 list-disc space-y-1 text-indigo-950/90 pl-1" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="my-2.5 ml-4 list-decimal space-y-1 text-indigo-950/90 pl-1" {...props} />
          ),
          li: ({ ...props }) => (
            <li className="leading-relaxed" {...props} />
          ),
          // Tables matching user's specific sample
          table: ({ ...props }) => (
            <div className="my-4 overflow-x-auto rounded-2xl border border-purple-100 shadow-2xs">
              <table className="min-w-full divide-y divide-purple-100 text-left text-xs sm:text-sm" {...props} />
            </div>
          ),
          thead: ({ ...props }) => (
            <thead className="bg-purple-100/70 font-bold text-purple-950" {...props} />
          ),
          tbody: ({ ...props }) => (
            <tbody className="divide-y divide-purple-50 bg-white" {...props} />
          ),
          tr: ({ ...props }) => (
            <tr className="transition-colors hover:bg-purple-50/40" {...props} />
          ),
          th: ({ ...props }) => (
            <th className="px-4 py-2.5 font-bold uppercase tracking-wider text-[11px] text-purple-900" {...props} />
          ),
          td: ({ ...props }) => (
            <td className="px-4 py-2.5 text-indigo-950 leading-relaxed align-top" {...props} />
          ),
          code: ({ ...props }) => (
            <code className="rounded-md bg-purple-50 px-1.5 py-0.5 text-xs font-mono text-purple-800" {...props} />
          ),
          hr: () => <hr className="my-4 border-purple-100" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
