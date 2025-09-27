'use client'

import { useState, useEffect, useRef } from 'react'
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
  NoiseBackground,
  MorphingShape
} from '@/components/InteractiveElements'

// ==========================================================================
// ARCHIVE PAGE - Process-Focused Documentation
// Margiela × Sacai Philosophical Records
// ==========================================================================

interface ArchiveEntry {
  id: string
  date: string
  title: string
  category: 'PHILOSOPHY' | 'TECHNIQUE' | 'MATERIAL' | 'PROCESS' | 'FAILURE' | 'CONCEPT'
  content: string
  tags: string[]
  status: 'FOUNDATIONAL' | 'EXPERIMENTAL' | 'ARCHIVED' | 'DEVELOPING' | 'CORE'
  images?: string[]
  references?: string[]
}

const archiveEntries: ArchiveEntry[] = [
  {
    id: '001',
    date: '2024.11.15',
    title: 'The Beauty of Exposed Construction',
    category: 'PHILOSOPHY',
    content: 'Every seam tells a story. We don\'t hide the construction; we celebrate it. The inside becomes the outside, the process becomes the product. This is the truth of garment making.',
    tags: ['deconstruction', 'truth', 'raw edges', 'exposed seams'],
    status: 'FOUNDATIONAL',
    references: ['Margiela SS1989', 'Artisanal Line']
  },
  {
    id: '002',
    date: '2024.11.28',
    title: 'Hybrid Identity Through Layering',
    category: 'TECHNIQUE',
    content: 'When a shirt becomes a jacket becomes a dress, we transcend categories. Layering is not addition—it\'s transformation. Each layer changes the meaning of what came before.',
    tags: ['hybrid', 'layering', 'transformation', 'identity'],
    status: 'EXPERIMENTAL',
    references: ['Sacai FW2019', 'Hybrid Collection']
  },
  {
    id: '003',
    date: '2024.12.03',
    title: 'The Failed Dye Experiment',
    category: 'FAILURE',
    content: 'Today, the fabric rejected the dye. Instead of uniform color, we got bleeding, staining, imperfection. In this failure, we discovered a new technique—controlled chaos as aesthetic.',
    tags: ['failure', 'chaos', 'discovery', 'dye', 'accident'],
    status: 'ARCHIVED',
    images: ['/archive/dye-fail-001.jpg']
  },
  {
    id: '004',
    date: '2024.12.15',
    title: 'Volume as Negative Space',
    category: 'CONCEPT',
    content: 'The space between body and fabric is not emptiness—it\'s potential energy. We design not just the fabric, but the air it contains. Volume creates its own gravity.',
    tags: ['volume', 'space', 'architecture', 'structure'],
    status: 'DEVELOPING'
  },
  {
    id: '005',
    date: '2024.12.22',
    title: 'Memory in Material',
    category: 'MATERIAL',
    content: 'Every fabric remembers. Cotton remembers the field, silk the cocoon, wool the sheep. We work with these memories, not against them. The material guides the form.',
    tags: ['material', 'memory', 'origin', 'respect'],
    status: 'FOUNDATIONAL'
  },
  {
    id: '006',
    date: '2025.01.05',
    title: 'Anonymity in Design',
    category: 'PHILOSOPHY',
    content: 'The designer disappears. We are not authors but translators, converting abstract ideas into wearable philosophy. The ego dissolves into the garment.',
    tags: ['anonymity', 'ego', 'philosophy', 'authorship'],
    status: 'CORE'
  },
  {
    id: '007',
    date: '2025.01.12',
    title: 'Reconstruction Without Repair',
    category: 'PROCESS',
    content: 'To reconstruct is not to fix what\'s broken—it\'s to find new wholeness in fragments. Every tear becomes an opportunity, every hole a window to possibility.',
    tags: ['reconstruction', 'fragments', 'wholeness', 'possibility'],
    status: 'EXPERIMENTAL'
  },
  {
    id: '008',
    date: '2025.01.20',
    title: 'Digital Pattern, Human Touch',
    category: 'TECHNIQUE',
    content: 'The computer shows perfection, but the hand creates soul. We use digital tools to design, but honor the imperfection of human craft. The glitch becomes the feature.',
    tags: ['digital', 'handmade', 'imperfection', 'craft', 'technology'],
    status: 'DEVELOPING'
  },
  {
    id: '009',
    date: '2025.01.27',
    title: 'The Unfinished Hem',
    category: 'PROCESS',
    content: 'Why finish what is already complete? The raw edge speaks truth. The unfinished hem is not laziness—it\'s honesty. We show the garment in process, forever becoming.',
    tags: ['unfinished', 'raw', 'process', 'honesty'],
    status: 'CORE'
  }
]

type ViewMode = 'JOURNAL' | 'TIMELINE' | 'MOSAIC' | 'STREAM'

