"use client"

import { motion, useReducedMotion } from "framer-motion"
import type { ReactNode } from "react"
import { EASE_OUT, fadeUp, viewport } from "@/lib/motion"

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
}

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.65,
  y = 24,
}: RevealProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}

type StaggerProps = {
  children: ReactNode
  className?: string
  staggerDelay?: number
  delayChildren?: number
}

export function Stagger({
  children,
  className,
  staggerDelay = 0.08,
  delayChildren = 0.05,
}: StaggerProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

type StaggerItemProps = {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}
