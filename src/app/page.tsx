'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import Footer from '@/components/Footer'

// Collection data
const collections = [
  {
    id: 1,
    title: 'DECONSTRUCTION',
    season: 'AW25',
    slug: 'deconstruction',
    description: 'Pattern deconstruction through experimental tailoring techniques'
  },
  {
    id: 2,
    title: 'FRAGMENTS',
    season: 'SS25',
    slug: 'fragments',
    description: 'Hybrid material construction with contrasting textures'
  },
  {
    id: 3,
    title: 'VOID',
    season: 'AW24',
    slug: 'void',
    description: 'Architectural volume exploration'
  },
]

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -50])

  return (
    <div ref={containerRef} className="relative bg-yon-white">
      {/* ============================================
          HERO SECTION - Clean, readable layout
          ============================================ */}
      <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center pb-16 md:pb-20 overflow-hidden">
        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        <motion.div
          className="relative z-10 px-6 md:px-8 lg:px-12"
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <div className="max-w-6xl mx-auto">
            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              {/* Left - Title Area */}
              <div className="lg:col-span-7">
                {/* Tagline */}
                <motion.div
                  className="flex items-center gap-3 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <span className="w-8 h-px bg-yon-grey" />
                  <span className="font-mono text-[10px] text-yon-steel tracking-[0.2em] uppercase">
                    Experimental Fashion Portfolio
                  </span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                  className="font-serif text-[15vw] md:text-[12vw] lg:text-[9vw] leading-[0.85] tracking-[-0.02em] text-yon-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    THE
                  </motion.span>
                  <motion.span
                    className="block ml-[5%]"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    YON
                  </motion.span>
                </motion.h1>

                {/* Subtitle */}
                <motion.div
                  className="mt-8 md:mt-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <p className="font-mono text-xs md:text-sm text-yon-steel tracking-[0.15em] uppercase">
                    Beyond — 저 너머
                  </p>
                  <p className="mt-3 font-mono text-[10px] text-yon-grey tracking-[0.1em]">
                    AW25 — SS25 Collection
                  </p>
                </motion.div>
              </div>

              {/* Right - Description */}
              <motion.div
                className="lg:col-span-5 lg:pb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <p className="text-base md:text-lg text-yon-steel leading-[1.7] max-w-md">
                  Fashion that transcends time and space. Every element twisted, yet perfectly harmonious.
                </p>
                <p className="mt-4 text-sm text-yon-grey leading-[1.7]">
                  뒤틀렸지만 조화로운 — 실험적 패션의 경계를 탐구합니다.
                </p>

                {/* CTA */}
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <Link
                    href="/collections"
                    className="group inline-flex items-center gap-3 font-mono text-xs tracking-[0.12em] uppercase text-yon-black hover:text-yon-accent transition-colors"
                  >
                    <span>View Collections</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Featured Images - Below title, no overlap */}
            <motion.div
              className="mt-16 md:mt-24 grid grid-cols-3 gap-4 md:gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                { label: 'LOOK 01', variant: 'bg-yon-charcoal', aspect: 'aspect-[3/4]' },
                { label: 'LOOK 02', variant: 'bg-yon-platinum', aspect: 'aspect-[4/5]', offset: 'mt-8' },
                { label: 'DETAIL', variant: 'bg-yon-silver', aspect: 'aspect-square' },
              ].map((item, index) => (
                <div key={index} className={`${item.offset || ''}`}>
                  <div className={`relative ${item.aspect} ${item.variant} overflow-hidden group`}>
                    <div className={`absolute inset-0 flex items-center justify-center ${item.variant === 'bg-yon-charcoal' ? 'text-yon-silver' : 'text-yon-grey'}`}>
                      <span className="font-mono text-[9px] md:text-[10px] tracking-[0.15em] opacity-50">
                        {item.label}
                      </span>
                    </div>
                    <div className="absolute inset-0 border border-current opacity-[0.06]" />
                  </div>
                  <span className="block mt-2 font-mono text-[9px] text-yon-grey/50 tracking-wider">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <div className="flex flex-col items-center gap-3">
            <motion.div
              className="w-px h-10 bg-gradient-to-b from-yon-grey/40 to-transparent origin-top"
              animate={{ scaleY: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="font-mono text-[8px] text-yon-grey/50 tracking-[0.2em] uppercase">
              Scroll
            </span>
          </div>
        </motion.div>
      </section>

      {/* ============================================
          PHILOSOPHY SECTION
          ============================================ */}
      <section className="relative py-24 md:py-32 lg:py-40 px-6 md:px-8 lg:px-12 bg-yon-ivory">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            {/* Label */}
            <motion.div
              className="md:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-6 h-px bg-yon-grey" />
                <span className="font-mono text-[10px] text-yon-grey tracking-[0.15em] uppercase">
                  Philosophy
                </span>
              </div>
              <span className="font-mono text-[10px] text-yon-grey/40 tracking-wider">
                001
              </span>
            </motion.div>

            {/* Content */}
            <motion.div
              className="md:col-span-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] text-yon-black">
                Twisted yet harmonious
              </h2>

              <p className="mt-8 text-base md:text-lg text-yon-steel leading-[1.8] max-w-xl">
                Every element is slightly askew, yet together they form perfect beauty.
                Fashion that transcends time and space — the pursuit of an ideal beyond reach.
              </p>

              <p className="mt-5 text-sm text-yon-grey leading-[1.7]">
                모든 요소가 약간씩 어긋나 있지만, 전체적으로는 하나의 아름다운 구성을 이룹니다.
              </p>

              <div className="mt-10">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 font-mono text-xs tracking-[0.12em] uppercase text-yon-black hover:text-yon-accent transition-colors"
                >
                  <span>About the Designer</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          COLLECTIONS SECTION
          ============================================ */}
      <section className="relative py-24 md:py-32 lg:py-40 px-6 md:px-8 lg:px-12 bg-yon-white">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="mb-16 md:mb-20 grid md:grid-cols-12 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-6 h-px bg-yon-grey" />
                <span className="font-mono text-[10px] text-yon-grey tracking-[0.15em] uppercase">
                  Featured Work
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-yon-black leading-[1.1]">
                Collections
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="text-sm md:text-base text-yon-steel leading-[1.7]">
                Each collection is an experiment — a question posed to fabric, form, and tradition.
              </p>
            </div>
          </motion.div>

          {/* Collection Grid - Clean, readable */}
          <div className="space-y-16 md:space-y-24">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Link
                  href={`/collections/${collection.slug}`}
                  className="group block"
                >
                  <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
                    {/* Image */}
                    <div className={`md:col-span-7 ${index % 2 === 1 ? 'md:col-start-6 md:order-2' : ''}`}>
                      <div className="relative aspect-[4/5] bg-yon-charcoal overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-yon-silver">
                          <span className="font-mono text-[10px] tracking-[0.2em] opacity-40">
                            {collection.title}
                          </span>
                        </div>
                        <div className="absolute inset-0 border border-yon-silver/10" />

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-yon-black/0 group-hover:bg-yon-black/10 transition-colors duration-500" />

                        {/* Index */}
                        <div className="absolute top-4 left-4 md:top-6 md:left-6">
                          <span className="font-mono text-[10px] text-yon-silver/60 tracking-wider">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        {/* View indicator */}
                        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                          <span className="font-mono text-[9px] text-yon-silver tracking-[0.1em] uppercase opacity-0 group-hover:opacity-60 transition-opacity duration-300">
                            View Project →
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className={`md:col-span-4 ${index % 2 === 1 ? 'md:col-start-1 md:order-1' : ''} md:py-8`}>
                      <span className="font-mono text-[10px] text-yon-grey tracking-[0.12em] uppercase">
                        {collection.season}
                      </span>
                      <h3 className="mt-3 font-serif text-2xl md:text-3xl text-yon-black group-hover:text-yon-accent transition-colors duration-300">
                        {collection.title}
                      </h3>
                      <p className="mt-4 text-sm text-yon-steel leading-[1.7]">
                        {collection.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All */}
          <motion.div
            className="mt-20 md:mt-24 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/collections"
              className="group inline-flex items-center gap-3 font-mono text-xs tracking-[0.12em] uppercase text-yon-black hover:text-yon-accent transition-colors"
            >
              <span>All Collections</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          ARCHIVE PREVIEW
          ============================================ */}
      <section className="relative py-24 md:py-32 px-6 md:px-8 lg:px-12 bg-yon-charcoal text-yon-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-yon-silver/50" />
                <span className="font-mono text-[10px] text-yon-silver/70 tracking-[0.15em] uppercase">
                  Process
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl leading-[1.15]">
                The Archive
              </h2>
              <p className="mt-6 text-base text-yon-silver leading-[1.7]">
                Explore the research, experiments, and documentation behind each collection.
                The process is as important as the outcome.
              </p>
              <div className="mt-8">
                <Link
                  href="/archive"
                  className="group inline-flex items-center gap-3 font-mono text-xs tracking-[0.12em] uppercase text-yon-white hover:text-yon-platinum transition-colors"
                >
                  <span>Enter Archive</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-square bg-yon-graphite flex items-center justify-center">
                <span className="font-mono text-[9px] text-yon-silver/40 tracking-wider">AW25-001</span>
              </div>
              <div className="aspect-[3/4] bg-yon-graphite flex items-center justify-center mt-6">
                <span className="font-mono text-[9px] text-yon-silver/40 tracking-wider">SS25-002</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
