
"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowUpRight, Github } from "lucide-react"
import { VideoPlayer } from "./video-player"
import type { Project } from "../data/portfolio-data"

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (project) {
      document.addEventListener("keydown", onKey)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [project, onClose])

  const sections = project?.caseStudy
    ? [
        { label: "The problem", body: project.caseStudy.problem },
        { label: "The approach", body: project.caseStudy.approach },
        { label: "The impact", body: project.caseStudy.impact },
        { label: "What I'd do differently", body: project.caseStudy.learnings },
      ]
    : []

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-[4vh] z-50 mx-auto flex max-h-[92vh] max-w-3xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:inset-x-auto"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition-colors hover:bg-black/70"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="overflow-y-auto">
              {project.video ? (
                <VideoPlayer src={project.video} poster={project.image} title={project.title} />
              ) : (
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <Image src={project.image} alt={project.title} fill sizes="768px" className="object-cover" />
                </div>
              )}

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mt-3 font-serif text-2xl sm:text-3xl">{project.title}</h3>
                <p className="mt-3 leading-relaxed text-foreground/75">{project.description}</p>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
                    >
                      Visit live <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                    >
                      <Github className="h-3.5 w-3.5" /> Source
                    </a>
                  )}
                </div>

                {sections.length > 0 && (
                  <div className="mt-8 space-y-8 border-t border-border pt-8">
                    <p className="text-sm tracking-widest text-muted-foreground">CASE STUDY</p>
                    {sections.map((s) => (
                      <div key={s.label}>
                        <h4 className="text-sm font-semibold tracking-wide">{s.label}</h4>
                        <p className="mt-2 leading-relaxed text-foreground/75">{s.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

