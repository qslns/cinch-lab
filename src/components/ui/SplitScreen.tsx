'use client'

import { ReactNode, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SplitScreenProps {
  left: ReactNode
  right: ReactNode
  leftSize?: string
  rightSize?: string
  className?: string
  reverse?: boolean
  sticky?: boolean
  parallax?: boolean
}

export function SplitScreen({
  left,
  right,
  leftSize = '60%',
  rightSize = '40%',
  className,
  reverse = false,
  sticky = false,
  parallax = false
}: SplitScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const leftY = useTransform(scrollYProgress, [0, 1], ['0%', parallax ? '-10%' : '0%'])
  const rightY = useTransform(scrollYProgress, [0, 1], ['0%', parallax ? '10%' : '0%'])

  const smoothLeftY = useSpring(leftY, { stiffness: 100, damping: 30 })
  const smoothRightY = useSpring(rightY, { stiffness: 100, damping: 30 })

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex',
        reverse ? 'flex-row-reverse' : 'flex-row',
        className
      )}
    >
      <motion.div
        className={cn(
          'relative overflow-hidden',
          sticky && 'sticky top-0 h-screen'
        )}
        style={{
          width: leftSize,
          y: smoothLeftY
        }}
      >
        {left}
      </motion.div>

      <motion.div
        className={cn(
          'relative overflow-hidden',
          sticky && 'min-h-screen'
        )}
        style={{
          width: rightSize,
          y: smoothRightY
        }}
      >
        {right}
      </motion.div>
    </div>
  )
}

interface AsymmetricGridProps {
  children: ReactNode[]
  className?: string
}

export function AsymmetricGrid({ children, className }: AsymmetricGridProps) {
  const patterns = [
    { w: 'w-[30%]', h: 'h-64' },
    { w: 'w-[45%]', h: 'h-96' },
    { w: 'w-[25%]', h: 'h-80' },
    { w: 'w-[35%]', h: 'h-72' },
    { w: 'w-[40%]', h: 'h-56' },
    { w: 'w-[20%]', h: 'h-48' },
    { w: 'w-[50%]', h: 'h-64' },
    { w: 'w-[30%]', h: 'h-52' }
  ]

  return (
    <div className={cn('relative w-full', className)}>
      <div className="flex flex-wrap gap-4">
        {children.map((child, index) => {
          const pattern = patterns[index % patterns.length]

          return (
            <motion.div
              key={index}
              className={cn(pattern.w, pattern.h, 'relative')}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.23, 1, 0.32, 1]
              }}
            >
              {child}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

interface FloatingLayoutProps {
  children: ReactNode[]
  className?: string
}

export function FloatingLayout({ children, className }: FloatingLayoutProps) {
  const positions = [
    { top: '5%', left: '10%', size: 'w-48 h-48' },
    { top: '15%', right: '15%', size: 'w-64 h-32' },
    { bottom: '25%', left: '20%', size: 'w-56 h-56' },
    { top: '45%', right: '25%', size: 'w-40 h-64' },
    { bottom: '15%', right: '10%', size: 'w-52 h-40' },
    { top: '65%', left: '8%', size: 'w-44 h-44' },
    { top: '30%', left: '40%', size: 'w-60 h-36' },
    { bottom: '35%', right: '35%', size: 'w-48 h-52' }
  ]

  return (
    <div className={cn('relative w-full h-screen', className)}>
      {children.map((child, index) => {
        const position = positions[index % positions.length]

        return (
          <motion.div
            key={index}
            className={cn('absolute', position.size)}
            style={{
              top: position.top,
              bottom: position.bottom,
              left: position.left,
              right: position.right
            }}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{
              opacity: 1,
              scale: 1,
              rotate: 0
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: index * 0.15,
              ease: [0.23, 1, 0.32, 1]
            }}
            whileHover={{
              scale: 1.05,
              rotate: 5,
              transition: { duration: 0.3 }
            }}
          >
            {child}
          </motion.div>
        )
      })}
    </div>
  )
}