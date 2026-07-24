"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight, Github } from "lucide-react"
import type { Project } from "../data/portfolio-data"

export function ProjectCard({
  project,
  onReadCaseStudy,
}: {
  project: Project
  onReadCaseStudy: (project: Project) => void
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group overflow-hidden rounded-2xl border border-border bg-card"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
        {project.video ? (
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
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>

      <div className="p-6">
        <h3 className="font-serif text-xl">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/70">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          {project.caseStudy && (
            <button
              type="button"
              onClick={() => onReadCaseStudy(project)}
              className="text-sm font-medium underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground"
            >
              Read case study
            </button>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Live <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-3.5 w-3.5" /> Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}