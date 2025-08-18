"use client"

import React from "react"
import { PointerHighlight } from "./ui/pointer-highlight"

type HighlightTextProps = {
  text: string
  phrases: string[]
  className?: string
}

function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export default function HighlightText({ text, phrases, className }: HighlightTextProps) {
  if (!text || phrases.length === 0) return <>{text}</>

  const pattern = new RegExp(`(${phrases.map(escapeRegExp).join("|")})`, "gi")
  const parts = text.split(pattern)

  return (
    <span className={className}>
      {parts.map((part, idx) => {
        const isMatch = phrases.some((p) => p.toLowerCase() === part.toLowerCase())
        if (!isMatch) return <span key={idx}>{part}</span>
        return (
          <PointerHighlight
            key={idx}
            containerClassName="inline-block align-baseline"
            rectangleClassName="rounded-md border-white/30"
            pointerClassName="text-blue-500"
          >
            <span className="rounded-md bg-white/5 px-1">
              {part}
            </span>
          </PointerHighlight>
        )
      })}
    </span>
  )
}


