import { type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

/**
 * Wraps children with a Framer Motion scroll-reveal animation.
 * Fades in + slides up on viewport entry for a polished feel.
 */
export function SectionReveal({ children, className = '', delay = 0 }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
