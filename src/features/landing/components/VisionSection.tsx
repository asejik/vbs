import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Users, BookOpen, X, Sparkles } from 'lucide-react'
import { SectionReveal, Button } from '../../../shared/ui'

const pillars = [
  {
    icon: Heart,
    color: 'from-coral to-bubblegum',
    bgColor: 'bg-coral/10',
    iconColor: 'text-coral',
    title: 'Faith-Filled Fun',
    description:
      "Every activity is rooted in God's Word. Kids learn life-changing biblical truths through stories, songs, and hands-on experiences they'll remember forever.",
  },
  {
    icon: Users,
    color: 'from-sky to-ocean',
    bgColor: 'bg-sky/10',
    iconColor: 'text-sky',
    title: 'Incredible Community',
    description:
      'Kids build lasting friendships in a safe, loving environment. Our trained volunteers create a space where every child feels welcomed, valued, and included.',
  },
  {
    icon: BookOpen,
    color: 'from-grape to-ocean',
    bgColor: 'bg-grape/10',
    iconColor: 'text-grape',
    title: 'Transformative Impact',
    description:
      "VBS isn't just a week — it's a turning point. Kids discover their identity in Christ and develop confidence that carries into every area of their lives.",
  },
]

const FULL_VISION = {
  intro: "Childhood is more than just growing up; it is where foundations are laid, identities are formed, and hearts are shaped by what they see, hear, and experience. That is why creating a space where children can encounter God in a real, joyful, and personal way is not just important—it is essential.",
  mission: "At The Atrium Church of Citizens of Light Church, our VISION is to prepare the next generation for a quality life in God, showing them the importance of God's Word in their everyday living.",
  experience: "The Atrium Church Vacation Bible School (VBS) is a fun, faith-filled meeting designed to help children learn about God through worship, in-depth teachings, games and exciting hands-on activities. It goes beyond a program—it is an unforgettable experience where learning meets joy, creativity meets purpose, and every child is reminded of God’s love.",
  skills: "Through engaging sessions and practical skill classes such as Cooking, Baking, AI Animation, Crocheting, Fashion Illustration, and Cinematography, children discover new talents while making meaningful connections.",
  welcome: "Open to children ages 4–16, every child is warmly welcomed. Whether it is their first time or they have joined us before, there is always room for them to belong, grow, and shine.",
  expect: [
    "Powerful and joyful worship sessions",
    "Interactive Bible teachings made practical for children",
    "Fun games and team-building activities",
    "Creative arts and vocational classes",
    "New friendships and memorable experiences",
    "A safe, loving, and faith-filled environment"
  ]
}

export function VisionSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section id="vision-section" className="relative py-20 sm:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <SectionReveal>
            <motion.span className="inline-block px-4 py-1.5 rounded-full bg-sunshine/20 text-sunshine-dark text-sm font-heading font-semibold mb-6">
              Our Vision ✨
            </motion.span>
            <h2 className="text-4xl sm:text-5xl font-heading font-black text-slate-800 mb-6 leading-tight">
              Preparing the <span className="text-gradient">Next Generation</span> for a Quality Life in God
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
              {FULL_VISION.intro}
            </p>
            <Button onClick={() => setIsModalOpen(true)} variant="outline" size="lg">
              Read Our Full Vision
            </Button>
          </SectionReveal>

          <SectionReveal delay={0.2} className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-grape/5 rounded-3xl -rotate-6 scale-105" />
              <img
                src="/images/presentations/ATC-VBS-272.jpg"
                alt="Kids at VBS"
                className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-white"
              />
              <motion.div
                className="absolute -bottom-6 -right-6 p-6 bg-white rounded-2xl shadow-xl z-20 hidden sm:block"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-mint/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-mint-dark" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Ages</p>
                    <p className="text-lg font-heading font-black text-slate-800">3 — 16</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </SectionReveal>
        </div>

        {/* ── Pillar Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <SectionReveal key={pillar.title} delay={index * 0.15}>
              <motion.div
                className="relative group p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-shadow duration-300 h-full"
                whileHover={{ y: -5 }}
              >
                <div className={`absolute top-0 left-6 right-6 h-1 rounded-b-full bg-gradient-to-r ${pillar.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${pillar.bgColor} mb-6`}>
                  <pillar.icon className={`w-7 h-7 ${pillar.iconColor}`} />
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-800 mb-3">{pillar.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{pillar.description}</p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* ── Full Vision Modal ── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            />

            <motion.div
              className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 p-6 flex items-center justify-between z-10">
                <h3 className="text-2xl font-heading font-black text-slate-800">Our Full Vision</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 space-y-8">
                <div className="space-y-4">
                  <p className="text-slate-600 leading-relaxed font-medium italic">"{FULL_VISION.intro}"</p>
                  <p className="text-slate-800 leading-relaxed font-bold">{FULL_VISION.mission}</p>
                </div>

                <div className="bg-grape/5 p-6 rounded-2xl border border-grape/10">
                  <p className="text-slate-700 leading-relaxed">{FULL_VISION.experience}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-heading font-bold text-grape flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Skills & Discovery
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{FULL_VISION.skills}</p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-heading font-bold text-sky flex items-center gap-2">
                      <Users className="w-4 h-4" /> Open to All
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">{FULL_VISION.welcome}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-heading font-black text-slate-800 text-xl">What to Expect</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {FULL_VISION.expect.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-grape shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <p className="text-slate-800 font-bold mb-4">Our Theme for this year is <span className="text-grape uppercase tracking-widest">STEWARDSHIP</span>.</p>
                  <p className="text-slate-500 text-sm">We look forward to welcoming your child into a space filled with joy, creativity, learning, and the undeniable love of God.</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-slate-50 flex justify-end">
                <Button onClick={() => setIsModalOpen(false)}>Close Vision</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
