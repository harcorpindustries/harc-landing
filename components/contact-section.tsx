"use client"

import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"
import { Reveal } from "@/components/motion/reveal"
import { CONTACT_COMPACT, CONTACT_FULL } from "@/modules/contact/content"
import { cn } from "@/lib/utils"

type ContactSectionProps = {
  variant?: "compact" | "full"
  className?: string
}

export function ContactSection({
  variant = "compact",
  className,
}: ContactSectionProps) {
  const isFull = variant === "full"
  const content = isFull ? CONTACT_FULL : CONTACT_COMPACT

  return (
    <section
      id="contact"
      className={cn("relative w-full scroll-mt-24", className)}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

      <Reveal>
        {isFull ? (
          <SectionHeader
            index="07"
            label="Contact"
            title={content.heading}
            description={CONTACT_FULL.subheading}
          />
        ) : (
          <SectionHeader index="04" label="Contact" title={content.heading} />
        )}
      </Reveal>

      <Reveal delay={0.08} className="mt-8 sm:mt-10">
        <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/2 p-6 backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-cyan-500/6 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 size-48 rounded-full bg-violet-500/6 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
            <div className="min-w-0 space-y-4">
              {isFull ? (
                <>
                  {CONTACT_FULL.description.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)} className="body-copy">
                      {paragraph}
                    </p>
                  ))}
                  <p className="section-description max-w-2xl">
                    {CONTACT_FULL.supportingText}
                  </p>
                </>
              ) : (
                <p className="body-copy max-w-2xl">{content.description}</p>
              )}

              {isFull ? (
                <a
                  href={CONTACT_FULL.ctaLink}
                  className="group inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/3 px-4 py-3 transition-colors hover:border-white/20 hover:bg-white/5"
                >
                  <span className="flex size-10 items-center justify-center rounded-lg border border-cyan-500/25 bg-cyan-500/10 text-cyan-300">
                    <Mail className="size-4" strokeWidth={1.5} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-white/35">
                      Contact Email
                    </span>
                    <span className="font-heading text-sm text-white transition-colors group-hover:text-cyan-200 sm:text-base">
                      {CONTACT_FULL.email}
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto size-4 shrink-0 text-white/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
                </a>
              ) : null}
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row lg:justify-end">
              <a href={content.ctaLink} className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
                >
                  {content.cta}
                  <ArrowUpRight className="ml-2 size-4" />
                </Button>
              </a>
              {isFull ? (
                <Link href="/#projects" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full cursor-pointer border-white/20 text-white transition-transform duration-300 hover:scale-[1.02] hover:bg-white/10 active:scale-[0.98] sm:w-auto"
                  >
                    View Projects
                  </Button>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
