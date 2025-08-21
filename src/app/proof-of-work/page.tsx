import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Github, Video, FileText, MessageSquare, GitPullRequest, NotebookText, SplitSquareVertical } from "lucide-react"

import AnimatedHeading from "../../components/animated-heading"
import RevealOnView from "../../components/reveal-on-view"
import ProjectCard from "../../components/project-card"
import DotGridShader from "../../components/DotGridShader"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { DATA } from "../../data/site-data"

export default function ProofOfWorkPage() {
  const { projects, contact, work } = DATA

  return (
    <main className="bg-neutral-950 text-white">
      <section className="px-4 pt-4 pb-16 lg:pb-8">
        <div className="grid h-full grid-cols-1 gap-4 lg:grid-cols-[420px_1fr]">
          {/* LEFT: sticky aside */}
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
                  lines={["Proof of Work", "Trust & Verification"]}
                />

                <p className="mt-4 max-w-[42ch] text-lg text-white/70">
                  Real, verifiable outcomes that demonstrate my capabilities: shipped projects, readable code, clear problem solving, and results.
                </p>

                {/* CTAs + Socials */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button asChild size="lg" className="rounded-full">
                    <Link href={contact.social.LinkedIn.url}>
                      Let's talk
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Link
                    href={contact.social.GitHub.url}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-white/90 backdrop-blur transition-colors hover:bg-white/20"
                  >
                    <Github className="h-3 w-3" /> View GitHub
                  </Link>
                </div>
                
                {/* Navigation */}
                <div className="mt-4">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur transition-colors hover:bg-white/20"
                  >
                    ← Back to Home
                  </Link>
                </div>

                {/* Companies */}
                <div className="mt-10">
                  <p className="mb-3 text-xs font-semibold tracking-widest text-white/50">COMPANIES I&apos;VE WORKED WITH</p>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-2xl font-black text-white/25 sm:grid-cols-3">
                    {work.map((w) => (
                      <li key={w.company}>{w.company}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealOnView>
          </aside>

          {/* RIGHT: content */}
          <div className="space-y-4">
            {/* Company Experience */}
            <RevealOnView className="rounded-3xl border border-white/10 bg-neutral-900/60 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold mb-6">Professional Experience</h2>
              <div className="space-y-8">
                {work.map((job) => (
                  <div key={job.company} className="border-b border-white/10 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{job.company}</h3>
                        <p className="text-lg text-white/80">{job.title}</p>
                        <p className="text-sm text-white/60">{job.location}</p>
                        <p className="text-sm text-white/60">{job.start} — {job.end}</p>
                      </div>
                      <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-white/20">
                        <Image src={job.logoUrl} alt={job.company} fill sizes="64px" className="object-cover" />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-base font-semibold text-white/90 mb-2">Key Responsibilities:</h4>
                      <ul className="space-y-1">
                        {job.keyResponsibilities?.map((resp, idx) => (
                          <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                            <span className="text-white/50 mt-1">•</span>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-base font-semibold text-white/90 mb-2">Reference Contact:</h4>
                      <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                        <p className="text-sm font-medium text-white/90">{job.reference.name}</p>
                        <p className="text-xs text-white/70">{job.reference.title}</p>
                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-white/70">
                            <span className="text-white/50">Email:</span> {job.reference.email}
                          </p>
                          <p className="text-xs text-white/70">
                            <span className="text-white/50">Phone:</span> {job.reference.phone}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.badges.map((badge, idx) => (
                        <Badge key={idx} className="bg-white/10 text-white border-white/20">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnView>

            {/* Live Projects */}
            <Section
              icon={<Video className="h-4 w-4" />}
              title="Live projects"
              subtitle="Production and personal apps you can click and test"
            >
              <div className="space-y-6">
                {DATA.projects.map((p, idx) => (
                  <RevealOnView key={p.title} delay={idx * 0.06} className="flex flex-col lg:flex-row gap-6 p-6 rounded-2xl border border-white/10 bg-white/5">
                    {/* Project Media */}
                    <div className="lg:w-1/2">
                      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10">
                        {p.video ? (
                          <video
                            src={p.video}
                            className="h-full w-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="none"
                            poster={p.image || "/placeholder.svg"}
                          />
                        ) : (
                          <Image
                            src={p.image || "/placeholder.svg"}
                            alt={p.title}
                            fill
                            sizes="(min-width: 1024px) 50vw, 100vw"
                            className="object-cover"
                          />
                        )}
                      </div>
                    </div>
                    
                    {/* Project Details */}
                    <div className="lg:w-1/2 space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                        <p className="text-sm text-white/60 mb-3">{p.dates}</p>
                        <p className="text-white/80 leading-relaxed">{p.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-semibold text-white/90 mb-2">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {(p.technologies as readonly string[]).map((tech) => (
                            <Badge key={tech} className="bg-white/10 text-white border-white/20">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        {p.links?.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur transition-colors hover:bg-white/20"
                          >
                            {link.icon ? <link.icon className="h-4 w-4" /> : null}
                            {link.type}
                          </Link>
                        ))}
                        <Link
                          href={p.href}
                          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur transition-colors hover:bg-white/20"
                        >
                          View Project
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </RevealOnView>
                ))}
              </div>
            </Section>

            {/* GitHub repositories */}
            <Section
              icon={<Github className="h-4 w-4" />}
              title="GitHub repositories"
              subtitle="Code, commits, and contribution history"
            >
              <CardRow>
                <SimpleCard
                  title="Profile"
                  description="Public repositories, commit graph, and pinned projects"
                  href={contact.social.GitHub.url}
                  cta="Open GitHub"
                  icon={<Github className="h-4 w-4" />}
                />
                <SimpleCard
                  title="Open source components"
                  description="Reusable UI and utilities in active use"
                  href="https://github.com/gavinarori?tab=repositories"
                  cta="Browse repos"
                  icon={<GitPullRequest className="h-4 w-4" />}
                />
              </CardRow>
            </Section>

            {/* Case studies */}
            <Section
              icon={<FileText className="h-4 w-4" />}
              title="Case studies"
              subtitle="Problem → solution → outcome, kept short and practical"
            >
              <ul className="grid grid-cols-1 gap-4">
                {DATA.caseStudies.map((cs) => (
                  <li key={`cs-${cs.title}`}>
                    <RevealOnView className="rounded-2xl border border-white/10 p-4">
                      <div className="flex flex-col gap-4">
                        <div className="text-lg font-semibold">{cs.title}</div>
                        <div className="grid gap-3 text-sm text-white/80 sm:grid-cols-3">
                          <div>
                            <span className="font-semibold text-white">Problem: </span>
                            <p className="mt-1">{cs.problem}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-white">Solution: </span>
                            <p className="mt-1">{cs.solution}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-white">Outcome: </span>
                            <p className="mt-1">{cs.outcome}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {cs.technologies.map((tech) => (
                            <Badge key={tech} className="bg-white/10 text-white border-white/20">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </RevealOnView>
                  </li>
                ))}
              </ul>
            </Section>

            {/* Screenshots / Videos */}
            <Section
              icon={<Video className="h-4 w-4" />}
              title="Screenshots / Videos"
              subtitle="UI demos and feature walkthroughs"
            >
              <CardRow>
                {projects.slice(0, 4).map((p) => (
                  <SimpleCard key={`media-${p.title}`} title={p.title} description={p.description} href={p.href} cta="View" />
                ))}
              </CardRow>
            </Section>

            {/* Client testimonials */}
            <Section
              icon={<MessageSquare className="h-4 w-4" />}
              title="Client testimonials"
              subtitle="What collaborators say about working with me"
            >
              <Testimonials />
            </Section>

            {/* Open Source contributions */}
            <Section
              icon={<GitPullRequest className="h-4 w-4" />}
              title="Open Source contributions"
              subtitle="Pull requests, issues, and code contributions"
            >
              <div className="space-y-4">
                {DATA.openSourceContributions.map((contribution) => (
                  <RevealOnView key={contribution.repo} className="rounded-2xl border border-white/10 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-base font-semibold">{contribution.repo}</h4>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                            {contribution.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-white/80 mb-2">{contribution.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-white/10 text-white border-white/20">
                            {contribution.type}
                          </Badge>
                        </div>
                      </div>
                      <Link
                        href={contribution.url}
                        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-white/90 backdrop-blur transition-colors hover:bg-white/20"
                      >
                        View PR
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </RevealOnView>
                ))}
              </div>
            </Section>

            {/* Blog / technical articles */}
            <Section
              icon={<NotebookText className="h-4 w-4" />}
              title="Blog / technical articles"
              subtitle="Explaining how things are built and decisions made"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {DATA.blogPosts.map((post) => (
                  <RevealOnView key={post.title} className="rounded-2xl border border-white/10 p-4">
                    <div className="mb-3">
                      <h4 className="text-base font-semibold mb-2">{post.title}</h4>
                      <p className="text-sm text-white/70 mb-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-white/50">{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <Badge key={tag} className="bg-white/10 text-white border-white/20 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link
                      href={post.url}
                      className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-white/90 backdrop-blur transition-colors hover:bg-white/20"
                    >
                      Read Article
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </RevealOnView>
                ))}
              </div>
            </Section>

            {/* Before-and-after comparisons */}
            <Section
              icon={<SplitSquareVertical className="h-4 w-4" />}
              title="Before-and-after"
              subtitle="Clear improvements demonstrated visually or with metrics"
            >
              <ul className="grid grid-cols-1 gap-4">
                <li>
                  <RevealOnView className="rounded-2xl border border-white/10 p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <div className="mb-2 text-sm font-semibold text-white/80">Before</div>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/80">Complex, duplicated components; slow builds.</div>
                      </div>
                      <div>
                        <div className="mb-2 text-sm font-semibold text-white/80">After</div>
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-white/80">Shared primitives, better DX, and improved performance.</div>
                      </div>
                    </div>
                  </RevealOnView>
                </li>
              </ul>
            </Section>
          </div>
        </div>
      </section>
    </main>
  )
}

function Section({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-10">
      <RevealOnView className="mb-4 flex items-center gap-3">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
          {icon}
        </span>
        <div>
          <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
          {subtitle && <p className="text-sm text-white/70">{subtitle}</p>}
        </div>
      </RevealOnView>
      {children}
    </div>
  )
}

function CardRow({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
}

function SimpleCard({
  title,
  description,
  href,
  cta = "Open",
  icon,
}: {
  title: string
  description?: string
  href: string
  cta?: string
  icon?: React.ReactNode
}) {
  return (
    <RevealOnView className="group rounded-2xl border border-white/10 p-4">
      <div className="mb-3 flex items-center gap-2">
        {icon && <span className="text-white/80">{icon}</span>}
        <div className="text-base font-semibold">{title}</div>
      </div>
      {description && <p className="mb-3 text-sm text-white/70">{description}</p>}
      <Link
        href={href}
        className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-medium text-white/90 backdrop-blur transition-colors hover:bg-white/20"
      >
        {cta}
        <ArrowRight className="h-3 w-3" />
      </Link>
    </RevealOnView>
  )
}

function Testimonials() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {DATA.testimonials.map((t) => (
        <RevealOnView key={t.name} className="rounded-2xl border border-white/10 p-4">
          <div className="mb-3">
            <div className="text-sm font-semibold text-white/90">{t.name}</div>
            <div className="text-xs text-white/60">{t.title}</div>
            <div className="text-xs text-white/50 mt-1">{t.project}</div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">"{t.quote}"</p>
          <div className="mt-3 flex items-center gap-1">
            {[...Array(t.rating)].map((_, i) => (
              <span key={i} className="text-yellow-400">★</span>
            ))}
          </div>
        </RevealOnView>
      ))}
    </div>
  )
}


