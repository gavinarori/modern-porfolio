import type { Metadata } from "next"
import { Reveal } from "../../components/reveal"
import { DocsProjectCard } from "../../components/docs/docs-project-card"
import { docsProjects } from "../../data/docs-data"
import { personal } from "../../data/portfolio-data"

export const metadata: Metadata = {
  title: `API Docs — ${personal.name}`,
  description: "Reference docs for the backend APIs behind these projects — endpoints, auth, and working code samples.",
}

export default function DocsIndexPage() {
  return (
    <div className="px-6 pb-28 pt-32 sm:pt-40">
      <div className="mx-auto max-w-5xl">
        <Reveal className="max-w-3xl">
          <p className="mb-4 text-sm tracking-widest text-muted-foreground">API DOCS</p>
          <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            Reference docs for the backends I&apos;ve built.
          </h1>
          <p className="mt-4 max-w-[60ch] text-lg text-foreground/70">
            Endpoints, auth, request and response shapes, and working code samples in three
            languages — pick a project to dig in.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {docsProjects.map((project, i) => (
            <DocsProjectCard key={project.slug} project={project} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </div>
  )
}