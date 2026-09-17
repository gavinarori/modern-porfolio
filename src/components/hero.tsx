"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowDown, ArrowRight, Play, BookOpen } from "lucide-react"
import { personal, featuredBlog, youtubeVideos, type YoutubeVideo } from "../data/portfolio-data"

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

function YoutubeCard({ video }: { video: YoutubeVideo }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-muted">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
          title={video.title}
          className="absolute inset-0 h-full w-full"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play: ${video.title}`}
          className="absolute inset-0 h-full w-full"
        >
          <Image
            src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-black shadow-lg transition-transform group-hover:scale-110">
              <Play className="h-6 w-6 fill-current pl-0.5" />
            </div>
          </div>
        </button>
      )}
    </div>
  )
}

function YoutubeShowcase({ videos }: { videos: YoutubeVideo[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {videos.map((video) => (
        <div key={video.videoId}>
          <YoutubeCard video={video} />
          <p className="mt-2.5 text-sm leading-snug text-foreground/80">{video.title}</p>
        </div>
      ))}
    </div>
  )
}

export function Hero() {
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
              href={`/blog/${featuredBlog.slug}`}
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

        {/* Latest videos */}
        {youtubeVideos.length > 0 && (
          <motion.div variants={item} className="mt-16">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm tracking-widest text-muted-foreground">LATEST VIDEOS</p>
              {personal.social.youtube && (
                <a
                  href={personal.social.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
                >
                  View channel <ArrowRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
            <YoutubeShowcase videos={youtubeVideos} />
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