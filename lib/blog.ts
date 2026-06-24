import { PLACEHOLDER_BLOGS } from "@/constants"
import type { BlogPost } from "@/types/blog"

/**
 * Fetches blog posts for the home page and blog listing.
 * Replace the placeholder return with a Notion CMS query when ready.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  return PLACEHOLDER_BLOGS
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts()
  return posts.find((post) => post.slug === slug) ?? null
}
