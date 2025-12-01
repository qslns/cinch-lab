'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Footer from '@/components/Footer'
import { useLightbox } from '@/components/ImageLightbox'

// Custom easing
const yonEase = [0.22, 1, 0.36, 1] as const

// Scattered image placeholders - Images speak
const scatteredImages = [
  {
    id: 1,
    position: { top: '8%', left: '5%' },
    size: 'w-[26vw] md:w-[18vw]',
    rotation: -4,
    variant: 'dark' as const,
    aspectRatio: '4/5',
    parallaxSpeed: 0.3,
  },
  {
    id: 2,
    position: { top: '15%', right: '8%' },
    size: 'w-[30vw] md:w-[22vw]',
    rotation: 3,
    variant: 'medium' as const,
    aspectRatio: '3/4',
    parallaxSpeed: 0.5,
  },
  {
    id: 3,
    position: { top: '55%', left: '10%' },
    size: 'w-[22vw] md:w-[14vw]',
    rotation: -2,
    variant: 'light' as const,
    aspectRatio: '1/1',
    parallaxSpeed: 0.4,
  },
  {
    id: 4,
    position: { top: '60%', right: '15%' },
    size: 'w-[28vw] md:w-[16vw]',
    rotation: 5,
    variant: 'dark' as const,
    aspectRatio: '4/5',
    parallaxSpeed: 0.6,
  },
]

const variantStyles = {
  light: 'bg-yon-platinum',
  medium: 'bg-yon-silver',
  dark: 'bg-yon-charcoal',
}

// Floating image component
function FloatingImage({
  img,
  scrollYProgress,
  onImageClick,
}: {
  img: typeof scatteredImages[0]
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
  onImageClick: () => void
}) {
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * img.parallaxSpeed])

  return (
    <motion.button
      className={`absolute ${img.size} cursor-zoom-in group`}
      style={{
        ...img.position,
        y,
        zIndex: img.id,
      }}
      initial={{ opacity: 0, scale: 0.9, rotate: img.rotation - 5 }}
      animate={{ opacity: 1, scale: 1, rotate: img.rotation }}
      transition={{
        duration: 1.2,
        delay: 0.3 + img.id * 0.15,
        ease: yonEase,
      }}
      onClick={onImageClick}
      data-cursor="image"
      aria-label={`View image ${img.id}`}
    >
      <div
        className={`relative ${variantStyles[img.variant]} overflow-hidden`}
        style={{ aspectRatio: img.aspectRatio }}
      >
        <div className="absolute inset-0 border border-current opacity-5" />
        {/* Hover overlay with zoom icon */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(10, 10, 10, 0.3)' }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            fill="none"
            stroke={img.variant === 'dark' ? '#FAFAFA' : '#0A0A0A'}
            strokeWidth="1.5"
          >
            <circle cx="14" cy="14" r="8" />
            <line x1="20" y1="20" x2="26" y2="26" />
            <line x1="14" y1="11" x2="14" y2="17" />
            <line x1="11" y1="14" x2="17" y2="14" />
          </svg>
        </div>
      </div>
    </motion.button>
  )
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const { openLightbox } = useLightbox()

  // Prepare images for lightbox
  const lightboxImages = scatteredImages.map(img => ({
    src: `/images/about/${img.id}.jpg`,
    alt: `About image ${img.id}`,
    caption: `Taehyun Lee - Image ${img.id}`,
    captionKo: 'THE YON Studio',
    width: 1200,
    height: img.aspectRatio === '1/1' ? 1200 : img.aspectRatio === '3/4' ? 1600 : 1500,
  }))

  const handleImageClick = (index: number) => {
    openLightbox(lightboxImages, index)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-yon-white">
      {/* Hero - Images dominant, minimal text */}
      <section className="relative min-h-[100vh] overflow-hidden">
        {/* Scattered images */}
        {scatteredImages.map((img, index) => (
          <FloatingImage key={img.id} img={img} scrollYProgress={scrollYProgress} onImageClick={() => handleImageClick(index)} />
        ))}

        {/* Minimal text - center */}
        <div className="relative z-20 min-h-[100vh] flex items-center justify-center px-6">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: yonEase }}
          >
            <h1 className="font-serif text-3xl md:text-4xl text-yon-black">
              Taehyun Lee
            </h1>
            <p className="mt-4 font-mono text-[10px] text-yon-grey/60 tracking-[0.3em] uppercase">
              Tokyo
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact - Just the essentials */}
      <section className="py-40 md:py-56 px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <a
            href="mailto:hello@theyon.com"
            className="group relative inline-block font-mono text-xs text-yon-grey hover:text-yon-black transition-colors duration-500 tracking-wider"
          >
            <span>hello@theyon.com</span>
            <span className="absolute bottom-0 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300" />
          </a>
          <span className="block mt-6">
            <a
              href="https://instagram.com/theyon_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block font-mono text-xs text-yon-grey/50 hover:text-yon-black transition-colors duration-500 tracking-wider"
            >
              <span>@theyon_studio</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300" />
            </a>
          </span>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
