'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'

// ==========================================================================
// ARCHIVE PAGE - Failed Experiments & Process Documentation
// The Beauty of Failure, The Aesthetics of Incompletion
// ==========================================================================

interface ArchivedItem {
  id: string
  type: 'EXPERIMENT' | 'PROTOTYPE' | 'ITERATION' | 'FAILURE'
  date: string
  title: string
  description: string
  status: 'ABANDONED' | 'PAUSED' | 'FAILED' | 'ARCHIVED'
  reason?: string
  learnings?: string[]
  iterations?: number
  timeSpent?: string
  materials?: string[]
  images?: string[]
}

const archivedItems: ArchivedItem[] = [
  {
    id: 'ARC_001',
    type: 'FAILURE',
    date: '2024.09.15',
    title: 'Magnetic Modular System v1',
    description: 'Garment modules connected by neodymium magnets for infinite reconfiguration.',
    status: 'FAILED',
    reason: 'Magnetic interference with electronic devices. Weight distribution issues.',
    learnings: [
      'Magnet strength inversely proportional to wearability',
      'Need non-metallic connection alternatives',
      'Modular systems require structural integrity'
    ],
    iterations: 23,
    timeSpent: '320 hours',
    materials: ['N52 magnets', 'Steel mesh', 'Kevlar thread']
  },
  {
    id: 'ARC_002',
    type: 'EXPERIMENT',
    date: '2024.08.20',
    title: 'Biodegradable Seam Tape',
    description: 'Self-dissolving seam reinforcement that disappears after first wear.',
    status: 'ABANDONED',
    reason: 'Unpredictable dissolution rates. Environmental factors too variable.',
    learnings: [
      'Biodegradation requires controlled conditions',
      'Fashion temporality vs. practical durability',
      'User experience conflicts with experimental goals'
    ],
    iterations: 15,
    timeSpent: '180 hours'
  },
  {
    id: 'ARC_003',
    type: 'PROTOTYPE',
    date: '2024.07.10',
    title: 'Zero-Waste Spiral Cut',
    description: 'Single continuous spiral pattern creating entire garment from one piece.',
    status: 'PAUSED',
    reason: 'Mathematical complexity exceeds current capability. Requires algorithmic solution.',
    learnings: [
      'Fibonacci sequences applicable to pattern cutting',
      'Computational design necessary for optimization',
      'Traditional pattern making has limitations'
    ],
    iterations: 31,
    timeSpent: '450 hours'
  },
  {
    id: 'ARC_004',
    type: 'ITERATION',
    date: '2024.06.05',
    title: 'Liquid Metal Hemlines',
    description: 'Gallium-based liquid metal integrated into hem weights for dynamic draping.',
    status: 'FAILED',
    reason: 'Material cost prohibitive. Safety concerns with skin contact.',
    learnings: [
      'Innovation must consider accessibility',
      'Safety paramount in wearable experiments',
      'Alternative weight systems needed'
    ],
    iterations: 8,
    timeSpent: '120 hours',
    materials: ['Gallium alloy', 'Silicone tubing', 'Medical grade sealant']
  },
  {
    id: 'ARC_005',
    type: 'EXPERIMENT',
    date: '2024.05.12',
    title: 'Bacterial Dye Growth',
    description: 'Living bacterial cultures creating evolving color patterns on fabric.',
    status: 'ARCHIVED',
    reason: 'Successfully documented. Too unpredictable for replication.',
    learnings: [
      'Living materials create unique aesthetics',
      'Controlled chaos has artistic value',
      'Documentation more valuable than production'
    ],
    iterations: 12,
    timeSpent: '200 hours'
  },
  {
    id: 'ARC_006',
    type: 'FAILURE',
    date: '2024.04.18',
    title: 'Pneumatic Structure Jacket',
    description: 'Air-filled chambers creating variable silhouette through pressure adjustment.',
    status: 'FAILED',
    reason: 'Puncture vulnerability. Pump system too bulky.',
    learnings: [
      'Inflatable structures need redundancy',
      'Wearable tech must be truly wearable',
      'Simple solutions often superior'
    ],
    iterations: 19,
    timeSpent: '280 hours'
  }
]

const filterCategories = ['ALL', 'EXPERIMENT', 'PROTOTYPE', 'ITERATION', 'FAILURE']
const statusColors = {
  ABANDONED: 'text-warning-yellow',
  PAUSED: 'text-centrifuge-blue',
  FAILED: 'text-thread-red',
  ARCHIVED: 'text-lab-carbon/50'
}

