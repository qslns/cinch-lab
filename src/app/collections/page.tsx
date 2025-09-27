'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion'
import {
  MagneticButton,
  RippleEffect,
  DistortionText,
  ParallaxContainer,
  FabricDrag,
  RevealOnScroll,
  SplitText,
  Card3D,
  NoiseBackground
} from '@/components/InteractiveElements'

// ==========================================================================
// COLLECTIONS PAGE - Hybrid Gallery Without Commerce
// Margiela × Sacai Visual Philosophy
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
  philosophy: string
  colors: string[]
}

const collections: Collection[] = [
  {
    id: 'fw24-deconstruction',
    title: 'DECONSTRUCTED REALITY',
    season: 'FW',
    year: 2024,
    lookCount: 32,
    status: 'CURRENT',
    theme: 'Garments torn apart and rebuilt, exposing the beauty of internal structures.',
    philosophy: 'Every thread tells a story of destruction and rebirth. We reveal what fashion hides.',
    location: 'Seoul Factory District',
    date: '2024.10',
    colors: ['#1a1a1a', '#cc0000', '#f0f0f0', '#808080']
  },
  {
    id: 'ss24-hybrid',
    title: 'HYBRID EXISTENCE',
    season: 'SS',
    year: 2024,
    lookCount: 28,
    status: 'ARCHIVED',
    theme: 'Multiple garments fused into singular forms, challenging categorization.',
    philosophy: 'Where does one garment end and another begin? The boundary is an illusion.',
    location: 'Tokyo Underground',
    date: '2024.03',
    colors: ['#ffffff', '#000000', '#404040', '#e0e0e0']
  },
  {
    id: 'fw23-void',
    title: 'BEAUTIFUL VOID',
    season: 'FW',
    year: 2023,
    lookCount: 24,
    status: 'ARCHIVED',
    theme: 'The space between fabric becomes the garment itself.',
    philosophy: 'Negative space as the ultimate luxury. What we remove defines what remains.',
    location: 'Paris Abandoned Theatre',
    date: '2023.09',
    colors: ['#0a0a0a', '#2a2a2a', '#f5f5f5', '#757575']
  },
  {
    id: 'ss25-fragment',
    title: 'FRAGMENTED FUTURES',
    season: 'SS',
    year: 2025,
    lookCount: 36,
    status: 'UPCOMING',
    theme: 'Tomorrow\'s fashion, broken today. Pieces of future scattered in present.',
    philosophy: 'The future is already here, just unevenly distributed across fabric.',
    location: 'Digital Space',
    date: '2025.03',
    colors: ['#ff0000', '#00ff00', '#0000ff', '#ffffff']
  },
  {
    id: 'fw24-process',
    title: 'PROCESS AS PRODUCT',
    season: 'FW',
    year: 2024,
    lookCount: 20,
    status: 'CURRENT',
    theme: 'Unfinished garments that celebrate the act of making.',
    philosophy: 'The journey is the destination. Construction lines are the final design.',
    location: 'Milan Workshop',
    date: '2024.09',
    colors: ['#ecru', '#natural', '#raw', '#undyed']
  }
]

type ViewMode = 'HYBRID' | 'MASONRY' | 'TIMELINE' | 'SPLICED'

