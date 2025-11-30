'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  }

  return (
    <div className={`flex items-center justify-center ${className}`} role="status" aria-label="Loading">
      <motion.div
        className={`${sizes[size]} border-2 border-yon-platinum border-t-yon-accent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  )
}

// Page loading overlay
export function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-yon-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          className="font-serif text-4xl md:text-5xl text-yon-black mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          THE YON
        </motion.div>
        <motion.div
          className="w-48 h-px bg-yon-platinum mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="h-full bg-yon-accent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

// Skeleton components for loading states
export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className="h-4 bg-yon-platinum/50 rounded"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </div>
  )
}

export function SkeletonImage({ aspectRatio = '4/5', className = '' }: { aspectRatio?: string; className?: string }) {
  return (
    <motion.div
      className={`bg-yon-platinum/30 ${className}`}
      style={{ aspectRatio }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 2, repeat: Infinity }}
    />
  )
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      <SkeletonImage aspectRatio="4/5" />
      <SkeletonText lines={2} />
    </div>
  )
}
