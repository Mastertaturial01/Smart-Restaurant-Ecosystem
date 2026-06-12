import { forwardRef } from 'react'

const Select = forwardRef(
  (
    {
      label,
      error,
      helperText,
      options = [],
      placeholder = 'Select an option',
      className = '',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'w-full px-4 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white'
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
        <select
          ref={ref}
          className={classes}
          disabled={disabled}
          {...props}
        >
          {placeholder && (
            <option value="">{placeholder}</option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

Select.displayName = 'Select'

export default Select
