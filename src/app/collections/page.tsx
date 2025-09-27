'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// ==========================================================================
// COLLECTIONS PAGE - Seasonal Visual Archives
// Editorial Gallery × Runway Presentation
// ==========================================================================

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
  images: {
    hero?: string
    looks: string[]
  }
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
    techniques: ['Exposed interfacing', 'Raw edge tailoring', 'Asymmetric construction'],
    images: {
      hero: '/collections/fw25-hero.jpg',
      looks: Array.from({ length: 24 }, (_, i) => `/collections/fw25/look-${i + 1}.jpg`)
    }
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
    techniques: ['Heat welding', 'Ultrasonic bonding', 'Layer manipulation'],
    images: {
      hero: '/collections/ss25-hero.jpg',
      looks: Array.from({ length: 18 }, (_, i) => `/collections/ss25/look-${i + 1}.jpg`)
    }
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
    techniques: ['Garment splicing', 'Modular construction', 'Magnetic fastening'],
    images: {
      hero: '/collections/fw24-hero.jpg',
      looks: Array.from({ length: 21 }, (_, i) => `/collections/fw24/look-${i + 1}.jpg`)
    }
  },
  {
    id: 'SS24',
    season: 'SPRING/SUMMER',
    year: '2024',
    title: 'RAW EDGE PHILOSOPHY',
    concept: 'Unfinished as finished. Process as aesthetic.',
    lookCount: 16,
    status: 'ARCHIVED',
    date: '2023.10.12',
    materials: ['Raw denim', 'Unbleached muslin', 'Natural linen', 'Hemp canvas'],
    techniques: ['Fraying manipulation', 'Visible basting', 'Unfinished hems'],
    images: {
      hero: '/collections/ss24-hero.jpg',
      looks: Array.from({ length: 16 }, (_, i) => `/collections/ss24/look-${i + 1}.jpg`)
    }
  }
]

const viewModes = ['RUNWAY', 'GRID', 'LIST', 'EDITORIAL'] as const
type ViewMode = typeof viewModes[number]

