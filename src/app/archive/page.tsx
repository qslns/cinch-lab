'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import CipherText from '@/components/CipherText'

// Archive Database Structure
const archiveDatabase = [
  {
    id: 'ARC_2025_001',
    year: 2025,
    month: 'JAN',
    title: 'MOLECULAR_DISRUPTION',
    type: 'COLLECTION',
    status: 'ACTIVE',
    experiments: 12,
    danger: 4,
    accessLevel: 'PUBLIC',
    data: '47 PIECES',
    temperature: '1200°C'
  },
  {
    id: 'ARC_2025_002',
    year: 2025,
    month: 'FEB',
    title: 'QUANTUM_TUNNELING',
    type: 'EXPERIMENT',
    status: 'IN_PROGRESS',
    experiments: 8,
    danger: 5,
    accessLevel: 'RESTRICTED',
    data: 'CLASSIFIED',
    temperature: 'ABSOLUTE_ZERO'
  },
  {
    id: 'ARC_2025_003',
    year: 2025,
    month: 'MAR',
    title: 'PARIS_EXHIBITION',
    type: 'EVENT',
    status: 'SCHEDULED',
    experiments: 0,
    danger: 1,
    accessLevel: 'PUBLIC',
    data: '300 ATTENDEES',
    temperature: 'AMBIENT'
  },
  {
    id: 'ARC_2024_001',
    year: 2024,
    month: 'NOV',
    title: 'STRUCTURAL_COLLAPSE',
    type: 'COLLECTION',
    status: 'ARCHIVED',
    experiments: 15,
    danger: 3,
    accessLevel: 'PUBLIC',
    data: '39 PIECES',
    temperature: '800°C'
  },
  {
    id: 'ARC_2024_002',
    year: 2024,
    month: 'JUL',
    title: 'TEMPORAL_ANOMALY',
    type: 'COLLECTION',
    status: 'ARCHIVED',
    experiments: 22,
    danger: 5,
    accessLevel: 'PUBLIC',
    data: '43 PIECES',
    temperature: 'VARIABLE'
  },
  {
    id: 'ARC_2024_003',
    year: 2024,
    month: 'MAY',
    title: 'NEURAL_INTERFACE',
    type: 'EXPERIMENT',
    status: 'FAILED',
    experiments: 18,
    danger: 5,
    accessLevel: 'CLASSIFIED',
    data: 'REDACTED',
    temperature: 'N/A'
  },
  {
    id: 'ARC_2023_001',
    year: 2023,
    month: 'DEC',
    title: 'ENTROPY_MAXIMUM',
    type: 'COLLECTION',
    status: 'ARCHIVED',
    experiments: 19,
    danger: 5,
    accessLevel: 'PUBLIC',
    data: '41 PIECES',
    temperature: '2000°C'
  },
  {
    id: 'ARC_2023_002',
    year: 2023,
    month: 'AUG',
    title: 'PARTICLE_STORM',
    type: 'COLLECTION',
    status: 'ARCHIVED',
    experiments: 14,
    danger: 2,
    accessLevel: 'PUBLIC',
    data: '38 PIECES',
    temperature: '500°C'
  }
]

// Statistics by year
const yearStats = {
  2025: { collections: 2, experiments: 47, events: 12, incidents: 3 },
  2024: { collections: 4, experiments: 68, events: 18, incidents: 7 },
  2023: { collections: 4, experiments: 52, events: 15, incidents: 4 },
  2022: { collections: 3, experiments: 41, events: 14, incidents: 2 },
  2021: { collections: 2, experiments: 35, events: 10, incidents: 1 }
}

