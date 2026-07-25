import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react"
import type { Metadata } from "next"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import rehypePrettyCode from "rehype-pretty-code"

import { Reveal } from "../../../components/reveal"
import BlogCard from "../../../components/mdx/blog-card"
import { mdxComponents } from "../../../components/mdx-components"
import { personal } from "../../../data/portfolio-data"
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
    title: `${post.title} — ${personal.name}`,
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
    <article className="px-6 pb-28 pt-32 sm:pt-40">
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-2xl">
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All articles
          </Link>

          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="mt-5 font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-foreground/70">{post.excerpt}</p>

          <div className="mt-6 flex items-center gap-4 border-y border-border py-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="relative h-7 w-7 overflow-hidden rounded-full border border-border">
                <Image src={personal.avatarUrl} alt={post.author} fill sizes="28px" className="object-cover" />
              </div>
              <span className="font-medium text-foreground/80">{post.author}</span>
            </div>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>
        </Reveal>

        {post.cover && (
          <Reveal delay={0.05} className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border">
            <Image src={post.cover} alt={post.title} fill sizes="(max-width: 768px) 100vw, 672px" className="object-cover" priority />
          </Reveal>
        )}

        <Reveal delay={0.1} className="mt-10">
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
        </Reveal>

        {/* Prev / next */}
        {(prev || next) && (
          <div className="mt-16 grid grid-cols-1 gap-4 border-t border-border pt-10 sm:grid-cols-2">
            {prev && (
              <Link
                href={`/blog/${prev.slug}`}
                className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/30"
              >
                <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowLeft className="h-3 w-3" /> Older
                </div>
                <div className="font-medium text-foreground/90 group-hover:text-foreground">{prev.title}</div>
              </Link>
            )}
            {next && (
              <Link
                href={`/blog/${next.slug}`}
                className="group rounded-2xl border border-border bg-card p-5 text-right transition-colors hover:border-foreground/30 sm:col-start-2"
              >
                <div className="mb-1 flex items-center justify-end gap-1 text-xs text-muted-foreground">
                  Newer <ArrowRight className="h-3 w-3" />
                </div>
                <div className="font-medium text-foreground/90 group-hover:text-foreground">{next.title}</div>
              </Link>
            )}
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-14">
            <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground">
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
    </article>
  )
}