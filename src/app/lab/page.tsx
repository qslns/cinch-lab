'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Experiment {
  id: string
  title: string
  category: 'DECONSTRUCTION' | 'MATERIAL' | 'HYBRID' | 'PROCESS' | 'VOLUME' | 'TECHNIQUE'
  status: 'IN_PROGRESS' | 'TESTING' | 'COMPLETE' | 'FAILED'
  date: string
  description: string
  techniques: string[]
  materials: string[]
  result?: string
}

const experiments: Experiment[] = [
  {
    id: '001',
    title: 'Exposed Seam Architecture',
    category: 'DECONSTRUCTION',
    status: 'COMPLETE',
    date: '2024.11.15',
    description: 'Revealing hidden garment infrastructure through externalized construction.',
    techniques: ['Raw edge exposure', 'Inverted seaming', 'Visible interfacing'],
    materials: ['21oz Japanese denim', 'Horsehair canvas', 'Red polyester thread'],
    result: 'Successfully externalized 87% of internal structure'
  },
  {
    id: '002',
    title: 'MA-1 × Tailoring Hybrid',
    category: 'HYBRID',
    status: 'IN_PROGRESS',
    date: '2024.12.03',
    description: 'Splicing bomber jacket with suit tailoring for transformable garment system.',
    techniques: ['Pattern splicing', 'Modular attachment', 'Reversible construction'],
    materials: ['Flight nylon MA-1', 'Super 120s wool', 'YKK Excella zippers']
  },
  {
    id: '003',
    title: 'Controlled Material Decay',
    category: 'MATERIAL',
    status: 'TESTING',
    date: '2024.12.20',
    description: 'Accelerated aging through chemical and environmental manipulation.',
    techniques: ['Oxidation treatment', 'UV exposure', 'Chemical erosion'],
    materials: ['Organic cotton', 'Copper sulfate', 'Sea salt'],
    result: 'Material degradation achieved at 62% target level'
  }
]

const categories = ['ALL', 'DECONSTRUCTION', 'MATERIAL', 'HYBRID', 'PROCESS', 'VOLUME', 'TECHNIQUE']

