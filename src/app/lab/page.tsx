'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  MagneticButton,
  RippleEffect,
  DistortionText,
  ParallaxContainer,
  FabricDrag,
  MorphingShape,
  RevealOnScroll,
  SplitText,
  Card3D
} from '@/components/InteractiveElements'

// ==========================================================================
// LABORATORY PAGE - Experimental Fashion Research
// Margiela × Sacai Philosophy Applied
// ==========================================================================

interface Experiment {
  id: string
  title: string
  category: 'DECONSTRUCTION' | 'MATERIAL' | 'HYBRID' | 'PROCESS'
  status: 'ACTIVE' | 'COMPLETE' | 'ARCHIVED'
  date: string
  description: string
  techniques: string[]
  materials: string[]
  images?: string[]
}

const experiments: Experiment[] = [
  {
    id: 'EXP_001',
    title: 'Seam Exposure Study',
    category: 'DECONSTRUCTION',
    status: 'COMPLETE',
    date: '2024.11.15',
    description: 'Revealing the hidden architecture of garments through exposed construction methods.',
    techniques: ['Raw edge finishing', 'Exposed interfacing', 'Inside-out construction', 'Visible basting'],
    materials: ['Japanese selvage denim', 'Cotton canvas', 'Horsehair interfacing', 'Red contrast thread'],
    images: ['/lab/exp-001-1.jpg', '/lab/exp-001-2.jpg']
  },
  {
    id: 'EXP_002',
    title: 'Hybrid Garment System',
    category: 'HYBRID',
    status: 'ACTIVE',
    date: '2024.12.03',
    description: 'Combining disparate garment typologies into singular, transformable pieces.',
    techniques: ['Garment splicing', 'Detachable components', 'Modular construction', 'Reversible techniques'],
    materials: ['Technical ripstop', 'Merino wool', 'YKK zippers', 'Magnetic fasteners'],
    images: ['/lab/exp-002-1.jpg']
  },
  {
    id: 'EXP_003',
    title: 'Material Deterioration',
    category: 'MATERIAL',
    status: 'ACTIVE',
    date: '2024.12.20',
    description: 'Exploring beauty in decay through controlled material degradation.',
    techniques: ['Chemical treatment', 'Laser distressing', 'Heat manipulation', 'Oxidation process'],
    materials: ['Organic cotton', 'Copper mesh', 'Natural rubber', 'Salt crystals'],
    images: ['/lab/exp-003-1.jpg', '/lab/exp-003-2.jpg']
  },
  {
    id: 'EXP_004',
    title: 'Process as Product',
    category: 'PROCESS',
    status: 'COMPLETE',
    date: '2024.11.28',
    description: 'Making the construction process the focal point of the final garment.',
    techniques: ['Visible pattern pieces', 'Unfinished hems', 'Marking preservation', 'Tool traces'],
    materials: ['Muslin', 'Pattern paper', 'Chalk markers', 'Basting thread'],
    images: ['/lab/exp-004-1.jpg']
  },
  {
    id: 'EXP_005',
    title: 'Asymmetric Balance',
    category: 'DECONSTRUCTION',
    status: 'ACTIVE',
    date: '2025.01.01',
    description: 'Creating harmony through intentional imbalance and structural tension.',
    techniques: ['Off-center seaming', 'Weighted draping', 'Diagonal grain cutting', 'Tension manipulation'],
    materials: ['Silk organza', 'Steel wire', 'Lead weights', 'Elastic cord'],
    images: []
  },
  {
    id: 'EXP_006',
    title: 'Transparent Layering',
    category: 'HYBRID',
    status: 'ARCHIVED',
    date: '2024.10.10',
    description: 'Revealing construction through translucent material combinations.',
    techniques: ['Sheer layering', 'Visible internals', 'Light manipulation', 'Shadow play'],
    materials: ['PVC film', 'Mesh fabric', 'Acetate sheets', 'Glass beads'],
    images: ['/lab/exp-006-1.jpg', '/lab/exp-006-2.jpg']
  }
]

