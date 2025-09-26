'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface KineticTextProps {
  text: string
  className?: string
  mode?: 'morph' | 'distort' | 'split' | 'deconstruct' | 'elastic' | 'glitch'
  delay?: number
  stagger?: number
}

export default function KineticText({
  text,
  className = '',
  mode = 'morph',
  delay = 0,
  stagger = 0.02
}: KineticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for smooth morphing
  const springConfig = { damping: 15, stiffness: 150 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Split text into characters for individual animation
  const characters = text.split('').map((char, index) => ({
    char: char === ' ' ? '\u00A0' : char, // Non-breaking space
    index
  }))

  useEffect(() => {
    if (!containerRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distanceX = (e.clientX - centerX) / rect.width
      const distanceY = (e.clientY - centerY) / rect.height

      mouseX.set(distanceX * 20)
      mouseY.set(distanceY * 10)
    }

    if (isHovered && (mode === 'distort' || mode === 'elastic')) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isHovered, mode, mouseX, mouseY])

  // Animation variants for different modes
  const getVariants = () => {
    switch (mode) {
      case 'morph':
        return {
          initial: {
            fontWeight: 200,
            letterSpacing: '0em'
          },
          animate: {
            fontWeight: [200, 900, 200],
            letterSpacing: ['0em', '0.1em', '0em'],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }
        }

      case 'split':
        return {
          initial: { y: 0, opacity: 1 },
          hover: {
            y: [-2, 2, -2],
            transition: {
              duration: 0.3,
              repeat: Infinity
            }
          }
        }

      case 'deconstruct':
        return {
          initial: {
            opacity: 1,
            x: 0,
            y: 0,
            rotate: 0
          },
          hover: (i: number) => ({
            x: Math.random() * 40 - 20,
            y: Math.random() * 40 - 20,
            rotate: Math.random() * 30 - 15,
            transition: {
              delay: i * 0.01,
              duration: 0.4,
              ease: 'easeOut'
            }
          }),
          rest: {
            x: 0,
            y: 0,
            rotate: 0,
            transition: {
              duration: 0.8,
              ease: 'easeInOut'
            }
          }
        }

      case 'glitch':
        return {
          initial: { skewX: 0, scaleY: 1 },
          animate: {
            skewX: [0, 2, -2, 1, -1, 0],
            scaleY: [1, 1.02, 0.98, 1.01, 0.99, 1],
            transition: {
              duration: 0.3,
              repeat: Infinity,
              repeatDelay: 3
            }
          }
        }

      default:
        return {}
    }
  }

  const variants = getVariants()

  if (mode === 'distort' || mode === 'elastic') {
    return (
      <motion.div
        ref={containerRef}
        className={`inline-block ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          fontVariationSettings: `'wght' ${isHovered ? 800 : 400}`
        }}
        animate={{
          fontVariationSettings: isHovered
            ? `'wght' 800, 'wdth' 150`
            : `'wght' 400, 'wdth' 100`
        }}
        transition={{ duration: 0.3 }}
      >
        {characters.map(({ char, index }) => (
          <motion.span
            key={index}
            className="inline-block"
            style={{
              transform: isHovered
                ? `translateX(${x.get() * (0.5 - Math.random())}px)
                   translateY(${y.get() * (0.5 - Math.random())}px)
                   rotateZ(${x.get() * 0.1}deg)`
                : 'none'
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    )
  }

  if (mode === 'deconstruct') {
    return (
      <motion.div
        ref={containerRef}
        className={`inline-block ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {characters.map(({ char, index }) => (
          <motion.span
            key={index}
            className="inline-block"
            custom={index}
            variants={variants}
            initial="initial"
            animate={isHovered ? 'hover' : 'rest'}
            style={{ display: 'inline-block' }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    )
  }

  if (mode === 'glitch') {
    return (
      <motion.div
        ref={containerRef}
        className={`relative inline-block ${className}`}
        variants={variants}
        initial="initial"
        animate="animate"
      >
        <span className="relative z-10">{text}</span>
        <motion.span
          className="absolute inset-0 text-glitch-cyan mix-blend-screen"
          animate={{
            x: [-2, 2, -1, 1, 0],
            opacity: [0, 1, 0, 1, 0]
          }}
          transition={{
            duration: 0.2,
            repeat: Infinity,
            repeatDelay: 5
          }}
        >
          {text}
        </motion.span>
        <motion.span
          className="absolute inset-0 text-glitch-red mix-blend-screen"
          animate={{
            x: [2, -2, 1, -1, 0],
            opacity: [0, 1, 0, 1, 0]
          }}
          transition={{
            duration: 0.2,
            delay: 0.05,
            repeat: Infinity,
            repeatDelay: 5
          }}
        >
          {text}
        </motion.span>
      </motion.div>
    )
  }

  // Default morph mode
  return (
    <motion.div
      ref={containerRef}
      className={`inline-block ${className}`}
      variants={variants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      {text}
    </motion.div>
  )
}

// Specialized component for large display text
export function KineticDisplay({
  text,
  className = ''
}: {
  text: string
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const chars = containerRef.current.querySelectorAll('.kinetic-char')

    gsap.fromTo(chars,
      {
        fontVariationSettings: "'wght' 200, 'wdth' 100",
        opacity: 0.3
      },
      {
        fontVariationSettings: "'wght' 900, 'wdth' 100",
        opacity: 1,
        duration: 1,
        stagger: 0.05,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true
        }
      }
    )
  }, [])

  return (
    <div ref={containerRef} className={`${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="kinetic-char inline-block"
          style={{
            fontVariationSettings: "'wght' 200, 'wdth' 100"
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  )
}

// Wave text animation
export function WaveText({
  text,
  className = ''
}: {
  text: string
  className?: string
}) {
  return (
    <div className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{
            y: [0, -10, 0]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.05
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </div>
  )
}