"use client"

import { useEffect, useState } from "react"
import type { DocsProject } from "../../data/docs-data"
import { MethodBadge } from "./method-badge"

export function DocsSidebar({ project }: { project: DocsProject }) {
  const allIds = project.groups.flatMap((group) => group.endpoints.map((e) => e.id))
  const [activeId, setActiveId] = useState(allIds[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    )

    allIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.slug])

  return (
    <nav className="lg:sticky lg:top-24">
      <div className="mb-6">
        <p className="text-sm font-medium text-foreground/80">Overview</p>
        <ul className="mt-2 space-y-1.5 border-l border-border pl-3 text-sm">
          <li>
            <a href="#quickstart" className="text-foreground/60 transition-colors hover:text-foreground">
              Base URL &amp; auth
            </a>
          </li>
          {project.architecture && (
            <li>
              <a href="#architecture" className="text-foreground/60 transition-colors hover:text-foreground">
                Architecture &amp; trade-offs
              </a>
            </li>
          )}
          {project.localSetup && (
            <li>
              <a href="#local-setup" className="text-foreground/60 transition-colors hover:text-foreground">
                Run it locally
              </a>
            </li>
          )}
        </ul>
      </div>

      {project.groups.map((group) => (
        <div key={group.name} className="mb-6">
          <p className="text-sm font-medium text-foreground/80">{group.name}</p>
          <ul className="mt-2 space-y-1.5 border-l border-border pl-3">
            {group.endpoints.map((endpoint) => {
              const isActive = endpoint.id === activeId
              return (
                <li key={endpoint.id}>
                  <a
                    href={`#${endpoint.id}`}
                    className={`flex items-center gap-2 text-sm transition-colors ${
                      isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    <MethodBadge method={endpoint.method} size="sm" />
                    <span className="truncate">{endpoint.summary}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}