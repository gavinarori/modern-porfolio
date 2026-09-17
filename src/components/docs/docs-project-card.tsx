"use client"

import Link from "next/link"
import { ArrowUpRight, Github } from "lucide-react"
import { Reveal } from "../reveal"
import type { DocsProject } from "../../data/docs-data"

export function DocsProjectCard({ project, delay = 0 }: { project: DocsProject; delay?: number }) {
  const endpointCount = project.groups.reduce((total, group) => total + group.endpoints.length, 0)

  // Keep the card description short — the long architecture write-up lives on the detail page
  const shortDescription =
    project.description.length > 180
      ? project.description.slice(0, 180).trimEnd() + "…"
      : project.description

  return (
    <Reveal delay={delay}>
      <div className="group relative rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/30 sm:p-8">
        <Link href={`/docs/${project.slug}`} className="block">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl tracking-tight text-foreground">{project.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>
            </div>
            <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground" />
          </div>

          <p className="mt-4 max-w-[55ch] text-sm leading-relaxed text-foreground/70">
            {shortDescription}
          </p>
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span className="font-mono">{project.baseUrl}</span>
          <span>
            {endpointCount} endpoint{endpointCount === 1 ? "" : "s"}
          </span>
          <span>{project.auth.type} auth</span>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 inline-flex items-center gap-1 transition-colors hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" />
              Source
            </a>
          )}
        </div>
      </div>
    </Reveal>
  )
}