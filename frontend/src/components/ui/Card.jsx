import { forwardRef } from 'react'

const Card = forwardRef(
  (
    {
      children,
      title,
      subtitle,
      footer,
      className = '',
      hoverable = false,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'bg-white rounded-lg shadow-md overflow-hidden'
    const hoverStyles = hoverable ? 'hover:shadow-lg transition-shadow duration-200' : ''
    const classes = `${baseStyles} ${hoverStyles} ${className}`.trim()

    return (
      <div ref={ref} className={classes} {...props}>
        {(title || subtitle) && (
          <div className="px-6 py-4 border-b border-neutral-200">
            {title && <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>}
            {subtitle && <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>}
          </div>
        )}
        <div className="px-6 py-4">{children}</div>
        {footer && (
          <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50">
            {footer}
          </div>
        )}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
