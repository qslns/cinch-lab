'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'

// ==========================================================================
// INTERACTIVE ELEMENTS - Margiela × Sacai Inspired Components
// ==========================================================================

// Magnetic Button - Elements that follow cursor
export const MagneticButton = ({ children, className = '', strength = 0.3 }: any) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)

  useEffect(() => {
    if (!ref.current || !isHovered) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distX = (e.clientX - centerX) * strength
      const distY = (e.clientY - centerY) * strength
      x.set(distX)
      y.set(distY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isHovered, x, y, strength])

  return (
    <motion.div
      ref={ref}
      className={`magnetic-element ${className}`}
      style={{ x: xSpring, y: ySpring }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

// Ripple Effect - Material-inspired interaction
export const RippleEffect = ({ children, color = 'rgba(255, 255, 255, 0.5)' }: any) => {
  const [ripples, setRipples] = useState<Array<{ x: number, y: number, id: number }>>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClick = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples(prev => [...prev, { x, y, id }])
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id))
    }, 1000)
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      onClick={handleClick}
    >
      {children}
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              background: color
            }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              width: 400,
              height: 400,
              x: -200,
              y: -200,
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Distortion Text - Glitch/Deconstruct on hover
export const DistortionText = ({ text, className = '' }: { text: string, className?: string }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{text}</span>
      {isHovered && (
        <>
          <motion.span
            className="absolute inset-0 text-red-500 opacity-70"
            animate={{
              x: [-2, 2, -2],
              y: [2, -2, 2],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-blue-500 opacity-70"
            animate={{
              x: [2, -2, 2],
              y: [-2, 2, -2],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            {text}
          </motion.span>
        </>
      )}
    </span>
  )
}

// Parallax Container - Depth effect
export const ParallaxContainer = ({ children, offset = 50 }: any) => {
  const ref = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const y = useTransform(
    useMotionValue(scrollY),
    [0, 1000],
    [0, offset]
  )

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  )
}

// Fabric Drag - Draggable fabric-like element
export const FabricDrag = ({ children, className = '' }: any) => {
  const [isDragging, setIsDragging] = useState(false)

  return (
    <motion.div
      drag
      dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
      dragElastic={0.2}
      whileDrag={{
        scale: 0.95,
        rotate: isDragging ? 5 : 0,
        cursor: 'grabbing'
      }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className={`cursor-grab ${className}`}
      style={{
        filter: isDragging ? 'blur(0.5px)' : 'none'
      }}
    >
      {children}
    </motion.div>
  )
}

// Morphing Shape - SVG that morphs on hover
export const MorphingShape = ({ size = 200 }: { size?: number }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer"
    >
      <motion.path
        d={isHovered
          ? "M 50,50 Q 150,30 150,50 T 150,150 Q 50,170 50,150 Z"
          : "M 50,50 L 150,50 L 150,150 L 50,150 Z"
        }
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        animate={{ d: isHovered
          ? "M 50,50 Q 150,30 150,50 T 150,150 Q 50,170 50,150 Z"
          : "M 50,50 L 150,50 L 150,150 L 50,150 Z"
        }}
        transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      />
    </svg>
  )
}

// Reveal on Scroll
export const RevealOnScroll = ({ children, className = '' }: any) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Split Text Animation
export const SplitText = ({ text, className = '', delay = 0.03 }: any) => {
  const letters = text.split('')

  return (
    <span className={`inline-block ${className}`}>
      {letters.map((letter: string, i: number) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: i * delay,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </span>
  )
}

// Noise Background
export const NoiseBackground = ({ opacity = 0.03 }: { opacity?: number }) => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5' /%3E%3C/svg%3E")`,
        mixBlendMode: 'multiply'
      }}
    />
  )
}

// 3D Card
export const Card3D = ({ children, className = '' }: any) => {
  const ref = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    setRotateY((x - centerX) / 10)
    setRotateX(-(y - centerY) / 10)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`preserve-3d ${className}`}
      animate={{
        rotateX,
        rotateY
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <div style={{ transform: 'translateZ(50px)' }}>
        {children}
      </div>
    </motion.div>
  )
}

// Cursor Follower
export const CursorFollower = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsPointer(
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.style.cursor === 'pointer' ||
        target.classList.contains('cursor-pointer')
      )
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] mix-blend-difference"
      style={{
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.3s, height 0.3s'
      }}
    >
      <div
        className={`bg-white rounded-full transition-all duration-300 ${
          isPointer ? 'w-8 h-8' : 'w-3 h-3'
        }`}
      />
    </div>
  )
}

// Loading Animation
export const LoadingAnimation = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="relative">
        <motion.div
          className="w-20 h-20 border-2 border-black"
          animate={{
            rotate: 360,
            borderRadius: ['0%', '50%', '0%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
        <motion.div
          className="absolute inset-0 w-20 h-20 border-2 border-red-500"
          animate={{
            rotate: -360,
            borderRadius: ['50%', '0%', '50%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>
    </div>
  )
}