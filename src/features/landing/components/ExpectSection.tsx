import { motion } from 'framer-motion'
import { Palette, Music, Gamepad2, BookOpen, Users, ShieldCheck } from 'lucide-react'
import { SectionReveal } from '../../../shared/ui'

const activities = [
  {
    icon: Music,
    title: 'Powerful Worship',
    description: 'High-energy praise sessions with original choreography and songs that connect young hearts to God in a real, joyful way.',
    color: 'bg-coral',
    bgGlow: 'bg-coral/10',
  },
  {
    icon: BookOpen,
    title: 'Practical Bible Teaching',
    description: 'Transformative lessons that bring the Word of life through interactive storytelling and real-world applications.',
    color: 'bg-grape',
    bgGlow: 'bg-grape/10',
  },
  {
    icon: Gamepad2,
    title: 'Epic Games',
    description: 'Exciting outdoor challenges, team-building relays, and adventures that foster confidence, leadership, and non-stop fun.',
    color: 'bg-tangerine',
    bgGlow: 'bg-tangerine/10',
  },
  {
    icon: Palette,
    title: 'Vocational Classes',
    description: 'Hands-on discovery in AI Animation, Baking, Cinematography, and more, giving kids space to uncover their God-given talents.',
    color: 'bg-sky',
    bgGlow: 'bg-sky/10',
  },
  {
    icon: Users,
    title: 'Lasting Friendships',
    description: 'A vibrant community where children from all backgrounds bond over shared adventures and create memories that last a lifetime.',
    color: 'bg-bubblegum',
    bgGlow: 'bg-bubblegum/10',
  },
  {
    icon: ShieldCheck,
    title: 'Safe & Loving Space',
    description: 'A faith-filled, protected environment managed by trained volunteers where every child is seen, loved, and warmly welcomed.',
    color: 'bg-mint-dark',
    bgGlow: 'bg-mint/15',
  },
]

export function ExpectSection() {
  return (
    <section
      id="expect-section"
      className="relative py-20 sm:py-28 bg-cream overflow-hidden"
    >
      {/* ── Decorative Blobs ── */}
      <div
        className="absolute top-10 -right-20 w-72 h-72 rounded-full bg-sunshine/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -left-20 w-72 h-72 rounded-full bg-sky/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <SectionReveal className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            className="inline-block px-4 py-1.5 rounded-full bg-sky/15 text-sky-dark text-sm font-heading font-semibold mb-4"
          >
            What Awaits 🎪
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-slate-800 mb-4">
            A Week Packed With{' '}
            <span className="text-gradient">Awesome Activities</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            From sunrise to sundown, every moment is designed to inspire, energize,
            and create memories that last a lifetime.
          </p>
        </SectionReveal>

        {/* ── Activity Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => (
            <SectionReveal key={activity.title} delay={index * 0.1}>
              <motion.div
                className="relative group p-7 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-100/80 shadow-sm hover:shadow-lg transition-all duration-300 h-full cursor-default"
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Glow behind icon */}
                <div className={`absolute top-6 left-6 w-14 h-14 rounded-2xl ${activity.bgGlow} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`relative inline-flex items-center justify-center w-14 h-14 rounded-2xl ${activity.color} mb-5 shadow-lg`}>
                  <activity.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-heading font-bold text-lg text-slate-800 mb-2">
                  {activity.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {activity.description}
                </p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
