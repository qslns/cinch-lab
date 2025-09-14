'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const collections = [
  {
    year: 2025,
    seasons: [
      {
        id: 'ss25',
        name: 'SPRING/SUMMER 2025',
        title: 'VOID THEORY',
        description: 'Exploring negative space as the primary design element.',
        looks: 24,
        hero: true
      },
      {
        id: 'fw25',
        name: 'FALL/WINTER 2025',
        title: 'BRUTAL ELEGANCE',
        description: 'Raw materials meet refined silhouettes.',
        looks: 32,
        hero: false
      }
    ]
  },
  {
    year: 2024,
    seasons: [
      {
        id: 'ss24',
        name: 'SPRING/SUMMER 2024',
        title: 'DIGITAL DECAY',
        description: 'The intersection of technology and deterioration.',
        looks: 28,
        hero: false
      },
      {
        id: 'fw24',
        name: 'FALL/WINTER 2024',
        title: 'MONOCHROME',
        description: 'A study in black, white, and the spaces between.',
        looks: 30,
        hero: false
      }
    ]
  },
  {
    year: 2023,
    seasons: [
      {
        id: 'ss23',
        name: 'SPRING/SUMMER 2023',
        title: 'STRUCTURAL',
        description: 'Architecture as wearable form.',
        looks: 26,
        hero: false
      },
      {
        id: 'fw23',
        name: 'FALL/WINTER 2023',
        title: 'EROSION',
        description: 'Time as a design process.',
        looks: 29,
        hero: false
      }
    ]
  }
]

const years = [...new Set(collections.map(c => c.year))].sort((a, b) => b - a)

export default function CollectionsPage() {
  const [selectedYear, setSelectedYear] = useState(2025)
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'editorial' | 'grid'>('editorial')

  const currentCollections = collections.find(c => c.year === selectedYear)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-20 pb-12 px-8 md:px-20 border-b border-black/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-hero mb-4">COLLECTIONS</h1>
          <p className="text-label text-gray-600">COMPLETE ARCHIVE OF SEASONAL RELEASES</p>
        </motion.div>

        {/* Year Navigation */}
        <motion.div
          className="mt-12 flex gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`text-sm tracking-[0.1em] pb-2 border-b-2 transition-all duration-300 ${
                selectedYear === year
                  ? 'border-black opacity-100'
                  : 'border-transparent opacity-40 hover:opacity-70'
              }`}
            >
              {year}
            </button>
          ))}
          <Link
            href="/archive"
            className="text-sm tracking-[0.1em] pb-2 opacity-40 hover:opacity-70 transition-opacity"
          >
            FULL ARCHIVE →
          </Link>
        </motion.div>

        {/* View Mode Toggle */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => setViewMode('editorial')}
            className={`text-xs tracking-[0.15em] ${
              viewMode === 'editorial' ? 'opacity-100' : 'opacity-40'
            }`}
          >
            EDITORIAL
          </button>
          <span className="text-xs opacity-20">/</span>
          <button
            onClick={() => setViewMode('grid')}
            className={`text-xs tracking-[0.15em] ${
              viewMode === 'grid' ? 'opacity-100' : 'opacity-40'
            }`}
          >
            GRID
          </button>
        </div>
      </section>

      {/* Collections Display */}
      <AnimatePresence mode="wait">
        <motion.section
          key={selectedYear}
          className="px-8 md:px-20 py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {viewMode === 'editorial' ? (
            /* Editorial Layout */
            <div className="space-y-20">
              {currentCollections?.seasons.map((season, index) => (
                <motion.div
                  key={season.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {season.hero ? (
                    /* Hero Collection */
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                      <div className="aspect-[3/4] bg-gradient-to-b from-gray-100 to-gray-200 relative overflow-hidden">
                        <Image
                          src={`/collection-${season.id}.jpg`}
                          alt={season.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                          }}
                        />
                      </div>
                      <div className="py-12 md:px-12">
                        <span className="text-label opacity-60">{season.name}</span>
                        <h2 className="text-display mt-4 mb-6">{season.title}</h2>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                          {season.description}
                        </p>
                        <div className="flex items-center gap-8 mb-12">
                          <div>
                            <p className="text-3xl font-light">{season.looks}</p>
                            <p className="text-xs text-gray-600">LOOKS</p>
                          </div>
                          <div className="w-[1px] h-12 bg-gray-300" />
                          <div>
                            <p className="text-3xl font-light">{selectedYear}</p>
                            <p className="text-xs text-gray-600">YEAR</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedSeason(season.id)}
                          className="btn btn-outline"
                        >
                          VIEW COLLECTION
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Regular Collection */
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                      <div className="md:col-span-5">
                        <div className="aspect-[3/4] bg-gradient-to-b from-gray-100 to-gray-200 relative overflow-hidden">
                          <Image
                            src={`/collection-${season.id}.jpg`}
                            alt={season.title}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = 'none'
                            }}
                          />
                        </div>
                      </div>
                      <div className="md:col-span-7 flex flex-col justify-center">
                        <span className="text-label opacity-60">{season.name}</span>
                        <h2 className="text-5xl font-light mt-4 mb-4">{season.title}</h2>
                        <p className="text-gray-600 mb-8">{season.description}</p>
                        <div className="flex items-center gap-6">
                          <span className="text-sm">{season.looks} LOOKS</span>
                          <button
                            onClick={() => setSelectedSeason(season.id)}
                            className="text-sm tracking-[0.15em] hover-underline"
                          >
                            VIEW COLLECTION →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            /* Grid Layout */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentCollections?.seasons.map((season, index) => (
                <motion.div
                  key={season.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedSeason(season.id)}
                  className="group cursor-pointer"
                >
                  <div className="aspect-[3/4] bg-gradient-to-b from-gray-100 to-gray-200 relative overflow-hidden">
                    <Image
                      src={`/collection-${season.id}.jpg`}
                      alt={season.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="mt-4">
                    <p className="text-xs tracking-[0.15em] opacity-60">{season.name}</p>
                    <h3 className="text-2xl font-light mt-2">{season.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{season.looks} looks</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </AnimatePresence>

      {/* Collection Detail Modal */}
      <AnimatePresence>
        {selectedSeason && (
          <motion.div
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="min-h-screen">
              <button
                className="fixed top-8 right-8 z-10 text-3xl hover:rotate-90 transition-transform duration-300"
                onClick={() => setSelectedSeason(null)}
              >
                ×
              </button>

              <div className="px-8 md:px-20 py-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-hero mb-4">
                    {currentCollections?.seasons.find(s => s.id === selectedSeason)?.title}
                  </h2>
                  <p className="text-label mb-12">
                    {currentCollections?.seasons.find(s => s.id === selectedSeason)?.name}
                  </p>
                </motion.div>

                {/* Lookbook Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...Array(currentCollections?.seasons.find(s => s.id === selectedSeason)?.looks || 0)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="aspect-[3/4] bg-gradient-to-b from-gray-100 to-gray-200 relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.02 }}
                    >
                      <span className="absolute top-4 left-4 text-label text-white mix-blend-difference">
                        LOOK {String(i + 1).padStart(3, '0')}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}