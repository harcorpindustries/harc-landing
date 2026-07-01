"use client"

import { type ReactNode, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Compass,
  Eye,
  FlaskConical,
  Globe2,
  Layers,
  Lightbulb,
  Network,
  PenTool,
  Scale,
  Shield,
  Sparkles,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactSection } from "@/components/contact-section"
import { SectionHeader } from "@/components/section-header"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { FadeInText, TextReveal } from "@/components/motion/text-reveal"
import { PRODUCT_ACCENTS } from "@/constants"
import { cn } from "@/lib/utils"
import {
  ABOUT_HERO,
  ABOUT_STATS,
  CLOSING,
  CORE_AREAS,
  LEADERSHIP,
  MISSION,
  PROJECTS,
  VALUES,
  VISION,
  WHO_WE_ARE,
} from "@/modules/about/content"
import { CONTACT_MAILTO } from "@/modules/contact/content"

const NEUTRAL_ACCENT = {
  icon: "text-zinc-300",
  bg: "bg-zinc-400/10",
  border: "border-zinc-400/25",
  glow: "from-zinc-400/10 via-zinc-300/5",
  link: "group-hover:text-zinc-300",
  title: "group-hover:text-zinc-200",
  index: "group-hover:text-zinc-400/55",
  rail: "group-hover:border-l-zinc-400/50",
} as const

const VIOLET_ACCENT = {
  icon: "text-violet-400",
  bg: "bg-violet-500/10",
  border: "border-violet-500/25",
  glow: "from-violet-500/10 via-violet-400/5",
  link: "group-hover:text-violet-400",
  title: "group-hover:text-violet-300",
  index: "group-hover:text-violet-400/55",
  rail: "group-hover:border-l-violet-500/50",
} as const

const CORE_AREA_META = {
  ai: { icon: BrainCircuit, accent: PRODUCT_ACCENTS.ai },
  software: { icon: Code2, accent: PRODUCT_ACCENTS.code },
  communication: { icon: Network, accent: PRODUCT_ACCENTS.network },
  materials: { icon: Layers, accent: NEUTRAL_ACCENT },
  design: { icon: PenTool, accent: VIOLET_ACCENT },
} as const

const VALUE_ICONS = {
  "long-term": Target,
  depth: FlaskConical,
  innovation: Lightbulb,
  independence: Shield,
  responsible: Scale,
} as const

const PROJECT_ICONS = {
  ai: BrainCircuit,
  network: Network,
  code: Code2,
} as const

function AboutAmbient() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute left-[-20%] top-0 h-[55vh] w-[55vw] rounded-full bg-violet-500/4 blur-[130px]" />
      <div className="absolute right-[-15%] top-[18%] h-[45vh] w-[45vw] rounded-full bg-cyan-500/4 blur-[120px]" />
      <div className="absolute bottom-0 left-[25%] h-[40vh] w-[50vw] rounded-full bg-white/2 blur-[100px]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 90% 60% at 50% 0%, black 15%, transparent 78%)",
        }}
      />
    </div>
  )
}

