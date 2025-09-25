'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import CipherText from '@/components/CipherText'

// Brutalist Collections Data
const collections = [
  {
    id: 'COL_001',
    code: 'SS25',
    title: 'MOLECULAR_DISRUPTION',
    status: 'ACTIVE',
    pieces: 47,
    material: 'SYNTHETIC_ORGANIC',
    danger: 4,
    year: 2025,
    season: 'SPRING',
    description: 'Fabric decomposition at atomic level. Exploring the boundaries between structure and chaos.',
    formula: 'C₁₀H₁₄N₂O',
    temperature: '1200°C'
  },
  {
    id: 'COL_002',
    code: 'FW24',
    title: 'STRUCTURAL_COLLAPSE',
    status: 'ARCHIVED',
    pieces: 39,
    material: 'CARBON_FIBER',
    danger: 3,
    year: 2024,
    season: 'FALL',
    description: 'Controlled demolition of traditional form. Architecture meets entropy.',
    formula: 'SiO₂ + Fe₂O₃',
    temperature: '800°C'
  },
  {
    id: 'COL_003',
    code: 'SS24',
    title: 'TEMPORAL_ANOMALY',
    status: 'ARCHIVED',
    pieces: 43,
    material: 'QUANTUM_MESH',
    danger: 5,
    year: 2024,
    season: 'SPRING',
    description: 'Time-shifting garments that exist in multiple dimensions simultaneously.',
    formula: 't → ∞',
    temperature: 'VARIABLE'
  },
  {
    id: 'COL_004',
    code: 'FW23',
    title: 'ENTROPY_MAXIMUM',
    status: 'ARCHIVED',
    pieces: 41,
    material: 'CHAOS_WEAVE',
    danger: 5,
    year: 2023,
    season: 'FALL',
    description: 'Order emerging from absolute disorder. Pattern recognition in noise.',
    formula: 'ΔS > 0',
    temperature: '2000°C'
  }
]