export default function CollectionsPage() {
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('HYBRID')
  const [filter, setFilter] = useState<'ALL' | 'CURRENT' | 'ARCHIVED' | 'UPCOMING'>('ALL')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Mouse tracking for interactive effects
  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 0.9])

  const filteredCollections = collections.filter(col =>
    filter === 'ALL' || col.status === filter
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-raw-white relative">

      <NoiseBackground opacity={0.02} />

      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,0,0,0.03) 0%, transparent 50%)',
            x: useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1920], [-300, 300]),
            y: useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1080], [-300, 300]),
            filter: 'blur(100px)'
          }}
        />
      </div>

      {/* ==========================================================================
         HEADER - Hybrid Interface
         ========================================================================== */}

      <section className="relative pt-32 pb-16 px-8">
        {/* Deconstructed grid background */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          style={{ y: parallaxY }}
        >
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 39px, #000 40px),
                repeating-linear-gradient(90deg, transparent, transparent 39px, #000 40px)
              `
            }}
          />
        </motion.div>

        {/* Exposed seam decoration */}
        <div className="absolute top-0 left-0 right-0 h-px bg-thread-red" />
        <div className="absolute top-2 left-0 right-0 h-px bg-thread-white opacity-50" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Status Bar */}
          <motion.div
            className="mb-12 font-mono text-xs text-carbon/60"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-6">
              <span className="text-thread-red">●</span>
              <span>COLLECTIONS_ARCHIVE_v3.2</span>
              <span>|</span>
              <span>{filteredCollections.length} COLLECTIONS</span>
              <span>|</span>
              <span>NO_COMMERCE_MODE</span>
            </div>
          </motion.div>

          {/* Title with Distortion */}
          <motion.h1
            className="text-7xl md:text-9xl font-black mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <DistortionText text="COLLECTIONS" className="tracking-tighter" />
          </motion.h1>

          <motion.p
            className="text-xl text-carbon/70 max-w-3xl mb-12 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Visual archive of deconstructed realities and hybrid existences.
            Each collection is a philosophy rendered in fabric, a study in form without commercial constraint.
            We document process, not product.
          </motion.p>

          {/* Advanced Controls */}
          <motion.div
            className="flex flex-wrap gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* View Mode Selector */}
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-carbon/50">Display:</span>
              <div className="flex gap-1">
                {(['HYBRID', 'MASONRY', 'TIMELINE', 'SPLICED'] as const).map(mode => (
                  <MagneticButton key={mode} strength={0.2}>
                    <button
                      onClick={() => setViewMode(mode)}
                      className={`
                        px-4 py-2 text-xs font-mono uppercase transition-all relative overflow-hidden
                        ${viewMode === mode
                          ? 'bg-carbon text-raw-white'
                          : 'bg-transparent text-carbon border border-carbon/20 hover:border-carbon/60'
                        }
                      `}
                    >
                      <RippleEffect color={viewMode === mode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'}>
                        {mode}
                      </RippleEffect>
                    </button>
                  </MagneticButton>
                ))}
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-carbon/50">Filter:</span>
              <div className="flex gap-1">
                {(['ALL', 'CURRENT', 'ARCHIVED', 'UPCOMING'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`
                      px-3 py-2 text-xs font-mono uppercase transition-all border
                      ${filter === f
                        ? 'bg-thread-red text-raw-white border-thread-red'
                        : 'bg-transparent text-carbon border-carbon/20 hover:border-thread-red/50'
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
         COLLECTIONS DISPLAY - Multiple View Modes
         ========================================================================== */}

      <section className="px-8 pb-24">
        <div className="max-w-7xl mx-auto">

          {/* HYBRID VIEW - Margiela × Sacai Inspired */}
          {viewMode === 'HYBRID' && (
            <div className="space-y-16">
              {filteredCollections.map((collection, index) => (
                <RevealOnScroll key={collection.id}>
                  <motion.div
                    className="relative"
                    onMouseEnter={() => setHoveredId(collection.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Asymmetric Layout */}
                    <div className={`
                      grid gap-8
                      ${index % 2 === 0
                        ? 'md:grid-cols-[2fr,1fr]'
                        : 'md:grid-cols-[1fr,2fr]'}
                    `}>
                      {/* Info Panel */}
                      <motion.div
                        className={`${index % 2 !== 0 ? 'md:order-2' : ''}`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card3D>
                          <div className="layer-card bg-raw-white p-8 h-full">
                            {/* Status & Date */}
                            <div className="flex justify-between items-start mb-6">
                              <span className="text-xs font-mono text-carbon/50">
                                {collection.season}{collection.year} | {collection.date}
                              </span>
                              <span className={`
                                px-3 py-1 text-xs font-mono
                                ${collection.status === 'CURRENT'
                                  ? 'bg-thread-white text-carbon animate-pulse'
                                  : collection.status === 'UPCOMING'
                                  ? 'bg-thread-red text-raw-white'
                                  : 'bg-carbon/10 text-carbon'}
                              `}>
                                {collection.status}
                              </span>
                            </div>

                            {/* Title */}
                            <h2 className="text-4xl font-black mb-4">
                              {hoveredId === collection.id ? (
                                <SplitText text={collection.title} delay={0.02} />
                              ) : (
                                collection.title
                              )}
                            </h2>

                            {/* Theme */}
                            <p className="text-lg text-carbon/70 mb-6">
                              {collection.theme}
                            </p>

                            {/* Philosophy */}
                            <div className="mb-8 p-4 bg-carbon/5 border-l-2 border-thread-red">
                              <p className="text-sm italic">
                                "{collection.philosophy}"
                              </p>
                            </div>

                            {/* Metadata Grid */}
                            <div className="grid grid-cols-3 gap-4 text-xs">
                              <div>
                                <span className="block text-carbon/50 uppercase tracking-wider mb-1">
                                  Looks
                                </span>
                                <span className="text-lg font-bold">{collection.lookCount}</span>
                              </div>
                              <div>
                                <span className="block text-carbon/50 uppercase tracking-wider mb-1">
                                  Location
                                </span>
                                <span className="text-sm">{collection.location}</span>
                              </div>
                              <div>
                                <span className="block text-carbon/50 uppercase tracking-wider mb-1">
                                  Palette
                                </span>
                                <div className="flex gap-1">
                                  {collection.colors.slice(0, 4).map((color, i) => (
                                    <div
                                      key={i}
                                      className="w-4 h-4 border border-carbon/20"
                                      style={{ backgroundColor: color }}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* View Collection Button */}
                            <MagneticButton strength={0.3}>
                              <button
                                onClick={() => setSelectedCollection(collection)}
                                className="mt-8 px-6 py-3 bg-carbon text-raw-white hover:bg-thread-red transition-colors w-full"
                              >
                                View Full Collection
                              </button>
                            </MagneticButton>
                          </div>
                        </Card3D>
                      </motion.div>

                      {/* Visual Grid */}
                      <div className={`${index % 2 !== 0 ? 'md:order-1' : ''}`}>
                        <div className="grid grid-cols-4 gap-2">
                          {Array.from({ length: 16 }).map((_, i) => (
                            <FabricDrag key={i}>
                              <motion.div
                                className="aspect-square bg-gradient-to-br from-carbon/10 to-carbon/30 relative group cursor-grab"
                                whileHover={{ scale: 1.1, zIndex: 10 }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.02 }}
                              >
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-2xl font-black text-raw-white/20">
                                    {String(i + 1).padStart(2, '0')}
                                  </span>
                                </div>
                                <div className="absolute inset-0 bg-thread-red opacity-0 group-hover:opacity-30 transition-opacity" />
                              </motion.div>
                            </FabricDrag>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Exposed Seam Decoration */}
                    <div className="absolute -top-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-thread-red to-transparent opacity-50" />
                  </motion.div>
                </RevealOnScroll>
              ))}
            </div>
          )}

          {/* MASONRY VIEW */}
          {viewMode === 'MASONRY' && (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredCollections.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  className="break-inside-avoid"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className="material-paper hover:material-fabric transition-all cursor-pointer group"
                    onClick={() => setSelectedCollection(collection)}
                  >
                    {/* Random height visual */}
                    <div
                      className="bg-gradient-to-b from-carbon/5 to-carbon/20 relative overflow-hidden"
                      style={{ height: `${300 + (index % 3) * 150}px` }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h3 className="text-3xl font-black text-carbon/10 group-hover:text-carbon/30 transition-colors transform group-hover:scale-110 transition-transform">
                          {collection.title}
                        </h3>
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-thread-red opacity-0 group-hover:opacity-10 transition-opacity" />

                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`
                          px-2 py-1 text-xs font-mono backdrop-blur-sm
                          ${collection.status === 'CURRENT'
                            ? 'bg-raw-white/90 text-carbon'
                            : collection.status === 'UPCOMING'
                            ? 'bg-thread-red/90 text-raw-white'
                            : 'bg-carbon/90 text-raw-white'}
                        `}>
                          {collection.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="text-xs font-mono text-carbon/50 mb-2">
                        {collection.season}{collection.year} • {collection.lookCount} LOOKS
                      </div>
                      <p className="text-sm text-carbon/70">
                        {collection.theme}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* TIMELINE VIEW */}
          {viewMode === 'TIMELINE' && (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-thread-red via-carbon/20 to-thread-white" />

              <div className="space-y-24">
                {filteredCollections
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((collection, index) => (
                  <motion.div
                    key={collection.id}
                    className="relative"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    {/* Timeline Node */}
                    <motion.div
                      className="absolute left-1/2 transform -translate-x-1/2"
                      whileHover={{ scale: 1.5 }}
                    >
                      <div className={`
                        w-6 h-6 rounded-full border-2 bg-raw-white
                        ${collection.status === 'CURRENT'
                          ? 'border-thread-red animate-pulse'
                          : collection.status === 'UPCOMING'
                          ? 'border-thread-white'
                          : 'border-carbon'}
                      `} />
                    </motion.div>

                    {/* Content */}
                    <div className={`
                      grid md:grid-cols-2 gap-8
                      ${index % 2 === 0 ? '' : 'md:[&>*:first-child]:order-2'}
                    `}>
                      {/* Text Content */}
                      <div className={`${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                        <div className="exposed-seam bg-raw-white p-8">
                          <span className="text-xs font-mono text-carbon/50">
                            {collection.date}
                          </span>
                          <h3 className="text-3xl font-black mt-2 mb-4">
                            {collection.title}
                          </h3>
                          <p className="text-carbon/70 mb-4">
                            {collection.theme}
                          </p>
                          <MagneticButton strength={0.2}>
                            <button
                              onClick={() => setSelectedCollection(collection)}
                              className="text-sm underline hover:text-thread-red transition-colors"
                            >
                              Explore Collection →
                            </button>
                          </MagneticButton>
                        </div>
                      </div>

                      {/* Visual Preview */}
                      <div>
                        <ParallaxContainer offset={30}>
                          <div className="grid grid-cols-3 gap-1">
                            {Array.from({ length: 9 }).map((_, i) => (
                              <div
                                key={i}
                                className="aspect-[3/4] bg-gradient-to-b from-carbon/10 to-carbon/30"
                              />
                            ))}
                          </div>
                        </ParallaxContainer>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* SPLICED VIEW - Sacai Inspired */}
          {viewMode === 'SPLICED' && (
            <div className="space-y-4">
              {filteredCollections.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  className="relative"
                  initial={{ opacity: 0, scaleX: 0.8 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="hybrid-split bg-raw-white hover:bg-carbon/5 transition-colors cursor-pointer"
                    onClick={() => setSelectedCollection(collection)}
                  >
                    <div className="flex items-stretch">
                      {/* Spliced Visual Grid */}
                      <div className="w-1/3 relative overflow-hidden">
                        <div className="absolute inset-0 grid grid-cols-6 gap-px">
                          {Array.from({ length: 24 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="bg-gradient-to-br from-carbon/10 to-carbon/30"
                              whileHover={{ scale: 2, zIndex: 10 }}
                              transition={{ type: 'spring', stiffness: 300 }}
                            />
                          ))}
                        </div>
                        {/* Diagonal Split Line */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: 'linear-gradient(135deg, transparent 49%, rgba(255,0,0,0.5) 50%, transparent 51%)'
                          }}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-grow p-8">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs font-mono text-carbon/50">
                              {collection.season}{collection.year} | {collection.location}
                            </span>
                            <h3 className="text-3xl font-black mt-2">
                              <DistortionText text={collection.title} />
                            </h3>
                            <p className="text-carbon/70 mt-2 max-w-2xl">
                              {collection.philosophy}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className={`
                              px-3 py-1 text-xs font-mono inline-block
                              ${collection.status === 'CURRENT'
                                ? 'bg-thread-white text-carbon'
                                : collection.status === 'UPCOMING'
                                ? 'bg-thread-red text-raw-white'
                                : 'bg-carbon/10 text-carbon'}
                            `}>
                              {collection.status}
                            </div>
                            <div className="text-2xl font-bold mt-2">
                              {collection.lookCount}
                            </div>
                            <div className="text-xs text-carbon/50">LOOKS</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ==========================================================================
         COLLECTION DETAIL MODAL - Full Screen Gallery
         ========================================================================== */}

      <AnimatePresence>
        {selectedCollection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-carbon/95 backdrop-blur-xl z-50 overflow-auto"
            onClick={() => setSelectedCollection(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotateX: -5 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateX: 5 }}
              className="min-h-screen py-16 px-8"
              onClick={e => e.stopPropagation()}
              style={{ perspective: '1000px' }}
            >
              <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-raw-white p-8 md:p-12 relative">
                  <div className="absolute inset-0 exposed-seam pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-xs font-mono text-carbon/50">
                            {selectedCollection.season}{selectedCollection.year}
                          </span>
                          <span className="text-xs font-mono text-carbon/50">|</span>
                          <span className="text-xs font-mono text-carbon/50">
                            {selectedCollection.date}
                          </span>
                          <span className={`
                            px-3 py-1 text-xs font-mono
                            ${selectedCollection.status === 'CURRENT'
                              ? 'bg-thread-white text-carbon'
                              : selectedCollection.status === 'UPCOMING'
                              ? 'bg-thread-red text-raw-white'
                              : 'bg-carbon/20 text-carbon'}
                          `}>
                            {selectedCollection.status}
                          </span>
                        </div>
                        <h2 className="text-5xl font-black mb-4">
                          <SplitText text={selectedCollection.title} delay={0.03} />
                        </h2>
                        <p className="text-xl text-carbon/70 max-w-3xl">
                          {selectedCollection.theme}
                        </p>
                      </div>
                      <MagneticButton strength={0.5}>
                        <button
                          onClick={() => setSelectedCollection(null)}
                          className="text-4xl hover:text-thread-red transition-colors p-2"
                        >
                          ×
                        </button>
                      </MagneticButton>
                    </div>

                    {/* Metadata Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 py-8 border-t border-carbon/10">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-carbon/50 block mb-1">
                          Total Looks
                        </span>
                        <span className="text-2xl font-bold">{selectedCollection.lookCount}</span>
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider text-carbon/50 block mb-1">
                          Location
                        </span>
                        <span className="text-sm">{selectedCollection.location}</span>
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider text-carbon/50 block mb-1">
                          Season
                        </span>
                        <span className="text-sm">{selectedCollection.season} {selectedCollection.year}</span>
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider text-carbon/50 block mb-1">
                          Color Palette
                        </span>
                        <div className="flex gap-1">
                          {selectedCollection.colors.map((color, i) => (
                            <motion.div
                              key={i}
                              className="w-6 h-6 border border-carbon/20"
                              style={{ backgroundColor: color }}
                              whileHover={{ scale: 1.2 }}
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs uppercase tracking-wider text-carbon/50 block mb-1">
                          Philosophy
                        </span>
                        <span className="text-xs italic line-clamp-2">
                          {selectedCollection.philosophy}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lookbook Grid */}
                <div className="mt-8 bg-raw-white p-8">
                  <h3 className="text-xs uppercase tracking-widest text-carbon/50 mb-6">
                    Complete Visual Archive
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {Array.from({ length: selectedCollection.lookCount }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: Math.min(i * 0.03, 0.5),
                          type: 'spring',
                          stiffness: 100
                        }}
                      >
                        <FabricDrag>
                          <div className="aspect-[3/4] bg-gradient-to-b from-carbon/10 to-carbon/40 relative overflow-hidden group cursor-grab">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-5xl font-black text-raw-white/10">
                                {String(i + 1).padStart(3, '0')}
                              </span>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-carbon/90 text-raw-white text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                              LOOK_{String(i + 1).padStart(3, '0')}_{selectedCollection.id.toUpperCase()}
                            </div>
                            <div className="absolute inset-0 bg-thread-red opacity-0 group-hover:opacity-20 transition-opacity" />
                          </div>
                        </FabricDrag>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Footer Note */}
                <div className="mt-8 bg-carbon text-raw-white p-8 text-center">
                  <p className="text-sm font-light">
                    This collection exists as pure artistic expression.
                    No commerce, no sales, only visual philosophy and experimental documentation.
                  </p>
                  <p className="text-xs mt-4 text-raw-white/50 font-mono">
                    CINCH LAB — EXPERIMENTAL FASHION LABORATORY
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================================================
         PHILOSOPHY SECTION
         ========================================================================== */}

      <ParallaxContainer offset={50}>
        <section className="py-24 px-8 bg-gradient-to-b from-raw-white to-carbon text-raw-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h3
              className="text-4xl font-black mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <DistortionText text="NO COMMERCE" className="text-thread-red" />
            </motion.h3>
            <motion.p
              className="text-xl mb-12 text-raw-white/80 font-light"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              These collections are not for sale. They exist as documentation of our experimental journey,
              a visual philosophy that rejects commercial constraints. We create to explore, not to sell.
            </motion.p>

            <MagneticButton strength={0.4}>
              <motion.button
                className="px-8 py-4 bg-raw-white text-carbon hover:bg-thread-red hover:text-raw-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enter The Archive
              </motion.button>
            </MagneticButton>
          </div>
        </section>
      </ParallaxContainer>
    </div>
  )
}