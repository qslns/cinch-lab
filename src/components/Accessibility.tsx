'use client'

// Accessibility Components and Utilities

import React, { useEffect, useState } from 'react'

// Skip to main content link
export function SkipToMain() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-black text-white px-4 py-2 rounded-md z-[9999] focus:outline-none focus:ring-2 focus:ring-white"
    >
      Skip to main content
    </a>
  )
}

// Screen reader only text
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return <span className="sr-only">{children}</span>
}

// Keyboard navigation indicator
export function KeyboardNavigationIndicator() {
  const [isKeyboardNav, setIsKeyboardNav] = useState(false)

  useEffect(() => {
    const handleMouseDown = () => setIsKeyboardNav(false)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsKeyboardNav(true)
      }
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (isKeyboardNav) {
      document.body.classList.add('keyboard-navigation')
    } else {
      document.body.classList.remove('keyboard-navigation')
    }
  }, [isKeyboardNav])

  return null
}

// Announce component for screen readers
export function Announce({ message, priority = 'polite' }: {
  message: string
  priority?: 'polite' | 'assertive'
}) {
  return (
    <div
      role="status"
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  )
}

// Focus trap component
interface FocusTrapProps {
  children: React.ReactNode
  active?: boolean
  returnFocus?: boolean
}

export function FocusTrap({ children, active = true, returnFocus = true }: FocusTrapProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const previousFocusRef = React.useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!active) return

    previousFocusRef.current = document.activeElement as HTMLElement

    const container = containerRef.current
    if (!container) return

    const focusableElements = container.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    )

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    firstElement?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('keydown', handleKeyDown)
      if (returnFocus && previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [active, returnFocus])

  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}

// Accessible modal wrapper
interface AccessibleModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function AccessibleModal({ isOpen, onClose, title, children }: AccessibleModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
        aria-hidden="true"
      />
      <FocusTrap active={isOpen}>
        <div className="relative bg-black border border-white/20 rounded-lg p-6 max-w-lg w-full mx-4">
          <h2 id="modal-title" className="text-2xl font-bold mb-4">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
            aria-label="Close modal"
          >
            ×
          </button>
          {children}
        </div>
      </FocusTrap>
    </div>
  )
}

// Accessible tooltip
interface AccessibleTooltipProps {
  content: string
  children: React.ReactNode
}

export function AccessibleTooltip({ content, children }: AccessibleTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const tooltipId = React.useId()

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        aria-describedby={tooltipId}
      >
        {children}
      </div>
      {isVisible && (
        <div
          id={tooltipId}
          role="tooltip"
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap z-50"
        >
          {content}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  )
}

// Accessible loading indicator
export function AccessibleLoadingIndicator({ label = 'Loading...' }: { label?: string }) {
  return (
    <div role="status" aria-label={label} className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
      <ScreenReaderOnly>{label}</ScreenReaderOnly>
    </div>
  )
}

// High contrast mode detector
export function useHighContrastMode() {
  const [isHighContrast, setIsHighContrast] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)')
    setIsHighContrast(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsHighContrast(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return isHighContrast
}

// Reduced motion detector
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

// Accessible form field
interface AccessibleFormFieldProps {
  id: string
  label: string
  error?: string
  required?: boolean
  children: React.ReactElement
}

export function AccessibleFormField({
  id,
  label,
  error,
  required,
  children
}: AccessibleFormFieldProps) {
  const errorId = `${id}-error`
  const describedBy = error ? errorId : undefined

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-2 font-medium">
        {label}
        {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
      </label>
      {React.cloneElement(children, {
        id,
        'aria-describedby': describedBy,
        'aria-invalid': !!error,
        'aria-required': required
      } as any)}
      {error && (
        <p id={errorId} className="mt-1 text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

// Accessible navigation
interface AccessibleNavProps {
  items: Array<{
    label: string
    href: string
    active?: boolean
  }>
}

export function AccessibleNav({ items }: AccessibleNavProps) {
  return (
    <nav aria-label="Main navigation">
      <ul className="flex space-x-4">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={`px-3 py-2 rounded-md ${
                item.active
                  ? 'bg-white text-black'
                  : 'text-white hover:bg-white/10'
              }`}
              aria-current={item.active ? 'page' : undefined}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

// Accessible image
interface AccessibleImageProps {
  src: string
  alt: string
  decorative?: boolean
  className?: string
}

export function AccessibleImage({ src, alt, decorative = false, className }: AccessibleImageProps) {
  return (
    <img
      src={src}
      alt={decorative ? '' : alt}
      role={decorative ? 'presentation' : undefined}
      className={className}
    />
  )
}

// Focus visible polyfill
export function setupFocusVisible() {
  if (typeof window === 'undefined') return

  // Add focus-visible class when keyboard navigation is detected
  const style = document.createElement('style')
  style.textContent = `
    .keyboard-navigation *:focus {
      outline: 2px solid currentColor;
      outline-offset: 2px;
    }

    .keyboard-navigation *:focus:not(:focus-visible) {
      outline: none;
    }
  `
  document.head.appendChild(style)
}