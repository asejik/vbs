import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CircularGallery, type GalleryItem } from '../../../shared/ui/circular-gallery'
import { SectionReveal } from '../../../shared/ui'

const galleryItems: GalleryItem[] = [
  {
    title: 'Warm Arrival',
    subtitle: 'Welcome to the Adventure',
    photo: { url: '/images/arrival/ATC-VBS-29.jpg', alt: 'Arrival' }
  },
  {
    title: 'Bible Lessons',
    subtitle: 'Deep Roots in the Word',
    photo: { url: '/images/teaching/ATC-VBS-48.jpg', alt: 'Teaching' }
  },
  {
    title: 'Creative Hands',
    subtitle: 'Unlocking New Skills',
    photo: { url: '/images/breakout session/ATC-VBS-138.jpg', alt: 'Breakout' }
  },
  {
    title: 'Heartfelt Prayer',
    subtitle: 'Connecting with God',
    photo: { url: '/images/prayers/ATC-VBS-123.jpg', alt: 'Prayers' }
  },
  {
    title: 'Fun & Games',
    subtitle: 'Joy in Motion',
    photo: { url: '/images/outdoor games/ATC-VBS-147.jpg', alt: 'Games' }
  },
  {
    title: 'Lagos Spirit',
    subtitle: 'Vibrant VBS Energy',
    photo: { url: '/images/LAGOS/VBS-40.jpg', alt: 'Lagos Campus' }
  },
  {
    title: 'The Big Stage',
    subtitle: 'Shining Bright',
    photo: { url: '/images/presentations/ATC-VBS-272.jpg', alt: 'Presentations' }
  },
  {
    title: 'Grand Finale',
    subtitle: 'A Week to Remember',
    photo: { url: '/images/closing ceremony/ATC-VBS-285.jpg', alt: 'Closing' }
  },
  {
    title: 'Group Learning',
    subtitle: 'Better Together',
    photo: { url: '/images/teaching/ATC-VBS-170.jpg', alt: 'Teaching 2' }
  },
  {
    title: 'Pure Joy',
    subtitle: 'Smiles All Round',
    photo: { url: '/images/indoor games/ATC-VBS-67.jpg', alt: 'Indoor Games' }
  }
]

export function HomeGallerySection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Fade and scale the header as we scroll through
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1])

  return (
    <section
      ref={containerRef}
      className="relative bg-cream bg-confetti overflow-visible"
      style={{ height: '250vh' }}
    >
      {/* ── Background Sparkles ── */}
      <motion.div
        className="absolute top-20 right-10 w-16 h-16 rounded-full bg-sunshine/30 blur-lg"
        animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-32 left-10 w-20 h-20 rounded-full bg-coral/20 blur-lg"
        animate={{ y: [0, 10, 0], scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-12 h-12 rounded-full bg-sky/25 blur-lg hidden lg:block"
        animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 2 }}
        aria-hidden="true"
      />

      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Header Overlay */}
        <motion.div
          style={{ opacity, scale }}
          className="absolute top-20 z-20 text-center px-4"
        >
          <SectionReveal>
            <span className="inline-block px-4 py-1.5 rounded-full bg-sunshine/20 text-sunshine-dark text-sm font-heading font-semibold mb-4 border border-sunshine/30">
              Glimpses of Glory ✨
            </span>
            <h2 className="text-4xl sm:text-6xl font-heading font-black text-slate-800 mb-4 tracking-tight">
              Relive the <span className="text-gradient">Magic</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium leading-relaxed">
              Take a spin through the unforgettable moments that make VBS at The Atrium Church so special.
            </p>
          </SectionReveal>
        </motion.div>

        {/* 3D Gallery */}
        <div className="w-full h-full pt-40">
          <CircularGallery
            items={galleryItems}
            radius={typeof window !== 'undefined' && window.innerWidth < 640 ? 280 : 650}
            autoRotateSpeed={0.05}
          />
        </div>

        {/* Bottom Fade - matching the light theme */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent z-20" />
      </div>
    </section>
  )
}
