'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import Footer from '@/components/Footer'

// Collection data
const collections = [
  { id: 1, title: 'DECONSTRUCTION', season: 'FW 2025', slug: 'deconstruction' },
  { id: 2, title: 'FRAGMENTS', season: 'SS 2025', slug: 'fragments' },
  { id: 3, title: 'VOID', season: 'FW 2024', slug: 'void' },
]

// Hero image configurations - Clear separation from text
const heroImages = [
  {
    id: 1,
    position: 'top-[55%] left-[5%] md:top-[48%] md:left-[3%]',
    size: 'w-[40vw] md:w-[32vw] max-w-[420px]',
    rotation: -2,
    zIndex: 2,
    parallaxSpeed: 0.2,
    variant: 'light' as const,
    aspectRatio: '3/4' as const,
    delay: 0.3,
  },
  {
    id: 2,
    position: 'top-[52%] right-[8%] md:top-[42%] md:right-[5%]',
    size: 'w-[35vw] md:w-[28vw] max-w-[380px]',
    rotation: 2.5,
    zIndex: 3,
    parallaxSpeed: 0.35,
    variant: 'medium' as const,
    aspectRatio: '4/5' as const,
    delay: 0.45,
  },
  {
    id: 3,
    position: 'top-[68%] left-[35%] md:top-[62%] md:left-[30%]',
    size: 'w-[28vw] md:w-[22vw] max-w-[300px]',
    rotation: -1,
    zIndex: 4,
    parallaxSpeed: 0.5,
    variant: 'dark' as const,
    aspectRatio: '1/1' as const,
    delay: 0.6,
  },
  {
    id: 4,
    position: 'top-[78%] right-[25%] md:top-[72%] md:right-[22%]',
    size: 'w-[22vw] md:w-[18vw] max-w-[240px]',
    rotation: 1.5,
    zIndex: 2,
    parallaxSpeed: 0.25,
    variant: 'light' as const,
    aspectRatio: '4/5' as const,
    delay: 0.75,
  },
]

const variantStyles = {
  light: 'bg-yon-platinum',
  medium: 'bg-yon-silver',
  dark: 'bg-yon-charcoal',
}

