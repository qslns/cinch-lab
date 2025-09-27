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

// Chaos Experiments - Margiela Line System
const chaosExperiments = [
  {
    line: '0',
    title: 'PATTERN DISSOLUTION',
    status: 'ACTIVE',
    description: 'Systematic deconstruction of traditional pattern making',
    entropy: 0,
    maxEntropy: 100,
    formula: 'ΔS = k·ln(Ω)',
    technique: 'FLAT PATTERN CHAOS'
  },
  {
    line: '1',
    title: 'STRUCTURAL COLLAPSE',
    status: 'CRITICAL',
    description: 'Intentional failure of garment architecture',
    entropy: 0,
    maxEntropy: 100,
    formula: 'H = -Σp·log(p)',
    technique: 'DRAPING ENTROPY'
  },
  {
    line: '10',
    title: 'SEAM REBELLION',
    status: 'UNSTABLE',
    description: 'Exposed construction as design philosophy',
    entropy: 0,
    maxEntropy: 100,
    formula: 'S = -kΣp·ln(p)',
    technique: 'RAW EDGE THEORY'
  },
  {
    line: '4',
    title: 'VOLUME DISTORTION',
    status: 'EXPERIMENTAL',
    description: 'Asymmetric expansion and compression',
    entropy: 0,
    maxEntropy: 100,
    formula: 'V = ∫∫∫ρ dxdydz',
    technique: 'SPACE MANIPULATION'
  }
]

// Chaos Generators - Deconstructed Elements
const chaosGenerators = [
  { id: 'GEN_00', type: 'SLEEVE_DISPLACEMENT', active: false, power: 0 },
  { id: 'GEN_01', type: 'COLLAR_INVERSION', active: false, power: 0 },
  { id: 'GEN_10', type: 'HEMLINE_FRACTURE', active: false, power: 0 },
  { id: 'GEN_11', type: 'POCKET_MIGRATION', active: false, power: 0 },
  { id: 'GEN_20', type: 'BUTTON_REBELLION', active: false, power: 0 },
  { id: 'GEN_23', type: 'LINING_EXPOSURE', active: false, power: 0 }
]

// Chaos States
const chaosStates = [
  'CONTROLLED_DESTRUCTION',
  'SYSTEMATIC_ANARCHY',
  'ORGANIZED_CHAOS',
  'CALCULATED_DISORDER',
  'INTENTIONAL_ACCIDENT'
]

type ViewMode = 'EXPERIMENTS' | 'GENERATORS' | 'PHILOSOPHY' | 'ARCHIVE'

