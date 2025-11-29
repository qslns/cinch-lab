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
              <div className="mt-4 flex items-center gap-3">
                <span className="font-mono text-[10px] text-yon-grey/60 tracking-wider">
                  {collections.length} Projects
                </span>
                <span className="w-4 h-px bg-yon-grey/30" />
                <span className="font-mono text-[10px] text-yon-grey/60 tracking-wider">
                  2024 — 2025
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="pb-24 md:pb-32 px-6 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-8 h-8 border border-yon-grey/30 border-t-yon-black animate-spin" />
              <span className="font-mono text-[10px] text-yon-grey tracking-[0.15em] uppercase">
                Loading
              </span>
            </div>
          ) : (
            <div className="space-y-20 md:space-y-28">
              {collections.map((collection, index) => (
                <motion.div
                  key={collection._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, delay: index * 0.05 }}
                >
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="group block"
                  >
                    <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
                      {/* Image */}
                      <div className={`md:col-span-7 ${index % 2 === 1 ? 'md:col-start-6 md:order-2' : ''}`}>
                        <div className="relative aspect-[4/5] bg-yon-charcoal overflow-hidden">
                          {collection.mainImage ? (
                            <Image
                              src={urlFor(collection.mainImage).width(1000).height(1250).url()}
                              alt={collection.title}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-yon-silver">
                              <span className="font-mono text-[10px] tracking-[0.2em] opacity-40">
                                {collection.title}
                              </span>
                            </div>
                          )}

                          {/* Border */}
                          <div className="absolute inset-0 border border-yon-silver/10" />

                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-yon-black/0 group-hover:bg-yon-black/10 transition-colors duration-500" />

                          {/* Index */}
                          <div className="absolute top-4 left-4 md:top-6 md:left-6">
                            <span className="font-mono text-[10px] text-yon-silver/60 tracking-wider">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                          </div>

                          {/* Season badge */}
                          <div className="absolute top-4 right-4 md:top-6 md:right-6">
                            <span className="font-mono text-[9px] text-yon-silver/60 tracking-[0.1em] uppercase">
                              {collection.season?.toUpperCase()}
                            </span>
                          </div>

                          {/* View indicator */}
                          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                            <span className="font-mono text-[9px] text-yon-silver tracking-[0.1em] uppercase opacity-0 group-hover:opacity-60 transition-opacity duration-300">
                              View Project →
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className={`md:col-span-4 ${index % 2 === 1 ? 'md:col-start-1 md:order-1' : ''} md:py-8`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-mono text-[10px] text-yon-grey tracking-[0.1em] uppercase">
                            {collection.season?.toUpperCase()}
                          </span>
                          <span className="w-3 h-px bg-yon-grey/30" />
                          <span className="font-mono text-[10px] text-yon-grey/60 tracking-wider">
                            {collection.year}
                          </span>
                        </div>

                        <h2 className="font-serif text-2xl md:text-3xl text-yon-black group-hover:text-yon-accent transition-colors duration-300">
                          {collection.title}
                        </h2>

                        {collection.description && (
                          <p className="mt-4 text-sm text-yon-steel leading-[1.7]">
                            {collection.description}
                          </p>
                        )}

                        {/* Status badge */}
                        {collection.status && (
                          <div className="mt-6">
                            <span className={`inline-block font-mono text-[9px] tracking-[0.1em] uppercase px-2 py-1 ${
                              collection.status === 'in_progress'
                                ? 'bg-yon-accent/10 text-yon-accent'
                                : collection.status === 'testing'
                                ? 'bg-yon-steel/10 text-yon-steel'
                                : 'bg-yon-platinum text-yon-grey'
                            }`}>
                              {collection.status === 'in_progress' ? 'In Progress' :
                               collection.status === 'testing' ? 'Testing' : 'Complete'}
                            </span>
                          </div>
                        )}

                        {/* Techniques */}
                        {collection.techniques && collection.techniques.length > 0 && (
                          <div className="mt-6 pt-6 border-t border-yon-platinum">
                            <span className="font-mono text-[9px] text-yon-grey/60 tracking-[0.1em] uppercase block mb-2">
                              Techniques
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {collection.techniques.slice(0, 3).map((tech, i) => (
                                <span key={i} className="font-mono text-[10px] text-yon-steel">
                                  {tech}{i < Math.min(collection.techniques!.length, 3) - 1 ? ',' : ''}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
