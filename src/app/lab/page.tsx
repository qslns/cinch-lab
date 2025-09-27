'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  DeconstructedText,
  LayeredCard,
  ExposedSeam,
  MaterialCard,
  EditorialSection,
  RawEdgeButton,
  ConstructionMarker
} from '@/components/MargielaSacaiComponents'

// ==========================================================================
// LABORATORY PAGE - Material Research & Experimentation
// Professional, Dense, Functional
// ==========================================================================

interface Experiment {
  id: string
  title: string
  category: 'PATTERN' | 'MATERIAL' | 'CONSTRUCTION' | 'HYBRID'
  status: 'ACTIVE' | 'COMPLETE' | 'ARCHIVED'
  date: string
  description: string
  techniques: string[]
  materials: string[]
}

const experiments: Experiment[] = [
  {
    id: 'EXP_001',
    title: 'Deconstructed Tailoring',
    category: 'PATTERN',
    status: 'COMPLETE',
    date: '2024.01.15',
    description: 'Reimagining classic suit construction through exposed seams and inverted structures.',
    techniques: ['Raw edge finishing', 'Exposed interfacing', 'Asymmetric pattern cutting'],
    materials: ['Wool gabardine', 'Cotton canvas', 'Horsehair interfacing']
  },
  {
    id: 'EXP_002',
    title: 'Heat-Pressed Hybrid',
    category: 'MATERIAL',
    status: 'ACTIVE',
    date: '2024.02.03',
    description: 'Fusing disparate materials through industrial heat-pressing techniques.',
    techniques: ['Thermoplastic bonding', 'Ultrasonic welding', 'Heat lamination'],
    materials: ['TPU film', 'Organic cotton', 'Recycled polyester mesh']
  },
  {
    id: 'EXP_003',
    title: 'Volume Manipulation Study',
    category: 'CONSTRUCTION',
    status: 'ACTIVE',
    date: '2024.02.20',
    description: 'Exploring three-dimensional forms through structural padding and wire frameworks.',
    techniques: ['3D pattern making', 'Wire frame construction', 'Sculptural draping'],
    materials: ['Memory foam', 'Steel wire', 'Tyvek paper']
  },
  {
    id: 'EXP_004',
    title: 'Sacai-Inspired Splicing',
    category: 'HYBRID',
    status: 'COMPLETE',
    date: '2024.01.28',
    description: 'Combining multiple garment typologies into singular hybrid forms.',
    techniques: ['Garment splicing', 'Multi-layer construction', 'Hybrid pattern making'],
    materials: ['Denim', 'Technical nylon', 'Knit jersey']
  },
  {
    id: 'EXP_005',
    title: 'Biodegradable Structures',
    category: 'MATERIAL',
    status: 'ACTIVE',
    date: '2024.03.01',
    description: 'Developing garments designed to decompose, exploring temporality in fashion.',
    techniques: ['Bio-fabrication', 'Natural dyeing', 'Compostable construction'],
    materials: ['Mycelium leather', 'Algae fiber', 'Natural rubber latex']
  },
  {
    id: 'EXP_006',
    title: 'Negative Space Design',
    category: 'PATTERN',
    status: 'ARCHIVED',
    date: '2023.12.10',
    description: 'Creating garments defined by what is removed rather than what remains.',
    techniques: ['Laser cutting', 'Chemical dissolution', 'Strategic destruction'],
    materials: ['Wool felt', 'Acetate film', 'Cotton poplin']
  }
]

