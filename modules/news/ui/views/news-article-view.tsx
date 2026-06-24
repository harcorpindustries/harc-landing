import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatContentDate } from "@/lib/format"
import { getNewsAccent } from "@/constants"
import type { NewsItem } from "@/types/news"

type NewsArticleViewProps = {
  item: NewsItem
}

export function NewsArticleView({ item }: NewsArticleViewProps) {
  const accent = getNewsAccent(item.category)

  return (
    <article className="page-container pb-20 pt-28">
      <Link
        href="/news"
        className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white/40 transition-colors duration-300 hover:text-white/70"
      >
        <ArrowLeft className="size-3.5" />
        All news
      </Link>

      <header className="relative mt-8 border-b border-white/6 pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className={cn(
              "border px-1.5 py-0.5 text-[0.55rem] font-medium uppercase tracking-[0.16em]",
              accent.badge,
            )}
          >
            {item.category}
          </span>
          <time
            dateTime={item.publishedAt}
            className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/30"
          >
            {formatContentDate(item.publishedAt)}
          </time>
        </div>

        <h1 className="mt-5 max-w-3xl font-heading text-3xl leading-snug text-white md:text-4xl lg:text-[2.5rem]">
          {item.title}
        </h1>

        <p className="section-description mt-5 max-w-2xl text-base leading-relaxed">
          {item.excerpt}
        </p>
      </header>

      <div className="relative mt-10 aspect-21/9 overflow-hidden border border-white/8">
        <Image
          src={item.thumbnailUrl}
          alt=""
          fill
          className="object-cover opacity-80"
          sizes="(max-width: 768px) 100vw, 80vw"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        {item.content.map((paragraph, index) => (
          <p
            key={index}
            className="section-description text-[0.9375rem] leading-[1.8] [&+&]:mt-6"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  )
}
