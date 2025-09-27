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

// Archive entries - philosophical records
const archiveEntries = [
  {
    id: '001',
    date: '2024.01.15',
    title: 'The Deconstruction Manifesto',
    category: 'PHILOSOPHY',
    content: 'Fashion is not about covering the body, but exposing the soul. Every seam we expose, every edge we leave raw, is a truth revealed.',
    tags: ['deconstruction', 'truth', 'raw edges'],
    status: 'FOUNDATIONAL'
  },
  {
    id: '002',
    date: '2024.02.03',
    title: 'Hybrid Forms: Beyond Binary',
    category: 'TECHNIQUE',
    content: 'When two garments become one, we transcend the limitations of singular identity. Layering is not addition; it is multiplication of meaning.',
    tags: ['hybrid', 'layering', 'identity'],
    status: 'EXPERIMENTAL'
  },
  {
    id: '003',
    date: '2024.03.21',
    title: 'The Failed Experiment',
    category: 'FAILURE',
    content: 'Today, the fabric refused to obey. The pattern collapsed. In this failure, we found a new form—chaos as creation.',
    tags: ['failure', 'chaos', 'discovery'],
    status: 'ARCHIVED'
  },
  {
    id: '004',
    date: '2024.04.07',
    title: 'Volume as Philosophy',
    category: 'CONCEPT',
    content: 'Space between body and fabric is not emptiness—it is potential. We design not clothes, but the air around them.',
    tags: ['volume', 'space', 'potential'],
    status: 'DEVELOPING'
  },
  {
    id: '005',
    date: '2024.05.15',
    title: 'Material Memory',
    category: 'MATERIAL',
    content: 'Every fabric remembers its origin. Cotton remembers the field, silk remembers the worm. We honor these memories by transformation.',
    tags: ['material', 'memory', 'transformation'],
    status: 'FOUNDATIONAL'
  },
  {
    id: '006',
    date: '2024.06.01',
    title: 'The Anonymous Designer',
    category: 'PHILOSOPHY',
    content: 'The creator disappears into the creation. We are not designers; we are mediums through which fashion speaks.',
    tags: ['anonymity', 'ego', 'medium'],
    status: 'CORE'
  },
  {
    id: '007',
    date: '2024.07.12',
    title: 'Reconstruction Ethics',
    category: 'PROCESS',
    content: 'To reconstruct is not to repair. It is to reimagine. Every broken piece becomes a new beginning.',
    tags: ['reconstruction', 'ethics', 'reimagination'],
    status: 'EXPERIMENTAL'
  },
  {
    id: '008',
    date: '2024.08.28',
    title: 'Digital Patterns, Physical Dreams',
    category: 'TECHNIQUE',
    content: 'The screen shows perfection, but the hand creates truth. We embrace the imperfection of human touch in digital age.',
    tags: ['digital', 'handmade', 'imperfection'],
    status: 'DEVELOPING'
  }
]

// Archive categories
const categories = ['ALL', 'PHILOSOPHY', 'TECHNIQUE', 'MATERIAL', 'PROCESS', 'FAILURE', 'CONCEPT']
const statusFilters = ['ALL', 'FOUNDATIONAL', 'EXPERIMENTAL', 'DEVELOPING', 'ARCHIVED', 'CORE']

type ViewMode = 'JOURNAL' | 'TIMELINE' | 'FRAGMENTS' | 'INDEX'

