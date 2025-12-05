'use client'

import { useLayoutEffect, useRef, createContext, useContext, useCallback } from 'react'
import Lenis from 'lenis'

// Create context for Lenis instance access
const LenisContext = createContext<Lenis | null>(null)

export function useLenisInstance() {
  return useContext(LenisContext)
}

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number | null>(null)

  const raf = useCallback((time: number) => {
    lenisRef.current?.raf(time)
    rafRef.current = requestAnimationFrame(raf)
  }, [])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Initialize Lenis with optimized settings for THE YON aesthetic
    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.01 : 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
    })

    lenisRef.current = lenis

    // Use native requestAnimationFrame for smooth animation
    rafRef.current = requestAnimationFrame(raf)

    // Listen for reduced motion changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        lenis.options.duration = 0.01
        lenis.options.smoothWheel = false
      } else {
        lenis.options.duration = 1.4
        lenis.options.smoothWheel = true
      }
    }
    motionQuery.addEventListener('change', handleMotionChange)

    // Expose lenis to window for debugging in development
    if (process.env.NODE_ENV === 'development') {
      ;(window as unknown as { lenis: Lenis }).lenis = lenis
    }

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      lenis.destroy()
    }
  }, [raf])

  return lenisRef.current
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenis = useLenis()

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}
