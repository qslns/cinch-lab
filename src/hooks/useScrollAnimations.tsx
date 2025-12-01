'use client'

import React, { useEffect, useRef, RefObject, ElementType, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Animation types for THE YON aesthetic
export type RevealAnimation =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'scale-up'
  | 'rotate-in'
  | 'clip-up'
  | 'clip-down'
  | 'clip-left'
  | 'clip-right'
  | 'split-lines'
  | 'stagger-children'
  | 'parallax'

interface ScrollAnimationOptions {
  animation: RevealAnimation
  duration?: number
  delay?: number
  ease?: string
  stagger?: number
  scrub?: boolean | number
  start?: string
  end?: string
  markers?: boolean
  once?: boolean
}

// Default animation configs
const defaultOptions: Partial<ScrollAnimationOptions> = {
  duration: 1,
  delay: 0,
  ease: 'power3.out',
  stagger: 0.1,
  scrub: false,
  start: 'top 85%',
  end: 'top 20%',
  markers: false,
  once: true,
}

/**
 * useScrollReveal - Trigger animations when element enters viewport
 */
export function useScrollReveal<T extends HTMLElement>(
  options: ScrollAnimationOptions
): RefObject<T> {
  const ref = useRef<T>(null)
  const opts = useMemo(() => ({ ...defaultOptions, ...options }), [
    options.animation,
    options.duration,
    options.delay,
    options.ease,
    options.stagger,
    options.scrub,
    options.start,
    options.end,
    options.markers,
    options.once,
  ])

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      // Set initial state based on animation type
      const initialState = getInitialState(opts.animation)
      const animateState = getAnimateState(opts.animation)

      gsap.set(element, initialState)

      ScrollTrigger.create({
        trigger: element,
        start: opts.start,
        end: opts.end,
        markers: opts.markers,
        once: opts.once,
        onEnter: () => {
          gsap.to(element, {
            ...animateState,
            duration: opts.duration,
            delay: opts.delay,
            ease: opts.ease,
          })
        },
      })
    }, element)

    return () => ctx.revert()
  }, [opts])

  return ref as RefObject<T>
}

/**
 * useScrollParallax - Create parallax effect on scroll
 */
export function useScrollParallax<T extends HTMLElement>(
  speed: number = 0.5,
  direction: 'vertical' | 'horizontal' = 'vertical'
): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      const distance = 100 * speed

      gsap.to(element, {
        [direction === 'vertical' ? 'y' : 'x']: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, element)

    return () => ctx.revert()
  }, [speed, direction])

  return ref as RefObject<T>
}

/**
 * useScrollPin - Pin element during scroll
 */
export function useScrollPin<T extends HTMLElement>(
  options?: {
    pinSpacing?: boolean
    anticipatePin?: number
    start?: string
    end?: string
  }
): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: options?.start || 'top top',
        end: options?.end || '+=100%',
        pin: true,
        pinSpacing: options?.pinSpacing ?? true,
        anticipatePin: options?.anticipatePin ?? 1,
      })
    }, element)

    return () => ctx.revert()
  }, [options])

  return ref as RefObject<T>
}

/**
 * useStaggerReveal - Reveal children with stagger effect
 */
export function useStaggerReveal<T extends HTMLElement>(
  options?: {
    animation?: RevealAnimation
    stagger?: number
    duration?: number
    ease?: string
    start?: string
  }
): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const children = element.children
    if (!children.length) return

    const ctx = gsap.context(() => {
      const animation = options?.animation || 'fade-up'
      const initialState = getInitialState(animation)
      const animateState = getAnimateState(animation)

      gsap.set(children, initialState)

      ScrollTrigger.create({
        trigger: element,
        start: options?.start || 'top 80%',
        once: true,
        onEnter: () => {
          gsap.to(children, {
            ...animateState,
            duration: options?.duration || 0.8,
            stagger: options?.stagger || 0.15,
            ease: options?.ease || 'power3.out',
          })
        },
      })
    }, element)

    return () => ctx.revert()
  }, [options])

  return ref as RefObject<T>
}

