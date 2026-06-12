import { forwardRef } from 'react'

const Input = forwardRef(
  (
    {
      type = 'text',
      label,
      error,
      helperText,
      icon,
      className = '',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'w-full px-4 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
    const normalStyles = 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'
    const errorStyles = 'border-error focus:border-error focus:ring-error'
    const disabledStyles = 'bg-neutral-100 cursor-not-allowed opacity-50'
    
    const classes = `
      ${baseStyles}
      ${error ? errorStyles : normalStyles}
      ${disabled ? disabledStyles : ''}
      ${className}
    `.trim()

    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label className="text-sm font-medium text-neutral-700">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            type={type}
            className={`${classes} ${icon ? 'pl-10' : ''}`}
            disabled={disabled}
            {...props}
          />
        </div>
        {error && (
          <span className="text-sm text-error">{error}</span>
        )}
        {helperText && !error && (
          <span className="text-sm text-neutral-500">{helperText}</span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
