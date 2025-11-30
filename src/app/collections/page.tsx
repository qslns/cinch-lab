'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '../../../sanity/lib/client'
import { urlFor } from '../../../sanity/lib/image'
import { collectionsQuery } from '@/lib/sanity/queries'
import type { Collection } from '@/types/sanity'
import Footer from '@/components/Footer'

// Fallback data for THE YON
const FALLBACK_COLLECTIONS: Partial<Collection>[] = [
  {
    _id: '1',
    title: 'DECONSTRUCTION',
    slug: 'deconstruction',
    season: 'aw25',
    year: 2025,
    status: 'in_progress',
    description: 'Exploring pattern deconstruction through experimental tailoring techniques. Every seam exposed, every structure questioned.',
    techniques: ['Raw edge exposure', 'Inverted seaming', 'Visible interfacing'],
    materials: ['Japanese denim', 'Wool suiting', 'Cotton canvas'],
    featured: true,
  },
  {
    _id: '2',
    title: 'FRAGMENTS',
    slug: 'fragments',
    season: 'ss25',
    year: 2025,
    status: 'testing',
    description: 'Hybrid material construction with contrasting textures. Beauty in the broken pieces.',
    techniques: ['Material splicing', 'Surface manipulation'],
    materials: ['Nylon', 'Silk organza', 'Leather'],
    featured: true,
  },
  {
    _id: '3',
    title: 'VOID',
    slug: 'void',
    season: 'aw24',
    year: 2024,
    status: 'complete',
    description: 'Architectural volume exploration. The space between defines the form.',
    techniques: ['Draping', 'Pattern cutting'],
    materials: ['Cotton canvas', 'Horsehair'],
    featured: false,
  },
  {
    _id: '4',
    title: 'ORIGIN',
    slug: 'origin',
    season: 'ss24',
    year: 2024,
    status: 'complete',
    description: 'Return to fundamental shapes. Where every collection begins.',
    techniques: ['Basic construction', 'Form studies'],
    materials: ['Muslin', 'Cotton'],
    featured: false,
  },
]

// Filter options
const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'testing', label: 'Testing' },
  { id: 'complete', label: 'Complete' },
]

const seasonOptions = [
  { id: 'all', label: 'All Seasons' },
  { id: 'aw25', label: 'AW25' },
  { id: 'ss25', label: 'SS25' },
  { id: 'aw24', label: 'AW24' },
  { id: 'ss24', label: 'SS24' },
]

