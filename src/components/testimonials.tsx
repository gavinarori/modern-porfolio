import { Reveal, RevealGroup, RevealItem } from "./reveal"
import { testimonials } from "../data/portfolio-data"

export function Testimonials() {
  return (
    <section className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="mb-4 text-sm tracking-widest text-muted-foreground">WHAT OTHERS SAY</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            From people I&apos;ve worked with.
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 space-y-6">
          {testimonials.map((t) => (
            <RevealItem
              key={t.name}
              className="rounded-2xl border border-border bg-card p-8"
            >
              <p className="font-serif text-lg leading-relaxed sm:text-xl">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6">
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}