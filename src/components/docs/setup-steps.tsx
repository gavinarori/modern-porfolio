"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import type { DocsProject } from "../../data/docs-data"

function CommandLine({ command }: { command: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard API unavailable, fail silently
    }
  }

  return (
    <div className="group relative mt-3 overflow-hidden rounded-xl border border-border bg-[#0d1117]">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy command"
        className="absolute right-2.5 top-2.5 z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-2 py-1 text-xs text-white/70 opacity-0 backdrop-blur transition-opacity hover:bg-white/20 hover:text-white group-hover:opacity-100 focus-visible:opacity-100"
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      </button>
      <pre className="overflow-x-auto px-4 py-3 text-[13px] leading-relaxed text-white/85">
        <code>{command}</code>
      </pre>
    </div>
  )
}

export function SetupSteps({ localSetup }: { localSetup: NonNullable<DocsProject["localSetup"]> }) {
  return (
    <section id="local-setup" className="scroll-mt-24 border-b border-border py-12">
      <h2 className="font-serif text-2xl tracking-tight text-foreground">Run it locally</h2>
      {localSetup.intro && (
        <p className="mt-3 max-w-[65ch] leading-relaxed text-foreground/70">{localSetup.intro}</p>
      )}

      <ol className="mt-10 space-y-8">
        {localSetup.steps.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border font-mono text-xs text-foreground/70">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-foreground">{step.title}</p>
              <p className="mt-1 max-w-[60ch] leading-relaxed text-foreground/70">{step.description}</p>
              {step.command && <CommandLine command={step.command} />}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}