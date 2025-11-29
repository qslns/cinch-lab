'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/Footer'

// Pinboard items - scattered like a designer's mood board
// More varied sizes and restrained rotations for professional look
const pinboardItems = [
  {
    id: 1,
    title: 'Pattern Deconstruction',
    category: 'TECHNIQUE',
    description: 'Breaking down traditional pattern blocks to understand and reimagine garment construction.',
    status: 'ongoing',
    position: { top: '5%', left: '5%' },
    size: 'w-[42vw] md:w-[28vw]', // Large
    rotation: -2,
    variant: 'light' as const,
    aspectRatio: '4/5',
    hasTape: true,
    tapePosition: 'top',
  },
  {
    id: 2,
    title: 'Material Manipulation',
    category: 'RESEARCH',
    description: 'Exploring how fabrics respond to unconventional treatments.',
    status: 'completed',
    position: { top: '3%', right: '10%' },
    size: 'w-[30vw] md:w-[18vw]', // Medium
    rotation: 1.5,
    variant: 'dark' as const,
    aspectRatio: '3/4',
    hasTape: true,
    tapePosition: 'corner',
  },
  {
    id: 3,
    title: 'Volume Studies',
    category: 'EXPERIMENT',
    description: 'Investigating the relationship between body and space.',
    status: 'ongoing',
    position: { top: '25%', left: '38%' },
    size: 'w-[48vw] md:w-[32vw]', // Extra Large - Hero piece
    rotation: -1,
    variant: 'medium' as const,
    aspectRatio: '1/1',
    hasTape: false,
  },
  {
    id: 4,
    title: 'Toile Documentation',
    category: 'PROCESS',
    description: 'Every prototype tells a story. The muslin iterations preserved as artifacts.',
    status: 'archive',
    position: { top: '38%', right: '5%' },
    size: 'w-[28vw] md:w-[16vw]', // Small
    rotation: 2,
    variant: 'light' as const,
    aspectRatio: '4/3',
    hasTape: true,
    tapePosition: 'top',
  },
  {
    id: 5,
    title: 'Failed Experiments',
    category: 'LEARNING',
    description: 'Documented failures—each one teaches something essential.',
    status: 'archive',
    position: { top: '55%', left: '8%' },
    size: 'w-[35vw] md:w-[20vw]', // Medium
    rotation: -1.5,
    variant: 'dark' as const,
    aspectRatio: '3/4',
    hasTape: true,
    tapePosition: 'corner',
  },
  {
    id: 6,
    title: 'Seam Architecture',
    category: 'TECHNIQUE',
    description: 'Treating seams as design elements. Exposed, exaggerated, celebrated.',
    status: 'ongoing',
    position: { top: '52%', left: '42%' },
    size: 'w-[38vw] md:w-[24vw]', // Large
    rotation: 0.5,
    variant: 'medium' as const,
    aspectRatio: '4/5',
    hasTape: false,
  },
  {
    id: 7,
    title: 'Sketch Archive',
    category: 'DOCUMENTATION',
    description: 'Raw sketches and ideas that may never become garments.',
    status: 'ongoing',
    position: { top: '68%', right: '12%' },
    size: 'w-[24vw] md:w-[14vw]', // Small
    rotation: -1,
    variant: 'light' as const,
    aspectRatio: '1/1',
    hasTape: true,
    tapePosition: 'top',
  },
  {
    id: 8,
    title: 'Texture Research',
    category: 'MATERIAL',
    description: 'Close-up studies of fabric surfaces and behaviors.',
    status: 'completed',
    position: { top: '78%', left: '22%' },
    size: 'w-[32vw] md:w-[18vw]', // Medium
    rotation: 1.5,
    variant: 'dark' as const,
    aspectRatio: '3/4',
    hasTape: false,
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

export default function ProcessPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Subtle parallax for the whole pinboard
  const boardY = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <div ref={containerRef} className="min-h-screen bg-yon-ivory">
      {/* Header */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Decorative element */}
            <span className="absolute -top-8 -left-2 md:-left-8 font-mono text-[100px] md:text-[180px] text-yon-platinum/40 leading-none select-none pointer-events-none">
              P
            </span>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="relative font-mono text-xs text-yon-grey tracking-[0.2em] uppercase">
                Behind the work
              </span>
              <h1 className="relative mt-4 font-serif text-[12vw] md:text-[8vw] lg:text-[6vw] text-yon-black leading-[0.9]">
                <span className="block transform rotate-[-0.5deg]">Pro</span>
                <span className="block transform rotate-[0.3deg] ml-[8%]">cess</span>
              </h1>
            </motion.div>

            <motion.p
              className="mt-8 md:mt-12 text-lg md:text-xl text-yon-steel max-w-xl leading-relaxed ml-[5%] md:ml-[10%]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              The journey matters as much as the destination. Here, the making is documented—
              experiments, failures, and discoveries along the way.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Pinboard Section */}
      <section className="relative min-h-[200vh] md:min-h-[250vh] px-6 md:px-12 pb-32">
        <motion.div
          className="relative max-w-7xl mx-auto"
          style={{ y: boardY }}
        >
          {pinboardItems.map((item, index) => (
            <motion.div
              key={item.id}
              className={`absolute ${item.size} group cursor-pointer`}
              style={{
                ...item.position,
                zIndex: 10 + index,
              }}
              initial={{ opacity: 0, scale: 0.9, rotate: item.rotation - 3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: item.rotation }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                scale: 1.04,
                rotate: item.rotation * 0.5,
                zIndex: 100,
                transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              {/* Tape effect */}
              {item.hasTape && (
                <div
                  className={`absolute ${
                    item.tapePosition === 'top'
                      ? '-top-3 left-1/2 -translate-x-1/2 w-12 h-6'
                      : '-top-2 -right-2 w-10 h-10'
                  } bg-yon-white/60 ${
                    item.tapePosition === 'corner' ? 'rotate-45' : ''
                  }`}
                  style={{ zIndex: 1 }}
                />
              )}

              {/* Card */}
              <div
                className={`relative ${variantStyles[item.variant]} shadow-lg overflow-hidden transition-all duration-400 group-hover:shadow-2xl`}
                style={{ aspectRatio: item.aspectRatio }}
              >
                {/* Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`font-mono text-xs tracking-widest ${variantTextStyles[item.variant]}`}>
                    {String(item.id).padStart(2, '0')}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-yon-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                {/* Category tag */}
                <div className="absolute top-4 left-4">
                  <span className={`font-mono text-[9px] tracking-[0.15em] uppercase ${variantTextStyles[item.variant]}`}>
                    {item.category}
                  </span>
                </div>

                {/* Status indicator with pulse on ongoing */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.status === 'ongoing'
                        ? 'bg-yon-accent animate-pulse'
                        : item.status === 'completed'
                        ? 'bg-yon-grey'
                        : 'bg-yon-silver'
                    }`}
                  />
                </div>
              </div>

              {/* Title and description - shown below card */}
              <div className="mt-3 max-w-full">
                <h3 className="font-serif text-base md:text-lg text-yon-black leading-tight group-hover:text-yon-accent transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-yon-steel line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 md:py-48 px-6 md:px-12 bg-yon-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
          >
            {/* Decorative quote */}
            <span className="absolute -top-12 -left-4 md:-left-12 font-mono text-[100px] md:text-[160px] text-yon-platinum/30 leading-none select-none pointer-events-none">
              &ldquo;
            </span>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="relative font-serif text-3xl md:text-4xl lg:text-5xl text-yon-black leading-[1.2]">
                <span className="block transform rotate-[-0.3deg]">The making</span>
                <span className="block transform rotate-[0.2deg] ml-[8%]">is the meaning</span>
              </h2>
              <p className="mt-10 text-lg md:text-xl text-yon-steel leading-relaxed max-w-2xl ml-[5%]">
                In a world of instant everything, we choose to slow down. Every stitch is deliberate,
                every choice intentional. The process itself becomes the art—documented, shared,
                and celebrated.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-yon-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-xs text-yon-silver tracking-[0.2em] uppercase">
              See the results
            </span>
            <Link
              href="/collections"
              className="block mt-6 font-serif text-4xl md:text-5xl lg:text-6xl text-yon-white hover:text-yon-platinum focus-visible:text-yon-platinum transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-yon-white focus-visible:ring-offset-4 focus-visible:ring-offset-yon-charcoal"
            >
              <span className="transform inline-block rotate-[-0.5deg]">View Collections</span>
              <span className="inline-block ml-4">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
