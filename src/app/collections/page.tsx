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

// Exhibition-style layout configurations - More varied sizes
const layoutConfigs = [
  {
    // Extra Large, left aligned - Hero piece
    wrapper: 'md:w-[75%] md:ml-0',
    aspectRatio: 'aspect-[4/5]',
    rotation: -1.5,
    variant: 'light' as const,
    entryDirection: { x: -50, y: 0 },
    size: 'xl',
  },
  {
    // Medium, right aligned, overlapping
    wrapper: 'md:w-[50%] md:ml-auto md:-mt-40',
    aspectRatio: 'aspect-[3/4]',
    rotation: 2,
    variant: 'medium' as const,
    entryDirection: { x: 50, y: 0 },
    size: 'md',
  },
  {
    // Small, left-center - accent piece
    wrapper: 'md:w-[38%] md:ml-[8%] md:-mt-20',
    aspectRatio: 'aspect-[1/1]',
    rotation: -0.5,
    variant: 'dark' as const,
    entryDirection: { x: 0, y: 50 },
    size: 'sm',
  },
  {
    // Large, right aligned
    wrapper: 'md:w-[62%] md:ml-auto md:-mt-28',
    aspectRatio: 'aspect-[3/4]',
    rotation: 1,
    variant: 'light' as const,
    entryDirection: { x: 40, y: 30 },
    size: 'lg',
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
      {/* Header */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Decorative number */}
            <span className="absolute -top-8 -left-2 md:-left-8 font-mono text-[100px] md:text-[180px] text-yon-platinum/40 leading-none select-none pointer-events-none">
              C
            </span>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="relative font-mono text-xs text-yon-grey tracking-[0.2em] uppercase">
                Portfolio
              </span>
              <h1 className="relative mt-4 font-serif text-[12vw] md:text-[8vw] lg:text-[6vw] text-yon-black leading-[0.9]">
                <span className="block transform rotate-[-0.5deg]">Collec</span>
                <span className="block transform rotate-[0.3deg] ml-[8%]">tions</span>
              </h1>
            </motion.div>

            <motion.p
              className="mt-8 md:mt-12 text-lg md:text-xl text-yon-steel max-w-xl leading-relaxed ml-[5%] md:ml-[10%]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              Each collection is an experiment. A question posed to fabric, form, and tradition.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Collections - Exhibition Layout */}
      <section className="pb-32 md:pb-48 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <motion.div
                className="w-12 h-12 border border-yon-grey rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <div className="w-full h-full border-t border-yon-black rounded-full" />
              </motion.div>
            </div>
          ) : (
            <div className="relative">
              {collections.map((collection, index) => {
                const config = layoutConfigs[index % layoutConfigs.length]

                return (
                  <motion.div
                    key={collection._id}
                    className={`mb-16 md:mb-0 ${config.wrapper}`}
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
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{
                      duration: 1,
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
                        className={`relative ${config.aspectRatio} ${variantStyles[config.variant]} overflow-hidden transition-shadow duration-500 group-hover:shadow-2xl group-focus-visible:shadow-2xl group-focus-visible:ring-2 group-focus-visible:ring-yon-black group-focus-visible:ring-offset-4`}
                        style={{ transform: `rotate(${config.rotation}deg)` }}
                        whileHover={{ scale: 1.02, rotate: config.rotation * 0.6 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {collection.mainImage ? (
                          <Image
                            src={urlFor(collection.mainImage).width(1000).height(1250).url()}
                            alt={collection.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className={`font-mono text-sm tracking-widest ${variantTextStyles[config.variant]}`}>
                              {collection.title}
                            </span>
                          </div>
                        )}

                        {/* Hover overlay with gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-yon-black/15 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500" />

                        {/* Index number */}
                        <div className="absolute top-6 left-6">
                          <span className={`font-mono text-xs tracking-wider ${config.variant === 'dark' ? 'text-yon-silver' : 'text-yon-grey'}`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Season tag - more visible on hover */}
                        <div className="absolute bottom-6 right-6">
                          <span className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-opacity duration-300 ${config.variant === 'dark' ? 'text-yon-silver' : 'text-yon-grey'} group-hover:opacity-100`}>
                            {collection.season?.toUpperCase()} {collection.year}
                          </span>
                        </div>
                      </motion.div>

                      {/* Info */}
                      <div className="mt-8 md:mt-10 flex justify-between items-start">
                        <div className="max-w-md">
                          <h2 className="font-serif text-3xl md:text-4xl text-yon-black group-hover:text-yon-accent group-focus-visible:text-yon-accent transition-colors duration-300">
                            {collection.title}
                          </h2>
                          {collection.description && (
                            <p className="mt-4 text-base text-yon-steel leading-relaxed line-clamp-2">
                              {collection.description}
                            </p>
                          )}
                        </div>
                        <span className="font-mono text-xs text-yon-grey opacity-0 translate-x-4 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:translate-x-0 group-focus-visible:translate-x-0 transition-all duration-300">
                          VIEW →
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
