'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

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
  },
  {
    id: '004',
    title: 'Pattern as Garment',
    category: 'PROCESS',
    status: 'COMPLETE',
    date: '2024.11.28',
    description: 'Transforming paper patterns directly into wearable pieces.',
    techniques: ['Pattern preservation', 'Marking retention', 'Process layering'],
    materials: ['Pattern paper', 'Muslin toile', 'Chalk markers'],
    result: 'Process successfully integrated as aesthetic element'
  },
  {
    id: '005',
    title: 'Zero Gravity Draping',
    category: 'VOLUME',
    status: 'TESTING',
    date: '2025.01.01',
    description: 'Creating volume through suspension and weighted balance systems.',
    techniques: ['Suspension draping', 'Weight distribution', 'Tension manipulation'],
    materials: ['Silk organza', 'Steel wire', 'Lead weights']
  },
  {
    id: '006',
    title: 'Transparent Construction',
    category: 'TECHNIQUE',
    status: 'FAILED',
    date: '2024.10.10',
    description: 'Complete visibility of internal garment mechanisms.',
    techniques: ['Clear material layering', 'Visible internals', 'Light refraction'],
    materials: ['PVC film', 'TPU', 'Acetate sheets'],
    result: 'Structure collapsed at 70% completion - material incompatibility'
  }
]

const categories = ['ALL', 'DECONSTRUCTION', 'MATERIAL', 'HYBRID', 'PROCESS', 'VOLUME', 'TECHNIQUE']

