import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { GalleryItem } from '../galleryData'

interface GalleryCardProps {
  item: GalleryItem
  /** Stagger delay in seconds based on grid position */
  index: number
}

const aspectClasses: Record<GalleryItem['aspect'], string> = {
  square:    'aspect-square',
  portrait:  'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
}

/**
 * Individual gallery card with:
 * - Native loading="lazy" + decoding="async" for zero-cost lazy loading
 * - Framer Motion bouncy hover: scale + y-lift + shadow burst
 * - Category badge overlay on hover
 * - Skeleton loading state while image fetches
 * - Accessible focusable card with keyboard support
 */
export function GalleryCard({ item, index }: GalleryCardProps) {
  const [loaded, setLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleLoad = useCallback(() => setLoaded(true), [])

  return (
    <motion.article
      className="relative overflow-hidden rounded-2xl bg-slate-100 cursor-pointer group"
      style={{ breakInside: 'avoid', marginBottom: '1rem' }}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{
        scale: 1.03,
        y: -6,
        zIndex: 10,
        boxShadow: '0 20px 40px -8px rgba(0,0,0,0.25)',
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      tabIndex={0}
      aria-label={item.alt}
    >
      {/* ── Skeleton shimmer ── */}
      {!loaded && (
        <div
          className={`absolute inset-0 ${aspectClasses[item.aspect]} bg-slate-200 animate-pulse rounded-2xl`}
          aria-hidden="true"
        />
      )}

      {/* ── Image with strict lazy loading ── */}
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        onLoad={handleLoad}
        className={[
          'w-full object-cover rounded-2xl transition-opacity duration-500',
          aspectClasses[item.aspect],
          loaded ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />

      {/* ── Hover overlay: dark gradient + category badge ── */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-2xl flex items-end p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        aria-hidden="true"
      >
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 text-slate-800 text-xs font-heading font-semibold shadow-sm">
          {item.category}
        </span>
      </motion.div>

      {/* ── Bouncy star sparkle on hover (kid-friendly touch) ── */}
      <motion.div
        className="absolute top-3 right-3 text-lg pointer-events-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ type: 'spring' as const, stiffness: 500, damping: 18 }}
        aria-hidden="true"
      >
        ⭐
      </motion.div>
    </motion.article>
  )
}
