import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export interface GsapScrollOptions {
  trigger: string
  start?: string
  end?: string
  scrub?: boolean | number
  pin?: boolean
  markers?: boolean
  onEnter?: () => void
  onLeave?: () => void
  onEnterBack?: () => void
  onLeaveBack?: () => void
}

/**
 * Custom hook for GSAP ScrollTrigger animations
 */
export const useGsapScroll = (options: GsapScrollOptions) => {
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: options.trigger,
      start: options.start || 'top center',
      end: options.end || 'bottom center',
      scrub: options.scrub || false,
      pin: options.pin || false,
      markers: options.markers || false,
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      onEnterBack: options.onEnterBack,
      onLeaveBack: options.onLeaveBack,
    })

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
      }
    }
  }, [options])

  return scrollTriggerRef
}

/**
 * Parallax effect with GSAP
 */
export const useGsapParallax = (
  elementRef: React.RefObject<HTMLElement>,
  yPercent: number = 50
) => {
  useEffect(() => {
    if (typeof window === 'undefined' || !elementRef.current) return

    const element = elementRef.current

    gsap.to(element, {
      yPercent: yPercent,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [elementRef, yPercent])
}

/**
 * Fade in animation with GSAP
 */
export const useGsapFadeIn = (
  elementRef: React.RefObject<HTMLElement>,
  options?: {
    duration?: number
    delay?: number
    y?: number
    stagger?: number
  }
) => {
  useEffect(() => {
    if (typeof window === 'undefined' || !elementRef.current) return

    const element = elementRef.current
    const children = element.children

    gsap.from(children, {
      opacity: 0,
      y: options?.y || 30,
      duration: options?.duration || 0.8,
      delay: options?.delay || 0,
      stagger: options?.stagger || 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [elementRef, options])
}

/**
 * Rotate animation with GSAP
 */
export const useGsapRotate = (
  elementRef: React.RefObject<HTMLElement>,
  rotation: number = 360
) => {
  useEffect(() => {
    if (typeof window === 'undefined' || !elementRef.current) return

    const element = elementRef.current

    gsap.to(element, {
      rotation: rotation,
      duration: 20,
      ease: 'none',
      repeat: -1,
    })

    return () => {
      gsap.killTweensOf(element)
    }
  }, [elementRef, rotation])
}

/**
 * Scale on scroll with GSAP
 */
export const useGsapScale = (
  elementRef: React.RefObject<HTMLElement>,
  scale: number = 1.2
) => {
  useEffect(() => {
    if (typeof window === 'undefined' || !elementRef.current) return

    const element = elementRef.current

    gsap.to(element, {
      scale: scale,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [elementRef, scale])
}

/**
 * Horizontal scroll with GSAP
 */
export const useGsapHorizontalScroll = (
  containerRef: React.RefObject<HTMLElement>,
  scrollDistance?: number
) => {
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    const container = containerRef.current
    const distance = scrollDistance || container.scrollWidth - container.clientWidth

    gsap.to(container, {
      x: -distance,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${distance}`,
        scrub: 1,
        pin: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [containerRef, scrollDistance])
}

/**
 * Text reveal animation with GSAP
 */
export const useGsapTextReveal = (elementRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (typeof window === 'undefined' || !elementRef.current) return

    const element = elementRef.current
    const text = element.textContent
    if (!text) return

    // Split text into characters
    element.innerHTML = text
      .split('')
      .map((char) => `<span style="display:inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('')

    const chars = element.querySelectorAll('span')

    gsap.from(chars, {
      opacity: 0,
      y: 20,
      rotateX: -90,
      duration: 0.6,
      stagger: 0.02,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [elementRef])
}

/**
 * Pin element on scroll
 */
export const useGsapPin = (
  elementRef: React.RefObject<HTMLElement>,
  duration: number = 1000
) => {
  useEffect(() => {
    if (typeof window === 'undefined' || !elementRef.current) return

    const element = elementRef.current

    ScrollTrigger.create({
      trigger: element,
      start: 'top top',
      end: `+=${duration}`,
      pin: true,
      pinSpacing: true,
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [elementRef, duration])
}

/**
 * Cleanup all ScrollTriggers
 */
export const cleanupScrollTriggers = () => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }
}