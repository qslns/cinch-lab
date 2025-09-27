'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import {
  DeconstructedText,
  LayeredCard,
  MaterialCard,
  EditorialSection,
  RawEdgeButton,
  ConstructionMarker,
  AsymmetricGridItem
} from '@/components/MargielaSacaiComponents'

// ==========================================================================
// COLLECTIONS PAGE - Visual Archive Without Commerce
// Professional Editorial Gallery
// ==========================================================================

interface Collection {
  id: string
  title: string
  season: string
  year: number
  lookCount: number
  status: 'CURRENT' | 'ARCHIVED' | 'UPCOMING'
  theme: string
  location: string
  date: string
}

const collections: Collection[] = [
  {
    id: 'fw24-deconstruction',
    title: 'DECONSTRUCTED REALITY',
    season: 'FW',
    year: 2024,
    lookCount: 24,
    status: 'CURRENT',
    theme: 'Garments torn apart and rebuilt, exposing the beauty of internal structures.',
    location: 'Seoul Factory District',
    date: '2024.10'
  },
  {
    id: 'ss24-hybrid',
    title: 'HYBRID EXISTENCE',
    season: 'SS',
    year: 2024,
    lookCount: 18,
    status: 'ARCHIVED',
    theme: 'Multiple garments fused into singular forms, challenging categorization.',
    location: 'Tokyo Underground',
    date: '2024.03'
  },
  {
    id: 'fw23-void',
    title: 'BEAUTIFUL VOID',
    season: 'FW',
    year: 2023,
    lookCount: 20,
    status: 'ARCHIVED',
    theme: 'The space between fabric becomes the garment itself.',
    location: 'Paris Abandoned Theatre',
    date: '2023.09'
  },
  {
    id: 'ss25-fragment',
    title: 'FRAGMENTED FUTURES',
    season: 'SS',
    year: 2025,
    lookCount: 28,
    status: 'UPCOMING',
    theme: 'Tomorrow\'s fashion, broken today. Pieces of future scattered in present.',
    location: 'Digital Space',
    date: '2025.03'
  }
]

type ViewMode = 'GRID' | 'LIST' | 'EDITORIAL'

