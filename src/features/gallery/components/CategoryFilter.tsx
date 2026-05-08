import { motion, AnimatePresence } from 'framer-motion'
import { GALLERY_CATEGORIES, CATEGORY_COLORS } from '../galleryData'
import type { GalleryCategory } from '../galleryData'

interface CategoryFilterProps {
  active: GalleryCategory
  onChange: (cat: GalleryCategory) => void
}

/**
 * Scrollable row of pill-shaped filter buttons for gallery categories.
 * Uses AnimatePresence + layout animations on the active indicator
 * for a fluid, springy toggle effect.
 */
export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div
      className="relative"
      role="toolbar"
      aria-label="Filter gallery by category"
    >
      {/* ── Horizontal scroll container with hidden scrollbar ── */}
      <div
        className="flex gap-2 overflow-x-auto pb-2 scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {GALLERY_CATEGORIES.map((cat) => {
          const isActive = cat === active
          const colors = CATEGORY_COLORS[cat]

          return (
            <motion.button
              key={cat}
              type="button"
              id={`gallery-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onChange(cat)}
              className={[
                'relative shrink-0 px-4 py-2 rounded-full text-sm font-heading font-semibold',
                'transition-colors duration-200 cursor-pointer outline-none',
                'focus-visible:ring-2 focus-visible:ring-grape focus-visible:ring-offset-2',
                isActive
                  ? `${colors.activeBg} ${colors.activeText} shadow-md`
                  : `${colors.bg} ${colors.text} hover:shadow-sm`,
              ].join(' ')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring' as const, stiffness: 400, damping: 20 }}
              aria-pressed={isActive}
            >
              {/* Active indicator: animated background pill */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-full -z-10"
                    layoutId="active-pill"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring' as const, stiffness: 350, damping: 28 }}
                  />
                )}
              </AnimatePresence>
              {cat}
            </motion.button>
          )
        })}
      </div>

      {/* ── Right fade gradient to hint at horizontal scroll ── */}
      <div
        className="absolute right-0 top-0 bottom-2 w-12 bg-gradient-to-l from-cream to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </div>
  )
}
