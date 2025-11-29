'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
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
    season: 'fw25',
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
    season: 'fw24',
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

// Exhibition-style layout configurations - Professional editorial grid
const layoutConfigs = [
  {
    // Hero piece - dominant
    wrapper: 'md:w-[68%] md:ml-0',
    aspectRatio: 'aspect-[4/5]',
    rotation: -2,
    variant: 'dark' as const,
    entryDirection: { x: -60, y: 0 },
    size: 'xl',
    marginTop: '',
  },
  {
    // Medium, right aligned - contrast
    wrapper: 'md:w-[48%] md:ml-auto',
    aspectRatio: 'aspect-[3/4]',
    rotation: 2.5,
    variant: 'light' as const,
    entryDirection: { x: 60, y: 0 },
    size: 'lg',
    marginTop: 'md:-mt-48',
  },
  {
    // Small accent - square
    wrapper: 'md:w-[35%] md:ml-[12%]',
    aspectRatio: 'aspect-[1/1]',
    rotation: -0.5,
    variant: 'medium' as const,
    entryDirection: { x: 0, y: 50 },
    size: 'md',
    marginTop: 'md:-mt-28',
  },
  {
    // Large, offset right
    wrapper: 'md:w-[55%] md:ml-auto',
    aspectRatio: 'aspect-[3/4]',
    rotation: 1.5,
    variant: 'dark' as const,
    entryDirection: { x: 40, y: 30 },
    size: 'lg',
    marginTop: 'md:-mt-32',
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

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCollections() {
      try {
        const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
        if (!projectId || projectId === 'your_project_id_here') {
          setCollections(FALLBACK_COLLECTIONS as Collection[])
          setLoading(false)
          return
        }
        const data = await client.fetch<Collection[]>(collectionsQuery)
        setCollections(data.length > 0 ? data : FALLBACK_COLLECTIONS as Collection[])
      } catch (error) {
        console.error('Error fetching collections:', error)
        setCollections(FALLBACK_COLLECTIONS as Collection[])
      } finally {
        setLoading(false)
      }
    }
    fetchCollections()
  }, [])

  return (
    <div className="min-h-screen bg-yon-white">
      {/* Header - Editorial Style */}
      <section className="pt-28 md:pt-36 lg:pt-40 pb-16 md:pb-24 lg:pb-32 px-6 md:px-12 lg:px-16 relative overflow-hidden">
        {/* Subtle grain texture */}
        <div className="absolute inset-0 opacity-[0.012] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            {/* Left column - Title */}
            <motion.div
              className="md:col-span-6 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Decorative letter */}
              <span className="absolute -top-6 -left-2 md:-left-6 font-mono text-[80px] md:text-[140px] text-yon-platinum/25 leading-none select-none pointer-events-none">
                C
              </span>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-6 h-px bg-yon-grey" />
                  <span className="font-mono text-[10px] text-yon-grey tracking-[0.25em] uppercase">
                    Portfolio
                  </span>
                </div>
                <h1 className="relative font-serif text-[14vw] md:text-[9vw] lg:text-[7vw] text-yon-black leading-[0.85]">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    Collec
                  </motion.span>
                  <motion.span
                    className="block ml-[6%]"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    tions
                  </motion.span>
                </h1>
              </motion.div>
            </motion.div>

            {/* Right column - Description */}
            <motion.div
              className="md:col-span-5 md:col-start-8 md:pt-20 lg:pt-28"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-base md:text-lg text-yon-steel leading-[1.8]">
                Each collection is an experiment — a question posed to fabric, form, and tradition.
              </p>
              <p className="mt-4 text-sm text-yon-grey leading-[1.8]">
                실험적인 패턴 메이킹과 소재 연구를 통해 패션의 경계를 탐구합니다.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="font-mono text-[10px] text-yon-grey/50 tracking-wider">
                  {collections.length} Projects
                </span>
                <span className="w-4 h-px bg-yon-grey/30" />
                <span className="font-mono text-[10px] text-yon-grey/50 tracking-wider">
                  2024 — 2025
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collections - Editorial Exhibition Grid */}
      <section className="pb-32 md:pb-48 lg:pb-56 px-6 md:px-12 lg:px-16 relative">
        {/* Background decoration */}
        <span className="absolute top-1/4 -right-[8%] font-mono text-[30vw] md:text-[20vw] text-yon-platinum/8 leading-none select-none pointer-events-none">
          W
        </span>

        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <motion.div
                className="w-10 h-10 border border-yon-grey/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-full h-full border-t border-yon-black" />
              </motion.div>
              <span className="font-mono text-[10px] text-yon-grey tracking-[0.2em] uppercase">
                Loading
              </span>
            </div>
          ) : (
            <div className="relative">
              {collections.map((collection, index) => {
                const config = layoutConfigs[index % layoutConfigs.length]

                return (
                  <motion.div
                    key={collection._id}
                    className={`mb-20 md:mb-0 ${config.wrapper} ${config.marginTop}`}
                    initial={{
                      opacity: 0,
                      x: config.entryDirection.x,
                      y: config.entryDirection.y,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                    }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{
                      duration: 1.1,
                      delay: 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={`/collections/${collection.slug}`}
                      className="group block outline-none"
                    >
                      {/* Image container */}
                      <motion.div
                        className={`relative ${config.aspectRatio} ${variantStyles[config.variant]} overflow-hidden`}
                        style={{ transform: `rotate(${config.rotation}deg)` }}
                        whileHover={{
                          scale: 1.02,
                          rotate: config.rotation * 0.4,
                          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
                        }}
                      >
                        {collection.mainImage ? (
                          <Image
                            src={urlFor(collection.mainImage).width(1000).height(1250).url()}
                            alt={collection.title}
                            fill
                            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                          />
                        ) : (
                          <div className={`absolute inset-0 flex flex-col items-center justify-center ${variantTextStyles[config.variant]}`}>
                            <span className="font-mono text-[10px] tracking-[0.2em] opacity-50">
                              {collection.title}
                            </span>
                          </div>
                        )}

                        {/* Subtle border */}
                        <div className="absolute inset-0 border border-current opacity-[0.04]" />

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-yon-black/0 group-hover:bg-yon-black/5 transition-colors duration-700" />

                        {/* Index - Top left */}
                        <div className="absolute top-5 left-5 md:top-6 md:left-6">
                          <span className={`font-mono text-[10px] tracking-wider ${config.variant === 'dark' ? 'text-yon-silver' : 'text-yon-grey'} opacity-60`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Season - Bottom right */}
                        <div className="absolute bottom-5 right-5 md:bottom-6 md:right-6">
                          <span className={`font-mono text-[9px] tracking-[0.15em] uppercase ${config.variant === 'dark' ? 'text-yon-silver' : 'text-yon-grey'} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}>
                            {collection.season?.toUpperCase()} {collection.year}
                          </span>
                        </div>

                        {/* View indicator - Bottom left */}
                        <div className="absolute bottom-5 left-5 md:bottom-6 md:left-6 overflow-hidden">
                          <span className={`block font-mono text-[9px] tracking-[0.1em] uppercase ${config.variant === 'dark' ? 'text-yon-silver' : 'text-yon-grey'} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}>
                            View Project →
                          </span>
                        </div>
                      </motion.div>

                      {/* Info - Below card */}
                      <div className="mt-6 md:mt-8 flex justify-between items-start">
                        <div className="max-w-md">
                          <h2 className="font-serif text-2xl md:text-3xl text-yon-black group-hover:text-yon-accent transition-colors duration-500">
                            {collection.title}
                          </h2>
                          {collection.description && (
                            <p className="mt-3 text-sm text-yon-steel leading-[1.7] line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              {collection.description}
                            </p>
                          )}
                        </div>
                        <span className="font-mono text-[10px] text-yon-grey/40 tracking-wider mt-1">
                          {collection.season?.toUpperCase()}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
