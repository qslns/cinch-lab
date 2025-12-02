'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

type CursorVariant = 'default' | 'hover' | 'text' | 'link' | 'image' | 'hidden'

interface CursorState {
  variant: CursorVariant
  text?: string
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [cursorState, setCursorState] = useState<CursorState>({ variant: 'default' })
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  // Motion values for smooth cursor movement
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  // Spring config for smooth, elegant movement
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Detect mobile/touch devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.matchMedia('(pointer: coarse)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      )
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Main cursor tracking
  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Set up event listeners for interactive elements
    const setupInteractiveElements = () => {
      // Links and buttons
      const links = document.querySelectorAll('a, button, [role="button"]')
      links.forEach((el) => {
        el.addEventListener('mouseenter', () => setCursorState({ variant: 'link' }))
        el.addEventListener('mouseleave', () => setCursorState({ variant: 'default' }))
      })

      // Images
      const images = document.querySelectorAll('img, [data-cursor="image"]')
      images.forEach((el) => {
        el.addEventListener('mouseenter', () => setCursorState({ variant: 'image', text: 'View' }))
        el.addEventListener('mouseleave', () => setCursorState({ variant: 'default' }))
      })

      // Text elements with special cursor
      const textElements = document.querySelectorAll('[data-cursor="text"]')
      textElements.forEach((el) => {
        const text = el.getAttribute('data-cursor-text') || ''
        el.addEventListener('mouseenter', () => setCursorState({ variant: 'text', text }))
        el.addEventListener('mouseleave', () => setCursorState({ variant: 'default' }))
      })

      // Hide cursor on specific elements
      const hiddenElements = document.querySelectorAll('input, textarea, [data-cursor="hidden"]')
      hiddenElements.forEach((el) => {
        el.addEventListener('mouseenter', () => setCursorState({ variant: 'hidden' }))
        el.addEventListener('mouseleave', () => setCursorState({ variant: 'default' }))
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    // Initial setup
    setupInteractiveElements()

    // Use MutationObserver to detect new elements (with debounce)
    let debounceTimer: NodeJS.Timeout
    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(setupInteractiveElements, 100)
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      observer.disconnect()
      clearTimeout(debounceTimer)
    }
  }, [isMobile, isVisible, cursorX, cursorY])

  // Don't render on mobile
  if (isMobile) return null

  // Cursor sizes and styles based on variant
  const cursorVariants = {
    default: {
      width: 12,
      height: 12,
      backgroundColor: 'transparent',
      border: '1px solid rgba(10, 10, 10, 0.8)',
      mixBlendMode: 'difference' as const,
    },
    hover: {
      width: 48,
      height: 48,
      backgroundColor: 'rgba(139, 115, 85, 0.15)',
      border: '1px solid rgba(139, 115, 85, 0.5)',
      mixBlendMode: 'normal' as const,
    },
    link: {
      width: 56,
      height: 56,
      backgroundColor: 'rgba(10, 10, 10, 0.05)',
      border: '1px solid rgba(10, 10, 10, 0.3)',
      mixBlendMode: 'difference' as const,
    },
    image: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(10, 10, 10, 0.9)',
      border: 'none',
      mixBlendMode: 'normal' as const,
    },
    text: {
      width: 100,
      height: 100,
      backgroundColor: 'rgba(139, 115, 85, 0.95)',
      border: 'none',
      mixBlendMode: 'normal' as const,
    },
    hidden: {
      width: 0,
      height: 0,
      backgroundColor: 'transparent',
      border: 'none',
      mixBlendMode: 'normal' as const,
    },
  }

  const currentStyle = cursorVariants[cursorState.variant]

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: currentStyle.width,
          height: currentStyle.height,
          backgroundColor: currentStyle.backgroundColor,
          border: currentStyle.border,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { type: 'spring', damping: 20, stiffness: 300 },
          height: { type: 'spring', damping: 20, stiffness: 300 },
          backgroundColor: { duration: 0.2 },
          opacity: { duration: 0.2 },
        }}
      >
        {/* Text label for image/text variants */}
        {(cursorState.variant === 'image' || cursorState.variant === 'text') && cursorState.text && (
          <motion.span
            className="font-mono text-[9px] tracking-[0.2em] uppercase text-yon-white"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            {cursorState.text}
          </motion.span>
        )}
      </motion.div>

      {/* Dot cursor (always visible, follows precisely) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998] w-1 h-1 rounded-full bg-yon-black"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: isVisible && cursorState.variant !== 'hidden' ? 0.6 : 0,
          scale: cursorState.variant === 'default' ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Hide default cursor globally - only on pointer devices without reduced motion preference */}
      <style jsx global>{`
        @media (pointer: fine) and (prefers-reduced-motion: no-preference) {
          * {
            cursor: none !important;
          }
          /* Restore cursor for form elements for accessibility */
          input, textarea, select, [contenteditable] {
            cursor: text !important;
          }
          button, a, [role="button"] {
            cursor: pointer !important;
          }
        }
      `}</style>
    </>
  )
}
