'use client'

import React, { useRef, useEffect, useState, ReactNode } from 'react'
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, MotionValue } from 'framer-motion'

// ==========================================================================
// PROFESSIONAL MARGIELA × SACAI COMPONENT LIBRARY
// Rich, Dense, Functional - No childish elements
// ==========================================================================

// --------------------------------------------------------------------------
// 1. DECONSTRUCTED TEXT - Professional Typography with Depth
// --------------------------------------------------------------------------

interface DeconstructedTextProps {
  children: string
  className?: string
  intensity?: number
  hover?: boolean
}

export const DeconstructedText: React.FC<DeconstructedTextProps> = ({
  children,
  className = '',
  intensity = 1,
  hover = true
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => hover && setIsHovered(true)}
      onMouseLeave={() => hover && setIsHovered(false)}
    >
      <span className="relative z-10">{children}</span>
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.span
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ opacity: 0.3, x: -2 * intensity, y: -2 * intensity }}
              exit={{ opacity: 0, x: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 text-accent-blood"
              style={{ filter: 'blur(0.5px)' }}
            >
              {children}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ opacity: 0.2, x: 2 * intensity, y: 2 * intensity }}
              exit={{ opacity: 0, x: 0, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="absolute inset-0 text-accent-ink"
              style={{ filter: 'blur(0.3px)' }}
            >
              {children}
            </motion.span>
          </>
        )}
      </AnimatePresence>
    </span>
  )
}

// --------------------------------------------------------------------------
// 2. LAYERED CARD - Sacai-inspired Multi-layer Component
// --------------------------------------------------------------------------

interface LayeredCardProps {
  children: ReactNode
  layers?: number
  className?: string
  interactive?: boolean
}

