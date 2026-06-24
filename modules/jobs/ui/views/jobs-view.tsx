"use client"

import { type ReactNode, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Briefcase,
  Building2,
  ChevronDown,
  FlaskConical,
  Globe2,
  MapPin,
  Rocket,
  Send,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal"
import { FadeInText, TextReveal } from "@/components/motion/text-reveal"
import { cn } from "@/lib/utils"
import {
  APPLICATION_EMAIL,
  APPLICATION_SUBJECT,
  buildRoleMailto,
  FINAL_CTA,
  HIRING_PHILOSOPHY,
  JOBS_HERO,
  NO_SUITABLE_ROLE,
  OPEN_ROLES,
  WHO_WE_LOOK_FOR,
  WHY_JOIN,
  WORK_CULTURE,
} from "@/modules/jobs/content"
import { ApplicationForm } from "@/modules/jobs/ui/components/application-form"

const WHY_JOIN_ICONS = {
  frontier: Rocket,
  research: FlaskConical,
  gurugram: Building2,
  ownership: Target,
} as const

const PHILOSOPHY_ICONS = [Sparkles, Zap, Target, Briefcase, Users, Globe2] as const

function JobsAmbient() {
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

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
}

function ProfileMailtoButton({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const href = `mailto:${APPLICATION_EMAIL}?subject=${encodeURIComponent(APPLICATION_SUBJECT)}`

  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

export function JobsView() {
  return (
    <div className="relative overflow-x-clip">
      <JobsAmbient />

      <div className="page-container pb-20 pt-24 sm:pb-28 sm:pt-32">
        {/* Hero */}
        <header className="relative grid min-w-0 items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
          <div className="min-w-0">
            <FadeInText delay={0.05}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white/55 backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-cosmic shadow-[0_0_10px_2px] shadow-cosmic/50" />
                {JOBS_HERO.eyebrow}
              </span>
            </FadeInText>

            <h1 className="mt-6 text-balance text-[2rem] leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              <TextReveal
                lines={[JOBS_HERO.title]}
                delay={0.12}
                stagger={0.1}
                lineClassName="bg-linear-to-br from-white via-white to-white/55 bg-clip-text text-transparent"
              />
            </h1>

            <FadeInText
              className="mt-6 block max-w-xl text-lg font-medium leading-snug tracking-tight text-white/85 sm:text-xl"
              delay={0.42}
            >
              {JOBS_HERO.subheading}
            </FadeInText>

            <FadeInText className="mt-6 block max-w-xl body-copy" delay={0.54}>
              {JOBS_HERO.description}
            </FadeInText>

            <motion.div
              className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button
                size="lg"
                className="w-full cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
                onClick={() => scrollToId("open-roles")}
              >
                View Open Roles
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full cursor-pointer border-white/20 text-white transition-transform duration-300 hover:scale-[1.02] hover:bg-white/10 active:scale-[0.98] sm:w-auto"
                onClick={() => scrollToId("application-form")}
              >
                Send Your Profile
                <Send className="ml-2 size-4" />
              </Button>
            </motion.div>
          </div>

          <Reveal delay={0.3} y={28} className="min-w-0">
            <SpotlightCard glow="violet" className="p-6 sm:p-8">
              <p className="section-eyebrow">Hiring Snapshot</p>
              <dl className="mt-6 space-y-5">
                {[
                  { label: "Location", value: "Gurugram, India" },
                  { label: "Work Mode", value: "On-site" },
                  { label: "Open Roles", value: String(OPEN_ROLES.roles.length) },
                  { label: "Stage", value: "Core Team Build" },
                ].map((item) => (
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

        <div className="mt-16 sm:mt-24 lg:mt-28">
          <SectionRule />
        </div>

        {/* Why Join */}
        <section className="py-12 sm:py-16 lg:py-20">
          <Reveal>
            <SectionHeader index="01" label="Opportunity" title={WHY_JOIN.title} />
          </Reveal>

          <Stagger className="mt-6 grid gap-4 sm:mt-8 lg:grid-cols-2" staggerDelay={0.06}>
            {WHY_JOIN.intro.map((paragraph) => (
              <StaggerItem key={paragraph.slice(0, 32)}>
                <p className="body-copy">{paragraph}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Stagger
            className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2"
            staggerDelay={0.08}
          >
            {WHY_JOIN.cards.map((card, index) => {
              const Icon = WHY_JOIN_ICONS[card.id]
              const glow = index % 2 === 0 ? "violet" : "cyan"

              return (
                <StaggerItem key={card.id}>
                  <SpotlightCard glow={glow} className="h-full p-6 sm:p-7">
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-xl border",
                          glow === "violet"
                            ? "border-violet-500/25 bg-violet-500/10 text-violet-300"
                            : "border-cyan-500/25 bg-cyan-500/10 text-cyan-300",
                        )}
                      >
                        <Icon className="size-4" strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-heading text-lg text-white">{card.title}</h3>
                        <p className="body-copy mt-3">{card.description}</p>
                      </div>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              )
            })}
          </Stagger>
        </section>

        <SectionRule />

        {/* Who We Are Looking For */}
        <section className="py-12 sm:py-16 lg:py-20">
          <Reveal>
            <SectionHeader
              index="02"
              label="People"
              title={WHO_WE_LOOK_FOR.title}
              description={WHO_WE_LOOK_FOR.intro}
            />
          </Reveal>

          <Reveal delay={0.08} className="mt-8 sm:mt-10">
            <SpotlightCard glow="neutral" className="p-6 sm:p-8">
              <p className="section-description">{WHO_WE_LOOK_FOR.traitsLabel}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {WHO_WE_LOOK_FOR.traits.map((trait) => (
                  <li
                    key={trait}
                    className="flex gap-3 text-sm leading-relaxed text-white/60"
                  >
                    <Sparkles className="mt-0.5 size-3.5 shrink-0 text-violet-400/70" />
                    {trait}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        </section>

        <SectionRule />

        {/* Open Roles */}
        <section id="open-roles" className="scroll-mt-28 py-12 sm:py-16 lg:py-20">
          <Reveal>
            <SectionHeader
              index="03"
              label="Positions"
              title={OPEN_ROLES.title}
              description={`${OPEN_ROLES.intro} ${OPEN_ROLES.locationNote}`}
            />
          </Reveal>

          <Stagger className="mt-8 space-y-4 sm:mt-10" staggerDelay={0.1}>
            {OPEN_ROLES.roles.map((role) => (
              <StaggerItem key={role.id}>
                <article className="group overflow-hidden rounded-2xl border border-white/8 bg-white/2 backdrop-blur-sm transition-colors duration-500 hover:border-white/15">
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-0.5 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-violet-300">
                            {role.type}
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/4 px-2.5 py-0.5 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-white/45">
                            {role.workMode}
                          </span>
                        </div>

                        <h3 className="mt-4 font-heading text-xl text-white sm:text-2xl">
                          {role.title}
                        </h3>
                        <p className="section-description mt-2">{role.department}</p>

                        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/50">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="size-3.5 text-cosmic/70" />
                            {role.location}
                          </span>
                        </div>

                        <p className="body-copy mt-5 max-w-3xl">{role.description}</p>
                      </div>

                      <a
                        href={buildRoleMailto(role.title)}
                        className="w-full shrink-0 sm:w-auto"
                      >
                        <Button
                          size="lg"
                          className="w-full cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
                        >
                          Apply Now
                          <ArrowRight className="size-4" />
                        </Button>
                      </a>
                    </div>

                    <details className="group/details mt-6 border-t border-white/6 pt-5">
                      <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white [&::-webkit-details-marker]:hidden">
                        <ChevronDown className="size-4 transition-transform duration-300 group-open/details:rotate-180" />
                        View responsibilities & preferred skills
                      </summary>

                      <div className="mt-5 grid gap-6 sm:grid-cols-2">
                        <div>
                          <p className="section-eyebrow">Responsibilities</p>
                          <ul className="mt-4 space-y-2.5">
                            {role.responsibilities.map((item) => (
                              <li
                                key={item}
                                className="flex gap-2.5 text-sm leading-relaxed text-white/55"
                              >
                                <span className="mt-2 size-1 shrink-0 rounded-full bg-violet-400/60" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="section-eyebrow">Preferred Skills</p>
                          <ul className="mt-4 space-y-2.5">
                            {role.preferredSkills.map((item) => (
                              <li
                                key={item}
                                className="flex gap-2.5 text-sm leading-relaxed text-white/55"
                              >
                                <span className="mt-2 size-1 shrink-0 rounded-full bg-cyan-400/60" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </details>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        <SectionRule />

        {/* No Suitable Role */}
        <section className="py-12 sm:py-16 lg:py-20">
          <Reveal>
            <SpotlightCard glow="cyan" className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="section-eyebrow">Open Application</p>
                  <h2 className="mt-3 text-balance text-white">{NO_SUITABLE_ROLE.title}</h2>
                  <p className="body-copy mt-4">{NO_SUITABLE_ROLE.content}</p>
                </div>
                <ProfileMailtoButton className="w-full shrink-0 lg:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full cursor-pointer border-white/20 text-white transition-transform duration-300 hover:scale-[1.02] hover:bg-white/10 active:scale-[0.98] lg:w-auto"
                  >
                    Send Your Profile
                    <Send className="size-4" />
                  </Button>
                </ProfileMailtoButton>
              </div>
            </SpotlightCard>
          </Reveal>
        </section>

        <SectionRule />

        {/* Application Form */}
        <section
          id="application-form"
          className="scroll-mt-28 py-12 sm:py-16 lg:py-20"
        >
          <Reveal>
            <SectionHeader
              index="04"
              label="Apply"
              title="Send Your Profile"
              description="Complete the form below to start your application. Your email client will open with your details pre-filled."
            />
          </Reveal>

          <Reveal delay={0.08} className="mt-8 sm:mt-10">
            <SpotlightCard glow="violet" className="p-6 sm:p-8 lg:p-10">
              <ApplicationForm />
            </SpotlightCard>
          </Reveal>
        </section>

        <SectionRule />

        {/* Hiring Philosophy */}
        <section className="py-12 sm:py-16 lg:py-20">
          <Reveal>
            <SectionHeader
              index="05"
              label="Philosophy"
              title={HIRING_PHILOSOPHY.title}
              description={HIRING_PHILOSOPHY.intro}
            />
          </Reveal>

          <Stagger className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.06}>
            {HIRING_PHILOSOPHY.values.map((value, index) => {
              const Icon = PHILOSOPHY_ICONS[index % PHILOSOPHY_ICONS.length]

              return (
                <StaggerItem key={value}>
                  <div className="flex h-full items-start gap-3 rounded-xl border border-white/8 bg-white/2 p-4 backdrop-blur-sm transition-colors duration-300 hover:border-white/14">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/4 text-cosmic">
                      <Icon className="size-3.5" strokeWidth={1.5} />
                    </div>
                    <p className="text-sm leading-relaxed text-white/65">{value}</p>
                  </div>
                </StaggerItem>
              )
            })}
          </Stagger>

          <Reveal delay={0.1} className="mt-8">
            <p className="body-copy max-w-3xl">{HIRING_PHILOSOPHY.closing}</p>
          </Reveal>
        </section>

        <SectionRule />

        {/* Work Culture */}
        <section className="py-12 sm:py-16 lg:py-20">
          <Reveal>
            <SectionHeader index="06" label="Culture" title={WORK_CULTURE.title} />
          </Reveal>

          <Stagger className="mt-8 grid gap-4 sm:mt-10 lg:grid-cols-3" staggerDelay={0.08}>
            {WORK_CULTURE.paragraphs.map((paragraph, index) => (
              <StaggerItem key={paragraph.slice(0, 32)}>
                <SpotlightCard
                  glow={index === 1 ? "cyan" : "neutral"}
                  className="h-full p-6 sm:p-7"
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

        {/* Final CTA */}
        <Reveal className="w-full py-12 sm:py-16 lg:py-20">
          <SpotlightCard
            glow="cyan"
            className="w-full p-6 sm:p-8 lg:flex lg:items-end lg:justify-between lg:gap-12 lg:p-10"
          >
            <div className="min-w-0">
              <p className="section-eyebrow">Join Us</p>
              <h2 className="mt-3 text-balance text-white">{FINAL_CTA.title}</h2>
              <p className="section-description mt-3 max-w-md">{FINAL_CTA.content}</p>
            </div>

            <div className="mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap lg:mt-0 lg:w-auto lg:justify-end">
              <Button
                size="lg"
                className="w-full cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
                onClick={() => scrollToId("open-roles")}
              >
                View Open Roles
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full cursor-pointer border-white/20 text-white transition-transform duration-300 hover:scale-[1.02] hover:bg-white/10 active:scale-[0.98] sm:w-auto"
                onClick={() => scrollToId("application-form")}
              >
                Send Your Profile
                <Send className="size-4" />
              </Button>
              <Link href="/about" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full cursor-pointer border-white/20 text-white transition-transform duration-300 hover:scale-[1.02] hover:bg-white/10 active:scale-[0.98] sm:w-auto"
                >
                  About Harcorp
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </div>
  )
}
