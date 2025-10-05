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
    IN_PROGRESS: 'bg-orange-500',
    TESTING: 'bg-blue-500',
    COMPLETE: 'bg-green-600',
    FAILED: 'bg-red-600'
  }

  return (
    <div className="min-h-screen bg-blue-50">

      {/* HEADER */}
      <header className="relative pt-32 pb-16 px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-xs tracking-widest mb-8 text-gray-600 inline-block transform -rotate-1">
            LABORATORY • TECHNICAL RESEARCH DIVISION
          </div>

          <h1 className="text-9xl font-extralight text-blue-600 transform rotate-2">
            <span className="block">LABOR</span>
            <span className="block ml-24">ATORY</span>
          </h1>

          <p className="text-xl mt-8 max-w-2xl text-gray-700">
            Pattern Deconstruction • Material Innovation • Process Documentation
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-8 right-8 text-xs text-right text-gray-500"
        >
          <div>{filteredExperiments.filter(e => e.status === 'IN_PROGRESS').length} ACTIVE</div>
          <div className="mt-1">{filteredExperiments.filter(e => e.status === 'TESTING').length} TESTING</div>
          <div className="mt-1">{filteredExperiments.filter(e => e.status === 'COMPLETE').length} COMPLETE</div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="mt-16 flex flex-wrap gap-3"
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
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-gray-300 text-gray-700 hover:border-blue-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </header>

      {/* EXPERIMENTS GRID */}
      <section className="py-24 px-8 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperiments.map((exp, i) => {
            const rotations = ['-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-2', 'rotate-2']
            const rotation = rotations[i % rotations.length]

            return (
              <motion.div
                key={exp.id}
                className={`transform ${rotation} hover:rotate-0 transition-all duration-500`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => setSelectedExperiment(exp)}
              >
                <div className="h-full min-h-80 p-8 border-2 border-gray-300 bg-white cursor-pointer hover:border-blue-600 hover:shadow-2xl transition-all">
                  {/* Status Indicator */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-3 h-3 rounded-full ${statusColors[exp.status]} ${exp.status === 'IN_PROGRESS' ? 'animate-pulse' : ''}`} />
                    <span className="text-xs font-bold">{exp.status.replace('_', ' ')}</span>
                  </div>

                  {/* Experiment ID */}
                  <div className="text-xs text-gray-500 mb-4">
                    EXP_{exp.id}
                  </div>

                  {/* Content */}
                  <div className="mt-8">
                    <div className="text-xs tracking-widest mb-3 text-blue-600">
                      {exp.category}
                    </div>

                    <h3 className="text-2xl font-light mb-4 text-black">
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
                          className="text-xs px-2 py-1 bg-gray-200 text-gray-700"
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
        </div>
      </section>

      {/* EXPERIMENT DETAIL MODAL */}
      <AnimatePresence>
        {selectedExperiment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black bg-opacity-90"
            onClick={() => setSelectedExperiment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto p-12 bg-white transform -rotate-1"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedExperiment(null)}
                className="absolute top-6 right-6 text-4xl text-gray-500 hover:text-black transition-colors"
              >
                ×
              </button>

              {/* Header */}
              <div className="mb-8">
                <div className="text-xs text-gray-500 mb-2">
                  EXP_{selectedExperiment.id}
                </div>
                <div className={`text-xs tracking-widest mb-4 inline-block px-3 py-1 text-white ${statusColors[selectedExperiment.status]}`}>
                  {selectedExperiment.status.replace('_', ' ')} • {selectedExperiment.category}
                </div>
                <h2 className="text-5xl font-light mb-4 text-black">
                  {selectedExperiment.title}
                </h2>
                <p className="text-lg opacity-70">
                  {selectedExperiment.description}
                </p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Techniques */}
                <div className="transform -rotate-1 bg-blue-50 p-6">
                  <div className="text-xs tracking-widest mb-4 text-blue-600">
                    TECHNIQUES APPLIED
                  </div>
                  <ul className="space-y-2">
                    {selectedExperiment.techniques.map((tech, i) => (
                      <li key={i} className="text-base flex items-start gap-2">
                        <span className="text-red-600">→</span>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Materials */}
                <div className="transform rotate-1 bg-green-50 p-6">
                  <div className="text-xs tracking-widest mb-4 text-green-600">
                    MATERIALS USED
                  </div>
                  <ul className="space-y-2">
                    {selectedExperiment.materials.map((mat, i) => (
                      <li key={i} className="text-base flex items-start gap-2">
                        <span className="text-orange-600">→</span>
                        {mat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Result */}
              {selectedExperiment.result && (
                <div className="p-6 border-l-4 border-red-600 bg-gray-50">
                  <div className="text-xs tracking-widest mb-2 text-red-600">
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
      <footer className="border-t border-gray-300 py-12 px-8 md:px-16 lg:px-24 mt-32 bg-white">
        <div className="text-sm opacity-50 text-center">
          CINCH LAB • TECHNICAL RESEARCH DIVISION • NO COMMERCIAL APPLICATION
        </div>
      </footer>
    </div>
  )
}
