"use client"

import { FOCUS_AREAS } from "@/constants"
import { cn } from "@/lib/utils"
import { SectionHeader } from "@/components/section-header"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"

export const FocusAreas = () => {
  return (
    <section id="focus-areas" className="relative w-full scroll-mt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <Reveal>
        <SectionHeader
          index="02"
          label="Focus Areas"
          title="Where We Push Boundaries"
          description="Six domains driving the next era of civilization-scale technology."
        />
      </Reveal>

      <Stagger
        className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        staggerDelay={0.07}
      >
        {FOCUS_AREAS.map((area, index) => (
          <StaggerItem key={area.id}>
            <article
              className={cn(
                "group relative flex h-full flex-col justify-between gap-4 overflow-hidden rounded-2xl border border-white/8 bg-white/2 p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/15 sm:p-7 md:min-h-56",
                area.accent.rail,
              )}
            >
              <span
                className={cn(
                  "pointer-events-none absolute right-3 top-1 select-none font-heading text-[5.5rem] leading-none tracking-tighter text-white/3 transition-colors duration-500 sm:text-[6.5rem]",
                  area.accent.index,
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                className={cn(
                  "pointer-events-none absolute left-0 top-0 h-px w-0 bg-current transition-all duration-700 ease-out group-hover:w-full",
                  area.accent.icon,
                )}
              />

              <div
                className={cn(
                  "pointer-events-none absolute inset-0 bg-linear-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                  area.accent.glow,
                )}
              />

              <div
                className={cn(
                  "relative flex size-12 items-center justify-center rounded-xl border transition-all duration-500",
                  "group-hover:scale-110 group-hover:shadow-[0_0_24px_-4px] group-hover:shadow-current/25",
                  area.accent.border,
                  area.accent.bg,
                  area.accent.icon,
                )}
              >
                <area.icon className="size-5" strokeWidth={1.5} />
              </div>

              <div className="relative">
                <h3
                  className={cn(
                    "font-heading text-lg font-medium leading-snug text-white transition-colors duration-300 sm:text-xl",
                    area.accent.title,
                  )}
                >
                  {area.name}
                </h3>

                <div className="grid grid-rows-[1fr] opacity-100 transition-all duration-500 ease-out md:grid-rows-[0fr] md:opacity-0 md:group-hover:grid-rows-[1fr] md:group-hover:opacity-100">
                  <p className="section-description overflow-hidden text-sm leading-relaxed">
                    <span className="mt-2.5 block">{area.description}</span>
                  </p>
                </div>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  )
}
