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
    position: { top: '12%', left: '8%' },
    size: 'w-[28vw] md:w-[20vw]',
    rotation: -3,
    variant: 'dark' as const,
    aspectRatio: '4/5',
    parallaxSpeed: 0.3,
  },
  {
    id: 2,
    position: { top: '18%', right: '10%' },
    size: 'w-[32vw] md:w-[24vw]',
    rotation: 2,
    variant: 'medium' as const,
    aspectRatio: '3/4',
    parallaxSpeed: 0.5,
  },
  {
    id: 3,
    position: { top: '58%', left: '15%' },
    size: 'w-[24vw] md:w-[16vw]',
    rotation: -1.5,
    variant: 'light' as const,
    aspectRatio: '1/1',
    parallaxSpeed: 0.4,
  },
  {
    id: 4,
    position: { top: '55%', right: '12%' },
    size: 'w-[26vw] md:w-[18vw]',
    rotation: 4,
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
  img: (typeof scatteredImages)[0]
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
        {/* Hover overlay */}
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
  const lightboxImages = scatteredImages.map((img) => ({
    src: `/images/about/${img.id}.jpg`,
    alt: `About image ${img.id}`,
    caption: `Taehyun Lee`,
    captionKo: 'THE YON',
    width: 1200,
    height: img.aspectRatio === '1/1' ? 1200 : img.aspectRatio === '3/4' ? 1600 : 1500,
  }))

  const handleImageClick = (index: number) => {
    openLightbox(lightboxImages, index)
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-yon-white">
      {/* Full viewport - Images dominant */}
      <section className="relative min-h-[100vh] overflow-hidden">
        {/* Scattered images */}
        {scatteredImages.map((img, index) => (
          <FloatingImage
            key={img.id}
            img={img}
            scrollYProgress={scrollYProgress}
            onImageClick={() => handleImageClick(index)}
          />
        ))}

        {/* Name - top left */}
        <motion.div
          className="absolute top-24 left-6 md:left-10 lg:left-16 z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: yonEase }}
        >
          <h1 className="font-serif text-2xl md:text-3xl text-yon-black">Taehyun Lee</h1>
          <p className="mt-2 font-mono text-[10px] text-yon-grey/50 tracking-[0.3em] uppercase">
            Tokyo
          </p>
        </motion.div>

        {/* Contact - bottom right */}
        <motion.div
          className="absolute bottom-24 right-6 md:right-10 lg:right-16 z-30 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: yonEase }}
        >
          <a
            href="mailto:hello@theyon.com"
            className="block font-mono text-xs text-yon-grey/60 hover:text-yon-black transition-colors duration-300 tracking-wider focus-ring"
          >
            hello@theyon.com
          </a>
          <a
            href="https://instagram.com/theyon_studio"
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-1 font-mono text-xs text-yon-grey/40 hover:text-yon-black transition-colors duration-300 tracking-wider focus-ring"
          >
            @theyon_studio
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
