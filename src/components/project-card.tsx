import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from 'lucide-react'
import { Badge } from "../components/ui/badge"
import { cn } from "../lib//utils"
import RevealOnView from "./reveal-on-view"
import type { LucideProps } from "lucide-react"
import type React from "react"

type ProjectLink = {
  type: string
  href: string
  icon?: React.ComponentType<LucideProps>
}

type Props = {
  title?: string
  subtitle?: string
  imageSrc?: string
  videoSrc?: string
  tags?: readonly string[]
  href?: string
  priority?: boolean
  gradientFrom?: string
  gradientTo?: string
  description?: string
  technologies?: readonly string[]
  links?: readonly ProjectLink[]
  imageContainerClassName?: string
  containerClassName?: string
  revealDelay?: number
}

// Server Component (no client hooks)
export default function ProjectCard({
  title = "Project title",
  subtitle = "Project subtitle",
  imageSrc = "/placeholder.svg?height=720&width=1280",
  videoSrc,
  tags = ["Design", "Web"],
  href = "#",
  priority = false,
  gradientFrom = "#0f172a",
  gradientTo = "#6d28d9",
  description,
  technologies,
  links = [],
  imageContainerClassName,
  containerClassName,
  revealDelay = 0,
}: Props) {
  return (
    <article className={cn("group relative", containerClassName)}>
      <RevealOnView
        delay={revealDelay}
        className="rounded-3xl border border-white/10 p-1 shadow-[0_10px_60px_-10px_rgba(0,0,0,0.6)] lg:h-full"
        style={{
          backgroundImage: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        <div className="relative overflow-hidden rounded-[1.35rem] bg-black lg:h-full">
          {/* Media */}
          <div className={cn("relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-full", imageContainerClassName)}>
            {videoSrc ? (
              <video
                src={videoSrc}
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster={imageSrc}
              />
            ) : (
              <Image
                src={imageSrc || "/placeholder.svg"}
                alt={title}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                priority={priority}
                className="object-cover"
              />
            )}
            {/* Subtle vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/30" />
          </div>

          {/* Top-left tags */}
          <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
            {(technologies ?? tags).map((t) => (
              <Badge
                key={t}
                variant="secondary"
                className="pointer-events-auto bg-black/50 text-white border-white/20 backdrop-blur-sm"
              >
                {t}
              </Badge>
            ))}
          </div>

          {/* Bottom content */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold sm:text-xl">{title}</h3>
                {subtitle && <p className="text-sm text-white/70">{subtitle}</p>}
                {description && <p className="mt-1 line-clamp-2 text-sm text-white/80">{description}</p>}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {links && links.length > 0 ? (
                  links.map((l) => (
                    <Link
                      key={`${l.type}-${l.href}`}
                      href={l.href || href}
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-medium backdrop-blur transition-colors hover:bg-white/20"
                      aria-label={`${l.type} for ${title}`}
                    >
                      {l.icon ? <l.icon className="h-3 w-3" /> : <ArrowRight className="h-3 w-3" />}
                      {l.type}
                    </Link>
                  ))
                ) : (
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-medium backdrop-blur transition-colors hover:bg-white/20"
                    aria-label={`Open link: ${title}`}
                  >
                    Visit
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </RevealOnView>
    </article>
  )
}
