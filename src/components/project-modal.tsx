"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
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
            className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-[6vh] z-50 mx-auto max-h-[88vh] max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card p-8 shadow-2xl sm:inset-x-auto sm:p-10"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="text-sm tracking-widest text-muted-foreground">CASE STUDY</p>
            <h3 className="mt-2 font-serif text-2xl sm:text-3xl">{project.title}</h3>

            <div className="mt-8 space-y-8">
              {sections.map((s) => (
                <div key={s.label}>
                  <h4 className="text-sm font-semibold tracking-wide">{s.label}</h4>
                  <p className="mt-2 leading-relaxed text-foreground/75">{s.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}