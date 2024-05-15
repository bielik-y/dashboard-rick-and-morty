import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  variant?: 'filled' | 'outlined'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'filled', ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={cn(
          'flex w-40 justify-center rounded-md px-6 py-2 transition-all',
          variant === 'filled' && 'bg-emerald-500 text-white hover:bg-emerald-600',
          variant === 'outlined' &&
            'bg-white-500 border border-slate-700 text-slate-700 hover:bg-slate-200',
          className
        )}
      >
        {children}
      </button>
    )
  }
)

export default Button
