'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CipherText from '@/components/CipherText'

gsap.registerPlugin(ScrollTrigger)

interface GalleryImage {
  id: string
  src: string
  alt: string
  title?: string
  category?: string
  width?: number
  height?: number
}

interface ImageGalleryProps {
  images: GalleryImage[]
  layout?: 'masonry' | 'grid' | 'carousel' | 'scattered'
  columns?: number
  gap?: number
  className?: string
}

export default function ImageGallery({
  images,
  layout = 'masonry',
  columns = 3,
  gap = 16,
  className = ''
}: ImageGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null)
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!galleryRef.current) return

    const ctx = gsap.context(() => {
      // Initialize images with stagger animation
      imageRefs.current.forEach((image, index) => {
        if (!image) return

        if (layout === 'scattered') {
          // Random scattered layout
          const randomX = (Math.random() - 0.5) * 200
          const randomY = (Math.random() - 0.5) * 100
          const randomRotate = (Math.random() - 0.5) * 30

          gsap.set(image, {
            x: randomX,
            y: randomY,
            rotation: randomRotate,
            scale: 0,
            opacity: 0
          })

          ScrollTrigger.create({
            trigger: image,
            start: 'top 90%',
            onEnter: () => {
              gsap.to(image, {
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                duration: 1.5,
                delay: index * 0.05,
                ease: 'elastic.out(1, 0.5)'
              })
            },
            once: true
          })
        } else {
          // Standard grid/masonry animation
          gsap.set(image, {
            opacity: 0,
            y: 50,
            scale: 0.9
          })

          ScrollTrigger.create({
            trigger: image,
            start: 'top 85%',
            onEnter: () => {
              gsap.to(image, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: index * 0.03,
                ease: 'power3.out'
              })
            },
            once: true
          })
        }

        // Hover effect
        image.addEventListener('mouseenter', () => {
          gsap.to(image, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
          })
        })

        image.addEventListener('mouseleave', () => {
          gsap.to(image, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          })
        })
      })
    }, galleryRef)

    return () => ctx.revert()
  }, [layout])

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => new Set(prev).add(id))
  }

  const getLayoutClasses = () => {
    switch (layout) {
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 xl:columns-4 space-y-4'
      case 'grid':
        return `grid grid-cols-1 md:grid-cols-${columns} gap-${gap / 4}`
      case 'carousel':
        return 'flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4'
      case 'scattered':
        return 'relative min-h-screen'
      default:
        return ''
    }
  }

  const getImageContainerClasses = () => {
    switch (layout) {
      case 'carousel':
        return 'flex-none w-80 snap-center'
      case 'scattered':
        return 'absolute'
      default:
        return 'break-inside-avoid'
    }
  }

  return (
    <>
      <div
        ref={galleryRef}
        className={`${getLayoutClasses()} ${className}`}
        style={{ gap: layout === 'grid' ? `${gap}px` : undefined }}
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            ref={el => { imageRefs.current[index] = el }}
            className={`${getImageContainerClasses()} relative overflow-hidden cursor-pointer group`}
            onClick={() => setSelectedImage(image)}
            style={layout === 'scattered' ? {
              left: `${(index % 4) * 25}%`,
              top: `${Math.floor(index / 4) * 250}px`,
              width: `${200 + (index % 3) * 100}px`,
              height: `${250 + (index % 2) * 150}px`,
            } : undefined}
          >
            {/* Image wrapper */}
            <div className="relative w-full h-full bg-gray-100">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width || 800}
                height={image.height || 600}
                className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                  loadedImages.has(image.id) ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => handleImageLoad(image.id)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Loading skeleton */}
              {!loadedImages.has(image.id) && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse" />
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Image info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                {image.title && (
                  <h3 className="text-sm font-thin tracking-wide mb-1">
                    <CipherText text={image.title} />
                  </h3>
                )}
                {image.category && (
                  <p className="text-[10px] tracking-widest opacity-70">
                    <CipherText text={image.category.toUpperCase()} />
                  </p>
                )}
              </div>

              {/* Corner markers */}
              <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-white opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-white opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-white opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-white opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh]">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={selectedImage.width || 1920}
              height={selectedImage.height || 1080}
              className="w-full h-full object-contain"
            />

            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white text-xl"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>

            {/* Image details */}
            {selectedImage.title && (
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-thin mb-1">
                  <CipherText text={selectedImage.title} />
                </h3>
                {selectedImage.category && (
                  <p className="text-xs tracking-widest opacity-70">
                    <CipherText text={selectedImage.category.toUpperCase()} />
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}