export default function LabPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null)

  const filteredExperiments = selectedCategory === 'ALL'
    ? experiments
    : experiments.filter(exp => exp.category === selectedCategory)

  const statusColors = {
    IN_PROGRESS: '#CC5500',
    TESTING: '#1F2937',
    COMPLETE: '#9CAF88',
    FAILED: '#DC143C'
  }

  const statusClasses = {
    IN_PROGRESS: 'bg-sacai-burnt-orange',
    TESTING: 'bg-sacai-layer-navy',
    COMPLETE: 'bg-sage',
    FAILED: 'bg-cdg-blood-red'
  }

  return (
    <div className="min-h-screen bg-margiela-off-white">

      {/* HEADER with hybrid-grid */}
      <header className="hybrid-grid pt-32 pb-16 px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid-item-large"
        >
          <div className="margiela-tag -rotate-1 mb-8">
            00 • LABORATORY • TECHNICAL RESEARCH DIVISION
          </div>

          <h1 className="text-display-1 font-extralight text-margiela-carbon rotate-2">
            <span className="block">LABOR</span>
            <span className="block ml-24">ATORY</span>
          </h1>

          <p className="text-body-large mt-8 max-w-2xl text-margiela-carbon">
            Pattern Deconstruction • Material Innovation • Process Documentation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="grid-item-small absolute top-8 right-8 text-xs text-right text-margiela-slate"
        >
          <div className="exposed-seam-vertical p-4 bg-white">
            <div>{filteredExperiments.filter(e => e.status === 'IN_PROGRESS').length} ACTIVE</div>
            <div className="mt-1">{filteredExperiments.filter(e => e.status === 'TESTING').length} TESTING</div>
            <div className="mt-1">{filteredExperiments.filter(e => e.status === 'COMPLETE').length} COMPLETE</div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="mt-16 flex flex-wrap gap-3 grid-item-large"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-sm px-4 py-2 border-2 transition-all duration-300 hover:scale-105 ${
                selectedCategory === cat
                  ? 'bg-sacai-burnt-orange border-sacai-burnt-orange text-white'
                  : 'bg-white border-margiela-slate text-margiela-carbon hover:border-sacai-burnt-orange'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </header>

      {/* EXPERIMENTS GRID with hybrid-grid */}
      <section className="hybrid-grid py-24 px-8 md:px-16 lg:px-24">
        {filteredExperiments.map((exp, i) => {
          const rotations = ['-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-2', 'rotate-2']
          const rotation = rotations[i % rotations.length]
          const sizes = ['grid-item-large', 'grid-item-medium', 'grid-item-small']
          const size = sizes[i % sizes.length]

          return (
            <motion.div
              key={exp.id}
              className={`${size} transform ${rotation} hover:rotate-0 transition-all duration-500`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedExperiment(exp)}
            >
              <div className="h-full min-h-80 p-8 border-2 border-margiela-slate bg-white cursor-pointer hover:border-sacai-burnt-orange hover:shadow-2xl transition-all exposed-seam">
                {/* Status Indicator */}
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className={`w-3 h-3 rounded-full ${statusClasses[exp.status]} ${exp.status === 'IN_PROGRESS' ? 'animate-pulse' : ''}`}
                    style={{ backgroundColor: statusColors[exp.status] }}
                  />
                  <span className="text-xs font-bold margiela-tag">{exp.status.replace('_', ' ')}</span>
                </div>

                {/* Margiela Number Tag */}
                <div className="margiela-number-tag mb-4">
                  EXP_{exp.id}
                </div>

                {/* Content */}
                <div className="mt-8">
                  <div className="text-xs tracking-widest mb-3 text-sacai-burnt-orange">
                    {exp.category}
                  </div>

                  <h3 className="text-heading-2 font-light mb-4 text-margiela-carbon">
                    {exp.title}
                  </h3>

                  <p className="text-sm opacity-70 line-clamp-3">
                    {exp.description}
                  </p>

                  {/* Techniques */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {exp.techniques.slice(0, 2).map((tech, j) => (
                      <span
                        key={j}
                        className="text-xs px-2 py-1 bg-margiela-off-white text-margiela-carbon"
                      >
                        {tech}
                      </span>
                    ))}
                    {exp.techniques.length > 2 && (
                      <span className="text-xs opacity-50">
                        +{exp.techniques.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Date */}
                  <div className="mt-6 text-xs opacity-50">
                    {exp.date}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </section>

      {/* EXPERIMENT DETAIL MODAL with sacai-grid layers */}
      <AnimatePresence>
        {selectedExperiment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-cdg-void bg-opacity-90"
            onClick={() => setSelectedExperiment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto p-12 bg-white transform -rotate-1 sacai-grid-layer"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedExperiment(null)}
                className="absolute top-6 right-6 text-4xl text-margiela-slate hover:text-margiela-carbon transition-colors"
              >
                ×
              </button>

              {/* Header */}
              <div className="mb-8">
                <div className="margiela-number-tag mb-2">
                  EXP_{selectedExperiment.id}
                </div>
                <div
                  className={`text-xs tracking-widest mb-4 inline-block px-3 py-1 text-white ${statusClasses[selectedExperiment.status]}`}
                >
                  {selectedExperiment.status.replace('_', ' ')} • {selectedExperiment.category}
                </div>
                <h2 className="text-heading-1 font-light mb-4 text-margiela-carbon">
                  {selectedExperiment.title}
                </h2>
                <p className="text-body-large opacity-70">
                  {selectedExperiment.description}
                </p>
              </div>

              {/* Details Grid with sacai layers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Techniques */}
                <div className="transform -rotate-1 bg-sacai-burnt-orange p-6 text-white sacai-grid-layer">
                  <div className="text-xs tracking-widest mb-4">
                    TECHNIQUES APPLIED
                  </div>
                  <ul className="space-y-2">
                    {selectedExperiment.techniques.map((tech, i) => (
                      <li key={i} className="text-base flex items-start gap-2">
                        <span className="text-cdg-blood-red">→</span>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Materials */}
                <div className="transform rotate-1 bg-sage p-6 text-white sacai-grid-layer">
                  <div className="text-xs tracking-widest mb-4">
                    MATERIALS USED
                  </div>
                  <ul className="space-y-2">
                    {selectedExperiment.materials.map((mat, i) => (
                      <li key={i} className="text-base flex items-start gap-2">
                        <span className="text-sacai-burnt-orange">→</span>
                        {mat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Result */}
              {selectedExperiment.result && (
                <div className="p-6 border-l-4 border-cdg-blood-red bg-margiela-off-white">
                  <div className="text-xs tracking-widest mb-2 text-cdg-blood-red">
                    RESULT
                  </div>
                  <p className="text-base">{selectedExperiment.result}</p>
                </div>
              )}

              {/* Date */}
              <div className="mt-8 text-sm opacity-50">
                Documented: {selectedExperiment.date}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="border-t border-margiela-slate py-12 px-8 md:px-16 lg:px-24 mt-32 bg-white">
        <div className="text-sm opacity-50 text-center">
          CINCH LAB • TECHNICAL RESEARCH DIVISION • NO COMMERCIAL APPLICATION
        </div>
      </footer>
    </div>
  )
}
