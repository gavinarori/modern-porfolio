import type { HttpMethod } from "../../data/docs-data"

const METHOD_COLORS: Record<HttpMethod, string> = {
  GET: "#2f9e6f",
  POST: "#3b82f6",
  PUT: "#d97706",
  PATCH: "#d97706",
  DELETE: "#e11d48",
}

export function MethodBadge({ method, size = "md" }: { method: HttpMethod; size?: "sm" | "md" }) {
  return (
    <span
      className={`font-mono font-semibold tracking-tight ${size === "sm" ? "text-xs" : "text-sm"}`}
      style={{ color: METHOD_COLORS[method] }}
    >
      {method}
    </span>
  )
}