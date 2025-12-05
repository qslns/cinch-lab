'use client'

import { useLayoutEffect, useRef, createContext, useContext, useCallback, memo } from 'react'
import Lenis from 'lenis'

// Create context for Lenis instance access
const LenisContext = createContext<Lenis | null>(null)

export function useLenisInstance() {
  return useContext(LenisContext)
}

// Cached easing function to avoid recreation
const expoEaseOut = (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t))

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef<number>(0)
  const isRunningRef = useRef(false)

  const raf = useCallback((time: number) => {
    if (!isRunningRef.current) return
    lenisRef.current?.raf(time)
    rafRef.current = requestAnimationFrame(raf)
  }, [])

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const prefersReducedMotion = motionQuery.matches

    // Initialize Lenis with optimized settings
    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.01 : 1.4,
      easing: expoEaseOut,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
    })

    lenisRef.current = lenis
    isRunningRef.current = true

    // Start RAF loop
    rafRef.current = requestAnimationFrame(raf)

    // Handle reduced motion changes
    const handleMotionChange = (e: MediaQueryListEvent) => {
      if (lenisRef.current) {
        lenisRef.current.options.duration = e.matches ? 0.01 : 1.4
        lenisRef.current.options.smoothWheel = !e.matches
      }
    }
    motionQuery.addEventListener('change', handleMotionChange)

    // Dev debugging
    if (process.env.NODE_ENV === 'development') {
      (window as unknown as { lenis: Lenis }).lenis = lenis
    }

    // Cleanup
    return () => {
      isRunningRef.current = false
      motionQuery.removeEventListener('change', handleMotionChange)

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
      }

      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
    }
  }, [raf])

  return lenisRef.current
}

// Memoized provider to prevent unnecessary re-renders
const LenisProvider = memo(function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenis = useLenis()

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
})

export default LenisProvider
