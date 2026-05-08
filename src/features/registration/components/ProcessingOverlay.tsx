import { motion } from 'framer-motion'

export function ProcessingOverlay() {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center max-w-sm w-full text-center"
      >
        <div className="w-16 h-16 border-4 border-slate-100 border-t-grape rounded-full animate-spin mb-6" />
        <h2 className="text-xl font-heading font-bold text-slate-800 mb-2">
          Processing Registration...
        </h2>
        <p className="text-slate-500 text-sm">
          Please wait while we secure your spots. Do not close this page.
        </p>
      </motion.div>
    </div>
  )
}
