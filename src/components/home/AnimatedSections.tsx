'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const yonEase = [0.22, 1, 0.36, 1] as const

interface Collection {
  id: number
  title: string
  season: string
  year: string
  slug: string
  description: string
  techniques: string[]
  status: string
}

interface ArchiveItem {
  id: string
  title: string
  category: string
}

// Asymmetric section header
function SectionHeader({
  label,
  number,
  title,
  alignment = 'left',
}: {
  label: string
  number: string
  title: string
  alignment?: 'left' | 'right'
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className={alignment === 'right' ? 'text-right' : ''}
      initial={{ opacity: 0, y: 40, rotate: alignment === 'right' ? 1 : -1 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: 1, ease: yonEase }}
    >
      <div className={`flex items-center gap-3 mb-6 ${alignment === 'right' ? 'justify-end' : ''}`}>
        {alignment === 'left' && <span className="w-12 h-px bg-yon-grey" />}
        <span className="font-mono text-[9px] text-yon-grey tracking-[0.25em] uppercase">
          {label}
        </span>
        <span className="font-mono text-[9px] text-yon-grey/30 tracking-wider">
          {number}
        </span>
        {alignment === 'right' && <span className="w-12 h-px bg-yon-grey" />}
      </div>
      <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-yon-black leading-[0.95] tracking-[-0.02em]">
        {title}
      </h2>
    </motion.div>
  )
}

