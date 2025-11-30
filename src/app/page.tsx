'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Footer from '@/components/Footer'

// Collection data with more details
const collections = [
  {
    id: 1,
    title: 'DECONSTRUCTION',
    season: 'AW25',
    year: '2025',
    slug: 'deconstruction',
    description: 'Pattern deconstruction through experimental tailoring techniques. Every seam exposed, every structure questioned.',
    techniques: ['Raw Edge', 'Inverted Seams', 'Visible Interfacing'],
    status: 'In Progress',
  },
  {
    id: 2,
    title: 'FRAGMENTS',
    season: 'SS25',
    year: '2025',
    slug: 'fragments',
    description: 'Hybrid material construction with contrasting textures. Beauty in the broken pieces.',
    techniques: ['Material Splicing', 'Surface Manipulation'],
    status: 'Testing',
  },
  {
    id: 3,
    title: 'VOID',
    season: 'AW24',
    year: '2024',
    slug: 'void',
    description: 'Architectural volume exploration. The space between defines the form.',
    techniques: ['Draping', 'Pattern Cutting'],
    status: 'Complete',
  },
]

// Archive items for preview
const archivePreview = [
  { id: 'AW25-001', title: 'Deconstructed Tailoring', category: 'Research' },
  { id: 'SS25-002', title: 'Raw Edge Studies', category: 'Material' },
  { id: 'AW24-003', title: 'Volume Architecture', category: 'Form' },
]

// Animated text component
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

