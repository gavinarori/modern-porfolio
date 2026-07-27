"use client"

import { useMemo, useState } from "react"
import { Reveal, RevealGroup, RevealItem } from "./reveal"
import { ProjectCard } from "./project-card"
import { ProjectModal } from "./project-modal"
import { projects, type Project, type ProjectCategory } from "../data/portfolio-data"

const SECTIONS: { key: ProjectCategory; title: string; description: string }[] = [
  {
    key: "frontend",
    title: "Frontend / UI",
    description: "Interface-focused work — motion, polish, and getting the small details right.",
  },
  {
    key: "fullstack",
    title: "Full Stack",
    description: "End-to-end builds — schema through UI, owned from first commit to deploy.",
  },
  {
    key: "staff",
    title: "Systems & Architecture",
    description: "Design-level and systems work. This category is still growing.",
  },
]

export function ProjectsExplorer() {
  const [openProject, setOpenProject] = useState<Project | null>(null)

  const grouped = useMemo(
    () => SECTIONS.map((section) => ({ ...section, items: projects.filter((p) => p.category === section.key) })),
    []
  )

  return (
    <>
      <div className="space-y-20">
        {grouped.map((section) => (
          <div key={section.key}>
            <Reveal>
              <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">{section.title}</h2>
              <p className="mt-2 max-w-[60ch] text-foreground/70">{section.description}</p>
            </Reveal>

            {section.items.length === 0 ? (
              <Reveal
                delay={0.05}
                className="mt-6 rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground"
              >
                More {section.title.toLowerCase()} writeups are on the way.
              </Reveal>
            ) : (
              <RevealGroup className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {section.items.map((project) => (
                  <RevealItem key={project.id}>
                    <ProjectCard project={project} onOpen={setOpenProject} />
                  </RevealItem>
                ))}
              </RevealGroup>
            )}
          </div>
        ))}
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </>
  )
}