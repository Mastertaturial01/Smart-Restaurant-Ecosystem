import { useState, useRef, useEffect } from 'react'

const Tooltip = ({ children, content, position = 'top', delay = 200 }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)
  const tooltipRef = useRef(null)
  const triggerRef = useRef(null)

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const showTooltip = () => {
    const id = setTimeout(() => setIsVisible(true), delay)
    setTimeoutId(id)
  }

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId)
    setIsVisible(false)
  }

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [timeoutId])

  return (
    <div
      className="relative inline-block"
      ref={triggerRef}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 px-2.5 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap animate-fadeIn ${positions[position]}`}
          role="tooltip"
        >
          {content}
          <div className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
            position === 'top' ? '-bottom-1 left-1/2 -translate-x-1/2' :
            position === 'bottom' ? '-top-1 left-1/2 -translate-x-1/2' :
            position === 'left' ? '-right-1 top-1/2 -translate-y-1/2' :
            '-left-1 top-1/2 -translate-y-1/2'
          }`} />
        </div>
      )}
    </div>
  )
}

const InfoTooltip = ({ content }) => {
  return (
    <Tooltip content={content} position="top">
      <button className="inline-flex items-center justify-center w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </button>
    </Tooltip>
  )
}

export { Tooltip, InfoTooltip }
