"use client"

import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { PRODUCTS } from "@/constants"
import Link from "next/link"
import { SectionHeader } from "@/components/section-header"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"

export const Products = () => {
  return (
    <section id="projects" className="relative w-full scroll-mt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <Reveal>
        <SectionHeader
          index="01"
          label="Projects"
          title="Projects That Power Innovation"
          description="Long-term projects engineered for real-world impact."
        />
      </Reveal>

      <Stagger className="mt-12 flex flex-col" staggerDelay={0.1}>
        {PRODUCTS.map((prd, index) => (
          <StaggerItem key={prd.id}>
            <Link
              href={prd.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <article
                className={cn(
                  "relative flex flex-col gap-5 border-t border-white/8 py-7 transition-colors duration-500 last:border-b sm:py-8",
                  "md:grid md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10 md:py-10",
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-linear-to-r to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    prd.accent.glow,
                  )}
                />
                <div
                  className={cn(
                    "pointer-events-none absolute bottom-0 left-0 h-px w-0 transition-all duration-700 ease-out group-hover:w-full",
                    prd.accent.bg,
                    "bg-current",
                    prd.accent.icon,
                  )}
                />

                <div className="relative z-10 flex items-center gap-4 sm:gap-5">
                  <span
                    className={cn(
                      "font-heading text-4xl leading-none tabular-nums text-white/10 transition-colors duration-500 sm:text-5xl md:text-6xl",
                      prd.accent.index,
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div
                    className={cn(
                      "flex size-11 shrink-0 items-center justify-center rounded-full border transition-all duration-500 sm:size-12",
                      "group-hover:scale-110 group-hover:shadow-[0_0_28px_-4px] group-hover:shadow-current/25",
                      prd.accent.border,
                      prd.accent.bg,
                      prd.accent.icon,
                    )}
                  >
                    <prd.icon className={cn("size-5", prd.accent.icon)} />
                  </div>
                </div>

                <div className="relative z-10 min-w-0">
                  <h3
                    className={cn(
                      "font-heading text-xl font-medium text-white transition-colors duration-300 sm:text-2xl",
                      prd.accent.title,
                    )}
                  >
                    {prd.name}
                  </h3>
                  <p className="section-description mt-2.5 max-w-2xl text-sm leading-relaxed sm:mt-3">
                    {prd.description}
                  </p>
                </div>

                <span
                  className={cn(
                    "relative z-10 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-white/30 transition-all duration-300 md:justify-end",
                    prd.accent.link,
                  )}
                >
                  <span className="transition-transform duration-300 group-hover:-translate-x-1">
                    Explore
                  </span>
                  <span
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full border border-white/8 transition-all duration-500 group-hover:scale-110",
                      prd.accent.border,
                    )}
                  >
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </span>
              </article>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
