"use client"

import { motion, useReducedMotion } from "framer-motion"
import { EASE_OUT } from "@/lib/motion"

type TextRevealProps = {
  lines: string[]
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
}

export function TextReveal({
  lines,
  className,
  lineClassName,
  delay = 0.1,
  stagger = 0.1,
}: TextRevealProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <span className={className}>
        {lines.map((line) => (
          <span key={line} className={`block ${lineClassName ?? ""}`}>
            {line}
          </span>
        ))}
      </span>
    )
  }

  return (
    <span className={className} aria-label={lines.join(" ")}>
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={{ opacity: 0, y: "110%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: delay + index * stagger,
              ease: EASE_OUT,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

type FadeInTextProps = {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function FadeInText({ children, className, delay = 0 }: FadeInTextProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <span className={className}>{children}</span>
  }

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.span>
  )
}
