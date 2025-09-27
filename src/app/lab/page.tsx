'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  DeconstructedHover,
  SacaiLayer,
  FragmentMosaic,
  ExposedStructure,
  AsymmetricTransform
} from '@/components/HybridLayerEffects'

// Experiment categories
const experiments = [
  {
    line: '001',
    title: 'PATTERN DECONSTRUCTION',
    status: 'IN_PROGRESS',
    techniques: ['Draping', 'Flat Pattern', 'Digital Morphing'],
    materials: ['Muslin', 'Canvas', 'Synthetic Mesh'],
    phase: 'PROTOTYPE'
  },
  {
    line: '002',
    title: 'MATERIAL MANIPULATION',
    status: 'COMPLETED',
    techniques: ['Heat Press', 'Chemical Treatment', 'Laser Cutting'],
    materials: ['Neoprene', 'PVC', 'Metallic Fiber'],
    phase: 'ARCHIVE'
  },
  {
    line: '003',
    title: 'STRUCTURAL ENGINEERING',
    status: 'TESTING',
    techniques: ['3D Printing', 'Wire Framework', 'Vacuum Forming'],
    materials: ['TPU', 'Carbon Fiber', 'Memory Foam'],
    phase: 'EXPERIMENT'
  },
  {
    line: '004',
    title: 'HYBRID LAYERING',
    status: 'IN_PROGRESS',
    techniques: ['Splicing', 'Overlay', 'Asymmetric Assembly'],
    materials: ['Wool', 'Silk', 'Technical Jersey'],
    phase: 'REFINEMENT'
  }
]

// Process stages
const processStages = [
  { id: 'IDEATION', label: 'Conceptual Framework', duration: '∞' },
  { id: 'PATTERN', label: 'Pattern Engineering', duration: '72hrs' },
  { id: 'TOILE', label: 'Toile Construction', duration: '48hrs' },
  { id: 'FITTING', label: 'Form Analysis', duration: '24hrs' },
  { id: 'CONSTRUCTION', label: 'Final Assembly', duration: '96hrs' },
  { id: 'DESTRUCTION', label: 'Deconstruction', duration: '12hrs' }
]

