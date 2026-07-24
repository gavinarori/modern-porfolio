 import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

//import { DATA } from "../../data/portfolio-data"
import {Reveal} from "../../components/reveal"
import AnimatedHeading from "../../components/animated-heading"
import DotGridShader from "../../components/DotGridShader"
import { Button } from "../../components/ui/button"
import BlogCard from "../../components/mdx/blog-card"
import BlogListClient from "./blog-list-client"
import { getAllPosts, getAllTags, getFeaturedPost } from "../../lib/blog"

export const metadata: Metadata = {
  title: `Blog — }`,
  description: "Articles on frontend architecture, performance, and building real products.",
}

export default function BlogIndexPage() {
  const posts = getAllPosts()
  const tags = getAllTags()
  const featured = getFeaturedPost()
  const rest = posts.filter((p) => p.slug !== featured?.slug)

  return (
    <main className="bg-neutral-950 text-white">
      <section className="px-4 pt-4 pb-16 lg:pb-8">
        <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[420px_1fr]">
          {/* LEFT: sticky identity */}
          <aside className="lg:sticky lg:top-4 lg:h-[calc(100svh-2rem)]">
            <Reveal
              as="div"
             
              className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8"
              
            >
              <div className="pointer-events-none absolute inset-0 opacity-5 mix-blend-soft-light">
                <DotGridShader />
              </div>

              <div>
               

                <AnimatedHeading
                  className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl"
                  lines={["Writing", "Notes & articles"]}
                />

                <p className="mt-4 max-w-[42ch] text-lg text-white/70">
                  Thoughts on frontend architecture, performance, and shipping real products —
                  written up as I build.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button asChild size="lg" className="rounded-full">
                    <Link href="/">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Home
                    </Link>
                  </Button>
                </div>

                <div className="mt-10">
                  <p className="mb-3 text-xs font-semibold tracking-widest text-white/50">
                    {posts.length} {posts.length === 1 ? "ARTICLE" : "ARTICLES"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </aside>

          {/* RIGHT: featured + grid */}
          <div className="space-y-4">
            {featured && (
              <div>
                <p className="mb-3 text-xs font-semibold tracking-widest text-white/40">FEATURED</p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <BlogCard post={featured} featured />
                </div>
              </div>
            )}

            <div>
              {rest.length > 0 && (
                <p className="mb-3 text-xs font-semibold tracking-widest text-white/40">
                  {featured ? "MORE ARTICLES" : "ALL ARTICLES"}
                </p>
              )}
              <BlogListClient posts={rest.length > 0 ? rest : posts} tags={tags} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}