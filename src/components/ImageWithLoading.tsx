'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface ImageWithLoadingProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  sizes?: string
  fill?: boolean
  width?: number
  height?: number
  objectFit?: 'contain' | 'cover'
}

export default function ImageWithLoading({
  src,
  alt,
  className = '',
  priority = false,
  sizes,
  fill = false,
  width,
  height,
  objectFit = 'cover'
}: ImageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Placeholder for when image is not available
  if (hasError || !src || src === '/placeholder.jpg') {
    return (
      <div className={`relative bg-gray-100 ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-400 text-xs uppercase tracking-widest mb-2">
              CINCH LAB
            </div>
            <div className="text-gray-300 text-[10px]">
              Image Coming Soon
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gray-100 z-10"
          >
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="transition-opacity duration-500"
          style={{ 
            objectFit,
            opacity: isLoading ? 0 : 1 
          }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width || 800}
          height={height || 600}
          priority={priority}
          sizes={sizes}
          className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      )}
    </div>
  )
}