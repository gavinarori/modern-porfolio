"use client"

import { useMemo, useState } from "react"
import BlogCard from "../../components/mdx/blog-card"
import type { PostMeta } from "../../lib/blog"

export default function BlogListClient({
  posts,
  tags,
}: {
  posts: PostMeta[]
  tags: string[]
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = useMemo(() => {
    if (!activeTag) return posts
    return posts.filter((p) => p.tags.includes(activeTag))
  }, [posts, activeTag])

  return (
    <div>
      {tags.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTag === null
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-transparent text-muted-foreground hover:bg-muted"
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              type="button"
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                activeTag === tag
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-transparent text-muted-foreground hover:bg-muted"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
          No articles tagged &ldquo;{activeTag}&rdquo; yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((post, idx) => (
            <BlogCard key={post.slug} post={post} delay={idx * 0.05} />
          ))}
        </div>
      )}
    </div>
  )
}