export default function ChaosPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('EXPERIMENTS')
  const [experiments, setExperiments] = useState(chaosExperiments)
  const [generators, setGenerators] = useState(chaosGenerators)
  const [chaosLevel, setChaosLevel] = useState(0)
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null)
  const [currentState, setCurrentState] = useState(0)
  const [isDeconstructing, setIsDeconstructing] = useState(false)
  const [selectedGenerator, setSelectedGenerator] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Transform values for chaos effects
  const distortion = useTransform(scrollYProgress, [0, 0.5, 1], [0, 10, 0])
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360])

  // Entropy simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setExperiments(prev => prev.map(exp => ({
        ...exp,
        entropy: Math.min(exp.maxEntropy, exp.entropy + Math.random() * chaosLevel * 0.3)
      })))
    }, 100)
    return () => clearInterval(interval)
  }, [chaosLevel])

  // Cycle through chaos states
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentState((prev) => (prev + 1) % chaosStates.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Random deconstruction events
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95 && chaosLevel > 50) {
        setIsDeconstructing(true)
        setTimeout(() => setIsDeconstructing(false), 2000)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [chaosLevel])

  const toggleGenerator = (id: string) => {
    setGenerators(prev => prev.map(gen => {
      if (gen.id === id) {
        const newActive = !gen.active
        const newPower = newActive ? 50 + Math.random() * 50 : 0
        setChaosLevel(current => {
          const delta = newActive ? 15 : -15
          return Math.max(0, Math.min(100, current + delta))
        })
        return { ...gen, active: newActive, power: newPower }
      }
      return gen
    }))
  }

  const renderExperimentsView = () => (
    <div className="grid-margiela gap-8">
      {experiments.map((exp, index) => (
        <motion.div
          key={exp.line}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          style={{
            gridColumn: index % 3 === 0 ? 'span 2' : 'span 1'
          }}
          onMouseEnter={() => setActiveExperiment(exp.line)}
          onMouseLeave={() => setActiveExperiment(null)}
        >
          <AsymmetricTransform intensity={chaosLevel / 50}>
            <DeconstructedHover intensity={2}>
              <div className={`
                relative bg-white-1 p-8
                border-2 ${activeExperiment === exp.line ? 'border-black-100' : 'border-gray-plaster'}
                transition-all duration-300
                ${isDeconstructing && activeExperiment === exp.line ? 'transform rotate-3' : ''}
              `}>
                {/* Line Number - Margiela Style */}
                <div className="absolute -top-4 -left-4 bg-white-0 px-3 py-1 border-2 border-black-100">
                  <span className="text-lg font-bold">{exp.line}</span>
                </div>

                {/* Status Indicator */}
                <div className="absolute top-4 right-4">
                  <div className={`px-3 py-1 text-xs font-mono ${
                    exp.status === 'CRITICAL' ? 'bg-hybrid-red text-white-0' :
                    exp.status === 'ACTIVE' ? 'bg-black-100 text-white-0' :
                    exp.status === 'UNSTABLE' ? 'bg-hybrid-blue text-white-0' :
                    'bg-gray-plaster'
                  }`}>
                    {exp.status}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black mb-3 mt-6">{exp.title}</h3>
                <p className="text-sm mb-4 opacity-80">{exp.description}</p>

                {/* Entropy Visualization */}
                <div className="mb-4">
                  <div className="flex justify-between text-micro font-mono mb-2">
                    <span>ENTROPY</span>
                    <span>{exp.entropy.toFixed(1)}/{exp.maxEntropy} J/K</span>
                  </div>
                  <div className="h-2 bg-gray-plaster relative overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-black-100"
                      animate={{ width: `${(exp.entropy / exp.maxEntropy) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Technical Details */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="font-mono opacity-60">FORMULA:</span>
                    <span className="font-mono">{exp.formula}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono opacity-60">TECHNIQUE:</span>
                    <span className="font-bold">{exp.technique}</span>
                  </div>
                </div>

                {/* Chaos Pattern */}
                {activeExperiment === exp.line && (
                  <div className="mt-4 grid grid-cols-8 gap-1">
                    {[...Array(16)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-black-100"
                        animate={{
                          scale: [1, Math.random() * 2, 1],
                          rotate: [0, Math.random() * 180, 0]
                        }}
                        transition={{
                          duration: Math.random() * 2 + 1,
                          repeat: Infinity,
                          delay: i * 0.05
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </DeconstructedHover>
          </AsymmetricTransform>
        </motion.div>
      ))}
    </div>
  )

  const renderGeneratorsView = () => (
    <FragmentMosaic fragments={6}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-8 bg-white-1">
        {generators.map((gen) => (
          <motion.button
            key={gen.id}
            onClick={() => toggleGenerator(gen.id)}
            className={`p-6 border-2 transition-all ${
              gen.active
                ? 'border-black-100 bg-black-100 text-white-0'
                : 'border-gray-plaster bg-white-0 hover:border-black-100'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-micro font-mono mb-2">{gen.id}</div>
            <div className="text-sm font-black mb-4">{gen.type.replace(/_/g, ' ')}</div>

            {/* Power Level */}
            <div className="h-1 bg-gray-plaster relative mb-2">
              {gen.active && (
                <motion.div
                  className="absolute top-0 left-0 h-full bg-hybrid-red"
                  animate={{ width: `${gen.power}%` }}
                />
              )}
            </div>

            <div className="text-xs font-mono">
              {gen.active ? `POWER: ${gen.power.toFixed(0)}%` : 'INACTIVE'}
            </div>
          </motion.button>
        ))}
      </div>
    </FragmentMosaic>
  )

  const renderPhilosophyView = () => (
    <SacaiLayer layers={3}>
      <div className="max-w-4xl mx-auto py-12">
        <ExposedStructure showGrid>
          <div className="p-12 bg-white-1">
            <h3 className="text-3xl font-black mb-8">CHAOS PHILOSOPHY</h3>

            <div className="space-y-8 text-lg leading-relaxed">
              <p>
                Chaos is not disorder—it is the highest form of order. In the CINCH LAB,
                we embrace the systematic destruction of conventional fashion logic.
              </p>

              <p className="font-bold">
                "To destroy is to understand. Every seam we expose, every pattern we fracture,
                every structure we collapse teaches us the true nature of garment construction."
              </p>

              <p>
                Following Margiela's principle of deconstruction, we treat chaos as a creative force.
                The exposed lining becomes the exterior. The unfinished edge becomes the statement.
                The mistake becomes the masterpiece.
              </p>

              <div className="border-t border-black-100 pt-8">
                <h4 className="text-xl font-black mb-4">CHAOS PRINCIPLES</h4>
                <ul className="space-y-2">
                  <li>• Intentional destruction creates unintentional beauty</li>
                  <li>• Every garment contains its own deconstruction</li>
                  <li>• Chaos reveals the truth beneath the surface</li>
                  <li>• Order is temporary, entropy is eternal</li>
                  <li>• The accident is the only authentic creation</li>
                </ul>
              </div>
            </div>
          </div>
        </ExposedStructure>
      </div>
    </SacaiLayer>
  )

  const renderArchiveView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(9)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05 }}
        >
          <DeconstructedHover intensity={1}>
            <div className="bg-white-1 p-6 border-2 border-gray-plaster">
              <div className="text-micro font-mono mb-2">CHAOS_ARCHIVE_{(i + 1).toString().padStart(3, '0')}</div>
              <div className="aspect-square bg-gray-plaster mb-4 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-mono opacity-20">⊗</span>
                </div>
              </div>
              <h4 className="font-bold mb-2">EXPERIMENT {i + 1}</h4>
              <p className="text-xs opacity-60">
                Documentation of chaos pattern {i + 1}. Results classified.
              </p>
            </div>
          </DeconstructedHover>
        </motion.div>
      ))}
    </div>
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-white-0 relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 overlay-grid opacity-20" />
        {isDeconstructing && (
          <div className="absolute inset-0 bg-black-100/10 animate-pulse" />
        )}
      </div>

      {/* Chaos Status Bar */}
      <motion.div
        className="fixed top-20 left-0 right-0 z-40 bg-black-100 text-white-0 py-2"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between text-micro font-mono">
            <div className="flex items-center gap-6">
              <span>CHAOS_LEVEL: {chaosLevel.toFixed(0)}%</span>
              <span className="opacity-60">|</span>
              <span>ENTROPY: {experiments.reduce((sum, exp) => sum + exp.entropy, 0).toFixed(0)} J/K</span>
              <span className="opacity-60">|</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                STATE: {chaosStates[currentState]}
              </motion.span>
            </div>
            <span>CINCH LAB × CHAOS ENGINE</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="pt-32 pb-20">
        <div className="container-wide">
          {/* Page Title - Deconstructed */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ExposedStructure showMeasurements={isDeconstructing}>
              <div className="py-12">
                <div className="text-micro font-mono text-hybrid-red mb-2">
                  EXPERIMENTAL_CHAOS / CONTROLLED_DESTRUCTION
                </div>
                <h1 className="text-display font-black tracking-tightest uppercase">
                  <AsymmetricTransform intensity={chaosLevel / 30}>
                    CHAOS
                  </AsymmetricTransform>
                </h1>
                <div className="text-lg text-gray-steel mt-4 max-w-2xl">
                  Systematic deconstruction laboratory. Where fashion meets entropy.
                  Every creation begins with controlled destruction.
                </div>
              </div>
            </ExposedStructure>
          </motion.div>

          {/* Chaos Control */}
          <div className="mb-12 p-8 bg-white-1 border-2 border-black-100">
            <div className="flex items-center gap-8">
              <label className="text-sm font-mono font-bold">MASTER_CHAOS_CONTROL:</label>
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={chaosLevel}
                  onChange={(e) => setChaosLevel(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-micro font-mono opacity-60">ORDER</span>
                  <span className="text-micro font-mono opacity-60">CHAOS</span>
                  <span className="text-micro font-mono opacity-60">SINGULARITY</span>
                </div>
              </div>
              <div className="text-2xl font-black">{chaosLevel}%</div>
            </div>
          </div>

          {/* View Controls */}
          <div className="mb-12">
            <div className="flex gap-2">
              {(['EXPERIMENTS', 'GENERATORS', 'PHILOSOPHY', 'ARCHIVE'] as ViewMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 text-xs font-mono transition-all ${
                    viewMode === mode
                      ? 'bg-black-100 text-white-0'
                      : 'bg-white-0 text-black-100 border border-gray-plaster hover:border-black-100'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Content Display */}
          <div className="mb-20">
            {viewMode === 'EXPERIMENTS' && renderExperimentsView()}
            {viewMode === 'GENERATORS' && renderGeneratorsView()}
            {viewMode === 'PHILOSOPHY' && renderPhilosophyView()}
            {viewMode === 'ARCHIVE' && renderArchiveView()}
          </div>

          {/* Laboratory Statement */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-micro font-mono text-gray-steel mb-4">
              CHAOS MANIFESTO
            </div>
            <h2 className="text-4xl font-black mb-8">
              DESTROY TO CREATE • DECONSTRUCT TO UNDERSTAND
            </h2>
            <p className="text-lg text-gray-steel max-w-2xl mx-auto">
              In chaos, we find truth. In destruction, we find beauty.
              This is the way of CINCH LAB.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}