import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type SectionHeaderProps = {
  index?: string
  label: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function SectionHeader({
  index,
  label,
  title,
  description,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-3xl">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.28em] text-white/35">
          {index ? `${index} — ${label}` : label}
        </p>
        <h2 className="mt-3 text-balance text-white">{title}</h2>
      </div>

      {action ?? (description ? (
        <p className="min-w-0 max-w-md text-sm leading-relaxed text-white/45 md:text-right">
          {description}
        </p>
      ) : null)}
    </div>
  )
}