export default function ArchivePage() {
  const [selectedEntry, setSelectedEntry] = useState<ArchiveEntry | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('JOURNAL')
  const [activeCategory, setActiveCategory] = useState<ArchiveEntry['category'] | 'ALL'>('ALL')
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredEntry, setHoveredEntry] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Mouse tracking
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Philosophical quotes rotation
  const [currentQuote, setCurrentQuote] = useState(0)
  const quotes = [
    'The seam is the soul...',
    'Deconstruction is construction...',
    'Imperfection is intention...',
    'Process is product...',
    'The inside is the outside...'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Filter entries
  const filteredEntries = archiveEntries.filter(entry => {
    const categoryMatch = activeCategory === 'ALL' || entry.category === activeCategory
    const searchMatch = searchTerm === '' ||
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return categoryMatch && searchMatch
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <div ref={containerRef} className="min-h-screen bg-raw-white relative">

      <NoiseBackground opacity={0.03} />

      {/* Dynamic Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ y: parallaxY }}
      >
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, #000 0px, transparent 1px, transparent 60px, #000 61px),
              repeating-linear-gradient(90deg, #000 0px, transparent 1px, transparent 60px, #000 61px)
            `
          }}
        />
      </motion.div>

      {/* Floating Philosophy Quote */}
      <motion.div
        className="fixed top-24 right-8 z-40 font-mono text-xs text-carbon/40 max-w-xs text-right"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        {quotes[currentQuote]}
      </motion.div>

      {/* ==========================================================================
         HEADER - Archive Interface
         ========================================================================== */}

      <section className="relative pt-32 pb-16 px-8">
        {/* Deconstructed texture */}
        <div className="absolute inset-0 material-paper opacity-20" />
        <div className="absolute inset-0 exposed-seam opacity-50" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Status Bar */}
          <motion.div
            className="mb-12 bg-carbon text-raw-white p-4 font-mono text-xs"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <span className="text-thread-red animate-pulse">●</span>
                <span>ARCHIVE_SYSTEM_v2.7</span>
                <span>|</span>
                <span>{filteredEntries.length} ENTRIES</span>
                <span>|</span>
                <span>PHILOSOPHICAL_RECORDS</span>
              </div>
              <span>PROCESS_DOCUMENTATION_MODE</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-7xl md:text-9xl font-black mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <DistortionText text="ARCHIVE" className="tracking-tighter" />
          </motion.h1>

          <motion.p
            className="text-xl text-carbon/70 max-w-3xl mb-12 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            The mind of the laboratory. Every thought, every failure, every discovery.
            This is where fashion philosophy lives, where process becomes permanent record.
          </motion.p>

          {/* Controls */}
          <motion.div
            className="flex flex-wrap gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {/* View Mode */}
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-carbon/50">View:</span>
              <div className="flex gap-1">
                {(['JOURNAL', 'TIMELINE', 'MOSAIC', 'STREAM'] as const).map(mode => (
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

            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-carbon/50">Category:</span>
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value as any)}
                className="px-3 py-2 text-xs font-mono bg-transparent border border-carbon/20 focus:border-carbon outline-none"
              >
                <option value="ALL">ALL</option>
                <option value="PHILOSOPHY">PHILOSOPHY</option>
                <option value="TECHNIQUE">TECHNIQUE</option>
                <option value="MATERIAL">MATERIAL</option>
                <option value="PROCESS">PROCESS</option>
                <option value="FAILURE">FAILURE</option>
                <option value="CONCEPT">CONCEPT</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex-grow max-w-md">
              <input
                type="text"
                placeholder="Search thoughts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 text-sm bg-transparent border border-carbon/20 focus:border-carbon outline-none placeholder-carbon/30"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
         ARCHIVE DISPLAY - Multiple View Modes
         ========================================================================== */}

      <section className="px-8 pb-24">
        <div className="max-w-7xl mx-auto">

          {/* JOURNAL VIEW */}
          {viewMode === 'JOURNAL' && (
            <div className="space-y-8">
              {filteredEntries.map((entry, index) => (
                <RevealOnScroll key={entry.id}>
                  <motion.div
                    onMouseEnter={() => setHoveredEntry(entry.id)}
                    onMouseLeave={() => setHoveredEntry(null)}
                    whileHover={{ x: 10 }}
                  >
                    <Card3D>
                      <div
                        className="layer-card bg-raw-white p-8 cursor-pointer group"
                        onClick={() => setSelectedEntry(entry)}
                      >
                        {/* Entry Header */}
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <div className="text-xs font-mono text-carbon/50 mb-2">
                              ENTRY_{entry.id} • {entry.date}
                            </div>
                            <h3 className="text-3xl font-black mb-3">
                              {hoveredEntry === entry.id ? (
                                <SplitText text={entry.title} delay={0.01} />
                              ) : (
                                entry.title
                              )}
                            </h3>
                            <div className="flex items-center gap-3">
                              <span className="px-2 py-1 bg-carbon text-raw-white text-xs">
                                {entry.category}
                              </span>
                              <span className={`text-xs font-mono
                                ${entry.status === 'FOUNDATIONAL' ? 'text-thread-white' :
                                  entry.status === 'EXPERIMENTAL' ? 'text-thread-red' :
                                  entry.status === 'CORE' ? 'text-carbon font-bold' :
                                  'text-carbon/50'}
                              `}>
                                {entry.status}
                              </span>
                            </div>
                          </div>
                          {/* Visual indicator */}
                          <div className="w-12 h-12 relative">
                            <MorphingShape size={48} />
                          </div>
                        </div>

                        {/* Content Preview */}
                        <p className="text-lg leading-relaxed text-carbon/80 italic mb-6">
                          "{entry.content}"
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {entry.tags.map(tag => (
                            <span key={tag} className="text-xs text-carbon/50">
                              #{tag}
                            </span>
                          ))}
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-thread-red/0 to-thread-red/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                    </Card3D>
                  </motion.div>
                </RevealOnScroll>
              ))}
            </div>
          )}

          {/* TIMELINE VIEW */}
          {viewMode === 'TIMELINE' && (
            <div className="relative">
              {/* Timeline spine */}
              <div className="absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-thread-red via-carbon/20 to-thread-white" />

              {filteredEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  className="relative flex items-start mb-16"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Timeline node */}
                  <motion.div
                    className="absolute left-12 w-4 h-4 bg-raw-white border-2 border-carbon rounded-full -translate-x-1/2"
                    whileHover={{ scale: 1.5, borderColor: '#cc0000' }}
                  />

                  {/* Date */}
                  <div className="w-24 text-right pr-8">
                    <div className="text-xs font-mono text-carbon/50">
                      {entry.date}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 ml-12">
                    <FabricDrag>
                      <div
                        className="exposed-seam bg-raw-white p-6 cursor-pointer hover:bg-carbon/5 transition-colors"
                        onClick={() => setSelectedEntry(entry)}
                      >
                        <h3 className="text-xl font-bold mb-2">{entry.title}</h3>
                        <p className="text-sm text-carbon/70 mb-3 italic">"{entry.content.substring(0, 150)}..."</p>
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-mono">{entry.category}</span>
                          <span className="text-xs text-carbon/50">{entry.status}</span>
                        </div>
                      </div>
                    </FabricDrag>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* MOSAIC VIEW */}
          {viewMode === 'MOSAIC' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedEntry(entry)}
                >
                  <div className="material-paper hover:material-fabric transition-all h-full p-6">
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="mb-4">
                        <div className="text-xs font-mono text-carbon/40 mb-1">
                          {entry.id} • {entry.date}
                        </div>
                        <h3 className="text-lg font-bold line-clamp-2">
                          {entry.title}
                        </h3>
                      </div>

                      {/* Content preview */}
                      <p className="text-sm text-carbon/70 italic line-clamp-4 flex-grow mb-4">
                        "{entry.content}"
                      </p>

                      {/* Footer */}
                      <div className="flex justify-between items-center">
                        <span className="text-xs uppercase">{entry.category}</span>
                        <span className={`text-xs font-mono
                          ${entry.status === 'FOUNDATIONAL' ? 'text-thread-white bg-carbon px-2 py-1' :
                            entry.status === 'EXPERIMENTAL' ? 'text-thread-red' :
                            'text-carbon/50'}
                        `}>
                          {entry.status}
                        </span>
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-thread-red opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* STREAM VIEW */}
          {viewMode === 'STREAM' && (
            <div className="space-y-2">
              {filteredEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="hybrid-split bg-raw-white hover:bg-carbon/5 transition-colors cursor-pointer"
                  onClick={() => setSelectedEntry(entry)}
                >
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <span className="text-xs font-mono text-carbon/40">
                        {entry.id}
                      </span>
                      <span className="text-xs text-carbon/40">
                        {entry.date}
                      </span>
                      <h3 className="font-bold">
                        <DistortionText text={entry.title} />
                      </h3>
                      <span className="text-xs uppercase text-carbon/50">
                        {entry.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono">
                        {entry.tags.length} tags
                      </span>
                      <span className={`text-xs
                        ${entry.status === 'FOUNDATIONAL' ? 'font-bold' : ''}
                      `}>
                        {entry.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ==========================================================================
         ENTRY DETAIL MODAL
         ========================================================================== */}

      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-carbon/95 backdrop-blur-xl z-50 overflow-auto"
            onClick={() => setSelectedEntry(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotateY: -5 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotateY: 5 }}
              className="min-h-screen py-16 px-8"
              onClick={e => e.stopPropagation()}
              style={{ perspective: '1000px' }}
            >
              <div className="max-w-4xl mx-auto">
                <div className="bg-raw-white p-8 md:p-12 relative">
                  <div className="absolute inset-0 exposed-seam pointer-events-none" />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-xs font-mono text-carbon/50">
                            ENTRY_{selectedEntry.id}
                          </span>
                          <span className="text-xs font-mono text-carbon/50">|</span>
                          <span className="text-xs font-mono text-carbon/50">
                            {selectedEntry.date}
                          </span>
                          <span className="px-3 py-1 bg-carbon text-raw-white text-xs">
                            {selectedEntry.category}
                          </span>
                          <span className={`text-xs font-mono
                            ${selectedEntry.status === 'FOUNDATIONAL' ? 'text-thread-white bg-carbon px-2 py-1' :
                              selectedEntry.status === 'EXPERIMENTAL' ? 'text-thread-red' :
                              selectedEntry.status === 'CORE' ? 'font-bold' :
                              'text-carbon/50'}
                          `}>
                            {selectedEntry.status}
                          </span>
                        </div>
                        <h2 className="text-5xl font-black mb-6">
                          <SplitText text={selectedEntry.title} delay={0.02} />
                        </h2>
                      </div>
                      <MagneticButton strength={0.5}>
                        <button
                          onClick={() => setSelectedEntry(null)}
                          className="text-4xl hover:text-thread-red transition-colors p-2"
                        >
                          ×
                        </button>
                      </MagneticButton>
                    </div>

                    {/* Main Content */}
                    <div className="mb-12">
                      <p className="text-2xl leading-relaxed italic text-carbon/90">
                        "{selectedEntry.content}"
                      </p>
                    </div>

                    {/* Extended Analysis */}
                    <ParallaxContainer offset={20}>
                      <div className="mb-12 p-8 bg-carbon/5 border-l-4 border-thread-red">
                        <h3 className="text-lg font-bold mb-4">PHILOSOPHICAL IMPLICATIONS</h3>
                        <p className="text-sm leading-relaxed text-carbon/70">
                          This entry represents a fundamental shift in our understanding of garment construction.
                          The implications extend beyond technique—they challenge the foundation of fashion itself.
                          Each iteration brings us closer to a truth that exists not in the final product,
                          but in the endless process of becoming.
                        </p>
                      </div>
                    </ParallaxContainer>

                    {/* References */}
                    {selectedEntry.references && (
                      <div className="mb-12">
                        <h3 className="text-lg font-bold mb-4">REFERENCES</h3>
                        <div className="flex flex-wrap gap-3">
                          {selectedEntry.references.map(ref => (
                            <span key={ref} className="px-3 py-1 bg-carbon/10 text-sm">
                              {ref}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Related Entries */}
                    <div className="mb-12">
                      <h3 className="text-lg font-bold mb-4">CONNECTED THOUGHTS</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {archiveEntries
                          .filter(e => e.id !== selectedEntry.id)
                          .slice(0, 3)
                          .map(entry => (
                          <FabricDrag key={entry.id}>
                            <div className="p-4 border border-carbon/20 hover:border-carbon transition-colors cursor-grab">
                              <div className="text-xs font-mono mb-1">{entry.id}</div>
                              <div className="text-sm font-bold line-clamp-2">{entry.title}</div>
                            </div>
                          </FabricDrag>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {selectedEntry.tags.map(tag => (
                        <motion.span
                          key={tag}
                          className="px-3 py-1 bg-carbon text-raw-white text-xs"
                          whileHover={{ scale: 1.1 }}
                        >
                          #{tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 bg-carbon text-raw-white p-6 text-center">
                  <p className="text-xs font-mono">
                    ARCHIVE ENTRY {selectedEntry.id} • CINCH LAB PHILOSOPHICAL RECORDS
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================================================
         PHILOSOPHY FOOTER
         ========================================================================== */}

      <section className="py-24 px-8 bg-gradient-to-b from-raw-white to-carbon text-raw-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h3
            className="text-4xl font-black mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <DistortionText text="PROCESS IS ETERNAL" />
          </motion.h3>
          <motion.p
            className="text-xl mb-12 text-raw-white/80 font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            The archive never stops growing. Every experiment, every failure, every discovery
            adds to our collective understanding. This is not history—it's living philosophy.
          </motion.p>

          <MagneticButton strength={0.4}>
            <motion.button
              className="px-8 py-4 bg-raw-white text-carbon hover:bg-thread-red hover:text-raw-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contribute to Archive
            </motion.button>
          </MagneticButton>
        </div>
      </section>
    </div>
  )
}