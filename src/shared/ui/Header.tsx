import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '../../shared/ui'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Gallery', to: '/gallery' },
]

/**
 * Sticky header with glassmorphism effect, mobile hamburger menu,
 * and a bouncy CTA button. Fully responsive.
 */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200/50"
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* ── Logo ── */}
          <Link to="/" className="flex items-center no-underline" id="nav-logo">
            <motion.img 
              src="/logo.png" 
              alt="CLC VBS Logo" 
              className="h-12 w-auto object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-slate-600 hover:text-grape transition-colors duration-200 no-underline"
                id={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
            <Button to="/register" size="sm" id="nav-register-btn">
              Register Now 🎉
            </Button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <motion.button
            type="button"
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200/50"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block px-4 py-3 rounded-xl text-slate-700 font-medium hover:bg-grape/5 hover:text-grape transition-colors no-underline"
                  onClick={() => setMobileOpen(false)}
                  id={`mobile-nav-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2">
                <Button
                  to="/register"
                  className="w-full"
                  id="mobile-register-btn"
                >
                  Register Now 🎉
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
