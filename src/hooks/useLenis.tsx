'use client'

import { useLayoutEffect, useRef, createContext, useContext } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Create context for Lenis instance access
const LenisContext = createContext<Lenis | null>(null)

export function useLenisInstance() {
  return useContext(LenisContext)
}

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Initialize Lenis with optimized settings for THE YON aesthetic
    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0.01 : 1.4, // Slightly longer for more elegant feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 0.8, // Slower wheel for more control
      touchMultiplier: 1.5,
      infinite: false,
    })

    lenisRef.current = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker for smoother animation
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

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
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

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