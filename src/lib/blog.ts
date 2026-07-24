import fs from "fs"
import path from "path"
import matter from "gray-matter"
import readingTime from "reading-time"

// Works whether content lives at <root>/content/blog or <root>/src/content/blog
function resolveBlogDir() {
  const withSrc = path.join(process.cwd(), "src/content/blog")
  const withoutSrc = path.join(process.cwd(), "/content/blog")
  return fs.existsSync(withSrc) ? withSrc : withoutSrc
}

const BLOG_DIR = resolveBlogDir()

export type PostMeta = {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  cover?: string
  author: string
  featured: boolean
  readTime: string
}

export type Post = PostMeta & { content: string }

function getMdxFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))
}

function slugify(filename: string): string {
  return filename.replace(/\.mdx$/, "").toLowerCase()
}

function readPostFile(filename: string): Post {
  const slug = slugify(filename)
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8")
  const { data, content } = matter(raw)
  const stats = readingTime(content)

  return {
    slug,
    title: data.title ?? slug,
    excerpt: data.excerpt ?? "",
    date: data.date ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    cover: data.cover,
    author: data.author ?? "Gavin Arori",
    featured: Boolean(data.featured),
    readTime: data.readTime ?? stats.text,
    content,
  }
}

/** All posts, newest first. */
export function getAllPosts(): PostMeta[] {
  return getMdxFiles()
    .map((f) => {
      const { content, ...meta } = readPostFile(f)
      return meta
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getAllSlugs(): string[] {
  return getMdxFiles().map(slugify)
}

export function getPostBySlug(slug: string): Post | null {
  const target = slug.toLowerCase()
  const filename = getMdxFiles().find((f) => slugify(f) === target)
  if (!filename) return null
  return readPostFile(filename)
}

export function getAllTags(): string[] {
  const tags = new Set<string>()
  getAllPosts().forEach((p) => p.tags.forEach((t) => tags.add(t)))
  return Array.from(tags).sort()
}

export function getFeaturedPost(): PostMeta | null {
  const posts = getAllPosts()
  return posts.find((p) => p.featured) ?? posts[0] ?? null
}

export function getAdjacentPosts(slug: string): { prev: PostMeta | null; next: PostMeta | null } {
  const posts = getAllPosts()
  const idx = posts.findIndex((p) => p.slug === slug)
  if (idx === -1) return { prev: null, next: null }
  return {
    // "prev" = older post, "next" = newer post, given newest-first sort
    prev: idx < posts.length - 1 ? posts[idx + 1] : null,
    next: idx > 0 ? posts[idx - 1] : null,
  }
}

export function getRelatedPosts(slug: string, tags: string[], limit = 3): PostMeta[] {
  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .map((post) => ({ post, score: post.tags.filter((t) => tags.includes(t)).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post)
}