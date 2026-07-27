import { Github, Linkedin, Twitter, Youtube, Coffee } from "lucide-react"
import { personal } from "../data/portfolio-data"

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {personal.name}. Built with care.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={personal.social.github}
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={personal.social.linkedin}
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={personal.social.twitter}
            aria-label="X (Twitter)"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Twitter className="h-4 w-4" />
          </a>
          <a
            href={personal.social.youtube}
            aria-label="YouTube"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Youtube className="h-4 w-4" />
          </a>
          <a
            href={personal.social.buyMeACoffee}
            aria-label="Buy Me a Coffee"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <Coffee className="h-4 w-4" />
          </a>
          <a
            href="#top"
            className="ml-2 text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
          >
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}