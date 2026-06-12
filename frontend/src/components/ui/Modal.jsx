import { forwardRef } from 'react'
import { FiX } from 'react-icons/fi'

const Modal = forwardRef(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      footer,
      size = 'md',
      className = '',
      ...props
    },
    ref
  ) => {
    if (!isOpen) return null

    const sizeStyles = {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-4xl',
      full: 'max-w-full',
    }

    const classes = `${sizeStyles[size]} ${className}`.trim()

    return (
      <div
        ref={ref}
        className="fixed inset-0 z-50 flex items-center justify-center"
        {...props}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />

        {/* Modal Content */}
        <div className={`relative bg-white rounded-lg shadow-xl w-full ${classes} m-4`}>
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
              <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>
              <button
                onClick={onClose}
                className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Body */}
          <div className="px-6 py-4">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-200 bg-neutral-50 rounded-b-lg">
              {footer}
            </div>
          )}
        </div>
      </div>
    )
  }
)

Modal.displayName = 'Modal'

export default Modal
