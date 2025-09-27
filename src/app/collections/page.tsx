'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  DeconstructedHover,
  SacaiLayer,
  FragmentMosaic,
  ExposedStructure,
  AsymmetricTransform
} from '@/components/HybridLayerEffects'

// Collection data
const collections = [
  {
    line: '00',
    title: 'ARTISANAL',
    season: 'SS24',
    status: 'ARCHIVED',
    pieces: 47,
    philosophy: 'Deconstruction of the garment, reconstruction of the soul',
    techniques: ['Hand Stitching', 'Raw Edges', 'Exposed Seams'],
    lookbook: ['001', '002', '003', '004', '005', '006', '007', '008']
  },
  {
    line: '01',
    title: 'READY-TO-WEAR',
    season: 'FW24',
    status: 'CURRENT',
    pieces: 82,
    philosophy: 'Hybrid forms, layered identities, volume manipulation',
    techniques: ['Splicing', 'Overlay', 'Asymmetric Construction'],
    lookbook: ['009', '010', '011', '012', '013', '014', '015', '016']
  },
  {
    line: '10',
    title: 'MENS',
    season: 'SS25',
    status: 'UPCOMING',
    pieces: 65,
    philosophy: 'Masculinity deconstructed, tailoring reconstructed',
    techniques: ['Deconstruction', 'Restructuring', 'Pattern Disruption'],
    lookbook: ['017', '018', '019', '020', '021', '022', '023', '024']
  },
  {
    line: '11',
    title: 'ACCESSORIES',
    season: 'CONTINUOUS',
    status: 'CURRENT',
    pieces: 28,
    philosophy: 'Objects without purpose, beauty without function',
    techniques: ['3D Printing', 'Metal Forming', 'Leather Molding'],
    lookbook: ['025', '026', '027', '028', '029', '030', '031', '032']
  }
]

// Lookbook views
type ViewMode = 'FRAGMENTS' | 'LAYERS' | 'TIMELINE' | 'ARCHIVE'
type LookDisplay = 'GRID' | 'DECONSTRUCTED' | 'EDITORIAL'

