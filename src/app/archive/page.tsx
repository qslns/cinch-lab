'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/Footer'

// Archive items - research and process documentation
const archiveItems = [
  {
    id: 'AW25-001',
    title: 'Deconstructed Tailoring',
    season: 'AW25',
    category: 'Construction',
    description: 'Traditional pattern blocks, reimagined. Where structure meets chaos.',
    status: 'current',
  },
  {
    id: 'AW25-002',
    title: 'Raw Edge Studies',
    season: 'AW25',
    category: 'Material',
    description: 'Embracing the unfinished. Beauty in the frayed.',
    status: 'current',
  },
  {
    id: 'SS25-001',
    title: 'Volume Architecture',
    season: 'SS25',
    category: 'Form',
    description: 'The space between body and fabric. Sculptural silhouettes.',
    status: 'archived',
  },
  {
    id: 'SS25-002',
    title: 'Toile Iterations',
    season: 'SS25',
    category: 'Process',
    description: 'Every muslin tells a story. Prototypes as artifacts.',
    status: 'archived',
  },
  {
    id: 'AW24-001',
    title: 'Beautiful Failures',
    season: 'AW24',
    category: 'Experiment',
    description: 'What didn\'t work—and why it matters.',
    status: 'archived',
  },
  {
    id: 'AW24-002',
    title: 'Seam Exposé',
    season: 'AW24',
    category: 'Detail',
    description: 'Seams as protagonists. Exposed, celebrated, exaggerated.',
    status: 'archived',
  },
  {
    id: 'SS24-001',
    title: 'Concept Sketches',
    season: 'SS24',
    category: 'Origin',
    description: 'Where it all begins. Raw ideas on paper.',
    status: 'archived',
  },
  {
    id: 'SS24-002',
    title: 'Texture Studies',
    season: 'SS24',
    category: 'Surface',
    description: 'The language of fabric. Close encounters.',
    status: 'archived',
  },
]

// Group by season
const groupedItems = archiveItems.reduce((acc, item) => {
  if (!acc[item.season]) {
    acc[item.season] = []
  }
  acc[item.season].push(item)
  return acc
}, {} as Record<string, typeof archiveItems>)

const seasonOrder = ['AW25', 'SS25', 'AW24', 'SS24']

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-yon-white">
      {/* Header */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-6 md:gap-8">
            {/* Title */}
            <motion.div
              className="md:col-span-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-yon-grey" />
                <span className="font-mono text-[10px] text-yon-grey tracking-[0.15em] uppercase">
                  Process & Research
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-yon-black leading-[1.1]">
                Archive
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              className="md:col-span-5 md:col-start-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-base md:text-lg text-yon-steel leading-[1.7]">
                Fragments of creation. Experiments preserved.
                The journey matters as much as the destination.
              </p>
              <p className="mt-3 text-sm text-yon-grey leading-[1.7]">
                과정의 기록. 실험과 실패, 그리고 발견.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <span className="font-mono text-[10px] text-yon-grey/60 tracking-wider">
                  {archiveItems.length} Entries
                </span>
                <span className="w-4 h-px bg-yon-grey/30" />
                <span className="font-mono text-[10px] text-yon-grey/60 tracking-wider">
                  SS24 — AW25
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Archive Grid - Organized by season */}
      <section className="pb-24 md:pb-32 px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-16 md:space-y-24">
            {seasonOrder.map((season, seasonIndex) => {
              const items = groupedItems[season]
              if (!items) return null

              return (
                <motion.div
                  key={season}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: seasonIndex * 0.1 }}
                >
                  {/* Season Header */}
                  <div className="flex items-center gap-4 mb-8 md:mb-10">
                    <span className="font-mono text-sm md:text-base text-yon-black tracking-wider">
                      {season}
                    </span>
                    <span className="flex-1 h-px bg-yon-platinum" />
                    <span className="font-mono text-[10px] text-yon-grey/60 tracking-wider">
                      {items.length} entries
                    </span>
                  </div>

                  {/* Items Grid */}
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        className="group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        <div className="flex gap-4 md:gap-6">
                          {/* Image placeholder */}
                          <div className="relative w-24 md:w-32 aspect-[3/4] bg-yon-charcoal flex-shrink-0 overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="font-mono text-[8px] text-yon-silver/50 tracking-wider">
                                {item.id}
                              </span>
                            </div>
                            <div className="absolute inset-0 border border-yon-silver/10" />

                            {/* Status indicator */}
                            <div className="absolute top-2 right-2">
                              <div className={`w-1.5 h-1.5 rounded-full ${
                                item.status === 'current' ? 'bg-yon-accent' : 'bg-yon-silver/40'
                              }`} />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 py-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-mono text-[9px] text-yon-grey tracking-[0.1em] uppercase">
                                {item.category}
                              </span>
                              {item.status === 'current' && (
                                <>
                                  <span className="w-1 h-1 rounded-full bg-yon-grey/30" />
                                  <span className="font-mono text-[9px] text-yon-accent tracking-[0.1em] uppercase">
                                    Current
                                  </span>
                                </>
                              )}
                            </div>

                            <h3 className="font-serif text-lg md:text-xl text-yon-black leading-tight group-hover:text-yon-accent transition-colors duration-300">
                              {item.title}
                            </h3>

                            <p className="mt-2 text-sm text-yon-steel leading-[1.6]">
                              {item.description}
                            </p>

                            <span className="inline-block mt-3 font-mono text-[9px] text-yon-grey/60 tracking-wider">
                              {item.id}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 md:py-28 px-6 md:px-8 lg:px-12 bg-yon-ivory">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-6 h-px bg-yon-grey" />
              <span className="font-mono text-[10px] text-yon-grey tracking-[0.15em] uppercase">
                Philosophy
              </span>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-yon-black leading-[1.2]">
              The making is the meaning
            </h2>

            <p className="mt-6 text-base md:text-lg text-yon-steel leading-[1.8] max-w-2xl">
              In a world of instant everything, THE YON chooses to slow down.
              Every stitch deliberate, every choice intentional.
              The process itself becomes the art.
            </p>

            <p className="mt-4 text-sm text-yon-grey leading-[1.7]">
              모든 것이 즉각적인 세상에서, 우리는 천천히 가기로 했습니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-6 md:px-8 lg:px-12 bg-yon-charcoal">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[10px] text-yon-silver/60 tracking-[0.15em] uppercase">
              Continue exploring
            </span>

            <div className="mt-6">
              <Link
                href="/collections"
                className="group inline-flex items-center gap-3 font-serif text-2xl md:text-3xl text-yon-white hover:text-yon-platinum transition-colors"
              >
                <span>View Collections</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
