"use client"

import { useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { Reveal } from "./reveal"
import { experience } from "../data/portfolio-data"

export function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="experience" className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="mb-4 text-sm tracking-widest text-muted-foreground">EXPERIENCE</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            Where I&apos;ve built things.
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-16">
          <div className="absolute left-0 top-0 h-full w-px bg-border sm:left-[7px]" />
          <motion.div
            style={{ scaleY }}
            className="absolute left-0 top-0 h-full w-px origin-top bg-foreground sm:left-[7px]"
          />

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
        </div>
      </div>
    </section>
  )
}