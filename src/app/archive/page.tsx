'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/Footer'

// Archive items - fragments of THE YON's creative journey
// Season-based numbering system
const archiveItems = [
  {
    id: 'AW25-001',
    title: 'Deconstructed Tailoring',
    season: 'AW25',
    category: 'CONSTRUCTION',
    description: 'Traditional pattern blocks, reimagined. Where structure meets chaos.',
    status: 'current',
    position: { top: '5%', left: '3%' },
    size: 'w-[44vw] md:w-[30vw]',
    rotation: -2.5,
    variant: 'dark' as const,
    aspectRatio: '4/5',
  },
  {
    id: 'AW25-002',
    title: 'Raw Edge Studies',
    season: 'AW25',
    category: 'MATERIAL',
    description: 'Embracing the unfinished. Beauty in the frayed.',
    status: 'current',
    position: { top: '2%', right: '8%' },
    size: 'w-[32vw] md:w-[20vw]',
    rotation: 2,
    variant: 'light' as const,
    aspectRatio: '3/4',
  },
  {
    id: 'SS25-001',
    title: 'Volume Architecture',
    season: 'SS25',
    category: 'FORM',
    description: 'The space between body and fabric. Sculptural silhouettes.',
    status: 'archived',
    position: { top: '22%', left: '35%' },
    size: 'w-[50vw] md:w-[34vw]',
    rotation: -1,
    variant: 'medium' as const,
    aspectRatio: '1/1',
  },
  {
    id: 'SS25-002',
    title: 'Toile Iterations',
    season: 'SS25',
    category: 'PROCESS',
    description: 'Every muslin tells a story. Prototypes as artifacts.',
    status: 'archived',
    position: { top: '35%', right: '3%' },
    size: 'w-[28vw] md:w-[16vw]',
    rotation: 2.5,
    variant: 'light' as const,
    aspectRatio: '4/3',
  },
  {
    id: 'FW24-001',
    title: 'Beautiful Failures',
    season: 'FW24',
    category: 'EXPERIMENT',
    description: 'What didn\'t work—and why it matters.',
    status: 'archived',
    position: { top: '52%', left: '6%' },
    size: 'w-[36vw] md:w-[22vw]',
    rotation: -1.5,
    variant: 'dark' as const,
    aspectRatio: '3/4',
  },
  {
    id: 'FW24-002',
    title: 'Seam Exposé',
    season: 'FW24',
    category: 'DETAIL',
    description: 'Seams as protagonists. Exposed, celebrated, exaggerated.',
    status: 'archived',
    position: { top: '48%', left: '40%' },
    size: 'w-[40vw] md:w-[26vw]',
    rotation: 0.5,
    variant: 'medium' as const,
    aspectRatio: '4/5',
  },
  {
    id: 'SS24-001',
    title: 'Concept Sketches',
    season: 'SS24',
    category: 'ORIGIN',
    description: 'Where it all begins. Raw ideas on paper.',
    status: 'archived',
    position: { top: '65%', right: '10%' },
    size: 'w-[26vw] md:w-[15vw]',
    rotation: -1,
    variant: 'light' as const,
    aspectRatio: '1/1',
  },
  {
    id: 'SS24-002',
    title: 'Texture Studies',
    season: 'SS24',
    category: 'SURFACE',
    description: 'The language of fabric. Close encounters.',
    status: 'archived',
    position: { top: '75%', left: '20%' },
    size: 'w-[34vw] md:w-[20vw]',
    rotation: 1.5,
    variant: 'dark' as const,
    aspectRatio: '3/4',
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

export default function ArchivePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const boardY = useTransform(scrollYProgress, [0, 1], [0, -40])

  return (
    <div ref={containerRef} className="min-h-screen bg-yon-ivory">
      {/* Header */}
      <section className="pt-28 md:pt-36 lg:pt-40 pb-16 md:pb-24 px-6 md:px-12 lg:px-16 relative overflow-hidden">
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.012] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            {/* Left - Title */}
            <motion.div
              className="md:col-span-6 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <span className="absolute -top-6 -left-2 md:-left-6 font-mono text-[80px] md:text-[140px] text-yon-platinum/25 leading-none select-none pointer-events-none">
                A
              </span>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-6 h-px bg-yon-grey" />
                  <span className="font-mono text-[10px] text-yon-grey tracking-[0.25em] uppercase">
                    The vault
                  </span>
                </div>
                <h1 className="relative font-serif text-[16vw] md:text-[10vw] lg:text-[8vw] text-yon-black leading-[0.85]">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Arch
                  </motion.span>
                  <motion.span
                    className="block ml-[8%]"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    ive
                  </motion.span>
                </h1>
              </motion.div>
            </motion.div>

            {/* Right - Description */}
            <motion.div
              className="md:col-span-5 md:col-start-8 md:pt-20 lg:pt-28"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-base md:text-lg text-yon-steel leading-[1.8]">
                Fragments of creation. Experiments preserved.
                The journey matters as much as the destination.
              </p>
              <p className="mt-4 text-sm text-yon-grey leading-[1.8]">
                과정의 기록. 실험과 실패, 그리고 발견.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="font-mono text-[10px] text-yon-grey/50 tracking-wider">
                  {archiveItems.length} Entries
                </span>
                <span className="w-4 h-px bg-yon-grey/30" />
                <span className="font-mono text-[10px] text-yon-grey/50 tracking-wider">
                  SS24 — AW25
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Archive Grid - Scattered layout */}
      <section className="relative min-h-[200vh] md:min-h-[250vh] px-6 md:px-12 pb-32">
        {/* Background decoration */}
        <span className="absolute top-[20%] -right-[8%] font-mono text-[25vw] md:text-[18vw] text-yon-platinum/10 leading-none select-none pointer-events-none">
          記
        </span>

        <motion.div
          className="relative max-w-7xl mx-auto"
          style={{ y: boardY }}
        >
          {archiveItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`absolute ${item.size} group cursor-pointer`}
              style={{
                ...item.position,
                zIndex: 10 + index,
              }}
              initial={{ opacity: 0, scale: 0.95, rotate: item.rotation - 2 }}
              whileInView={{ opacity: 1, scale: 1, rotate: item.rotation }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.9,
                delay: index * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                scale: 1.03,
                rotate: item.rotation * 0.4,
                zIndex: 100,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              {/* Card */}
              <div
                className={`relative ${variantStyles[item.variant]} overflow-hidden transition-shadow duration-500 group-hover:shadow-2xl`}
                style={{ aspectRatio: item.aspectRatio }}
              >
                {/* ID Label */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`font-mono text-[10px] tracking-[0.2em] ${variantTextStyles[item.variant]} opacity-50`}>
                    {item.id}
                  </span>
                </div>

                {/* Subtle border */}
                <div className="absolute inset-0 border border-current opacity-[0.06]" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-yon-black/0 group-hover:bg-yon-black/5 transition-colors duration-500" />

                {/* Season tag - top left */}
                <div className="absolute top-4 left-4">
                  <span className={`font-mono text-[9px] tracking-[0.15em] uppercase ${variantTextStyles[item.variant]} opacity-60`}>
                    {item.season}
                  </span>
                </div>

                {/* Status indicator - top right */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.status === 'current'
                        ? 'bg-yon-accent'
                        : 'bg-current opacity-30'
                    }`}
                  />
                </div>

                {/* Category - bottom */}
                <div className="absolute bottom-4 left-4">
                  <span className={`font-mono text-[8px] tracking-[0.1em] uppercase ${variantTextStyles[item.variant]} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}>
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Title below card */}
              <div className="mt-4 max-w-full">
                <h3 className="font-serif text-sm md:text-base text-yon-black leading-tight group-hover:text-yon-accent transition-colors duration-400">
                  {item.title}
                </h3>
                <p className="mt-2 text-[11px] text-yon-grey line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 md:py-48 lg:py-56 px-6 md:px-12 lg:px-16 bg-yon-white relative overflow-hidden">
        <span className="absolute top-1/2 -translate-y-1/2 -right-[10%] font-mono text-[35vw] md:text-[25vw] text-yon-platinum/15 leading-none select-none pointer-events-none">
          永
        </span>

        <div className="max-w-5xl mx-auto">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
          >
            <span className="absolute -top-10 -left-4 md:-left-12 font-serif text-[100px] md:text-[150px] text-yon-platinum/30 leading-none select-none pointer-events-none">
              "
            </span>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="relative font-serif text-[7vw] md:text-[4vw] lg:text-[3vw] text-yon-black leading-[1.15]">
                <span className="block">The making</span>
                <span className="block ml-[6%]">is the meaning</span>
              </h2>
              <p className="mt-10 md:mt-14 text-base md:text-lg text-yon-steel leading-[1.8] max-w-2xl ml-[3%] md:ml-[6%]">
                In a world of instant everything, THE YON chooses to slow down.
                Every stitch deliberate, every choice intentional.
                The process itself becomes the art.
              </p>
              <p className="mt-4 text-sm text-yon-grey leading-[1.8] max-w-xl ml-[3%] md:ml-[6%]">
                모든 것이 즉각적인 세상에서, 우리는 천천히 가기로 했습니다.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-16 bg-yon-charcoal relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-[10px] text-yon-silver/70 tracking-[0.25em] uppercase">
              Enter the showroom
            </span>
            <Link
              href="/collections"
              className="group block mt-8"
            >
              <span className="font-serif text-[8vw] md:text-[5vw] lg:text-[4vw] text-yon-white group-hover:text-yon-platinum transition-colors duration-500">
                View Collections
              </span>
              <span className="inline-block ml-4 text-2xl md:text-3xl text-yon-white group-hover:text-yon-platinum group-hover:translate-x-2 transition-all duration-500">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
