'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

type CursorVariant = 'default' | 'link' | 'hidden'

export default function CustomCursor() {
  const [variant, setVariant] = useState<CursorVariant>('default')
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)

  // Precise, controlled movement - less bouncy
  const springConfig = { damping: 50, stiffness: 300, mass: 1 }
  const x = useSpring(cursorX, springConfig)
  const y = useSpring(cursorY, springConfig)

  // Mobile detection
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

  // Cursor tracking
  useEffect(() => {
    if (isMobile) return

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    const setupElements = () => {
      // Interactive elements - subtle hover only
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.addEventListener('mouseenter', () => setVariant('link'))
        el.addEventListener('mouseleave', () => setVariant('default'))
      })

      // Hide on form elements
      document.querySelectorAll('input, textarea, select').forEach((el) => {
        el.addEventListener('mouseenter', () => setVariant('hidden'))
        el.addEventListener('mouseleave', () => setVariant('default'))
      })
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    setupElements()

    // Observe DOM changes
    let timer: NodeJS.Timeout
    const observer = new MutationObserver(() => {
      clearTimeout(timer)
      timer = setTimeout(setupElements, 150)
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      observer.disconnect()
      clearTimeout(timer)
    }
  }, [isMobile, isVisible, cursorX, cursorY])

  if (isMobile) return null

  return (
    <>
      {/* Single minimal cursor - ring only */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          borderStyle: 'solid',
          backgroundColor: 'transparent',
        }}
        animate={{
          width: variant === 'hidden' ? 0 : 10,
          height: variant === 'hidden' ? 0 : 10,
          opacity: isVisible && variant !== 'hidden' ? 1 : 0,
          borderWidth: variant === 'link' ? 1.5 : 1,
          borderColor: variant === 'link'
            ? 'rgba(139, 115, 85, 0.8)'
            : 'rgba(10, 10, 10, 0.5)',
        }}
        transition={{
          width: { duration: 0.15 },
          height: { duration: 0.15 },
          opacity: { duration: 0.15 },
          borderWidth: { duration: 0.15 },
          borderColor: { duration: 0.2 },
        }}
      />

      {/* Hide default cursor */}
      <style jsx global>{`
        @media (pointer: fine) and (prefers-reduced-motion: no-preference) {
          * { cursor: none !important; }
          input, textarea, select, [contenteditable] { cursor: text !important; }
          button, a, [role="button"] { cursor: pointer !important; }
        }
      `}</style>
    </>
  )
}
