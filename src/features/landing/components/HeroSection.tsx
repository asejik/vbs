import { motion } from 'framer-motion'
import { Sparkles, ArrowDown } from 'lucide-react'
import { Button } from '../../../shared/ui'
import { ArcGallery } from '../../../shared/ui/arc-gallery'

const heroImages = [
  '/images/arrival/ATC-VBS-29.jpg',
  '/images/breakout session/ATC-VBS-138.jpg',
  '/images/teaching/ATC-VBS-170.jpg',
  '/images/LAGOS/VBS-45.jpg', // Lagos
  '/images/lunch/ATC-VBS-201.jpg',
  '/images/prayers/ATC-VBS-123.jpg',
  '/images/LAGOS/VBS-88.jpg', // Lagos
  '/images/presentations/ATC-VBS-272.jpg',
  '/images/closing ceremony/ATC-VBS-285.jpg',
  '/images/LAGOS/VBS-2.jpg', // Lagos
]

/**
 * Hero section featuring the premium ArcGallery component.
 * Displays a cinematic arc of VBS memories above the core value proposition.
 */
export function HeroSection() {
  return (
    <ArcGallery
      images={heroImages}
      className="bg-cream bg-confetti min-h-screen"
    >
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Badge */}
        <motion.div
          className="inline-flex flex-col items-center gap-2 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 20 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-grape/10 border border-grape/20 mb-2">
            <Sparkles className="w-4 h-4 text-grape" />
            <span className="text-sm font-semibold text-grape">Vacation Bible School (VBS) • 2026 • Ages 4–16</span>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-black uppercase tracking-[0.3em] text-slate-400"
          >
            Theme: <span className="text-grape">Stewardship</span>
          </motion.div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-5xl sm:text-6xl lg:text-7xl font-heading font-black leading-[1.05] mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-slate-800">An Adventure</span>
          <br />
          <span className="text-gradient">They&apos;ll Never Forget</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-lg sm:text-xl text-slate-500 max-w-lg mx-auto mb-8 font-body leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          One incredible week of faith, friendship, and non-stop fun at
          The Atrium Church. Your kids will discover God&apos;s love through
          games, worship, crafts, and amazing adventures!
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Button to="/register" size="lg" id="hero-register-btn">
            Register Your Kids 🚀
          </Button>
          <Button to="/gallery" variant="outline" size="lg" id="hero-gallery-btn">
            See Last Year&apos;s Fun
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-2 text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-xs font-medium uppercase tracking-wider">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </ArcGallery>
  )
}
