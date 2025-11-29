'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import Footer from '@/components/Footer'

// Collection data
const collections = [
  { id: 1, title: 'DECONSTRUCTION', season: 'AW25', slug: 'deconstruction', description: 'Where traditional pattern blocks dissolve into chaos' },
  { id: 2, title: 'FRAGMENTS', season: 'SS25', slug: 'fragments', description: 'Beauty found in broken pieces, reconstructed' },
  { id: 3, title: 'VOID', season: 'AW24', slug: 'void', description: 'The space between defines the form' },
]

// Hero image configurations - Editorial scattered layout
const heroImages = [
  {
    id: 1,
    position: 'top-[52%] left-[3%] md:top-[45%] md:left-[2%]',
    size: 'w-[42vw] md:w-[30vw] max-w-[400px]',
    rotation: -2.5,
    zIndex: 2,
    parallaxSpeed: 0.15,
    variant: 'light' as const,
    aspectRatio: '3/4' as const,
    delay: 0.4,
    label: 'LOOK 01',
  },
  {
    id: 2,
    position: 'top-[48%] right-[5%] md:top-[38%] md:right-[3%]',
    size: 'w-[38vw] md:w-[28vw] max-w-[380px]',
    rotation: 3,
    zIndex: 3,
    parallaxSpeed: 0.3,
    variant: 'medium' as const,
    aspectRatio: '4/5' as const,
    delay: 0.55,
    label: 'LOOK 02',
  },
  {
    id: 3,
    position: 'top-[72%] left-[28%] md:top-[65%] md:left-[25%]',
    size: 'w-[30vw] md:w-[20vw] max-w-[280px]',
    rotation: -1,
    zIndex: 4,
    parallaxSpeed: 0.45,
    variant: 'dark' as const,
    aspectRatio: '1/1' as const,
    delay: 0.7,
    label: 'DETAIL',
  },
  {
    id: 4,
    position: 'top-[80%] right-[18%] md:top-[72%] md:right-[15%]',
    size: 'w-[24vw] md:w-[16vw] max-w-[220px]',
    rotation: 2,
    zIndex: 2,
    parallaxSpeed: 0.2,
    variant: 'light' as const,
    aspectRatio: '4/5' as const,
    delay: 0.85,
    label: 'TEXTURE',
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
          HERO SECTION - Editorial Fashion Layout
          ============================================ */}
      <section className="relative min-h-[160vh] md:min-h-[180vh] overflow-hidden bg-yon-white">
        {/* Subtle grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        {/* TITLE ZONE - Designer-level typography */}
        <div className="relative z-10 pt-28 md:pt-36 lg:pt-40 px-6 md:px-12 lg:px-16">
          <motion.div
            className="max-w-7xl mx-auto"
            style={{ opacity: heroOpacity }}
          >
            {/* Editorial tagline with decorative line */}
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="w-8 md:w-12 h-px bg-yon-grey" />
              <span className="font-mono text-[10px] md:text-xs text-yon-grey tracking-[0.3em] uppercase">
                Enter the World of THE YON
              </span>
            </motion.div>

            {/* Main Title - Display typography with character-level animation */}
            <motion.h1
              className="font-serif text-[20vw] md:text-[16vw] lg:text-[13vw] leading-[0.82] tracking-[-0.02em] text-yon-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 80, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                THE
              </motion.span>
              <motion.span
                className="block ml-[6%] md:ml-[8%]"
                initial={{ opacity: 0, y: 80, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                YON
              </motion.span>
            </motion.h1>

            {/* Subtitle with reveal animation */}
            <motion.div
              className="mt-10 md:mt-12 ml-[2%] md:ml-[4%] overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <motion.p
                className="font-mono text-xs md:text-sm text-yon-steel tracking-[0.2em] uppercase"
                initial={{ y: 30 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                Beyond — 저 너머
              </motion.p>
            </motion.div>

            {/* Season indicator */}
            <motion.div
              className="mt-6 ml-[2%] md:ml-[4%]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <span className="font-mono text-[10px] text-yon-grey/60 tracking-[0.15em]">
                AW25 — SS25 Collection
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* IMAGE ZONE - Editorial scattered with labels */}
        <div className="absolute inset-0 pointer-events-none">
          {heroImages.map((img, index) => (
            <motion.div
              key={img.id}
              className={`absolute ${img.position} ${img.size} pointer-events-auto group`}
              style={{
                y: parallaxY[index],
                zIndex: img.zIndex,
              }}
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.2,
                delay: img.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <motion.div
                className={`relative overflow-hidden ${variantStyles[img.variant]}`}
                style={{
                  aspectRatio: img.aspectRatio,
                  transform: `rotate(${img.rotation}deg)`,
                }}
                whileHover={{
                  scale: 1.03,
                  rotate: img.rotation * 0.5,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
                }}
              >
                {/* Image placeholder with label */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center ${variantTextStyles[img.variant]}`}>
                  <span className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] opacity-60">
                    {img.label}
                  </span>
                </div>

                {/* Subtle border */}
                <div className="absolute inset-0 border border-current opacity-[0.08]" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-yon-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>

              {/* Image index - editorial style */}
              <span className={`absolute -bottom-5 left-0 font-mono text-[9px] tracking-wider ${variantTextStyles[img.variant]} opacity-40`}>
                {String(img.id).padStart(2, '0')}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicator - Refined */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          style={{ opacity: heroOpacity }}
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="w-px h-16 bg-gradient-to-b from-yon-grey to-transparent origin-top"
              animate={{ scaleY: [1, 0.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="font-mono text-[9px] text-yon-grey/60 tracking-[0.25em] uppercase">
              Scroll
            </span>
          </div>
        </motion.div>

        {/* Corner decoration */}
        <motion.div
          className="absolute top-8 right-8 md:top-12 md:right-12 font-mono text-[10px] text-yon-grey/40 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          EST. 2024
        </motion.div>
      </section>

      {/* ============================================
          BRAND PHILOSOPHY - Editorial Statement
          ============================================ */}
      <section className="relative py-32 md:py-48 lg:py-56 px-6 md:px-12 lg:px-16 bg-yon-ivory overflow-hidden">
        {/* Decorative background number */}
        <span className="absolute top-1/2 -translate-y-1/2 -right-[10%] font-mono text-[40vw] md:text-[30vw] text-yon-platinum/20 leading-none select-none pointer-events-none">
          01
        </span>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            {/* Left column - Label */}
            <motion.div
              className="md:col-span-3"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-yon-grey" />
                <span className="font-mono text-[10px] text-yon-grey tracking-[0.2em] uppercase">
                  Philosophy
                </span>
              </div>
              <span className="font-mono text-[10px] text-yon-grey/50 tracking-wider">
                001
              </span>
            </motion.div>

            {/* Right column - Content */}
            <motion.div
              className="md:col-span-8 md:col-start-5 relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1 }}
            >
              {/* Decorative quote mark */}
              <span className="absolute -top-12 -left-8 md:-left-16 font-serif text-[120px] md:text-[180px] text-yon-platinum/30 leading-none select-none pointer-events-none">
                "
              </span>

              <motion.h2
                className="relative font-serif text-[8vw] md:text-[4.5vw] lg:text-[3.5vw] leading-[1.1] text-yon-black"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="block">Twisted</span>
                <span className="block ml-[5%]">yet harmonious</span>
              </motion.h2>

              <motion.p
                className="mt-10 md:mt-14 text-base md:text-lg text-yon-steel leading-[1.8] max-w-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                THE YON exists where structure dissolves and reform begins.
                A world beyond conventional fashion — elusive, unreachable, yet undeniably present.
              </motion.p>

              <motion.p
                className="mt-6 text-sm text-yon-grey leading-[1.8] max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                손에 잡히지 않는, 도달하기 어려운 이상적인 아름다움을 추구합니다.
              </motion.p>

              <motion.div
                className="mt-12 md:mt-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.35 }}
              >
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-4 font-mono text-xs tracking-[0.15em] uppercase text-yon-black"
                >
                  <span className="relative pb-1">
                    <span className="relative z-10">Discover the World</span>
                    <span className="absolute bottom-0 left-0 w-full h-px bg-yon-black origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    <span className="absolute bottom-0 left-0 w-full h-px bg-yon-accent origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100" />
                  </span>
                  <span className="transform group-hover:translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    →
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          COLLECTIONS PREVIEW - Editorial Grid
          ============================================ */}
      <section className="relative py-32 md:py-48 lg:py-56 px-6 md:px-12 lg:px-16 bg-yon-white overflow-hidden">
        {/* Decorative background number */}
        <span className="absolute top-20 -left-[5%] font-mono text-[35vw] md:text-[25vw] text-yon-platinum/10 leading-none select-none pointer-events-none">
          02
        </span>

        <div className="max-w-7xl mx-auto">
          {/* Section Header - Editorial style */}
          <motion.div
            className="mb-20 md:mb-28 grid md:grid-cols-12 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-yon-grey" />
                <span className="font-mono text-[10px] text-yon-grey tracking-[0.2em] uppercase">
                  The Showroom
                </span>
              </div>
              <h2 className="font-serif text-[10vw] md:text-[5vw] lg:text-[4vw] text-yon-black leading-[0.9]">
                Collec
                <br />
                tions
              </h2>
            </div>
            <div className="md:col-span-5 md:col-start-7 md:pt-8">
              <p className="text-sm md:text-base text-yon-steel leading-[1.8]">
                Each piece exists at the intersection of chaos and order.
                Welcome to THE YON's evolving archive of experimental forms.
              </p>
            </div>
          </motion.div>

          {/* Collection Cards - Asymmetric editorial grid */}
          <div className="relative">
            {collections.map((collection, index) => {
              const configs = [
                {
                  wrapper: 'md:w-[65%] md:ml-0',
                  aspectRatio: 'aspect-[4/5]',
                  rotation: -1.5,
                  size: 'xl',
                  entryX: -50,
                  marginTop: '',
                },
                {
                  wrapper: 'md:w-[45%] md:ml-auto',
                  aspectRatio: 'aspect-[3/4]',
                  rotation: 2,
                  size: 'lg',
                  entryX: 50,
                  marginTop: 'md:-mt-40',
                },
                {
                  wrapper: 'md:w-[38%] md:ml-[10%]',
                  aspectRatio: 'aspect-[1/1]',
                  rotation: -0.5,
                  size: 'md',
                  entryX: 0,
                  marginTop: 'md:-mt-24',
                },
              ]
              const config = configs[index % configs.length]
              const bgVariants = ['bg-yon-charcoal', 'bg-yon-platinum', 'bg-yon-silver']
              const textVariants = ['text-yon-silver', 'text-yon-grey', 'text-yon-graphite']

              return (
                <motion.div
                  key={collection.id}
                  className={`mb-16 md:mb-0 ${config.wrapper} ${config.marginTop}`}
                  initial={{ opacity: 0, x: config.entryX, y: 60 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{
                    duration: 1,
                    delay: 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="group block outline-none"
                  >
                    <motion.div
                      className={`relative ${config.aspectRatio} ${bgVariants[index % 3]} overflow-hidden`}
                      style={{ transform: `rotate(${config.rotation}deg)` }}
                      whileHover={{
                        scale: 1.02,
                        rotate: config.rotation * 0.3,
                        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
                      }}
                    >
                      {/* Image placeholder */}
                      <div className={`absolute inset-0 flex flex-col items-center justify-center ${textVariants[index % 3]}`}>
                        <span className="font-mono text-[10px] tracking-[0.2em] opacity-50">
                          {collection.title}
                        </span>
                      </div>

                      {/* Subtle border */}
                      <div className="absolute inset-0 border border-current opacity-[0.05]" />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-yon-black/0 group-hover:bg-yon-black/5 transition-colors duration-700" />

                      {/* Index - Top left */}
                      <div className="absolute top-5 left-5 md:top-6 md:left-6">
                        <span className={`font-mono text-[10px] tracking-wider ${textVariants[index % 3]} opacity-60`}>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Season - Bottom right */}
                      <div className="absolute bottom-5 right-5 md:bottom-6 md:right-6">
                        <span className={`font-mono text-[9px] tracking-[0.15em] uppercase ${textVariants[index % 3]} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}>
                          {collection.season}
                        </span>
                      </div>

                      {/* View indicator */}
                      <div className="absolute bottom-5 left-5 md:bottom-6 md:left-6 overflow-hidden">
                        <span className={`block font-mono text-[9px] tracking-[0.1em] uppercase ${textVariants[index % 3]} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}>
                          Enter →
                        </span>
                      </div>
                    </motion.div>

                    {/* Info - Below card */}
                    <div className="mt-6 md:mt-8 flex justify-between items-start">
                      <div className="max-w-md">
                        <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-yon-black group-hover:text-yon-accent transition-colors duration-500">
                          {collection.title}
                        </h3>
                        <p className="mt-3 text-sm text-yon-steel leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-xs">
                          {collection.description}
                        </p>
                      </div>
                      <span className="font-mono text-[10px] text-yon-grey/50 tracking-wider mt-1">
                        {collection.season}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* View All Link - Minimal */}
          <motion.div
            className="mt-24 md:mt-32 flex justify-end"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href="/collections"
              className="group inline-flex items-center gap-4 font-mono text-xs tracking-[0.15em] uppercase text-yon-black"
            >
              <span className="relative pb-1">
                <span className="relative z-10">Enter the Showroom</span>
                <span className="absolute bottom-0 left-0 w-full h-px bg-yon-black origin-left scale-x-100 group-hover:scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="absolute bottom-0 left-0 w-full h-px bg-yon-accent origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100" />
              </span>
              <span className="transform group-hover:translate-x-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
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
