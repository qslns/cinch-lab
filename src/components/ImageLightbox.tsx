'use client'

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Types
interface LightboxImage {
  src: string
  alt: string
  caption?: string
  captionKo?: string
  width?: number
  height?: number
}

interface LightboxContextType {
  openLightbox: (images: LightboxImage[], startIndex?: number) => void
  closeLightbox: () => void
  isOpen: boolean
}

// Context
const LightboxContext = createContext<LightboxContextType | null>(null)

// Hook for accessing lightbox
export function useLightbox() {
  const context = useContext(LightboxContext)
  if (!context) {
    throw new Error('useLightbox must be used within a LightboxProvider')
  }
  return context
}

// Provider Component
export function LightboxProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [images, setImages] = useState<LightboxImage[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = useCallback((imgs: LightboxImage[], startIndex = 0) => {
    setImages(imgs)
    setCurrentIndex(startIndex)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setIsOpen(false)
    document.body.style.overflow = ''
  }, [])

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowRight':
          goNext()
          break
        case 'ArrowLeft':
          goPrev()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeLightbox, goNext, goPrev])

  return (
    <LightboxContext.Provider value={{ openLightbox, closeLightbox, isOpen }}>
      {children}

      <AnimatePresence>
        {isOpen && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center"
            style={{ backgroundColor: 'rgba(10, 10, 10, 0.95)' }}
            onClick={closeLightbox}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.1 }}
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(250, 250, 250, 0.3)',
              }}
              aria-label="Close lightbox"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="#FAFAFA"
                strokeWidth="1.5"
              >
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            </motion.button>

            {/* Navigation - Previous */}
            {images.length > 1 && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: 0.15 }}
                onClick={(e) => {
                  e.stopPropagation()
                  goPrev()
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center"
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(250, 250, 250, 0.3)',
                }}
                aria-label="Previous image"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="#FAFAFA"
                  strokeWidth="1.5"
                >
                  <polyline points="12,4 6,10 12,16" />
                </svg>
              </motion.button>
            )}

            {/* Navigation - Next */}
            {images.length > 1 && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: 0.15 }}
                onClick={(e) => {
                  e.stopPropagation()
                  goNext()
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center"
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(250, 250, 250, 0.3)',
                }}
                aria-label="Next image"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="#FAFAFA"
                  strokeWidth="1.5"
                >
                  <polyline points="8,4 14,10 8,16" />
                </svg>
              </motion.button>
            )}

            {/* Main Image */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
              className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  width={images[currentIndex].width || 1200}
                  height={images[currentIndex].height || 800}
                  className="max-w-full max-h-[75vh] w-auto h-auto object-contain"
                  priority
                />
              </div>

              {/* Caption */}
              {(images[currentIndex].caption || images[currentIndex].captionKo) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 text-center max-w-2xl px-4"
                >
                  {images[currentIndex].caption && (
                    <p
                      style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '14px',
                        color: '#FAFAFA',
                        lineHeight: 1.6,
                      }}
                    >
                      {images[currentIndex].caption}
                    </p>
                  )}
                  {images[currentIndex].captionKo && (
                    <p
                      style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '12px',
                        color: 'rgba(250, 250, 250, 0.6)',
                        lineHeight: 1.6,
                        marginTop: '4px',
                      }}
                    >
                      {images[currentIndex].captionKo}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Image counter */}
              {images.length > 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 mt-4"
                  style={{
                    fontFamily: 'Consolas, monospace',
                    fontSize: '11px',
                    color: 'rgba(250, 250, 250, 0.5)',
                    letterSpacing: '0.15em',
                  }}
                >
                  {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                </motion.div>
              )}
            </motion.div>

            {/* Thumbnail strip for multiple images */}
            {images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[80vw] px-4"
              >
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentIndex(index)
                    }}
                    className="flex-shrink-0 w-16 h-16 relative overflow-hidden transition-all duration-300"
                    style={{
                      border: index === currentIndex
                        ? '2px solid #FAFAFA'
                        : '1px solid rgba(250, 250, 250, 0.2)',
                      opacity: index === currentIndex ? 1 : 0.5,
                    }}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  )
}

// Clickable image component that opens lightbox
interface LightboxImageProps {
  image: LightboxImage
  images?: LightboxImage[] // Optional: for gallery mode
  index?: number // Optional: starting index in gallery
  className?: string
  aspectRatio?: string
  fill?: boolean
}

export function LightboxImage({
  image,
  images,
  index = 0,
  className = '',
  aspectRatio = 'aspect-[3/4]',
  fill = false,
}: LightboxImageProps) {
  const { openLightbox } = useLightbox()

  const handleClick = () => {
    const imagesToShow = images || [image]
    const startIndex = images ? index : 0
    openLightbox(imagesToShow, startIndex)
  }

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden cursor-zoom-in group ${aspectRatio} ${className}`}
      data-cursor="image"
      aria-label={`View ${image.alt}`}
    >
      {fill ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width || 800}
          height={image.height || 1000}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
        style={{ backgroundColor: 'rgba(10, 10, 10, 0.3)' }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          stroke="#FAFAFA"
          strokeWidth="1.5"
        >
          <circle cx="14" cy="14" r="8" />
          <line x1="20" y1="20" x2="26" y2="26" />
          <line x1="14" y1="11" x2="14" y2="17" />
          <line x1="11" y1="14" x2="17" y2="14" />
        </svg>
      </div>
    </button>
  )
}

// Gallery component - renders multiple images with lightbox support
interface ImageGalleryProps {
  images: LightboxImage[]
  columns?: 2 | 3 | 4
  gap?: number
  aspectRatio?: string
  className?: string
}

export function ImageGallery({
  images,
  columns = 3,
  gap = 4,
  aspectRatio = 'aspect-[3/4]',
  className = '',
}: ImageGalleryProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }

  return (
    <div
      className={`grid ${gridCols[columns]} ${className}`}
      style={{ gap: `${gap * 4}px` }}
    >
      {images.map((image, index) => (
        <motion.div
          key={image.src}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.6,
            delay: index * 0.1,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
        >
          <LightboxImage
            image={image}
            images={images}
            index={index}
            aspectRatio={aspectRatio}
            fill
          />
        </motion.div>
      ))}
    </div>
  )
}

export default LightboxProvider