export default function CollectionsPage() {
  const [selectedCollection, setSelectedCollection] = useState<typeof collections[0] | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('FRAGMENTS')
  const [lookDisplay, setLookDisplay] = useState<LookDisplay>('DECONSTRUCTED')
  const [hoveredLook, setHoveredLook] = useState<string | null>(null)
  const [isArchiveMode, setIsArchiveMode] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Transform values
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const rotateValue = useTransform(scrollYProgress, [0, 1], [0, 360])

  // Random deconstruction
  const [deconstructIndex, setDeconstructIndex] = useState(-1)
  useEffect(() => {
    const interval = setInterval(() => {
      setDeconstructIndex(Math.floor(Math.random() * collections.length))
      setTimeout(() => setDeconstructIndex(-1), 500)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const renderFragmentsView = () => (
    <div className="grid-sacai gap-0">
      {collections.map((col, index) => (
        <motion.div
          key={col.line}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`relative ${
            index === 0 ? 'col-span-6' :
            index === 1 ? 'col-span-4' :
            index === 2 ? 'col-span-5' :
            'col-span-3'
          }`}
          onMouseEnter={() => setSelectedCollection(col)}
          onMouseLeave={() => setSelectedCollection(null)}
        >
          <FragmentMosaic fragments={9}>
            <AsymmetricTransform intensity={1.5}>
              <div className={`
                p-8 bg-white-1 border-2 border-gray-plaster
                ${selectedCollection?.line === col.line ? 'border-black-100' : ''}
                transition-all duration-300
              `}>
                {/* Line Number - Margiela Style */}
                <div className="absolute -top-3 -left-3 bg-white-0 px-2 text-micro font-mono text-hybrid-red">
                  LINE_{col.line}
                </div>

                {/* Status */}
                <div className="absolute top-4 right-4">
                  <div className={`
                    w-2 h-2 rounded-full
                    ${col.status === 'CURRENT' ? 'bg-hybrid-blue animate-pulse' :
                      col.status === 'UPCOMING' ? 'bg-hybrid-red animate-pulse' :
                      'bg-gray-steel'}
                  `} />
                </div>

                {/* Content */}
                <div className={deconstructIndex === index ? 'text-deconstructed' : ''}>
                  <h3 className="text-2xl font-black mb-2">{col.title}</h3>
                  <div className="text-micro font-mono text-gray-steel mb-4">
                    {col.season} • {col.pieces} PIECES
                  </div>

                  {/* Philosophy Excerpt */}
                  <p className="text-xs italic opacity-60 mb-4">
                    "{col.philosophy}"
                  </p>

                  {/* Look Preview */}
                  <div className="flex gap-1">
                    {col.lookbook.slice(0, 4).map(look => (
                      <div
                        key={look}
                        className="w-8 h-10 bg-gray-plaster"
                      />
                    ))}
                    {col.lookbook.length > 4 && (
                      <div className="w-8 h-10 bg-black-100 text-white-0 flex items-center justify-center text-micro">
                        +{col.lookbook.length - 4}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AsymmetricTransform>
          </FragmentMosaic>
        </motion.div>
      ))}
    </div>
  )

  const renderLayersView = () => (
    <div className="space-y-8">
      {collections.map((col, index) => (
        <motion.div
          key={col.line}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.15 }}
          onClick={() => setSelectedCollection(col)}
          className="cursor-pointer"
        >
          <SacaiLayer layers={3} color1="hybrid-blue" color2="hybrid-red">
            <ExposedStructure showGrid={selectedCollection?.line === col.line}>
              <div className="p-12 bg-white-0 border-3 border-gray-plaster">
                <div className="flex items-start justify-between">
                  {/* Left Side - Info */}
                  <div className="flex-1">
                    <div className="text-micro font-mono text-hybrid-red mb-2">
                      COLLECTION_{col.line}
                    </div>
                    <h3 className="text-4xl font-black mb-4">{col.title}</h3>
                    <p className="text-lg mb-6">{col.philosophy}</p>

                    {/* Techniques */}
                    <div className="flex gap-4">
                      {col.techniques.map(tech => (
                        <span key={tech} className="text-xs px-3 py-1 border border-gray-plaster">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Side - Visual Grid */}
                  <div className="grid grid-cols-4 gap-2 ml-12">
                    {col.lookbook.map((look, i) => (
                      <motion.div
                        key={look}
                        className="w-16 h-20 bg-gradient-to-b from-gray-plaster to-gray-steel"
                        whileHover={{ scale: 1.1, zIndex: 10 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <div className="w-full h-full flex items-center justify-center text-white-0 text-xs font-mono">
                          {look}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Collection Meta */}
                  <div className="absolute top-4 right-4 text-micro font-mono text-gray-steel">
                    {col.season} | {col.status}
                  </div>
                </div>
              </div>
            </ExposedStructure>
          </SacaiLayer>
        </motion.div>
      ))}
    </div>
  )

  const renderTimelineView = () => (
    <div className="relative">
      {/* Central Timeline */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-plaster" />

      {collections.map((col, index) => (
        <motion.div
          key={col.line}
          className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-20`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          {/* Timeline Node */}
          <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-white-0 border-2 border-black-100 flex items-center justify-center">
            <span className="text-micro font-mono font-bold">{col.line}</span>
          </div>

          {/* Content Card */}
          <DeconstructedHover intensity={2}>
            <div
              className={`w-5/12 p-8 bg-white-1 border border-gray-plaster cursor-pointer hover:border-black-100 transition-all ${
                index % 2 === 0 ? 'mr-auto text-right' : 'ml-auto'
              }`}
              onClick={() => setSelectedCollection(col)}
            >
              <div className="text-micro font-mono text-hybrid-red mb-2">{col.season}</div>
              <h3 className="text-3xl font-black mb-3">{col.title}</h3>
              <p className="text-sm italic opacity-60 mb-4">{col.philosophy}</p>
              <div className="text-micro font-mono">
                {col.pieces} PIECES • {col.lookbook.length} LOOKS
              </div>
            </div>
          </DeconstructedHover>
        </motion.div>
      ))}
    </div>
  )

  const renderArchiveView = () => (
    <div className="bg-white-0 border-2 border-black-100">
      <table className="w-full">
        <thead className="bg-black-100 text-white-0">
          <tr>
            <th className="p-4 text-left text-micro font-mono">LINE</th>
            <th className="p-4 text-left text-micro font-mono">COLLECTION</th>
            <th className="p-4 text-left text-micro font-mono">SEASON</th>
            <th className="p-4 text-left text-micro font-mono">PIECES</th>
            <th className="p-4 text-left text-micro font-mono">LOOKS</th>
            <th className="p-4 text-left text-micro font-mono">STATUS</th>
            <th className="p-4 text-left text-micro font-mono">PHILOSOPHY</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((col, index) => (
            <motion.tr
              key={col.line}
              className="border-b border-gray-plaster hover:bg-gray-plaster/20 cursor-pointer transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedCollection(col)}
            >
              <td className="p-4 font-mono text-xs">{col.line}</td>
              <td className="p-4 font-bold">{col.title}</td>
              <td className="p-4 text-xs">{col.season}</td>
              <td className="p-4 text-xs">{col.pieces}</td>
              <td className="p-4 text-xs">{col.lookbook.length}</td>
              <td className="p-4">
                <span className={`text-micro font-mono ${
                  col.status === 'CURRENT' ? 'text-hybrid-blue' :
                  col.status === 'UPCOMING' ? 'text-hybrid-red' :
                  'text-gray-steel'
                }`}>
                  {col.status}
                </span>
              </td>
              <td className="p-4 text-xs italic opacity-60 max-w-xs truncate">
                {col.philosophy}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-white-0 relative">
      {/* Background Patterns */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 overlay-grid opacity-20" />
        <div className="absolute inset-0 overlay-muslin opacity-10" />
      </div>

      {/* Collection Status Bar */}
      <motion.div
        className="fixed top-20 left-0 right-0 z-40 bg-black-100 text-white-0 py-2"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between text-micro font-mono">
            <div className="flex items-center gap-6">
              <span>ARCHIVE_STATUS: {isArchiveMode ? 'ACTIVE' : 'BROWSING'}</span>
              <span className="opacity-60">|</span>
              <span>COLLECTIONS: {collections.length}</span>
              <span className="opacity-60">|</span>
              <span>TOTAL_LOOKS: {collections.reduce((acc, col) => acc + col.lookbook.length, 0)}</span>
            </div>
            <span>NO SALES • ONLY VISUALS</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="pt-32 pb-20">
        <div className="container-wide">
          {/* Page Title */}
          <ExposedStructure showMeasurements className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-micro font-mono text-hybrid-red mb-2">
                VISUAL_ARCHIVE / LOOKBOOK_DOCUMENTATION
              </div>
              <h1 className="text-display font-black tracking-tightest uppercase">
                <SacaiLayer layers={2}>
                  <span className={deconstructIndex === -2 ? 'text-deconstructed' : ''}>
                    COLLECTIONS
                  </span>
                </SacaiLayer>
              </h1>
              <div className="text-lg text-gray-steel mt-4 max-w-2xl">
                Visual documentation of experimental fashion. Every collection tells a story
                of deconstruction and reconstruction.
              </div>
            </motion.div>
          </ExposedStructure>

          {/* View Controls */}
          <motion.div
            className="mb-12 flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {(['FRAGMENTS', 'LAYERS', 'TIMELINE', 'ARCHIVE'] as ViewMode[]).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-4 py-2 text-xs font-mono transition-all ${
                  viewMode === mode
                    ? 'bg-black-100 text-white-0'
                    : 'bg-white-0 text-black-100 border border-gray-plaster hover:border-black-100'
                }`}
              >
                {mode}
              </button>
            ))}
          </motion.div>

          {/* Collections Display */}
          <div className="mb-20">
            {viewMode === 'FRAGMENTS' && renderFragmentsView()}
            {viewMode === 'LAYERS' && renderLayersView()}
            {viewMode === 'TIMELINE' && renderTimelineView()}
            {viewMode === 'ARCHIVE' && renderArchiveView()}
          </div>
        </div>
      </div>

      {/* Lookbook Modal */}
      <AnimatePresence>
        {selectedCollection && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCollection(null)}
              className="fixed inset-0 bg-black-100/90 z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-8 md:inset-16 bg-white-0 z-50 overflow-auto"
            >
              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-micro font-mono text-hybrid-red mb-2">
                      LINE_{selectedCollection.line}
                    </div>
                    <h2 className="text-5xl font-black mb-2">{selectedCollection.title}</h2>
                    <p className="text-lg italic opacity-60">{selectedCollection.philosophy}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCollection(null)}
                    className="w-12 h-12 bg-black-100 text-white-0 flex items-center justify-center hover:bg-hybrid-red transition-colors"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>

                {/* Lookbook Display Controls */}
                <div className="flex gap-2 mb-8">
                  {(['GRID', 'DECONSTRUCTED', 'EDITORIAL'] as LookDisplay[]).map(display => (
                    <button
                      key={display}
                      onClick={() => setLookDisplay(display)}
                      className={`px-3 py-1 text-xs font-mono ${
                        lookDisplay === display
                          ? 'bg-black-100 text-white-0'
                          : 'border border-gray-plaster'
                      }`}
                    >
                      {display}
                    </button>
                  ))}
                </div>

                {/* Lookbook */}
                {lookDisplay === 'GRID' && (
                  <div className="grid grid-cols-4 gap-4">
                    {selectedCollection.lookbook.map((look, i) => (
                      <motion.div
                        key={look}
                        className="aspect-[3/4] bg-gradient-to-b from-gray-plaster to-gray-steel relative group cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        onMouseEnter={() => setHoveredLook(look)}
                        onMouseLeave={() => setHoveredLook(null)}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl font-black text-white-0/30">
                            {look}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-hybrid-red opacity-0 group-hover:opacity-20 transition-opacity" />
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black-100/80 text-white-0 text-micro font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                          LOOK_{look}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {lookDisplay === 'DECONSTRUCTED' && (
                  <FragmentMosaic fragments={16}>
                    <div className="grid grid-cols-8 gap-0">
                      {selectedCollection.lookbook.map((look, i) => (
                        <div
                          key={look}
                          className="col-span-2 aspect-[3/4] bg-gradient-to-br from-white-1 to-gray-plaster border border-gray-plaster"
                        >
                          <div className="w-full h-full flex items-center justify-center text-2xl font-black text-gray-steel/50">
                            {look}
                          </div>
                        </div>
                      ))}
                    </div>
                  </FragmentMosaic>
                )}

                {lookDisplay === 'EDITORIAL' && (
                  <div className="space-y-12">
                    {selectedCollection.lookbook.map((look, i) => (
                      <motion.div
                        key={look}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <ExposedStructure showGrid>
                          <div className="aspect-[16/9] bg-gradient-to-r from-white-1 via-gray-plaster to-white-1 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-8xl font-black text-black-100/10 mb-4">
                                {look}
                              </div>
                              <div className="text-xs font-mono text-gray-steel">
                                LOOK {i + 1} OF {selectedCollection.lookbook.length}
                              </div>
                            </div>
                          </div>
                        </ExposedStructure>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scroll Progress */}
      <motion.div
        className="fixed bottom-8 right-8 text-micro font-mono"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
      >
        <div className="bg-white-0 border border-black-100 p-4">
          VISUAL_PROGRESS: {Math.round(scrollYProgress.get() * 100)}%
        </div>
      </motion.div>
    </div>
  )
}