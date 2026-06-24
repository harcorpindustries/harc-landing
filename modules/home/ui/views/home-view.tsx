import { PageLoad } from "@/components/motion/page-load"
import { HomeConnectSection } from "../components/home-connect-section"
import { Hero } from "../components/hero"

export const HomeView = () => {
  return (
    <PageLoad className="relative w-full overflow-x-hidden">
      <Hero />
      <HomeConnectSection />
    </PageLoad>
  )
}
