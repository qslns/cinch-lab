'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { ImagePlaceholder } from './ImagePlaceholder'
import { useLightbox } from '@/components/ImageLightbox'

// THE YON custom easing
const yonEase = [0.22, 1, 0.36, 1] as const

// Floating image component - Image-dominant approach
function FloatingImage({
  left,
  top,
  rotation,
  delay,
  label,
  variant = 'dark',
  aspectRatio = '3/4',
  size = 'medium',
  parallaxSpeed = 0.1,
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
  parallaxSpeed?: number
  zIndex?: number
  onImageClick: () => void
}) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, parallaxSpeed * 300])

  const sizeClasses = {
    small: 'w-28 md:w-36 lg:w-44',
    medium: 'w-40 md:w-56 lg:w-72',
    large: 'w-56 md:w-72 lg:w-96',
    xlarge: 'w-72 md:w-96 lg:w-[28rem]',
    hero: 'w-80 md:w-[28rem] lg:w-[36rem]',
  }

  return (
    <motion.button
      className={`absolute ${sizeClasses[size]} pointer-events-auto cursor-zoom-in group`}
      style={{ left, top, zIndex, y }}
      initial={{ opacity: 0, y: 100, rotate: rotation * 2, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, rotate: rotation, scale: 1 }}
      transition={{
        duration: 1.6,
        delay,
        ease: yonEase,
      }}
      whileHover={{
        scale: 1.02,
        rotate: rotation * 0.5,
        zIndex: 50,
        transition: { duration: 0.6, ease: yonEase },
      }}
      onClick={onImageClick}
      data-cursor="image"
      aria-label={`View ${label}`}
    >
      <div className="relative">
        <ImagePlaceholder
          label={label}
          variant={variant}
          aspectRatio={aspectRatio}
        />
        {/* Hover overlay with zoom icon */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(10, 10, 10, 0.3)' }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            stroke={variant === 'light' ? '#0A0A0A' : '#FAFAFA'}
            strokeWidth="1.5"
          >
            <circle cx="14" cy="14" r="8" />
            <line x1="20" y1="20" x2="26" y2="26" />
            <line x1="14" y1="11" x2="14" y2="17" />
            <line x1="11" y1="14" x2="17" y2="14" />
          </svg>
        </div>
      </div>
      {/* Minimal label */}
      <motion.span
        className="absolute -bottom-5 left-0 font-mono text-[8px] text-yon-grey/30 tracking-[0.2em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.6 }}
      >
        {label.split('/')[1]?.trim() || label}
      </motion.span>
    </motion.button>
  )
}

