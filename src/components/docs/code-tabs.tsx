"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import type { CodeSample } from "../../data/docs-data"

export function CodeTabs({ samples, label }: { samples: CodeSample[]; label?: string }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const active = samples[activeIndex]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(active.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard API unavailable, fail silently
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-[#0d1117]">
      <div className="flex items-center justify-between border-b border-white/10 px-2">
        <div className="flex items-center gap-1">
          {samples.map((sample, i) => (
            <button
              key={sample.label}
              type="button"
              onClick={() => setActiveIndex(i)}
              className={`px-3 py-2.5 text-xs font-medium transition-colors ${
                i === activeIndex
                  ? "text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {sample.label}
              {i === activeIndex && (
                <span className="mx-auto mt-1.5 block h-px w-full bg-white" />
              )}
            </button>
          ))}
        </div>
        {label && <span className="pr-3 text-[11px] text-white/30">{label}</span>}
      </div>

      <div className="group relative">
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy code"
          className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-2.5 py-1.5 text-xs text-white/70 opacity-0 backdrop-blur transition-opacity hover:bg-white/20 hover:text-white group-hover:opacity-100 focus-visible:opacity-100"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
        <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed text-white/85 sm:text-sm">
          <code>{active.code}</code>
        </pre>
      </div>
    </div>
  )
}