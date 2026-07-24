import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import RevealOnView from "../reveal"
import { Badge } from "../ui/badge"
import type { PostMeta } from "../../lib/blog"

function formatDate(dateStr: string) {
  if (!dateStr) return ""
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export default function BlogCard({
  post,
  featured = false,
  delay = 0,
}: {
  post: PostMeta
  featured?: boolean
  delay?: number
}) {
  return (
    <RevealOnView
      delay={delay}
      className={`group rounded-3xl border border-white/10 bg-neutral-900/60 p-0 overflow-hidden transition-colors hover:border-white/20 ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className={`grid gap-0 ${featured ? "sm:grid-cols-2" : "grid-cols-1"}`}>
          <div
            className={`relative overflow-hidden bg-white/5 ${
              featured ? "aspect-[4/3] sm:aspect-auto" : "aspect-[16/9]"
            }`}
          >
            {post.cover ? (
              <Image
                src={post.cover}
                alt={post.title}
                fill
                sizes={featured ? "(max-width: 640px) 100vw, 50vw" : "(max-width: 640px) 100vw, 33vw"}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-white/20">
                <span className="text-sm font-semibold tracking-widest">ARTICLE</span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between p-5 sm:p-6">
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} className="bg-white/10 text-white border-white/20 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h3
                className={`font-bold tracking-tight text-white ${
                  featured ? "text-xl sm:text-2xl" : "text-lg"
                }`}
              >
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-white/60">{post.excerpt}</p>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-white/50">
              <span>
                {formatDate(post.date)} · {post.readTime}
              </span>
              <span className="inline-flex items-center gap-1 font-medium text-white/80 transition-transform group-hover:translate-x-1">
                Read
                <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </RevealOnView>
  )
}