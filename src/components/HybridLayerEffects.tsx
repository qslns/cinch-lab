'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'

// ==========================================================================
// MARGIELA DECONSTRUCTION EFFECT
// ==========================================================================

interface DeconstructedHoverProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function DeconstructedHover({
  children,
  className = '',
  intensity = 1
}: DeconstructedHoverProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isDeconstructing, setIsDeconstructing] = useState(false)

  useEffect(() => {
    if (isHovered) {
      const timeout = setTimeout(() => {
        setIsDeconstructing(true)
        setTimeout(() => setIsDeconstructing(false), 200)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [isHovered])

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsDeconstructing(false)
      }}
      animate={{
        scale: isDeconstructing ? 0.98 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Main Content */}
      <motion.div
        animate={{
          x: isDeconstructing ? Math.random() * 2 * intensity : 0,
          y: isDeconstructing ? Math.random() * 2 * intensity : 0,
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {children}
      </motion.div>

      {/* Exposed Seams on Hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {/* Top Seam */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px bg-hybrid-red"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.3 }}
              style={{ originX: 0, opacity: 0.3 }}
            />
            {/* Right Seam */}
            <motion.div
              className="absolute top-0 right-0 bottom-0 w-px bg-hybrid-red"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              style={{ originY: 0, opacity: 0.3 }}
            />
            {/* Bottom Seam */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-hybrid-red"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              style={{ originX: 1, opacity: 0.3 }}
            />
            {/* Left Seam */}
            <motion.div
              className="absolute top-0 left-0 bottom-0 w-px bg-hybrid-red"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              style={{ originY: 1, opacity: 0.3 }}
            />

            {/* Pattern Marks */}
            <motion.div
              className="absolute -top-4 left-0 text-micro font-mono text-hybrid-red"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 0.4, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ delay: 0.2 }}
            >
              PATTERN № {Math.floor(Math.random() * 999).toString().padStart(3, '0')}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ==========================================================================
// SACAI HYBRID LAYERING EFFECT
// ==========================================================================

interface SacaiLayerProps {
  children: ReactNode
  layers?: number
  className?: string
  color1?: string
  color2?: string
}

export function SacaiLayer({
  children,
  layers = 3,
  className = '',
  color1 = 'hybrid-blue',
  color2 = 'hybrid-red'
}: SacaiLayerProps) {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 200 }
  const xSpring = useSpring(mouseX, springConfig)
  const ySpring = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distanceX = (e.clientX - centerX) / rect.width
      const distanceY = (e.clientY - centerY) / rect.height

      mouseX.set(distanceX * 20)
      mouseY.set(distanceY * 20)
    }

    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    } else {
      mouseX.set(0)
      mouseY.set(0)
    }
  }, [isHovered, mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Layer */}
      <div className="relative z-30">
        {children}
      </div>

      {/* Hybrid Layers */}
      {Array.from({ length: layers }).map((_, index) => {
        const offset = (index + 1) * 2
        const opacity = 0.15 / (index + 1)
        const color = index % 2 === 0 ? color1 : color2

        return (
          <motion.div
            key={index}
            className={`absolute inset-0 pointer-events-none`}
            style={{
              x: useTransform(xSpring, (x) => x * offset * 0.1),
              y: useTransform(ySpring, (y) => y * offset * 0.1),
              zIndex: 20 - index,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                opacity,
                mixBlendMode: 'multiply',
                filter: `hue-rotate(${index * 30}deg)`,
                borderColor: `var(--${color})`,
                borderWidth: '1px',
                borderStyle: 'solid',
              }}
            >
              {children}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// ==========================================================================
// FRAGMENT MOSAIC EFFECT
// ==========================================================================

interface FragmentMosaicProps {
  children: ReactNode
  fragments?: number
  className?: string
}

export function FragmentMosaic({
  children,
  fragments = 9,
  className = ''
}: FragmentMosaicProps) {
  const [activeFragment, setActiveFragment] = useState<number | null>(null)
  const gridSize = Math.ceil(Math.sqrt(fragments))

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {Array.from({ length: fragments }).map((_, index) => {
          const row = Math.floor(index / gridSize)
          const col = index % gridSize
          const isActive = activeFragment === index

          return (
            <motion.div
              key={index}
              className="relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setActiveFragment(index)}
              onMouseLeave={() => setActiveFragment(null)}
              animate={{
                scale: isActive ? 1.05 : 1,
                zIndex: isActive ? 10 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <div
                style={{
                  position: 'relative',
                  width: `${gridSize * 100}%`,
                  height: `${gridSize * 100}%`,
                  transform: `translate(-${col * 100}%, -${row * 100}%)`,
                }}
              >
                {children}
              </div>

              {/* Fragment Border */}
              <motion.div
                className="absolute inset-0 border border-gray-plaster"
                animate={{
                  borderColor: isActive ? 'var(--hybrid-red)' : 'var(--gray-plaster)',
                  opacity: isActive ? 1 : 0.3,
                }}
                transition={{ duration: 0.2 }}
              />

              {/* Fragment Number */}
              <div className="absolute top-1 left-1 text-micro font-mono text-gray-steel opacity-30">
                {index.toString().padStart(2, '0')}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ==========================================================================
// EXPOSED STRUCTURE EFFECT
// ==========================================================================

interface ExposedStructureProps {
  children: ReactNode
  showGrid?: boolean
  showMeasurements?: boolean
  className?: string
}

export function ExposedStructure({
  children,
  showGrid = false,
  showMeasurements = false,
  className = ''
}: ExposedStructureProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setDimensions({ width: rect.width, height: rect.height })
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      {/* Content */}
      <motion.div
        animate={{
          opacity: isRevealed ? 0.9 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>

      {/* Construction Grid */}
      <AnimatePresence>
        {(showGrid || isRevealed) && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Vertical Grid Lines */}
            {[0, 25, 50, 75, 100].map((percent) => (
              <motion.div
                key={`v-${percent}`}
                className="absolute top-0 bottom-0 w-px bg-hybrid-red"
                style={{ left: `${percent}%` }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: percent * 0.002 }}
                css={{ opacity: 0.2 }}
              />
            ))}

            {/* Horizontal Grid Lines */}
            {[0, 25, 50, 75, 100].map((percent) => (
              <motion.div
                key={`h-${percent}`}
                className="absolute left-0 right-0 h-px bg-hybrid-red"
                style={{ top: `${percent}%` }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: percent * 0.002 }}
                css={{ opacity: 0.2 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Measurements */}
      <AnimatePresence>
        {(showMeasurements || isRevealed) && (
          <>
            {/* Width Measurement */}
            <motion.div
              className="absolute -top-6 left-0 right-0 flex items-center justify-center"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-micro font-mono text-gray-steel">
                W: {Math.round(dimensions.width)}px
              </div>
            </motion.div>

            {/* Height Measurement */}
            <motion.div
              className="absolute top-0 bottom-0 -left-8 flex items-center justify-center"
              initial={{ opacity: 0, x: 5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 5 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-micro font-mono text-gray-steel -rotate-90">
                H: {Math.round(dimensions.height)}px
              </div>
            </motion.div>

            {/* Corner Marks */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => {
              const [y, x] = corner.split('-')
              return (
                <motion.div
                  key={corner}
                  className={`absolute w-3 h-3 border-hybrid-red ${
                    y === 'top' ? 'top-0' : 'bottom-0'
                  } ${
                    x === 'left' ? 'left-0 border-l border-t' : 'right-0 border-r border-t'
                  } ${
                    y === 'bottom' ? 'border-b' : ''
                  }`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.5, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: 0.1 }}
                />
              )
            })}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// ==========================================================================
// ASYMMETRIC TRANSFORM EFFECT
// ==========================================================================

interface AsymmetricTransformProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function AsymmetricTransform({
  children,
  className = '',
  intensity = 1
}: AsymmetricTransformProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        rotateX: isHovered ? 2 * intensity : 0,
        rotateY: isHovered ? -3 * intensity : 0,
        scale: isHovered ? 0.98 : 1,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      style={{
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}

      {/* Shadow Layer */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-black-100 -z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 0.1,
              scale: 1,
              x: 5 * intensity,
              y: 5 * intensity,
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  )
}