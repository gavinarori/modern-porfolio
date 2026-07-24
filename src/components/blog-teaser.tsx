import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal, RevealGroup, RevealItem } from "./reveal"

type TeaserPost = { title: string; excerpt: string; slug: string; readTime: string }

const DEFAULT_POSTS: TeaserPost[] = [
  {
    title: "Building Scalable Component Libraries",
    excerpt: "Lessons learned from creating reusable UI components that scale across multiple projects.",
    slug: "scalable-component-libraries",
    readTime: "6 min read",
  },
  {
    title: "Performance Optimization in Next.js",
    excerpt: "Practical techniques for improving Core Web Vitals and user experience.",
    slug: "nextjs-performance",
    readTime: "5 min read",
  },
  {
    title: "From Monolith to Microservices",
    excerpt: "Our journey refactoring a legacy application into maintainable microservices.",
    slug: "monolith-to-microservices",
    readTime: "7 min read",
  },
]

export function BlogTeaser({ posts = DEFAULT_POSTS }: { posts?: TeaserPost[] }) {
  if (posts.length === 0) return null

  return (
    <section className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-4 text-sm tracking-widest text-muted-foreground">WRITING</p>
            <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
              Notes from building.
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
          >
            All articles <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {posts.map((post) => (
            <RevealItem key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/30"
              >
                <h3 className="font-serif text-lg leading-snug">{post.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{post.excerpt}</p>
                <p className="mt-4 text-xs tracking-wide text-muted-foreground">{post.readTime}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}