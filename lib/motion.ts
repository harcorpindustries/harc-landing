export const EASE_OUT = [0.22, 1, 0.36, 1] as const

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
}

export const slideDown = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0 },
}

export const lineReveal = {
  hidden: { opacity: 0, y: "110%" },
  visible: { opacity: 1, y: 0 },
}

export const stagger = (delay = 0.08, delayChildren = 0.1) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: delay,
      delayChildren,
    },
  },
})

export const viewport = {
  once: true,
  margin: "-60px" as const,
}
