import type { DocsProject } from "../../data/docs-data"

export function ArchitectureSection({ architecture }: { architecture: NonNullable<DocsProject["architecture"]> }) {
  return (
    <section id="architecture" className="scroll-mt-24 border-b border-border py-12">
      <h2 className="font-serif text-2xl tracking-tight text-foreground">Architecture &amp; trade-offs</h2>
      <p className="mt-3 max-w-[65ch] leading-relaxed text-foreground/70">{architecture.intro}</p>

      <div className="mt-10 space-y-10">
        {architecture.sections.map((section) => (
          <div key={section.heading}>
            <h3 className="font-serif text-lg tracking-tight text-foreground">{section.heading}</h3>
            <p className="mt-2 max-w-[65ch] leading-relaxed text-foreground/70">{section.body}</p>
            {section.bullets && (
              <ul className="mt-3 space-y-2">
                {section.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground/70">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                    <span className="max-w-[62ch]">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {architecture.tradeoffs.length > 0 && (
        <div className="mt-10 rounded-2xl border border-border bg-muted/40 p-6">
          <p className="text-sm font-medium text-foreground/80">Trade-offs made explicit</p>
          <ul className="mt-3 space-y-2.5">
            {architecture.tradeoffs.map((tradeoff, i) => (
              <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-foreground/70">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/40" />
                <span className="max-w-[62ch]">{tradeoff}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}