'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { cn } from '@/lib/utils'

// Kinetic Typography - 텍스트가 유체처럼 움직이는 효과
export function KineticText({
  text,
  className,
  delay = 0
}: {
  text: string
  className?: string
  delay?: number
}) {
  return (
    <span className={cn('inline-block', className)}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: 100, opacity: 0, scale: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1
          }}
          transition={{
            delay: delay + i * 0.05,
            duration: 0.8,
            ease: [0.215, 0.61, 0.355, 1],
            type: 'spring',
            damping: 12
          }}
          whileHover={{
            y: -10,
            scale: 1.2,
            color: '#3b82f6',
            transition: { duration: 0.2 }
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

// 3D Depth Text - 깊이감 있는 3D 텍스트
export function DepthText({
  text,
  className
}: {
  text: string
  className?: string
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [-300, 300], [15, -15])
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <motion.div
      className={cn('relative inline-block', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0)
        mouseY.set(0)
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
    >
      <span
        className="block relative"
        style={{
          transform: 'translateZ(50px)',
          textShadow: `
            1px 1px 0 rgba(255,255,255,0.1),
            2px 2px 0 rgba(255,255,255,0.08),
            3px 3px 0 rgba(255,255,255,0.06),
            4px 4px 0 rgba(255,255,255,0.04),
            5px 5px 10px rgba(0,0,0,0.5)
          `
        }}
      >
        {text}
      </span>
    </motion.div>
  )
}

// Liquid Text - 액체처럼 흐르는 텍스트
export function LiquidText({
  text,
  className
}: {
  text: string
  className?: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span
      className={cn('relative inline-block', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          animate={{
            y: isHovered ? [0, -5, 0] : 0,
            scaleY: isHovered ? [1, 1.3, 1] : 1
          }}
          transition={{
            delay: i * 0.03,
            duration: 0.4,
            ease: 'easeInOut'
          }}
          style={{
            display: 'inline-block',
            transformOrigin: 'bottom'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}

// Variable Weight Text - 호버시 굵기가 변하는 텍스트
export function VariableText({
  text,
  className
}: {
  text: string
  className?: string
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <span className={cn('inline-block', className)}>
      {text.split('').map((char, i) => {
        const distance = hoveredIndex !== null ? Math.abs(i - hoveredIndex) : 10
        const weight = hoveredIndex !== null ? Math.max(100, 900 - distance * 150) : 400

        return (
          <motion.span
            key={i}
            className="inline-block cursor-pointer"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              fontWeight: weight,
              scale: hoveredIndex === i ? 1.2 : 1
            }}
            transition={{
              duration: 0.3,
              ease: 'easeOut'
            }}
            style={{
              fontVariationSettings: `'wght' ${weight}`
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        )
      })}
    </span>
  )
}

// Split Reveal Text - 분할되며 나타나는 텍스트
export function SplitRevealText({
  text,
  className,
  delay = 0
}: {
  text: string
  className?: string
  delay?: number
}) {
  return (
    <span className={cn('inline-block overflow-hidden', className)}>
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: delay + (wordIndex * 0.1 + charIndex * 0.02),
                duration: 0.5,
                ease: [0.455, 0.03, 0.515, 0.955]
              }}
            >
              {char}
            </motion.span>
          ))}
          <span className="inline-block">&nbsp;</span>
        </span>
      ))}
    </span>
  )
}

// Gradient Shift Text - 그라디언트가 움직이는 텍스트
export function GradientText({
  text,
  className
}: {
  text: string
  className?: string
}) {
  const [gradientPos, setGradientPos] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPos(prev => (prev + 1) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className={cn('inline-block font-bold', className)}
      style={{
        background: `linear-gradient(${gradientPos}deg,
          #ff0080 0%,
          #ff8c00 25%,
          #40e0d0 50%,
          #ff0080 75%,
          #ff8c00 100%)`,
        backgroundSize: '200% 200%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}
    >
      {text}
    </span>
  )
}

// Morphing Text - 변형되는 텍스트
export function MorphingText({
  texts,
  className
}: {
  texts: string[]
  className?: string
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % texts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [texts.length])

  return (
    <span className={cn('relative inline-block', className)}>
      {texts.map((text, index) => (
        <motion.span
          key={index}
          className="absolute left-0 top-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: currentIndex === index ? 1 : 0,
            y: currentIndex === index ? 0 : -20
          }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut'
          }}
        >
          {text}
        </motion.span>
      ))}
      <span className="invisible">{texts[0]}</span>
    </span>
  )
}