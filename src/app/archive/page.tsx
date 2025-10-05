'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
    timeSpent: '320 hours'
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
      'Fashion temporality vs. practical durability'
    ],
    iterations: 15,
    timeSpent: '180 hours'
  }
]

export default function ArchivePage() {
  const [selectedItem, setSelectedItem] = useState<ArchivedItem | null>(null)

  return (
    <div className="min-h-screen bg-[var(--margiela-off-white)]">

      {/* MANIFESTO HEADER with cdg-grid */}
      <section className="cdg-grid py-24 px-8 md:px-16 lg:px-24 bg-[var(--cdg-void)]">
        <motion.div
          className="text-xs absolute top-8 right-24 transform rotate-12 text-[var(--margiela-slate)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="margiela-number-tag bg-[var(--margiela-white)]">02</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="grid-item-large"
        >
          <h1 className="text-display-1 font-black leading-none text-[var(--margiela-white)]">
            ARCH
            <br />
            <span className="text-[var(--cdg-blood-red)]">IVE</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 bg-[var(--margiela-white)] p-12 border-4 border-[var(--cdg-void)] transform -rotate-1 max-w-3xl exposed-seam"
        >
          <div className="margiela-tag mb-6 text-[var(--margiela-slate)]">
            FAILURE PHILOSOPHY
          </div>

          <p className="text-heading-1 font-light leading-snug italic text-[var(--margiela-carbon)] mb-8">
            "Every failed experiment is a successful learning"
          </p>

          <p className="text-base text-[var(--margiela-carbon)]">
            We archive our failures not as defeats, but as essential steps
            in the evolution of our practice. The beauty of the incomplete,
            the aesthetics of the abandoned.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 border-l-4 border-[var(--cdg-blood-red)] pl-8"
        >
          <p className="margiela-tag text-[var(--cdg-blood-red)] mb-3">
            DOCUMENTATION ARCHIVE
          </p>
          <p className="text-heading-2 text-[var(--margiela-white)]">
            Failed Experiments<br />
            Abandoned Prototypes<br />
            Learning Through Failure
          </p>
        </motion.div>
      </section>

      {/* TIMELINE with diagonal-flow for failures */}
      <section className="diagonal-flow py-16 px-8 md:px-16 lg:px-24 space-y-16">
        {archivedItems.map((item, index) => {
          const rotations = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-2']
          const colors = [
            { bg: 'var(--cdg-blood-red)', border: 'border-[var(--cdg-blood-red)]', text: 'text-[var(--cdg-blood-red)]' },
            { bg: 'var(--margiela-carbon)', border: 'border-[var(--margiela-carbon)]', text: 'text-[var(--margiela-carbon)]' },
            { bg: 'var(--sacai-burnt-orange)', border: 'border-[var(--sacai-burnt-orange)]', text: 'text-[var(--sacai-burnt-orange)]' },
            { bg: 'var(--cdg-deep-purple)', border: 'border-[var(--cdg-deep-purple)]', text: 'text-[var(--cdg-deep-purple)]' }
          ]

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              onClick={() => setSelectedItem(item)}
              className={`transform ${rotations[index]} bg-[var(--margiela-white)] p-12 border-4 ${colors[index].border} cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-500 exposed-seam`}
            >
              {/* Status Badge */}
              <div
                className={`inline-block px-4 py-2 text-[var(--margiela-white)] text-xs font-bold tracking-widest mb-6`}
                style={{ backgroundColor: colors[index].bg }}
              >
                {item.status}
              </div>

              {/* Archive ID - Margiela style */}
              <span className={`margiela-number-tag ${colors[index].text}`}>
                {item.id}
              </span>

              {/* Type & Date */}
              <p className="text-xs text-[var(--margiela-slate)] mt-2 mb-4">
                {item.type} • {item.date}
              </p>

              {/* Title */}
              <h3 className="text-heading-1 font-black text-[var(--margiela-carbon)] leading-tight mb-6">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-body-large text-[var(--margiela-carbon)] mb-8">
                {item.description}
              </p>

              {/* Failure Reason */}
              {item.reason && (
                <div
                  className={`bg-opacity-10 border-l-4 ${colors[index].border} p-6 mb-6`}
                  style={{ backgroundColor: `${colors[index].bg}15` }}
                >
                  <p className={`margiela-tag ${colors[index].text} mb-3`}>
                    REASON
                  </p>
                  <p className="text-base text-[var(--margiela-carbon)]">{item.reason}</p>
                </div>
              )}

              {/* Stats */}
              <div className="flex gap-12 border-t border-[var(--margiela-slate)] pt-8 mt-8">
                {item.iterations && (
                  <div>
                    <p className="margiela-tag text-[var(--margiela-slate)] mb-2">
                      ITERATIONS
                    </p>
                    <p className={`text-5xl font-black ${colors[index].text}`}>
                      {item.iterations}
                    </p>
                  </div>
                )}
                {item.timeSpent && (
                  <div>
                    <p className="margiela-tag text-[var(--margiela-slate)] mb-2">
                      TIME SPENT
                    </p>
                    <p className="text-base text-[var(--margiela-carbon)]">
                      {item.timeSpent}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </section>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 bg-[var(--cdg-void)] bg-opacity-95 z-50 flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.85, rotate: -3 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.85, rotate: 3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--margiela-white)] max-w-4xl w-full p-16 relative border-4 border-[var(--cdg-blood-red)] sacai-grid-layer"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-8 right-8 text-6xl text-[var(--cdg-blood-red)] hover:text-[var(--margiela-carbon)] transition-colors"
              >
                ×
              </button>

              <span className="margiela-number-tag text-[var(--cdg-blood-red)]">
                {selectedItem.id}
              </span>

              <h2 className="text-display-2 font-black text-[var(--margiela-carbon)] mt-4 mb-4">
                {selectedItem.title}
              </h2>

              <p className="margiela-tag text-[var(--margiela-slate)] mb-12">
                {selectedItem.type} • {selectedItem.date} • {selectedItem.status}
              </p>

              <p className="text-heading-3 text-[var(--margiela-carbon)] mb-12">
                {selectedItem.description}
              </p>

              {selectedItem.reason && (
                <div className="bg-[var(--cdg-blood-red)] text-[var(--margiela-white)] p-8 mb-12 transform -rotate-1 sacai-grid-layer">
                  <h3 className="text-heading-2 font-bold mb-6">
                    Why It Failed
                  </h3>
                  <p className="text-base">{selectedItem.reason}</p>
                </div>
              )}

              {selectedItem.learnings && (
                <div className="mb-12">
                  <h3 className="text-heading-2 font-bold text-[var(--margiela-carbon)] mb-8">
                    Key Learnings
                  </h3>
                  <div className="space-y-6">
                    {selectedItem.learnings.map((learning, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <span className="text-4xl text-[var(--cdg-blood-red)]">→</span>
                        <p className="text-base text-[var(--margiela-carbon)]">{learning}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="border-t-2 border-[var(--margiela-carbon)] py-16 px-8 text-center bg-[var(--margiela-white)]">
        <p className="text-sm text-[var(--margiela-slate)]">
          CINCH LAB ARCHIVE • LEARNING THROUGH FAILURE • {archivedItems.length} DOCUMENTED
        </p>
      </footer>
    </div>
  )
}
