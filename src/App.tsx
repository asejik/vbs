import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './shared/ui/Header'
import { Footer } from './shared/ui/Footer'
import { LandingPage } from './features/landing'

/**
 * GalleryPage is lazy-loaded to keep the initial bundle lean.
 * ai_context rule: enforce lazy loading (especially the Gallery).
 */
const GalleryPage = lazy(() =>
  import('./features/gallery').then((m) => ({ default: m.GalleryPage })),
)

const RegistrationPage = lazy(() =>
  import('./features/registration').then((m) => ({ default: m.RegistrationPage })),
)

/**
 * Page-level skeleton while lazy chunk loads.
 * Keeps the header/footer in place so layout doesn't jump.
 */
function PageSkeleton() {
  return (
    <div className="min-h-screen bg-cream animate-pulse">
      <div className="h-64 bg-gradient-to-br from-grape/30 to-bubblegum/20 rounded-b-3xl" />
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bg-slate-200 rounded-2xl aspect-square" />
        ))}
      </div>
    </div>
  )
}

import { PrivacyPage } from './features/landing/PrivacyPage'

/**
 * Root application layout with global Header + Footer.
 */
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 pt-16">
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}

export default App
