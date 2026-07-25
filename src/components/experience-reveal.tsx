"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ImagesBadge } from "./ui/images-badge"
import { Reveal, RevealGroup, RevealItem } from "./reveal"
import { experience, skills } from "../data/portfolio-data"

function initialsAvatar(initials: string, bg: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="${bg}"/><text x="50%" y="53%" font-family="ui-sans-serif, system-ui" font-size="30" fill="white" text-anchor="middle" dominant-baseline="middle">${initials}</text></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const PREVIEW_IMAGES = [initialsAvatar("Az", "#0f172a"), initialsAvatar("Px", "#7c3aed"), initialsAvatar("Ad", "#0369a1")]

export function ExperienceReveal() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <AnimatePresence mode="wait" initial={false}>
        {!open ? (
          <motion.div
            key="trigger"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex min-h-[40vh] flex-col items-center justify-center gap-6 text-center"
          >
            <button type="button" onClick={() => setOpen(true)} className="group">
              <ImagesBadge
                text="Click to reveal my experience"
                images={PREVIEW_IMAGES}
                className="rounded-full border border-border bg-card px-5 py-3 shadow-sm transition-colors group-hover:border-foreground/30"
              />
            </button>
            <p className="max-w-[42ch] text-sm text-muted-foreground">
              Four roles, one throughline: ship real things, keep learning the layer underneath.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Experience timeline */}
            <div className="space-y-14">
              {experience.map((role, idx) => (
                <Reveal key={role.company} delay={idx * 0.05} className="relative pl-8 sm:pl-12">
                  <span className="absolute left-0 top-1.5 h-[15px] w-[15px] -translate-x-[calc(50%-0.5px)] rounded-full border-2 border-background bg-foreground sm:left-[7px]" />
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-serif text-xl sm:text-2xl">{role.company}</h3>
                    <span className="text-xs tracking-widest text-muted-foreground">
                      {role.start} — {role.end}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">{role.role}</p>
                  <ul className="mt-4 space-y-2">
                    {role.points.map((point, i) => (
                      <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-foreground/75">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            {/* Skills */}
            <div className="mt-20">
              <Reveal>
                <p className="mb-4 text-sm tracking-widest text-muted-foreground">SKILLS & EXPERTISE</p>
                <h2 className="font-serif text-2xl tracking-tight sm:text-3xl">What I bring to a team.</h2>
              </Reveal>

              <RevealGroup className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {skills.map((group) => (
                  <RevealItem key={group.group} className="rounded-2xl border border-border bg-card p-6">
                    <h3 className="font-serif text-lg">{group.group}</h3>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground/80"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
              >
                Collapse
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}