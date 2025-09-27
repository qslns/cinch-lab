'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

// Main Loading Screen
export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 20
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-raw-white flex items-center justify-center"
    >
      <div className="relative w-full max-w-md px-8">
        {/* Progress Bar */}
        <div className="relative h-px bg-gray-200 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-black"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Loading Text */}
        <div className="mt-8 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="inline-block w-12 h-12 border-2 border-black border-t-transparent rounded-full mb-4"
          />
          <p className="font-mono text-sm text-gray-600">
            DECONSTRUCTING... {Math.floor(progress)}%
          </p>
          <p className="font-mono text-xs text-gray-400 mt-2">
            THREAD_{Math.random().toString(36).substring(7).toUpperCase()}
          </p>
        </div>

        {/* Construction Marks */}
        <div className="absolute -top-20 left-0 text-red-500 text-xs font-mono opacity-30">
          LOAD_SEQUENCE_INIT
        </div>
        <div className="absolute -bottom-20 right-0 text-blue-500 text-xs font-mono opacity-30">
          BUFFER_ALLOCATING
        </div>
      </div>
    </motion.div>
  )
}

// Skeleton Loader
export const SkeletonLoader = ({ type = 'text' }: { type?: 'text' | 'image' | 'card' }) => {
  const getClassName = () => {
    switch (type) {
      case 'text':
        return 'h-4 bg-gray-200 rounded animate-pulse'
      case 'image':
        return 'aspect-square bg-gray-200 rounded animate-pulse'
      case 'card':
        return 'h-64 bg-gray-200 rounded animate-pulse'
      default:
        return 'h-4 bg-gray-200 rounded animate-pulse'
    }
  }

  return (
    <div className={getClassName()}>
      <div className="relative h-full overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  )
}

// Content Placeholder
export const ContentPlaceholder = ({ lines = 3 }: { lines?: number }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLoader key={i} type="text" />
      ))}
    </div>
  )
}

// Image Loading State
export const ImageLoadingState = () => {
  return (
    <div className="relative w-full h-full bg-gray-100 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="w-12 h-12 border-2 border-gray-300 rounded-full"
        />
      </div>
      <div className="absolute top-2 left-2 text-xs font-mono text-gray-400">
        IMG_LOADING
      </div>
    </div>
  )
}

// Lazy Load Wrapper
export const LazyLoadWrapper = ({
  children,
  fallback = <SkeletonLoader type="card" />
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {!isLoaded ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {fallback}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Progress Indicator
export const ProgressIndicator = ({ value = 0 }: { value: number }) => {
  return (
    <div className="relative w-full h-1 bg-gray-200 overflow-hidden">
      <motion.div
        className="absolute inset-y-0 left-0 bg-black"
        initial={{ width: '0%' }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <div className="absolute -top-6 right-0 text-xs font-mono text-gray-500">
        {value}%
      </div>
    </div>
  )
}

// Spinner
export const Spinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-2'
  }

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizeClasses[size]} border-black border-t-transparent rounded-full`}
    />
  )
}

// Pulse Loader
export const PulseLoader = () => {
  return (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut'
          }}
          className="w-2 h-2 bg-black rounded-full"
        />
      ))}
    </div>
  )
}