// Collection card component
function CollectionCard({
  collection,
  index
}: {
  collection: Partial<Collection>
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [isHovered, setIsHovered] = useState(false)
  const isReversed = index % 2 === 1

  const statusColors = {
    in_progress: 'bg-yon-accent text-white',
    testing: 'bg-yon-steel text-white',
    complete: 'bg-yon-platinum text-yon-charcoal',
  }

  const statusLabels = {
    in_progress: 'In Progress',
    testing: 'Testing',
    complete: 'Complete',
  }

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
              {collection.mainImage ? (
                <Image
                  src={urlFor(collection.mainImage).width(1000).height(1250).url()}
                  alt={collection.title || ''}
                  fill
                  className="object-cover transition-transform duration-700"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="font-mono text-[10px] text-yon-silver tracking-[0.2em] opacity-30"
                    animate={{ opacity: isHovered ? 0.5 : 0.3 }}
                  >
                    {collection.title}
                  </motion.span>
                </div>
              )}

              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-yon-black/60 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
              />

              {/* Border */}
              <div className="absolute inset-0 border border-yon-silver/10" />

              {/* Index */}
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
                  {collection.season?.toUpperCase()}
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
                  className="text-yon-white"
                  animate={{ x: isHovered ? 4 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  →
                </motion.span>
              </motion.div>

              {/* Status badge on hover */}
              {collection.status && (
                <motion.div
                  className="absolute bottom-4 right-4 md:bottom-6 md:right-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className={`inline-block font-mono text-[8px] tracking-[0.1em] uppercase px-2 py-1 ${
                    statusColors[collection.status as keyof typeof statusColors] || statusColors.complete
                  }`}>
                    {statusLabels[collection.status as keyof typeof statusLabels] || 'Complete'}
                  </span>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Info */}
          <div className={`md:col-span-4 ${isReversed ? 'md:col-start-1 md:order-1' : ''} md:py-8`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[10px] text-yon-grey tracking-[0.12em] uppercase">
                {collection.season?.toUpperCase()}
              </span>
              <span className="w-3 h-px bg-yon-grey/30" />
              <span className="font-mono text-[10px] text-yon-grey/60 tracking-wider">
                {collection.year}
              </span>
            </div>

            <motion.h2
              className="font-serif text-2xl md:text-3xl text-yon-black leading-tight"
              animate={{ color: isHovered ? 'var(--yon-accent)' : 'var(--yon-black)' }}
              transition={{ duration: 0.3 }}
            >
              {collection.title}
            </motion.h2>

            {collection.description && (
              <p className="mt-4 text-sm text-yon-steel leading-[1.7]">
                {collection.description}
              </p>
            )}

            {/* Status badge - visible on mobile/non-hover */}
            {collection.status && (
              <div className="mt-6 md:hidden">
                <span className={`inline-block font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-1 ${
                  collection.status === 'in_progress'
                    ? 'bg-yon-accent/10 text-yon-accent'
                    : collection.status === 'testing'
                    ? 'bg-yon-steel/10 text-yon-steel'
                    : 'bg-yon-platinum text-yon-grey'
                }`}>
                  {statusLabels[collection.status as keyof typeof statusLabels] || 'Complete'}
                </span>
              </div>
            )}

            {/* Techniques */}
            {collection.techniques && collection.techniques.length > 0 && (
              <div className="mt-6 pt-6 border-t border-yon-platinum">
                <span className="font-mono text-[9px] text-yon-grey/60 tracking-[0.1em] uppercase block mb-3">
                  Techniques
                </span>
                <div className="flex flex-wrap gap-2">
                  {collection.techniques.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="font-mono text-[10px] text-yon-steel px-2 py-1 bg-yon-platinum/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Materials */}
            {collection.materials && collection.materials.length > 0 && (
              <div className="mt-4">
                <span className="font-mono text-[9px] text-yon-grey/60 tracking-[0.1em] uppercase block mb-2">
                  Materials
                </span>
                <p className="font-mono text-[10px] text-yon-grey">
                  {collection.materials.slice(0, 3).join(' · ')}
                </p>
              </div>
            )}

            {/* View more */}
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

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Partial<Collection>[]>([])
  const [filteredCollections, setFilteredCollections] = useState<Partial<Collection>[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [activeSeason, setActiveSeason] = useState('all')

  useEffect(() => {
    async function fetchCollections() {
      try {
        const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
        if (!projectId || projectId === 'your_project_id_here') {
          setCollections(FALLBACK_COLLECTIONS)
          setFilteredCollections(FALLBACK_COLLECTIONS)
          setLoading(false)
          return
        }
        const data = await client.fetch<Collection[]>(collectionsQuery)
        const result = data.length > 0 ? data : FALLBACK_COLLECTIONS
        setCollections(result)
        setFilteredCollections(result)
      } catch (error) {
        console.error('Error fetching collections:', error)
        setCollections(FALLBACK_COLLECTIONS)
        setFilteredCollections(FALLBACK_COLLECTIONS)
      } finally {
        setLoading(false)
      }
    }
    fetchCollections()
  }, [])

  // Filter collections
  useEffect(() => {
    let result = [...collections]

    if (activeFilter !== 'all') {
      result = result.filter(c => c.status === activeFilter)
    }

    if (activeSeason !== 'all') {
      result = result.filter(c => c.season === activeSeason)
    }

    setFilteredCollections(result)
  }, [activeFilter, activeSeason, collections])

  return (
    <div className="min-h-screen bg-yon-white">
      {/* Header */}
      <section className="pt-6 md:pt-8 pb-8 md:pb-12 px-6 md:px-8 lg:px-12">
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
                  Portfolio
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-yon-black leading-[1.1]">
                Collections
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
                Each collection is an experiment — a question posed to fabric, form, and tradition.
              </p>
              <p className="mt-3 text-sm text-yon-grey leading-[1.7]">
                실험적인 패턴 메이킹과 소재 연구를 통해 패션의 경계를 탐구합니다.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8 md:pb-12 px-6 md:px-8 lg:px-12 border-b border-yon-platinum">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="flex flex-wrap items-center gap-4 md:gap-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Status filter */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-yon-grey tracking-[0.1em] uppercase mr-2">
                Status
              </span>
              <div className="flex gap-1">
                {filterOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setActiveFilter(option.id)}
                    className={`px-3 py-1.5 font-mono text-[10px] tracking-[0.08em] uppercase transition-all duration-300 ${
                      activeFilter === option.id
                        ? 'bg-yon-black text-yon-white'
                        : 'bg-yon-platinum/50 text-yon-grey hover:bg-yon-platinum'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Season filter */}
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-yon-grey tracking-[0.1em] uppercase mr-2">
                Season
              </span>
              <div className="flex gap-1">
                {seasonOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setActiveSeason(option.id)}
                    className={`px-3 py-1.5 font-mono text-[10px] tracking-[0.08em] uppercase transition-all duration-300 ${
                      activeSeason === option.id
                        ? 'bg-yon-black text-yon-white'
                        : 'bg-yon-platinum/50 text-yon-grey hover:bg-yon-platinum'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Count */}
            <div className="ml-auto">
              <span className="font-mono text-[10px] text-yon-grey/60 tracking-wider">
                {filteredCollections.length} {filteredCollections.length === 1 ? 'Project' : 'Projects'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16 md:py-24 px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <motion.div
                className="w-10 h-10 border-2 border-yon-grey/20 border-t-yon-black rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <span className="font-mono text-[10px] text-yon-grey tracking-[0.15em] uppercase">
                Loading Collections
              </span>
            </div>
          ) : filteredCollections.length === 0 ? (
            <motion.div
              className="text-center py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="font-mono text-sm text-yon-grey">
                No collections found with the selected filters.
              </p>
              <button
                onClick={() => {
                  setActiveFilter('all')
                  setActiveSeason('all')
                }}
                className="mt-4 font-mono text-[10px] text-yon-black tracking-[0.1em] uppercase hover:text-yon-accent transition-colors"
              >
                Reset Filters →
              </button>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeFilter}-${activeSeason}`}
                className="space-y-20 md:space-y-28"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {filteredCollections.map((collection, index) => (
                  <CollectionCard
                    key={collection._id}
                    collection={collection}
                    index={index}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Archive CTA */}
      <section className="py-16 md:py-24 px-6 md:px-8 lg:px-12 bg-yon-ivory">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-[10px] text-yon-grey tracking-[0.2em] uppercase">
              Explore More
            </span>
            <h2 className="mt-4 font-serif text-2xl md:text-3xl text-yon-black">
              Discover the process behind each collection
            </h2>
            <p className="mt-4 text-sm text-yon-steel max-w-md mx-auto">
              Visit the archive to explore research, experiments, and documentation.
            </p>
            <Link
              href="/archive"
              className="group inline-flex items-center gap-3 mt-8 px-6 py-3 border border-yon-black font-mono text-[10px] tracking-[0.12em] uppercase text-yon-black hover:bg-yon-black hover:text-yon-white transition-all duration-300"
            >
              <span>Enter Archive</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
