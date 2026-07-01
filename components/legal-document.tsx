import type { ReactNode } from "react"
import { PageLoad } from "@/components/motion/page-load"

type LegalSection = {
  title: string
  content: ReactNode
}

type LegalDocumentProps = {
  title: string
  company: string
  effectiveDate: string
  intro: ReactNode
  sections: LegalSection[]
  contact: ReactNode
  closing?: ReactNode
}

export function LegalDocument({
  title,
  company,
  effectiveDate,
  intro,
  sections,
  contact,
  closing,
}: LegalDocumentProps) {
  return (
    <PageLoad className="page-container pb-20 pt-24 sm:pb-28 sm:pt-32">
      <header className="max-w-3xl border-b border-white/8 pb-10">
        <p className="section-eyebrow">Legal</p>
        <h1 className="mt-4 text-balance text-white">{title}</h1>
        <p className="mt-3 font-heading text-lg text-white/80">{company}</p>
        <p className="section-description mt-2">
          Effective Date: {effectiveDate}
        </p>
      </header>

      <div className="prose-legal mt-10 max-w-3xl space-y-10">
        <div className="body-copy space-y-4">{intro}</div>

        <ol className="space-y-10">
          {sections.map((section, index) => (
            <li key={section.title} className="space-y-4">
              <h2 className="font-heading text-xl text-white">
                {index + 1}. {section.title}
              </h2>
              <div className="body-copy space-y-4">{section.content}</div>
            </li>
          ))}
        </ol>

        <section className="space-y-4 border-t border-white/8 pt-10">
          <h2 className="font-heading text-xl text-white">
            {sections.length + 1}. Contact Us
          </h2>
          <div className="body-copy space-y-4">{contact}</div>
        </section>

        {closing ? (
          <div className="body-copy space-y-4 border-t border-white/8 pt-10 text-white/55">
            {closing}
          </div>
        ) : null}
      </div>
    </PageLoad>
  )
}
