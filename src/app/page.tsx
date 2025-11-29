'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

// Collection data
const collections = [
  { id: 1, title: 'DECONSTRUCTION', season: 'FW 2025', slug: 'deconstruction' },
  { id: 2, title: 'FRAGMENTS', season: 'SS 2025', slug: 'fragments' },
  { id: 3, title: 'VOID', season: 'FW 2024', slug: 'void' },
]

// Hero image configurations - Faerie style scattered layout
const heroImages = [
  {
    id: 1,
    // Top left - partially off-screen, largest
    position: 'top-[-5%] left-[-8%] md:top-[2%] md:left-[-5%]',
    size: 'w-[45vw] md:w-[38vw] max-w-[480px]',
    rotation: -3,
    zIndex: 1,
    parallaxSpeed: 0.15,
    variant: 'light' as const,
    aspectRatio: '3/4' as const,
    delay: 0.2,
    initialDirection: { x: -80, y: 0 },
  },
  {
    id: 2,
    // Center right - overlapping with first
    position: 'top-[18%] right-[5%] md:top-[12%] md:right-[8%]',
    size: 'w-[35vw] md:w-[28vw] max-w-[380px]',
    rotation: 2.5,
    zIndex: 3,
    parallaxSpeed: 0.35,
    variant: 'medium' as const,
    aspectRatio: '4/5' as const,
    delay: 0.35,
    initialDirection: { x: 60, y: -40 },
  },
  {
    id: 3,
    // Center - main focal point
    position: 'top-[38%] left-[20%] md:top-[35%] md:left-[28%]',
    size: 'w-[32vw] md:w-[25vw] max-w-[340px]',
    rotation: -1.5,
    zIndex: 4,
    parallaxSpeed: 0.5,
    variant: 'dark' as const,
    aspectRatio: '3/4' as const,
    delay: 0.5,
    initialDirection: { x: 0, y: 60 },
  },
  {
    id: 4,
    // Small overlay on center image
    position: 'top-[48%] left-[38%] md:top-[42%] md:left-[45%]',
    size: 'w-[18vw] md:w-[14vw] max-w-[180px]',
    rotation: 4,
    zIndex: 5,
    parallaxSpeed: 0.7,
    variant: 'light' as const,
    aspectRatio: '1/1' as const,
    delay: 0.65,
    initialDirection: { x: 40, y: 40 },
  },
  {
    id: 5,
    // Bottom right - cut off at edge
    position: 'top-[58%] right-[-3%] md:top-[55%] md:right-[-2%]',
    size: 'w-[28vw] md:w-[22vw] max-w-[300px]',
    rotation: -2,
    zIndex: 2,
    parallaxSpeed: 0.25,
    variant: 'medium' as const,
    aspectRatio: '4/5' as const,
    delay: 0.8,
    initialDirection: { x: 80, y: 0 },
  },
  {
    id: 6,
    // Bottom left corner
    position: 'top-[72%] left-[5%] md:top-[68%] md:left-[8%]',
    size: 'w-[22vw] md:w-[18vw] max-w-[240px]',
    rotation: 2,
    zIndex: 2,
    parallaxSpeed: 0.2,
    variant: 'dark' as const,
    aspectRatio: '3/4' as const,
    delay: 0.95,
    initialDirection: { x: -60, y: 40 },
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
    useTransform(scrollYProgress, [0, 1], [0, -300 * img.parallaxSpeed])
  )

  // Hero section opacity fade
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -100])

  return (
    <div ref={containerRef} className="relative">
      {/* ============================================
          HERO SECTION - Faerie Style Scattered Layout
          ============================================ */}
      <section className="relative h-[180vh] md:h-[200vh] overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-yon-ivory via-yon-white to-yon-ivory" />

        {/* Scattered Images */}
        <div className="absolute inset-0">
          {heroImages.map((img, index) => (
            <motion.div
              key={img.id}
              className={`absolute ${img.position} ${img.size}`}
              style={{
                y: parallaxY[index],
                zIndex: img.zIndex,
              }}
              initial={{
                opacity: 0,
                x: img.initialDirection.x,
                y: img.initialDirection.y,
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
              }}
              transition={{
                duration: 1.2,
                delay: img.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div
                className={`relative overflow-hidden shadow-lg ${variantStyles[img.variant]}`}
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

        {/* Brand Title - Floating between images */}
        <motion.div
          className="absolute top-[25%] left-[8%] md:top-[22%] md:left-[12%] z-10 mix-blend-difference"
          style={{ y: titleY, opacity: heroOpacity }}
        >
          <motion.h1
            className="font-serif text-[15vw] md:text-[12vw] lg:text-[10vw] leading-[0.85] tracking-tight text-white"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block transform rotate-[-1.5deg]">THE</span>
            <span className="block transform rotate-[0.8deg] ml-[5vw] md:ml-[3vw]">YON</span>
          </motion.h1>
        </motion.div>

        {/* Tagline - Bottom of hero */}
        <motion.div
          className="absolute bottom-[25%] right-[8%] md:bottom-[20%] md:right-[12%] z-10"
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <p className="font-mono text-xs md:text-sm text-yon-grey tracking-[0.3em] uppercase text-right">
            Beyond<br />the horizon
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
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
      <section className="relative min-h-screen flex items-center py-32 md:py-48 px-6 md:px-12 bg-yon-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-20%' }}
            transition={{ duration: 1 }}
          >
            {/* Decorative number */}
            <span className="absolute -top-8 -left-4 md:-left-8 font-mono text-[120px] md:text-[200px] text-yon-platinum/50 leading-none select-none pointer-events-none">
              01
            </span>

            <motion.h2
              className="relative font-serif text-[8vw] md:text-[5vw] lg:text-[4vw] leading-[1.1] text-yon-black"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="block transform rotate-[-0.5deg]">Twisted</span>
              <span className="block transform rotate-[0.3deg] ml-[10%]">yet harmonious</span>
            </motion.h2>

            <motion.p
              className="mt-12 md:mt-16 text-lg md:text-xl lg:text-2xl text-yon-steel leading-relaxed max-w-2xl ml-[5%] md:ml-[15%]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              Every element is slightly askew, yet together they form perfect beauty.
              Fashion that transcends time and space. The pursuit of an ideal beyond reach.
            </motion.p>

            <motion.div
              className="mt-16 md:mt-24 ml-[5%] md:ml-[15%]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <span className="font-mono text-xs text-yon-grey tracking-[0.2em] uppercase">
                Experimental Fashion Portfolio
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          COLLECTIONS PREVIEW - Asymmetric Scattered
          ============================================ */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 bg-yon-ivory">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="mb-20 md:mb-32"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-xs text-yon-grey tracking-[0.2em] uppercase">
              Latest Work
            </span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl lg:text-6xl text-yon-black transform rotate-[-0.5deg]">
              Collections
            </h2>
          </motion.div>

          {/* Scattered Collection Cards */}
          <div className="relative">
            {collections.map((collection, index) => {
              const configs = [
                {
                  wrapper: 'md:w-[65%] md:ml-0',
                  rotation: -1.5,
                  marginTop: 0,
                },
                {
                  wrapper: 'md:w-[50%] md:ml-auto md:-mt-24',
                  rotation: 2,
                  marginTop: -96,
                },
                {
                  wrapper: 'md:w-[55%] md:ml-[15%] md:-mt-16',
                  rotation: -0.8,
                  marginTop: -64,
                },
              ]
              const config = configs[index % configs.length]

              return (
                <motion.div
                  key={collection.id}
                  className={`mb-12 md:mb-0 ${config.wrapper}`}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.9,
                    delay: index * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link href={`/collections/${collection.slug}`} className="group block">
                    <div
                      className="relative aspect-[4/5] bg-yon-platinum overflow-hidden transition-all duration-700 ease-out group-hover:shadow-2xl"
                      style={{ transform: `rotate(${config.rotation}deg)` }}
                    >
                      {/* Placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono text-sm text-yon-grey tracking-widest">
                          {collection.title}
                        </span>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-yon-black/0 transition-colors duration-500 group-hover:bg-yon-black/5" />

                      {/* Index */}
                      <span className="absolute top-6 left-6 font-mono text-xs text-yon-grey">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="mt-6 md:mt-8 flex justify-between items-end">
                      <div>
                        <h3 className="font-serif text-2xl md:text-3xl text-yon-black group-hover:text-yon-accent transition-colors duration-300">
                          {collection.title}
                        </h3>
                        <p className="mt-2 font-mono text-xs text-yon-grey tracking-wider">
                          {collection.season}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-yon-grey opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                        VIEW →
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* View All */}
          <motion.div
            className="mt-20 md:mt-32 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              href="/collections"
              className="inline-block font-mono text-sm text-yon-black border-b border-yon-black pb-1 hover:text-yon-accent hover:border-yon-accent transition-colors duration-300"
            >
              View All Collections
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="py-20 md:py-32 px-6 md:px-12 bg-yon-white border-t border-yon-platinum">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Brand */}
            <div className="md:col-span-6">
              <Link href="/" className="inline-block">
                <span className="font-serif text-4xl md:text-5xl text-yon-black">THE YON</span>
              </Link>
              <p className="mt-6 text-base text-yon-steel max-w-md leading-relaxed">
                Experimental fashion that transcends time and space.
                Every element twisted, yet perfectly harmonious.
              </p>
            </div>

            {/* Navigation */}
            <div className="md:col-span-3">
              <h4 className="font-mono text-xs text-yon-grey tracking-[0.2em] uppercase mb-6">
                Navigate
              </h4>
              <ul className="space-y-3">
                {['Collections', 'Process', 'About', 'Contact'].map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase()}`}
                      className="text-base text-yon-steel hover:text-yon-black transition-colors duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div className="md:col-span-3">
              <h4 className="font-mono text-xs text-yon-grey tracking-[0.2em] uppercase mb-6">
                Connect
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:hello@theyon.com"
                    className="text-base text-yon-steel hover:text-yon-black transition-colors duration-300"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/theyon_studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-yon-steel hover:text-yon-black transition-colors duration-300"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-20 pt-8 border-t border-yon-platinum flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-xs text-yon-grey">
              © {new Date().getFullYear()} THE YON. All rights reserved.
            </p>
            <p className="font-mono text-xs text-yon-grey">
              Designed & Crafted by Taehyun Lee
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
