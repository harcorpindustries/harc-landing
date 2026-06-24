import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatContentDate } from "@/lib/format"
import { getNewsAccent } from "@/constants"
import { getNewsItems } from "@/lib/news"

export default async function NewsPage() {
  const items = await getNewsItems()

  return (
    <div className="page-container pb-20 pt-28">
      <div className="relative border-b border-white/6 pb-10">
        <p className="section-eyebrow">Updates</p>
        <h1 className="mt-3 text-white">News</h1>
        <p className="section-description mt-4 max-w-xl">
          Announcements, partnerships, and milestones from Harcorp Industries.
        </p>
      </div>

      <div className="mt-10 divide-y divide-white/6 border-y border-white/6">
        {items.map((item, index) => {
          const accent = getNewsAccent(item.category)

          return (
            <Link key={item.id} href={item.href} className="group block">
              <article
                className={cn(
                  "relative grid gap-6 overflow-hidden border-l-2 border-l-transparent py-8 transition-all duration-500",
                  "md:grid-cols-[3.5rem_7rem_1fr_auto] md:items-center md:gap-8 lg:gap-10",
                  accent.rail,
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-linear-to-r to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    accent.glow,
                  )}
                />

                <span
                  className={cn(
                    "relative hidden font-mono text-xs tracking-widest text-white/25 transition-colors duration-300 md:block",
                    accent.link,
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="relative aspect-4/3 overflow-hidden border border-white/8 md:aspect-square md:size-28">
                  <Image
                    src={item.thumbnailUrl}
                    alt=""
                    fill
                    className="object-cover opacity-75 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                    sizes="112px"
                  />
                </div>

                <div className="relative min-w-0">
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
                  <h2
                    className={cn(
                      "mt-3 font-heading text-lg text-white transition-colors duration-300 md:text-xl",
                      accent.title,
                    )}
                  >
                    {item.title}
                  </h2>
                  <p className="section-description mt-2 max-w-2xl">
                    {item.excerpt}
                  </p>
                </div>

                <ArrowUpRight
                  className={cn(
                    "relative size-4 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                    accent.link,
                  )}
                />
              </article>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
