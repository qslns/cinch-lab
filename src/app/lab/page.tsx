'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// ==========================================================================
// LABORATORY PAGE - Technical Research & Process Documentation
// Margiela's Artisanal × Sacai's Innovation
// ==========================================================================

interface Experiment {
  id: string
  title: string
  category: 'DECONSTRUCTION' | 'MATERIAL' | 'HYBRID' | 'PROCESS' | 'VOLUME' | 'TECHNIQUE'
  status: 'IN_PROGRESS' | 'TESTING' | 'COMPLETE' | 'FAILED' | 'ARCHIVED'
  date: string
  description: string
  techniques: string[]
  materials: string[]
  measurements?: string[]
  temperature?: string
  duration?: string
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
    techniques: ['Raw edge exposure', 'Inverted seaming', 'Visible interfacing', 'Contrast basting'],
    materials: ['21oz Japanese denim', 'Horsehair canvas', 'Red polyester thread #40'],
    measurements: ['Seam allowance: 2.5cm', 'Stitch length: 4mm', 'Thread tension: 3.5'],
    temperature: '180°C pressing',
    duration: '72 hours',
    result: 'Successfully externalized 87% of internal structure'
  },
  {
    id: '002',
    title: 'MA-1 × Tailoring Hybrid',
    category: 'HYBRID',
    status: 'IN_PROGRESS',
    date: '2024.12.03',
    description: 'Splicing bomber jacket with suit tailoring for transformable garment system.',
    techniques: ['Pattern splicing', 'Modular attachment', 'Reversible construction', 'Magnetic closure'],
    materials: ['Flight nylon MA-1', 'Super 120s wool', 'YKK Excella zippers', 'Neodymium magnets'],
    measurements: ['Splice angle: 45°', 'Module size: 30x40cm', 'Magnet strength: N42'],
    duration: '120 hours ongoing'
  },
  {
    id: '003',
    title: 'Controlled Material Decay',
    category: 'MATERIAL',
    status: 'TESTING',
    date: '2024.12.20',
    description: 'Accelerated aging through chemical and environmental manipulation.',
    techniques: ['Oxidation treatment', 'UV exposure', 'Chemical erosion', 'Salt crystallization'],
    materials: ['Organic cotton 280gsm', 'Copper sulfate solution', 'Sea salt', 'Hydrogen peroxide'],
    measurements: ['pH level: 4.5', 'UV exposure: 72 hours', 'Solution concentration: 15%'],
    temperature: 'Variable 20-80°C',
    result: 'Material degradation achieved at 62% target level'
  },
  {
    id: '004',
    title: 'Pattern as Garment',
    category: 'PROCESS',
    status: 'COMPLETE',
    date: '2024.11.28',
    description: 'Transforming paper patterns directly into wearable pieces.',
    techniques: ['Pattern preservation', 'Marking retention', 'Tool trace documentation', 'Process layering'],
    materials: ['Pattern paper 80gsm', 'Muslin toile', 'Chalk markers', 'Cotton basting'],
    measurements: ['Pattern scale: 1:1', 'Layer count: 4', 'Opacity: 60%'],
    result: 'Process successfully integrated as aesthetic element'
  },
  {
    id: '005',
    title: 'Zero Gravity Draping',
    category: 'VOLUME',
    status: 'TESTING',
    date: '2025.01.01',
    description: 'Creating volume through suspension and weighted balance systems.',
    techniques: ['Suspension draping', 'Weight distribution', 'Tension manipulation', 'Anti-gravity forming'],
    materials: ['Silk organza 8mm', 'Steel wire 0.5mm', 'Lead weights 50g', 'Invisible thread'],
    measurements: ['Suspension height: 3m', 'Weight ratio: 1:3:5', 'Wire tension: 2.5N'],
    duration: '48 hours forming'
  },
  {
    id: '006',
    title: 'Transparent Construction',
    category: 'TECHNIQUE',
    status: 'FAILED',
    date: '2024.10.10',
    description: 'Complete visibility of internal garment mechanisms.',
    techniques: ['Clear material layering', 'Visible internals', 'Light refraction', 'Shadow mapping'],
    materials: ['PVC 0.5mm', 'TPU film', 'Acetate sheets', 'Glass micro beads'],
    measurements: ['Transparency: 92%', 'Refraction index: 1.46', 'Layer separation: 5mm'],
    result: 'Structure collapsed at 70% completion - material incompatibility'
  },
  {
    id: '007',
    title: 'Biomaterial Cultivation',
    category: 'MATERIAL',
    status: 'IN_PROGRESS',
    date: '2024.12.28',
    description: 'Growing leather alternatives from mycelium and bacterial cellulose.',
    techniques: ['Mycelium cultivation', 'Bacterial fermentation', 'Bio-composite forming', 'Living material'],
    materials: ['Pleurotus ostreatus', 'Kombucha SCOBY', 'Agar medium', 'Glycerin'],
    measurements: ['Growth rate: 2mm/day', 'Humidity: 85%', 'pH: 6.5'],
    temperature: '27°C incubation',
    duration: '21 days growth cycle'
  },
  {
    id: '008',
    title: 'Tessellation Patterns',
    category: 'TECHNIQUE',
    status: 'COMPLETE',
    date: '2024.12.15',
    description: 'Zero-waste pattern cutting through geometric tessellation.',
    techniques: ['Geometric patterning', 'Interlocking cuts', 'Modular assembly', 'Mathematical precision'],
    materials: ['Wool felt 3mm', 'Laser cutting', 'Heat bonding', 'Ultrasonic welding'],
    measurements: ['Module size: 15x15cm', 'Waste: 0%', 'Interlock depth: 8mm'],
    result: '100% material utilization achieved'
  }
]