function SpotlightCard({
  children,
  className,
  glow = "neutral",
}: {
  children: ReactNode
  className?: string
  glow?: "violet" | "cyan" | "neutral"
}) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`)
    el.style.setProperty("--my", `${event.clientY - rect.top}px`)
  }

  const glowTint = {
    violet: "rgba(167,139,250,0.10)",
    cyan: "rgba(103,232,249,0.10)",
    neutral: "rgba(255,255,255,0.07)",
  }[glow]

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={cn(
        "group/spot relative h-full overflow-hidden rounded-2xl border border-white/8 bg-white/2 backdrop-blur-sm transition-colors duration-500 hover:border-white/15",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(460px circle at var(--mx, 50%) var(--my, 0%), ${glowTint}, transparent 42%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

function SectionRule() {
  return (
    <div
      aria-hidden
      className="pointer-events-none h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent"
    />
  )
}

function DirectorPhoto({
  name,
  image,
}: {
  name: string
  image: string
}) {
  return (
    <div className="relative size-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-linear-to-br from-white/12 to-white/2 shadow-[0_0_36px_-10px_rgba(255,255,255,0.25)]">
      <Image
        src={image}
        alt={name}
        fill
        sizes="56px"
        className="object-cover"
      />
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
    </div>
  )
}

export function AboutView() {
  return (
    <div className="relative overflow-x-clip">
      <AboutAmbient />

      <div className="page-container pb-20 pt-24 sm:pb-28 sm:pt-32">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <header className="relative grid min-w-0 items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
          <div className="min-w-0">
            <FadeInText delay={0.05}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white/55 backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-cosmic shadow-[0_0_10px_2px] shadow-cosmic/50" />
                Deep-Tech · India
              </span>
            </FadeInText>

            <h1 className="mt-6 text-balance text-[2rem] leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              <TextReveal
                lines={["Harcorp Industries"]}
                delay={0.12}
                stagger={0.12}
                lineClassName="bg-linear-to-br from-white via-white to-white/55 bg-clip-text text-transparent"
              />
            </h1>

            <FadeInText
              className="mt-6 block max-w-xl text-lg font-medium leading-snug tracking-tight text-white/85 sm:text-xl"
              delay={0.42}
            >
              {ABOUT_HERO.subheading}
            </FadeInText>

            <FadeInText
              className="mt-6 block max-w-xl space-y-4"
              delay={0.54}
            >
              {ABOUT_HERO.description.map((paragraph) => (
                <span key={paragraph.slice(0, 32)} className="body-copy block">
                  {paragraph}
                </span>
              ))}
            </FadeInText>

            <motion.div
              className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href="/#projects" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
                >
                  Explore Projects
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
              <a href={CONTACT_MAILTO} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full cursor-pointer border-white/20 text-white transition-transform duration-300 hover:scale-[1.02] hover:bg-white/10 active:scale-[0.98] sm:w-auto"
                >
                  Contact Us
                </Button>
              </a>
            </motion.div>
          </div>

          <Reveal delay={0.3} y={28} className="min-w-0">
            <SpotlightCard glow="violet" className="p-6 sm:p-8">
              <p className="section-eyebrow">Company Snapshot</p>
              <dl className="mt-6 space-y-5">
                {ABOUT_HERO.snapshot.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col gap-1 border-b border-white/6 pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                  >
                    <dt className="text-xs uppercase tracking-[0.18em] text-white/35">
                      {item.label}
                    </dt>
                    <dd className="font-heading text-sm text-white/90 sm:text-right">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </SpotlightCard>
          </Reveal>
        </header>

        {/* ── Stats band ───────────────────────────────────────── */}
        <Reveal className="mt-12 sm:mt-20" delay={0.1}>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/6 lg:grid-cols-4">
            {ABOUT_STATS.map((stat) => (
              <div
                key={stat.label}
                className="group bg-background/80 px-4 py-5 backdrop-blur-sm transition-colors duration-500 hover:bg-white/2 sm:px-6 sm:py-7 lg:px-8"
              >
                <p className="font-heading text-2xl text-white sm:text-3xl lg:text-4xl">
                  {stat.value}
                </p>
                <p className="section-description mt-2 text-xs uppercase tracking-[0.16em]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 sm:mt-24 lg:mt-28">
          <SectionRule />
        </div>

        {/* ── Who We Are ───────────────────────────────────────── */}
        <section className="py-12 sm:py-16 lg:py-20">
          <Reveal>
            <SectionHeader index="01" label="Identity" title={WHO_WE_ARE.title} />
          </Reveal>
          <Stagger className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-3" staggerDelay={0.08}>
            {WHO_WE_ARE.paragraphs.map((paragraph, index) => (
              <StaggerItem key={paragraph.slice(0, 32)}>
                <SpotlightCard
                  glow={index === 1 ? "cyan" : "neutral"}
                  className="p-6 sm:p-7"
                >
                  <span className="font-mono text-[0.65rem] tracking-[0.24em] text-white/25">
                    0{index + 1}
                  </span>
                  <p className="body-copy mt-4">{paragraph}</p>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <SectionRule />

        {/* ── Vision & Mission ─────────────────────────────────── */}
        <section className="py-12 sm:py-16 lg:py-20">
          <Reveal>
            <SectionHeader index="02" label="Direction" title="Vision & Mission" />
          </Reveal>

          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 lg:grid-cols-2">
            <Reveal delay={0.05}>
              <SpotlightCard glow="violet" className="p-6 sm:p-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/10 text-violet-300 sm:size-11">
                    <Eye className="size-4" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading text-xl text-white">
                      {VISION.title}
                    </h3>
                    <p className="body-copy mt-4">{VISION.content}</p>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>

            <Reveal delay={0.12}>
              <SpotlightCard glow="cyan" className="p-6 sm:p-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-cyan-500/25 bg-cyan-500/10 text-cyan-300 sm:size-11">
                    <Compass className="size-4" strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-xl text-white">
                      {MISSION.title}
                    </h3>
                    <p className="body-copy mt-4">{MISSION.intro}</p>
                    <p className="section-description mt-6">{MISSION.focusLabel}</p>
                    <ul className="mt-4 space-y-3">
                      {MISSION.focusAreas.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-sm leading-relaxed text-white/60"
                        >
                          <Sparkles className="mt-0.5 size-3.5 shrink-0 text-cyan-400/70" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          </div>
        </section>

        <SectionRule />

        {/* ── Core Areas ───────────────────────────────────────── */}
        <section className="py-12 sm:py-16 lg:py-20">
          <Reveal>
            <SectionHeader
              index="03"
              label="Domains"
              title={CORE_AREAS.title}
              description={CORE_AREAS.intro}
            />
          </Reveal>

          <Stagger
            className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-6"
            staggerDelay={0.07}
          >
            {CORE_AREAS.areas.map((area, index) => {
              const meta = CORE_AREA_META[area.id]
              const Icon = meta.icon
              const isFeature = index === 0

              return (
                <StaggerItem
                  key={area.id}
                  className={cn(
                    isFeature
                      ? "sm:col-span-2 lg:col-span-2 lg:row-span-2"
                      : "lg:col-span-2",
                  )}
                >
                  <article
                    className={cn(
                      "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/8 bg-white/2 backdrop-blur-sm transition-all duration-500 hover:border-white/15",
                      meta.accent.rail,
                      isFeature
                        ? "min-h-56 gap-6 p-6 sm:min-h-64 sm:gap-8 sm:p-7 lg:min-h-72 lg:p-9"
                        : "min-h-0 gap-5 p-5 sm:min-h-40 sm:gap-6 sm:p-6 lg:p-7",
                    )}
                  >
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 bg-linear-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                        meta.accent.glow,
                      )}
                    />

                    {isFeature ? (
                      <Icon
                        className={cn(
                          "pointer-events-none absolute -bottom-8 -right-6 size-44 opacity-[0.07] transition-all duration-700 group-hover:scale-105 group-hover:opacity-[0.12]",
                          meta.accent.icon,
                        )}
                        strokeWidth={1}
                      />
                    ) : null}

                    <div className="relative flex flex-wrap items-start justify-between gap-3">
                      <span
                        className={cn(
                          "font-mono text-xs tracking-widest text-white/25 transition-colors duration-300",
                          meta.accent.index,
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        {isFeature ? (
                          <span
                            className={cn(
                              "rounded-full border px-2 py-0.5 text-[0.55rem] font-medium uppercase tracking-[0.16em] sm:px-2.5 sm:text-[0.6rem] sm:tracking-[0.18em]",
                              meta.accent.border,
                              meta.accent.bg,
                              meta.accent.icon,
                            )}
                          >
                            Primary Domain
                          </span>
                        ) : null}
                        <div
                          className={cn(
                            "flex shrink-0 items-center justify-center rounded-xl border transition-all duration-500",
                            "group-hover:scale-110 group-hover:shadow-[0_0_20px_-4px] group-hover:shadow-current/20",
                            meta.accent.border,
                            meta.accent.bg,
                            meta.accent.icon,
                            isFeature ? "size-12" : "size-10",
                          )}
                        >
                          <Icon
                            className={isFeature ? "size-5" : "size-4"}
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <h3
                        className={cn(
                          "font-heading font-medium text-white transition-colors duration-300",
                          meta.accent.title,
                          isFeature ? "text-xl sm:text-2xl" : "text-base sm:text-lg",
                        )}
                      >
                        {area.name}
                      </h3>
                      <p
                        className={cn(
                          "section-description mt-2.5",
                          isFeature ? "max-w-md text-sm sm:text-base" : "text-xs sm:text-sm",
                        )}
                      >
                        {area.description}
                      </p>
                    </div>
                  </article>
                </StaggerItem>
              )
            })}
          </Stagger>
        </section>

        <SectionRule />

        {/* ── Projects ─────────────────────────────────────────── */}
        <section className="py-12 sm:py-16 lg:py-20">
          <Reveal>
            <SectionHeader
              index="04"
              label="Ecosystem"
              title={PROJECTS.title}
              description={PROJECTS.intro}
            />
          </Reveal>

          <Stagger
            className="mt-8 grid gap-4 sm:mt-12 md:grid-cols-2 lg:grid-cols-3"
            staggerDelay={0.1}
          >
            {PROJECTS.items.map((project, index) => {
              const accent =
                PRODUCT_ACCENTS[project.id as keyof typeof PRODUCT_ACCENTS]
              const ProductIcon = PROJECT_ICONS[project.id]
              const isExternal = project.href.startsWith("http")

              return (
                <StaggerItem key={project.id} className="h-full">
                  <Link
                    href={project.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="group block h-full"
                  >
                    <article
                      className={cn(
                        "relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/2 p-6 backdrop-blur-sm transition-all duration-500 hover:border-white/15 sm:p-7",
                        accent.rail,
                        "border-l-2 border-l-transparent",
                      )}
                    >
                      <div
                        className={cn(
                          "pointer-events-none absolute inset-0 bg-linear-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                          accent.glow,
                        )}
                      />

                      <ProductIcon
                        className={cn(
                          "pointer-events-none absolute -bottom-7 -right-5 size-36 opacity-[0.06] transition-all duration-700 group-hover:scale-105 group-hover:opacity-[0.1]",
                          accent.icon,
                        )}
                        strokeWidth={1}
                      />

                      <div className="relative flex items-start justify-between gap-4">
                        <div
                          className={cn(
                            "flex size-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-500",
                            "group-hover:scale-110 group-hover:shadow-[0_0_24px_-4px] group-hover:shadow-current/20",
                            accent.border,
                            accent.bg,
                            accent.icon,
                          )}
                        >
                          <ProductIcon className="size-5" strokeWidth={1.5} />
                        </div>
                        <span
                          className={cn(
                            "font-mono text-xs tracking-widest text-white/25 transition-colors duration-300",
                            accent.index,
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="relative mt-6 flex-1">
                        <h3
                          className={cn(
                            "font-heading text-lg font-medium text-white transition-colors duration-300 sm:text-xl",
                            accent.title,
                          )}
                        >
                          {project.name}
                        </h3>
                        <p className="section-description mt-2.5">
                          {project.description}
                        </p>
                      </div>

                      <span
                        className={cn(
                          "relative mt-6 inline-flex items-center gap-2 border-t border-white/6 pt-4 text-xs font-medium uppercase tracking-[0.18em] text-white/30 transition-all duration-300",
                          accent.link,
                        )}
                      >
                        {isExternal ? "Visit" : "Explore"}
                        <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </article>
                  </Link>
                </StaggerItem>
              )
            })}
          </Stagger>
        </section>

        <SectionRule />

        {/* ── Leadership ───────────────────────────────────────── */}
        <section className="py-12 sm:py-16 lg:py-20">
          <Reveal>
            <SectionHeader
              index="05"
              label="Leadership"
              title={LEADERSHIP.title}
              description={LEADERSHIP.intro}
            />
          </Reveal>

          <Stagger className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 lg:grid-cols-2" staggerDelay={0.1}>
            {LEADERSHIP.directors.map((director) => (
              <StaggerItem key={director.name}>
                <SpotlightCard className="p-5 sm:p-8">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <DirectorPhoto name={director.name} image={director.image} />
                    <div className="min-w-0">
                      <h3 className="font-heading text-xl text-white">
                        {director.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/45">
                        {director.title}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4 border-t border-white/6 pt-6">
                    {director.bio.map((paragraph) => (
                      <p key={paragraph.slice(0, 32)} className="body-copy">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-white/6 pt-6">
                    <p className="section-eyebrow">Areas of Focus</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {director.focusAreas.map((area) => (
                        <li
                          key={area}
                          className="rounded-full border border-white/8 bg-white/3 px-3 py-1 text-xs text-white/55 transition-colors hover:border-white/15 hover:text-white/75"
                        >
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <SectionRule />

        {/* ── Values ───────────────────────────────────────────── */}
        <section className="py-12 sm:py-20 lg:py-28">
          <div className="grid gap-10 sm:gap-16 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-24 xl:gap-28">
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <p className="section-eyebrow">06 — Principles</p>
                <h2 className="mt-4 text-balance text-white">{VALUES.title}</h2>
                <p className="section-description mt-4 max-w-xs leading-relaxed sm:mt-6">
                  {VALUES.intro}
                </p>
                <div className="mt-8 flex items-baseline gap-4 sm:mt-12">
                  <span className="font-heading text-4xl text-white/90 sm:text-5xl lg:text-6xl">
                    05
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] text-white/35">
                    Core
                    <br />
                    Principles
                  </span>
                </div>
              </div>
            </Reveal>

            <Stagger className="relative min-w-0 lg:py-2" staggerDelay={0.08}>
              <div
                aria-hidden
                className="absolute bottom-8 left-6 top-8 hidden w-px bg-linear-to-b from-transparent via-white/12 to-transparent sm:left-8 sm:block"
              />

              <ol className="space-y-0">
                {VALUES.items.map((value, index) => {
                  const Icon = VALUE_ICONS[value.id]

                  return (
                    <StaggerItem key={value.id}>
                      <li className="group relative grid grid-cols-[2.75rem_1fr] gap-4 pb-10 last:pb-0 sm:grid-cols-[3.5rem_1fr] sm:gap-6 sm:pb-14 md:grid-cols-[4rem_1fr] md:gap-10 md:pb-20">
                        <div className="relative flex justify-center pt-1">
                          <div className="z-10 flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-background text-cosmic transition-all duration-500 group-hover:scale-105 group-hover:border-cosmic/35 group-hover:shadow-[0_0_28px_-6px_rgba(255,255,255,0.25)] sm:size-14 md:size-16">
                            <Icon className="size-4 sm:size-5" strokeWidth={1.5} />
                          </div>
                        </div>

                        <div className="relative min-w-0 pb-2 sm:pb-4 md:pb-6">
                          <span className="pointer-events-none absolute -top-2 right-0 hidden font-heading text-5xl leading-none text-white/3 transition-colors duration-500 group-hover:text-white/6 sm:-top-4 sm:block sm:text-6xl md:-top-6 md:text-7xl lg:text-8xl">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="relative flex items-center gap-4">
                            <span className="font-mono text-[0.65rem] tracking-[0.2em] text-white/30">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <div className="h-px flex-1 bg-linear-to-r from-white/10 to-transparent" />
                          </div>
                          <h3 className="mt-4 font-heading text-base text-white transition-colors duration-300 group-hover:text-cosmic sm:mt-5 sm:text-lg md:mt-6 md:text-xl lg:text-2xl">
                            {value.name}
                          </h3>
                          <p className="section-description mt-4 max-w-2xl text-sm leading-relaxed sm:mt-5 sm:text-base">
                            {value.description}
                          </p>
                        </div>
                      </li>
                    </StaggerItem>
                  )
                })}
              </ol>
            </Stagger>
          </div>
        </section>

        <SectionRule />

        {/* ── Closing ──────────────────────────────────────────── */}
        <section className="py-12 sm:py-16 lg:py-20">
          <Reveal>
            <SpotlightCard glow="neutral" className="p-6 sm:p-10 lg:p-14">
              <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3">
                    <Globe2 className="size-4 text-cosmic/80" strokeWidth={1.5} />
                    <p className="section-eyebrow">Origin</p>
                  </div>
                  <h2 className="mt-4 text-balance text-white sm:text-3xl lg:text-4xl">
                    {CLOSING.title}
                  </h2>
                </div>
                <div className="max-w-xl space-y-4 lg:text-right">
                  {CLOSING.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)} className="body-copy">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        </section>

        <SectionRule />

        <ContactSection variant="full" className="py-12 sm:py-16 lg:py-20" />

        <SectionRule />

        {/* ── CTA ──────────────────────────────────────────────── */}
        <Reveal className="w-full py-12 sm:py-16 lg:py-20">
          <SpotlightCard
            glow="cyan"
            className="w-full p-6 sm:p-8 lg:flex lg:items-end lg:justify-between lg:gap-12 lg:p-10"
          >
            <div className="min-w-0">
              <p className="section-eyebrow">Next</p>
              <h2 className="mt-3 text-balance text-white">Explore Our Work</h2>
              <p className="section-description mt-3 max-w-md">
                Discover the projects, platforms, and research shaping
                Harcorp&apos;s long-term innovation roadmap.
              </p>
            </div>

            <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap lg:mt-0 lg:w-auto lg:justify-end">
              <Link href="/#projects" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
                >
                  View Projects
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <a href={CONTACT_MAILTO} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full cursor-pointer border-white/20 text-white transition-transform duration-300 hover:scale-[1.02] hover:bg-white/10 active:scale-[0.98] sm:w-auto"
                >
                  Contact Us
                </Button>
              </a>
              <Link
                href="https://harcorp.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full cursor-pointer border-white/20 text-white transition-transform duration-300 hover:scale-[1.02] hover:bg-white/10 active:scale-[0.98] sm:w-auto"
                >
                  Visit Harcorp.AI
                  <ArrowUpRight className="size-4" />
                </Button>
              </Link>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </div>
  )
}
