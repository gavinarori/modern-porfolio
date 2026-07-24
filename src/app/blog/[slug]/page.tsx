import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react"
import type { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"

import { DATA } from "../../../data/portfolio-data"
import RevealOnView from "../../../components/reveal-on-view"
import { Badge } from "../../../components/ui/badge"
import BlogCard from "../../../components/mdx/blog-card"
import { mdxComponents } from "../../../components/mdx-components"
import {
  getAllSlugs,
  getPostBySlug,
  getAdjacentPosts,
  getRelatedPosts,
} from "../../../lib/blog"

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: `${post.title} — ${DATA.name}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
  }
}

function formatDate(dateStr: string) {
  if (!dateStr) return ""
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const { prev, next } = getAdjacentPosts(slug)
  const related = getRelatedPosts(slug, post.tags)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date,
    ...(post.cover ? { image: [post.cover] } : {}),
  }

  return (
    <main className="bg-neutral-950 text-white">
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="px-4 pt-4 pb-16 lg:pb-8">
        <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[420px_1fr]">
          {/* LEFT: sticky meta */}
          <aside className="lg:sticky lg:top-4 lg:h-fit">
            <RevealOnView
              as="div"
              intensity="hero"
              className="relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8"
              staggerChildren
            >
              <Link
                href="/blog"
                className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur transition-colors hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4" />
                All articles
              </Link>

              <div className="mb-6 flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20">
                  <Image src={DATA.avatarUrl} alt={post.author} fill sizes="40px" className="object-cover" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{post.author}</div>
                  <div className="text-xs text-white/50">Author</div>
                </div>
              </div>

              <div className="space-y-2 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.date)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </div>
              </div>

              {post.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} className="bg-white/10 text-white border-white/20 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </RevealOnView>
          </aside>

          {/* RIGHT: article */}
          <div className="space-y-4">
            <RevealOnView className="overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60">
              {post.cover && (
                <div className="relative aspect-[16/9] w-full">
                  <Image src={post.cover} alt={post.title} fill sizes="(max-width: 1024px) 100vw, 700px" className="object-cover" priority />
                </div>
              )}

              <div className="p-6 sm:p-10">
                <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                  {post.title}
                </h1>
                <p className="mt-4 text-lg text-white/60">{post.excerpt}</p>

                <div className="mt-10 border-t border-white/10 pt-10">
                  <MDXRemote
                    source={post.content}
                    components={mdxComponents}
                    options={{
                      mdxOptions: {
                        remarkPlugins: [remarkGfm],
                        rehypePlugins: [
                          rehypeSlug,
                          [rehypePrettyCode, { theme: "github-dark-dimmed", keepBackground: true }],
                        ],
                      },
                    }}
                  />
                </div>
              </div>
            </RevealOnView>

            {/* Prev / next */}
            {(prev || next) && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {prev && (
                  <Link
                    href={`/blog/${prev.slug}`}
                    className="group rounded-2xl border border-white/10 bg-neutral-900/60 p-5 transition-colors hover:border-white/20"
                  >
                    <div className="mb-1 flex items-center gap-1 text-xs text-white/50">
                      <ArrowLeft className="h-3 w-3" /> Older
                    </div>
                    <div className="font-semibold text-white/90 group-hover:text-white">{prev.title}</div>
                  </Link>
                )}
                {next && (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="group rounded-2xl border border-white/10 bg-neutral-900/60 p-5 text-right transition-colors hover:border-white/20 sm:col-start-2"
                  >
                    <div className="mb-1 flex items-center justify-end gap-1 text-xs text-white/50">
                      Newer <ArrowRight className="h-3 w-3" />
                    </div>
                    <div className="font-semibold text-white/90 group-hover:text-white">{next.title}</div>
                  </Link>
                )}
              </div>
            )}

            {/* Related */}
            {related.length > 0 && (
              <div>
                <p className="mb-3 mt-6 text-xs font-semibold tracking-widest text-white/40">
                  RELATED ARTICLES
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {related.map((p, idx) => (
                    <BlogCard key={p.slug} post={p} delay={idx * 0.05} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}