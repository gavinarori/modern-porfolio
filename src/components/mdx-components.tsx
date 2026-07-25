
import Image from "next/image"
import Link from "next/link"
import type { MDXComponents } from "mdx/types"
import { CodeBlock } from "./mdx/code-block"

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1 className="mb-4 mt-10 scroll-mt-24 font-serif text-3xl tracking-tight text-foreground sm:text-4xl" {...props} />
  ),
  h2: (props) => (
    <h2 className="mb-4 mt-10 scroll-mt-24 font-serif text-2xl tracking-tight text-foreground" {...props} />
  ),
  h3: (props) => (
    <h3 className="mb-3 mt-8 scroll-mt-24 font-serif text-xl text-foreground" {...props} />
  ),
  h4: (props) => (
    <h4 className="mb-2 mt-6 scroll-mt-24 text-base font-semibold text-foreground" {...props} />
  ),
  p: (props) => <p className="mb-5 leading-relaxed text-foreground/75" {...props} />,
  a: ({ href = "", children, ...props }) => (
    <Link
      href={href}
      className="font-medium text-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground"
      {...props}
    >
      {children}
    </Link>
  ),
  ul: (props) => <ul className="mb-5 ml-5 list-disc space-y-2 text-foreground/75 marker:text-muted-foreground" {...props} />,
  ol: (props) => <ol className="mb-5 ml-5 list-decimal space-y-2 text-foreground/75 marker:text-muted-foreground" {...props} />,
  li: (props) => <li className="pl-1 leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 rounded-r-xl border-l-2 border-foreground/30 bg-muted py-3 pl-5 pr-4 italic text-foreground/70"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
  img: ({ src, alt }) => (
    <span className="my-8 block overflow-hidden rounded-2xl border border-border bg-muted">
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image
        src={typeof src === "string" ? src : ""}
        alt={alt ?? ""}
        width={1200}
        height={675}
        className="h-auto w-full object-cover"
        sizes="(max-width: 768px) 100vw, 700px"
      />
    </span>
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-muted" {...props} />,
  th: (props) => <th className="border-b border-border px-4 py-2 font-semibold text-foreground" {...props} />,
  td: (props) => <td className="border-b border-border/60 px-4 py-2 text-foreground/70" {...props} />,
  // Inline code vs fenced code blocks both hit `code`; fenced blocks carry a
  // language className (added by rehype-pretty-code) so we can tell them apart.
  code: ({ className, ...props }) => {
    if (className) {
      return <code className={className} {...props} />
    }
    return (
      <code
        className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
        {...props}
      />
    )
  },
  pre: CodeBlock,
}
