import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Camera, Images } from 'lucide-react'
import { CategoryFilter, MasonryGrid } from './components'
import { GALLERY_ITEMS } from './galleryData'
import type { GalleryCategory } from './galleryData'
import { SectionReveal, Button } from '../../shared/ui'

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All')
  const [displayCount, setDisplayCount] = useState(12)

  const handleCategoryChange = useCallback((cat: GalleryCategory) => {
    setActiveCategory(cat)
    setDisplayCount(12) // Reset count on category change
  }, [])

  const handleLoadMore = () => setDisplayCount(prev => prev + 12)

  const filteredItems = activeCategory === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(img => img.category === activeCategory)

  const items = filteredItems.slice(0, displayCount)
  const totalItems = filteredItems.length
  const hasMore = displayCount < totalItems

  return (
    <main id="gallery-page" className="min-h-screen bg-cream">
      {/* ── Hero Banner ── */}
      <section className="relative py-20 sm:py-28 overflow-hidden bg-gradient-to-br from-grape via-bubblegum to-coral">
        <div className="absolute inset-0 opacity-10 bg-confetti" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <motion.div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm mb-6 mx-auto">
            <Camera className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 leading-tight">
            Memories That Last
            <br />
            <span className="text-sunshine">A Lifetime ✨</span>
          </motion.h1>
          <motion.p className="text-white/80 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Relive the best moments from VBS 2025. Browse highlights from every
            part of the week!
          </motion.p>
          <motion.div className="flex items-center justify-center gap-2 text-white/60 text-sm font-medium">
            <Images className="w-4 h-4" />
            <span>{totalItems} total photos discovered</span>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 pb-20">
        <SectionReveal className="sticky top-16 z-30 bg-cream/90 backdrop-blur-md py-4 -mx-4 px-4 mb-8 border-b border-slate-200/60">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <CategoryFilter active={activeCategory} onChange={handleCategoryChange} />
            <span className="shrink-0 text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
              Showing {items.length} of {totalItems}
            </span>
          </div>
        </SectionReveal>

        {items.length > 0 ? (
          <div className="space-y-12">
            <MasonryGrid items={items} />
            
            {hasMore && (
              <div className="flex justify-center mt-12">
                <Button 
                  variant="outline" 
                  onClick={handleLoadMore} 
                >
                  Load More Memories ✨
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-100">
            <span className="text-5xl mb-4 block">📸</span>
            <h3 className="text-xl font-heading font-bold text-slate-800">No photos found</h3>
            <p className="text-slate-500">We haven't uploaded photos for this category yet. Check back soon!</p>
          </div>
        )}

        <SectionReveal className="mt-20 text-center" delay={0.1}>
          <div className="inline-block bg-white rounded-3xl px-8 py-10 shadow-xl max-w-lg w-full">
            <h2 className="font-heading font-bold text-2xl text-slate-800 mb-2">
              Want Your Kids in These Photos?
            </h2>
            <Button to="/register" size="lg">
              Register for VBS 2026 🚀
            </Button>
          </div>
        </SectionReveal>
      </div>
    </main>
  )
}
