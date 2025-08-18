import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "../components/ui/button"
import DotGridShader from "../components/DotGridShader"

import ProjectCard from "../components/project-card"
import AnimatedHeading from "../components/animated-heading"
import RevealOnView from "../components/reveal-on-view"
import { DATA } from "../data/site-data"

export default function Page() {
  const projects = DATA.projects

  return (
    <main className="bg-neutral-950 text-white">
      {/* HERO: full-viewport row. Left is sticky; right scrolls internally. */}
      <section className="px-4 pt-4 pb-16 lg:pb-4">
        <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[420px_1fr]">
          {/* LEFT: sticky and full height, no cut off */}
          <aside className="lg:sticky lg:top-4 lg:h-[calc(100svh-2rem)]">
            <RevealOnView
              as="div"
              intensity="hero"
              className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8"
              staggerChildren
            >
              {/* Texture background */}
              <div className="pointer-events-none absolute inset-0 opacity-5 mix-blend-soft-light">
                <DotGridShader />
              </div>
              <div>
                {/* Header */}
                <div className="mb-8 flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20">
                    <Image src={DATA.avatarUrl} alt={DATA.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <div className="text-2xl font-extrabold tracking-tight">{DATA.name}</div>
                  <div className="h-2 w-2 rounded-full bg-white/60" aria-hidden="true" />
                </div>

                {/* Headline */}
                <AnimatedHeading
                  className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl"
                  lines={[DATA.name, "Software Engineer"]}
                />

                <p className="mt-4 max-w-[42ch] text-lg text-white/70">{DATA.summary}</p>

                {/* CTAs + Socials */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button asChild size="lg" className="rounded-full">
                    <Link href={`/about`}>
                      About me
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  {Object.values(DATA.contact.social).map((s) => (
                    <Link
                      key={s.name}
                      href={s.url}
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-white/90 backdrop-blur transition-colors hover:bg-white/20"
                      aria-label={s.name}
                    >
                      {s.icon ? <s.icon className="h-3 w-3" /> : null}
                      {s.name}
                    </Link>
                  ))}
                </div>

                {/* Companies */}
                <div className="mt-10">
                  <p className="mb-3 text-xs font-semibold tracking-widest text-white/50">COMPANIES I&apos;VE WORKED WITH</p>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-2xl font-black text-white/25 sm:grid-cols-3">
                    {DATA.work.map((w) => (
                      <li key={w.company}>{w.company}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealOnView>
          </aside>

          {/* RIGHT: simplified, no internal card or horizontal carousel */}
          <div className="space-y-4">
            {projects.map((p, idx) => (
              <ProjectCard
                key={p.title}
                title={p.title}
                subtitle={p.dates}
                imageSrc={p.image}
                videoSrc={p.video}
                technologies={p.technologies as ReadonlyArray<string>}
                description={p.description}
                links={p.links as ReadonlyArray<any>}
                href={p.href}
                imageContainerClassName="lg:h-full"
                containerClassName="lg:h-[calc(100svh-2rem)]"
                revealDelay={idx * 0.06}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