// Hero images data for lightbox
const heroImages = [
  { label: 'AW25 / 001', src: '/images/hero/aw25-001.jpg', aspectRatio: '3/4' },
  { label: 'SS25 / 002', src: '/images/hero/ss25-002.jpg', aspectRatio: '4/5' },
  { label: 'DETAIL / 003', src: '/images/hero/detail-003.jpg', aspectRatio: '1/1' },
  { label: 'PROCESS / 004', src: '/images/hero/process-004.jpg', aspectRatio: '16/10' },
  { label: 'TOILE / 005', src: '/images/hero/toile-005.jpg', aspectRatio: '3/4' },
]

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const { openLightbox } = useLightbox()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, -100])

  // Mouse parallax
  const springConfig = { stiffness: 80, damping: 30 }
  const parallaxX = useSpring(mouseX, springConfig)
  const parallaxY = useSpring(mouseY, springConfig)

  // Prepare lightbox images
  const lightboxImages = heroImages.map(img => ({
    src: img.src,
    alt: img.label,
    caption: img.label,
    captionKo: 'THE YON 2024-25',
    width: 1200,
    height: img.aspectRatio === '1/1' ? 1200 : img.aspectRatio === '16/10' ? 750 : 1600,
  }))

  const handleImageClick = (index: number) => {
    openLightbox(lightboxImages, index)
  }

  useEffect(() => {
    setIsMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseX.set((e.clientX - centerX) / 40)
      mouseY.set((e.clientY - centerY) / 40)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

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
      {/* Subtle grain texture */}
      <div className="absolute inset-0 opacity-[0.012] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      {/* IMAGE-DOMINANT LAYOUT - Images are the hero */}
      <motion.div
        className="absolute inset-0"
        style={{ x: parallaxX, y: parallaxY, opacity: heroOpacity }}
      >
        {/* Primary hero image - largest, commands attention */}
        <FloatingImage
          left="8%"
          top="15%"
          rotation={-1.5}
          delay={0.4}
          label="AW25 / 001"
          variant="dark"
          aspectRatio="3/4"
          size="hero"
          parallaxSpeed={-0.08}
          zIndex={20}
          onImageClick={() => handleImageClick(0)}
        />

        {/* Secondary images - supporting roles */}
        <FloatingImage
          left="58%"
          top="8%"
          rotation={2}
          delay={0.7}
          label="SS25 / 002"
          variant="light"
          aspectRatio="4/5"
          size="large"
          parallaxSpeed={0.05}
          zIndex={15}
          onImageClick={() => handleImageClick(1)}
        />

        <FloatingImage
          left="70%"
          top="55%"
          rotation={-2}
          delay={1.0}
          label="DETAIL / 003"
          variant="medium"
          aspectRatio="1/1"
          size="medium"
          parallaxSpeed={0.12}
          zIndex={25}
          onImageClick={() => handleImageClick(2)}
        />

        <FloatingImage
          left="2%"
          top="70%"
          rotation={1.5}
          delay={1.2}
          label="PROCESS / 004"
          variant="light"
          aspectRatio="16/10"
          size="medium"
          parallaxSpeed={0.08}
          zIndex={10}
          onImageClick={() => handleImageClick(3)}
        />

        {/* Small accent image */}
        <FloatingImage
          left="45%"
          top="75%"
          rotation={-1}
          delay={1.4}
          label="TOILE / 005"
          variant="dark"
          aspectRatio="3/4"
          size="small"
          parallaxSpeed={0.15}
          zIndex={30}
          onImageClick={() => handleImageClick(4)}
        />
      </motion.div>

      {/* RESTRAINED TYPOGRAPHY - Small but present */}
      <motion.div
        className="relative z-40 min-h-[100vh] flex flex-col justify-between py-8 md:py-12 px-6 md:px-10 lg:px-16"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        {/* Top: Brand mark - minimal, corner placement */}
        <div className="flex justify-between items-start">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: yonEase }}
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
            transition={{ delay: 0.6 }}
          >
            <span className="font-mono text-[8px] tracking-[0.25em] text-yon-grey/30 uppercase">
              Portfolio
            </span>
            <span className="block font-mono text-[8px] tracking-[0.15em] text-yon-grey/20 mt-0.5">
              2024—25
            </span>
          </motion.div>
        </div>

        {/* Center: Philosophy statement - quiet but present */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center max-w-md px-6 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1.2 }}
        >
          <p className="font-serif text-lg md:text-xl text-yon-black/80 leading-relaxed italic">
            Twisted yet harmonious
          </p>
          <p className="font-mono text-[9px] tracking-[0.3em] text-yon-grey/40 mt-4 uppercase">
            뒤틀렸지만 조화로운
          </p>
        </motion.div>

        {/* Bottom: Navigation hints and info */}
        <div className="flex justify-between items-end">
          {/* Left: Scroll indicator */}
          <motion.div
            className="flex flex-col items-start gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.div
              className="w-px h-12 bg-gradient-to-b from-yon-grey/40 to-transparent origin-top"
              animate={{ scaleY: [1, 0.4, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="font-mono text-[7px] tracking-[0.3em] text-yon-grey/30 uppercase">
              Scroll
            </span>
          </motion.div>

          {/* Center: CTA - understated */}
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
          >
            <Link
              href="/collections"
              className="group flex items-center gap-3"
              data-cursor="link"
            >
              <span className="font-mono text-[9px] tracking-[0.2em] text-yon-grey/60 uppercase group-hover:text-yon-black transition-colors duration-300">
                View Collections
              </span>
              <motion.span
                className="text-yon-grey/40 text-xs group-hover:text-yon-black transition-colors"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </Link>

            <Link
              href="/process"
              className="font-mono text-[8px] tracking-[0.15em] text-yon-grey/30 uppercase hover:text-yon-grey/60 transition-colors"
              data-cursor="link"
            >
              Process
            </Link>
          </motion.div>

          {/* Right: Designer credit */}
          <motion.div
            className="text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
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

      {/* Decorative: Subtle geometric */}
      <motion.div
        className="absolute top-[25%] right-[12%] z-5 hidden lg:block pointer-events-none"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 0.04, rotate: 45 }}
        transition={{ delay: 2.5, duration: 1.5 }}
      >
        <div className="w-16 h-16 border border-yon-grey/30" />
      </motion.div>
    </section>
  )
}
