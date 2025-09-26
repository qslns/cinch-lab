'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { collections, getCurrentCollections, getArchivedCollections, type Collection } from '@/data/collections'
import CipherText from '@/components/CipherText'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CollectionsPage() {
  const [selectedCollection, setSelectedCollection] = useState<Collection | null>(null)
  const [viewMode, setViewMode] = useState<'GALLERY' | 'TIMELINE' | 'ARCHIVE'>('GALLERY')
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'CURRENT' | 'ARCHIVED'>('ALL')
  const [lookbookView, setLookbookView] = useState<'GRID' | 'RUNWAY' | 'EDITORIAL'>('GRID')
  const [systemStatus, setSystemStatus] = useState('LOADING_VISUALS')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Parallax transforms
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const scaleParallax = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1])

  useEffect(() => {
    // System status simulation
    const statusInterval = setInterval(() => {
      const statuses = ['LOADING_VISUALS', 'PROCESSING_LOOKS', 'RENDERING_STYLES', 'CURATING_AESTHETIC']
      setSystemStatus(statuses[Math.floor(Math.random() * statuses.length)])
    }, 4000)

    // GSAP animations
    const ctx = gsap.context(() => {
      gsap.from('.collection-card', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power4.out'
      })

      gsap.from('.lookbook-item', {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3,
        ease: 'power3.out'
      })
    })

    return () => {
      clearInterval(statusInterval)
      ctx.revert()
    }
  }, [])

  const filteredCollections = collections.filter(col => {
    if (filterStatus === 'ALL') return true
    if (filterStatus === 'CURRENT') return col.status === 'CURRENT'
    if (filterStatus === 'ARCHIVED') return col.status === 'ARCHIVED'
    return true
  })

  const renderGalleryView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredCollections.map((col, index) => (
        <motion.div
          key={col.id}
          className="collection-card relative group cursor-pointer"
          onClick={() => setSelectedCollection(col)}
          whileHover={{ y: -10 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="bg-white border-4 border-carbon-black hover:border-safety-orange transition-all overflow-hidden">
            {/* Collection Image Placeholder */}
            <div className="relative h-64 bg-gradient-to-br from-concrete-gray to-carbon-black">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-6xl font-black text-white/20">{col.code}</h3>
                  <p className="text-xs font-mono text-white/40 mt-2">{col.season} {col.year}</p>
                </div>
              </div>
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 text-xs font-mono font-bold ${
                  col.status === 'CURRENT' ? 'bg-hazmat-green text-carbon-black' :
                  col.status === 'UPCOMING' ? 'bg-safety-orange text-white' :
                  'bg-carbon-black text-white'
                }`}>
                  {col.status}
                </span>
              </div>
            </div>

            {/* Collection Info */}
            <div className="p-6">
              <h3 className="text-2xl font-black mb-2">
                <CipherText text={col.title} />
              </h3>
              <p className="text-sm opacity-60 mb-4">{col.subtitle}</p>
              <p className="text-xs leading-relaxed mb-6 opacity-80">
                {col.description}
              </p>

              {/* Collection Stats */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-mono opacity-60">LOOKS:</span>
                  <span className="font-bold">{col.lookbook.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="font-mono opacity-60">TECHNIQUES:</span>
                  <span className="font-bold">{col.techniques.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="font-mono opacity-60">MATERIALS:</span>
                  <span className="font-bold">{col.materials.length}</span>
                </div>
              </div>

              {/* Release Date */}
              <div className="mt-6 pt-4 border-t border-carbon-black/10">
                <p className="text-[10px] font-mono opacity-60">
                  RELEASE: {col.releaseDate}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderTimelineView = () => (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20" />

      {filteredCollections.map((col, index) => (
        <motion.div
          key={col.id}
          className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-20`}
          initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Timeline Node */}
          <div className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-safety-orange border-2 border-white" />

          {/* Year Label */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-8">
            <span className="text-2xl font-black text-white">{col.year}</span>
          </div>

          {/* Content Card */}
          <div
            className={`w-5/12 p-8 bg-white border-3 border-carbon-black cursor-pointer hover:border-safety-orange transition-all ${
              index % 2 === 0 ? 'mr-auto' : 'ml-auto'
            }`}
            onClick={() => setSelectedCollection(col)}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-3xl font-black">{col.code}</h3>
              <span className={`px-2 py-1 text-xs font-mono font-bold ${
                col.status === 'CURRENT' ? 'bg-hazmat-green text-carbon-black' :
                col.status === 'UPCOMING' ? 'bg-safety-orange text-white' :
                'bg-carbon-black text-white'
              }`}>
                {col.status}
              </span>
            </div>
            <h4 className="text-xl font-bold mb-2">{col.title}</h4>
            <p className="text-sm opacity-60 mb-4">{col.subtitle}</p>
            <p className="text-xs mb-6">{col.description}</p>
            <div className="text-[10px] font-mono opacity-60">
              {col.season} • {col.lookbook.length} LOOKS
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderArchiveView = () => (
    <div className="bg-white">
      <table className="w-full">
        <thead className="bg-carbon-black text-white">
          <tr>
            <th className="p-4 text-left text-xs font-mono">CODE</th>
            <th className="p-4 text-left text-xs font-mono">TITLE</th>
            <th className="p-4 text-left text-xs font-mono">SEASON</th>
            <th className="p-4 text-left text-xs font-mono">YEAR</th>
            <th className="p-4 text-left text-xs font-mono">LOOKS</th>
            <th className="p-4 text-left text-xs font-mono">STATUS</th>
            <th className="p-4 text-left text-xs font-mono">PHILOSOPHY</th>
          </tr>
        </thead>
        <tbody>
          {filteredCollections.map((col, index) => (
            <motion.tr
              key={col.id}
              className="border-b border-carbon-black/10 hover:bg-paper-white cursor-pointer transition-colors"
              onClick={() => setSelectedCollection(col)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <td className="p-4 font-bold">{col.code}</td>
              <td className="p-4 text-sm">{col.title}</td>
              <td className="p-4 text-xs font-mono">{col.season}</td>
              <td className="p-4 text-xs">{col.year}</td>
              <td className="p-4 text-xs">{col.lookbook.length}</td>
              <td className="p-4">
                <span className={`text-xs font-mono ${
                  col.status === 'CURRENT' ? 'text-hazmat-green' :
                  col.status === 'UPCOMING' ? 'text-safety-orange' :
                  'text-gray-600'
                }`}>
                  {col.status}
                </span>
              </td>
              <td className="p-4 text-xs italic opacity-60 max-w-xs">
                {col.philosophy.substring(0, 50)}...
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-carbon-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 scientific-grid opacity-10 pointer-events-none" />
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ scale: scaleParallax }}
      >
        <div className="absolute top-1/3 left-1/3 w-96 h-96 border border-white/5 rotate-45" />
      </motion.div>

      {/* Header */}
      <section className="relative py-24 px-8">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          style={{ y: yParallax }}
        >
          <h1 className="text-[clamp(60px,10vw,180px)] font-black mb-8 leading-[0.85]">
            <CipherText text="COLLECTIONS" />
          </h1>
          <p className="text-sm font-mono opacity-60 mb-8">
            VISUAL ARCHIVES • NO COMMERCE • PURE AESTHETICS
          </p>

          {/* Status Display */}
          <div className="flex items-center justify-center gap-8 mb-12">
            <div className="text-xs font-mono">
              <span className="opacity-60">STATUS:</span>
              <span className="ml-2 text-hazmat-green">{systemStatus}</span>
            </div>
            <div className="text-xs font-mono">
              <span className="opacity-60">COLLECTIONS:</span>
              <span className="ml-2">{collections.length}</span>
            </div>
            <div className="text-xs font-mono">
              <span className="opacity-60">TOTAL_LOOKS:</span>
              <span className="ml-2">{collections.reduce((acc, col) => acc + col.lookbook.length, 0)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* View Mode */}
            <div className="flex gap-2">
              {(['GALLERY', 'TIMELINE', 'ARCHIVE'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 text-xs font-mono transition-all ${
                    viewMode === mode
                      ? 'bg-white text-carbon-black'
                      : 'bg-transparent text-white/60 hover:text-white border border-white/20'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              {(['ALL', 'CURRENT', 'ARCHIVED'] as const).map(filter => (
                <button
                  key={filter}
                  onClick={() => setFilterStatus(filter)}
                  className={`px-4 py-2 text-xs font-mono transition-all ${
                    filterStatus === filter
                      ? 'bg-safety-orange text-carbon-black'
                      : 'bg-transparent text-white/60 hover:text-white border border-white/20'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Collections Display */}
      <section className="px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          {viewMode === 'GALLERY' && renderGalleryView()}
          {viewMode === 'TIMELINE' && renderTimelineView()}
          {viewMode === 'ARCHIVE' && renderArchiveView()}
        </div>
      </section>

      {/* Collection Detail Modal - Lookbook Viewer */}
      <AnimatePresence>
        {selectedCollection && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCollection(null)}
              className="fixed inset-0 bg-carbon-black/95 z-50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-8 md:inset-16 bg-white text-carbon-black z-50 overflow-auto"
            >
              <div className="min-h-full">
                {/* Modal Header */}
                <div className="sticky top-0 bg-carbon-black text-white p-8 z-10">
                  <div className="max-w-7xl mx-auto">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-5xl font-black mb-2">{selectedCollection.code}</h2>
                        <h3 className="text-2xl mb-2">{selectedCollection.title}</h3>
                        <p className="text-sm opacity-60">{selectedCollection.subtitle}</p>
                      </div>
                      <button
                        onClick={() => setSelectedCollection(null)}
                        className="w-12 h-12 flex items-center justify-center bg-white text-carbon-black hover:bg-glitch-red hover:text-white transition-colors"
                      >
                        <span className="text-2xl">×</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8 md:p-12">
                  <div className="max-w-7xl mx-auto">
                    {/* Collection Info */}
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                      <div className="md:col-span-2">
                        <h4 className="text-lg font-black mb-4">COLLECTION_PHILOSOPHY</h4>
                        <p className="text-lg leading-relaxed mb-6">{selectedCollection.description}</p>
                        <p className="italic opacity-80">{selectedCollection.philosophy}</p>
                      </div>
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-xs font-mono font-black mb-3">TECHNIQUES</h4>
                          <div className="space-y-1">
                            {selectedCollection.techniques.map((tech, i) => (
                              <div key={i} className="text-sm">
                                <span className="text-safety-orange mr-2">■</span>
                                {tech}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-mono font-black mb-3">MATERIALS</h4>
                          <div className="space-y-1">
                            {selectedCollection.materials.map((mat, i) => (
                              <div key={i} className="text-sm">
                                <span className="text-safety-orange mr-2">■</span>
                                {mat}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Lookbook View Controls */}
                    <div className="flex gap-2 mb-8">
                      {(['GRID', 'RUNWAY', 'EDITORIAL'] as const).map(view => (
                        <button
                          key={view}
                          onClick={() => setLookbookView(view)}
                          className={`px-4 py-2 text-xs font-mono transition-all ${
                            lookbookView === view
                              ? 'bg-carbon-black text-white'
                              : 'bg-transparent text-carbon-black border border-carbon-black'
                          }`}
                        >
                          {view}_VIEW
                        </button>
                      ))}
                    </div>

                    {/* Lookbook Display */}
                    <div className="mb-12">
                      <h4 className="text-lg font-black mb-6">LOOKBOOK</h4>

                      {lookbookView === 'GRID' && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {selectedCollection.lookbook.map((look) => (
                            <motion.div
                              key={look.id}
                              className="lookbook-item group cursor-pointer"
                              whileHover={{ scale: 1.05 }}
                            >
                              <div className="aspect-[3/4] bg-gradient-to-b from-concrete-gray to-carbon-black relative overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="text-center text-white">
                                    <p className="text-6xl font-black opacity-20">
                                      {look.id.split('_')[1]}
                                    </p>
                                  </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-carbon-black/90 to-transparent">
                                  <h5 className="text-sm font-bold text-white">{look.title}</h5>
                                  <p className="text-xs text-white/60">{look.description}</p>
                                </div>
                                <div className="absolute inset-0 bg-safety-orange opacity-0 group-hover:opacity-20 transition-opacity" />
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {lookbookView === 'RUNWAY' && (
                        <div className="space-y-8">
                          {selectedCollection.lookbook.map((look, index) => (
                            <motion.div
                              key={look.id}
                              className="flex items-center gap-8"
                              initial={{ opacity: 0, x: -50 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="w-1/3 aspect-[3/4] bg-gradient-to-b from-concrete-gray to-carbon-black relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <p className="text-6xl font-black text-white/20">
                                    {look.id.split('_')[1]}
                                  </p>
                                </div>
                              </div>
                              <div className="flex-1">
                                <h5 className="text-2xl font-black mb-2">{look.title}</h5>
                                <p className="text-sm opacity-80">{look.description}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      {lookbookView === 'EDITORIAL' && (
                        <div className="grid grid-cols-1 gap-12">
                          {selectedCollection.lookbook.map((look) => (
                            <div key={look.id} className="text-center">
                              <div className="aspect-[16/9] bg-gradient-to-r from-concrete-gray via-carbon-black to-concrete-gray relative mb-6">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div>
                                    <p className="text-8xl font-black text-white/10">
                                      {look.id.split('_')[1]}
                                    </p>
                                    <h5 className="text-3xl font-black text-white mt-4">
                                      {look.title}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                              <p className="text-lg italic opacity-80 max-w-2xl mx-auto">
                                {look.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Collection Details */}
                    <div className="border-t-2 border-carbon-black pt-8">
                      <div className="flex justify-between text-xs font-mono opacity-60">
                        <span>SEASON: {selectedCollection.season} {selectedCollection.year}</span>
                        <span>STATUS: {selectedCollection.status}</span>
                        <span>RELEASE: {selectedCollection.releaseDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer Status */}
      <div className="fixed bottom-0 left-0 right-0 bg-carbon-black/80 backdrop-blur-sm border-t border-white/10 p-4 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-[10px] font-mono opacity-60">
            CINCH_LAB_COLLECTIONS • VISUAL_ARCHIVE • NO_SALES
          </p>
          <div className="flex gap-4">
            <span className="text-[10px] font-mono opacity-60">
              CURRENT: {getCurrentCollections().length}
            </span>
            <span className="text-[10px] font-mono opacity-60">
              ARCHIVED: {getArchivedCollections().length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}