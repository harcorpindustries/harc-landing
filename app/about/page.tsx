import type { Metadata } from "next"
import { AboutView } from "@/modules/about/ui/views/about-view"

export const metadata: Metadata = {
  title: "About — Harcorp Industries",
  description:
    "Harcorp Industries is a multidisciplinary deep-tech company building frontier technologies across artificial intelligence, software systems, communication, and material science.",
}

export default function AboutPage() {
  return <AboutView />
}
