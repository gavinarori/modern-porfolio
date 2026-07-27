import { Reveal, RevealGroup, RevealItem } from "./reveal"
import { skills } from "../data/portfolio-data"

export function Skills() {
  return (
    <section id="skills" className="px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <p className="mb-4 text-sm tracking-widest text-muted-foreground">SKILLS & EXPERTISE</p>
          <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
            What I bring to a team.
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {skills.map((group) => (
            <RevealItem
              key={group.group}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="font-serif text-lg">{group.group}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}