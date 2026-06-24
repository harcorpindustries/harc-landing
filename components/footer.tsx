import Image from "next/image"
import Link from "next/link"
import { SOCIAL_LINKS } from "@/constants"
import { FooterNewsletter } from "@/components/footer-newsletter"
import { cn } from "@/lib/utils"

export const Footer = () => {
  return (
    <footer className="relative mt-8 border-t border-white/6 pt-16 pb-10">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-cosmic/40 to-transparent sm:inset-x-8" />

      <div className="page-container">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
          <div className="flex flex-col gap-6">
            <Link href="/" className="w-fit">
              <Image
                src="/logo.png"
                alt="Harcorp Industries"
                width={120}
                height={120}
                className="h-auto w-28 opacity-90"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-white/40">
              Engineering intelligence and matter to shape a future beyond limits.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    "inline-flex size-9 items-center justify-center rounded-full border border-white/8 text-white/40 transition-all duration-300",
                    "hover:border-cosmic/35 hover:bg-cosmic/8 hover:text-white",
                  )}
                >
                  <social.icon className="size-3.5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 md:items-end md:text-right">
            <div className="md:max-w-md">
              <p className="section-eyebrow">
                Newsletter
              </p>
              <h3 className="mt-2 font-heading text-lg text-white">
                Stay in the Loop
              </h3>
              <p className="section-description mt-2">
                Get the latest updates and announcements delivered to your inbox.
              </p>
            </div>
            <div className="w-full md:max-w-md">
              <FooterNewsletter />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/6 pt-8 text-sm text-white/35 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Harcorp Industries. All rights reserved.</p>
          <nav className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <span className="text-white/15">·</span>
            <Link
              href="/terms"
              className="transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
