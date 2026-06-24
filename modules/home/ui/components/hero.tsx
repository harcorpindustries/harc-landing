"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Rocket, ArrowRight } from "lucide-react"
import ThreeDElement from "@/components/three-d-element"
import { FadeInText, TextReveal } from "@/components/motion/text-reveal"
import { EASE_OUT } from "@/lib/motion"

const HEADLINE = [
  "Altering The Future",
  "From The Point To",
  "The Superstructure",
]

export const Hero = () => {
  const reduced = useReducedMotion()

  return (
    <section className="page-container grid w-full grid-cols-1 items-center gap-6 overflow-visible pb-10 pt-16 sm:pb-12 sm:pt-20 md:min-h-[calc(100dvh-5rem)] lg:grid-cols-[minmax(0,38rem)_minmax(0,1fr)] lg:gap-6 lg:pt-10 xl:grid-cols-[minmax(0,42rem)_minmax(0,1.15fr)] xl:gap-8">
      <div className="flex w-full flex-col gap-y-4 text-white mt-10 md:mt-0">
        <FadeInText className="section-eyebrow" delay={0.05}>
          Research • Intelligence • Matter • Civilization
        </FadeInText>

        <h1 className="max-w-4xl text-[2rem] leading-[1.08] text-balance sm:text-4xl md:text-[2.75rem] lg:text-5xl xl:text-6xl">
          <TextReveal lines={HEADLINE} delay={0.12} stagger={0.11} />
        </h1>

        <FadeInText
          className="max-w-2xl text-lg font-medium leading-snug tracking-tight text-white/85 sm:text-xl lg:text-2xl"
          delay={0.48}
        >
          Building Artificial Super Intelligence & Matter.
        </FadeInText>

        <FadeInText className="body-copy max-w-2xl" delay={0.58}>
          Harcorp Industries is a multi-disciplinary innovation company driving
          breakthroughs across AI, quantum computing, materials, and advanced
          technologies. We engineer intelligence and matter to solve humanity’s
          hardest challenges and shape a future beyond limits.
        </FadeInText>

        <motion.div
          className="flex flex-wrap items-center gap-3 pt-1"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.72, ease: EASE_OUT }}
        >
          <Link href="/about">
            <Button
              className="cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              size="lg"
            >
              <Rocket className="mr-2 size-4" />
              Explore Harcorp.ai
            </Button>
          </Link>
          <Link href="/#projects">
            <Button
              variant="outline"
              className="cursor-pointer border-white text-white transition-transform duration-300 hover:scale-[1.02] hover:bg-white/10 active:scale-[0.98]"
              size="lg"
            >
              View Projects
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="relative hidden min-h-[32rem] w-full items-center justify-center md:flex lg:min-h-[34rem] xl:min-h-[36rem]"
        initial={reduced ? false : { opacity: 0, scale: 0.96, x: 24 }}
        animate={reduced ? undefined : { opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.25, ease: EASE_OUT }}
      >
        <ThreeDElement />
      </motion.div>
    </section>
  )
}