export default function BrutalistArchivePage() {
  const [filter, setFilter] = useState<'ALL' | 'COLLECTION' | 'EXPERIMENT' | 'EVENT'>('ALL')
  const [yearFilter, setYearFilter] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'DATABASE' | 'TIMELINE' | 'MATRIX'>('DATABASE')
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null)
  const [systemStatus, setSystemStatus] = useState('ACCESSING_DATABASE')
  const [glitchActive, setGlitchActive] = useState(false)

  // System effects
  useEffect(() => {
    const statusTimer = setInterval(() => {
      const statuses = ['SCANNING_ARCHIVES', 'DECRYPTING_DATA', 'LOADING_RECORDS', 'VERIFYING_ACCESS']
      setSystemStatus(statuses[Math.floor(Math.random() * statuses.length)])

      if (Math.random() > 0.9) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 150)
      }
    }, 4000)
    return () => clearInterval(statusTimer)
  }, [])

  // Filter logic
  const filteredData = archiveDatabase.filter(item => {
    const matchesType = filter === 'ALL' || item.type === filter
    const matchesYear = !yearFilter || item.year === yearFilter
    const matchesSearch = !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesYear && matchesSearch
  })

  const selectedItem = archiveDatabase.find(item => item.id === selectedEntry)

  return (
    <div className="min-h-screen bg-carbon-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 scientific-grid opacity-10 pointer-events-none" />
      {glitchActive && <div className="fixed inset-0 noise-overlay" />}

      {/* Scan Lines */}
      <div className="fixed inset-0 scan-lines pointer-events-none" />

      {/* Header Terminal */}
      <header className="pt-24 pb-8 px-8 border-b-3 border-safety-orange">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-[clamp(50px,7vw,100px)] font-black brutalist-heading leading-[0.8]">
                <CipherText text="ARCHIVE" />
                <br />
                <span className="text-safety-orange"><CipherText text="DATABASE" /></span>
              </h1>
              <p className="text-xs font-mono mt-4 opacity-60">
                COMPLETE_EXPERIMENTAL_RECORDS // {archiveDatabase.length} ENTRIES
              </p>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono space-y-1 text-hazmat-green">
                <div>ACCESS_LEVEL: AUTHORIZED</div>
                <div>DATABASE_VERSION: 2.7.1</div>
                <div className={glitchActive ? 'text-glitch-red flicker' : ''}>
                  STATUS: {systemStatus}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Control Panel */}
      <section className="py-4 px-8 bg-paper-white text-carbon-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* View Mode */}
            <div className="md:col-span-3 flex gap-2">
              {(['DATABASE', 'TIMELINE', 'MATRIX'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-2 text-[10px] font-mono font-bold transition-all ${
                    viewMode === mode
                      ? 'bg-carbon-black text-white'
                      : 'border border-carbon-black hover:bg-gray-100'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Type Filter */}
            <div className="md:col-span-4 flex gap-2">
              {(['ALL', 'COLLECTION', 'EXPERIMENT', 'EVENT'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1 text-[10px] font-mono transition-all ${
                    filter === type
                      ? 'bg-safety-orange text-black font-bold'
                      : 'text-carbon-black/60 hover:text-carbon-black'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Year Filter */}
            <div className="md:col-span-2">
              <select
                value={yearFilter || ''}
                onChange={(e) => setYearFilter(e.target.value ? Number(e.target.value) : null)}
                className="w-full px-2 py-1 bg-transparent border border-carbon-black text-xs font-mono"
              >
                <option value="">ALL_YEARS</option>
                {Object.keys(yearStats).reverse().map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Search Terminal */}
            <div className="md:col-span-3">
              <div className="flex items-center bg-black text-hazmat-green px-3 py-2">
                <span className="text-[10px] font-mono mr-2">&gt;</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH..."
                  className="bg-transparent outline-none text-[10px] font-mono flex-1"
                />
                {searchQuery && <span className="animate-pulse">_</span>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-8 px-8">
        <div className="max-w-7xl mx-auto">
          {viewMode === 'DATABASE' && (
            <div className="bg-paper-white text-carbon-black">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-carbon-black bg-concrete-gray text-white">
                    <th className="p-3 text-left text-[10px] font-mono">ID</th>
                    <th className="p-3 text-left text-[10px] font-mono">DATE</th>
                    <th className="p-3 text-left text-[10px] font-mono">TITLE</th>
                    <th className="p-3 text-left text-[10px] font-mono">TYPE</th>
                    <th className="p-3 text-left text-[10px] font-mono">STATUS</th>
                    <th className="p-3 text-left text-[10px] font-mono">DANGER</th>
                    <th className="p-3 text-left text-[10px] font-mono">DATA</th>
                    <th className="p-3 text-left text-[10px] font-mono">ACCESS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      className="border-b border-carbon-black/20 hover:bg-yellow-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedEntry(item.id)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                    >
                      <td className="p-3 text-[10px] font-mono font-bold">{item.id}</td>
                      <td className="p-3 text-[10px] font-mono">{item.month} {item.year}</td>
                      <td className="p-3 text-xs font-bold">{item.title}</td>
                      <td className="p-3">
                        <span className={`text-[10px] font-mono px-2 py-1 ${
                          item.type === 'COLLECTION' ? 'bg-centrifuge-blue text-white' :
                          item.type === 'EXPERIMENT' ? 'bg-safety-orange text-black' :
                          'bg-concrete-gray text-white'
                        }`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`text-[10px] font-mono ${
                          item.status === 'ACTIVE' ? 'text-hazmat-green' :
                          item.status === 'FAILED' ? 'text-glitch-red' :
                          item.status === 'IN_PROGRESS' ? 'text-warning-yellow' :
                          'text-gray-600'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-[2px]">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 ${
                                i < item.danger
                                  ? item.danger > 3 ? 'bg-glitch-red' : 'bg-warning-yellow'
                                  : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="p-3 text-[10px] font-mono">
                        {item.accessLevel === 'CLASSIFIED' ?
                          <span className="text-glitch-red">REDACTED</span> :
                          item.data
                        }
                      </td>
                      <td className="p-3 text-[10px] font-mono">
                        {item.accessLevel === 'CLASSIFIED' ? '🔒' : '✓'}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {viewMode === 'TIMELINE' && (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-safety-orange" />

              {/* Timeline Entries */}
              <div className="space-y-8">
                {filteredData.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Node */}
                    <div className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 ${
                      item.status === 'ACTIVE' ? 'bg-hazmat-green' :
                      item.status === 'FAILED' ? 'bg-glitch-red' :
                      'bg-concrete-gray'
                    } border-2 border-white`} />

                    {/* Content Card */}
                    <div
                      className={`w-5/12 p-6 bg-white text-carbon-black lab-border cursor-pointer hover:bg-paper-white transition-colors ${
                        index % 2 === 0 ? 'mr-auto' : 'ml-auto'
                      }`}
                      onClick={() => setSelectedEntry(item.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-[10px] font-mono opacity-60">
                          {item.month} {item.year}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-1 ${
                          item.type === 'COLLECTION' ? 'bg-centrifuge-blue text-white' :
                          item.type === 'EXPERIMENT' ? 'bg-safety-orange' :
                          'bg-concrete-gray text-white'
                        }`}>
                          {item.type}
                        </span>
                      </div>
                      <h3 className="text-lg font-black mb-2">{item.title}</h3>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono">{item.data}</span>
                        <div className="flex gap-[2px]">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 ${
                                i < item.danger ? 'bg-glitch-red' : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {viewMode === 'MATRIX' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[2px] bg-carbon-black p-[2px]">
              {filteredData.map((item, index) => (
                <motion.div
                  key={item.id}
                  className={`p-4 cursor-pointer relative overflow-hidden group ${
                    item.status === 'ACTIVE' ? 'bg-white' :
                    item.status === 'FAILED' ? 'bg-glitch-red/10' :
                    'bg-concrete-gray'
                  }`}
                  onClick={() => setSelectedEntry(item.id)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02 }}
                  whileHover={{ scale: 0.98 }}
                >
                  <div className="text-[10px] font-mono opacity-60 mb-2">{item.id}</div>
                  <h4 className="text-sm font-bold mb-2 break-all">
                    {item.title}
                  </h4>
                  <div className="text-[10px] font-mono space-y-1">
                    <div>{item.month} {item.year}</div>
                    <div className={
                      item.status === 'ACTIVE' ? 'text-hazmat-green' :
                      item.status === 'FAILED' ? 'text-glitch-red' :
                      'text-carbon-black'
                    }>
                      {item.status}
                    </div>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-safety-orange opacity-0 group-hover:opacity-10 transition-opacity" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Statistics Panel */}
      <section className="py-8 px-8 bg-concrete-gray">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-black mb-6">STATISTICAL_ANALYSIS</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(yearStats).reverse().map(([year, stats]) => (
              <div key={year} className="bg-white text-carbon-black p-4">
                <h3 className="text-lg font-black mb-3">{year}</h3>
                <div className="space-y-1 text-[10px] font-mono">
                  <div className="flex justify-between">
                    <span>COLLECTIONS:</span>
                    <span>{stats.collections}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>EXPERIMENTS:</span>
                    <span>{stats.experiments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>EVENTS:</span>
                    <span>{stats.events}</span>
                  </div>
                  <div className="flex justify-between text-glitch-red">
                    <span>INCIDENTS:</span>
                    <span>{stats.incidents}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Entry Detail Modal */}
      <AnimatePresence>
        {selectedEntry && selectedItem && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedEntry(null)}
          >
            <motion.div
              className="bg-paper-white text-carbon-black max-w-2xl w-full p-8 lab-border"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-black mb-2">{selectedItem.title}</h2>
                  <p className="text-xs font-mono opacity-60">{selectedItem.id}</p>
                </div>
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="text-2xl hover:rotate-90 transition-transform"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-mono opacity-60">DATE</p>
                    <p className="font-bold">{selectedItem.month} {selectedItem.year}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono opacity-60">TYPE</p>
                    <p className="font-bold">{selectedItem.type}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono opacity-60">STATUS</p>
                    <p className={`font-bold ${
                      selectedItem.status === 'ACTIVE' ? 'text-hazmat-green' :
                      selectedItem.status === 'FAILED' ? 'text-glitch-red' :
                      'text-carbon-black'
                    }`}>
                      {selectedItem.status}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-[10px] font-mono opacity-60">EXPERIMENTS</p>
                    <p className="font-bold">{selectedItem.experiments}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono opacity-60">TEMPERATURE</p>
                    <p className="font-bold">{selectedItem.temperature}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono opacity-60">DANGER_LEVEL</p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 ${
                            i < selectedItem.danger
                              ? 'bg-glitch-red'
                              : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-carbon-black pt-4">
                <p className="text-[10px] font-mono opacity-60 mb-2">ACCESS_DATA</p>
                <div className="bg-black text-hazmat-green p-4 font-mono text-xs">
                  {selectedItem.accessLevel === 'CLASSIFIED' ? (
                    <div>
                      <span className="text-glitch-red">[ACCESS DENIED]</span>
                      <br />
                      CLASSIFICATION_LEVEL_INSUFFICIENT
                      <br />
                      CONTACT_ADMINISTRATOR_FOR_ACCESS
                    </div>
                  ) : (
                    <div>
                      DATA: {selectedItem.data}
                      <br />
                      ACCESS_LEVEL: {selectedItem.accessLevel}
                      <br />
                      LAST_MODIFIED: {new Date().toISOString()}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                {selectedItem.type === 'COLLECTION' && (
                  <Link href="/collections" className="brutalist-btn">
                    VIEW_COLLECTION
                  </Link>
                )}
                {selectedItem.type === 'EXPERIMENT' && (
                  <Link href="/lab" className="brutalist-btn">
                    ACCESS_LAB
                  </Link>
                )}
                <button className="brutalist-btn">
                  DOWNLOAD_REPORT
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Footer */}
      <footer className="py-4 px-8 bg-black border-t-3 border-safety-orange">
        <div className="max-w-7xl mx-auto font-mono text-[10px] text-hazmat-green">
          <div>&gt; ARCHIVE_DATABASE_V2.7.1</div>
          <div>&gt; {filteredData.length} RECORDS_FOUND</div>
          <div>&gt; SYSTEM_TIME: {new Date().toLocaleTimeString()}</div>
          <div className="flex items-center">
            <span>&gt; </span>
            <span className="ml-2 animate-pulse">_</span>
          </div>
        </div>
      </footer>
    </div>
  )
}