const categories = ['ALL', 'DECONSTRUCTION', 'MATERIAL', 'HYBRID', 'PROCESS', 'VOLUME', 'TECHNIQUE']
const statusColors = {
  IN_PROGRESS: 'text-warning-yellow',
  TESTING: 'text-centrifuge-blue',
  COMPLETE: 'text-hazmat-green',
  FAILED: 'text-thread-red',
  ARCHIVED: 'text-lab-carbon/50'
}

export default function LabPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null)
  const [viewMode, setViewMode] = useState<'GRID' | 'LIST' | 'TIMELINE'>('GRID')
  const [labTime, setLabTime] = useState(new Date())

  // Mouse tracking for interactive effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  // Parallax transforms
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -200])

  useEffect(() => {
    const timer = setInterval(() => setLabTime(new Date()), 1000)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearInterval(timer)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  const filteredExperiments = selectedCategory === 'ALL'
    ? experiments
    : experiments.filter(exp => exp.category === selectedCategory)

  return (
    <div ref={containerRef} className="min-h-screen bg-lab-white">
      {/* Background Textures */}
      <div className="fixed inset-0 texture-graph opacity-5 pointer-events-none" />
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 texture-lab-table" />
      </motion.div>

      {/* Interactive Gradient */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 600px at ${smoothMouseX}px ${smoothMouseY}px,
            rgba(30, 58, 138, 0.03) 0%,
            transparent 50%)`,
        }}
      />

      {/* ==========================================================================
         HEADER - Laboratory Control Panel
         ========================================================================== */}

      <header className="relative pt-24 pb-12 px-6 border-b border-lab-carbon/20">
        <div className="max-w-7xl mx-auto">
          {/* Status Bar */}
          <div className="flex items-center justify-between mb-8 text-xs font-mono">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-hazmat-green rounded-full animate-pulse" />
                LABORATORY OPERATIONAL
              </span>
              <span className="opacity-50">|</span>
              <span className="tabular-nums">
                {labTime.toLocaleTimeString('en-US', { hour12: false })}
              </span>
              <span className="opacity-50">|</span>
              <span>TEMP: 22.5°C</span>
              <span className="opacity-50">|</span>
              <span>HUMIDITY: 45%</span>
            </div>
            <span className="text-thread-red">
              {filteredExperiments.filter(e => e.status === 'IN_PROGRESS').length} ACTIVE
            </span>
          </div>

          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-6xl font-black mb-4">
              <span className="text-deconstructed" data-text="LABORATORY">
                LABORATORY
              </span>
            </h1>
            <p className="text-lg font-light opacity-70">
              Technical Research • Process Documentation • Material Innovation
            </p>
          </motion.div>

          {/* Controls */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2 p-2 bg-lab-carbon/5 rounded">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 text-xs font-medium tracking-wider transition-all ${
                    selectedCategory === cat
                      ? 'bg-lab-carbon text-lab-white'
                      : 'hover:bg-lab-carbon/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-2">
              {['GRID', 'LIST', 'TIMELINE'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode as any)}
                  className={`px-3 py-1 text-xs font-mono tracking-wider transition-all ${
                    viewMode === mode
                      ? 'text-thread-red'
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ==========================================================================
         EXPERIMENTS DISPLAY
         ========================================================================== */}

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {viewMode === 'GRID' && (
            <div className="grid-broken">
              {filteredExperiments.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedExperiment(exp)}
                >
                  <div className="h-full min-h-[280px] p-6 bg-lab-white border border-lab-carbon/20
                    hover:border-lab-carbon/40 transition-all duration-300 pattern-piece">
                    {/* Status Indicator */}
                    <div className="absolute top-4 right-4">
                      <span className={`text-xs font-mono ${statusColors[exp.status]}`}>
                        {exp.status.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Experiment ID */}
                    <div className="construction-mark" data-mark={`EXP_${exp.id}`} />

                    {/* Content */}
                    <div className="mt-8">
                      <p className="text-xs font-mono text-thread-red mb-2">
                        {exp.category}
                      </p>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-thread-blue transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-sm opacity-70 mb-4 line-clamp-2">
                        {exp.description}
                      </p>

                      {/* Techniques Preview */}
                      <div className="flex flex-wrap gap-1">
                        {exp.techniques.slice(0, 3).map((tech, j) => (
                          <span key={j} className="text-xs px-2 py-1 bg-lab-carbon/5 rounded">
                            {tech}
                          </span>
                        ))}
                        {exp.techniques.length > 3 && (
                          <span className="text-xs px-2 py-1 opacity-50">
                            +{exp.techniques.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Date */}
                      <p className="mt-4 text-xs font-mono opacity-50">
                        {exp.date}
                      </p>
                    </div>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <span className="text-2xl">→</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {viewMode === 'LIST' && (
            <div className="space-y-2">
              {filteredExperiments.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="p-4 bg-lab-white border border-lab-carbon/10 hover:border-lab-carbon/30
                    transition-all cursor-pointer group"
                  onClick={() => setSelectedExperiment(exp)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <span className="text-xs font-mono text-thread-red">
                        EXP_{exp.id}
                      </span>
                      <h3 className="text-lg font-medium group-hover:text-thread-blue transition-colors">
                        {exp.title}
                      </h3>
                      <span className="text-xs opacity-50">
                        {exp.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-mono ${statusColors[exp.status]}`}>
                        {exp.status.replace('_', ' ')}
                      </span>
                      <span className="text-xs font-mono opacity-50">
                        {exp.date}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {viewMode === 'TIMELINE' && (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-lab-carbon/20" />

              {filteredExperiments
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((exp, i) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="relative flex items-start gap-8 mb-12"
                  >
                    {/* Timeline Node */}
                    <div className="relative z-10 w-16 flex-shrink-0">
                      <div className={`w-4 h-4 rounded-full border-2 border-lab-carbon bg-lab-white
                        ${exp.status === 'IN_PROGRESS' ? 'animate-pulse' : ''}`} />
                      <p className="mt-2 text-xs font-mono opacity-50 -rotate-45 origin-top-left">
                        {exp.date.slice(5)}
                      </p>
                    </div>

                    {/* Content */}
                    <div
                      className="flex-1 p-6 bg-lab-white border border-lab-carbon/20
                        hover:border-lab-carbon/40 transition-all cursor-pointer group"
                      onClick={() => setSelectedExperiment(exp)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-xs font-mono text-thread-red mb-1">
                            EXP_{exp.id} • {exp.category}
                          </p>
                          <h3 className="text-xl font-bold group-hover:text-thread-blue transition-colors">
                            {exp.title}
                          </h3>
                        </div>
                        <span className={`text-xs font-mono ${statusColors[exp.status]}`}>
                          {exp.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm opacity-70">
                        {exp.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* ==========================================================================
         EXPERIMENT DETAIL MODAL
         ========================================================================== */}

      <AnimatePresence>
        {selectedExperiment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-lab-carbon/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setSelectedExperiment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-lab-white p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedExperiment(null)}
                className="absolute top-6 right-6 text-2xl hover:text-thread-red transition-colors"
              >
                ×
              </button>

              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-xs font-mono text-thread-red">
                    EXP_{selectedExperiment.id}
                  </span>
                  <span className={`text-xs font-mono ${statusColors[selectedExperiment.status]}`}>
                    {selectedExperiment.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-mono opacity-50">
                    {selectedExperiment.date}
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  {selectedExperiment.title}
                </h2>
                <p className="text-sm font-mono uppercase tracking-wider opacity-50">
                  {selectedExperiment.category}
                </p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xs font-mono uppercase tracking-widest mb-3 text-thread-blue">
                  OBJECTIVE
                </h3>
                <p className="text-base leading-relaxed">
                  {selectedExperiment.description}
                </p>
              </div>

              {/* Technical Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Techniques */}
                <div className="p-4 border border-lab-carbon/20 pattern-piece">
                  <h3 className="text-xs font-mono uppercase tracking-widest mb-3 text-thread-blue">
                    TECHNIQUES APPLIED
                  </h3>
                  <ul className="space-y-2">
                    {selectedExperiment.techniques.map((tech, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-thread-red">→</span>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Materials */}
                <div className="p-4 border border-lab-carbon/20 pattern-piece">
                  <h3 className="text-xs font-mono uppercase tracking-widest mb-3 text-thread-blue">
                    MATERIALS USED
                  </h3>
                  <ul className="space-y-2">
                    {selectedExperiment.materials.map((mat, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-thread-red">→</span>
                        {mat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Measurements & Parameters */}
              {(selectedExperiment.measurements || selectedExperiment.temperature || selectedExperiment.duration) && (
                <div className="p-4 bg-lab-carbon/5 mb-8">
                  <h3 className="text-xs font-mono uppercase tracking-widest mb-3 text-thread-blue">
                    TECHNICAL PARAMETERS
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {selectedExperiment.measurements && (
                      <div>
                        <p className="text-xs font-mono opacity-50 mb-1">MEASUREMENTS</p>
                        {selectedExperiment.measurements.map((m, i) => (
                          <p key={i} className="text-sm font-mono">{m}</p>
                        ))}
                      </div>
                    )}
                    {selectedExperiment.temperature && (
                      <div>
                        <p className="text-xs font-mono opacity-50 mb-1">TEMPERATURE</p>
                        <p className="text-sm font-mono">{selectedExperiment.temperature}</p>
                      </div>
                    )}
                    {selectedExperiment.duration && (
                      <div>
                        <p className="text-xs font-mono opacity-50 mb-1">DURATION</p>
                        <p className="text-sm font-mono">{selectedExperiment.duration}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Result */}
              {selectedExperiment.result && (
                <div className="p-4 border-l-2 border-thread-red">
                  <h3 className="text-xs font-mono uppercase tracking-widest mb-2 text-thread-red">
                    RESULT
                  </h3>
                  <p className="text-sm">{selectedExperiment.result}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================================================
         LAB NOTES SECTION
         ========================================================================== */}

      <section className="py-12 px-6 border-t border-lab-carbon/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">LABORATORY NOTES</h2>

          <div className="space-y-6">
            <div className="stitching py-4">
              <p className="text-sm font-mono opacity-70">
                2025.01.28 — Current focus: Hybrid construction methods combining Margiela's
                deconstruction philosophy with Sacai's layering techniques. Testing magnetic
                attachment systems for modular garment transformation.
              </p>
            </div>

            <div className="stitching py-4">
              <p className="text-sm font-mono opacity-70">
                2025.01.15 — Material research breakthrough: Successfully cultivated 15cm² of
                mycelium leather with tensile strength comparable to 2mm cowhide. Growth cycle
                reduced to 21 days through optimized pH control.
              </p>
            </div>

            <div className="stitching py-4">
              <p className="text-sm font-mono opacity-70">
                2024.12.28 — Zero-waste tessellation patterns achieving 100% material utilization.
                Mathematical precision meets aesthetic chaos. All waste eliminated through
                geometric interlocking systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         FOOTER - Lab Information
         ========================================================================== */}

      <footer className="py-8 px-6 border-t border-lab-carbon/20 mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between text-xs font-mono opacity-50">
            <span>CINCH LAB • TECHNICAL RESEARCH DIVISION</span>
            <span>NO COMMERCIAL APPLICATION • EXPERIMENTAL ONLY</span>
          </div>
        </div>
      </footer>
    </div>
  )
}