export default function LabPage() {
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null)
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETE' | 'ARCHIVED'>('ALL')
  const [category, setCategory] = useState<'ALL' | 'DECONSTRUCTION' | 'MATERIAL' | 'HYBRID' | 'PROCESS'>('ALL')
  const [viewMode, setViewMode] = useState<'GRID' | 'LIST' | 'TIMELINE'>('GRID')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Time display
  const [currentTime, setCurrentTime] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Mouse tracking for interactive background
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const filteredExperiments = experiments.filter(exp => {
    const statusMatch = filter === 'ALL' || exp.status === filter
    const categoryMatch = category === 'ALL' || exp.category === category
    return statusMatch && categoryMatch
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const gridRotate = useTransform(scrollYProgress, [0, 1], [0, 3])

  return (
    <div ref={containerRef} className="min-h-screen bg-raw-white relative overflow-hidden">

      {/* Animated Background Grid */}
      <motion.div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{ y: backgroundY }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, #000 0px, transparent 1px, transparent 40px, #000 41px),
              repeating-linear-gradient(90deg, #000 0px, transparent 1px, transparent 40px, #000 41px)
            `,
            transform: `perspective(500px) rotateX(60deg) translateZ(-100px)`
          }}
        />
      </motion.div>

      {/* Interactive Floating Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,0,0,0.05) 0%, transparent 70%)',
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            filter: 'blur(40px)'
          }}
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>

      {/* ==========================================================================
         HEADER - Laboratory Interface
         ========================================================================== */}

      <section className="relative pt-32 pb-16 px-8">
        {/* Deconstructed background texture */}
        <div className="absolute inset-0 material-paper opacity-30" />
        <div className="absolute inset-0 exposed-seam" />

        {/* Status Terminal */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-carbon/90 text-raw-white p-4 font-mono text-xs backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-6">
                <span className="text-thread-red animate-pulse">●</span>
                <span>CINCH_LAB_RESEARCH_FACILITY_v5.2.1</span>
                <span>|</span>
                <span>{currentTime.toLocaleString('en-US', {
                  weekday: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false
                })}</span>
              </div>
              <div>
                <span>EXPERIMENTS: {experiments.filter(e => e.status === 'ACTIVE').length} ACTIVE</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-8 text-thread-white/60">
              <div>TEMP: 23.5°C</div>
              <div>HUMIDITY: 45%</div>
              <div>PRESSURE: 1013hPa</div>
              <div>STATUS: OPERATIONAL</div>
            </div>
          </div>
        </motion.div>

        {/* Title with Distortion Effect */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-7xl md:text-9xl font-black mb-6">
            <DistortionText text="LABORATORY" className="tracking-tight" />
          </h1>
          <motion.p
            className="text-xl text-carbon/70 max-w-3xl font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Experimental research facility for garment deconstruction and hybrid construction.
            Where Margiela's exposed process meets Sacai's transformative layering.
          </motion.p>
        </div>

        {/* Control Panel */}
        <motion.div
          className="relative z-10 max-w-7xl mx-auto mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-wrap gap-6">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-carbon/50">View:</span>
              <div className="flex gap-1">
                {(['GRID', 'LIST', 'TIMELINE'] as const).map(mode => (
                  <MagneticButton key={mode} strength={0.2}>
                    <button
                      onClick={() => setViewMode(mode)}
                      className={`
                        px-4 py-2 text-xs font-mono uppercase transition-all relative overflow-hidden
                        ${viewMode === mode
                          ? 'bg-carbon text-raw-white'
                          : 'bg-transparent text-carbon border border-carbon/20 hover:border-carbon/40'
                        }
                      `}
                    >
                      <RippleEffect color={viewMode === mode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)'}>
                        {mode}
                      </RippleEffect>
                    </button>
                  </MagneticButton>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-carbon/50">Status:</span>
              <div className="flex gap-1">
                {(['ALL', 'ACTIVE', 'COMPLETE', 'ARCHIVED'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`
                      px-3 py-2 text-xs font-mono uppercase transition-all border
                      ${filter === status
                        ? 'bg-carbon text-raw-white border-carbon'
                        : 'bg-transparent text-carbon border-carbon/20 hover:border-carbon/40'
                      }
                    `}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-carbon/50">Category:</span>
              <div className="flex gap-1">
                {(['ALL', 'DECONSTRUCTION', 'MATERIAL', 'HYBRID', 'PROCESS'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`
                      px-3 py-2 text-xs font-mono uppercase transition-all border
                      ${category === cat
                        ? 'bg-carbon text-raw-white border-carbon'
                        : 'bg-transparent text-carbon border-carbon/20 hover:border-carbon/40'
                      }
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ==========================================================================
         EXPERIMENTS DISPLAY
         ========================================================================== */}

      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">

          {/* Grid View */}
          {viewMode === 'GRID' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredExperiments.map((experiment, index) => (
                <RevealOnScroll key={experiment.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                  >
                    <Card3D className="h-full">
                      <div
                        className="layer-card bg-raw-white h-full cursor-pointer group"
                        onClick={() => setSelectedExperiment(experiment)}
                      >
                        <div className="p-6 h-full flex flex-col relative">
                          {/* Status Indicator */}
                          <div className="absolute top-0 right-0">
                            <span className={`
                              inline-block px-3 py-1 text-xs font-mono
                              ${experiment.status === 'ACTIVE'
                                ? 'bg-thread-red text-raw-white animate-pulse'
                                : experiment.status === 'COMPLETE'
                                ? 'bg-thread-white text-carbon'
                                : 'bg-carbon/20 text-carbon'}
                            `}>
                              {experiment.status}
                            </span>
                          </div>

                          {/* ID and Date */}
                          <div className="text-xs font-mono text-carbon/40 mb-2">
                            {experiment.id} | {experiment.date}
                          </div>

                          {/* Title with hover effect */}
                          <h3 className="text-2xl font-bold mb-3 group-hover:text-thread-red transition-colors">
                            {experiment.title}
                          </h3>

                          {/* Category Badge */}
                          <div className="mb-4">
                            <span className="text-xs font-mono uppercase tracking-wider text-thread-red">
                              {experiment.category}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-carbon/70 mb-4 flex-grow line-clamp-3">
                            {experiment.description}
                          </p>

                          {/* Techniques Preview */}
                          <div className="space-y-1">
                            <span className="text-xs text-carbon/40 uppercase tracking-wider">Techniques:</span>
                            <div className="flex flex-wrap gap-1">
                              {experiment.techniques.slice(0, 3).map((tech, i) => (
                                <span key={i} className="text-xs bg-carbon/5 px-2 py-1">
                                  {tech}
                                </span>
                              ))}
                              {experiment.techniques.length > 3 && (
                                <span className="text-xs text-carbon/40">
                                  +{experiment.techniques.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-carbon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        </div>
                      </div>
                    </Card3D>
                  </motion.div>
                </RevealOnScroll>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'LIST' && (
            <div className="space-y-4">
              {filteredExperiments.map((experiment, index) => (
                <motion.div
                  key={experiment.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="hybrid-split bg-raw-white hover:bg-carbon/5 transition-colors cursor-pointer"
                  onClick={() => setSelectedExperiment(experiment)}
                >
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-xs font-mono text-carbon/40">{experiment.id}</span>
                        <h3 className="text-xl font-bold">{experiment.title}</h3>
                        <span className={`
                          px-2 py-1 text-xs font-mono
                          ${experiment.status === 'ACTIVE' ? 'text-thread-red' : 'text-carbon/50'}
                        `}>
                          {experiment.status}
                        </span>
                      </div>
                      <p className="text-sm text-carbon/70 max-w-2xl">{experiment.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono text-carbon/40">{experiment.date}</div>
                      <div className="text-xs uppercase tracking-wider text-thread-red mt-1">
                        {experiment.category}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Timeline View */}
          {viewMode === 'TIMELINE' && (
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-carbon/20" />

              <div className="space-y-12">
                {filteredExperiments
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((experiment, index) => (
                  <motion.div
                    key={experiment.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`flex items-center gap-8 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}
                  >
                    {/* Timeline Dot */}
                    <div className="relative z-10 flex-shrink-0">
                      <div className={`
                        w-4 h-4 rounded-full border-2 border-carbon bg-raw-white
                        ${experiment.status === 'ACTIVE' ? 'animate-pulse' : ''}
                      `} />
                    </div>

                    {/* Content Card */}
                    <div
                      className="exposed-seam bg-raw-white p-6 flex-grow cursor-pointer hover:shadow-lg transition-shadow"
                      onClick={() => setSelectedExperiment(experiment)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-xs font-mono text-carbon/40">{experiment.date}</span>
                          <h3 className="text-xl font-bold mt-1">{experiment.title}</h3>
                        </div>
                        <span className={`
                          px-2 py-1 text-xs font-mono
                          ${experiment.status === 'ACTIVE'
                            ? 'bg-thread-red text-raw-white'
                            : experiment.status === 'COMPLETE'
                            ? 'bg-thread-white text-carbon'
                            : 'bg-carbon/10 text-carbon'}
                        `}>
                          {experiment.status}
                        </span>
                      </div>
                      <p className="text-sm text-carbon/70">{experiment.description}</p>
                      <div className="mt-3 text-xs uppercase tracking-wider text-thread-red">
                        {experiment.category}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {filteredExperiments.length === 0 && (
            <div className="text-center py-16">
              <MorphingShape size={100} />
              <p className="text-carbon/50 mt-8">No experiments found matching current filters.</p>
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
            className="fixed inset-0 bg-carbon/90 backdrop-blur-md z-50 flex items-center justify-center p-8"
            onClick={() => setSelectedExperiment(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: -10 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 10 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="bg-raw-white max-w-5xl w-full max-h-[90vh] overflow-auto relative"
              onClick={e => e.stopPropagation()}
              style={{ perspective: '1000px' }}
            >
              {/* Deconstructed edges */}
              <div className="absolute inset-0 exposed-seam pointer-events-none" />

              <div className="relative z-10 p-8 md:p-12">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-mono text-carbon/40">
                        {selectedExperiment.id}
                      </span>
                      <span className="text-xs font-mono text-carbon/40">|</span>
                      <span className="text-xs font-mono text-carbon/40">
                        {selectedExperiment.date}
                      </span>
                      <span className={`
                        px-3 py-1 text-xs font-mono
                        ${selectedExperiment.status === 'ACTIVE'
                          ? 'bg-thread-red text-raw-white animate-pulse'
                          : selectedExperiment.status === 'COMPLETE'
                          ? 'bg-thread-white text-carbon'
                          : 'bg-carbon/10 text-carbon'}
                      `}>
                        {selectedExperiment.status}
                      </span>
                    </div>
                    <h2 className="text-4xl font-black">
                      <SplitText text={selectedExperiment.title} delay={0.02} />
                    </h2>
                    <div className="mt-2">
                      <span className="text-sm uppercase tracking-wider text-thread-red">
                        {selectedExperiment.category}
                      </span>
                    </div>
                  </div>
                  <MagneticButton strength={0.5}>
                    <button
                      onClick={() => setSelectedExperiment(null)}
                      className="text-3xl hover:text-thread-red transition-colors p-2"
                    >
                      ×
                    </button>
                  </MagneticButton>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Left Column */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-carbon/50 mb-4">
                        Research Abstract
                      </h3>
                      <p className="text-lg leading-relaxed">
                        {selectedExperiment.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-carbon/50 mb-4">
                        Techniques Applied
                      </h3>
                      <div className="space-y-3">
                        {selectedExperiment.techniques.map((technique, i) => (
                          <motion.div
                            key={i}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <span className="text-thread-red text-lg">→</span>
                            <span className="text-sm">{technique}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-carbon/50 mb-4">
                        Materials Used
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedExperiment.materials.map((material, i) => (
                          <motion.div
                            key={i}
                            className="bg-carbon/5 p-3 text-sm"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            {material}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-carbon/50 mb-4">
                        Process Documentation
                      </h3>
                      <div className="bg-carbon text-raw-white p-6 font-mono text-xs leading-relaxed">
                        <p className="text-thread-red mb-2">// RESEARCH_LOG</p>
                        <p>Temperature: 23.5°C</p>
                        <p>Humidity: 45%</p>
                        <p>Pressure: 1013 hPa</p>
                        <p className="mt-3 text-thread-white/60">
                          Process iterations: 14<br/>
                          Material tests: 27<br/>
                          Construction time: 148 hours<br/>
                          Status: {selectedExperiment.status}
                        </p>
                        <p className="mt-3 text-thread-red">
                          Next phase: Pattern optimization
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Image Gallery Placeholder */}
                {selectedExperiment.images && selectedExperiment.images.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-xs uppercase tracking-widest text-carbon/50 mb-4">
                      Visual Documentation
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedExperiment.images.map((img, i) => (
                        <FabricDrag key={i}>
                          <div className="bg-carbon/10 aspect-square flex items-center justify-center text-carbon/30">
                            <span className="text-xs font-mono">{img}</span>
                          </div>
                        </FabricDrag>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 mt-12">
                  <MagneticButton strength={0.3}>
                    <button className="px-6 py-3 bg-carbon text-raw-white hover:bg-thread-red transition-colors">
                      Download Research PDF
                    </button>
                  </MagneticButton>
                  <MagneticButton strength={0.3}>
                    <button className="px-6 py-3 border border-carbon text-carbon hover:bg-carbon hover:text-raw-white transition-colors">
                      View 3D Model
                    </button>
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================================================
         RESEARCH METHODOLOGY SECTION
         ========================================================================== */}

      <ParallaxContainer offset={50}>
        <section className="py-24 px-8 bg-gradient-to-b from-raw-white to-ivory">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-5xl font-black mb-16 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <DistortionText text="METHODOLOGY" />
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Phase 1 */}
              <RevealOnScroll>
                <div className="material-fabric p-8 h-full">
                  <div className="text-6xl font-black text-thread-red mb-4">01</div>
                  <h3 className="text-2xl font-bold mb-4">DECONSTRUCT</h3>
                  <p className="text-sm text-carbon/70 mb-6">
                    Dismantling existing structures to understand their fundamental construction.
                    Every seam tells a story, every thread holds memory.
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-thread-red" />
                      Pattern extraction & analysis
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-thread-red" />
                      Seam documentation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-thread-red" />
                      Material decomposition
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-thread-red" />
                      Construction archaeology
                    </li>
                  </ul>
                </div>
              </RevealOnScroll>

              {/* Phase 2 */}
              <RevealOnScroll>
                <div className="material-paper p-8 h-full">
                  <div className="text-6xl font-black text-thread-white mb-4">02</div>
                  <h3 className="text-2xl font-bold mb-4">EXPERIMENT</h3>
                  <p className="text-sm text-carbon/70 mb-6">
                    Testing boundaries through controlled chaos. Failure is data,
                    success is temporary, process is eternal.
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-thread-white" />
                      Material stress testing
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-thread-white" />
                      Hybrid technique development
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-thread-white" />
                      Form manipulation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-thread-white" />
                      Process iteration cycles
                    </li>
                  </ul>
                </div>
              </RevealOnScroll>

              {/* Phase 3 */}
              <RevealOnScroll>
                <div className="material-concrete p-8 h-full">
                  <div className="text-6xl font-black text-carbon mb-4">03</div>
                  <h3 className="text-2xl font-bold mb-4">RECONSTRUCT</h3>
                  <p className="text-sm text-carbon/70 mb-6">
                    Building new realities from fragmented truths. The final form
                    carries the ghost of its process.
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-carbon" />
                      Hybrid assembly techniques
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-carbon" />
                      Process preservation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-carbon" />
                      Technical documentation
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-carbon" />
                      Knowledge archival
                    </li>
                  </ul>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      </ParallaxContainer>

      {/* ==========================================================================
         EQUIPMENT STATUS GRID
         ========================================================================== */}

      <section className="py-24 px-8 bg-carbon text-raw-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-12">Equipment Status</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Industrial Overlock M5', status: 'OPERATIONAL', usage: 89 },
              { name: 'Ultrasonic Welder X2', status: 'OPERATIONAL', usage: 45 },
              { name: 'Heat Press 3000', status: 'MAINTENANCE', usage: 0 },
              { name: 'Laser Cutter Pro', status: 'OPERATIONAL', usage: 67 },
              { name: 'Pattern Digitizer v4', status: 'OPERATIONAL', usage: 92 },
              { name: '3D Body Scanner', status: 'OFFLINE', usage: 0 },
              { name: 'Chemical Treatment Bath', status: 'OPERATIONAL', usage: 34 },
              { name: 'Vacuum Former XL', status: 'OPERATIONAL', usage: 58 }
            ].map((equipment, i) => (
              <motion.div
                key={i}
                className="bg-raw-white/5 backdrop-blur-sm p-4 border border-raw-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
              >
                <h4 className="text-sm font-bold mb-3">{equipment.name}</h4>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`
                    w-2 h-2 rounded-full
                    ${equipment.status === 'OPERATIONAL' ? 'bg-thread-white animate-pulse' :
                      equipment.status === 'MAINTENANCE' ? 'bg-thread-red' :
                      'bg-carbon/50'}
                  `} />
                  <span className="text-xs font-mono text-raw-white/60">
                    {equipment.status}
                  </span>
                </div>
                {equipment.status === 'OPERATIONAL' && (
                  <div className="mt-2">
                    <div className="text-xs text-raw-white/40 mb-1">Usage</div>
                    <div className="h-1 bg-raw-white/10">
                      <motion.div
                        className="h-full bg-thread-white"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${equipment.usage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                      />
                    </div>
                    <div className="text-xs text-raw-white/40 mt-1">{equipment.usage}%</div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         CALL TO ACTION
         ========================================================================== */}

      <section className="py-24 px-8 bg-raw-white relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,0.5) 35px, rgba(0,0,0,0.5) 70px)`
            }}
            animate={{
              x: [0, 70],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h3
            className="text-4xl font-black mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Research Collaboration
          </motion.h3>
          <motion.p
            className="text-xl text-carbon/70 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            We collaborate with institutions and individuals pushing the boundaries of fashion construction.
            No commercial projects. Only pure research.
          </motion.p>

          <MagneticButton strength={0.4}>
            <motion.button
              className="px-8 py-4 bg-carbon text-raw-white text-lg hover:bg-thread-red transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Propose Research Collaboration
            </motion.button>
          </MagneticButton>
        </div>
      </section>
    </div>
  )
}