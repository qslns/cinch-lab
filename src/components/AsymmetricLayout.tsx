'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AsymmetricGridProps {
  children: ReactNode[]
  className?: string
  mode?: 'broken' | 'shifted' | 'overlapped' | 'scattered' | 'diagonal'
}

export default function AsymmetricGrid({
  children,
  className = '',
  mode = 'broken'
}: AsymmetricGridProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  // Transform values for parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5])

  // Generate grid template based on mode
  const getGridStyle = () => {
    switch (mode) {
      case 'broken':
        return {
          gridTemplateColumns: 'var(--grid-1) var(--grid-3) var(--grid-2) var(--grid-5)',
          gridTemplateRows: 'repeat(auto-fit, minmax(200px, 1fr))',
          gridAutoFlow: 'dense' as const
        }

      case 'shifted':
        return {
          gridTemplateColumns: 'var(--grid-2) var(--grid-6) var(--grid-4)',
          gridAutoRows: 'minmax(150px, auto)'
        }

      case 'overlapped':
        return {
          display: 'block',
          position: 'relative' as const
        }

      case 'scattered':
        return {
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(5, minmax(100px, 1fr))'
        }

      case 'diagonal':
        return {
          gridTemplateColumns: 'repeat(4, 1fr)',
          transform: 'skewY(-3deg)'
        }

      default:
        return {}
    }
  }

  useEffect(() => {
    if (!containerRef.current) return

    const items = containerRef.current.querySelectorAll('.grid-item')

    // GSAP animations for grid items
    items.forEach((item, index) => {
      gsap.fromTo(item,
        {
          y: index % 2 === 0 ? 50 : -50,
          opacity: 0,
          rotate: index % 3 === 0 ? -5 : 5
        },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 1,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            end: 'bottom 10%'
          }
        }
      )
    })
  }, [])

  if (mode === 'overlapped') {
    // Special handling for overlapped mode
    return (
      <div ref={containerRef} className={`relative ${className}`}>
        {children.map((child, index) => {
          const positions = [
            { top: '0%', left: '5%', width: '40%', zIndex: 3 },
            { top: '10%', right: '10%', width: '45%', zIndex: 4 },
            { bottom: '20%', left: '15%', width: '35%', zIndex: 5 },
            { top: '40%', right: '5%', width: '50%', zIndex: 2 },
            { bottom: '5%', left: '40%', width: '40%', zIndex: 6 }
          ]

          const pos = positions[index % positions.length]

          return (
            <motion.div
              key={index}
              className="absolute grid-item"
              style={{
                ...pos,
                y: index % 2 === 0 ? y1 : y2
              }}
              whileHover={{
                zIndex: 10,
                scale: 1.05
              }}
            >
              {child}
            </motion.div>
          )
        })}
      </div>
    )
  }

  if (mode === 'scattered') {
    // Random placement within grid
    return (
      <div
        ref={containerRef}
        className={`grid gap-4 ${className}`}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: 'repeat(5, minmax(100px, 1fr))'
        }}
      >
        {children.map((child, index) => {
          const gridPositions = [
            { gridColumn: '1 / 3', gridRow: '1 / 2' },
            { gridColumn: '3 / 5', gridRow: '2 / 4' },
            { gridColumn: '2 / 4', gridRow: '3 / 5' },
            { gridColumn: '1 / 2', gridRow: '4 / 5' },
            { gridColumn: '4 / 6', gridRow: '1 / 3' },
            { gridColumn: '1 / 4', gridRow: '5 / 6' },
            { gridColumn: '5 / 6', gridRow: '4 / 6' }
          ]

          const pos = gridPositions[index % gridPositions.length]

          return (
            <motion.div
              key={index}
              className="grid-item"
              style={{
                ...pos,
                y: index % 3 === 0 ? y1 : index % 3 === 1 ? y2 : y3,
                rotate: index % 2 === 0 ? rotate : 0
              }}
            >
              {child}
            </motion.div>
          )
        })}
      </div>
    )
  }

  // Default grid modes
  return (
    <div
      ref={containerRef}
      className={`grid gap-2 ${className}`}
      style={getGridStyle()}
    >
      {children.map((child, index) => {
        const spans = [
          { gridColumn: 'span 1', gridRow: 'span 2' },
          { gridColumn: 'span 2', gridRow: 'span 1' },
          { gridColumn: 'span 1', gridRow: 'span 1' },
          { gridColumn: 'span 2', gridRow: 'span 2' },
          { gridColumn: 'span 1', gridRow: 'span 3' }
        ]

        const span = spans[index % spans.length]

        return (
          <motion.div
            key={index}
            className="grid-item"
            style={{
              ...span,
              y: index % 2 === 0 ? y1 : y2
            }}
            whileInView={{
              opacity: [0, 1],
              scale: [0.95, 1]
            }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            {child}
          </motion.div>
        )
      })}
    </div>
  )
}

