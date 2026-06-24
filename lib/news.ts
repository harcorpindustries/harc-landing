import { NEWS_ITEMS } from "@/modules/news/content"
import type { NewsItem } from "@/types/news"

/**
 * Fetches news items for the home page and news listing.
 * Replace with a Notion CMS query when ready.
 */
export async function getNewsItems(): Promise<NewsItem[]> {
  return NEWS_ITEMS
}

export async function getNewsItemBySlug(slug: string): Promise<NewsItem | null> {
  const items = await getNewsItems()
  return items.find((item) => item.slug === slug) ?? null
}
