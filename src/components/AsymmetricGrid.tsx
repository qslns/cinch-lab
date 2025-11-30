'use client'

import { motion } from 'framer-motion'
import { ReactNode, useMemo } from 'react'

// Grid item configuration
interface GridItem {
  id: string
  content: ReactNode
  size?: 'small' | 'medium' | 'large' | 'hero'
  rotation?: number // -3 to 3 degrees
  offset?: { x?: number; y?: number } // Percentage offset
  priority?: boolean // For visual hierarchy
}

interface AsymmetricGridProps {
  items: GridItem[]
  className?: string
  gap?: number
  staggerDelay?: number
}

// Predefined size configurations (tailwind-like classes mapped to actual sizes)
const sizeConfig = {
  small: {
    colSpan: 'col-span-4 md:col-span-3 lg:col-span-2',
    aspectRatio: 'aspect-[3/4]',
  },
  medium: {
    colSpan: 'col-span-6 md:col-span-4 lg:col-span-3',
    aspectRatio: 'aspect-[4/5]',
  },
  large: {
    colSpan: 'col-span-8 md:col-span-6 lg:col-span-5',
    aspectRatio: 'aspect-[3/4]',
  },
  hero: {
    colSpan: 'col-span-12 md:col-span-8 lg:col-span-7',
    aspectRatio: 'aspect-[16/10]',
  },
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export default function AsymmetricGrid({
  items,
  className = '',
  gap = 4,
  staggerDelay = 0.12,
}: AsymmetricGridProps) {
  // Memoize custom variants with stagger delay
  const customContainerVariants = useMemo(() => ({
    ...containerVariants,
    visible: {
      ...containerVariants.visible,
      transition: {
        ...containerVariants.visible.transition,
        staggerChildren: staggerDelay,
      },
    },
  }), [staggerDelay])

  return (
    <motion.div
      className={`grid grid-cols-12 gap-${gap} ${className}`}
      style={{ gap: `${gap * 4}px` }}
      variants={customContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {items.map((item, index) => {
        const size = item.size || 'medium'
        const config = sizeConfig[size]
        const rotation = item.rotation || 0
        const offsetX = item.offset?.x || 0
        const offsetY = item.offset?.y || 0

        return (
          <motion.div
            key={item.id}
            className={`${config.colSpan} ${item.priority ? 'z-10' : 'z-0'}`}
            variants={itemVariants}
            style={{
              transform: `rotate(${rotation}deg) translateX(${offsetX}%) translateY(${offsetY}%)`,
            }}
            whileHover={{
              scale: 1.02,
              rotate: rotation * 0.5, // Reduce rotation on hover
              transition: { duration: 0.4, ease: 'easeOut' },
            }}
          >
            <div className={`${config.aspectRatio} w-full overflow-hidden`}>
              {item.content}
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

// Utility component for scattered/faerie-style layout
interface ScatteredGridProps {
  children: ReactNode[]
  className?: string
}

export function ScatteredGrid({ children, className = '' }: ScatteredGridProps) {
  // Generate pseudo-random but consistent positions
  const positions = useMemo(() => {
    return children.map((_, index) => {
      const seed = index * 17 + 7
      const row = Math.floor(index / 3)
      const col = index % 3

      return {
        x: (col * 33) + ((seed % 10) - 5), // Base position + random offset
        y: (row * 25) + ((seed % 8) - 4),
        rotation: ((seed % 7) - 3) * 0.8, // -2.4 to 2.4 degrees
        scale: 0.9 + (seed % 20) / 100, // 0.9 to 1.1
        zIndex: seed % 5,
      }
    })
  }, [children.length])

  return (
    <div className={`relative w-full min-h-[200vh] ${className}`}>
      {children.map((child, index) => {
        const pos = positions[index]

        return (
          <motion.div
            key={index}
            className="absolute"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              zIndex: pos.zIndex,
            }}
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: pos.scale,
              rotate: pos.rotation,
            }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 1,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            whileHover={{
              scale: pos.scale * 1.05,
              zIndex: 10,
              transition: { duration: 0.3 },
            }}
          >
            {child}
          </motion.div>
        )
      })}
    </div>
  )
}

// Masonry-style asymmetric grid
interface MasonryItem {
  id: string
  content: ReactNode
  height?: 'short' | 'medium' | 'tall' | 'extra-tall'
}

interface MasonryGridProps {
  items: MasonryItem[]
  columns?: 2 | 3 | 4
  gap?: number
  className?: string
}

const heightConfig = {
  short: 'h-48 md:h-56',
  medium: 'h-64 md:h-80',
  tall: 'h-80 md:h-96',
  'extra-tall': 'h-96 md:h-[28rem]',
}

export function MasonryGrid({
  items,
  columns = 3,
  gap = 4,
  className = ''
}: MasonryGridProps) {
  // Distribute items into columns
  const columnItems = useMemo(() => {
    const cols: MasonryItem[][] = Array.from({ length: columns }, () => [])

    items.forEach((item, index) => {
      cols[index % columns].push(item)
    })

    return cols
  }, [items, columns])

  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }

  return (
    <motion.div
      className={`grid ${gridCols[columns]} ${className}`}
      style={{ gap: `${gap * 4}px` }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {columnItems.map((column, colIndex) => (
        <div
          key={colIndex}
          className="flex flex-col"
          style={{ gap: `${gap * 4}px` }}
        >
          {column.map((item, itemIndex) => {
            const height = item.height || 'medium'
            // Alternate rotations for visual interest
            const rotation = ((colIndex + itemIndex) % 5 - 2) * 0.5

            return (
              <motion.div
                key={item.id}
                className={`${heightConfig[height]} overflow-hidden`}
                variants={itemVariants}
                style={{ rotate: rotation }}
                whileHover={{
                  scale: 1.015,
                  rotate: 0,
                  transition: { duration: 0.4 },
                }}
              >
                {item.content}
              </motion.div>
            )
          })}
        </div>
      ))}
    </motion.div>
  )
}

// Bento-style grid with predefined layouts
type BentoLayout = 'featured-left' | 'featured-right' | 'centered' | 'scattered'

interface BentoGridProps {
  items: GridItem[]
  layout?: BentoLayout
  className?: string
}

export function BentoGrid({
  items,
  layout = 'featured-left',
  className = ''
}: BentoGridProps) {
  // Define grid areas based on layout
  const getGridAreas = (layout: BentoLayout, itemCount: number): string[] => {
    switch (layout) {
      case 'featured-left':
        return [
          'col-span-12 md:col-span-7 row-span-2',
          'col-span-6 md:col-span-5',
          'col-span-6 md:col-span-5',
          'col-span-12 md:col-span-4',
          'col-span-6 md:col-span-4',
          'col-span-6 md:col-span-4',
        ]
      case 'featured-right':
        return [
          'col-span-6 md:col-span-5',
          'col-span-6 md:col-span-5',
          'col-span-12 md:col-span-7 row-span-2',
          'col-span-12 md:col-span-5',
          'col-span-6 md:col-span-3',
          'col-span-6 md:col-span-4',
        ]
      case 'centered':
        return [
          'col-span-6 md:col-span-4',
          'col-span-6 md:col-span-4',
          'col-span-12 md:col-span-8 md:col-start-3 row-span-2',
          'col-span-6 md:col-span-4',
          'col-span-6 md:col-span-4',
        ]
      case 'scattered':
        return [
          'col-span-8 md:col-span-5 md:col-start-1',
          'col-span-4 md:col-span-4 md:col-start-7',
          'col-span-6 md:col-span-6 md:col-start-2',
          'col-span-6 md:col-span-5 md:col-start-8',
          'col-span-12 md:col-span-4 md:col-start-1',
          'col-span-6 md:col-span-5 md:col-start-6',
        ]
      default:
        return items.map(() => 'col-span-6 md:col-span-4')
    }
  }

  const gridAreas = getGridAreas(layout, items.length)

  return (
    <motion.div
      className={`grid grid-cols-12 gap-4 md:gap-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {items.slice(0, gridAreas.length).map((item, index) => {
        const rotation = item.rotation || ((index % 5) - 2) * 0.4

        return (
          <motion.div
            key={item.id}
            className={`${gridAreas[index]} min-h-[200px] md:min-h-[280px] overflow-hidden`}
            variants={itemVariants}
            style={{ rotate: rotation }}
            whileHover={{
              scale: 1.02,
              rotate: 0,
              zIndex: 10,
              transition: { duration: 0.4 },
            }}
          >
            {item.content}
          </motion.div>
        )
      })}
    </motion.div>
  )
}
