"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatContentDate } from "@/lib/format"
import { getNewsAccent } from "@/constants"
import type { NewsItem } from "@/types/news"
import { SectionHeader } from "@/components/section-header"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"

type NewsContentProps = {
  items: NewsItem[]
}

export function NewsContent({ items }: NewsContentProps) {
  const [featured, ...rest] = items
  const featuredAccent = featured ? getNewsAccent(featured.category) : null

  return (
    <section id="news" className="relative w-full scroll-mt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <Reveal>
        <SectionHeader
          index="03"
          label="Updates"
          title="Latest News"
          action={
            <Link
              href="/news"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-white/50 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:gap-3 hover:text-white"
            >
              View all
              <ArrowRight className="size-3.5" />
            </Link>
          }
        />
      </Reveal>

      {featured && featuredAccent && (
        <Reveal delay={0.1}>
          <Link href={featured.href} className="group mt-12 block">
            <article
              className={cn(
                "relative grid overflow-hidden border border-white/6 bg-white/1.5 transition-all duration-500",
                "border-l-2 border-l-transparent md:grid-cols-[1fr_1.15fr]",
                featuredAccent.border,
                featuredAccent.rail,
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 bg-linear-to-r to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                  featuredAccent.glow,
                )}
              />

              <div className="relative order-2 flex flex-col justify-between gap-8 p-6 md:order-1 md:p-9 lg:p-10">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex border border-white/15 bg-white/5 px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-white/60">
                      Featured
                    </span>
                    <span
                      className={cn(
                        "inline-flex border px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-[0.18em]",
                        featuredAccent.badge,
                      )}
                    >
                      {featured.category}
                    </span>
                    <time
                      dateTime={featured.publishedAt}
                      className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/35"
                    >
                      {formatContentDate(featured.publishedAt)}
                    </time>
                  </div>

                  <h3
                    className={cn(
                      "max-w-xl font-heading text-2xl leading-snug text-white transition-colors duration-300 md:text-3xl lg:text-[2rem]",
                      featuredAccent.title,
                    )}
                  >
                    {featured.title}
                  </h3>

                  <p className="section-description max-w-lg text-sm leading-relaxed sm:text-[0.9375rem]">
                    {featured.excerpt}
                  </p>
                </div>

                <span
                  className={cn(
                    "inline-flex w-fit items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white/35 transition-all duration-300",
                    featuredAccent.link,
                  )}
                >
                  Read update
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>

              <div className="relative order-1 aspect-16/10 overflow-hidden md:order-2 md:aspect-auto md:min-h-80">
                <Image
                  src={featured.thumbnailUrl}
                  alt=""
                  fill
                  className="object-cover opacity-75 transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-95"
                  sizes="(max-width: 768px) 100vw, 55vw"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent md:bg-linear-to-l md:from-transparent md:via-black/5 md:to-black/50" />
              </div>
            </article>
          </Link>
        </Reveal>
      )}

      {rest.length > 0 && (
        <Stagger
          className="mt-px divide-y divide-white/6 border border-t-0 border-white/6"
          staggerDelay={0.08}
        >
          {rest.map((item, index) => {
            const accent = getNewsAccent(item.category)

            return (
              <StaggerItem key={item.id}>
                <Link href={item.href} className="group block">
                  <article
                    className={cn(
                      "relative grid gap-6 overflow-hidden border-l-2 border-l-transparent p-6 transition-all duration-500 sm:p-7",
                      "md:grid-cols-[auto_1fr_auto] md:items-center md:gap-8",
                      accent.rail,
                    )}
                  >
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 bg-linear-to-r to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                        accent.glow,
                      )}
                    />

                    <div className="relative flex items-center gap-5 md:gap-6">
                      <span
                        className={cn(
                          "hidden font-mono text-xs tracking-widest text-white/25 transition-colors duration-300 sm:inline",
                          accent.link,
                        )}
                      >
                        {String(index + 2).padStart(2, "0")}
                      </span>

                      <div className="relative size-16 shrink-0 overflow-hidden border border-white/8 sm:size-20">
                        <Image
                          src={item.thumbnailUrl}
                          alt=""
                          fill
                          className="object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                          sizes="80px"
                        />
                      </div>
                    </div>

                    <div className="relative min-w-0">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span
                          className={cn(
                            "inline-flex border px-1.5 py-0.5 text-[0.55rem] font-medium uppercase tracking-[0.16em]",
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

                      <h3
                        className={cn(
                          "font-heading text-lg leading-snug text-white transition-colors duration-300 md:text-xl",
                          accent.title,
                        )}
                      >
                        {item.title}
                      </h3>
                      <p className="section-description mt-2 line-clamp-2 max-w-2xl text-sm">
                        {item.excerpt}
                      </p>
                    </div>

                    <span
                      className={cn(
                        "relative inline-flex items-center gap-2 self-start text-xs font-medium uppercase tracking-[0.18em] text-white/30 transition-all duration-300 md:self-center",
                        accent.link,
                      )}
                    >
                      Read
                      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </article>
                </Link>
              </StaggerItem>
            )
          })}
        </Stagger>
      )}
    </section>
  )
}
