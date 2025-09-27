'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Skip to Main Content
export const SkipToMain = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:font-bold"
    >
      Skip to main content
    </a>
  )
}

// Keyboard Navigation Indicator
export const KeyboardNavigationIndicator = () => {
  const [isKeyboardNav, setIsKeyboardNav] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardNav(true)
      }
    }

    const handleMouseDown = () => {
      setIsKeyboardNav(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousedown', handleMouseDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  useEffect(() => {
    if (isKeyboardNav) {
      document.body.classList.add('keyboard-nav')
    } else {
      document.body.classList.remove('keyboard-nav')
    }
  }, [isKeyboardNav])

  return null
}

// Focus Trap for Modals
export const FocusTrap = ({ children, isActive }: { children: React.ReactNode; isActive: boolean }) => {
  useEffect(() => {
    if (!isActive) return

    const trapContainer = document.querySelector('[data-focus-trap]') as HTMLElement
    if (!trapContainer) return

    const focusableElements = trapContainer.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const closeButton = trapContainer.querySelector('[data-close-button]') as HTMLElement
        if (closeButton) {
          closeButton.click()
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)
    document.addEventListener('keydown', handleEscapeKey)

    // Focus first element
    firstElement?.focus()

    return () => {
      document.removeEventListener('keydown', handleTabKey)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isActive])

  return <div data-focus-trap>{children}</div>
}

// Announce for Screen Readers
export const ScreenReaderAnnounce = ({ message, priority = 'polite' }: { message: string; priority?: 'polite' | 'assertive' }) => {
  const [announced, setAnnounced] = useState('')

  useEffect(() => {
    setAnnounced(message)
    const timer = setTimeout(() => setAnnounced(''), 100)
    return () => clearTimeout(timer)
  }, [message])

  return (
    <div
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {announced}
    </div>
  )
}

// Visual Focus Indicator
export const VisualFocusIndicator = () => {
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null)
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 })

  useEffect(() => {
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement
      if (target && target.tagName !== 'BODY') {
        setFocusedElement(target)
        const rect = target.getBoundingClientRect()
        setFocusRect({
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY,
          width: rect.width,
          height: rect.height
        })
      }
    }

    const handleBlur = () => {
      setFocusedElement(null)
    }

    document.addEventListener('focusin', handleFocus)
    document.addEventListener('focusout', handleBlur)

    return () => {
      document.removeEventListener('focusin', handleFocus)
      document.removeEventListener('focusout', handleBlur)
    }
  }, [])

  return (
    <AnimatePresence>
      {focusedElement && document.body.classList.contains('keyboard-nav') && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none fixed z-[9999] border-2 border-red-500"
          style={{
            left: focusRect.x - 4,
            top: focusRect.y - 4,
            width: focusRect.width + 8,
            height: focusRect.height + 8,
          }}
        />
      )}
    </AnimatePresence>
  )
}

// Loading State for Screen Readers
export const LoadingAnnouncement = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={isLoading}
      className="sr-only"
    >
      {isLoading ? 'Loading content...' : 'Content loaded'}
    </div>
  )
}

// Accessible Button
export const AccessibleButton = ({
  children,
  onClick,
  ariaLabel,
  disabled = false,
  className = ''
}: {
  children: React.ReactNode
  onClick: () => void
  ariaLabel: string
  disabled?: boolean
  className?: string
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className={`${className} focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
      aria-disabled={disabled}
    >
      {children}
    </button>
  )
}

// Accessible Modal
export const AccessibleModal = ({
  isOpen,
  onClose,
  title,
  children
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.setAttribute('aria-hidden', 'true')
    } else {
      document.body.style.overflow = ''
      document.body.removeAttribute('aria-hidden')
    }

    return () => {
      document.body.style.overflow = ''
      document.body.removeAttribute('aria-hidden')
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <FocusTrap isActive={isOpen}>
        <div className="bg-white p-8 max-w-2xl w-full m-4">
          <h2 id="modal-title" className="text-2xl font-bold mb-4">
            {title}
          </h2>
          <button
            data-close-button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2"
          >
            <span aria-hidden="true">×</span>
          </button>
          {children}
        </div>
      </FocusTrap>
    </div>
  )
}