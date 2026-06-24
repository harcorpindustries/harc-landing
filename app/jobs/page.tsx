import type { Metadata } from "next"
import { JobsView } from "@/modules/jobs/ui/views/jobs-view"

export const metadata: Metadata = {
  title: "Jobs — Harcorp Industries",
  description:
    "Join Harcorp Industries and help build frontier technologies across AI, software, communication systems, material science, and advanced R&D from Gurugram, India.",
}

export default function JobsPage() {
  return <JobsView />
}
