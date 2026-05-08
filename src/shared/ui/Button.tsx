import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface ButtonProps {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  id?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

const variantStyles = {
  primary:
    'bg-gradient-to-r from-grape to-bubblegum text-white shadow-lg hover:shadow-xl',
  secondary:
    'bg-gradient-to-r from-sunshine to-tangerine text-slate-800 shadow-lg hover:shadow-xl',
  outline:
    'bg-white/80 backdrop-blur-sm border-2 border-grape text-grape hover:bg-grape hover:text-white',
}

const sizeStyles = {
  sm: 'px-5 py-2 text-sm rounded-lg',
  md: 'px-7 py-3 text-base rounded-xl',
  lg: 'px-9 py-4 text-lg rounded-2xl',
}

/**
 * Multi-variant bouncy CTA button with Framer Motion micro-interactions.
 * Supports routing via Link, external hrefs, or click handlers.
 */
export function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  id,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseStyles = `inline-flex items-center justify-center gap-2 font-heading font-semibold transition-colors duration-200 ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed grayscale' : 'cursor-pointer'
  }`

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.04, y: -2 },
    whileTap: disabled ? {} : { scale: 0.96 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
  }

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link to={to} className={baseStyles} id={id}>
          {children}
        </Link>
      </motion.div>
    )
  }

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={baseStyles}
        id={id}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={baseStyles}
      id={id}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}
