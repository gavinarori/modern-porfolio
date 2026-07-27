import type { Metadata } from "next"
import { Reveal } from "../../components/reveal"
import { ExperienceReveal } from "../../components/experience-reveal"
import { personal } from "../../data/portfolio-data"

export const metadata: Metadata = {
  title: `Experience — ${personal.name}`,
  description: "Where I've worked, and what I bring to a team.",
}

export default function ExperiencePage() {
  return (
    <div className="px-6 pb-28 pt-32 sm:pt-40">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="mb-4 text-sm tracking-widest text-muted-foreground">EXPERIENCE</p>
          <h1 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            Where I&apos;ve built things.
          </h1>
        </Reveal>

        <div className="mt-4">
          <ExperienceReveal />
        </div>
      </div>
    </div>
  )
}