export const LayeredCard: React.FC<LayeredCardProps> = ({
  children,
  layers = 3,
  className = '',
  interactive = true
}) => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive) return
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: layers }).map((_, i) => {
        const offsetX = useTransform(mouseX, [-0.5, 0.5], [-10 * (layers - i), 10 * (layers - i)])
        const offsetY = useTransform(mouseY, [-0.5, 0.5], [-10 * (layers - i), 10 * (layers - i)])
        const springX = useSpring(offsetX, { stiffness: 150, damping: 20 })
        const springY = useSpring(offsetY, { stiffness: 150, damping: 20 })

        return (
          <motion.div
            key={i}
            className={`
              ${i === 0 ? 'relative z-10' : 'absolute inset-0'}
              ${i > 0 ? `opacity-${Math.max(10, 40 - i * 10)}` : ''}
            `}
            style={{
              x: i > 0 ? springX : 0,
              y: i > 0 ? springY : 0,
              zIndex: layers - i,
              filter: i > 0 ? `blur(${i * 0.5}px)` : 'none'
            }}
          >
            <div
              className={`
                w-full h-full
                ${i === 0 ? 'bg-off-white' : ''}
                ${i === 1 ? 'bg-gradient-to-br from-accent-blood/5 to-transparent' : ''}
                ${i === 2 ? 'bg-gradient-to-tl from-accent-ink/5 to-transparent' : ''}
                ${i > 0 ? 'border border-carbon/10' : ''}
              `}
            >
              {i === 0 && children}
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

// --------------------------------------------------------------------------
// 3. EXPOSED SEAM CONTAINER - Margiela Construction Lines
// --------------------------------------------------------------------------

interface ExposedSeamProps {
  children: ReactNode
  showMeasurements?: boolean
  showStitching?: boolean
  className?: string
}

export const ExposedSeam: React.FC<ExposedSeamProps> = ({
  children,
  showMeasurements = true,
  showStitching = true,
  className = ''
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect()
      setDimensions({ width, height })
    }
  }, [])

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Construction Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: -1 }}
      >
        {/* Horizontal Construction Line */}
        <line
          x1="-10%"
          y1="50%"
          x2="110%"
          y2="50%"
          stroke="var(--accent-blood)"
          strokeWidth="1"
          strokeDasharray="5,10"
          opacity="0.2"
        />
        {/* Vertical Construction Line */}
        <line
          x1="50%"
          y1="-10%"
          x2="50%"
          y2="110%"
          stroke="var(--accent-blood)"
          strokeWidth="1"
          strokeDasharray="5,10"
          opacity="0.2"
        />
      </svg>

      {/* Measurements */}
      {showMeasurements && dimensions.width > 0 && (
        <>
          <span className="absolute -top-6 left-0 text-2xs font-mono text-accent-blood opacity-40">
            {Math.round(dimensions.width)}px
          </span>
          <span className="absolute -left-12 top-0 text-2xs font-mono text-accent-blood opacity-40 -rotate-90 origin-right">
            {Math.round(dimensions.height)}px
          </span>
        </>
      )}

      {/* Stitching Effect */}
      {showStitching && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 10px,
                var(--accent-blood) 10px,
                var(--accent-blood) 11px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 10px,
                var(--accent-blood) 10px,
                var(--accent-blood) 11px
              )
            `,
            backgroundSize: '11px 100%, 100% 11px',
            backgroundPosition: '0 0, 0 0',
            backgroundRepeat: 'repeat-y, repeat-x',
            opacity: 0.1
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// --------------------------------------------------------------------------
// 4. HYBRID NAVIGATION - Professional Navigation System
// --------------------------------------------------------------------------

interface HybridNavProps {
  items: Array<{
    label: string
    href: string
    line?: string
  }>
  className?: string
}

export const HybridNav: React.FC<HybridNavProps> = ({
  items,
  className = ''
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <nav className={`flex gap-8 ${className}`}>
      {items.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Line Number */}
          {item.line && (
            <span className="absolute -top-4 left-0 text-2xs font-mono text-steel opacity-40">
              {item.line}
            </span>
          )}

          {/* Label with Deconstruction */}
          <span className="relative inline-block">
            <span className="relative z-10 text-sm font-medium tracking-wider uppercase transition-colors group-hover:text-accent-blood">
              {item.label}
            </span>

            {/* Hover Effects */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 h-px bg-accent-blood"
                  />
                  <motion.span
                    initial={{ opacity: 0, x: 0 }}
                    animate={{ opacity: 0.3, x: -2 }}
                    exit={{ opacity: 0, x: 0 }}
                    className="absolute inset-0 text-accent-ink"
                  >
                    {item.label}
                  </motion.span>
                </>
              )}
            </AnimatePresence>
          </span>
        </a>
      ))}
    </nav>
  )
}

// --------------------------------------------------------------------------
// 5. MATERIAL CARD - Textured Surface Components
// --------------------------------------------------------------------------

type MaterialType = 'paper' | 'fabric' | 'concrete' | 'glass' | 'metal'

interface MaterialCardProps {
  material?: MaterialType
  children: ReactNode
  className?: string
  interactive?: boolean
}

export const MaterialCard: React.FC<MaterialCardProps> = ({
  material = 'paper',
  children,
  className = '',
  interactive = true
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const getMaterialClass = () => {
    switch (material) {
      case 'paper':
        return 'material-paper'
      case 'fabric':
        return 'material-fabric'
      case 'concrete':
        return 'material-concrete'
      case 'glass':
        return 'material-glass'
      case 'metal':
        return 'material-metal'
      default:
        return 'material-paper'
    }
  }

  return (
    <motion.div
      className={`${getMaterialClass()} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isHovered && interactive ? 1.02 : 1,
        rotateX: isHovered && interactive ? 2 : 0,
        rotateY: isHovered && interactive ? -2 : 0
      }}
      transition={{ duration: 0.3 }}
      style={{
        transformPerspective: 1000,
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
    </motion.div>
  )
}

// --------------------------------------------------------------------------
// 6. ASYMMETRIC GRID ITEM - Dynamic Grid Component
// --------------------------------------------------------------------------

interface AsymmetricGridItemProps {
  children: ReactNode
  span?: number
  offset?: number
  className?: string
}

