'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Collection {
  id: string
  season: string
  year: string
  title: string
  concept: string
  lookCount: number
  status: 'ARCHIVED' | 'CURRENT' | 'UPCOMING'
  date: string
  location?: string
  materials?: string[]
  techniques?: string[]
}

const collections: Collection[] = [
  {
    id: 'FW25',
    season: 'FALL/WINTER',
    year: '2025',
    title: 'DECONSTRUCTED FORMALITY',
    concept: 'Tailoring meets destruction. Corporate uniforms dissected and reassembled.',
    lookCount: 24,
    status: 'UPCOMING',
    date: '2025.03.15',
    location: 'Seoul Laboratory',
    materials: ['Virgin wool', 'Horsehair canvas', 'Silk organza', 'Steel wire'],
    techniques: ['Exposed interfacing', 'Raw edge tailoring', 'Asymmetric construction']
  },
  {
    id: 'SS25',
    season: 'SPRING/SUMMER',
    year: '2025',
    title: 'TRANSPARENT BOUNDARIES',
    concept: 'Revealing the unseen. Layers of translucency and opacity.',
    lookCount: 18,
    status: 'CURRENT',
    date: '2024.10.08',
    location: 'Tokyo Warehouse',
    materials: ['PVC film', 'Mesh fabric', 'Silk chiffon', 'Technical nylon'],
    techniques: ['Heat welding', 'Ultrasonic bonding', 'Layer manipulation']
  },
  {
    id: 'FW24',
    season: 'FALL/WINTER',
    year: '2024',
    title: 'HYBRID SYSTEMS',
    concept: 'Military meets civilian. Function spliced with form.',
    lookCount: 21,
    status: 'ARCHIVED',
    date: '2024.03.20',
    location: 'Paris Underground',
    materials: ['MA-1 nylon', 'Wool gabardine', 'Cotton canvas', 'Kevlar thread'],
    techniques: ['Garment splicing', 'Modular construction', 'Magnetic fastening']
  }
]

