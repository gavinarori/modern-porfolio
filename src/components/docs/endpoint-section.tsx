import type { Endpoint } from "../../data/docs-data"
import { MethodBadge } from "./method-badge"
import { CodeTabs } from "./code-tabs"

function paramGroups(params: Endpoint["params"]) {
  if (!params) return []
  const order: Array<"path" | "query" | "body"> = ["path", "query", "body"]
  return order
    .map((kind) => ({ kind, items: params.filter((p) => p.in === kind) }))
    .filter((group) => group.items.length > 0)
}

export function EndpointSection({ endpoint }: { endpoint: Endpoint }) {
  const groups = paramGroups(endpoint.params)

  return (
    <section id={endpoint.id} className="scroll-mt-24 border-b border-border py-12 last:border-b-0">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="flex items-center gap-3">
            <MethodBadge method={endpoint.method} />
            <code className="break-all font-mono text-sm text-foreground/80">{endpoint.path}</code>
          </div>
          <h3 className="mt-3 font-serif text-2xl tracking-tight text-foreground">{endpoint.summary}</h3>
          <p className="mt-3 max-w-[60ch] leading-relaxed text-foreground/70">{endpoint.description}</p>

          {groups.map((group) => (
            <div key={group.kind} className="mt-8">
              <p className="mb-3 text-sm font-medium text-foreground/80">
                {group.kind === "path" ? "Path parameters" : group.kind === "query" ? "Query parameters" : "Body parameters"}
              </p>
              <div className="overflow-hidden rounded-xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted">
                    <tr>
                      <th className="border-b border-border px-4 py-2 font-semibold text-foreground">Name</th>
                      <th className="border-b border-border px-4 py-2 font-semibold text-foreground">Type</th>
                      <th className="border-b border-border px-4 py-2 font-semibold text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.items.map((param) => (
                      <tr key={param.name}>
                        <td className="border-b border-border/60 px-4 py-2.5 align-top">
                          <code className="font-mono text-xs text-foreground">{param.name}</code>
                          {param.required && <span className="ml-1.5 text-xs text-rose-500">*</span>}
                        </td>
                        <td className="border-b border-border/60 px-4 py-2.5 align-top font-mono text-xs text-muted-foreground">
                          {param.type}
                        </td>
                        <td className="border-b border-border/60 px-4 py-2.5 align-top text-foreground/70">
                          {param.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <CodeTabs samples={endpoint.codeSamples} label="Request" />
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium text-foreground/80">Response</p>
            <div className="overflow-hidden rounded-2xl border border-border bg-[#0d1117]">
              <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed text-white/85 sm:text-sm">
                <code>{endpoint.responseExample}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}