export const AsymmetricGridItem: React.FC<AsymmetricGridItemProps> = ({
  children,
  span = 1,
  offset = 0,
  className = ''
}) => {
  return (
    <motion.div
      className={className}
      style={{
        gridColumn: `span ${span}`,
        transform: `translateY(${offset}px)`
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: offset }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
}

// --------------------------------------------------------------------------
// 7. FRAGMENT MOSAIC - Broken Glass Effect
// --------------------------------------------------------------------------

interface FragmentMosaicProps {
  children: ReactNode
  fragments?: number
  className?: string
}

export const FragmentMosaic: React.FC<FragmentMosaicProps> = ({
  children,
  fragments = 4,
  className = ''
}) => {
  const [isFragmented, setIsFragmented] = useState(false)

  const fragmentStyles = Array.from({ length: fragments }).map((_, i) => ({
    clipPath: `polygon(
      ${25 * (i % 2)}% ${25 * Math.floor(i / 2)}%,
      ${25 * ((i % 2) + 1)}% ${25 * Math.floor(i / 2)}%,
      ${25 * ((i % 2) + 1)}% ${25 * (Math.floor(i / 2) + 1)}%,
      ${25 * (i % 2)}% ${25 * (Math.floor(i / 2) + 1)}%
    )`,
    transform: isFragmented
      ? `translate(${(Math.random() - 0.5) * 20}px, ${(Math.random() - 0.5) * 20}px) rotate(${(Math.random() - 0.5) * 5}deg)`
      : 'translate(0, 0) rotate(0)'
  }))

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsFragmented(true)}
      onMouseLeave={() => setIsFragmented(false)}
    >
      {fragmentStyles.map((style, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-transform duration-300"
          style={style}
        >
          {children}
        </div>
      ))}
      <div className={`relative ${isFragmented ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
        {children}
      </div>
    </div>
  )
}

// --------------------------------------------------------------------------
// 8. EDITORIAL SECTION - Magazine-style Layout
// --------------------------------------------------------------------------

interface EditorialSectionProps {
  lineNumber?: string
  title: string
  subtitle?: string
  description?: string
  children: ReactNode
  className?: string
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({
  lineNumber,
  title,
  subtitle,
  description,
  children,
  className = ''
}) => {
  return (
    <section className={`relative ${className}`}>
      {/* Pattern Mark */}
      {lineNumber && (
        <div className="absolute -top-8 left-0">
          <span className="text-2xs font-mono text-accent-blood opacity-40 tracking-widest uppercase">
            LINE_{lineNumber}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-12">
        <motion.h2
          className="text-editorial font-bold tracking-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <DeconstructedText intensity={1.5}>
            {title}
          </DeconstructedText>
        </motion.h2>

        {subtitle && (
          <motion.p
            className="text-lg text-steel mb-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {subtitle}
          </motion.p>
        )}

        {description && (
          <motion.p
            className="text-body text-concrete max-w-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </section>
  )
}

// --------------------------------------------------------------------------
// 9. RAW EDGE BUTTON - Deconstructed Interactive Element
// --------------------------------------------------------------------------

interface RawEdgeButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export const RawEdgeButton: React.FC<RawEdgeButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  className = ''
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-4 py-2 text-sm'
      case 'large':
        return 'px-8 py-4 text-lg'
      default:
        return 'px-6 py-3 text-base'
    }
  }

  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-transparent border-2 border-carbon text-carbon hover:bg-carbon hover:text-off-white'
      case 'ghost':
        return 'bg-transparent text-carbon hover:bg-carbon/10'
      default:
        return 'bg-carbon text-off-white hover:bg-obsidian'
    }
  }

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative overflow-hidden
        ${getSizeClasses()}
        ${getVariantClasses()}
        font-medium tracking-wider uppercase
        transition-all duration-300
        raw-edge
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">
        {children}
      </span>

      {/* Exposed Seam Effect */}
      <span
        className="absolute inset-0 border border-dashed border-accent-blood opacity-20"
        style={{
          transform: 'translate(2px, 2px)'
        }}
      />
    </motion.button>
  )
}

// --------------------------------------------------------------------------
// 10. CONSTRUCTION MARKER - Technical Annotation
// --------------------------------------------------------------------------

interface ConstructionMarkerProps {
  label: string
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}

export const ConstructionMarker: React.FC<ConstructionMarkerProps> = ({
  label,
  position = 'top-left',
  className = ''
}) => {
  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-0 right-0'
      case 'bottom-left':
        return 'bottom-0 left-0'
      case 'bottom-right':
        return 'bottom-0 right-0'
      default:
        return 'top-0 left-0'
    }
  }

  return (
    <div
      className={`
        absolute ${getPositionClasses()}
        px-2 py-1
        bg-accent-blood text-off-white
        text-2xs font-mono tracking-widest uppercase
        ${className}
      `}
    >
      {label}
    </div>
  )
}