export default function LabPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null)

  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200])

  const filteredExperiments = selectedCategory === 'ALL'
    ? experiments
    : experiments.filter(exp => exp.category === selectedCategory)

  const statusColors = {
    IN_PROGRESS: 'var(--lab-warning-orange)',
    TESTING: 'var(--lab-petri-blue)',
    COMPLETE: 'var(--lab-reaction-green)',
    FAILED: 'var(--lab-specimen-red)'
  }

  return (
    <div ref={containerRef} className="min-h-screen" style={{ backgroundColor: 'var(--zone-lab-surface)' }}>
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Background Gradient */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{ y: backgroundY }}
      >
        <div
          style={{
            background: `radial-gradient(circle at 20% 30%, var(--lab-chemical-blue), transparent 60%),
                        radial-gradient(circle at 80% 70%, var(--lab-reaction-green), transparent 50%)`
          }}
        />
      </motion.div>

      {/* ========== HEADER ========== */}
      <header className="relative pt-32 pb-16 px-8 md:px-16 lg:px-24">
        <div className="margiela-grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-white-label mb-8 inline-block">
              LABORATORY • TECHNICAL RESEARCH DIVISION
            </div>

            <h1 className="text-display-1" style={{ color: 'var(--zone-lab-primary)' }}>
              <span className="block">LABOR</span>
              <span className="block ml-[10%]">ATORY</span>
            </h1>

            <p className="text-body-large mt-8 max-w-2xl" style={{ color: 'var(--zone-lab-contrast)' }}>
              Pattern Deconstruction • Material Innovation • Process Documentation
            </p>
          </motion.div>

          {/* Status Corner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute top-8 right-8 text-number-tag text-right"
          >
            <div>{filteredExperiments.filter(e => e.status === 'IN_PROGRESS').length} ACTIVE</div>
            <div className="mt-1">{filteredExperiments.filter(e => e.status === 'TESTING').length} TESTING</div>
            <div className="mt-1">{filteredExperiments.filter(e => e.status === 'COMPLETE').length} COMPLETE</div>
          </motion.div>
        </div>

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
              className="text-label px-4 py-2 border transition-all duration-300"
              style={{
                backgroundColor: selectedCategory === cat ? 'var(--zone-lab-primary)' : 'transparent',
                borderColor: selectedCategory === cat ? 'var(--zone-lab-primary)' : 'var(--margiela-exposed-seam)',
                color: selectedCategory === cat ? 'var(--margiela-paper)' : 'var(--zone-lab-contrast)'
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </header>

      {/* ========== EXPERIMENTS GRID ========== */}
      <section className="py-24 px-8 md:px-16 lg:px-24">
        <div className="hybrid-grid">
          {filteredExperiments.map((exp, i) => {
            const sizes = ['large', 'medium', 'small', 'large', 'medium', 'small']
            const rotations = [-1.5, 2, -1, 1.8, -2.2, 1.2]
            const size = sizes[i % sizes.length]
            const rotation = rotations[i % rotations.length]

            return (
              <motion.div
                key={exp.id}
                className={`
                  relative group cursor-pointer
                  ${size === 'large' ? 'col-span-2 row-span-2' : ''}
                  ${size === 'medium' ? 'col-span-1 row-span-2' : ''}
                  ${size === 'small' ? 'col-span-1 row-span-1' : ''}
                `}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: rotation
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  type: 'spring'
                }}
                whileHover={{
                  scale: 1.03,
                  rotate: 0,
                  transition: { duration: 0.4 }
                }}
                onClick={() => setSelectedExperiment(exp)}
              >
                <div
                  className="h-full min-h-[280px] p-8 border-2 transition-all duration-500"
                  style={{
                    backgroundColor: 'var(--margiela-paper)',
                    borderColor: 'var(--margiela-exposed-seam)'
                  }}
                >
                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: statusColors[exp.status],
                        animation: exp.status === 'IN_PROGRESS' ? 'pulse 2s infinite' : 'none'
                      }}
                    />
                    <span className="text-caption" style={{ color: statusColors[exp.status] }}>
                      {exp.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Experiment ID */}
                  <div className="text-number-tag mb-4">
                    EXP_{exp.id}
                  </div>

                  {/* Content */}
                  <div className="mt-8">
                    <div className="text-overline mb-3" style={{ color: 'var(--zone-lab-accent-1)' }}>
                      {exp.category}
                    </div>

                    <h3 className="text-heading-4 mb-4" style={{ color: 'var(--margiela-void)' }}>
                      {exp.title}
                    </h3>

                    <p className="text-body-small opacity-70 line-clamp-3">
                      {exp.description}
                    </p>

                    {/* Techniques */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {exp.techniques.slice(0, 2).map((tech, j) => (
                        <span
                          key={j}
                          className="text-caption px-2 py-1"
                          style={{
                            backgroundColor: 'var(--margiela-silver)',
                            color: 'var(--margiela-graphite)'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {exp.techniques.length > 2 && (
                        <span className="text-caption opacity-50">
                          +{exp.techniques.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Date */}
                    <div className="mt-6 text-caption opacity-50">
                      {exp.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ========== EXPERIMENT DETAIL MODAL ========== */}
      <AnimatePresence>
        {selectedExperiment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backgroundColor: 'rgba(10, 9, 8, 0.85)' }}
            onClick={() => setSelectedExperiment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto p-12"
              style={{ backgroundColor: 'var(--margiela-paper)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedExperiment(null)}
                className="absolute top-6 right-6 text-4xl opacity-50 hover:opacity-100 transition-opacity"
              >
                ×
              </button>

              {/* Header */}
              <div className="mb-8">
                <div className="text-number-tag mb-2">
                  EXP_{selectedExperiment.id}
                </div>
                <div className="text-overline mb-4" style={{ color: statusColors[selectedExperiment.status] }}>
                  {selectedExperiment.status.replace('_', ' ')} • {selectedExperiment.category}
                </div>
                <h2 className="text-display-3 mb-4">
                  {selectedExperiment.title}
                </h2>
                <p className="text-body-large opacity-70">
                  {selectedExperiment.description}
                </p>
              </div>

              {/* Details Grid */}
              <div className="sacai-grid mb-8">
                {/* Techniques */}
                <div className="sacai-grid-layer-1">
                  <div className="text-overline mb-4" style={{ color: 'var(--lab-chemical-blue)' }}>
                    TECHNIQUES APPLIED
                  </div>
                  <ul className="space-y-2">
                    {selectedExperiment.techniques.map((tech, i) => (
                      <li key={i} className="text-body flex items-start gap-2">
                        <span style={{ color: 'var(--lab-specimen-red)' }}>→</span>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Materials */}
                <div className="sacai-grid-layer-2">
                  <div className="text-overline mb-4" style={{ color: 'var(--lab-reaction-green)' }}>
                    MATERIALS USED
                  </div>
                  <ul className="space-y-2">
                    {selectedExperiment.materials.map((mat, i) => (
                      <li key={i} className="text-body flex items-start gap-2">
                        <span style={{ color: 'var(--lab-warning-orange)' }}>→</span>
                        {mat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Result */}
              {selectedExperiment.result && (
                <div
                  className="p-6 border-l-4"
                  style={{
                    borderColor: 'var(--lab-specimen-red)',
                    backgroundColor: 'var(--margiela-muslin)'
                  }}
                >
                  <div className="text-overline mb-2" style={{ color: 'var(--lab-specimen-red)' }}>
                    RESULT
                  </div>
                  <p className="text-body">{selectedExperiment.result}</p>
                </div>
              )}

              {/* Date */}
              <div className="mt-8 text-caption opacity-50">
                Documented: {selectedExperiment.date}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== FOOTER ========== */}
      <footer
        className="border-t py-12 px-8 md:px-16 lg:px-24 mt-32"
        style={{ borderColor: 'var(--margiela-exposed-seam)' }}
      >
        <div className="text-caption opacity-50 text-center">
          CINCH LAB • TECHNICAL RESEARCH DIVISION • NO COMMERCIAL APPLICATION
        </div>
      </footer>
    </div>
  )
}