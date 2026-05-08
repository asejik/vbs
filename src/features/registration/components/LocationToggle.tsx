import { motion } from 'framer-motion'

interface LocationToggleProps {
  value: 'Ilorin' | 'Lagos'
  onChange: (value: 'Ilorin' | 'Lagos') => void
}

export function LocationToggle({ value, onChange }: LocationToggleProps) {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <span className="text-sm font-heading font-bold text-slate-500 uppercase tracking-widest">
        Choose Your Location
      </span>
      <div className="bg-slate-100 p-1.5 rounded-2xl flex w-full max-w-sm relative">
        <motion.div
          className="absolute inset-y-1.5 bg-white rounded-xl shadow-lg z-0"
          initial={false}
          animate={{
            left: value === 'Ilorin' ? '6px' : 'calc(50% + 2px)',
            width: 'calc(50% - 8px)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
        
        <button
          type="button"
          onClick={() => onChange('Ilorin')}
          className={`flex-1 py-3 text-sm font-heading font-bold rounded-xl relative z-10 transition-colors ${
            value === 'Ilorin' ? 'text-grape' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Ilorin <span className="opacity-50 ml-1">N20,000</span>
        </button>
        
        <button
          type="button"
          onClick={() => onChange('Lagos')}
          className={`flex-1 py-3 text-sm font-heading font-bold rounded-xl relative z-10 transition-colors ${
            value === 'Lagos' ? 'text-grape' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Lagos <span className="opacity-50 ml-1">N30,000</span>
        </button>
      </div>
    </div>
  )
}
