'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export function ImagePlaceholder({
  label,
  variant = 'dark',
  aspectRatio = '4/5',
  className = '',
}: {
  label: string
  variant?: 'dark' | 'medium' | 'light'
  aspectRatio?: string
  className?: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const variants = {
    dark: 'bg-yon-charcoal text-yon-silver',
    medium: 'bg-yon-platinum text-yon-grey',
    light: 'bg-yon-silver text-yon-graphite',
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 ${variants[variant]} transition-all duration-700`}>
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"
          animate={{
            x: isHovered ? ['-100%', '100%'] : '-100%',
          }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />

        {/* Label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase opacity-40"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          >
            {label}
          </motion.span>
        </div>

        {/* Border */}
        <div className="absolute inset-0 border border-current opacity-10" />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-current opacity-20" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-current opacity-20" />
      </div>
    </motion.div>
  )
}