export default function ArchivePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const [selectedFilter, setSelectedFilter] = useState('ALL')
  const [selectedItem, setSelectedItem] = useState<ArchivedItem | null>(null)
  const [viewMode, setViewMode] = useState<'CARDS' | 'TIMELINE'>('CARDS')

  // Mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  // Parallax
  const bgY = useTransform(scrollY, [0, 1000], [0, -200])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const filteredItems = selectedFilter === 'ALL'
    ? archivedItems
    : archivedItems.filter(item => item.type === selectedFilter)

  return (
    <div ref={containerRef} className="min-h-screen bg-lab-white">
      {/* Background */}
      <div className="fixed inset-0 texture-graph opacity-5 pointer-events-none" />
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-thread-red/5 to-transparent" />
      </motion.div>

      {/* Interactive Gradient */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 600px at ${smoothMouseX}px ${smoothMouseY}px,
            rgba(220, 20, 60, 0.03) 0%, transparent 50%)`,
        }}
      />

      {/* Header */}
      <header className="relative pt-24 pb-12 px-6 border-b border-lab-carbon/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl font-black mb-4">
              <span className="text-deconstructed" data-text="ARCHIVE">
                ARCHIVE
              </span>
            </h1>
            <p className="text-lg font-light opacity-70">
              Failed Experiments • Abandoned Prototypes • Learning Through Failure
            </p>
          </motion.div>

          {/* Filters */}
          <div className="mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-3 py-1 text-xs font-medium tracking-wider transition-all
                    ${selectedFilter === cat
                      ? 'bg-thread-red text-lab-white'
                      : 'hover:bg-lab-carbon/10'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              {['CARDS', 'TIMELINE'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`px-3 py-1 text-xs font-mono tracking-wider transition-all
                    ${viewMode === mode ? 'text-thread-red' : 'opacity-50 hover:opacity-100'}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {viewMode === 'CARDS' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="h-full p-6 bg-lab-white border border-lab-carbon/20
                    hover:border-thread-red/30 transition-all duration-300 raw-edge">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-xs font-mono text-thread-red mb-1">{item.id}</p>
                        <p className="text-xs opacity-50">{item.date}</p>
                      </div>
                      <span className={`text-xs font-mono ${statusColors[item.status]}`}>
                        {item.status}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-3 group-hover:text-thread-red transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm opacity-70 mb-4 line-clamp-2">
                      {item.description}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-xs font-mono opacity-50">
                      {item.iterations && <span>{item.iterations} iterations</span>}
                      {item.timeSpent && <span>{item.timeSpent}</span>}
                    </div>

                    {/* Type Badge */}
                    <div className="mt-4">
                      <span className="text-xs px-2 py-1 bg-lab-carbon/5 rounded">
                        {item.type}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-thread-red/20" />

              {filteredItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative flex items-start gap-8 mb-12"
                >
                  {/* Node */}
                  <div className="relative z-10 w-16 flex-shrink-0">
                    <div className={`w-4 h-4 rounded-full border-2 border-thread-red bg-lab-white
                      ${item.status === 'FAILED' ? 'bg-thread-red' : ''}`} />
                    <p className="mt-2 text-xs font-mono opacity-50 -rotate-45 origin-top-left">
                      {item.date.slice(5)}
                    </p>
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 p-6 bg-lab-white border border-lab-carbon/20
                      hover:border-thread-red/30 transition-all cursor-pointer"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-xs font-mono text-thread-red mb-1">
                          {item.id} • {item.type}
                        </p>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                      </div>
                      <span className={`text-xs font-mono ${statusColors[item.status]}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm opacity-70">{item.description}</p>
                    {item.reason && (
                      <p className="mt-3 text-xs font-mono text-thread-red/70">
                        REASON: {item.reason}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-lab-carbon/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-lab-white p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 text-2xl hover:text-thread-red transition-colors"
              >
                ×
              </button>

              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs font-mono text-thread-red">{selectedItem.id}</span>
                  <span className={`text-xs font-mono ${statusColors[selectedItem.status]}`}>
                    {selectedItem.status}
                  </span>
                  <span className="text-xs font-mono opacity-50">{selectedItem.date}</span>
                </div>
                <h2 className="text-3xl font-bold mb-2">{selectedItem.title}</h2>
                <p className="text-sm font-mono uppercase tracking-wider opacity-50">
                  {selectedItem.type}
                </p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-base leading-relaxed">{selectedItem.description}</p>
              </div>

              {/* Failure Reason */}
              {selectedItem.reason && (
                <div className="p-4 bg-thread-red/10 border-l-2 border-thread-red mb-6">
                  <h3 className="text-xs font-mono uppercase tracking-widest mb-2 text-thread-red">
                    REASON FOR {selectedItem.status}
                  </h3>
                  <p className="text-sm">{selectedItem.reason}</p>
                </div>
              )}

              {/* Learnings */}
              {selectedItem.learnings && (
                <div className="mb-6">
                  <h3 className="text-xs font-mono uppercase tracking-widest mb-3 text-thread-blue">
                    KEY LEARNINGS
                  </h3>
                  <ul className="space-y-2">
                    {selectedItem.learnings.map((learning, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-thread-red">→</span>
                        {learning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-lab-carbon/5">
                {selectedItem.iterations && (
                  <div>
                    <p className="text-xs font-mono opacity-50 mb-1">ITERATIONS</p>
                    <p className="text-lg font-bold">{selectedItem.iterations}</p>
                  </div>
                )}
                {selectedItem.timeSpent && (
                  <div>
                    <p className="text-xs font-mono opacity-50 mb-1">TIME SPENT</p>
                    <p className="text-lg font-bold">{selectedItem.timeSpent}</p>
                  </div>
                )}
                {selectedItem.materials && (
                  <div className="col-span-2">
                    <p className="text-xs font-mono opacity-50 mb-1">MATERIALS</p>
                    <p className="text-sm">{selectedItem.materials.join(', ')}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Philosophy Section */}
      <section className="py-12 px-6 border-t border-lab-carbon/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">FAILURE PHILOSOPHY</h2>
          <div className="stitching py-4">
            <p className="text-sm font-mono opacity-70">
              Every failed experiment is a successful learning. We archive our failures
              not as defeats, but as essential steps in the evolution of our practice.
              The beauty of the incomplete, the aesthetics of the abandoned — these are
              as valuable as any finished piece. In failure, we find truth.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-lab-carbon/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between text-xs font-mono opacity-50">
            <span>CINCH LAB ARCHIVE • FAILED EXPERIMENTS</span>
            <span>LEARNING THROUGH FAILURE</span>
          </div>
        </div>
      </footer>
    </div>
  )
}