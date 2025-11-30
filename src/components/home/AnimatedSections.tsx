'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

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

// Section header component
function SectionHeader({
  label,
  number,
  title,
}: {
  label: string
  number: string
  title: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center gap-3 mb-4">
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
    </motion.div>
  )
}

// Collection card component
function CollectionCard({ collection, index }: { collection: Collection; index: number }) {
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
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  className="font-mono text-[10px] text-yon-silver tracking-[0.2em] opacity-30"
                  animate={{ opacity: isHovered ? 0.5 : 0.3 }}
                >
                  {collection.title}
                </motion.span>
              </div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-yon-black/60 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />

              <div className="absolute inset-0 border border-yon-silver/10" />

              <div className="absolute top-4 left-4 md:top-6 md:left-6">
                <motion.span
                  className="font-mono text-[10px] text-yon-silver/60 tracking-wider"
                  animate={{ y: isHovered ? -2 : 0 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.span>
              </div>

              <motion.div
                className="absolute top-4 right-4 md:top-6 md:right-6"
                animate={{ y: isHovered ? -2 : 0, opacity: isHovered ? 1 : 0.6 }}
              >
                <span className="font-mono text-[9px] text-yon-silver tracking-[0.15em] uppercase">
                  {collection.season}
                </span>
              </motion.div>

              <motion.div
                className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-mono text-[9px] text-yon-white tracking-[0.1em] uppercase">
                  View Project
                </span>
                <span>→</span>
              </motion.div>

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

export default function AnimatedSections({
  collections,
  archivePreview,
}: {
  collections: Collection[]
  archivePreview: ArchiveItem[]
}) {
  return (
    <>
      {/* Collections Section */}
      <section className="relative py-24 md:py-32 lg:py-40 px-6 md:px-8 lg:px-12 bg-yon-white">
        <div className="max-w-6xl mx-auto">
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

          <div className="space-y-20 md:space-y-28">
            {collections.map((collection, index) => (
              <CollectionCard key={collection.id} collection={collection} index={index} />
            ))}
          </div>

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

      {/* Archive Preview Section */}
      <section className="relative py-24 md:py-32 px-6 md:px-8 lg:px-12 bg-yon-charcoal text-yon-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
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
    </>
  )
}
