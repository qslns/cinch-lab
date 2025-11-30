'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ImagePlaceholder } from './ImagePlaceholder'

function AnimatedText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {text}
    </motion.span>
  )
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -80])
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center pb-16 md:pb-20 overflow-hidden"
    >
      {/* Subtle grain texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

      <motion.div
        className="relative z-10 px-6 md:px-8 lg:px-12"
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            {/* Left - Title Area */}
            <div className="lg:col-span-7">
              {/* Tagline */}
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <span className="w-8 h-px bg-yon-grey" />
                <span className="font-mono text-[10px] text-yon-steel tracking-[0.2em] uppercase">
                  Experimental Fashion Portfolio
                </span>
              </motion.div>

              {/* Main Title */}
              <h1 className="font-serif text-[15vw] md:text-[12vw] lg:text-[9vw] leading-[0.85] tracking-[-0.02em] text-yon-black overflow-hidden">
                <AnimatedText text="THE" className="block" delay={0.2} />
                <AnimatedText text="YON" className="block ml-[5%]" delay={0.35} />
              </h1>

              {/* Subtitle */}
              <motion.div
                className="mt-8 md:mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <p className="font-mono text-xs md:text-sm text-yon-steel tracking-[0.15em] uppercase">
                  Beyond — 저 너머
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <span className="font-mono text-[10px] text-yon-grey tracking-[0.1em]">
                    AW25 — SS25
                  </span>
                  <span className="w-8 h-px bg-yon-grey/30" />
                  <span className="font-mono text-[10px] text-yon-grey/60 tracking-wider">
                    Seoul / Tokyo
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right - Description */}
            <motion.div
              className="lg:col-span-5 lg:pb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <p className="text-base md:text-lg text-yon-steel leading-[1.7] max-w-md">
                Fashion that transcends time and space. Every element twisted, yet perfectly harmonious.
              </p>
              <p className="mt-4 text-sm text-yon-grey leading-[1.7]">
                뒤틀렸지만 조화로운 — 실험적 패션의 경계를 탐구합니다.
              </p>

              {/* CTA Buttons */}
              <motion.div
                className="mt-8 flex flex-wrap items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Link
                  href="/collections"
                  className="group inline-flex items-center gap-3 px-6 py-3 bg-yon-black text-yon-white font-mono text-[10px] tracking-[0.12em] uppercase hover:bg-yon-charcoal transition-colors"
                >
                  <span>View Collections</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.12em] uppercase text-yon-steel hover:text-yon-black transition-colors"
                >
                  <span>About</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Featured Images Grid */}
          <motion.div
            className="mt-16 md:mt-24 grid grid-cols-3 gap-4 md:gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <ImagePlaceholder label="LOOK 01" variant="dark" aspectRatio="3/4" />
            <div className="mt-8">
              <ImagePlaceholder label="LOOK 02" variant="medium" aspectRatio="4/5" />
            </div>
            <ImagePlaceholder label="DETAIL" variant="light" aspectRatio="1/1" />
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
            className="w-px h-12 bg-gradient-to-b from-yon-grey/40 to-transparent origin-top"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <span className="font-mono text-[8px] text-yon-grey/50 tracking-[0.2em] uppercase">
            Scroll
          </span>
        </div>
      </motion.div>
    </section>
  )
}