export default function ArchivePage() {
  const [selectedEntry, setSelectedEntry] = useState<typeof archiveEntries[0] | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('JOURNAL')
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [activeStatus, setActiveStatus] = useState('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [isWritingMode, setIsWritingMode] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Transform values
  const rotatePages = useTransform(scrollYProgress, [0, 1], [0, 180])
  const fadeIn = useTransform(scrollYProgress, [0, 0.2], [0, 1])

  // Filter entries
  const filteredEntries = archiveEntries.filter(entry => {
    const categoryMatch = activeCategory === 'ALL' || entry.category === activeCategory
    const statusMatch = activeStatus === 'ALL' || entry.status === activeStatus
    const searchMatch = searchTerm === '' ||
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase())
    return categoryMatch && statusMatch && searchMatch
  })

  // Random thought generator
  const [randomThought, setRandomThought] = useState('')
  useEffect(() => {
    const thoughts = [
      'Deconstruction is construction...',
      'The seam is the truth...',
      'Imperfection is intention...',
      'Volume creates void...',
      'Layers reveal depth...'
    ]
    const interval = setInterval(() => {
      setRandomThought(thoughts[Math.floor(Math.random() * thoughts.length)])
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const renderJournalView = () => (
    <div className="space-y-8">
      {filteredEntries.map((entry, index) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => setSelectedEntry(entry)}
          className="cursor-pointer"
        >
          <DeconstructedHover intensity={1.5}>
            <ExposedStructure showMeasurements={selectedEntry?.id === entry.id}>
              <div className="p-8 bg-white-1 border border-gray-plaster">
                {/* Entry Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-micro font-mono text-hybrid-red mb-2">
                      ENTRY_{entry.id} • {entry.date}
                    </div>
                    <h3 className="text-3xl font-black mb-2">{entry.title}</h3>
                    <div className="flex items-center gap-4">
                      <span className="text-xs px-2 py-1 bg-black-100 text-white-0">
                        {entry.category}
                      </span>
                      <span className={`text-micro font-mono ${
                        entry.status === 'FOUNDATIONAL' ? 'text-hybrid-blue' :
                        entry.status === 'EXPERIMENTAL' ? 'text-hybrid-red' :
                        'text-gray-steel'
                      }`}>
                        {entry.status}
                      </span>
                    </div>
                  </div>
                  {/* Page Fold Effect */}
                  <div className="w-8 h-8 bg-gradient-to-br from-white-0 to-gray-plaster transform rotate-45" />
                </div>

                {/* Content */}
                <p className="text-lg leading-relaxed mb-6 italic">
                  "{entry.content}"
                </p>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap">
                  {entry.tags.map(tag => (
                    <span key={tag} className="text-micro font-mono text-gray-steel">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </ExposedStructure>
          </DeconstructedHover>
        </motion.div>
      ))}
    </div>
  )

  const renderTimelineView = () => (
    <div className="relative">
      {/* Timeline spine */}
      <div className="absolute left-12 top-0 bottom-0 w-px bg-gray-plaster" />

      {filteredEntries.map((entry, index) => (
        <motion.div
          key={entry.id}
          className="relative flex items-start mb-12"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Date marker */}
          <div className="absolute left-12 w-3 h-3 bg-black-100 -translate-x-1/2" />

          {/* Date */}
          <div className="w-24 text-right pr-8">
            <div className="text-micro font-mono text-gray-steel">
              {entry.date}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 ml-8">
            <AsymmetricTransform intensity={1}>
              <div
                className="p-6 bg-white-0 border border-gray-plaster cursor-pointer hover:border-black-100 transition-all"
                onClick={() => setSelectedEntry(entry)}
              >
                <h3 className="text-xl font-bold mb-2">{entry.title}</h3>
                <p className="text-sm opacity-60 mb-3">{entry.content}</p>
                <div className="flex items-center gap-4">
                  <span className="text-micro font-mono">{entry.category}</span>
                  <span className="text-micro text-gray-steel">{entry.status}</span>
                </div>
              </div>
            </AsymmetricTransform>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderFragmentsView = () => (
    <FragmentMosaic fragments={9}>
      <div className="grid grid-cols-3 gap-0">
        {filteredEntries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="relative group cursor-pointer"
            onClick={() => setSelectedEntry(entry)}
          >
            <div className="aspect-square p-6 bg-white-1 border border-gray-plaster hover:bg-black-100 hover:text-white-0 transition-all">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="text-micro font-mono mb-2 opacity-60">
                    {entry.id}
                  </div>
                  <h3 className="text-sm font-bold mb-2 line-clamp-2">
                    {entry.title}
                  </h3>
                </div>
                <div>
                  <p className="text-xs italic line-clamp-3 opacity-60 mb-3">
                    {entry.content}
                  </p>
                  <div className="text-micro">
                    {entry.category}
                  </div>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-hybrid-red opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>
    </FragmentMosaic>
  )

  const renderIndexView = () => (
    <div className="bg-white-0 border-2 border-black-100">
      <table className="w-full">
        <thead className="bg-black-100 text-white-0">
          <tr>
            <th className="p-4 text-left text-micro font-mono">ID</th>
            <th className="p-4 text-left text-micro font-mono">DATE</th>
            <th className="p-4 text-left text-micro font-mono">TITLE</th>
            <th className="p-4 text-left text-micro font-mono">CATEGORY</th>
            <th className="p-4 text-left text-micro font-mono">STATUS</th>
            <th className="p-4 text-left text-micro font-mono">TAGS</th>
          </tr>
        </thead>
        <tbody>
          {filteredEntries.map((entry, index) => (
            <motion.tr
              key={entry.id}
              className="border-b border-gray-plaster hover:bg-gray-plaster/20 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => setSelectedEntry(entry)}
            >
              <td className="p-4 font-mono text-xs">{entry.id}</td>
              <td className="p-4 text-xs">{entry.date}</td>
              <td className="p-4 font-bold text-sm">{entry.title}</td>
              <td className="p-4 text-xs">{entry.category}</td>
              <td className="p-4">
                <span className={`text-micro font-mono ${
                  entry.status === 'FOUNDATIONAL' ? 'text-hybrid-blue' :
                  entry.status === 'EXPERIMENTAL' ? 'text-hybrid-red' :
                  'text-gray-steel'
                }`}>
                  {entry.status}
                </span>
              </td>
              <td className="p-4 text-micro">
                {entry.tags.join(', ')}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-white-0 relative">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 overlay-grid opacity-20" />
        <div className="absolute inset-0 texture-muslin opacity-10" />
      </div>

      {/* Archive Status Bar */}
      <motion.div
        className="fixed top-20 left-0 right-0 z-40 bg-black-100 text-white-0 py-2"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between text-micro font-mono">
            <div className="flex items-center gap-6">
              <span>ARCHIVE_ENTRIES: {filteredEntries.length}/{archiveEntries.length}</span>
              <span className="opacity-60">|</span>
              <span>MODE: {isWritingMode ? 'WRITING' : 'READING'}</span>
              <span className="opacity-60">|</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {randomThought}
              </motion.span>
            </div>
            <span>PHILOSOPHICAL RECORDS</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="pt-32 pb-20">
        <div className="container-wide">
          {/* Page Title */}
          <ExposedStructure showGrid className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-micro font-mono text-hybrid-red mb-2">
                PHILOSOPHICAL_RECORDS / CREATIVE_MEMORY
              </div>
              <h1 className="text-display font-black tracking-tightest uppercase">
                <SacaiLayer layers={2}>
                  ARCHIVE
                </SacaiLayer>
              </h1>
              <div className="text-lg text-gray-steel mt-4 max-w-2xl">
                The mind of the laboratory. Every thought, every failure, every discovery.
                This is where fashion philosophy lives.
              </div>
            </motion.div>
          </ExposedStructure>

          {/* Controls */}
          <div className="mb-12 space-y-4">
            {/* View Mode */}
            <div className="flex gap-2">
              {(['JOURNAL', 'TIMELINE', 'FRAGMENTS', 'INDEX'] as ViewMode[]).map(mode => (
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
            </div>

            {/* Filters */}
            <div className="flex gap-4 items-center">
              {/* Category Filter */}
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="px-3 py-1 text-xs font-mono border border-gray-plaster bg-white-0"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={activeStatus}
                onChange={(e) => setActiveStatus(e.target.value)}
                className="px-3 py-1 text-xs font-mono border border-gray-plaster bg-white-0"
              >
                {statusFilters.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              {/* Search */}
              <input
                type="text"
                placeholder="SEARCH_THOUGHTS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1 text-xs font-mono border border-gray-plaster bg-white-0 flex-1"
              />
            </div>
          </div>

          {/* Archive Display */}
          <div className="mb-20">
            {viewMode === 'JOURNAL' && renderJournalView()}
            {viewMode === 'TIMELINE' && renderTimelineView()}
            {viewMode === 'FRAGMENTS' && renderFragmentsView()}
            {viewMode === 'INDEX' && renderIndexView()}
          </div>
        </div>
      </div>

      {/* Entry Detail Modal */}
      <AnimatePresence>
        {selectedEntry && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEntry(null)}
              className="fixed inset-0 bg-black-100/90 z-50"
            />

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-8 md:inset-16 bg-white-0 z-50 overflow-auto"
            >
              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-micro font-mono text-hybrid-red mb-2">
                      ENTRY_{selectedEntry.id} • {selectedEntry.date}
                    </div>
                    <h2 className="text-5xl font-black mb-4">{selectedEntry.title}</h2>
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-black-100 text-white-0 text-xs">
                        {selectedEntry.category}
                      </span>
                      <span className={`text-sm font-mono ${
                        selectedEntry.status === 'FOUNDATIONAL' ? 'text-hybrid-blue' :
                        selectedEntry.status === 'EXPERIMENTAL' ? 'text-hybrid-red' :
                        'text-gray-steel'
                      }`}>
                        {selectedEntry.status}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedEntry(null)}
                    className="w-12 h-12 bg-black-100 text-white-0 flex items-center justify-center hover:bg-hybrid-red transition-colors"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>

                {/* Full Content */}
                <div className="mb-12">
                  <p className="text-2xl leading-relaxed italic">
                    "{selectedEntry.content}"
                  </p>
                </div>

                {/* Extended Thoughts (simulated) */}
                <div className="mb-12 p-8 bg-gray-plaster/20 border-l-4 border-black-100">
                  <h3 className="text-lg font-black mb-4">EXTENDED_THOUGHTS</h3>
                  <p className="text-sm leading-relaxed opacity-80">
                    This entry represents a fundamental shift in our understanding of garment construction.
                    The philosophical implications extend beyond mere technique—they challenge the very
                    foundation of what we consider "fashion." Each iteration brings us closer to a truth
                    that exists not in the final product, but in the process itself.
                  </p>
                </div>

                {/* Related Entries (simulated) */}
                <div className="mb-12">
                  <h3 className="text-lg font-black mb-4">RELATED_ENTRIES</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {archiveEntries.slice(0, 3).map(entry => (
                      <div key={entry.id} className="p-4 border border-gray-plaster">
                        <div className="text-micro font-mono mb-1">{entry.id}</div>
                        <div className="text-sm font-bold">{entry.title}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex gap-3 flex-wrap">
                  {selectedEntry.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-black-100 text-white-0 text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Writing Mode Indicator */}
      <motion.div
        className="fixed bottom-8 right-8"
        style={{ opacity: fadeIn }}
      >
        <button
          onClick={() => setIsWritingMode(!isWritingMode)}
          className="bg-white-0 border border-black-100 px-4 py-2 text-micro font-mono hover:bg-black-100 hover:text-white-0 transition-all"
        >
          {isWritingMode ? 'EXIT_WRITING' : 'ENTER_WRITING'}
        </button>
      </motion.div>
    </div>
  )
}