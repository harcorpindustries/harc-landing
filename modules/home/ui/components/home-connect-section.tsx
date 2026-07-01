import { ContactSection } from "@/components/contact-section"
import { AboutPreview } from "./about-preview"
import { FocusAreas } from "./focus-areas"
import { News } from "./news"
import { Products } from "./products"

export const HomeConnectSection = () => {
  return (
    <div className="page-container w-full space-y-28 pb-20 pt-4 sm:space-y-32 sm:pb-24">
      <AboutPreview />
      <Products />
      <FocusAreas />
      <News />
      <ContactSection />
    </div>
  )
}
