import { forwardRef } from 'react'

const Checkbox = forwardRef(
  (
    {
      label,
      error,
      checked,
      onChange,
      disabled = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles = 'w-5 h-5 rounded border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
    const normalStyles = 'border-neutral-300 checked:bg-primary-600 checked:border-primary-600 focus:ring-primary-500'
    const errorStyles = 'border-error checked:bg-error checked:border-error focus:ring-error'
    const disabledStyles = 'opacity-50 cursor-not-allowed'
    
    const classes = `
      ${baseStyles}
      ${error ? errorStyles : normalStyles}
      ${disabled ? disabledStyles : ''}
      ${className}
    `.trim()

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          className={classes}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        {label && (
          <label className="text-sm text-neutral-700 cursor-pointer">
            {label}
          </label>
        )}
        {error && (
          <span className="text-sm text-error ml-2">{error}</span>
        )}
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
