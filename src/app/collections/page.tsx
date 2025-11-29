'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '../../../sanity/lib/client'
import { urlFor } from '../../../sanity/lib/image'
import { collectionsQuery } from '@/lib/sanity/queries'
import type { Collection } from '@/types/sanity'

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

  // Grid configuration for asymmetric layout
  const getGridConfig = (index: number) => {
    const configs = [
      { colSpan: 'md:col-span-7', rotation: '-1deg', marginTop: '0' },
      { colSpan: 'md:col-span-5', rotation: '1.5deg', marginTop: 'md:mt-24' },
      { colSpan: 'md:col-span-6', rotation: '-0.5deg', marginTop: 'md:-mt-12' },
      { colSpan: 'md:col-span-6', rotation: '1deg', marginTop: 'md:mt-16' },
      { colSpan: 'md:col-span-8', rotation: '-1.5deg', marginTop: '0' },
      { colSpan: 'md:col-span-4', rotation: '2deg', marginTop: 'md:mt-32' },
    ]
    return configs[index % configs.length]
  }

  return (
    <div className="min-h-screen bg-yon-white">
      {/* Header */}
      <section className="pt-32 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-micro text-yon-grey tracking-widest uppercase">
              Portfolio
            </span>
            <h1 className="mt-4 font-serif text-display text-yon-black transform rotate-[-0.5deg]">
              Collections
            </h1>
            <p className="mt-6 text-body-lg text-yon-steel max-w-xl">
              Each collection is an experiment. A question posed to fabric, form, and tradition.
              Twisted yet harmonious.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="pb-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <motion.div
                className="w-8 h-8 border-2 border-yon-grey border-t-yon-black rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-4 md:gap-8">
              {collections.map((collection, index) => {
                const config = getGridConfig(index)

                return (
                  <motion.div
                    key={collection._id}
                    className={`col-span-12 ${config.colSpan} ${config.marginTop}`}
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    <Link
                      href={`/collections/${collection.slug}`}
                      className="group block"
                    >
                      {/* Image container */}
                      <div
                        className="relative aspect-[4/5] bg-yon-platinum overflow-hidden transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
                        style={{ transform: `rotate(${config.rotation})` }}
                      >
                        {collection.mainImage ? (
                          <Image
                            src={urlFor(collection.mainImage).width(800).height(1000).url()}
                            alt={collection.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-mono text-sm text-yon-grey">
                              {collection.title}
                            </span>
                          </div>
                        )}

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-yon-black/0 transition-colors duration-500 group-hover:bg-yon-black/10" />

                        {/* Index number */}
                        <span className="absolute top-4 left-4 font-mono text-micro text-yon-white/80">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="mt-6 flex justify-between items-start">
                        <div>
                          <h2 className="font-serif text-xl md:text-2xl text-yon-black group-hover:text-yon-accent transition-colors duration-300">
                            {collection.title}
                          </h2>
                          <p className="mt-2 font-mono text-xs text-yon-grey uppercase tracking-wider">
                            {collection.season?.toUpperCase()} {collection.year}
                          </p>
                          {collection.description && (
                            <p className="mt-3 text-caption text-yon-steel line-clamp-2 max-w-sm">
                              {collection.description}
                            </p>
                          )}
                        </div>
                        <motion.span
                          className="font-mono text-xs text-yon-grey opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1"
                        >
                          VIEW →
                        </motion.span>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
