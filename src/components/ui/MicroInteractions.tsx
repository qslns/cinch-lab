'use client'

import { ReactNode, useState, useRef } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({
  children,
  className,
  strength = 0.25
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distX = (e.clientX - centerX) * strength
    const distY = (e.clientY - centerY) * strength
    x.set(distX)
    y.set(distY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={cn('relative inline-block', className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

interface RippleButtonProps {
  children: ReactNode
  className?: string
  rippleColor?: string
}

export function RippleButton({
  children,
  className,
  rippleColor = 'rgba(255, 255, 255, 0.5)'
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples([...ripples, { x, y, id }])

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id))
    }, 1000)
  }

  return (
    <button
      className={cn('relative overflow-hidden', className)}
      onClick={handleClick}
    >
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: rippleColor
          }}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            width: 500,
            height: 500,
            x: -250,
            y: -250,
            opacity: 0
          }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      ))}
    </button>
  )
}

interface TextScrambleProps {
  text: string
  className?: string
  scrambleDuration?: number
}

export function TextScramble({
  text,
  className,
  scrambleDuration = 2000
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

  const scramble = () => {
    if (isScrambling) return
    setIsScrambling(true)

    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) return text[index]
            if (char === ' ') return ' '
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      if (iteration >= text.length) {
        clearInterval(interval)
        setIsScrambling(false)
      }

      iteration += 1 / 3
    }, 30)
  }

  return (
    <span
      className={cn('cursor-pointer select-none', className)}
      onMouseEnter={scramble}
    >
      {displayText}
    </span>
  )
}

interface ParallaxTextProps {
  children: ReactNode
  className?: string
  speed?: number
}

export function ParallaxText({
  children,
  className,
  speed = 0.5
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * speed)
    y.set((e.clientY - centerY) * speed)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={cn('inline-block', className)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}

interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  return (
    <span
      className={cn('relative inline-block', className)}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <motion.span
            className="absolute top-0 left-0 text-cyan-400"
            initial={{ x: 0 }}
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 text-red-400"
            initial={{ x: 0 }}
            animate={{ x: [2, -2, 2] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          >
            {text}
          </motion.span>
        </>
      )}
    </span>
  )
}