import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Github } from "lucide-react"

import { Reveal } from "../../../components/reveal"
import { DocsSidebar } from "../../../components/docs/docs-sidebar"
import { EndpointSection } from "../../../components/docs/endpoint-section"
import { ArchitectureSection } from "../../../components/docs/architecture-section"
import { SetupSteps } from "../../../components/docs/setup-steps"
import { docsProjects, getDocsProject } from "../../../data/docs-data"
import { personal } from "../../../data/portfolio-data"

export function generateStaticParams() {
  return docsProjects.map((project) => ({ project: project.slug }))
}

export function generateMetadata({ params }: { params: { project: string } }): Metadata {
  const project = getDocsProject(params.project)
  if (!project) return {}
  return {
    title: `${project.name} API Docs — ${personal.name}`,
    description: project.tagline,
  }
}

export default function ProjectDocsPage({ params }: { params: { project: string } }) {
  const project = getDocsProject(params.project)
  if (!project) notFound()

  return (
    <div className="px-6 pb-28 pt-32 sm:pt-40">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All docs
          </Link>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-sm text-foreground/80 transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" />
              View source
            </a>
          )}
        </div>

        <Reveal className="mt-6 max-w-3xl">
          <p className="mb-4 text-sm tracking-widest text-muted-foreground">{project.tagline.toUpperCase()}</p>
          <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">{project.name}</h1>
          <p className="mt-4 max-w-[60ch] text-lg text-foreground/70">{project.description}</p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <DocsSidebar project={project} />
          </aside>

          <main className="lg:col-span-9">
            <section id="quickstart" className="scroll-mt-24 border-b border-border pb-12">
              <h2 className="font-serif text-2xl tracking-tight text-foreground">Base URL &amp; authentication</h2>
              <p className="mt-3 max-w-[60ch] leading-relaxed text-foreground/70">{project.auth.description}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-border p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Base URL</p>
                  <code className="mt-1.5 block break-all font-mono text-sm text-foreground">{project.baseUrl}</code>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Every request needs</p>
                  <code className="mt-1.5 block break-all font-mono text-sm text-foreground">{project.auth.header}</code>
                </div>
              </div>
            </section>

            {project.architecture && <ArchitectureSection architecture={project.architecture} />}
            {project.localSetup && <SetupSteps localSetup={project.localSetup} />}

            {project.groups.map((group) => (
              <div key={group.name} className="border-b border-border pb-2 pt-12 first:pt-12">
                <h2 className="font-serif text-2xl tracking-tight text-foreground">{group.name}</h2>
                {group.description && (
                  <p className="mt-2 max-w-[60ch] text-foreground/70">{group.description}</p>
                )}
                <div className="mt-2">
                  {group.endpoints.map((endpoint) => (
                    <EndpointSection key={endpoint.id} endpoint={endpoint} />
                  ))}
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  )
}