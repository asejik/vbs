import { AnimatePresence } from 'framer-motion'
import { GalleryCard } from './GalleryCard'
import type { GalleryItem } from '../galleryData'

interface MasonryGridProps {
  items: GalleryItem[]
}

/**
 * CSS Multi-column Masonry grid.
 *
 * We use the CSS `columns` property (the battle-tested approach) rather than
 * JS-computed Masonry to keep the implementation dependency-free and to stay
 * fully compliant with the mobile performance requirement. Images are strictly
 * lazy-loaded via GalleryCard.
 *
 * Column counts:
 *  - mobile  (< 640px):  1 col
 *  - sm      (≥ 640px):  2 cols
 *  - lg      (≥ 1024px): 3 cols
 *  - xl      (≥ 1280px): 4 cols
 *
 * AnimatePresence on the outer list triggers exit animations when items
 * are filtered out, giving a smooth "items pop out" feel.
 */
export function MasonryGrid({ items }: MasonryGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="text-6xl mb-4">📷</span>
        <p className="font-heading text-xl text-slate-500">
          No photos in this category yet!
        </p>
        <p className="text-slate-400 text-sm mt-1">
          Check back after VBS 2026 for loads of memories.
        </p>
      </div>
    )
  }

  return (
    /* columns: CSS multi-column masonry, gap handled by card marginBottom */
    <div
      className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4"
      style={{ columnFill: 'balance' }}
    >
      <AnimatePresence mode="popLayout">
        {items.map((item, i) => (
          <GalleryCard key={item.id} item={item} index={i} />
        ))}
      </AnimatePresence>
    </div>
  )
}