// Broken container component - Margiela inspired
export function BrokenContainer({
  children,
  className = '',
  breakPoints = 3
}: {
  children: ReactNode
  className?: string
  breakPoints?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create break lines
    const breaks = containerRef.current.querySelectorAll('.break-line')

    breaks.forEach((line, index) => {
      gsap.to(line, {
        width: '100%',
        duration: 1,
        delay: index * 0.2,
        ease: 'power2.out'
      })
    })
  }, [])

  const generateBreakLines = () => {
    const lines = []
    for (let i = 0; i < breakPoints; i++) {
      const top = `${(100 / (breakPoints + 1)) * (i + 1)}%`
      const angle = Math.random() * 6 - 3 // Random angle between -3 and 3 degrees

      lines.push(
        <div
          key={i}
          className="break-line absolute left-0 h-px bg-charcoal"
          style={{
            top,
            width: 0,
            transform: `rotate(${angle}deg)`,
            transformOrigin: 'left center'
          }}
        />
      )
    }
    return lines
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {children}
      {generateBreakLines()}
    </div>
  )
}

// Shifted layers component - Sacai inspired
export function ShiftedLayers({
  layers,
  className = ''
}: {
  layers: ReactNode[]
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      {layers.map((layer, index) => {
        const shifts = [
          { x: 0, y: 0, z: 0 },
          { x: 20, y: -10, z: 10 },
          { x: -15, y: 15, z: 20 },
          { x: 25, y: 5, z: 15 }
        ]

        const shift = shifts[index % shifts.length]

        return (
          <motion.div
            key={index}
            className="absolute inset-0"
            style={{
              transform: `translate3d(${shift.x}px, ${shift.y}px, ${shift.z}px)`,
              zIndex: index
            }}
            whileHover={{
              x: shift.x * 1.2,
              y: shift.y * 1.2,
              zIndex: 10
            }}
            transition={{ duration: 0.3 }}
          >
            {layer}
          </motion.div>
        )
      })}
    </div>
  )
}

// Diagonal flow layout
export function DiagonalFlow({
  children,
  className = '',
  angle = -5
}: {
  children: ReactNode | ReactNode[]
  className?: string
  angle?: number
}) {
  // Convert children to array if it's not already
  const childrenArray = Array.isArray(children) ? children : [children]

  return (
    <div
      className={`relative ${className}`}
      style={{
        transform: `rotate(${angle}deg)`,
        transformOrigin: 'center center'
      }}
    >
      <div className="flex flex-wrap gap-4">
        {childrenArray.map((child, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0"
            style={{
              transform: `rotate(${-angle}deg) translateY(${index * 10}px)`,
              marginLeft: index % 2 === 0 ? '0' : '10%'
            }}
            whileInView={{
              opacity: [0, 1],
              y: [20, 0]
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1
            }}
          >
            {child}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Fragmented mosaic layout
export function FragmentedMosaic({
  fragments,
  className = ''
}: {
  fragments: ReactNode[]
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const fragments = containerRef.current.querySelectorAll('.fragment')

    fragments.forEach((fragment, index) => {
      gsap.set(fragment, {
        clipPath: `polygon(
          ${Math.random() * 20}% ${Math.random() * 20}%,
          ${80 + Math.random() * 20}% ${Math.random() * 20}%,
          ${80 + Math.random() * 20}% ${80 + Math.random() * 20}%,
          ${Math.random() * 20}% ${80 + Math.random() * 20}%
        )`
      })

      gsap.to(fragment, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1,
        delay: index * 0.1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: fragment,
          start: 'top 80%'
        }
      })
    })
  }, [])

  return (
    <div
      ref={containerRef}
      className={`grid grid-cols-3 gap-1 ${className}`}
    >
      {fragments.map((fragment, index) => (
        <div
          key={index}
          className="fragment overflow-hidden"
          style={{
            gridColumn: index % 5 === 0 ? 'span 2' : 'span 1',
            gridRow: index % 3 === 0 ? 'span 2' : 'span 1'
          }}
        >
          {fragment}
        </div>
      ))}
    </div>
  )
}