export default function LabPage() {
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null)
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETE' | 'ARCHIVED'>('ALL')
  const [category, setCategory] = useState<'ALL' | 'PATTERN' | 'MATERIAL' | 'CONSTRUCTION' | 'HYBRID'>('ALL')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const filteredExperiments = experiments.filter(exp => {
    const statusMatch = filter === 'ALL' || exp.status === filter
    const categoryMatch = category === 'ALL' || exp.category === category
    return statusMatch && categoryMatch
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <div ref={containerRef} className="min-h-screen bg-off-white">

      {/* ==========================================================================
         HEADER - Laboratory Control Panel
         ========================================================================== */}

      <section className="relative pt-32 pb-16 px-8 border-b border-carbon/10">
        {/* Background Pattern */}
        <div className="absolute inset-0 material-paper opacity-50" />

        {/* Status Bar */}
        <div className="relative z-10 max-w-7xl mx-auto mb-12">
          <div className="flex items-center justify-between text-2xs font-mono text-steel mb-8">
            <div className="flex items-center gap-6">
              <span>LABORATORY_INTERFACE v4.0</span>
              <span className="w-2 h-2 bg-accent-blood rounded-full animate-pulse" />
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

          {/* Title */}
          <h1 className="text-6xl font-black mb-6">
            <DeconstructedText intensity={1.5}>
              LABORATORY
            </DeconstructedText>
          </h1>
          <p className="text-lg text-steel max-w-3xl">
            Experimental research facility for garment deconstruction, material innovation,
            and hybrid construction techniques. No commercial intent, pure exploration.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-label">STATUS:</span>
              <div className="flex gap-1">
                {(['ALL', 'ACTIVE', 'COMPLETE', 'ARCHIVED'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`
                      px-3 py-1 text-2xs font-mono uppercase transition-all
                      ${filter === status
                        ? 'bg-carbon text-off-white'
                        : 'bg-transparent text-carbon border border-carbon/20 hover:border-carbon/40'
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
              <span className="text-label">CATEGORY:</span>
              <div className="flex gap-1">
                {(['ALL', 'PATTERN', 'MATERIAL', 'CONSTRUCTION', 'HYBRID'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`
                      px-3 py-1 text-2xs font-mono uppercase transition-all
                      ${category === cat
                        ? 'bg-carbon text-off-white'
                        : 'bg-transparent text-carbon border border-carbon/20 hover:border-carbon/40'
                      }
                    `}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         EXPERIMENTS GRID
         ========================================================================== */}

      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiments.map((experiment, index) => (
              <motion.div
                key={experiment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <LayeredCard
                  layers={2}
                  className="h-full cursor-pointer"
                  interactive={true}
                >
                  <MaterialCard
                    material={
                      experiment.category === 'MATERIAL' ? 'fabric' :
                      experiment.category === 'PATTERN' ? 'paper' :
                      experiment.category === 'CONSTRUCTION' ? 'concrete' :
                      'glass'
                    }
                    className="p-6 h-full"
                    interactive={false}
                  >
                    <div
                      onClick={() => setSelectedExperiment(experiment)}
                      className="h-full flex flex-col"
                    >
                      {/* Header */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <span className="text-2xs font-mono text-steel">
                            {experiment.id}
                          </span>
                          <h3 className="text-xl font-bold mt-1">
                            {experiment.title}
                          </h3>
                        </div>
                        <span className={`
                          text-2xs font-mono px-2 py-1
                          ${experiment.status === 'ACTIVE' ? 'bg-accent-blood text-off-white' :
                            experiment.status === 'COMPLETE' ? 'bg-accent-sage text-off-white' :
                            'bg-steel text-off-white'}
                        `}>
                          {experiment.status}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-steel mb-4 flex-grow">
                        {experiment.description}
                      </p>

                      {/* Metadata */}
                      <div className="space-y-2 text-2xs font-mono">
                        <div className="flex justify-between">
                          <span className="text-steel">CATEGORY</span>
                          <span>{experiment.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-steel">DATE</span>
                          <span>{experiment.date}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-steel">TECHNIQUES</span>
                          <span>{experiment.techniques.length}</span>
                        </div>
                      </div>

                      {/* Corner Marker */}
                      <ConstructionMarker
                        label={experiment.category}
                        position="top-right"
                      />
                    </div>
                  </MaterialCard>
                </LayeredCard>
              </motion.div>
            ))}
          </div>

          {filteredExperiments.length === 0 && (
            <div className="text-center py-16">
              <p className="text-steel">No experiments found matching current filters.</p>
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
            className="fixed inset-0 bg-carbon/80 backdrop-blur-sm z-50 flex items-center justify-center p-8"
            onClick={() => setSelectedExperiment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-off-white max-w-4xl w-full max-h-[90vh] overflow-auto"
              onClick={e => e.stopPropagation()}
            >
              <ExposedSeam showMeasurements={false} showStitching={true} className="p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <span className="text-xs font-mono text-steel">
                      {selectedExperiment.id} / {selectedExperiment.date}
                    </span>
                    <h2 className="text-3xl font-bold mt-2">
                      {selectedExperiment.title}
                    </h2>
                    <span className={`
                      inline-block mt-2 text-xs font-mono px-3 py-1
                      ${selectedExperiment.status === 'ACTIVE' ? 'bg-accent-blood text-off-white' :
                        selectedExperiment.status === 'COMPLETE' ? 'bg-accent-sage text-off-white' :
                        'bg-steel text-off-white'}
                    `}>
                      {selectedExperiment.status}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedExperiment(null)}
                    className="text-2xl hover:text-accent-blood transition-colors"
                  >
                    ×
                  </button>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-label mb-3">DESCRIPTION</h3>
                      <p className="text-body leading-relaxed">
                        {selectedExperiment.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-label mb-3">TECHNIQUES</h3>
                      <ul className="space-y-2">
                        {selectedExperiment.techniques.map((technique, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-accent-blood">→</span>
                            <span className="text-sm">{technique}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-label mb-3">MATERIALS</h3>
                      <ul className="space-y-2">
                        {selectedExperiment.materials.map((material, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-accent-blood">→</span>
                            <span className="text-sm">{material}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-label mb-3">RESEARCH NOTES</h3>
                      <div className="bg-carbon/5 p-4 font-mono text-xs leading-relaxed">
                        <p>Process documentation in progress...</p>
                        <p className="mt-2">Temperature: 23°C</p>
                        <p>Humidity: 45%</p>
                        <p>Pressure: 1013 hPa</p>
                        <p className="mt-2">Next iteration scheduled.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                  <RawEdgeButton variant="primary" size="medium">
                    View Documentation
                  </RawEdgeButton>
                  <RawEdgeButton variant="secondary" size="medium">
                    Download Research
                  </RawEdgeButton>
                </div>
              </ExposedSeam>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==========================================================================
         RESEARCH METHODOLOGY
         ========================================================================== */}

      <EditorialSection
        lineNumber="METHOD"
        title="Research Methodology"
        subtitle="Our approach to experimental fashion"
        className="py-24 px-8 bg-ivory"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Deconstruction */}
            <MaterialCard material="paper" className="p-6">
              <h3 className="text-xl font-bold mb-4">01. DECONSTRUCTION</h3>
              <p className="text-sm text-steel mb-4">
                Breaking down existing garments to understand their fundamental construction.
                Every seam is examined, every pattern piece documented.
              </p>
              <ul className="space-y-2 text-xs">
                <li>• Pattern extraction</li>
                <li>• Seam analysis</li>
                <li>• Material documentation</li>
                <li>• Construction mapping</li>
              </ul>
            </MaterialCard>

            {/* Experimentation */}
            <MaterialCard material="fabric" className="p-6">
              <h3 className="text-xl font-bold mb-4">02. EXPERIMENTATION</h3>
              <p className="text-sm text-steel mb-4">
                Testing new combinations, techniques, and materials.
                Failure is data, success is temporary.
              </p>
              <ul className="space-y-2 text-xs">
                <li>• Material testing</li>
                <li>• Technique development</li>
                <li>• Form exploration</li>
                <li>• Process iteration</li>
              </ul>
            </MaterialCard>

            {/* Documentation */}
            <MaterialCard material="concrete" className="p-6">
              <h3 className="text-xl font-bold mb-4">03. DOCUMENTATION</h3>
              <p className="text-sm text-steel mb-4">
                Recording every step, every decision, every failure.
                Knowledge preserved for future exploration.
              </p>
              <ul className="space-y-2 text-xs">
                <li>• Process photography</li>
                <li>• Technical drawings</li>
                <li>• Material samples</li>
                <li>• Written analysis</li>
              </ul>
            </MaterialCard>
          </div>
        </div>
      </EditorialSection>

      {/* ==========================================================================
         EQUIPMENT & TOOLS
         ========================================================================== */}

      <section className="py-24 px-8 bg-carbon text-off-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Laboratory Equipment</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Industrial Overlock', status: 'OPERATIONAL' },
              { name: 'Ultrasonic Welder', status: 'OPERATIONAL' },
              { name: 'Heat Press 3000', status: 'MAINTENANCE' },
              { name: 'Laser Cutter Pro', status: 'OPERATIONAL' },
              { name: 'Pattern Digitizer', status: 'OPERATIONAL' },
              { name: '3D Body Scanner', status: 'OFFLINE' },
              { name: 'Chemical Bath', status: 'OPERATIONAL' },
              { name: 'Pressure Former', status: 'OPERATIONAL' }
            ].map((equipment, i) => (
              <div key={i} className="space-y-2">
                <h4 className="text-sm font-bold">{equipment.name}</h4>
                <div className="flex items-center gap-2">
                  <span className={`
                    w-2 h-2 rounded-full
                    ${equipment.status === 'OPERATIONAL' ? 'bg-accent-sage animate-pulse' :
                      equipment.status === 'MAINTENANCE' ? 'bg-accent-ochre' :
                      'bg-steel'}
                  `} />
                  <span className="text-2xs font-mono text-steel">
                    {equipment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         FOOTER CALL TO ACTION
         ========================================================================== */}

      <section className="py-16 px-8 bg-off-white border-t border-carbon/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">
            Research Collaboration
          </h3>
          <p className="text-steel mb-8">
            We collaborate with institutions and individuals on experimental fashion research.
            No commercial projects.
          </p>
          <RawEdgeButton variant="primary" size="large">
            Propose Research Project
          </RawEdgeButton>
        </div>
      </section>
    </div>
  )
}