// Image placeholder with loading animation
function ImagePlaceholder({
  label,
  variant = 'dark',
  aspectRatio = '4/5',
  className = '',
}: {
  label: string
  variant?: 'dark' | 'medium' | 'light'
  aspectRatio?: string
  className?: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const variants = {
    dark: 'bg-yon-charcoal text-yon-silver',
    medium: 'bg-yon-platinum text-yon-grey',
    light: 'bg-yon-silver text-yon-graphite',
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 ${variants[variant]} transition-all duration-700`}>
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"
          animate={{
            x: isHovered ? ['-100%', '100%'] : '-100%',
          }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />

        {/* Label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase opacity-40"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          >
            {label}
          </motion.span>
        </div>

        {/* Border */}
        <div className="absolute inset-0 border border-current opacity-10" />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-current opacity-20" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-current opacity-20" />
      </div>
    </motion.div>
  )
}

// Section header component
function SectionHeader({
  label,
  number,
  title,
  description,
  align = 'left'
}: {
  label: string
  number: string
  title: string
  description?: string
  align?: 'left' | 'center'
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className={`${align === 'center' ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`flex items-center gap-3 mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="w-6 h-px bg-yon-grey" />
        <span className="font-mono text-[10px] text-yon-grey tracking-[0.2em] uppercase">
          {label}
        </span>
        <span className="font-mono text-[10px] text-yon-grey/40 tracking-wider">
          {number}
        </span>
      </div>
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-yon-black leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className={`mt-6 text-base md:text-lg text-yon-steel leading-[1.7] ${align === 'center' ? 'mx-auto' : ''} max-w-xl`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}

// Collection card component
function CollectionCard({ collection, index }: { collection: typeof collections[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [isHovered, setIsHovered] = useState(false)
  const isReversed = index % 2 === 1

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/collections/${collection.slug}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Image */}
          <div className={`md:col-span-7 ${isReversed ? 'md:col-start-6 md:order-2' : ''}`}>
            <motion.div
              className="relative aspect-[4/5] bg-yon-charcoal overflow-hidden"
              animate={{ scale: isHovered ? 1.02 : 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Placeholder content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className="font-mono text-[10px] text-yon-silver tracking-[0.2em] opacity-30"
                  animate={{ opacity: isHovered ? 0.5 : 0.3 }}
                >
                  {collection.title}
                </motion.span>
              </div>

              {/* Animated gradient on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-yon-black/60 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />

              {/* Border */}
              <div className="absolute inset-0 border border-yon-silver/10" />

              {/* Index badge */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6">
                <motion.span
                  className="font-mono text-[10px] text-yon-silver/60 tracking-wider"
                  animate={{ y: isHovered ? -2 : 0 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.span>
              </div>

              {/* Season badge */}
              <motion.div
                className="absolute top-4 right-4 md:top-6 md:right-6"
                animate={{ y: isHovered ? -2 : 0, opacity: isHovered ? 1 : 0.6 }}
              >
                <span className="font-mono text-[9px] text-yon-silver tracking-[0.15em] uppercase">
                  {collection.season}
                </span>
              </motion.div>

              {/* View indicator */}
              <motion.div
                className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-mono text-[9px] text-yon-white tracking-[0.1em] uppercase">
                  View Project
                </span>
                <motion.span
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </motion.div>

              {/* Status badge */}
              <motion.div
                className="absolute bottom-4 right-4 md:bottom-6 md:right-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
              >
                <span className={`inline-block font-mono text-[8px] tracking-[0.1em] uppercase px-2 py-1 ${
                  collection.status === 'In Progress'
                    ? 'bg-yon-accent/80 text-white'
                    : collection.status === 'Testing'
                    ? 'bg-yon-steel/80 text-white'
                    : 'bg-yon-silver/80 text-yon-charcoal'
                }`}>
                  {collection.status}
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Info */}
          <div className={`md:col-span-4 ${isReversed ? 'md:col-start-1 md:order-1' : ''} md:py-8`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[10px] text-yon-grey tracking-[0.12em] uppercase">
                {collection.season}
              </span>
              <span className="w-3 h-px bg-yon-grey/30" />
              <span className="font-mono text-[10px] text-yon-grey/60 tracking-wider">
                {collection.year}
              </span>
            </div>

            <motion.h3
              className="font-serif text-2xl md:text-3xl text-yon-black leading-tight"
              animate={{ color: isHovered ? 'var(--yon-accent)' : 'var(--yon-black)' }}
              transition={{ duration: 0.3 }}
            >
              {collection.title}
            </motion.h3>

            <p className="mt-4 text-sm text-yon-steel leading-[1.7]">
              {collection.description}
            </p>

            {/* Techniques */}
            <div className="mt-6 pt-6 border-t border-yon-platinum">
              <span className="font-mono text-[9px] text-yon-grey/60 tracking-[0.1em] uppercase block mb-3">
                Techniques
              </span>
              <div className="flex flex-wrap gap-2">
                {collection.techniques.map((tech, i) => (
                  <span
                    key={i}
                    className="font-mono text-[10px] text-yon-steel px-2 py-1 bg-yon-platinum/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* View more link */}
            <motion.div
              className="mt-6 flex items-center gap-2"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-mono text-[10px] text-yon-grey tracking-[0.1em] uppercase">
                Explore
              </span>
              <span className="text-yon-grey">→</span>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 0.12], [0, -80])
  const heroScale = useTransform(scrollYProgress, [0, 0.12], [1, 0.95])

  return (
    <div ref={containerRef} className="relative bg-yon-white">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section
        ref={heroRef}
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
                    <motion.span
                      className="transform"
                      whileHover={{ x: 4 }}
                    >
                      →
                    </motion.span>
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

      {/* ============================================
          PHILOSOPHY SECTION
          ============================================ */}
      <section className="relative py-24 md:py-32 lg:py-40 px-6 md:px-8 lg:px-12 bg-yon-ivory overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-yon-platinum/20 to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            {/* Label */}
            <div className="md:col-span-4">
              <SectionHeader
                label="Philosophy"
                number="001"
                title=""
              />
            </div>

            {/* Content */}
            <motion.div
              className="md:col-span-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] text-yon-black">
                Twisted yet harmonious
              </h2>

              <div className="mt-8 space-y-6">
                <p className="text-base md:text-lg text-yon-steel leading-[1.8]">
                  Every element is slightly askew, yet together they form perfect beauty.
                  Fashion that transcends time and space — the pursuit of an ideal beyond reach.
                </p>

                <p className="text-sm text-yon-grey leading-[1.7]">
                  모든 요소가 약간씩 어긋나 있지만, 전체적으로는 하나의 아름다운 구성을 이룹니다.
                  시간과 공간을 초월한 패션 — 손에 잡히지 않는 이상을 향한 탐구.
                </p>
              </div>

              {/* Stats/Info */}
              <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-yon-platinum">
                {[
                  { label: 'Collections', value: '4' },
                  { label: 'Archive Items', value: '24+' },
                  { label: 'Since', value: '2024' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <span className="font-serif text-2xl md:text-3xl text-yon-black">{stat.value}</span>
                    <span className="block mt-1 font-mono text-[9px] text-yon-grey tracking-[0.1em] uppercase">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-3 font-mono text-xs tracking-[0.12em] uppercase text-yon-black hover:text-yon-accent transition-colors"
                >
                  <span>About the Designer</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </motion.div>
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
          <div className="mb-16 md:mb-20 grid md:grid-cols-12 gap-6">
            <div className="md:col-span-5">
              <SectionHeader
                label="Featured Work"
                number="002"
                title="Collections"
              />
            </div>
            <motion.div
              className="md:col-span-6 md:col-start-7"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm md:text-base text-yon-steel leading-[1.7]">
                Each collection is an experiment — a question posed to fabric, form, and tradition.
                Explore the ongoing journey of deconstruction and reconstruction.
              </p>
            </motion.div>
          </div>

          {/* Collection Grid */}
          <div className="space-y-20 md:space-y-28">
            {collections.map((collection, index) => (
              <CollectionCard key={collection.id} collection={collection} index={index} />
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
              className="group inline-flex items-center gap-3 px-8 py-4 border border-yon-black font-mono text-[10px] tracking-[0.12em] uppercase text-yon-black hover:bg-yon-black hover:text-yon-white transition-all duration-300"
            >
              <span>View All Collections</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          ARCHIVE PREVIEW
          ============================================ */}
      <section className="relative py-24 md:py-32 px-6 md:px-8 lg:px-12 bg-yon-charcoal text-yon-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-yon-silver/50" />
                <span className="font-mono text-[10px] text-yon-silver/70 tracking-[0.2em] uppercase">
                  Process & Research
                </span>
                <span className="font-mono text-[10px] text-yon-grey/40 tracking-wider">
                  003
                </span>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1]">
                The Archive
              </h2>

              <p className="mt-6 text-base text-yon-silver leading-[1.7] max-w-md">
                Explore the research, experiments, and documentation behind each collection.
                The process is as important as the outcome.
              </p>

              {/* Archive preview list */}
              <div className="mt-10 space-y-4">
                {archivePreview.map((item, i) => (
                  <motion.div
                    key={item.id}
                    className="group flex items-center gap-4 py-3 border-b border-yon-graphite hover:border-yon-silver/50 transition-colors cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    <span className="font-mono text-[9px] text-yon-grey/60 tracking-wider w-16">
                      {item.id}
                    </span>
                    <span className="flex-1 font-mono text-sm text-yon-silver group-hover:text-yon-white transition-colors">
                      {item.title}
                    </span>
                    <span className="font-mono text-[9px] text-yon-grey/40 tracking-[0.1em] uppercase">
                      {item.category}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/archive"
                  className="group inline-flex items-center gap-3 px-6 py-3 border border-yon-silver/30 font-mono text-[10px] tracking-[0.12em] uppercase text-yon-white hover:bg-yon-white hover:text-yon-charcoal transition-all duration-300"
                >
                  <span>Enter Archive</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - Visual grid */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-y-4">
                <div className="aspect-square bg-yon-graphite flex items-center justify-center group hover:bg-yon-steel/30 transition-colors cursor-pointer">
                  <span className="font-mono text-[9px] text-yon-silver/40 tracking-wider group-hover:text-yon-silver/60 transition-colors">
                    AW25-001
                  </span>
                </div>
                <div className="aspect-[4/3] bg-yon-graphite flex items-center justify-center group hover:bg-yon-steel/30 transition-colors cursor-pointer">
                  <span className="font-mono text-[9px] text-yon-silver/40 tracking-wider group-hover:text-yon-silver/60 transition-colors">
                    SS25-003
                  </span>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-[3/4] bg-yon-graphite flex items-center justify-center group hover:bg-yon-steel/30 transition-colors cursor-pointer">
                  <span className="font-mono text-[9px] text-yon-silver/40 tracking-wider group-hover:text-yon-silver/60 transition-colors">
                    SS25-002
                  </span>
                </div>
                <div className="aspect-square bg-yon-graphite flex items-center justify-center group hover:bg-yon-steel/30 transition-colors cursor-pointer">
                  <span className="font-mono text-[9px] text-yon-silver/40 tracking-wider group-hover:text-yon-silver/60 transition-colors">
                    AW24-004
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================
          CONTACT CTA
          ============================================ */}
      <section className="relative py-24 md:py-32 px-6 md:px-8 lg:px-12 bg-yon-ivory">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-[10px] text-yon-grey tracking-[0.2em] uppercase">
              Get in Touch
            </span>

            <h2 className="mt-6 font-serif text-3xl md:text-4xl lg:text-5xl text-yon-black leading-[1.15]">
              Interested in collaboration?
            </h2>

            <p className="mt-6 text-base text-yon-steel leading-[1.7] max-w-lg mx-auto">
              For collaborations, exhibitions, press inquiries, or just to say hello.
            </p>

            <motion.div
              className="mt-10 flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-yon-black text-yon-white font-mono text-[10px] tracking-[0.12em] uppercase hover:bg-yon-charcoal transition-colors"
              >
                <span>Contact</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <a
                href="mailto:hello@theyon.com"
                className="group inline-flex items-center gap-3 px-8 py-4 border border-yon-black font-mono text-[10px] tracking-[0.12em] uppercase text-yon-black hover:bg-yon-black hover:text-yon-white transition-all duration-300"
              >
                <span>hello@theyon.com</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
