import { SiteHeader } from "@/components/layout/SiteHeader"
import { SiteFooter } from "@/components/layout/SiteFooter"
import { HeroSection } from "@/components/landing/HeroSection"
import { AboutSection, StatsSection } from "@/components/landing/AboutSection"
import { SegmentsSection } from "@/components/landing/SegmentsSection"
import { SolutionsSection } from "@/components/landing/SolutionsSection"
import { SuccessStoriesSection } from "@/components/landing/SuccessStoriesSection"
import { LoadBoardPreviewSection } from "@/components/landing/LoadBoardPreviewSection"
import {
  CtaSection,
  LoadsConvenienceSection,
} from "@/components/landing/LoadBoardSection"

export default function Page() {
  return (
    <div className="min-h-svh bg-white">
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <SegmentsSection />
        <SolutionsSection />
        <SuccessStoriesSection />
        <LoadBoardPreviewSection />
        <LoadsConvenienceSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}
