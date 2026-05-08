import { motion } from 'framer-motion'
import { INTERESTS } from '../registrationSchema'
import { FormField } from './FormFields'

interface InterestPickerProps {
  selected: string[]
  onChange: (selected: string[]) => void
  error?: string
}

export function InterestPicker({ selected, onChange, error }: InterestPickerProps) {
  const toggleInterest = (interest: string) => {
    if (selected.includes(interest)) {
      onChange(selected.filter((i) => i !== interest))
    } else if (selected.length < 2) {
      onChange([...selected, interest])
    }
  }

  return (
    <FormField label="Child's Interests (Choose exactly 2)" error={error} required>
      <div className="grid grid-cols-2 gap-3 mt-1">
        {INTERESTS.map((interest) => {
          const isSelected = selected.includes(interest)
          const isMaxed = selected.length >= 2 && !isSelected

          return (
            <motion.button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              disabled={isMaxed && !isSelected}
              whileHover={!isMaxed || isSelected ? { scale: 1.02, y: -2 } : {}}
              whileTap={!isMaxed || isSelected ? { scale: 0.98 } : {}}
              className={`px-4 py-3 rounded-xl border-2 transition-all text-sm font-semibold text-left flex items-center justify-between ${
                isSelected
                  ? 'border-grape bg-grape text-white shadow-md'
                  : isMaxed
                  ? 'border-slate-50 bg-slate-50 text-slate-300 cursor-not-allowed'
                  : 'border-slate-100 bg-white text-slate-600 hover:border-grape/30 hover:bg-grape/5'
              }`}
            >
              <span>{interest}</span>
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-white"
                >
                  ✨
                </motion.span>
              )}
            </motion.button>
          )
        })}
      </div>
    </FormField>
  )
}
