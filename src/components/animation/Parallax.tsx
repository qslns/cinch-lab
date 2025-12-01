'use client'

import { ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxProps {
  children: ReactNode
  speed?: number // -0.5 to 0.5 (negative = slower, positive = faster)
  direction?: 'vertical' | 'horizontal'
  className?: string
}

export default function Parallax({
  children,
  speed = 0.2,
  direction = 'vertical',
  className = '',
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Calculate transform based on speed
  // Speed ranges from -0.5 to 0.5
  // Negative = element moves slower than scroll (appears to lag behind)
  // Positive = element moves faster than scroll (appears to move ahead)
  const yRange = speed * 200
  const xRange = speed * 200

  const y = useTransform(scrollYProgress, [0, 1], [-yRange, yRange])
  const x = useTransform(scrollYProgress, [0, 1], [-xRange, xRange])

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        style={direction === 'vertical' ? { y } : { x }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Opacity parallax - fades based on scroll position
interface OpacityParallaxProps {
  children: ReactNode
  fadeIn?: boolean // true = fade in as scrolling, false = fade out
  className?: string
}

export function OpacityParallax({
  children,
  fadeIn = true,
  className = '',
}: OpacityParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const opacity = useTransform(
    scrollYProgress,
    fadeIn ? [0, 0.3, 0.7, 1] : [0, 0.3, 0.7, 1],
    fadeIn ? [0, 1, 1, 0] : [1, 1, 0.5, 0]
  )

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ opacity }}>
        {children}
      </motion.div>
    </div>
  )
}

// Scale parallax - scales based on scroll position
interface ScaleParallaxProps {
  children: ReactNode
  scaleRange?: [number, number] // [start scale, end scale]
  className?: string
}

export function ScaleParallax({
  children,
  scaleRange = [0.8, 1],
  className = '',
}: ScaleParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], scaleRange)

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale }}>
        {children}
      </motion.div>
    </div>
  )
}

// Rotate parallax - rotates based on scroll position
interface RotateParallaxProps {
  children: ReactNode
  rotateRange?: [number, number] // [start rotation, end rotation] in degrees
  className?: string
}

export function RotateParallax({
  children,
  rotateRange = [-5, 5],
  className = '',
}: RotateParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const rotate = useTransform(scrollYProgress, [0, 1], rotateRange)

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ rotate }}>
        {children}
      </motion.div>
    </div>
  )
}