// Asymmetric Collection card with dramatic layout
function CollectionCard({ collection, index }: { collection: Collection; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [isHovered, setIsHovered] = useState(false)

  // Different layouts for each card
  const layouts = [
    { imageCol: 'lg:col-span-7', infoCol: 'lg:col-span-4 lg:col-start-9', imageRotation: -1.5, infoOffset: 'lg:mt-20' },
    { imageCol: 'lg:col-span-6 lg:col-start-6', infoCol: 'lg:col-span-4 lg:col-start-1', imageRotation: 1.2, infoOffset: 'lg:mt-32' },
    { imageCol: 'lg:col-span-8 lg:col-start-3', infoCol: 'lg:col-span-5 lg:col-start-8', imageRotation: -0.8, infoOffset: 'lg:-mt-16' },
  ]

  const layout = layouts[index % 3]
  const isReversed = index % 2 === 1

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay: 0.1, ease: yonEase }}
      className="relative"
    >
      <Link
        href={`/collections/${collection.slug}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor="link"
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-4">
          {/* Image - Asymmetric size and position */}
          <div className={`${layout.imageCol} ${isReversed ? 'lg:order-2' : ''}`}>
            <motion.div
              className="relative aspect-[4/5] bg-yon-charcoal overflow-hidden"
              style={{ rotate: `${layout.imageRotation}deg` }}
              animate={{
                scale: isHovered ? 1.02 : 1,
                rotate: isHovered ? 0 : layout.imageRotation,
              }}
              transition={{ duration: 0.6, ease: yonEase }}
            >
              {/* Placeholder content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="text-center"
                  animate={{ opacity: isHovered ? 0.6 : 0.3 }}
                >
                  <span className="block font-serif text-6xl md:text-7xl text-yon-silver/20 leading-none">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="block font-mono text-[10px] text-yon-silver/30 tracking-[0.3em] mt-4 uppercase">
                    {collection.title}
                  </span>
                </motion.div>
              </div>

              {/* Hover overlay with gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-yon-black/70 via-transparent to-yon-accent/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              />

              {/* Corner details */}
              <div className="absolute top-6 left-6">
                <motion.span
                  className="font-mono text-[10px] text-yon-silver/50 tracking-wider"
                  animate={{ y: isHovered ? -4 : 0, opacity: isHovered ? 1 : 0.5 }}
                >
                  {collection.season} / {collection.year}
                </motion.span>
              </div>

              <motion.div
                className="absolute bottom-6 right-6"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
              >
                <span className={`inline-block font-mono text-[8px] tracking-[0.15em] uppercase px-3 py-1.5 ${
                  collection.status === 'In Progress'
                    ? 'bg-yon-accent text-white'
                    : collection.status === 'Testing'
                    ? 'bg-yon-steel text-white'
                    : 'bg-yon-silver text-yon-charcoal'
                }`}>
                  {collection.status}
                </span>
              </motion.div>

              {/* View prompt */}
              <motion.div
                className="absolute bottom-6 left-6 flex items-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
              >
                <span className="font-mono text-[10px] text-yon-white tracking-[0.15em] uppercase">
                  Explore
                </span>
                <motion.span
                  animate={{ x: isHovered ? 4 : 0 }}
                  className="text-yon-white"
                >
                  →
                </motion.span>
              </motion.div>

              {/* Border */}
              <div className="absolute inset-0 border border-yon-silver/10 pointer-events-none" />
            </motion.div>
          </div>

          {/* Info - Offset positioning */}
          <div className={`${layout.infoCol} ${layout.infoOffset} ${isReversed ? 'lg:order-1' : ''}`}>
            <motion.div
              className="lg:transform"
              style={{ rotate: isReversed ? '-0.5deg' : '0.5deg' }}
              animate={{ x: isHovered ? 8 : 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Season tag */}
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-[10px] text-yon-accent tracking-[0.2em] uppercase">
                  {collection.season}
                </span>
                <span className="w-8 h-px bg-yon-grey/20" />
                <span className="font-mono text-[10px] text-yon-grey/40">
                  {collection.year}
                </span>
              </div>

              {/* Title */}
              <motion.h3
                className="font-serif text-3xl md:text-4xl text-yon-black leading-[1.05] tracking-[-0.01em]"
                animate={{ color: isHovered ? '#8B7355' : '#0A0A0A' }}
                transition={{ duration: 0.4 }}
              >
                {collection.title}
              </motion.h3>

              {/* Description */}
              <p className="mt-5 text-sm text-yon-steel leading-[1.8] max-w-sm">
                {collection.description}
              </p>

              {/* Techniques */}
              <div className="mt-8 pt-6 border-t border-yon-platinum/60">
                <span className="font-mono text-[8px] text-yon-grey/50 tracking-[0.2em] uppercase block mb-3">
                  Techniques
                </span>
                <div className="flex flex-wrap gap-2">
                  {collection.techniques.map((tech, i) => (
                    <motion.span
                      key={i}
                      className="font-mono text-[10px] text-yon-steel px-3 py-1.5 bg-yon-platinum/40 hover:bg-yon-platinum/60 transition-colors"
                      whileHover={{ y: -2 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.div
                className="mt-8 inline-flex items-center gap-3"
                animate={{ x: isHovered ? 8 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="w-6 h-px bg-yon-grey group-hover:w-10 transition-all duration-300" />
                <span className="font-mono text-[10px] text-yon-grey tracking-[0.12em] uppercase group-hover:text-yon-black transition-colors">
                  View Project
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Link>

      {/* Decorative number */}
      <motion.div
        className="absolute -left-4 lg:-left-12 top-0 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.04 } : {}}
        transition={{ delay: 0.3 }}
      >
        <span className="font-serif text-[180px] text-yon-black leading-none">
          {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>
    </motion.div>
  )
}

export default function AnimatedSections({
  collections,
  archivePreview,
}: {
  collections: Collection[]
  archivePreview: ArchiveItem[]
}) {
  const archiveRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: archiveRef,
    offset: ['start end', 'end start'],
  })

  const archiveY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <>
      {/* Collections Section - Asymmetric layout */}
      <section className="relative py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-16 bg-yon-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-yon-ivory/50 to-transparent pointer-events-none" />

        <div className="max-w-[1600px] mx-auto relative">
          {/* Header - Asymmetric alignment */}
          <div className="grid lg:grid-cols-12 gap-8 mb-24 md:mb-32">
            <div className="lg:col-span-5 lg:col-start-2">
              <SectionHeader
                label="Featured Work"
                number="002"
                title="Collections"
              />
            </div>
            <motion.div
              className="lg:col-span-4 lg:col-start-8 lg:pt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8, ease: yonEase }}
              style={{ transform: 'rotate(0.3deg)' }}
            >
              <p className="text-base text-yon-steel leading-[1.8]">
                Each collection is an experiment — a question posed to fabric, form, and tradition.
              </p>
              <p className="mt-4 text-sm text-yon-grey leading-[1.7]">
                각 컬렉션은 실험입니다 — 직물, 형태, 전통에 던지는 질문.
              </p>
            </motion.div>
          </div>

          {/* Collection cards */}
          <div className="space-y-32 md:space-y-40 lg:space-y-48">
            {collections.map((collection, index) => (
              <CollectionCard key={collection.id} collection={collection} index={index} />
            ))}
          </div>

          {/* View all CTA */}
          <motion.div
            className="mt-24 md:mt-32 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/collections"
              className="group inline-flex items-center gap-4 px-10 py-5 border border-yon-black font-mono text-[10px] tracking-[0.15em] uppercase text-yon-black hover:bg-yon-black hover:text-yon-white transition-all duration-500"
              data-cursor="link"
              style={{ transform: 'rotate(-0.5deg)' }}
            >
              <span>View All Collections</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Archive Preview Section - Dark, asymmetric */}
      <section
        ref={archiveRef}
        className="relative py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-16 bg-yon-charcoal text-yon-white overflow-hidden"
      >
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        {/* Decorative large text */}
        <motion.div
          className="absolute -right-20 top-1/4 hidden xl:block"
          style={{ y: archiveY }}
        >
          <span className="font-serif text-[300px] text-yon-graphite/30 leading-none select-none">
            ア
          </span>
        </motion.div>

        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Left - Content */}
            <motion.div
              className="lg:col-span-5 lg:col-start-2"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: yonEase }}
            >
              <div className="flex items-center gap-4 mb-6" style={{ transform: 'rotate(-0.5deg)' }}>
                <span className="w-12 h-px bg-yon-silver/40" />
                <span className="font-mono text-[9px] text-yon-silver/60 tracking-[0.25em] uppercase">
                  Process & Research
                </span>
                <span className="font-mono text-[9px] text-yon-grey/30">
                  003
                </span>
              </div>

              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.02em]">
                The Archive
              </h2>

              <p className="mt-8 text-base text-yon-silver leading-[1.8] max-w-md">
                Explore the research, experiments, and documentation behind each collection.
                The process is as important as the outcome.
              </p>
              <p className="mt-4 text-sm text-yon-grey leading-[1.7]">
                각 컬렉션의 리서치, 실험, 문서화를 탐구하세요.
                과정은 결과만큼 중요합니다.
              </p>

              {/* Archive list */}
              <div className="mt-12 space-y-0">
                {archivePreview.map((item, i) => (
                  <motion.div
                    key={item.id}
                    className="group flex items-center gap-6 py-5 border-b border-yon-graphite/60 hover:border-yon-silver/40 transition-colors cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, ease: yonEase }}
                    whileHover={{ x: 12 }}
                    data-cursor="link"
                  >
                    <span className="font-mono text-[9px] text-yon-grey/50 tracking-wider w-20">
                      {item.id}
                    </span>
                    <span className="flex-1 font-mono text-sm text-yon-silver group-hover:text-yon-white transition-colors">
                      {item.title}
                    </span>
                    <span className="font-mono text-[8px] text-yon-grey/30 tracking-[0.15em] uppercase">
                      {item.category}
                    </span>
                    <motion.span
                      className="text-yon-grey/30 group-hover:text-yon-silver transition-colors"
                      animate={{ x: 0 }}
                      whileHover={{ x: 4 }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <Link
                  href="/archive"
                  className="group inline-flex items-center gap-4 px-8 py-4 border border-yon-silver/30 font-mono text-[10px] tracking-[0.15em] uppercase text-yon-white hover:bg-yon-white hover:text-yon-charcoal transition-all duration-500"
                  data-cursor="link"
                  style={{ transform: 'rotate(0.5deg)' }}
                >
                  <span>Enter Archive</span>
                  <span className="transform group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right - Asymmetric image grid */}
            <motion.div
              className="lg:col-span-5 lg:col-start-8"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: yonEase }}
            >
              <div className="grid grid-cols-12 gap-4">
                {/* Large image */}
                <motion.div
                  className="col-span-8 aspect-[4/5] bg-yon-graphite flex items-center justify-center group hover:bg-yon-steel/20 transition-colors cursor-pointer"
                  style={{ rotate: '-1.5deg' }}
                  whileHover={{ scale: 1.02, rotate: 0 }}
                  data-cursor="image"
                >
                  <span className="font-mono text-[10px] text-yon-silver/30 tracking-[0.2em] group-hover:text-yon-silver/50 transition-colors">
                    AW25-001
                  </span>
                </motion.div>

                {/* Small square */}
                <motion.div
                  className="col-span-4 col-start-9 row-start-1 aspect-square bg-yon-graphite flex items-center justify-center group hover:bg-yon-steel/20 transition-colors cursor-pointer mt-12"
                  style={{ rotate: '2deg' }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  data-cursor="image"
                >
                  <span className="font-mono text-[9px] text-yon-silver/30 tracking-wider group-hover:text-yon-silver/50 transition-colors">
                    SS25
                  </span>
                </motion.div>

                {/* Bottom row */}
                <motion.div
                  className="col-span-5 col-start-2 aspect-[3/4] bg-yon-graphite flex items-center justify-center group hover:bg-yon-steel/20 transition-colors cursor-pointer -mt-8"
                  style={{ rotate: '1deg' }}
                  whileHover={{ scale: 1.02, rotate: 0 }}
                  data-cursor="image"
                >
                  <span className="font-mono text-[9px] text-yon-silver/30 tracking-wider group-hover:text-yon-silver/50 transition-colors">
                    SS25-002
                  </span>
                </motion.div>

                <motion.div
                  className="col-span-5 col-start-8 aspect-square bg-yon-graphite flex items-center justify-center group hover:bg-yon-steel/20 transition-colors cursor-pointer"
                  style={{ rotate: '-1deg' }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  data-cursor="image"
                >
                  <span className="font-mono text-[9px] text-yon-silver/30 tracking-wider group-hover:text-yon-silver/50 transition-colors">
                    AW24
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
