import { motion, AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  error?: string
  children: ReactNode
  required?: boolean
}

export function FormField({ label, error, children, required }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-sm font-heading font-semibold text-slate-700 ml-1">
        {label} {required && <span className="text-coral">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-xs text-coral font-medium ml-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label: string
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <FormField label={label} error={error} required={props.required}>
      <input
        {...props}
        className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none bg-white font-body text-slate-800 ${
          error
            ? 'border-coral ring-coral/10 focus:ring-4'
            : 'border-slate-100 focus:border-grape ring-grape/10 focus:ring-4'
        }`}
      />
    </FormField>
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
  label: string
  options: { label: string; value: string }[]
}

export function Select({ label, error, options, ...props }: SelectProps) {
  return (
    <FormField label={label} error={error} required={props.required}>
      <select
        {...props}
        className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none bg-white font-body text-slate-800 appearance-none ${
          error
            ? 'border-coral ring-coral/10 focus:ring-4'
            : 'border-slate-100 focus:border-grape ring-grape/10 focus:ring-4'
        }`}
      >
        <option value="" disabled>Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FormField>
  )
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
  label: string
}

export function TextArea({ label, error, ...props }: TextAreaProps) {
  return (
    <FormField label={label} error={error}>
      <textarea
        {...props}
        className={`w-full px-4 py-3 rounded-xl border-2 transition-all outline-none bg-white font-body text-slate-800 min-h-[100px] ${
          error
            ? 'border-coral ring-coral/10 focus:ring-4'
            : 'border-slate-100 focus:border-grape ring-grape/10 focus:ring-4'
        }`}
      />
    </FormField>
  )
}
