import Image from "next/image"
import Link from "next/link"
import type { MDXComponents } from "mdx/types"
import { CodeBlock } from "./mdx/code-block"

export const mdxComponents: MDXComponents = {
  h1: (props) => (
    <h1 className="mb-4 mt-10 scroll-mt-24 text-3xl font-black tracking-tight text-white sm:text-4xl" {...props} />
  ),
  h2: (props) => (
    <h2 className="mb-4 mt-10 scroll-mt-24 text-2xl font-bold tracking-tight text-white" {...props} />
  ),
  h3: (props) => (
    <h3 className="mb-3 mt-8 scroll-mt-24 text-xl font-semibold text-white" {...props} />
  ),
  h4: (props) => (
    <h4 className="mb-2 mt-6 scroll-mt-24 text-base font-semibold text-white" {...props} />
  ),
  p: (props) => <p className="mb-5 leading-relaxed text-white/75" {...props} />,
  a: ({ href = "", children, ...props }) => (
    <Link
      href={href}
      className="font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
      {...props}
    >
      {children}
    </Link>
  ),
  ul: (props) => <ul className="mb-5 ml-5 list-disc space-y-2 text-white/75 marker:text-white/30" {...props} />,
  ol: (props) => <ol className="mb-5 ml-5 list-decimal space-y-2 text-white/75 marker:text-white/30" {...props} />,
  li: (props) => <li className="pl-1 leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-6 rounded-r-xl border-l-2 border-white/30 bg-white/5 py-3 pl-5 pr-4 italic text-white/70"
      {...props}
    />
  ),
  hr: () => <hr className="my-10 border-white/10" />,
  strong: (props) => <strong className="font-semibold text-white" {...props} />,
  img: ({ src, alt }) => (
    <span className="my-8 block overflow-hidden rounded-2xl border border-white/10 bg-white/5">
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
    <div className="my-6 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
  thead: (props) => <thead className="bg-white/5" {...props} />,
  th: (props) => <th className="border-b border-white/10 px-4 py-2 font-semibold text-white" {...props} />,
  td: (props) => <td className="border-b border-white/5 px-4 py-2 text-white/70" {...props} />,
  // Inline code vs fenced code blocks both hit `code`; fenced blocks carry a
  // language className (added by rehype-pretty-code) so we can tell them apart.
  code: ({ className, ...props }) => {
    if (className) {
      return <code className={className} {...props} />
    }
    return (
      <code
        className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-white/90"
        {...props}
      />
    )
  },
  pre: CodeBlock,
}