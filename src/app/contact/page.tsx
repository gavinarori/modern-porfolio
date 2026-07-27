


import { ArrowUpRight } from "lucide-react"
import { Reveal } from "../../components/reveal"
import { personal } from "../../data/portfolio-data"

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-28 sm:py-36">
      <Reveal className="mx-auto max-w-3xl">
        <p className="mb-4 text-sm tracking-widest text-muted-foreground">LET&apos;S CONNECT</p>
        <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
          Building something worth talking about?
        </h2>
        <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-foreground/75">
          I&apos;m always glad to hear from teams working on hard, real problems — whether that&apos;s a
          role, a project, or just a good technical conversation.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${personal.email}`}
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            {personal.email}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Reveal>
    </section>
  )
}
