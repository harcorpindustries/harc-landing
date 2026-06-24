import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getNewsItemBySlug, getNewsItems } from "@/lib/news"
import { NewsArticleView } from "@/modules/news/ui/views/news-article-view"

type NewsArticlePageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const items = await getNewsItems()
  return items.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({
  params,
}: NewsArticlePageProps): Promise<Metadata> {
  const { slug } = await params
  const item = await getNewsItemBySlug(slug)

  if (!item) {
    return { title: "News — Harcorp Industries" }
  }

  return {
    title: `${item.title} — Harcorp Industries`,
    description: item.excerpt,
  }
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params
  const item = await getNewsItemBySlug(slug)

  if (!item) {
    notFound()
  }

  return <NewsArticleView item={item} />
}
