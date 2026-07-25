import type { Metadata } from "next"
import { Reveal } from "../../components/reveal"
import { ProjectsExplorer } from "../../components/projects-explorer"
import { personal } from "../../data/portfolio-data"

export const metadata: Metadata = {
  title: `Projects — ${personal.name}`,
  description: "Frontend, full-stack, and systems work — with the tradeoffs behind each one.",
}

export default function ProjectsPage() {
  return (
    <div className="px-6 pb-28 pt-32 sm:pt-40">
      <div className="mx-auto max-w-5xl">
        <Reveal className="max-w-3xl">
          <p className="mb-4 text-sm tracking-widest text-muted-foreground">PROJECTS</p>
          <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            Things I&apos;ve shipped, and the tradeoffs behind them.
          </h1>
          <p className="mt-4 max-w-[60ch] text-lg text-foreground/70">
            Grouped by the kind of work — frontend polish, full-stack ownership, and systems-level
            design. Open any project for the full walkthrough and a look at the working demo.
          </p>
        </Reveal>

        <div className="mt-16">
          <ProjectsExplorer />
        </div>
      </div>
    </div>
  )
}