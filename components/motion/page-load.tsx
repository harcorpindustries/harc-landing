"use client"

import { motion, useReducedMotion } from "framer-motion"
import { EASE_OUT } from "@/lib/motion"

type PageLoadProps = {
  children: React.ReactNode
  className?: string
}

export function PageLoad({ children, className }: PageLoadProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}
