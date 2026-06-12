import { forwardRef } from 'react'

const Badge = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full'

    const variantStyles = {
      primary: 'bg-primary-100 text-primary-700',
      secondary: 'bg-secondary-100 text-secondary-700',
      success: 'bg-success-light text-success',
      warning: 'bg-warning-light text-warning',
      error: 'bg-error-light text-error',
      info: 'bg-info-light text-info',
      neutral: 'bg-neutral-100 text-neutral-700',
    }

    const sizeStyles = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    }

    const classes = `
      ${baseStyles}
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${className}
    `.trim()

    return (
      <span ref={ref} className={classes} {...props}>
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
