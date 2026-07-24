"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { personal } from "../data/portfolio-data"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item: any = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-center px-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-3xl"
      >
        <motion.p variants={item} className="mb-6 text-sm tracking-widest text-muted-foreground">
          {personal.location.toUpperCase()}
        </motion.p>

        <motion.h1
          variants={item}
          className="font-serif text-4xl leading-[1.1] tracking-tight sm:text-6xl"
        >
          {personal.name}
        </motion.h1>

        <motion.p variants={item} className="mt-3 text-xl text-muted-foreground sm:text-2xl">
          {personal.role} · {personal.subrole}
        </motion.p>

        <motion.p variants={item} className="mt-8 max-w-[52ch] text-lg leading-relaxed text-foreground/80">
          {personal.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#projects"
            className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            See my work
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            Get in touch
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.div>
      </motion.a>
    </section>
  )
}