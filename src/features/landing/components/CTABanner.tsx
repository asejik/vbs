import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, ArrowRight } from 'lucide-react'
import { SectionReveal, Button } from '../../../shared/ui'

const details = [
  { icon: Calendar, label: 'August 10–15, 2026', sublabel: 'Mon–Sat (Wed Excluded)' },
  { icon: Clock, label: '10:00 AM – 4:00 PM', sublabel: 'Daily Schedule' },
  { icon: MapPin, label: 'The Atrium Church', sublabel: 'Ilorin & Lagos Campuses' },
]

/**
 * CTA banner that sits between sections. Presents key logistical details
 * (dates, time, location) alongside a strong registration call-to-action.
 */
export function CTABanner() {
  return (
    <section id="cta-banner" className="relative py-20 sm:py-24 overflow-hidden">
      {/* ── Gradient Background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-grape via-ocean to-sky" />

      {/* ── Pattern Overlay ── */}
      <div className="absolute inset-0 opacity-10 bg-confetti" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* ── Left: Info Cards ── */}
          <div className="flex-1 w-full">
            <SectionReveal>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 text-white text-sm font-heading font-semibold mb-4 backdrop-blur-sm">
                Mark Your Calendar 📅
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-8 leading-tight">
                Don&apos;t Let Your Kids<br />
                Miss Out!
              </h2>
            </SectionReveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {details.map((detail, i) => (
                <SectionReveal key={detail.label} delay={i * 0.12}>
                  <motion.div
                    className="flex items-start gap-3 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15"
                    whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.18)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 shrink-0">
                      <detail.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-white text-sm">
                        {detail.label}
                      </p>
                      <p className="text-white/60 text-xs mt-0.5">
                        {detail.sublabel}
                      </p>
                    </div>
                  </motion.div>
                </SectionReveal>
              ))}
            </div>
          </div>

          {/* ── Right: CTA Card ── */}
          <SectionReveal delay={0.3} className="w-full lg:w-auto shrink-0">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl text-center max-w-sm mx-auto lg:mx-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sunshine to-tangerine flex items-center justify-center mx-auto mb-5 shadow-lg">
                <span className="text-3xl">🎉</span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-slate-800 mb-2">
                Ready to Join?
              </h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Registration ends <span className="font-bold text-slate-800">August 2</span>. Spots fill up fast! 
                Secure your child&apos;s place in the most exciting week of the summer.
              </p>
              <Button to="/register" size="lg" className="w-full" id="cta-register-btn">
                Register Now
                <ArrowRight className="w-5 h-5" />
              </Button>
              <p className="text-xs text-slate-400 mt-4">
                Multi-child discounts available
              </p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
