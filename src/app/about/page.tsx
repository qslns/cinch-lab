'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Footer from '@/components/Footer'

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
}: {
  img: typeof scatteredImages[0]
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * img.parallaxSpeed])

  return (
    <motion.div
      className={`absolute ${img.size} pointer-events-none`}
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
    >
      <div
        className={`relative ${variantStyles[img.variant]} overflow-hidden`}
        style={{ aspectRatio: img.aspectRatio }}
      >
        <div className="absolute inset-0 border border-current opacity-5" />
      </div>
    </motion.div>
  )
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div ref={containerRef} className="min-h-screen bg-yon-white">
      {/* Hero - Images dominant, minimal text */}
      <section className="relative min-h-[100vh] overflow-hidden">
        {/* Scattered images */}
        {scatteredImages.map(img => (
          <FloatingImage key={img.id} img={img} scrollYProgress={scrollYProgress} />
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
      <section className="py-32 md:py-48 px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <a
            href="mailto:hello@theyon.com"
            className="font-mono text-sm text-yon-grey hover:text-yon-black transition-colors tracking-wider"
          >
            hello@theyon.com
          </a>
          <span className="block mt-4">
            <a
              href="https://instagram.com/theyon_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-yon-grey/60 hover:text-yon-black transition-colors tracking-wider"
            >
              @theyon_studio
            </a>
          </span>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
