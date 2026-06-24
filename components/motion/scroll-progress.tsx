"use client"

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion"

export function ScrollProgress() {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  })

  if (reduced) return null

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-linear-to-r from-zinc-500/30 via-silver to-white/90 shadow-[0_0_14px_0px_rgba(210,218,230,0.35)]"
      aria-hidden
    />
  )
}
