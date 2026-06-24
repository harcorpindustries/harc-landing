"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { cn } from "@/lib/utils"
import { ABOUT_HERO, ABOUT_STATS } from "@/modules/about/content"

const STATS = ABOUT_STATS.filter((stat) => stat.label !== "Directors")

const STAT_ACCENTS = [
  { value: "text-sky-300", line: "group-hover:via-sky-400/40" },
  { value: "text-cyan-300", line: "group-hover:via-cyan-400/40" },
  { value: "text-violet-300", line: "group-hover:via-violet-400/40" },
]

export const AboutPreview = () => {
  return (
    <section id="about" className="relative w-full scroll-mt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-[0.3em] text-white/30">
              00
            </span>
            <span className="h-px w-10 bg-white/15" />
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-white/35">
              About
            </span>
          </div>

          <h2 className="mt-6 max-w-2xl text-balance text-white">
            A multidisciplinary deep-tech company building for the long term.
          </h2>

          <p className="mt-6 max-w-xl text-lg font-medium leading-snug tracking-tight text-white/85">
            {ABOUT_HERO.subheading}
          </p>
          <p className="body-copy mt-5 max-w-xl">{ABOUT_HERO.description[0]}</p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {ABOUT_HERO.snapshot.map((item) => (
              <li
                key={item.label}
                className="group/chip inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/2 px-3.5 py-1.5 text-xs text-white/55 backdrop-blur-sm transition-colors duration-300 hover:border-white/20 hover:text-white/80"
              >
                <span className="text-[0.6rem] uppercase tracking-[0.18em] text-white/30 transition-colors group-hover/chip:text-white/45">
                  {item.label}
                </span>
                <span className="size-1 rounded-full bg-white/20" />
                <span className="font-medium text-white/75">{item.value}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <Link href="/about">
              <Button
                size="lg"
                className="cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Explore More
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </Reveal>

        <Stagger
          className="self-center lg:col-span-5"
          staggerDelay={0.1}
          delayChildren={0.15}
        >
          <div className="overflow-hidden rounded-2xl border border-white/8 bg-white/2 backdrop-blur-sm">
            {STATS.map((stat, index) => (
              <StaggerItem key={stat.label}>
                <div className="group relative flex items-center gap-6 border-b border-white/6 px-6 py-7 transition-colors duration-500 last:border-b-0 hover:bg-white/2 sm:px-8">
                  <span
                    className={cn(
                      "font-heading text-4xl leading-none tabular-nums text-white sm:text-5xl",
                      STAT_ACCENTS[index]?.value,
                    )}
                  >
                    {stat.value}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div
                      className={cn(
                        "mb-2 h-px w-full bg-linear-to-r from-white/10 via-white/0 to-transparent transition-all duration-500",
                        STAT_ACCENTS[index]?.line,
                      )}
                    />
                    <p className="section-description text-xs uppercase tracking-[0.16em]">
                      {stat.label}
                    </p>
                  </div>
                  <span className="font-mono text-[0.65rem] tracking-[0.2em] text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  )
}