export default function LabPage() {
  const [activeExperiment, setActiveExperiment] = useState<number | null>(null)
  const [currentStage, setCurrentStage] = useState(0)
  const [isDeconstructed, setIsDeconstructed] = useState(false)
  const [labStatus, setLabStatus] = useState<'OPERATIONAL' | 'EXPERIMENTING' | 'CRITICAL'>('OPERATIONAL')
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Transform scroll to experimental values
  const experimentProgress = useTransform(scrollYProgress, [0, 1], [0, 100])
  const distortionLevel = useTransform(scrollYProgress, [0, 0.5, 1], [0, 10, 0])

  // Cycle through process stages
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % processStages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Random deconstruction events
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsDeconstructed(true)
        setLabStatus('CRITICAL')
        setTimeout(() => {
          setIsDeconstructed(false)
          setLabStatus('OPERATIONAL')
        }, 2000)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-white-0 relative">
      {/* Laboratory Grid Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 overlay-grid opacity-30" />
        <div className="absolute inset-0 overlay-muslin opacity-20" />
      </div>

      {/* Laboratory Status Bar */}
      <motion.div
        className="fixed top-20 left-0 right-0 z-40 bg-black-100 text-white-0 py-2"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between text-micro font-mono">
            <div className="flex items-center gap-6">
              <span>LAB_STATUS: {labStatus}</span>
              <span className="opacity-60">|</span>
              <span>EXPERIMENT_COUNT: {experiments.length}</span>
              <span className="opacity-60">|</span>
              <span>ACTIVE_PROCESS: {processStages[currentStage].label}</span>
            </div>
            <div className="flex items-center gap-4">
              <motion.div
                className="w-2 h-2 rounded-full bg-hybrid-red"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span>NO SALES • ONLY CREATION</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="pt-32 pb-20">
        <div className="container-wide">
          {/* Page Title - Deconstructed */}
          <ExposedStructure showMeasurements className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-micro font-mono text-hybrid-red mb-2">
                SECTION_001 / EXPERIMENTAL_TECHNIQUES
              </div>
              <h1 className="text-display font-black tracking-tightest uppercase">
                <SacaiLayer layers={2} color1="hybrid-blue" color2="hybrid-red">
                  <span className={isDeconstructed ? 'text-deconstructed' : ''}>
                    LABORATORY
                  </span>
                </SacaiLayer>
              </h1>
              <div className="text-lg text-gray-steel mt-4 max-w-2xl">
                Experimental fashion techniques, material research, and structural engineering.
                Every creation begins with destruction.
              </div>
            </motion.div>
          </ExposedStructure>

          {/* Process Timeline */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="border-t border-b border-gray-plaster py-8">
              <div className="relative h-2 bg-gray-plaster mb-8">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-black-100"
                  style={{ width: `${(currentStage + 1) / processStages.length * 100}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {processStages.map((stage, index) => (
                  <motion.div
                    key={stage.id}
                    className={`text-center ${index === currentStage ? 'text-black-100' : 'text-gray-steel'}`}
                    animate={{
                      scale: index === currentStage ? 1.05 : 1,
                      opacity: index === currentStage ? 1 : 0.5
                    }}
                  >
                    <div className="text-micro font-mono mb-1">STAGE_{(index + 1).toString().padStart(2, '0')}</div>
                    <div className="text-xs font-medium uppercase">{stage.label}</div>
                    <div className="text-micro mt-1">{stage.duration}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Experiments Grid - Asymmetric */}
          <div className="grid-margiela gap-8 mb-20">
            {experiments.map((exp, index) => (
              <motion.div
                key={exp.line}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  gridColumn: index % 3 === 0 ? 'span 2' : index % 3 === 1 ? 'span 3' : 'span 1'
                }}
                onMouseEnter={() => setActiveExperiment(index)}
                onMouseLeave={() => setActiveExperiment(null)}
              >
                <AsymmetricTransform intensity={2}>
                  <div className={`
                    relative bg-white-1 p-8
                    border-2 ${activeExperiment === index ? 'border-black-100' : 'border-gray-plaster'}
                    transition-all duration-300
                    ${activeExperiment === index ? 'shadow-fabric-3' : 'shadow-fabric-1'}
                  `}>
                    {/* Pattern Mark */}
                    <div className="absolute -top-3 -left-3 bg-white-0 px-2 text-micro font-mono text-hybrid-red">
                      LINE_{exp.line}
                    </div>

                    {/* Status Indicator */}
                    <div className="absolute top-4 right-4">
                      <div className={`
                        w-2 h-2 rounded-full
                        ${exp.status === 'COMPLETED' ? 'bg-black-100' :
                          exp.status === 'IN_PROGRESS' ? 'bg-hybrid-blue animate-pulse' :
                          'bg-gray-steel'}
                      `} />
                    </div>

                    {/* Content */}
                    <DeconstructedHover intensity={1}>
                      <h3 className="text-xl font-bold mb-4 tracking-wider">
                        {exp.title}
                      </h3>

                      <div className="space-y-4">
                        {/* Techniques */}
                        <div>
                          <div className="text-micro font-mono text-gray-steel mb-2">
                            TECHNIQUES:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {exp.techniques.map(tech => (
                              <span key={tech} className="text-xs px-2 py-1 bg-gray-plaster/30">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Materials */}
                        <div>
                          <div className="text-micro font-mono text-gray-steel mb-2">
                            MATERIALS:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {exp.materials.map(mat => (
                              <span key={mat} className="text-xs px-2 py-1 border border-gray-plaster">
                                {mat}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Phase */}
                        <div className="pt-4 border-t border-gray-plaster">
                          <div className="flex items-center justify-between">
                            <span className="text-micro font-mono">PHASE:</span>
                            <span className="text-sm font-medium">{exp.phase}</span>
                          </div>
                        </div>
                      </div>
                    </DeconstructedHover>

                    {/* Hover Reveal - Technical Drawing */}
                    <AnimatePresence>
                      {activeExperiment === index && (
                        <motion.div
                          className="absolute inset-0 bg-white-0/95 flex items-center justify-center pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <div className="text-center">
                            <div className="text-4xl font-mono mb-2">⊗</div>
                            <div className="text-micro font-mono uppercase">
                              Technical Documentation<br />
                              Access Restricted
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AsymmetricTransform>
              </motion.div>
            ))}
          </div>

          {/* Laboratory Equipment Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-20"
          >
            <ExposedStructure showGrid className="p-12 bg-gray-plaster/10">
              <h2 className="text-3xl font-bold mb-8 text-center">EQUIPMENT & TOOLS</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { tool: 'INDUSTRIAL SEWING', model: 'JUKI DDL-9000C', status: 'ACTIVE' },
                  { tool: 'PATTERN PLOTTER', model: 'GERBER P2C', status: 'ACTIVE' },
                  { tool: 'LASER CUTTER', model: 'EPILOG FUSION', status: 'MAINTENANCE' },
                  { tool: 'ULTRASONIC WELDER', model: 'SONIC-X1', status: 'ACTIVE' },
                  { tool: '3D BODY SCANNER', model: 'SIZE STREAM', status: 'ACTIVE' },
                  { tool: 'HEAT PRESS', model: 'STAHLS 15x15', status: 'ACTIVE' },
                  { tool: 'VACUUM FORMER', model: 'FORMECH 508', status: 'TESTING' },
                  { tool: 'FABRIC PRINTER', model: 'EPSON F2100', status: 'ACTIVE' }
                ].map((equip, i) => (
                  <motion.div
                    key={equip.tool}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <div className="text-4xl mb-2">⚙</div>
                    <div className="text-xs font-bold uppercase">{equip.tool}</div>
                    <div className="text-micro text-gray-steel">{equip.model}</div>
                    <div className={`text-micro mt-1 ${
                      equip.status === 'ACTIVE' ? 'text-hybrid-blue' :
                      equip.status === 'MAINTENANCE' ? 'text-hybrid-red' :
                      'text-gray-steel'
                    }`}>
                      {equip.status}
                    </div>
                  </motion.div>
                ))}
              </div>
            </ExposedStructure>
          </motion.div>

          {/* Live Experiment Monitor */}
          <FragmentMosaic fragments={4} className="mb-20">
            <div className="bg-black-100 text-white-0 p-16 text-center">
              <h3 className="text-2xl font-bold mb-4">LIVE EXPERIMENT FEED</h3>
              <div className="text-mono text-sm opacity-60">
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  MONITORING ACTIVE PROCESSES...<br/>
                  DECONSTRUCTION IN PROGRESS...<br/>
                  PATTERN ANALYSIS: 87% COMPLETE
                </motion.div>
              </div>
            </div>
          </FragmentMosaic>

          {/* Laboratory Philosophy */}
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-micro font-mono text-gray-steel mb-4">
              LABORATORY MANIFESTO
            </div>
            <h2 className="text-4xl font-black mb-8">
              EVERY SEAM TELLS A STORY<br/>
              EVERY CUT IS DELIBERATE<br/>
              EVERY LAYER HAS PURPOSE
            </h2>
            <div className="text-lg text-gray-steel max-w-2xl mx-auto">
              In this laboratory, fashion is dissected, reconstructed, and reimagined.
              We don't follow trends—we deconstruct them.
            </div>
          </motion.div>
        </div>
      </div>

      {/* Progress Indicator */}
      <motion.div
        className="fixed bottom-8 right-8 text-micro font-mono"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
      >
        <div className="bg-white-0 border border-black-100 p-4">
          SCROLL_PROGRESS: {Math.round(experimentProgress.get())}%
        </div>
      </motion.div>
    </div>
  )
}