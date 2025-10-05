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

  return (
    <div className="min-h-screen bg-orange-50">

      {/* HEADER */}
      <header className="relative pt-32 pb-16 px-8 md:px-16 lg:px-24">
        <motion.div
          className="text-xs absolute top-8 right-8 transform rotate-12 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          001
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="transform -rotate-2"
        >
          <h1 className="text-9xl font-extralight text-black leading-none">
            COLL
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="transform rotate-1 ml-16"
        >
          <h1 className="text-9xl font-light text-orange-500 leading-none">
            ECTIONS
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <p className="text-2xl text-gray-700 font-light">
            Seasonal Archives • Visual Documentation • No Commerce
          </p>

          <div className="text-xs tracking-widest mt-8 inline-block bg-white px-4 py-2">
            EXPERIMENTAL COLLECTION
          </div>
        </motion.div>
      </header>

      {/* COLLECTION CARDS */}
      <section className="py-16 px-8 md:px-16 lg:px-24 space-y-16">
        {collections.map((collection, index) => {
          const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2']
          const bgColors = ['bg-white', 'bg-gray-50', 'bg-orange-100', 'bg-blue-50']

          return (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ scale: 1.02, rotate: 0 }}
              onClick={() => setSelectedCollection(collection)}
              className={`transform ${rotations[index]} cursor-pointer p-12 border-2 border-gray-300 ${bgColors[index]} hover:border-orange-500 hover:shadow-2xl transition-all duration-500`}
            >
              {/* Number Tag */}
              <div className="text-xs text-gray-500 mb-4">
                {collection.id}
              </div>

              {/* Status Indicator */}
              <div className={`text-xs inline-block px-3 py-1 mb-6 ${
                collection.status === 'CURRENT' ? 'bg-green-600' :
                collection.status === 'UPCOMING' ? 'bg-yellow-500' : 'bg-gray-500'
              } text-white tracking-widest`}>
                {collection.status}
              </div>

              {/* Season/Year */}
              <p className="text-xs tracking-widest text-orange-600 mb-4">
                {collection.season} {collection.year}
              </p>

              {/* Title */}
              <h2 className="text-5xl font-black text-black mb-6">
                {collection.title}
              </h2>

              {/* Concept */}
              <p className="text-lg text-gray-700 italic mb-8">
                {collection.concept}
              </p>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-8 border-t border-gray-300 pt-8">
                <div>
                  <p className="text-xs tracking-widest text-gray-500 mb-2">
                    LOOKS
                  </p>
                  <p className="text-3xl font-bold text-black">
                    {collection.lookCount}
                  </p>
                </div>
                <div>
                  <p className="text-xs tracking-widest text-gray-500 mb-2">
                    DATE
                  </p>
                  <p className="text-sm text-black">
                    {collection.date}
                  </p>
                </div>
              </div>

              {/* Techniques Tags */}
              {collection.techniques && (
                <div className="mt-8">
                  <p className="text-xs tracking-widest text-orange-600 mb-4">
                    TECHNIQUES
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {collection.techniques.map((tech, i) => (
                      <span key={i} className="text-xs px-3 py-1 bg-gray-200 text-gray-700">
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

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedCollection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCollection(null)}
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-5xl w-full max-h-[90vh] overflow-auto transform -rotate-1"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCollection(null)}
                className="absolute top-8 right-8 text-5xl text-black hover:text-gray-500 transition-colors"
              >
                ×
              </button>

              {/* Modal Content */}
              <div className="p-16">
                <span className="text-xs text-gray-500">{selectedCollection.id}</span>
                <h2 className="text-6xl font-black text-black mt-4 mb-4">
                  {selectedCollection.title}
                </h2>
                <p className="text-xl text-gray-700 mb-12">
                  {selectedCollection.concept}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="bg-orange-500 p-8 text-white transform rotate-1">
                    <p className="text-xs tracking-widest mb-4">
                      MATERIALS
                    </p>
                    {selectedCollection.materials?.map((mat, i) => (
                      <p key={i} className="text-base mb-2">{mat}</p>
                    ))}
                  </div>

                  {selectedCollection.location && (
                    <div className="bg-black p-8 text-white transform -rotate-1">
                      <p className="text-xs tracking-widest mb-4">
                        LOCATION
                      </p>
                      <p className="text-2xl font-bold">
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
      <footer className="border-t border-gray-300 py-16 px-8 text-center bg-white">
        <p className="text-sm text-gray-500">
          CINCH LAB COLLECTIONS • NO COMMERCE • DOCUMENTATION ONLY
        </p>
      </footer>
    </div>
  )
}