export default function CollectionsPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const [selectedCollection, setSelectedCollection] = useState<Collection>(collections[0])
  const [viewMode, setViewMode] = useState<ViewMode>('RUNWAY')
  const [currentLook, setCurrentLook] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, -150])
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Auto-play runway
    let interval: NodeJS.Timeout
    if (isPlaying && viewMode === 'RUNWAY') {
      interval = setInterval(() => {
        setCurrentLook(prev => (prev + 1) % selectedCollection.lookCount)
      }, 3000)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (interval) clearInterval(interval)
    }
  }, [mouseX, mouseY, isPlaying, viewMode, selectedCollection.lookCount])

  return (
    <div ref={containerRef} className="min-h-screen bg-lab-white">
      {/* Background Layers */}
      <div className="fixed inset-0 texture-raw-canvas opacity-5 pointer-events-none" />
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 800px at ${smoothMouseX}px ${smoothMouseY}px,
            rgba(220, 20, 60, 0.02) 0%,
            transparent 50%)`,
        }}
      />

      {/* ==========================================================================
         HEADER - Collection Selector
         ========================================================================== */}

      <header className="relative pt-24 pb-8 px-6 border-b border-lab-carbon/20">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-6xl font-black mb-2">
              <span className="text-deconstructed" data-text="COLLECTIONS">
                COLLECTIONS
              </span>
            </h1>
            <p className="text-lg font-light opacity-70">
              Seasonal Archives • Visual Documentation • No Commerce
            </p>
          </motion.div>

          {/* Collection Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {collections.map((col) => (
              <button
                key={col.id}
                onClick={() => {
                  setSelectedCollection(col)
                  setCurrentLook(0)
                }}
                className={`px-4 py-2 text-sm font-medium tracking-wider transition-all
                  ${selectedCollection.id === col.id
                    ? 'bg-lab-carbon text-lab-white'
                    : 'border border-lab-carbon/20 hover:border-lab-carbon/40'
                  }`}
              >
                <span className="block text-xs opacity-60">{col.season}</span>
                <span className="font-bold">{col.year}</span>
                <span className={`ml-2 text-xs ${
                  col.status === 'CURRENT' ? 'text-hazmat-green' :
                  col.status === 'UPCOMING' ? 'text-warning-yellow' :
                  'opacity-50'
                }`}>
                  {col.status === 'CURRENT' && '●'}
                </span>
              </button>
            ))}
          </div>

          {/* View Mode Selector */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {viewModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 text-xs font-mono tracking-wider transition-all
                    ${viewMode === mode
                      ? 'text-thread-red border-b border-thread-red'
                      : 'opacity-50 hover:opacity-100'
                    }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Look Counter */}
            {viewMode === 'RUNWAY' && (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-xs font-mono tracking-wider hover:text-thread-red transition-colors"
                >
                  {isPlaying ? 'PAUSE' : 'PLAY'}
                </button>
                <span className="text-xs font-mono opacity-50">
                  LOOK {String(currentLook + 1).padStart(2, '0')} / {selectedCollection.lookCount}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ==========================================================================
         COLLECTION HEADER
         ========================================================================== */}

      <section className="relative py-12 px-6 border-b border-lab-carbon/20">
        <motion.div
          className="max-w-7xl mx-auto"
          style={{ y: heroY, scale: heroScale }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Collection Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="construction-mark" data-mark={selectedCollection.id} />

              <h2 className="text-4xl font-bold mb-4 mt-8">
                {selectedCollection.title}
              </h2>

              <p className="text-lg mb-6 opacity-80 leading-relaxed">
                {selectedCollection.concept}
              </p>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-4">
                  <span className="font-mono opacity-50">DATE:</span>
                  <span>{selectedCollection.date}</span>
                </div>
                {selectedCollection.location && (
                  <div className="flex items-center gap-4">
                    <span className="font-mono opacity-50">LOCATION:</span>
                    <span>{selectedCollection.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <span className="font-mono opacity-50">LOOKS:</span>
                  <span>{selectedCollection.lookCount}</span>
                </div>
              </div>
            </motion.div>

            {/* Materials & Techniques */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {selectedCollection.materials && (
                <div className="pattern-piece p-4">
                  <h3 className="text-xs font-mono uppercase tracking-widest mb-3 text-thread-blue">
                    MATERIALS
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCollection.materials.map((mat, i) => (
                      <span key={i} className="px-3 py-1 bg-lab-carbon/5 text-sm">
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedCollection.techniques && (
                <div className="pattern-piece p-4">
                  <h3 className="text-xs font-mono uppercase tracking-widest mb-3 text-thread-red">
                    TECHNIQUES
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCollection.techniques.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-lab-carbon/5 text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ==========================================================================
         COLLECTION DISPLAY
         ========================================================================== */}

      <section className="py-12 px-6">
        <div className={viewMode === 'EDITORIAL' ? 'max-w-full' : 'max-w-7xl mx-auto'}>

          {/* RUNWAY VIEW */}
          {viewMode === 'RUNWAY' && (
            <div className="relative">
              {/* Main Display */}
              <motion.div
                className="relative aspect-[3/4] max-w-3xl mx-auto bg-gradient-to-b from-lab-carbon/5 to-transparent"
                key={currentLook}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[200px] font-black opacity-5">
                    {String(currentLook + 1).padStart(2, '0')}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-xs font-mono mb-2">
                    LOOK {String(currentLook + 1).padStart(2, '0')}
                  </p>
                  <div className="h-px bg-lab-carbon/20" />
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="flex justify-center items-center gap-8 mt-8">
                <button
                  onClick={() => setCurrentLook(prev =>
                    prev === 0 ? selectedCollection.lookCount - 1 : prev - 1
                  )}
                  className="text-2xl hover:text-thread-red transition-colors"
                >
                  ←
                </button>

                {/* Thumbnails */}
                <div className="flex gap-2">
                  {Array.from({ length: Math.min(7, selectedCollection.lookCount) }, (_, i) => {
                    const index = (currentLook - 3 + i + selectedCollection.lookCount) % selectedCollection.lookCount
                    return (
                      <button
                        key={index}
                        onClick={() => setCurrentLook(index)}
                        className={`w-12 h-16 bg-lab-carbon/10 transition-all
                          ${index === currentLook
                            ? 'scale-110 bg-lab-carbon/30'
                            : 'hover:bg-lab-carbon/20'
                          }`}
                      >
                        <span className="text-xs opacity-50">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={() => setCurrentLook(prev =>
                    (prev + 1) % selectedCollection.lookCount
                  )}
                  className="text-2xl hover:text-thread-red transition-colors"
                >
                  →
                </button>
              </div>
            </div>
          )}

          {/* GRID VIEW */}
          {viewMode === 'GRID' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: selectedCollection.lookCount }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className="group cursor-pointer"
                  onClick={() => {
                    setCurrentLook(i)
                    setViewMode('RUNWAY')
                  }}
                >
                  <div className="aspect-[3/4] bg-gradient-to-b from-lab-carbon/5 to-transparent relative overflow-hidden">
                    <div className="absolute inset-0 bg-lab-carbon/0 group-hover:bg-lab-carbon/10 transition-all" />

                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-lab-carbon/50 to-transparent
                      opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-xs text-lab-white font-mono">
                        LOOK {String(i + 1).padStart(2, '0')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* LIST VIEW */}
          {viewMode === 'LIST' && (
            <div className="space-y-2">
              {Array.from({ length: selectedCollection.lookCount }, (_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.01 }}
                  className="flex items-center justify-between p-4 border border-lab-carbon/10
                    hover:border-lab-carbon/30 transition-all cursor-pointer group"
                  onClick={() => {
                    setCurrentLook(i)
                    setViewMode('RUNWAY')
                  }}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-mono text-thread-red">
                      LOOK {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="w-12 h-16 bg-lab-carbon/10" />
                  </div>

                  <motion.span
                    className="text-2xl opacity-0 group-hover:opacity-30"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.div>
              ))}
            </div>
          )}

          {/* EDITORIAL VIEW */}
          {viewMode === 'EDITORIAL' && (
            <div className="space-y-24">
              {/* Editorial Spread 1 */}
              <div className="grid grid-cols-12 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="col-span-7 aspect-[4/5] bg-gradient-to-br from-lab-carbon/5 to-transparent"
                />
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="col-span-5 aspect-square bg-gradient-to-bl from-lab-carbon/5 to-transparent mt-24"
                />
              </div>

              {/* Editorial Spread 2 */}
              <div className="grid grid-cols-12 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="col-span-4 aspect-[3/4] bg-gradient-to-tr from-lab-carbon/5 to-transparent"
                />
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="col-span-4 aspect-[3/4] bg-gradient-to-t from-lab-carbon/5 to-transparent mt-12"
                />
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="col-span-4 aspect-[3/4] bg-gradient-to-tl from-lab-carbon/5 to-transparent mt-24"
                />
              </div>

              {/* Editorial Text */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto py-24 text-center"
              >
                <p className="text-2xl font-light leading-relaxed">
                  "{selectedCollection.concept}"
                </p>
                <p className="text-xs font-mono mt-6 opacity-50">
                  {selectedCollection.season} {selectedCollection.year}
                </p>
              </motion.div>

              {/* Editorial Spread 3 */}
              <div className="grid grid-cols-12 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="col-span-12 aspect-[16/9] bg-gradient-to-b from-lab-carbon/5 to-transparent"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ==========================================================================
         COLLECTION NOTES
         ========================================================================== */}

      <section className="py-12 px-6 border-t border-lab-carbon/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">COLLECTION NOTES</h2>

          <div className="stitching py-4">
            <p className="text-sm font-mono opacity-70">
              Each collection represents a snapshot of our laboratory's research at a specific
              moment. These are not products for sale, but visual documentation of our
              experimental processes. The garments shown exist as prototypes and studies,
              exploring the boundaries between construction and deconstruction, form and
              anti-form, completion and process.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         FOOTER
         ========================================================================== */}

      <footer className="py-8 px-6 border-t border-lab-carbon/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between text-xs font-mono opacity-50">
            <span>CINCH LAB COLLECTIONS • VISUAL ARCHIVE</span>
            <span>NO SALES • DOCUMENTATION ONLY</span>
          </div>
        </div>
      </footer>
    </div>
  )
}