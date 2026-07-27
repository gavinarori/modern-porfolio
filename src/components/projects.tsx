"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Reveal } from "./reveal"
import { ProjectCard } from "./project-card"
import { ProjectModal } from "./project-modal"
import { projects, type Project, type ProjectCategory } from "../data/portfolio-data"

const FILTERS: { key: ProjectCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend / UI" },
  { key: "fullstack", label: "Full Stack" },
  { key: "staff", label: "Systems & Architecture" },
]

export function Projects() {
  const [active, setActive] = useState<ProjectCategory | "all">("all")
  const [openProject, setOpenProject] = useState<Project | null>(null)

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active]
  )

  return (
    <section id="projects" className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <Reveal className="max-w-3xl">
          <p className="mb-4 text-sm tracking-widest text-muted-foreground">PROJECTS</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            Things I've shipped, and the tradeoffs behind them.
          </h2>
        </Reveal>

        <Reveal delay={0.05} className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === f.key ? "text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === f.key && (
                <motion.span
                  layoutId="active-filter-pill"
                  className="absolute inset-0 rounded-full bg-foreground"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative">{f.label}</span>
            </button>
          ))}
        </Reveal>

        <motion.div layout className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={setOpenProject} />
            ))}
          </AnimatePresence>
        </motion.div>

        {active === "staff" && filtered.length <= 1 && (
          <p className="mt-6 text-sm text-muted-foreground">
            More systems-architecture writeups are on the way — this category is still growing.
          </p>
        )}
      </div>

      <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  )
}