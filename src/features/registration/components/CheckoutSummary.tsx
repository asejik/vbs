import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, ArrowRight } from 'lucide-react'

interface CheckoutSummaryProps {
  childCount: number
  location: 'Ilorin' | 'Lagos'
  isValid: boolean
  isSubmitting: boolean
}

export function CheckoutSummary({
  childCount,
  location,
  isValid,
  isSubmitting,
}: CheckoutSummaryProps) {
  const price = location === 'Ilorin' ? 20000 : 30000
  const total = childCount * price

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full max-w-3xl mx-auto mt-12"
    >
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_-15px_rgba(124,58,237,0.3)] rounded-3xl p-5 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-grape/10 flex items-center justify-center text-grape">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-heading font-bold text-slate-400 uppercase tracking-wider">
              {childCount} Child{childCount !== 1 ? 'ren' : ''} • {location}
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={total}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-2xl font-heading font-black text-slate-800"
              >
                ₦{total.toLocaleString()}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid || isSubmitting || childCount === 0}
          className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-heading font-bold transition-all shadow-lg ${
            isValid && childCount > 0 && !isSubmitting
              ? 'bg-gradient-to-r from-grape to-bubblegum text-white hover:scale-105 active:scale-95 shadow-grape/25'
              : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          {isSubmitting ? 'Processing...' : 'Register Now'}
          <ArrowRight className={`w-5 h-5 ${isSubmitting ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </motion.div>
  )
}
