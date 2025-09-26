'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'

interface DeconstructedHoverProps {
  children: React.ReactNode
  className?: string
  mode?: 'split' | 'layer' | 'explode' | 'slice' | 'fragment'
  intensity?: number
}

export default function DeconstructedHover({
  children,
  className = '',
  mode = 'split',
  intensity = 1
}: DeconstructedHoverProps) {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 300 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distanceX = (e.clientX - centerX) / rect.width
      const distanceY = (e.clientY - centerY) / rect.height

      mouseX.set(distanceX * 20 * intensity)
      mouseY.set(distanceY * 20 * intensity)
    }

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isHovered, intensity, mouseX, mouseY])

  const getModeVariants = () => {
    switch (mode) {
      case 'split':
        return {
          base: { x: 0, y: 0 },
          hover: {
            x: x.get(),
            y: y.get()
          }
        }

      case 'layer':
        return {
          layer1: {
            x: isHovered ? 5 * intensity : 0,
            y: isHovered ? -5 * intensity : 0,
            opacity: isHovered ? 0.9 : 1
          },
          layer2: {
            x: isHovered ? -5 * intensity : 0,
            y: isHovered ? 5 * intensity : 0,
            opacity: isHovered ? 0.7 : 0
          },
          layer3: {
            x: isHovered ? 10 * intensity : 0,
            y: isHovered ? 10 * intensity : 0,
            opacity: isHovered ? 0.5 : 0
          }
        }

      case 'explode':
        return {
          initial: {
            scale: 1,
            rotate: 0
          },
          hover: {
            scale: [1, 1.1, 0.95, 1.05],
            rotate: [0, 2, -2, 0]
          }
        }

      case 'slice':
        return {
          top: {
            y: isHovered ? -10 * intensity : 0,
            rotateX: isHovered ? 15 : 0
          },
          bottom: {
            y: isHovered ? 10 * intensity : 0,
            rotateX: isHovered ? -15 : 0
          }
        }

      case 'fragment':
        // Fragment animations are handled inline in the component
        return {}

      default:
        return {}
    }
  }

  const variants = getModeVariants()

  if (mode === 'layer') {
    return (
      <div
        ref={containerRef}
        className={`relative ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Layer 1 - Main content */}
        <motion.div
          className="relative z-30"
          animate={variants.layer1}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>

        {/* Layer 2 - Ghost layer */}
        <motion.div
          className="absolute inset-0 z-20 mix-blend-multiply"
          animate={variants.layer2}
          transition={{ duration: 0.3 }}
          style={{ filter: 'hue-rotate(180deg)' }}
        >
          {children}
        </motion.div>

        {/* Layer 3 - Outline layer */}
        <motion.div
          className="absolute inset-0 z-10"
          animate={variants.layer3}
          transition={{ duration: 0.3 }}
          style={{
            filter: 'brightness(0) invert(1)',
            opacity: 0.2
          }}
        >
          {children}
        </motion.div>
      </div>
    )
  }

  if (mode === 'slice') {
    return (
      <div
        ref={containerRef}
        className={`relative ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="relative"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'
          }}
          animate={variants.top}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
        <motion.div
          className="absolute inset-0"
          style={{
            clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)'
          }}
          animate={variants.bottom}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
    )
  }

  if (mode === 'fragment') {
    const fragments = Array.from({ length: 9 })

    return (
      <div
        ref={containerRef}
        className={`relative ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="grid grid-cols-3 grid-rows-3">
          {fragments.map((_, i) => (
            <motion.div
              key={i}
              className="overflow-hidden"
              animate={{
                x: isHovered ? Math.sin(i) * 20 * intensity : 0,
                y: isHovered ? Math.cos(i) * 20 * intensity : 0,
                rotate: isHovered ? Math.sin(i) * 10 : 0,
                scale: isHovered ? 0.95 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                style={{
                  transform: `translate(${-33.33 * (i % 3)}%, ${-33.33 * Math.floor(i / 3)}%)`,
                  width: '300%',
                  height: '300%'
                }}
              >
                {children}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  // Default split mode
  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{
          x: isHovered ? x.get() : 0,
          y: isHovered ? y.get() : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Specialized deconstructed image component
export function DeconstructedImage({
  src,
  alt,
  width,
  height,
  className = ''
}: {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main image */}
      <motion.div
        animate={{
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        <Image src={src} alt={alt} width={width} height={height} />
      </motion.div>

      {/* RGB Split layers */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.div
              className="absolute inset-0 mix-blend-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                filter: 'hue-rotate(120deg)',
                transform: 'translateX(-2px)'
              }}
            >
              <Image src={src} alt={alt} width={width} height={height} />
            </motion.div>
            <motion.div
              className="absolute inset-0 mix-blend-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                filter: 'hue-rotate(240deg)',
                transform: 'translateX(2px)'
              }}
            >
              <Image src={src} alt={alt} width={width} height={height} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// Margiela-inspired exposed structure component
export function ExposedStructure({
  children,
  showStructure = false,
  className = ''
}: {
  children: React.ReactNode
  showStructure?: boolean
  className?: string
}) {
  const [isRevealed, setIsRevealed] = useState(showStructure)

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      {/* Content */}
      <motion.div
        animate={{
          opacity: isRevealed ? 0.7 : 1
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      {/* Structural lines - like pattern marks */}
      <AnimatePresence>
        {isRevealed && (
          <>
            {/* Vertical construction lines */}
            <motion.div
              className="absolute left-0 top-0 h-full w-px bg-medical-red"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: 'top' }}
            />
            <motion.div
              className="absolute right-0 top-0 h-full w-px bg-medical-red"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              style={{ transformOrigin: 'bottom' }}
            />

            {/* Horizontal construction lines */}
            <motion.div
              className="absolute left-0 top-0 h-px w-full bg-medical-red"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              style={{ transformOrigin: 'left' }}
            />
            <motion.div
              className="absolute left-0 bottom-0 h-px w-full bg-medical-red"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
              style={{ transformOrigin: 'right' }}
            />

            {/* Corner markers */}
            <motion.div
              className="absolute left-0 top-0 h-4 w-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              <div className="h-full w-px bg-medical-red" />
              <div className="absolute top-0 h-px w-full bg-medical-red" />
            </motion.div>

            {/* Measurement annotations */}
            <motion.div
              className="absolute -left-8 top-1/2 -translate-y-1/2 rotate-90 text-micro font-mono text-medical-red"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
            >
              HEIGHT
            </motion.div>
            <motion.div
              className="absolute left-1/2 -top-6 -translate-x-1/2 text-micro font-mono text-medical-red"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
            >
              WIDTH
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}