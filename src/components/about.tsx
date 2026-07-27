import { Reveal } from "./reveal"
import { journey } from "../data/portfolio-data"

export function About() {
  return (
    <section id="about" className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="mb-4 text-sm tracking-widest text-muted-foreground">MY JOURNEY</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            From learning in public, to owning delivery.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-16">
          {journey.map((step, idx) => (
            <Reveal key={step.phase} delay={idx * 0.05} className="grid gap-4 sm:grid-cols-[100px_1fr]">
              <div>
                <span className="font-serif text-3xl text-muted-foreground/60">{step.phase}</span>
                <p className="mt-1 text-xs tracking-widest text-muted-foreground">{step.years}</p>
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl">{step.title}</h3>
                <p className="mt-4 max-w-[64ch] text-base leading-relaxed text-foreground/75 sm:text-lg">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}