import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Reveal } from "../reveal"
import type { DocsProject } from "../../data/docs-data"

export function DocsProjectCard({ project, delay = 0 }: { project: DocsProject; delay?: number }) {
  const endpointCount = project.groups.reduce((total, group) => total + group.endpoints.length, 0)

  return (
    <Reveal delay={delay}>
      <Link
        href={`/docs/${project.slug}`}
        className="group block rounded-2xl border border-border bg-card p-6 transition-colors hover:border-foreground/30 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl tracking-tight text-foreground">{project.name}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>
          </div>
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground" />
        </div>

        <p className="mt-4 max-w-[55ch] text-sm leading-relaxed text-foreground/70">{project.description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span className="font-mono">{project.baseUrl}</span>
          <span>
            {endpointCount} endpoint{endpointCount === 1 ? "" : "s"}
          </span>
          <span>{project.auth.type} auth</span>
        </div>
      </Link>
    </Reveal>
  )
}