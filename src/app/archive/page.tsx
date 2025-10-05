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
    <div className="min-h-screen bg-red-50">

      {/* MANIFESTO HEADER */}
      <section className="relative py-24 px-8 md:px-16 lg:px-24">
        <motion.div
          className="text-xs absolute top-8 right-24 transform rotate-12 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          002
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-9xl font-black leading-none text-black">
            ARCH
            <br />
            <span className="text-red-600">IVE</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 bg-white p-12 border-4 border-gray-900 transform -rotate-1 max-w-3xl"
        >
          <div className="text-xs tracking-widest mb-6 text-gray-500">
            FAILURE PHILOSOPHY
          </div>

          <p className="text-4xl font-light leading-snug italic text-black mb-8">
            "Every failed experiment is a successful learning"
          </p>

          <p className="text-base text-gray-700">
            We archive our failures not as defeats, but as essential steps
            in the evolution of our practice. The beauty of the incomplete,
            the aesthetics of the abandoned.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 border-l-4 border-red-600 pl-8"
        >
          <p className="text-xs tracking-widest text-red-600 mb-3">
            DOCUMENTATION ARCHIVE
          </p>
          <p className="text-2xl text-gray-700">
            Failed Experiments<br />
            Abandoned Prototypes<br />
            Learning Through Failure
          </p>
        </motion.div>
      </section>

      {/* TIMELINE */}
      <section className="py-16 px-8 md:px-16 lg:px-24 space-y-16">
        {archivedItems.map((item, index) => {
          const rotations = ['-rotate-3', 'rotate-2', '-rotate-1', 'rotate-2']
          const colors = [
            { bg: 'bg-red-600', border: 'border-red-600' },
            { bg: 'bg-gray-800', border: 'border-gray-800' },
            { bg: 'bg-orange-500', border: 'border-orange-500' },
            { bg: 'bg-purple-600', border: 'border-purple-600' }
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
              className={`transform ${rotations[index]} bg-white p-12 border-4 ${colors[index].border} cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-500`}
            >
              {/* Status Badge */}
              <div className={`inline-block px-4 py-2 ${colors[index].bg} text-white text-xs font-bold tracking-widest mb-6`}>
                {item.status}
              </div>

              {/* Archive ID */}
              <span className={`text-xs ${colors[index].bg.replace('bg-', 'text-')}`}>
                {item.id}
              </span>

              {/* Type & Date */}
              <p className="text-xs text-gray-500 mt-2 mb-4">
                {item.type} • {item.date}
              </p>

              {/* Title */}
              <h3 className="text-5xl font-black text-black leading-tight mb-6">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-lg text-gray-700 mb-8">
                {item.description}
              </p>

              {/* Failure Reason */}
              {item.reason && (
                <div className={`${colors[index].bg} bg-opacity-10 border-l-4 ${colors[index].border} p-6 mb-6`}>
                  <p className={`text-xs tracking-widest ${colors[index].bg.replace('bg-', 'text-')} mb-3`}>
                    REASON
                  </p>
                  <p className="text-base text-gray-900">{item.reason}</p>
                </div>
              )}

              {/* Stats */}
              <div className="flex gap-12 border-t border-gray-300 pt-8 mt-8">
                {item.iterations && (
                  <div>
                    <p className="text-xs tracking-widest text-gray-500 mb-2">
                      ITERATIONS
                    </p>
                    <p className={`text-4xl font-black ${colors[index].bg.replace('bg-', 'text-')}`}>
                      {item.iterations}
                    </p>
                  </div>
                )}
                {item.timeSpent && (
                  <div>
                    <p className="text-xs tracking-widest text-gray-500 mb-2">
                      TIME SPENT
                    </p>
                    <p className="text-base text-gray-900">
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
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0.85, rotate: -3 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.85, rotate: 3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white max-w-4xl w-full p-16 relative border-4 border-red-600"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-8 right-8 text-6xl text-red-600 hover:text-black transition-colors"
              >
                ×
              </button>

              <span className="text-xs text-red-600">
                {selectedItem.id}
              </span>

              <h2 className="text-6xl font-black text-black mt-4 mb-4">
                {selectedItem.title}
              </h2>

              <p className="text-xs tracking-widest text-gray-500 mb-12">
                {selectedItem.type} • {selectedItem.date} • {selectedItem.status}
              </p>

              <p className="text-xl text-gray-700 mb-12">
                {selectedItem.description}
              </p>

              {selectedItem.reason && (
                <div className="bg-red-600 text-white p-8 mb-12 transform -rotate-1">
                  <h3 className="text-2xl font-bold mb-6">
                    Why It Failed
                  </h3>
                  <p className="text-base">{selectedItem.reason}</p>
                </div>
              )}

              {selectedItem.learnings && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-black mb-8">
                    Key Learnings
                  </h3>
                  <div className="space-y-6">
                    {selectedItem.learnings.map((learning, i) => (
                      <div key={i} className="flex gap-4 items-start">
                        <span className="text-4xl text-red-600">→</span>
                        <p className="text-base text-gray-700">{learning}</p>
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
      <footer className="border-t-2 border-gray-900 py-16 px-8 text-center bg-white">
        <p className="text-sm text-gray-500">
          CINCH LAB ARCHIVE • LEARNING THROUGH FAILURE • {archivedItems.length} DOCUMENTED
        </p>
      </footer>
    </div>
  )
}
