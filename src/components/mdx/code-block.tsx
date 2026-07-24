"use client"

import { useRef, useState, type HTMLAttributes } from "react"
import { Check, Copy } from "lucide-react"

export function CodeBlock(props: HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const text = preRef.current?.textContent ?? ""
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard API unavailable, fail silently
    }
  }

  return (
    <div className="group relative my-6 overflow-hidden rounded-2xl border border-white/10">
      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute right-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/10 px-2.5 py-1.5 text-xs text-white/70 opacity-0 backdrop-blur transition-opacity hover:bg-white/20 hover:text-white group-hover:opacity-100 focus-visible:opacity-100"
      >
        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        {copied ? "Copied" : "Copy"}
      </button>
      <pre
        ref={preRef}
        {...props}
        className="overflow-x-auto p-5 text-[13px] leading-relaxed sm:text-sm"
      />
    </div>
  )
}