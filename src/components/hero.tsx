"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import { personal, projects, featuredBlog, type Project } from "../data/portfolio-data"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item: any = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const VISIBLE_COUNT = 3

function ProjectVideoShowcase({ projects: items }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [scrollIndex, setScrollIndex] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)
  const thumbRef = useRef<HTMLButtonElement>(null)

  const active = items[activeIndex] ?? items[0]

  const measure = (node: HTMLButtonElement | null) => {
    thumbRef.current = node
    if (node) setItemWidth(node.getBoundingClientRect().width + 10)
  }

  const canPrev = scrollIndex > 0
  const canNext = scrollIndex < items.length - VISIBLE_COUNT

  const prev = () => setScrollIndex((i) => Math.max(i - 1, 0))
  const next = () => setScrollIndex((i) => Math.min(i + 1, Math.max(items.length - VISIBLE_COUNT, 0)))

  return (
    <div>
      {/* Big featured video */}
      <Link
        href="/projects"
        className="group relative block aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted"
      >
        {active.video ? (
          <video
            key={active.id}
            src={active.video}
            poster={active.image}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          />
        ) : (
          <Image
            src={active.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
      </Link>

      {/* Carousel of remaining videos */}
      {items.length > 1 && (
        <div className="relative mt-3">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-3"
              animate={{ x: -scrollIndex * itemWidth }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {items.map((project, index) => (
                <button
                  key={project.id}
                  ref={index === 0 ? measure : undefined}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show project video ${index + 1}`}
                  className={`relative aspect-video w-[calc(33.333%-8px)] flex-none overflow-hidden rounded-lg border transition-opacity sm:w-[calc(33.333%-8px)] ${
                    index === activeIndex
                      ? "border-foreground/60 opacity-100"
                      : "border-border opacity-70 hover:opacity-100"
                  }`}
                >
                  <video
                    src={project.video}
                    poster={project.image}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                  />
                  
                </button>
              ))}
            </motion.div>
          </div>

          {canPrev && (
            <button
              type="button"
              onClick={prev}
              aria-label="Previous"
              className="absolute -left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          {canNext && (
            <button
              type="button"
              onClick={next}
              aria-label="Next"
              className="absolute -right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export function Hero() {
  const featuredProjects = projects

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-center px-6 pb-20 pt-32 sm:pt-40"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-3xl"
      >
        {/* Avatar + identity */}
        <motion.div variants={item} className="mb-8 flex items-center gap-5">
          {personal.avatarUrl && (
          <div
            role="img"
            aria-label="{personal.name}'s avatar"
            className="w-32 h-32 sm:w-36 sm:h-36 rounded-full flex-shrink-0 bg-no-repeat "
            style={{
              backgroundImage: `url(${personal.avatarUrl})`,
              backgroundSize: 'cover',           // Best for avatars
              backgroundPosition: 'center',      // Centers the face naturally
              backgroundRepeat: 'no-repeat',
            }}
          />
          )}
          <div>
            <p className="text-sm tracking-widest text-muted-foreground">
              {personal.location.toUpperCase()}
            </p>
            <h1 className="mt-2 font-serif text-3xl leading-[1.1] tracking-tight sm:text-5xl">
              {personal.name}
            </h1>
            <p className="mt-1 text-lg text-muted-foreground sm:text-xl">
              {personal.role} · {personal.subrole}
            </p>
          </div>
        </motion.div>

        <motion.p variants={item} className="max-w-[52ch] text-lg leading-relaxed text-foreground/80">
          {personal.tagline}
        </motion.p>

        {/* Story */}
        {personal.story && (
          <motion.div variants={item} className="mt-8 space-y-3 border-l-2 border-accent/60 pl-5">
            {personal.story.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-foreground/70">
                {paragraph}
              </p>
            ))}
          </motion.div>
        )}

        {/* Featured Blog */}
        {featuredBlog && (
          <motion.div variants={item} className="mt-10">
            <p className="mb-3 text-sm tracking-widest text-muted-foreground">FEATURED ARTICLE</p>
            <Link
              href={`/writing/${featuredBlog.slug}`}
              className="group block rounded-xl border border-border bg-card/50 p-6 transition-all hover:border-accent/60 hover:bg-card"
            >
              <div className="flex items-start gap-4">
                <div className="mt-0.5 rounded-lg bg-accent/10 p-2 text-accent">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold tracking-widest text-muted-foreground mb-1">
                    {featuredBlog.category}
                  </p>
                  <h3 className="font-serif text-xl leading-snug tracking-tight text-foreground group-hover:text-accent transition-colors">
                    {featuredBlog.title}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/70 line-clamp-2">
                    {featuredBlog.description}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{featuredBlog.readTime} min read</span>
                    <span className="text-foreground/20">•</span>
                    <span className="text-accent">Read article →</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Projects overview */}
        {featuredProjects.length > 0 && (
          <motion.div variants={item} className="mt-16">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm tracking-widest text-muted-foreground">SELECTED WORK</p>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1 text-sm font-medium underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
              >
                View all projects <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <ProjectVideoShowcase projects={featuredProjects} />
          </motion.div>
        )}
      </motion.div>

      <motion.a
        href="/about"
        aria-label="Continue to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.a>
    </section>
  )
}
