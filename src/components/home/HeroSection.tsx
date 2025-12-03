'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ImagePlaceholder } from './ImagePlaceholder'
import { useLightbox } from '@/components/ImageLightbox'

// THE YON custom easing
const yonEase = [0.22, 1, 0.36, 1] as const

// Simplified floating image - no excessive hover effects
function FloatingImage({
  left,
  top,
  rotation,
  delay,
  label,
  variant = 'dark',
  aspectRatio = '3/4',
  size = 'medium',
  zIndex = 10,
  onImageClick,
}: {
  left: string
  top: string
  rotation: number
  delay: number
  label: string
  variant?: 'dark' | 'medium' | 'light'
  aspectRatio?: string
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'hero'
  zIndex?: number
  onImageClick: () => void
}) {
  const sizeClasses = {
    small: 'w-28 md:w-36 lg:w-44',
    medium: 'w-40 md:w-56 lg:w-72',
    large: 'w-56 md:w-72 lg:w-96',
    xlarge: 'w-72 md:w-96 lg:w-[28rem]',
    hero: 'w-80 md:w-[28rem] lg:w-[36rem]',
  }

  return (
    <motion.button
      className={`absolute ${sizeClasses[size]} pointer-events-auto cursor-pointer`}
      style={{ left, top, zIndex, rotate: rotation }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1.2,
        delay,
        ease: yonEase,
      }}
      onClick={onImageClick}
      aria-label={`View ${label}`}
    >
      <ImagePlaceholder
        label={label}
        variant={variant}
        aspectRatio={aspectRatio}
      />
      {/* Minimal label */}
      <span className="absolute -bottom-5 left-0 font-mono text-[8px] text-yon-grey/30 tracking-[0.2em]">
        {label.split('/')[1]?.trim() || label}
      </span>
    </motion.button>
  )
}

// Hero images data for lightbox
const heroImages = [
  { label: 'AW25 / 001', src: '/images/hero/aw25-001.jpg', aspectRatio: '3/4' },
  { label: 'SS25 / 002', src: '/images/hero/ss25-002.jpg', aspectRatio: '4/5' },
  { label: 'DETAIL / 003', src: '/images/hero/detail-003.jpg', aspectRatio: '1/1' },
]

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const { openLightbox } = useLightbox()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  // Prepare lightbox images
  const lightboxImages = heroImages.map(img => ({
    src: img.src,
    alt: img.label,
    caption: img.label,
    captionKo: 'THE YON 2024-25',
    width: 1200,
    height: img.aspectRatio === '1/1' ? 1200 : 1600,
  }))

  const handleImageClick = (index: number) => {
    openLightbox(lightboxImages, index)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <section className="relative min-h-[100vh] flex items-center justify-center bg-yon-white">
        <span className="font-mono text-[10px] tracking-[0.4em] text-yon-grey/40 uppercase">THE YON</span>
      </section>
    )
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-[130vh] overflow-hidden bg-yon-white"
    >
      {/* IMAGE LAYOUT - Reduced to 3 images, no parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: heroOpacity }}
      >
        {/* Primary hero image */}
        <FloatingImage
          left="8%"
          top="15%"
          rotation={-1.5}
          delay={0.3}
          label="AW25 / 001"
          variant="dark"
          aspectRatio="3/4"
          size="hero"
          zIndex={20}
          onImageClick={() => handleImageClick(0)}
        />

        {/* Secondary image */}
        <FloatingImage
          left="58%"
          top="10%"
          rotation={1.5}
          delay={0.5}
          label="SS25 / 002"
          variant="light"
          aspectRatio="4/5"
          size="large"
          zIndex={15}
          onImageClick={() => handleImageClick(1)}
        />

        {/* Accent image */}
        <FloatingImage
          left="65%"
          top="58%"
          rotation={-1}
          delay={0.7}
          label="DETAIL / 003"
          variant="medium"
          aspectRatio="1/1"
          size="medium"
          zIndex={25}
          onImageClick={() => handleImageClick(2)}
        />
      </motion.div>

      {/* TYPOGRAPHY - Simplified */}
      <motion.div
        className="relative z-40 min-h-[100vh] flex flex-col justify-between py-8 md:py-12 px-6 md:px-10 lg:px-16"
        style={{ opacity: heroOpacity }}
      >
        {/* Top: Brand mark */}
        <div className="flex justify-between items-start">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: yonEase }}
          >
            <span className="font-mono text-[10px] tracking-[0.4em] text-yon-grey/60 uppercase">
              THE YON
            </span>
            <span className="block font-mono text-[8px] tracking-[0.2em] text-yon-grey/30 mt-1">
              저 너머
            </span>
          </motion.div>

          <motion.div
            className="text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="font-mono text-[8px] tracking-[0.25em] text-yon-grey/30 uppercase">
              Portfolio
            </span>
            <span className="block font-mono text-[8px] tracking-[0.15em] text-yon-grey/20 mt-0.5">
              2024—25
            </span>
          </motion.div>
        </div>

        {/* Center: Philosophy statement */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center max-w-md px-6 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="font-serif text-lg md:text-xl text-yon-black/80 leading-relaxed italic">
            Twisted yet harmonious
          </p>
          <p className="font-mono text-[9px] tracking-[0.3em] text-yon-grey/40 mt-4 uppercase">
            뒤틀렸지만 조화로운
          </p>
        </motion.div>

        {/* Bottom: Navigation */}
        <div className="flex justify-between items-end">
          {/* Left: Scroll indicator - static, no animation */}
          <motion.div
            className="flex flex-col items-start gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="w-px h-12 bg-gradient-to-b from-yon-grey/40 to-transparent" />
            <span className="font-mono text-[7px] tracking-[0.3em] text-yon-grey/30 uppercase">
              Scroll
            </span>
          </motion.div>

          {/* Center: CTA */}
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Link
              href="/collections"
              className="group flex items-center gap-3"
            >
              <span className="font-mono text-[9px] tracking-[0.2em] text-yon-grey/60 uppercase group-hover:text-yon-black transition-colors duration-300">
                View Collections
              </span>
              <span className="text-yon-grey/40 text-xs group-hover:text-yon-black transition-colors duration-300">
                →
              </span>
            </Link>

            <Link
              href="/process"
              className="font-mono text-[8px] tracking-[0.15em] text-yon-grey/30 uppercase hover:text-yon-grey/60 transition-colors duration-300"
            >
              Process
            </Link>
          </motion.div>

          {/* Right: Designer credit */}
          <motion.div
            className="text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <span className="font-mono text-[8px] tracking-[0.2em] text-yon-grey/25 uppercase block">
              Taehyun Lee
            </span>
            <span className="font-mono text-[7px] tracking-[0.15em] text-yon-grey/15 block mt-0.5">
              SASADA
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
