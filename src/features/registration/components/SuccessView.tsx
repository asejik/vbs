import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '../../../shared/ui'

export function SuccessView() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center pt-32 pb-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-10 max-w-lg w-full text-center shadow-2xl border border-slate-100 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-confetti opacity-30 pointer-events-none" />
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="relative z-10 mb-8"
        >
          <img src="/logo.png" alt="CLC VBS Logo" className="h-20 w-auto mx-auto object-contain" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-heading font-black text-slate-800 mb-4 relative z-10"
        >
          You're All Set! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-600 text-lg mb-8 relative z-10"
        >
          We've successfully secured your spots for VBS 2026. Keep an eye on your email for further details and what to expect!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 text-mint-dark font-medium bg-mint/10 py-3 px-4 rounded-xl mx-auto w-max mb-8 relative z-10"
        >
          <CheckCircle2 className="w-5 h-5" />
          Payment Confirmed
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative z-10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Button to="/" variant="outline" size="lg" className="w-full sm:w-auto">
              Return Home
            </Button>
            <Button onClick={() => window.location.reload()} size="lg" className="w-full sm:w-auto">
              Register Another Child 🚀
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
