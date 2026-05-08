import { Heart, MapPin, Mail, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

/**
 * Footer with church branding, quick links, and contact info.
 * Colorful gradient background to tie into the VBS theme.
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      id="main-footer"
      className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 text-white"
    >
      {/* ── Wave Top ── */}
      <div className="w-full overflow-hidden leading-[0]" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 sm:h-14">
          <path
            d="M0,30 C360,60 720,0 1080,30 C1260,45 1440,15 1440,30 L1440,0 L0,0 Z"
            fill="#FFFDF7"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* ── Brand Column ── */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center no-underline">
              <img
                src="/logo.png"
                alt="CLC VBS Logo"
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs pt-2">
              An unforgettable week of faith, fun, and friendship.
              Helping kids discover God&apos;s amazing love through exciting adventures!
            </p>
          </div>

          {/* ── Quick Links ── */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-base text-sunshine">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'Register', to: '/register' },
                { label: 'Gallery', to: '/gallery' },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-slate-400 text-sm hover:text-sunshine transition-colors duration-200 no-underline"
                  id={`footer-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Contact ── */}
          <div className="space-y-4">
            <h4 className="font-heading font-semibold text-base text-sky">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Ilorin</p>
                <a href="mailto:clcilorinvbs@gmail.com" className="flex items-center gap-2 text-slate-400 text-sm hover:text-sky transition-colors no-underline">
                  <Mail className="w-4 h-4 shrink-0" /> clcilorinvbs@gmail.com
                </a>
                <a href="tel:+2347076908384" className="flex items-center gap-2 text-slate-400 text-sm hover:text-sky transition-colors no-underline">
                  <Phone className="w-4 h-4 shrink-0" /> 0707 690 8384
                </a>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Lagos</p>
                <a href="mailto:clclagosvbs@gmail.com" className="flex items-center gap-2 text-slate-400 text-sm hover:text-sky transition-colors no-underline">
                  <Mail className="w-4 h-4 shrink-0" /> clclagosvbs@gmail.com
                </a>
                <a href="tel:+2347066848058" className="flex items-center gap-2 text-slate-400 text-sm hover:text-sky transition-colors no-underline">
                  <Phone className="w-4 h-4 shrink-0" /> 0706 684 8058
                </a>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2 text-slate-400 text-xs">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-sky" />
                  <span>
                    <b className="text-slate-300">Ilorin:</b> Freedom Dome, Ilesanmi Bus Stop, University Road, Tanke, Ilorin
                  </span>
                </div>
                <div className="flex items-start gap-2 text-slate-400 text-xs">
                  <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-sky" />
                  <span>
                    <b className="text-slate-300">Lagos:</b> Freedom Dome, No. 3 Ikorodu Road, Beside Zenith Bank, Maryland
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-12 pt-6 border-t border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {currentYear} The Atrium Church. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-coral fill-coral" /> for the kids
          </p>
        </div>
      </div>
    </footer>
  )
}
