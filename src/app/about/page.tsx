import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { DATA } from "../../data/site-data"
import RevealOnView from "../../components/reveal-on-view"
import AnimatedHeading from "../../components/animated-heading"
import DotGridShader from "../../components/DotGridShader"
import { Button } from "../../components/ui/button"

export default function AboutPage() {
  return (
    <main className="bg-neutral-950 text-white">
      <section className="px-4 pt-4 pb-16 lg:pb-8">
        <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[420px_1fr]">
          {/* LEFT: photo / hero */}
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

                <AnimatedHeading
                  className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl"
                  lines={[DATA.name, "Software Engineer"]}
                />

                <p className="mt-4 max-w-[52ch] text-lg text-white/70">{DATA.description}</p>

                {/* Contact + location */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button asChild size="lg" className="rounded-full">
                    <Link href={`/`}>
                    <ArrowLeft className="ml-2 h-4 w-4" />
                      Home
                    </Link>
                  </Button>
                  <Link
                    href={DATA.locationLink}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-white/90 backdrop-blur transition-colors hover:bg-white/20"
                  >
                    {DATA.location}
                  </Link>
                </div>

                {/* Socials */}
                <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {Object.values(DATA.contact.social).map((s) => (
                    <Link
                      key={s.name}
                      href={s.url}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                    >
                      <span className="flex items-center gap-2">
                        {s.icon ? <s.icon className="h-4 w-4" /> : null}
                        {s.name}
                      </span>
                      <ArrowRight className="h-3 w-3 opacity-60" />
                    </Link>
                  ))}
                </div>

                {/* Clients / Companies */}
                <div className="mt-10">
                  <p className="mb-3 text-xs font-semibold tracking-widest text-white/50">CLIENTS</p>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-2xl font-black text-white/25 sm:grid-cols-3">
                    {DATA.work.map((w) => (
                      <li key={w.company}>{w.company}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealOnView>
          </aside>

          {/* RIGHT: details */}
          <div className="space-y-4">
            {/* About */}
            <RevealOnView className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold">About</h2>
              <p className="mt-4 text-white/80">{DATA.summary}</p>
            </RevealOnView>

            {/* Education */}
            <RevealOnView className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8">
              <h3 className="text-xl font-semibold">Education</h3>
              <ul className="mt-4 space-y-4">
                {DATA.education.map((e) => (
                  <li key={e.school} className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-base font-medium">{e.school}</div>
                      <div className="text-sm text-white/70">{e.degree}</div>
                    </div>
                    <div className="text-sm text-white/60">
                      {e.start} — {e.end}
                    </div>
                  </li>
                ))}
              </ul>
            </RevealOnView>

            {/* Certifications (Accordion previews) */}
            <RevealOnView className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8">
              <h3 className="text-xl font-semibold">Certifications</h3>
              <ul className="mt-4 space-y-3">
                {DATA.certificates.map((c) => {
                  if (!c) return null
                  return (
                    <li key={c.title} className="rounded-xl border border-white/10 bg-white/5">
                      <details className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-3">
                          <div className="flex items-center gap-3">
                            <div className="relative h-8 w-8 overflow-hidden rounded-md bg-white">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={c.logoUrl} alt={c.provider} className="h-full w-full object-contain" />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{c.title}</div>
                              <div className="text-xs text-white/70">{c.provider}</div>
                            </div>
                          </div>
                          <span className="text-xs text-white/70">Preview</span>
                        </summary>
                        <div className="space-y-3 p-3 pt-0">
                          <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-neutral-800">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={c.link} alt={`${c.title} preview`} className="h-full w-full object-contain" />
                          </div>
                          <div className="flex items-center gap-3">
                            <Link href={c.link} className="text-xs text-white/70 underline underline-offset-4">
                              Open in new tab
                            </Link>
                          </div>
                        </div>
                      </details>
                    </li>
                  )
                })}
              </ul>
            </RevealOnView>

            {/* Awards & Hackathons (Accordion previews) */}
            {DATA.hackathons?.length ? (
              <RevealOnView className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8">
                <h3 className="text-xl font-semibold">Awards & Hackathons</h3>
                <ul className="mt-4 space-y-3">
                  {DATA.hackathons.map((h) => {
                    const links = (h.links ?? []) as unknown as ReadonlyArray<{ href: string; type?: string }>
                    const preview = links[0]?.href || h.mlh
                    return (
                      <li key={h.title} className="rounded-xl border border-white/10 bg-white/5">
                        <details className="group">
                          <summary className="flex cursor-pointer list-none flex-col gap-1 p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <div className="text-base font-medium">{h.title}</div>
                              <div className="text-xs text-white/60">{h.dates} • {h.location}</div>
                            </div>
                            <span className="text-xs text-white/70">Preview</span>
                          </summary>
                          <div className="space-y-3 px-4 pb-4">
                            <p className="text-sm text-white/80">{h.description}</p>
                            {preview ? (
                              <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-neutral-800">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={preview} alt={`${h.title} preview`} className="h-full w-full object-contain" />
                              </div>
                            ) : null}
                            <div className="flex flex-wrap items-center gap-2">
                              {links.map((l) => (
                                <Link key={l.href} href={l.href} className="text-xs text-white/70 underline underline-offset-4">
                                  {l.type || "Link"}
                                </Link>
                              ))}
                              {h.mlh && (
                                <Link href={h.mlh} className="text-xs text-white/70 underline underline-offset-4">
                                  Source
                                </Link>
                              )}
                            </div>
                          </div>
                        </details>
                      </li>
                    )
                  })}
                </ul>
              </RevealOnView>
            ) : null}

            {/* Skills */}
            <RevealOnView className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8">
              <h3 className="text-xl font-semibold">Skills</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {DATA.skills.map((s) => (
                  <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
                    {s}
                  </span>
                ))}
              </div>
            </RevealOnView>
          </div>
        </div>
      </section>
    </main>
  )
}


