'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

// Placeholder collections - replace with actual THE YON data
const collections = [
  { id: 1, title: 'DECONSTRUCTION', season: 'FW 2025', slug: 'deconstruction' },
  { id: 2, title: 'FRAGMENTS', season: 'SS 2025', slug: 'fragments' },
  { id: 3, title: 'VOID', season: 'FW 2024', slug: 'void' },
]

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Parallax transforms for hero images
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -250])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -100])

  // Opacity transforms for sections
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <div ref={containerRef} className="relative">
      {/* ============================================
          HERO SECTION - Free-form image layout
          ============================================ */}
      <section className="relative min-h-[120vh] overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-yon-ivory to-yon-white" />

        {/* Brand Name - Asymmetric position */}
        <motion.div
          className="absolute top-[15%] left-[8%] md:left-[12%] z-10"
          style={{ opacity: heroOpacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-serif text-hero tracking-tight text-yon-black">
            <span className="block transform rotate-[-1deg]">THE</span>
            <span className="block transform rotate-[0.5deg] ml-4 md:ml-8">YON</span>
          </h1>
          <p className="mt-6 md:mt-8 font-mono text-xs md:text-sm text-yon-grey tracking-wider uppercase">
            Beyond the horizon
          </p>
        </motion.div>

        {/* Free-form Image Layout */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Image 1 - Large, top right */}
          <motion.div
            className="absolute top-[10%] right-[5%] md:right-[10%] w-[35vw] md:w-[28vw] max-w-[400px]"
            style={{ y: y1 }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[3/4] bg-yon-platinum transform rotate-[2deg] overflow-hidden shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center text-yon-grey font-mono text-xs">
                IMAGE 01
              </div>
            </div>
          </motion.div>

          {/* Image 2 - Medium, center-left */}
          <motion.div
            className="absolute top-[35%] left-[15%] md:left-[25%] w-[30vw] md:w-[22vw] max-w-[320px]"
            style={{ y: y2 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[3/4] bg-yon-silver transform rotate-[-1.5deg] overflow-hidden shadow-md">
              <div className="absolute inset-0 flex items-center justify-center text-yon-grey font-mono text-xs">
                IMAGE 02
              </div>
            </div>
          </motion.div>

          {/* Image 3 - Small, bottom right */}
          <motion.div
            className="absolute top-[55%] right-[15%] md:right-[20%] w-[25vw] md:w-[18vw] max-w-[260px]"
            style={{ y: y3 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[3/4] bg-yon-grey transform rotate-[1deg] overflow-hidden shadow-sm">
              <div className="absolute inset-0 flex items-center justify-center text-yon-platinum font-mono text-xs">
                IMAGE 03
              </div>
            </div>
          </motion.div>

          {/* Image 4 - Extra small, bottom left */}
          <motion.div
            className="absolute top-[70%] left-[8%] md:left-[12%] w-[20vw] md:w-[15vw] max-w-[220px]"
            style={{ y: y4 }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[4/5] bg-yon-charcoal transform rotate-[-2deg] overflow-hidden shadow-lg">
              <div className="absolute inset-0 flex items-center justify-center text-yon-silver font-mono text-xs">
                IMAGE 04
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-[1px] h-16 bg-yon-grey"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* ============================================
          BRAND STATEMENT
          ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-32">
        <motion.div
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            className="font-serif text-title md:text-display leading-tight text-yon-black transform rotate-[-0.5deg]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            Twisted yet harmonious
          </motion.h2>
          <motion.p
            className="mt-8 md:mt-12 text-body-lg md:text-subheading text-yon-steel leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Every element is slightly askew, yet together they form perfect beauty.
            Fashion that transcends time and space. The pursuit of an ideal beyond reach.
          </motion.p>
          <motion.div
            className="mt-12 md:mt-16 font-mono text-micro text-yon-grey tracking-widest uppercase"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experimental Fashion Portfolio
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================
          COLLECTIONS PREVIEW
          ============================================ */}
      <section className="relative py-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            className="mb-16 md:mb-24"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-micro text-yon-grey tracking-widest uppercase">
              Latest Work
            </span>
            <h2 className="mt-4 font-serif text-heading md:text-title text-yon-black transform rotate-[-0.3deg]">
              Collections
            </h2>
          </motion.div>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-12 gap-4 md:gap-8">
            {collections.map((collection, index) => {
              const colSpans = ['col-span-12 md:col-span-7', 'col-span-12 md:col-span-5', 'col-span-12 md:col-span-6']
              const rotations = ['rotate-[-1deg]', 'rotate-[1.5deg]', 'rotate-[-0.5deg]']
              const marginTops = ['mt-0', 'mt-0 md:mt-16', 'mt-0 md:-mt-8']

              return (
                <motion.div
                  key={collection.id}
                  className={`${colSpans[index]} ${marginTops[index]}`}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={`/collections/${collection.slug}`} className="group block">
                    <div className={`relative aspect-[4/5] bg-yon-platinum overflow-hidden transform ${rotations[index]} transition-transform duration-500 ease-out-expo group-hover:rotate-0 group-hover:scale-[1.02]`}>
                      {/* Placeholder for image */}
                      <div className="absolute inset-0 flex items-center justify-center text-yon-grey font-mono text-sm">
                        {collection.title}
                      </div>
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-yon-black/0 transition-colors duration-500 group-hover:bg-yon-black/10" />
                    </div>
                    <div className="mt-4 md:mt-6 flex justify-between items-end">
                      <div>
                        <h3 className="font-serif text-xl md:text-2xl text-yon-black group-hover:text-yon-accent transition-colors duration-300">
                          {collection.title}
                        </h3>
                        <p className="mt-1 font-mono text-xs text-yon-grey">
                          {collection.season}
                        </p>
                      </div>
                      <motion.span
                        className="font-mono text-xs text-yon-grey opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      >
                        VIEW →
                      </motion.span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* View all link */}
          <motion.div
            className="mt-16 md:mt-24 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Link
              href="/collections"
              className="inline-block font-mono text-sm text-yon-black hover:text-yon-accent transition-colors duration-300 border-b border-yon-black hover:border-yon-accent pb-1"
            >
              View All Collections
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="py-16 md:py-24 px-6 md:px-12 border-t border-yon-platinum">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            {/* Left - Brand */}
            <div>
              <Link href="/" className="inline-block">
                <span className="font-serif text-3xl md:text-4xl text-yon-black">THE YON</span>
              </Link>
              <p className="mt-6 text-body text-yon-grey max-w-sm">
                Experimental fashion that transcends time and space.
                Every element twisted, yet perfectly harmonious.
              </p>
            </div>

            {/* Right - Links */}
            <div className="flex flex-col md:flex-row md:justify-end gap-12 md:gap-24">
              <div>
                <h4 className="font-mono text-micro text-yon-grey tracking-widest uppercase mb-4">Navigate</h4>
                <ul className="space-y-2">
                  {['Collections', 'Process', 'About', 'Contact'].map((item) => (
                    <li key={item}>
                      <Link
                        href={`/${item.toLowerCase()}`}
                        className="text-body text-yon-steel hover:text-yon-black transition-colors duration-300"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-micro text-yon-grey tracking-widest uppercase mb-4">Connect</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="mailto:hello@theyon.com"
                      className="text-body text-yon-steel hover:text-yon-black transition-colors duration-300"
                    >
                      Email
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com/theyon_studio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body text-yon-steel hover:text-yon-black transition-colors duration-300"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-16 pt-8 border-t border-yon-platinum flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-micro text-yon-grey">
              © {new Date().getFullYear()} THE YON. All rights reserved.
            </p>
            <p className="font-mono text-micro text-yon-grey">
              Designed & Crafted by Taehyun Lee
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
