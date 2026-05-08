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
  const basePrice = location === 'Ilorin' ? 20000 : 30000
  const flatFee = location === 'Ilorin' ? 406 : 610
  
  const baseTotal = childCount * basePrice
  const finalTotal = childCount > 0 ? baseTotal + flatFee : 0
  const feeTotal = childCount > 0 ? flatFee : 0

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full max-w-3xl mx-auto mt-12"
    >
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_-15px_rgba(124,58,237,0.3)] rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-grape/10 flex items-center justify-center text-grape shrink-0">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-heading font-bold text-slate-400 uppercase tracking-widest">
              {childCount} Child{childCount !== 1 ? 'ren' : ''} • {location}
            </p>
            <div className="flex flex-col">
              <span className="text-2xl font-heading font-black text-slate-800 leading-none">
                ₦{finalTotal.toLocaleString()}
              </span>
              <AnimatePresence mode="wait">
                {childCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2 mt-1"
                  >
                    <span className="text-[10px] text-slate-500 font-medium">
                      ₦{baseTotal.toLocaleString()} Registration
                    </span>
                    <span className="text-[10px] text-grape font-bold">
                      + ₦{feeTotal.toLocaleString()} One-time Fee
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