const variantTextStyles = {
  light: 'text-yon-grey',
  medium: 'text-yon-graphite',
  dark: 'text-yon-silver',
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Create parallax transforms for each image
  const parallaxY = heroImages.map((img) =>
    useTransform(scrollYProgress, [0, 1], [0, -200 * img.parallaxSpeed])
  )

  // Hero section fade
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <div ref={containerRef} className="relative">
      {/* ============================================
          HERO SECTION - Clear title + image zones
          ============================================ */}
      <section className="relative min-h-[160vh] md:min-h-[180vh] overflow-hidden bg-yon-white">
        {/* TITLE ZONE - Top 40% of hero, clear of images */}
        <div className="relative z-10 pt-32 md:pt-40 px-6 md:px-12">
          <motion.div
            className="max-w-6xl mx-auto"
            style={{ opacity: heroOpacity }}
          >
            {/* Tagline */}
            <motion.p
              className="font-mono text-xs text-yon-grey tracking-[0.25em] uppercase mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Experimental Fashion
            </motion.p>

            {/* Main Title - NO mix-blend-mode, clear black text */}
            <motion.h1
              className="font-serif text-[18vw] md:text-[14vw] lg:text-[11vw] leading-[0.85] tracking-tight text-yon-black"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block transform rotate-[-1deg]">THE</span>
              <span className="block transform rotate-[0.5deg] ml-[8%]">YON</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mt-8 font-mono text-sm md:text-base text-yon-steel tracking-wide ml-[2%]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Beyond Fashion
            </motion.p>
          </motion.div>
        </div>

        {/* IMAGE ZONE - Below title, images can overlap each other */}
        <div className="absolute inset-0 pointer-events-none">
          {heroImages.map((img, index) => (
            <motion.div
              key={img.id}
              className={`absolute ${img.position} ${img.size} pointer-events-auto`}
              style={{
                y: parallaxY[index],
                zIndex: img.zIndex,
              }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: img.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className={`relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500 ${variantStyles[img.variant]}`}
                style={{
                  aspectRatio: img.aspectRatio,
                  transform: `rotate(${img.rotation}deg)`,
                }}
              >
                <div className={`absolute inset-0 flex items-center justify-center font-mono text-xs tracking-widest ${variantTextStyles[img.variant]}`}>
                  IMAGE {String(img.id).padStart(2, '0')}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ opacity: heroOpacity }}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="font-mono text-[10px] text-yon-grey tracking-widest uppercase">
              Scroll
            </span>
            <motion.div
              className="w-px h-12 bg-yon-grey origin-top"
              animate={{ scaleY: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </section>

      {/* ============================================
          BRAND PHILOSOPHY
          ============================================ */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 bg-yon-ivory">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 1 }}
          >
            {/* Decorative quote mark */}
            <span className="absolute -top-16 -left-4 md:-left-12 font-serif text-[150px] md:text-[220px] text-yon-platinum/40 leading-none select-none pointer-events-none">
              "
            </span>

            <motion.h2
              className="relative font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.15] text-yon-black"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block">Twisted</span>
              <span className="block ml-[8%]">yet harmonious</span>
            </motion.h2>

            <motion.p
              className="mt-10 md:mt-14 text-lg md:text-xl text-yon-steel leading-relaxed max-w-2xl ml-[3%] md:ml-[10%]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Every element is slightly askew, yet together they form perfect beauty.
              Fashion that transcends time and space. The pursuit of an ideal beyond reach.
            </motion.p>

            <motion.div
              className="mt-12 md:mt-16 ml-[3%] md:ml-[10%]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-3 font-mono text-sm text-yon-black group"
              >
                <span className="border-b border-yon-black pb-0.5 group-hover:border-yon-accent group-hover:text-yon-accent transition-colors duration-300">
                  Learn more
                </span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          COLLECTIONS PREVIEW
          ============================================ */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 bg-yon-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="mb-16 md:mb-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-xs text-yon-grey tracking-[0.2em] uppercase">
              Latest Work
            </span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl text-yon-black">
              Collections
            </h2>
          </motion.div>

          {/* Collection Cards - Varied sizes for visual rhythm */}
          <div className="space-y-12 md:space-y-0">
            {collections.map((collection, index) => {
              // More varied layout configurations: large, medium, small
              const configs = [
                {
                  wrapper: 'md:w-[72%] md:ml-0',
                  aspectRatio: 'aspect-[4/5]',
                  rotation: -1.5,
                  variant: 'large',
                  entryX: -40,
                },
                {
                  wrapper: 'md:w-[48%] md:ml-auto md:-mt-32',
                  aspectRatio: 'aspect-[3/4]',
                  rotation: 2,
                  variant: 'medium',
                  entryX: 40,
                },
                {
                  wrapper: 'md:w-[40%] md:ml-[8%] md:-mt-16',
                  aspectRatio: 'aspect-[1/1]',
                  rotation: -0.5,
                  variant: 'small',
                  entryX: 0,
                },
              ]
              const config = configs[index % configs.length]
              const bgVariants = ['bg-yon-platinum', 'bg-yon-silver', 'bg-yon-charcoal']
              const textVariants = ['text-yon-grey', 'text-yon-graphite', 'text-yon-silver']

              return (
                <motion.div
                  key={collection.id}
                  className={config.wrapper}
                  initial={{ opacity: 0, x: config.entryX, y: 60 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 0.9,
                    delay: index * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="group block outline-none"
                  >
                    <motion.div
                      className={`relative ${config.aspectRatio} ${bgVariants[index % 3]} overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-focus-visible:shadow-2xl group-focus-visible:ring-2 group-focus-visible:ring-yon-black group-focus-visible:ring-offset-4`}
                      style={{ transform: `rotate(${config.rotation}deg)` }}
                      whileHover={{ scale: 1.03, rotate: config.rotation * 0.5 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`font-mono text-sm tracking-widest ${textVariants[index % 3]}`}>
                          {collection.title}
                        </span>
                      </div>

                      {/* Hover overlay with gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-yon-black/10 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500" />

                      {/* Index number */}
                      <span className={`absolute top-6 left-6 font-mono text-xs ${textVariants[index % 3]}`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Season tag - appears on hover */}
                      <span className={`absolute bottom-6 right-6 font-mono text-[10px] tracking-[0.15em] uppercase ${textVariants[index % 3]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                        {collection.season}
                      </span>
                    </motion.div>

                    {/* Info */}
                    <div className="mt-6 flex justify-between items-end">
                      <div>
                        <h3 className="font-serif text-2xl md:text-3xl text-yon-black group-hover:text-yon-accent group-focus-visible:text-yon-accent transition-colors duration-300">
                          {collection.title}
                        </h3>
                        <p className="mt-2 font-mono text-xs text-yon-grey tracking-wider">
                          {collection.season}
                        </p>
                      </div>
                      <motion.span
                        className="font-mono text-xs text-yon-grey"
                        initial={{ opacity: 0, x: 8 }}
                        whileInView={{ opacity: 0, x: 8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-all duration-300 inline-block transform translate-x-2 group-hover:translate-x-0 group-focus-visible:translate-x-0">
                          VIEW →
                        </span>
                      </motion.span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* View All Link */}
          <motion.div
            className="mt-20 md:mt-28 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href="/collections"
              className="group inline-flex items-center gap-3 font-mono text-sm text-yon-black hover:text-yon-accent focus-visible:text-yon-accent transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-yon-black focus-visible:ring-offset-4"
            >
              <span className="border-b border-yon-black group-hover:border-yon-accent group-focus-visible:border-yon-accent pb-0.5 transition-colors duration-300">
                View All Collections
              </span>
              <span className="transform group-hover:translate-x-1 group-focus-visible:translate-x-1 transition-transform duration-300">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