export default function BrutalistCollectionsPage() {
  const [viewMode, setViewMode] = useState<'MATRIX' | 'TIMELINE' | 'ARCHIVE'>('MATRIX')
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [systemStatus, setSystemStatus] = useState('SCANNING')
  const [glitchActive, setGlitchActive] = useState(false)

  // System status updates
  useEffect(() => {
    const statusTimer = setInterval(() => {
      const statuses = ['SCANNING', 'ANALYZING', 'PROCESSING', 'ARCHIVING']
      setSystemStatus(statuses[Math.floor(Math.random() * statuses.length)])

      if (Math.random() > 0.9) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      }
    }, 3000)
    return () => clearInterval(statusTimer)
  }, [])

  const selectedCol = collections.find(c => c.id === selectedCollection)

  return (
    <div className="min-h-screen bg-paper-white relative">
      {/* Background Effects */}
      <div className="fixed inset-0 scientific-grid opacity-20 pointer-events-none" />
      {glitchActive && <div className="fixed inset-0 noise-overlay" />}

      {/* Header Section */}
      <section className="pt-24 pb-8 px-8 border-b-3 border-carbon-black bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-[clamp(60px,8vw,140px)] font-black brutalist-heading leading-[0.7]">
                <CipherText text="COLL" /><br />
                <span className="text-safety-orange"><CipherText text="ECT" /></span><br />
                <CipherText text="IONS" />
              </h1>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono space-y-1">
                <div>TOTAL_PIECES: {collections.reduce((acc, c) => acc + c.pieces, 0)}</div>
                <div>COLLECTIONS: {collections.length}</div>
                <div>YEARS: 2022-2025</div>
                <div className={`${glitchActive ? 'text-glitch-red' : 'text-hazmat-green'}`}>
                  STATUS: {systemStatus}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* View Mode Selector */}
      <section className="py-4 px-8 bg-carbon-black">
        <div className="max-w-7xl mx-auto flex items-center gap-6">
          {(['MATRIX', 'TIMELINE', 'ARCHIVE'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 text-xs font-mono font-bold transition-all ${
                viewMode === mode
                  ? 'bg-white text-carbon-black'
                  : 'text-white opacity-60 hover:opacity-100'
              }`}
            >
              {mode}_VIEW
            </button>
          ))}
          <div className="ml-auto text-white text-[10px] font-mono opacity-60">
            LAST_UPDATE: {new Date().toISOString().split('T')[0]}
          </div>
        </div>
      </section>

      {/* Collections Display */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          {viewMode === 'MATRIX' && (
            <div className="brutalist-grid-asymmetric">
              {collections.map((col, index) => (
                <motion.div
                  key={col.id}
                  className={`relative group cursor-pointer ${
                    index % 3 === 0 ? 'col-span-2 row-span-2' : ''
                  }`}
                  style={{
                    gridColumn: index === 1 ? 'span 3' : undefined,
                    gridRow: index === 2 ? 'span 2' : undefined
                  }}
                  whileHover={{ scale: 0.98 }}
                  onClick={() => setSelectedCollection(col.id)}
                >
                  <div className={`h-full p-6 ${
                    col.status === 'ACTIVE' ? 'bg-white' : 'bg-concrete-gray text-white'
                  } border-3 border-carbon-black hover:border-safety-orange transition-colors`}>
                    {/* Collection Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[10px] font-mono opacity-60">{col.id}</span>
                        <h3 className="text-2xl font-black mt-1">{col.code}</h3>
                      </div>
                      <div className={`px-2 py-1 text-[10px] font-mono ${
                        col.status === 'ACTIVE'
                          ? 'bg-hazmat-green text-black'
                          : 'bg-carbon-black text-white'
                      }`}>
                        {col.status}
                      </div>
                    </div>

                    {/* Collection Title */}
                    <h4 className="text-lg font-bold mb-4 break-all">
                      {col.title}
                    </h4>

                    {/* Collection Stats */}
                    <div className="space-y-2 text-[10px] font-mono">
                      <div className="flex justify-between">
                        <span className="opacity-60">PIECES:</span>
                        <span>{col.pieces}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-60">MATERIAL:</span>
                        <span>{col.material}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-60">FORMULA:</span>
                        <span className="chemical-formula">{col.formula}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-60">DANGER:</span>
                        <div className="flex gap-[2px]">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 ${
                                i < col.danger
                                  ? col.danger > 3 ? 'bg-glitch-red' : 'bg-warning-yellow'
                                  : 'bg-gray-400'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-safety-orange pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {viewMode === 'TIMELINE' && (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-carbon-black" />

              {/* Timeline Items */}
              <div className="space-y-12">
                {collections.map((col, index) => (
                  <motion.div
                    key={col.id}
                    className="relative pl-20"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Timeline Node */}
                    <div className={`absolute left-6 w-4 h-4 ${
                      col.status === 'ACTIVE' ? 'bg-safety-orange' : 'bg-carbon-black'
                    } border-2 border-white`} />

                    {/* Content */}
                    <div
                      className="lab-border p-6 bg-white cursor-pointer hover:bg-paper-white transition-colors"
                      onClick={() => setSelectedCollection(col.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-4 mb-2">
                            <span className="text-3xl font-black">{col.code}</span>
                            <span className="text-xs font-mono opacity-60">
                              {col.season} {col.year}
                            </span>
                          </div>
                          <h4 className="text-xl font-bold mb-2">{col.title}</h4>
                          <p className="text-sm opacity-80 max-w-2xl">{col.description}</p>
                        </div>
                        <div className="text-right space-y-1 text-[10px] font-mono">
                          <div>{col.pieces} PIECES</div>
                          <div className="chemical-formula">{col.formula}</div>
                          <div>TEMP: {col.temperature}</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {viewMode === 'ARCHIVE' && (
            <div className="bg-carbon-black p-[2px]">
              <table className="w-full bg-white">
                <thead>
                  <tr className="border-b-2 border-carbon-black">
                    <th className="p-4 text-left text-xs font-mono">ID</th>
                    <th className="p-4 text-left text-xs font-mono">CODE</th>
                    <th className="p-4 text-left text-xs font-mono">TITLE</th>
                    <th className="p-4 text-left text-xs font-mono">YEAR</th>
                    <th className="p-4 text-left text-xs font-mono">PIECES</th>
                    <th className="p-4 text-left text-xs font-mono">STATUS</th>
                    <th className="p-4 text-left text-xs font-mono">DANGER</th>
                  </tr>
                </thead>
                <tbody>
                  {collections.map((col) => (
                    <tr
                      key={col.id}
                      className="border-b border-carbon-black/20 hover:bg-paper-white cursor-pointer transition-colors"
                      onClick={() => setSelectedCollection(col.id)}
                    >
                      <td className="p-4 text-xs font-mono">{col.id}</td>
                      <td className="p-4 text-sm font-bold">{col.code}</td>
                      <td className="p-4 text-xs">{col.title}</td>
                      <td className="p-4 text-xs">{col.year}</td>
                      <td className="p-4 text-xs">{col.pieces}</td>
                      <td className="p-4">
                        <span className={`text-[10px] font-mono ${
                          col.status === 'ACTIVE' ? 'text-hazmat-green' : 'text-gray-600'
                        }`}>
                          {col.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-[2px]">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 ${
                                i < col.danger
                                  ? 'bg-glitch-red'
                                  : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Collection Detail Modal */}
      <AnimatePresence>
        {selectedCollection && selectedCol && (
          <motion.div
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
          >
            <div className="min-h-screen bg-paper-white">
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-carbon-black text-white p-8">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                  <div>
                    <h2 className="text-4xl font-black">{selectedCol.code}</h2>
                    <p className="text-xs font-mono mt-1 opacity-60">{selectedCol.id}</p>
                  </div>
                  <button
                    onClick={() => setSelectedCollection(null)}
                    className="text-2xl hover:rotate-90 transition-transform duration-300"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Left Column */}
                  <div>
                    <h3 className="text-5xl font-black mb-6 break-all">{selectedCol.title}</h3>
                    <p className="text-lg mb-8">{selectedCol.description}</p>

                    <div className="space-y-4 p-6 bg-white lab-border">
                      <h4 className="text-xs font-mono font-bold mb-4">TECHNICAL_SPECIFICATIONS</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="opacity-60">MATERIAL:</span>
                          <span className="font-mono">{selectedCol.material}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-60">FORMULA:</span>
                          <span className="chemical-formula">{selectedCol.formula}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-60">TEMPERATURE:</span>
                          <span className="font-mono">{selectedCol.temperature}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-60">PIECES:</span>
                          <span className="font-mono">{selectedCol.pieces}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="opacity-60">DANGER_LEVEL:</span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-3 ${
                                  i < selectedCol.danger
                                    ? 'bg-glitch-red'
                                    : 'bg-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Lookbook Grid */}
                  <div>
                    <h4 className="text-xs font-mono font-bold mb-4">COLLECTION_ARCHIVE</h4>
                    <div className="grid grid-cols-3 gap-[2px] bg-carbon-black p-[2px]">
                      {[...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className="aspect-square bg-gradient-to-br from-concrete-gray to-carbon-black relative group overflow-hidden"
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white/20 text-4xl font-black">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-safety-orange opacity-0 group-hover:opacity-20 transition-opacity" />
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] font-mono opacity-60 mt-4">
                      FULL_LOOKBOOK_ACCESS_RESTRICTED
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-12">
                  <button className="brutalist-btn">
                    ACCESS_LOOKBOOK
                  </button>
                  <button className="brutalist-btn">
                    DOWNLOAD_SPECS
                  </button>
                  <Link href="/archive" className="brutalist-btn">
                    VIEW_ARCHIVE
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-carbon-black text-white p-2 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-mono">
          <span>COLLECTIONS_DATABASE_V2.0</span>
          <span>{systemStatus}...</span>
          <span>{new Date().toLocaleTimeString()}</span>
        </div>
      </footer>
    </div>
  )
}