'use client'

import { useEffect, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, CustomEase)

  // Create custom eases
  CustomEase.create("cinchEase", "M0,0 C0.23,1 0.32,1 1,1")
  CustomEase.create("cinchBounce", "M0,0 C0.68,-0.55 0.27,1.55 1,1")
}

// Magnetic cursor effect - reduced 3D effect for better character hover visibility
export function useMagneticCursor(strength = 0.15) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current
    let animating = false

    const handleMouseMove = (e: MouseEvent) => {
      if (animating) return

      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distanceX = e.clientX - centerX
      const distanceY = e.clientY - centerY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

      const maxDistance = 150

      if (distance < maxDistance) {
        const power = (maxDistance - distance) / maxDistance
        gsap.to(element, {
          x: distanceX * strength * power * 0.5,
          y: distanceY * strength * power * 0.5,
          duration: 0.2,
          ease: "power2.out"
        })
      }
    }

    const handleMouseLeave = () => {
      animating = true
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => { animating = false }
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return elementRef
}

// Parallax effect
export function useParallax(speed = 0.5) {
  const elementRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current

    gsap.fromTo(element,
      { y: -100 * speed },
      {
        y: 100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [speed])

  return elementRef
}

// Text scramble effect
export function useTextScramble(text: string, duration = 1) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
    const element = elementRef.current
    let interval: NodeJS.Timeout
    let iteration = 0

    const scramble = () => {
      element.innerText = text
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return text[index]
          }
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join("")

      if (iteration >= text.length) {
        clearInterval(interval)
      }
      iteration += 1/3
    }

    interval = setInterval(scramble, 30)

    return () => clearInterval(interval)
  }, [text, duration])

  return elementRef
}

// 3D tilt effect - reduced for better readability
export function use3DTilt(perspective = 1500) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current
    element.style.transformStyle = 'preserve-3d'
    element.style.perspective = `${perspective}px`

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      const tiltX = (y - 0.5) * 8
      const tiltY = (x - 0.5) * -8

      gsap.to(element, {
        rotationX: tiltX,
        rotationY: tiltY,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: perspective
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [perspective])

  return elementRef
}

// Stagger reveal animation
export function useStaggerReveal(delay = 0.1) {
  const containerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!containerRef.current) return

    const elements = containerRef.current.children

    gsap.set(elements, {
      opacity: 0,
      y: 50,
      rotationX: -90,
      transformOrigin: "top center"
    })

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: delay,
          ease: "cinchEase",
        })
      },
      once: true
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [delay])

  return containerRef
}

// Morph shape effect
export function useMorphShape() {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!pathRef.current) return

    const shapes = [
      "M100,10 C200,10 290,100 290,200 C290,300 200,390 100,390 C0,390 -90,300 -90,200 C-90,100 0,10 100,10",
      "M150,10 C250,10 340,100 340,200 C340,300 250,390 150,390 C50,390 -40,300 -40,200 C-40,100 50,10 150,10",
      "M100,50 C200,50 250,100 250,200 C250,300 200,350 100,350 C0,350 -50,300 -50,200 C-50,100 0,50 100,50"
    ]

    let currentShape = 0
    const morphInterval = setInterval(() => {
      gsap.to(pathRef.current, {
        attr: { d: shapes[currentShape] },
        duration: 2,
        ease: "power2.inOut"
      })
      currentShape = (currentShape + 1) % shapes.length
    }, 3000)

    return () => clearInterval(morphInterval)
  }, [])

  return pathRef
}

// Infinite marquee
export function useMarquee(speed = 50) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const content = container.querySelector('.marquee-content') as HTMLElement
    if (!content) return

    const contentWidth = content.offsetWidth

    gsap.set(content, { xPercent: 0 })

    const tl = gsap.timeline({ repeat: -1 })
    tl.to(content, {
      xPercent: -100,
      duration: contentWidth / speed,
      ease: "none",
    })

    return () => {
      tl.kill()
    }
  }, [speed])

  return containerRef
}