import type { Metadata } from "next"

import { Reveal } from "../../components/reveal"
import BlogCard from "../../components/mdx/blog-card"
import BlogListClient from "./blog-list-client"
import { getAllPosts, getAllTags, getFeaturedPost } from "../../lib/blog"
import { personal } from "../../data/portfolio-data"

export const metadata: Metadata = {
  title: `Writing — ${personal.name}`,
  description: "Notes on frontend work, performance, and shipping real products.",
}

export default function BlogIndexPage() {
  const posts = getAllPosts()
  const featured = getFeaturedPost()
  const tags = getAllTags()
  const rest = posts.filter((p) => p.slug !== featured?.slug)

  return (
    <div className="px-6 pb-28 pt-32 sm:pt-40">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="mb-4 text-sm tracking-widest text-muted-foreground">WRITING</p>
          <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            Notes from building.
          </h1>
          <p className="mt-4 max-w-[56ch] text-lg text-foreground/70">
            Short, practical write-ups on frontend work, performance, and the tradeoffs behind
            what I ship — written as I go, not after the fact.
          </p>
        </Reveal>

        {featured && (
          <div className="mt-14">
            <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground">
              FEATURED
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <BlogCard post={featured} featured />
            </div>
          </div>
        )}

        <div className="mt-14">
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card p-10 text-center text-muted-foreground">
              No articles published yet — check back soon.
            </div>
          ) : (
            <>
              {rest.length > 0 && (
                <p className="mb-3 text-xs font-semibold tracking-widest text-muted-foreground">
                  {featured ? "MORE ARTICLES" : "ALL ARTICLES"}
                </p>
              )}
              <BlogListClient posts={rest.length > 0 ? rest : posts} tags={tags} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}