export default function CollectionsPage() {
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('GRID')
  const [filter, setFilter] = useState<'ALL' | 'CURRENT' | 'ARCHIVED' | 'UPCOMING'>('ALL')
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6])

  const filteredCollections = collections.filter(col =>
    filter === 'ALL' || col.status === filter
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-ivory">

      {/* ==========================================================================
         HEADER - Collections Archive Interface
         ========================================================================== */}

      <section className="relative pt-32 pb-16 px-8">
        {/* Background Texture */}
        <motion.div
          className="absolute inset-0 material-fabric opacity-20"
          style={{ y: parallaxY }}
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-label text-accent-blood mb-4 block">
              VISUAL ARCHIVE / NO COMMERCE
            </span>
            <h1 className="text-6xl md:text-hero font-black mb-8">
              <DeconstructedText intensity={2}>
                COLLECTIONS
              </DeconstructedText>
            </h1>
            <p className="text-lg text-steel max-w-3xl mb-12">
              Documentation of our experimental fashion journey. Each collection represents
              a moment of deconstruction, a study in form, a rejection of commercial constraints.
              These are not products—they are philosophies rendered in fabric.
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            {/* View Mode */}
            <div className="flex items-center gap-2">
              <span className="text-label">VIEW:</span>
              <div className="flex gap-1">
                {(['GRID', 'LIST', 'EDITORIAL'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`
                      px-4 py-2 text-xs font-mono uppercase transition-all
                      ${viewMode === mode
                        ? 'bg-carbon text-off-white'
                        : 'border border-carbon/20 hover:border-carbon'
                      }
                    `}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2">
              <span className="text-label">FILTER:</span>
              <div className="flex gap-1">
                {(['ALL', 'CURRENT', 'ARCHIVED', 'UPCOMING'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`
                      px-4 py-2 text-xs font-mono uppercase transition-all
                      ${filter === f
                        ? 'bg-accent-blood text-off-white'
                        : 'border border-carbon/20 hover:border-accent-blood'
                      }
                    `}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
         COLLECTIONS DISPLAY
         ========================================================================== */}

      <section className="px-8 pb-24">
        <div className="max-w-7xl mx-auto">

          {/* GRID VIEW */}
          {viewMode === 'GRID' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCollections.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <LayeredCard layers={3} className="h-full">
                    <MaterialCard
                      material="paper"
                      className="p-8 h-full cursor-pointer"
                      interactive={true}
                    >
                      <div onClick={() => setSelectedCollection(collection)}>
                        {/* Status Badge */}
                        <div className="flex justify-between items-start mb-4">
                          <span className="text-2xs font-mono text-steel">
                            {collection.season}{collection.year}
                          </span>
                          <span className={`
                            px-2 py-1 text-2xs font-mono uppercase
                            ${collection.status === 'CURRENT' ? 'bg-accent-sage text-off-white' :
                              collection.status === 'UPCOMING' ? 'bg-accent-blood text-off-white' :
                              'bg-steel text-off-white'}
                          `}>
                            {collection.status}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-bold mb-4">
                          {collection.title}
                        </h3>

                        {/* Theme */}
                        <p className="text-sm text-steel mb-6 line-clamp-3">
                          {collection.theme}
                        </p>

                        {/* Metadata */}
                        <div className="space-y-2 text-2xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-steel">LOOKS</span>
                            <span>{collection.lookCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-steel">LOCATION</span>
                            <span>{collection.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-steel">DATE</span>
                            <span>{collection.date}</span>
                          </div>
                        </div>

                        {/* Visual Grid Preview */}
                        <div className="grid grid-cols-4 gap-1 mt-6">
                          {Array.from({ length: 8 }).map((_, i) => (
                            <div
                              key={i}
                              className="aspect-[3/4] bg-gradient-to-b from-steel/20 to-steel/40"
                            />
                          ))}
                        </div>

                        <ConstructionMarker
                          label={`C_${String(index + 1).padStart(2, '0')}`}
                          position="top-right"
                        />
                      </div>
                    </MaterialCard>
                  </LayeredCard>
                </motion.div>
              ))}
            </div>
          )}

          {/* LIST VIEW */}
          {viewMode === 'LIST' && (
            <div className="space-y-6">
              {filteredCollections.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedCollection(collection)}
                  className="cursor-pointer"
                >
                  <MaterialCard material="fabric" className="p-8 hover:shadow-strong transition-all">
                    <div className="flex items-start gap-8">
                      {/* Preview Grid */}
                      <div className="grid grid-cols-3 gap-1 w-48 flex-shrink-0">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div
                            key={i}
                            className="aspect-square bg-gradient-to-br from-concrete/30 to-steel/30"
                          />
                        ))}
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="text-xs font-mono text-steel">
                              {collection.season}{collection.year} • {collection.date}
                            </span>
                            <h3 className="text-3xl font-bold mt-1">
                              {collection.title}
                            </h3>
                          </div>
                          <span className={`
                            px-3 py-1 text-xs font-mono uppercase
                            ${collection.status === 'CURRENT' ? 'bg-accent-sage text-off-white' :
                              collection.status === 'UPCOMING' ? 'bg-accent-blood text-off-white' :
                              'bg-steel text-off-white'}
                          `}>
                            {collection.status}
                          </span>
                        </div>

                        <p className="text-body text-steel mb-4">
                          {collection.theme}
                        </p>

                        <div className="flex gap-8 text-sm">
                          <div>
                            <span className="text-2xs font-mono text-steel block">LOOKS</span>
                            <span className="font-bold">{collection.lookCount}</span>
                          </div>
                          <div>
                            <span className="text-2xs font-mono text-steel block">LOCATION</span>
                            <span className="font-bold">{collection.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MaterialCard>
                </motion.div>
              ))}
            </div>
          )}

          {/* EDITORIAL VIEW */}
          {viewMode === 'EDITORIAL' && (
            <div className="space-y-32">
              {filteredCollections.map((collection, index) => (
                <EditorialSection
                  key={collection.id}
                  lineNumber={String(index + 1).padStart(2, '0')}
                  title={collection.title}
                  subtitle={`${collection.season}${collection.year} • ${collection.status}`}
                  description={collection.theme}
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {Array.from({ length: collection.lookCount }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.02 }}
                        className="group cursor-pointer"
                        onClick={() => setSelectedCollection(collection)}
                      >
                        <div className="aspect-[3/4] bg-gradient-to-b from-concrete/20 to-carbon/40 relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl font-black text-off-white/10">
                              {String(i + 1).padStart(3, '0')}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-accent-blood opacity-0 group-hover:opacity-20 transition-opacity" />
                        </div>
                        <p className="text-2xs font-mono text-center mt-2">
                          LOOK {String(i + 1).padStart(3, '0')}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </EditorialSection>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ==========================================================================
         COLLECTION DETAIL MODAL
         ========================================================================== */}

      <AnimatePresence>
        {selectedCollection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-carbon/90 backdrop-blur-md z-50 overflow-auto"
            onClick={() => setSelectedCollection(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="min-h-screen py-16 px-8"
              onClick={e => e.stopPropagation()}
            >
              <div className="max-w-7xl mx-auto bg-off-white">
                <div className="p-8 md:p-16">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-12">
                    <div>
                      <span className="text-label text-accent-blood">
                        {selectedCollection.season}{selectedCollection.year} COLLECTION
                      </span>
                      <h2 className="text-5xl font-black mt-2 mb-4">
                        {selectedCollection.title}
                      </h2>
                      <p className="text-lg text-steel max-w-3xl">
                        {selectedCollection.theme}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedCollection(null)}
                      className="text-3xl hover:text-accent-blood transition-colors"
                    >
                      ×
                    </button>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 pb-12 border-b border-carbon/10">
                    <div>
                      <span className="text-label block mb-2">STATUS</span>
                      <span className="text-lg font-bold">{selectedCollection.status}</span>
                    </div>
                    <div>
                      <span className="text-label block mb-2">LOOKS</span>
                      <span className="text-lg font-bold">{selectedCollection.lookCount}</span>
                    </div>
                    <div>
                      <span className="text-label block mb-2">LOCATION</span>
                      <span className="text-lg font-bold">{selectedCollection.location}</span>
                    </div>
                    <div>
                      <span className="text-label block mb-2">DATE</span>
                      <span className="text-lg font-bold">{selectedCollection.date}</span>
                    </div>
                  </div>

                  {/* Lookbook Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {Array.from({ length: selectedCollection.lookCount }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.02 }}
                        className="group"
                      >
                        <div className="aspect-[3/4] bg-gradient-to-b from-steel/10 to-carbon/30 relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-5xl font-black text-carbon/10">
                              {String(i + 1).padStart(3, '0')}
                            </span>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-2 bg-carbon text-off-white text-2xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                            LOOK {String(i + 1).padStart(3, '0')}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer Note */}
                  <div className="mt-12 pt-12 border-t border-carbon/10 text-center">
                    <p className="text-sm text-steel">
                      This collection is documentation only. No sales, no commerce, only visual philosophy.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================================================
         PHILOSOPHY FOOTER
         ========================================================================== */}

      <section className="py-16 px-8 bg-carbon text-off-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">
            Visual Documentation Only
          </h3>
          <p className="text-steel mb-8">
            These collections exist as artistic expression and research documentation.
            We do not sell. We create, document, and share our vision without commercial intent.
          </p>
          <Link href="/archive">
            <RawEdgeButton variant="secondary" size="large">
              Explore Archive
            </RawEdgeButton>
          </Link>
        </div>
      </section>
    </div>
  )
}