'use client'

import { useEffect, useRef, ReactNode } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface SmoothScrollProviderProps {
  children: ReactNode
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 2,
      infinite: false
    })

    lenisRef.current = lenis

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update)

    // Add Lenis tick to GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Handle scroll to anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement

      if (anchor) {
        e.preventDefault()
        const targetId = anchor.getAttribute('href')
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId) as HTMLElement
          if (targetElement) {
            lenis.scrollTo(targetElement, {
              offset: 0,
              duration: 1.5,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            })
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick)
      lenis.destroy()
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000)
      })
    }
  }, [])

  return <>{children}</>
}