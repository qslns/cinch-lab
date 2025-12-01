'use client'

import { ReactNode } from 'react'
import { motion, Variants } from 'framer-motion'

// THE YON custom easing
const yonEase = [0.22, 1, 0.36, 1] as const

type RevealVariant = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'rotateIn'

interface ScrollRevealProps {
  children: ReactNode
  variant?: RevealVariant
  delay?: number
  duration?: number
  once?: boolean
  margin?: string
  className?: string
}

// Animation variants for different reveal effects
const revealVariants: Record<RevealVariant, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -5, y: 20 },
    visible: { opacity: 1, rotate: 0, y: 0 },
  },
}

export default function ScrollReveal({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration = 0.6,
  once = true,
  margin = '-100px',
  className = '',
}: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={revealVariants[variant]}
      transition={{
        duration,
        delay,
        ease: yonEase,
      }}
    >
      {children}
    </motion.div>
  )
}

// Named exports for specific variants
export function FadeUp(props: Omit<ScrollRevealProps, 'variant'>) {
  return <ScrollReveal {...props} variant="fadeUp" />
}

export function FadeIn(props: Omit<ScrollRevealProps, 'variant'>) {
  return <ScrollReveal {...props} variant="fadeIn" />
}

export function SlideLeft(props: Omit<ScrollRevealProps, 'variant'>) {
  return <ScrollReveal {...props} variant="slideLeft" />
}

export function SlideRight(props: Omit<ScrollRevealProps, 'variant'>) {
  return <ScrollReveal {...props} variant="slideRight" />
}

export function ScaleUp(props: Omit<ScrollRevealProps, 'variant'>) {
  return <ScrollReveal {...props} variant="scaleUp" />
}

export function RotateIn(props: Omit<ScrollRevealProps, 'variant'>) {
  return <ScrollReveal {...props} variant="rotateIn" />
}