/**
 * useTextReveal - Animate text character by character or line by line
 */
export function useTextReveal<T extends HTMLElement>(
  options?: {
    type?: 'chars' | 'words' | 'lines'
    stagger?: number
    duration?: number
    ease?: string
  }
): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      const text = element.textContent || ''
      const type = options?.type || 'chars'

      let items: string[]
      if (type === 'chars') {
        items = text.split('')
      } else if (type === 'words') {
        items = text.split(' ')
      } else {
        items = [text] // For lines, we'll handle differently
      }

      // Wrap each item in a span
      element.innerHTML = items
        .map((item, i) => {
          const space = type === 'words' && i < items.length - 1 ? '&nbsp;' : ''
          return `<span class="text-reveal-item" style="display: inline-block; overflow: hidden;"><span class="text-reveal-inner" style="display: inline-block;">${item}${space}</span></span>`
        })
        .join('')

      const innerElements = element.querySelectorAll('.text-reveal-inner')

      gsap.set(innerElements, { y: '100%', opacity: 0 })

      ScrollTrigger.create({
        trigger: element,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(innerElements, {
            y: '0%',
            opacity: 1,
            duration: options?.duration || 0.6,
            stagger: options?.stagger || 0.03,
            ease: options?.ease || 'power3.out',
          })
        },
      })
    }, element)

    return () => ctx.revert()
  }, [options])

  return ref as RefObject<T>
}

/**
 * useScrollProgress - Track scroll progress within a section
 */
export function useScrollProgress<T extends HTMLElement>(
  callback: (progress: number) => void
): RefObject<T> {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => callback(self.progress),
      })
    }, element)

    return () => ctx.revert()
  }, [callback])

  return ref as RefObject<T>
}

// Helper functions
function getInitialState(animation: RevealAnimation): gsap.TweenVars {
  switch (animation) {
    case 'fade-up':
      return { opacity: 0, y: 60 }
    case 'fade-down':
      return { opacity: 0, y: -60 }
    case 'fade-left':
      return { opacity: 0, x: 60 }
    case 'fade-right':
      return { opacity: 0, x: -60 }
    case 'scale-up':
      return { opacity: 0, scale: 0.8 }
    case 'rotate-in':
      return { opacity: 0, rotation: -10, y: 40 }
    case 'clip-up':
      return { clipPath: 'inset(100% 0 0 0)' }
    case 'clip-down':
      return { clipPath: 'inset(0 0 100% 0)' }
    case 'clip-left':
      return { clipPath: 'inset(0 100% 0 0)' }
    case 'clip-right':
      return { clipPath: 'inset(0 0 0 100%)' }
    default:
      return { opacity: 0, y: 30 }
  }
}

function getAnimateState(animation: RevealAnimation): gsap.TweenVars {
  switch (animation) {
    case 'fade-up':
    case 'fade-down':
      return { opacity: 1, y: 0 }
    case 'fade-left':
    case 'fade-right':
      return { opacity: 1, x: 0 }
    case 'scale-up':
      return { opacity: 1, scale: 1 }
    case 'rotate-in':
      return { opacity: 1, rotation: 0, y: 0 }
    case 'clip-up':
    case 'clip-down':
    case 'clip-left':
    case 'clip-right':
      return { clipPath: 'inset(0 0 0 0)' }
    default:
      return { opacity: 1, y: 0 }
  }
}

// Export a component-based approach for easier use
export function ScrollReveal({
  children,
  animation = 'fade-up',
  className = '',
  as: Component = 'div',
  ...options
}: {
  children: React.ReactNode
  animation?: RevealAnimation
  className?: string
  as?: ElementType
} & Partial<ScrollAnimationOptions>) {
  const ref = useScrollReveal<HTMLDivElement>({ animation, ...options })
  const Tag = Component as ElementType

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={className}>
      {children}
    </Tag>
  )
}
