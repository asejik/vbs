import { HeroSection, VisionSection, ExpectSection, HomeGallerySection, CTABanner } from './components'
import { WaveDivider } from '../../shared/ui'

/**
 * Landing Page — Assembles all landing sections with wave dividers between them.
 * Each section is independently scroll-revealed for a premium feel.
 */
export function LandingPage() {
  return (
    <main id="landing-page">
      <HeroSection />
      <WaveDivider fillTop="#FFFDF7" fillBottom="#FFFFFF" />
      <VisionSection />
      <WaveDivider fillTop="#FFFFFF" fillBottom="#FFFDF7" />
      <ExpectSection />
      <HomeGallerySection />
      <CTABanner />
    </main>
  )
}
