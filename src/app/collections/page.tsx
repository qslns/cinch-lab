'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { client } from '../../../sanity/lib/client'
import { urlFor } from '../../../sanity/lib/image'
import { collectionsQuery } from '@/lib/sanity/queries'
import type { Collection } from '@/types/sanity'

// Fallback data
const FALLBACK_COLLECTIONS: Partial<Collection>[] = [
  {
    _id: '1',
    title: 'Deconstructed Tailoring',
    slug: 'deconstructed-tailoring-fw25',
    season: 'fw25',
    year: 2025,
    status: 'in_progress',
    description: 'Exploring pattern deconstruction through experimental tailoring techniques.',
    techniques: ['Raw edge exposure', 'Inverted seaming', 'Visible interfacing'],
    materials: ['Japanese denim', 'Wool suiting', 'Cotton canvas'],
    featured: true,
  },
  {
    _id: '2',
    title: 'Material Synthesis',
    slug: 'material-synthesis-ss25',
    season: 'ss25',
    year: 2025,
    status: 'testing',
    description: 'Hybrid material construction with contrasting textures.',
    techniques: ['Material splicing', 'Surface manipulation'],
    materials: ['Nylon', 'Silk organza', 'Leather'],
    featured: false,
  },
  {
    _id: '3',
    title: 'Volume Studies',
    slug: 'volume-studies-fw24',
    season: 'fw24',
    year: 2024,
    status: 'complete',
    description: 'Architectural volume exploration.',
    techniques: ['Draping', 'Pattern cutting'],
    materials: ['Cotton canvas', 'Horsehair'],
    featured: false,
  },
]

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)
  const [filterSeason, setFilterSeason] = useState<string>('ALL')
  const [filterStatus, setFilterStatus] = useState<string>('ALL')
  const [loading, setLoading] = useState(true)
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    async function fetchCollections() {
      try {
        const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

        if (!projectId || projectId === 'your_project_id_here') {
          console.warn('Sanity not configured, using fallback data')
          setCollections(FALLBACK_COLLECTIONS as Collection[])
          setUseFallback(true)
          setLoading(false)
          return
        }

        const data = await client.fetch<Collection[]>(collectionsQuery)
        setCollections(data.length > 0 ? data : FALLBACK_COLLECTIONS as Collection[])
        setUseFallback(data.length === 0)
      } catch (error) {
        console.error('Error fetching collections:', error)
        setCollections(FALLBACK_COLLECTIONS as Collection[])
        setUseFallback(true)
      } finally {
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  const filteredCollections = collections.filter((col) => {
    const seasonMatch = filterSeason === 'ALL' || col.season === filterSeason
    const statusMatch = filterStatus === 'ALL' || col.status === filterStatus
    return seasonMatch && statusMatch
  })

  const seasons = ['ALL', 'fw25', 'ss25', 'fw24', 'ss24']
  const statuses = ['ALL', 'in_progress', 'testing', 'complete']

  const statusColors = {
    in_progress: 'bg-orange-500',
    testing: 'bg-blue-500',
    complete: 'bg-green-600',
  }

  const statusLabels = {
    in_progress: 'IN PROGRESS',
    testing: 'TESTING',
    complete: 'COMPLETE',
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-margiela-raw-canvas">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-margiela-carbon border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm uppercase tracking-[0.3em] text-margiela-steel">Loading Collections</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-margiela-raw-canvas">

      {/* CMS Warning */}
      {useFallback && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-40 bg-sacai-burnt-orange text-white px-6 py-3 text-xs tracking-wider"
        >
          DEMO MODE • Configure Sanity CMS
        </motion.div>
      )}

      {/* HEADER */}
      <header className="pt-32 pb-16 px-6 md:px-12 lg:px-20 border-b-2 border-margiela-exposed-seam">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="transform -rotate-1"
          >
            <div className="font-mono text-[10px] tracking-widest text-margiela-aluminum mb-8">
              02 • COLLECTIONS
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-margiela-carbon mb-8">
              <span className="block">COLLEC</span>
              <span className="block ml-12 md:ml-32">TIONS</span>
            </h1>

            <div className="h-[2px] w-48 bg-margiela-carbon" />
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-16 flex flex-col md:flex-row gap-8"
          >
            <div className="transform rotate-1">
              <div className="text-xs uppercase tracking-[0.3em] mb-3 text-margiela-steel">Season</div>
              <div className="flex flex-wrap gap-2">
                {seasons.map((season) => (
                  <button
                    key={season}
                    onClick={() => setFilterSeason(season)}
                    className={`px-4 py-2 border-2 text-xs uppercase tracking-wider transition-all duration-300 ${
                      filterSeason === season
                        ? 'bg-margiela-carbon text-white border-margiela-carbon'
                        : 'bg-white text-margiela-carbon border-margiela-steel hover:border-margiela-carbon'
                    }`}
                  >
                    {season}
                  </button>
                ))}
              </div>
            </div>

            <div className="transform -rotate-1">
              <div className="text-xs uppercase tracking-[0.3em] mb-3 text-margiela-steel">Status</div>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-4 py-2 border-2 text-xs uppercase tracking-wider transition-all duration-300 ${
                      filterStatus === status
                        ? 'bg-sacai-burnt-orange text-white border-sacai-burnt-orange'
                        : 'bg-white text-margiela-carbon border-margiela-steel hover:border-sacai-burnt-orange'
                    }`}
                  >
                    {status.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* GRID */}
      <section className="py-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {filteredCollections.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-margiela-steel text-lg">No collections found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {filteredCollections.map((collection, index) => {
                const rotations = ['-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1']
                const rotation = rotations[index % rotations.length]

                return (
                  <motion.div
                    key={collection._id}
                    className={`transform ${rotation} hover:rotate-0 transition-all duration-500 cursor-pointer`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedCollection(collection)}
                  >
                    <div className="bg-white border-2 border-margiela-steel hover:border-sacai-burnt-orange hover:shadow-2xl transition-all">
                      <div className="relative w-full aspect-[3/4] bg-margiela-paper flex items-center justify-center">
                        <div className="text-center p-8">
                          <div className="text-6xl font-light text-margiela-aluminum mb-4">
                            {collection.season?.toUpperCase()}
                          </div>
                          <div className="text-sm text-margiela-steel">Upload image in CMS</div>
                        </div>
                      </div>

                      <div className="p-6 md:p-8">
                        <div className="flex items-center gap-2 mb-4">
                          <div className={`w-2 h-2 rounded-full ${statusColors[collection.status]}`} />
                          <span className="text-[10px] uppercase tracking-widest font-bold">
                            {statusLabels[collection.status]}
                          </span>
                        </div>

                        <div className="text-xs tracking-[0.3em] mb-3 text-sacai-burnt-orange uppercase">
                          {collection.season?.toUpperCase()} {collection.year}
                        </div>

                        <h3 className="text-2xl md:text-3xl font-light mb-4 text-margiela-carbon">
                          {collection.title}
                        </h3>

                        {collection.description && (
                          <p className="text-sm text-margiela-steel line-clamp-3 mb-4">
                            {collection.description}
                          </p>
                        )}

                        {collection.techniques && collection.techniques.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {collection.techniques.slice(0, 3).map((tech, i) => (
                              <span
                                key={i}
                                className="text-[10px] px-2 py-1 bg-margiela-paper text-margiela-carbon uppercase tracking-wider"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedCollection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-cdg-absolute-black bg-opacity-90"
            onClick={() => setSelectedCollection(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-margiela-raw-canvas transform -rotate-1"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCollection(null)}
                className="absolute top-6 right-6 z-10 text-4xl text-margiela-carbon hover:text-cdg-blood-red transition-colors"
              >
                ×
              </button>

              <div className="p-8 md:p-12">
                <div className="mb-8">
                  <div className="text-xs tracking-[0.3em] mb-4 text-sacai-burnt-orange uppercase">
                    {selectedCollection.season?.toUpperCase()} {selectedCollection.year}
                  </div>
                  <h2 className="text-4xl md:text-6xl font-light mb-6 text-margiela-carbon">
                    {selectedCollection.title}
                  </h2>
                  {selectedCollection.description && (
                    <p className="text-lg text-margiela-steel leading-relaxed">
                      {selectedCollection.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedCollection.techniques && selectedCollection.techniques.length > 0 && (
                    <div className="p-6 bg-sacai-layer-navy text-white transform rotate-1">
                      <h3 className="text-xs uppercase tracking-[0.3em] mb-4">Techniques</h3>
                      <ul className="space-y-2">
                        {selectedCollection.techniques.map((tech, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-sacai-burnt-orange">→</span>
                            <span>{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedCollection.materials && selectedCollection.materials.length > 0 && (
                    <div className="p-6 bg-margiela-paper transform -rotate-1">
                      <h3 className="text-xs uppercase tracking-[0.3em] mb-4 text-margiela-carbon">Materials</h3>
                      <ul className="space-y-2">
                        {selectedCollection.materials.map((mat, i) => (
                          <li key={i} className="flex items-start gap-2 text-margiela-steel">
                            <span className="text-cdg-blood-red">→</span>
                            <span>{mat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="border-t-2 border-margiela-exposed-seam py-12 px-6 md:px-12 lg:px-20 mt-32 bg-margiela-snow">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-margiela-steel">
            CINCH LAB • COLLECTIONS • NO COMMERCIAL SALES
          </p>
        </div>
      </footer>
    </div>
  )
}