export default function CollectionsPage() {
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)

  const statusColors = {
    CURRENT: 'var(--margiela-sage)',
    UPCOMING: 'var(--sacai-burnt-orange)',
    ARCHIVED: 'var(--margiela-slate)'
  }

  const statusClasses = {
    CURRENT: 'bg-[var(--margiela-sage)]',
    UPCOMING: 'bg-[var(--sacai-burnt-orange)]',
    ARCHIVED: 'bg-[var(--margiela-slate)]'
  }

  return (
    <div className="min-h-screen bg-[var(--margiela-off-white)]">

      {/* HEADER with margiela-grid */}
      <header className="margiela-grid pt-32 pb-16 px-8 md:px-16 lg:px-24">
        <motion.div
          className="text-xs absolute top-8 right-8 transform rotate-12 text-[var(--margiela-slate)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="margiela-number-tag">01</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="transform -rotate-2 grid-item-large"
        >
          <h1 className="text-display-1 font-extralight text-[var(--margiela-carbon)] leading-none">
            COLL
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="transform rotate-1 ml-16 grid-item-large"
        >
          <h1 className="text-display-1 font-light text-[var(--sacai-burnt-orange)] leading-none">
            ECTIONS
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid-item-large"
        >
          <p className="text-heading-2 text-[var(--margiela-carbon)] font-light">
            Seasonal Archives • Visual Documentation • No Commerce
          </p>

          <div className="margiela-tag mt-8 inline-block bg-[var(--margiela-white)] px-4 py-2">
            EXPERIMENTAL COLLECTION
          </div>
        </motion.div>
      </header>

      {/* COLLECTION CARDS with rotations */}
      <section className="py-16 px-8 md:px-16 lg:px-24 space-y-16">
        {collections.map((collection, index) => {
          const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2']
          const bgColors = [
            'bg-[var(--margiela-white)]',
            'bg-[var(--margiela-off-white)]',
            'bg-[var(--sacai-warm-beige)]',
            'bg-[var(--margiela-off-white)]'
          ]

          return (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.02, rotate: 0 }}
              onClick={() => setSelectedCollection(collection)}
              className={`transform ${rotations[index]} cursor-pointer p-12 border-2 border-[var(--margiela-slate)] ${bgColors[index]} hover:border-[var(--sacai-burnt-orange)] hover:shadow-2xl transition-all duration-500 exposed-seam`}
            >
              {/* Margiela Number Tag */}
              <div className="margiela-number-tag mb-4">
                {collection.id}
              </div>

              {/* Status Badge */}
              <div
                className={`text-xs inline-block px-3 py-1 mb-6 ${statusClasses[collection.status]} text-[var(--margiela-white)] tracking-widest`}
                style={{ backgroundColor: statusColors[collection.status] }}
              >
                {collection.status}
              </div>

              {/* Season/Year with exposed seam */}
              <p className="margiela-tag text-[var(--sacai-burnt-orange)] mb-4 exposed-seam-vertical inline-block px-3 py-1">
                {collection.season} {collection.year}
              </p>

              {/* Title */}
              <h2 className="text-heading-1 font-black text-[var(--margiela-carbon)] mb-6">
                {collection.title}
              </h2>

              {/* Concept */}
              <p className="text-body-large text-[var(--margiela-carbon)] italic mb-8">
                {collection.concept}
              </p>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-8 border-t border-[var(--margiela-slate)] pt-8">
                <div>
                  <p className="margiela-tag text-[var(--margiela-slate)] mb-2">
                    LOOKS
                  </p>
                  <p className="text-4xl font-bold text-[var(--margiela-carbon)]">
                    {collection.lookCount}
                  </p>
                </div>
                <div>
                  <p className="margiela-tag text-[var(--margiela-slate)] mb-2">
                    DATE
                  </p>
                  <p className="text-sm text-[var(--margiela-carbon)]">
                    {collection.date}
                  </p>
                </div>
              </div>

              {/* Techniques Tags */}
              {collection.techniques && (
                <div className="mt-8">
                  <p className="margiela-tag text-[var(--sacai-burnt-orange)] mb-4">
                    TECHNIQUES
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {collection.techniques.map((tech, i) => (
                      <span key={i} className="text-xs px-3 py-1 bg-[var(--margiela-off-white)] text-[var(--margiela-carbon)]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </section>

      {/* DETAIL MODAL with sacai-grid layers */}
      <AnimatePresence>
        {selectedCollection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCollection(null)}
            className="fixed inset-0 bg-[var(--cdg-void)] bg-opacity-95 z-50 flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--margiela-white)] max-w-5xl w-full max-h-[90vh] overflow-auto transform -rotate-1 sacai-grid-layer"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCollection(null)}
                className="absolute top-8 right-8 text-5xl text-[var(--margiela-carbon)] hover:text-[var(--margiela-slate)] transition-colors"
              >
                ×
              </button>

              {/* Modal Content */}
              <div className="p-16">
                <span className="margiela-number-tag">{selectedCollection.id}</span>
                <h2 className="text-display-2 font-black text-[var(--margiela-carbon)] mt-4 mb-4">
                  {selectedCollection.title}
                </h2>
                <p className="text-heading-3 text-[var(--margiela-carbon)] mb-12">
                  {selectedCollection.concept}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Materials Layer */}
                  <div className="bg-[var(--sacai-burnt-orange)] p-8 text-[var(--margiela-white)] transform rotate-1 sacai-grid-layer">
                    <p className="text-xs tracking-widest mb-4">
                      MATERIALS
                    </p>
                    {selectedCollection.materials?.map((mat, i) => (
                      <p key={i} className="text-base mb-2">{mat}</p>
                    ))}
                  </div>

                  {/* Location Layer */}
                  {selectedCollection.location && (
                    <div className="bg-[var(--margiela-carbon)] p-8 text-[var(--margiela-white)] transform -rotate-1 sacai-grid-layer">
                      <p className="text-xs tracking-widest mb-4">
                        LOCATION
                      </p>
                      <p className="text-heading-2 font-bold">
                        {selectedCollection.location}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="border-t border-[var(--margiela-slate)] py-16 px-8 text-center bg-[var(--margiela-white)]">
        <p className="text-sm text-[var(--margiela-slate)]">
          CINCH LAB COLLECTIONS • NO COMMERCE • DOCUMENTATION ONLY
        </p>
      </footer>
    </div>
  )
}
