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

// Extreme Experiments - Hybrid of Margiela & Sacai
const extremeExperiments = [
  {
    line: '00',
    title: 'TENSION BREAKING',
    description: 'Testing fabric limits beyond conventional boundaries',
    type: 'MATERIAL_STRESS',
    maxValue: 10000,
    currentValue: 0,
    unit: 'N/cm²',
    status: 'ACTIVE',
    philosophy: 'Destruction reveals true strength'
  },
  {
    line: '01',
    title: 'THERMAL DESTRUCTION',
    description: 'Heat resistance at fashion melting points',
    type: 'TEMPERATURE_EXTREME',
    maxValue: 300,
    currentValue: 20,
    unit: '°C',
    status: 'TESTING',
    philosophy: 'Fire transforms, not destroys'
  },
  {
    line: '10',
    title: 'VELOCITY DISTORTION',
    description: 'Movement beyond human perception',
    type: 'SPEED_TRIAL',
    maxValue: 500,
    currentValue: 0,
    unit: 'RPM',
    status: 'CALIBRATING',
    philosophy: 'Speed creates new forms'
  },
  {
    line: '11',
    title: 'PRESSURE MORPHING',
    description: 'Compression until transformation',
    type: 'ATMOSPHERIC_PRESSURE',
    maxValue: 10,
    currentValue: 1,
    unit: 'ATM',
    status: 'PRESSURIZING',
    philosophy: 'Pressure reveals essence'
  }
]

// Test Materials - Fashion Fabrics
const extremeMaterials = [
  { id: 'MAT_00', name: 'DISTRESSED_COTTON', resistance: 60, flexibility: 90, layers: 1 },
  { id: 'MAT_01', name: 'DECONSTRUCTED_WOOL', resistance: 75, flexibility: 70, layers: 2 },
  { id: 'MAT_10', name: 'HYBRID_SYNTHETIC', resistance: 95, flexibility: 50, layers: 3 },
  { id: 'MAT_11', name: 'EXPOSED_CANVAS', resistance: 85, flexibility: 40, layers: 4 }
]

// Extreme States
const extremeStates = [
  'STABLE_CONSTRUCTION',
  'INITIAL_STRESS',
  'DEFORMATION_BEGINS',
  'CRITICAL_THRESHOLD',
  'TOTAL_DECONSTRUCTION'
]

type ViewMode = 'EXPERIMENTS' | 'MATERIALS' | 'PHILOSOPHY' | 'ARCHIVE'

export default function ExtremePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('EXPERIMENTS')
  const [experiments, setExperiments] = useState(extremeExperiments)
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null)
  const [selectedMaterial, setSelectedMaterial] = useState<typeof extremeMaterials[0] | null>(null)
  const [extremeLevel, setExtremeLevel] = useState(0)
  const [currentState, setCurrentState] = useState(0)
  const [isBreaking, setIsBreaking] = useState(false)
  const [dataPoints, setDataPoints] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Transform values
  const stressLevel = useTransform(scrollYProgress, [0, 1], [0, 100])
  const distortion = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 0.5])
  const breakingPoint = useTransform(scrollYProgress, [0, 0.8, 1], [0, 50, 100])

  // Simulate extreme testing
  useEffect(() => {
    if (!activeExperiment) return

    const interval = setInterval(() => {
      setExperiments(prev => prev.map(exp => {
        if (exp.line === activeExperiment) {
          const increment = Math.random() * exp.maxValue * 0.05
          const newValue = Math.min(exp.maxValue, exp.currentValue + increment)

          // Update extreme level
          const percentage = (newValue / exp.maxValue) * 100
          setExtremeLevel(percentage)

          // Check breaking point
          if (percentage > 90) {
            setIsBreaking(true)
            setTimeout(() => setIsBreaking(false), 2000)
          }

          return { ...exp, currentValue: newValue }
        }
        return exp
      }))

      // Record data points
      setDataPoints(prev => [...prev.slice(-50), Math.random() * 100])
    }, 100)

    return () => clearInterval(interval)
  }, [activeExperiment])

  // Cycle through states
  useEffect(() => {
    const stateIndex = Math.floor(extremeLevel / 20)
    setCurrentState(Math.min(stateIndex, extremeStates.length - 1))
  }, [extremeLevel])

  const renderExperimentsView = () => (
    <div className="grid-margiela gap-8">
      {experiments.map((exp, index) => (
        <motion.div
          key={exp.line}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          style={{
            gridColumn: index % 2 === 0 ? 'span 2' : 'span 1'
          }}
          className="relative"
        >
          <AsymmetricTransform intensity={exp.currentValue / exp.maxValue * 3}>
            <DeconstructedHover intensity={2}>
              <SacaiLayer layers={2}>
                <div className={`
                  relative bg-white-1 p-8
                  border-2 ${activeExperiment === exp.line ? 'border-hybrid-red' : 'border-gray-plaster'}
                  transition-all duration-300
                  ${isBreaking && activeExperiment === exp.line ? 'animate-pulse' : ''}
                `}>
                  {/* Line Number */}
                  <div className="absolute -top-4 -left-4 bg-white-0 px-3 py-1 border-2 border-black-100">
                    <span className="text-lg font-bold">{exp.line}</span>
                  </div>

                  {/* Status */}
                  <div className="absolute top-4 right-4">
                    <div className={`px-3 py-1 text-xs font-mono ${
                      exp.status === 'ACTIVE' ? 'bg-black-100 text-white-0' :
                      exp.status === 'TESTING' ? 'bg-hybrid-red text-white-0' :
                      exp.status === 'CALIBRATING' ? 'bg-hybrid-blue text-white-0' :
                      'bg-gray-steel text-white-0'
                    }`}>
                      {exp.status}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-black mb-3 mt-6">{exp.title}</h3>
                  <p className="text-sm mb-4 opacity-80">{exp.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-micro font-mono mb-2">
                      <span>{exp.type}</span>
                      <span>{exp.currentValue.toFixed(0)}/{exp.maxValue} {exp.unit}</span>
                    </div>
                    <div className="h-3 bg-gray-plaster relative overflow-hidden">
                      <motion.div
                        className={`absolute top-0 left-0 h-full ${
                          exp.currentValue / exp.maxValue > 0.9 ? 'bg-hybrid-red' :
                          exp.currentValue / exp.maxValue > 0.6 ? 'bg-black-100' :
                          'bg-gray-steel'
                        }`}
                        animate={{ width: `${(exp.currentValue / exp.maxValue) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                      {/* Stress Visualization */}
                      {activeExperiment === exp.line && (
                        <div className="absolute inset-0 flex items-center">
                          {dataPoints.slice(-10).map((point, i) => (
                            <div
                              key={i}
                              className="flex-1 h-full border-r border-white-0/20"
                              style={{
                                background: `linear-gradient(0deg, transparent ${100 - point}%, rgba(255,0,0,0.5) ${100 - point}%)`
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Philosophy */}
                  <p className="text-xs italic opacity-60">"{exp.philosophy}"</p>

                  {/* Test Controls */}
                  <div className="mt-6 flex gap-2">
                    <button
                      onClick={() => setActiveExperiment(exp.line === activeExperiment ? null : exp.line)}
                      className={`px-4 py-2 text-xs font-mono transition-all ${
                        activeExperiment === exp.line
                          ? 'bg-hybrid-red text-white-0'
                          : 'bg-white-0 border border-black-100 hover:bg-black-100 hover:text-white-0'
                      }`}
                    >
                      {activeExperiment === exp.line ? 'STOP' : 'START'}
                    </button>
                    <button
                      onClick={() => setExperiments(prev => prev.map(e =>
                        e.line === exp.line ? { ...e, currentValue: 0 } : e
                      ))}
                      className="px-4 py-2 text-xs font-mono bg-white-0 border border-gray-plaster hover:border-black-100"
                    >
                      RESET
                    </button>
                  </div>
                </div>
              </SacaiLayer>
            </DeconstructedHover>
          </AsymmetricTransform>
        </motion.div>
      ))}
    </div>
  )

  const renderMaterialsView = () => (
    <FragmentMosaic fragments={4}>
      <div className="p-12 bg-white-1">
        <h3 className="text-3xl font-black mb-12">EXTREME MATERIALS</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {extremeMaterials.map((material, index) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedMaterial(material)}
              className="cursor-pointer"
            >
              <ExposedStructure showMeasurements={selectedMaterial?.id === material.id}>
                <SacaiLayer layers={material.layers}>
                  <div className="p-8 bg-white-0 border-2 border-gray-plaster hover:border-black-100 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-micro font-mono mb-1">{material.id}</div>
                        <h4 className="text-xl font-black">{material.name}</h4>
                      </div>
                      <div className="text-micro font-mono">
                        LAYERS: {material.layers}
                      </div>
                    </div>

                    {/* Material Properties */}
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>RESISTANCE</span>
                          <span>{material.resistance}%</span>
                        </div>
                        <div className="h-2 bg-gray-plaster">
                          <div
                            className="h-full bg-black-100"
                            style={{ width: `${material.resistance}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>FLEXIBILITY</span>
                          <span>{material.flexibility}%</span>
                        </div>
                        <div className="h-2 bg-gray-plaster">
                          <div
                            className="h-full bg-gray-steel"
                            style={{ width: `${material.flexibility}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stress Test Result */}
                    <div className="mt-6 p-4 bg-gray-plaster/20">
                      <div className="text-xs font-mono opacity-60">
                        BREAKING POINT: {(material.resistance * 100).toFixed(0)} N/cm²
                      </div>
                    </div>
                  </div>
                </SacaiLayer>
              </ExposedStructure>
            </motion.div>
          ))}
        </div>
      </div>
    </FragmentMosaic>
  )

  const renderPhilosophyView = () => (
    <div className="max-w-4xl mx-auto py-12">
      <ExposedStructure showGrid>
        <div className="p-12 bg-white-1">
          <h3 className="text-3xl font-black mb-8">EXTREME PHILOSOPHY</h3>

          <div className="space-y-8 text-lg leading-relaxed">
            <p>
              At CINCH LAB, extreme is not a limit—it is a beginning.
              We push fashion to its breaking point, not to destroy, but to discover.
            </p>

            <p className="font-bold">
              "In the moment of breaking, we find the truth of construction.
              In the instant of collapse, we understand structure.
              This is the hybrid philosophy of Margiela meets Sacai."
            </p>

            <p>
              Every extreme test is a conversation between destruction and creation.
              We layer stress upon stress, watching forms emerge from pressure,
              beauty from breaking, innovation from impossibility.
            </p>

            <div className="border-t border-black-100 pt-8">
              <h4 className="text-xl font-black mb-4">EXTREME PRINCIPLES</h4>
              <ul className="space-y-2">
                <li>• Breaking points are starting points</li>
                <li>• Extreme pressure creates extreme beauty</li>
                <li>• Destruction is the highest form of construction</li>
                <li>• Limits exist only to be exceeded</li>
                <li>• In extremity, we find authenticity</li>
              </ul>
            </div>
          </div>
        </div>
      </ExposedStructure>
    </div>
  )

  const renderArchiveView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(9)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, rotate: -5 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <AsymmetricTransform intensity={1}>
            <DeconstructedHover intensity={2}>
              <div className="bg-white-1 p-6 border-2 border-gray-plaster">
                <div className="text-micro font-mono mb-2">
                  EXTREME_TEST_{(i + 1).toString().padStart(3, '0')}
                </div>
                <div className="aspect-square bg-gradient-to-br from-gray-plaster to-black-100 mb-4 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white-0 text-6xl font-mono opacity-20">
                      {extremeStates[i % extremeStates.length].charAt(0)}
                    </span>
                  </div>
                </div>
                <h4 className="font-bold mb-2">TEST {i + 1}</h4>
                <p className="text-xs opacity-60">
                  Breaking point: {(Math.random() * 10000).toFixed(0)} N/cm²
                </p>
              </div>
            </DeconstructedHover>
          </AsymmetricTransform>
        </motion.div>
      ))}
    </div>
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-white-0 relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 overlay-grid opacity-20" />
        {isBreaking && (
          <div className="absolute inset-0 bg-hybrid-red/10 animate-pulse" />
        )}
      </div>

      {/* Extreme Status Bar */}
      <motion.div
        className="fixed top-20 left-0 right-0 z-40 bg-black-100 text-white-0 py-2"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between text-micro font-mono">
            <div className="flex items-center gap-6">
              <span>EXTREME_LEVEL: {extremeLevel.toFixed(0)}%</span>
              <span className="opacity-60">|</span>
              <span>STRESS: {Math.round(stressLevel.get())}%</span>
              <span className="opacity-60">|</span>
              <motion.span
                className={extremeLevel > 80 ? 'text-hybrid-red animate-pulse' : ''}
              >
                STATE: {extremeStates[currentState]}
              </motion.span>
            </div>
            <span>CINCH LAB × EXTREME ENGINE</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="pt-32 pb-20">
        <div className="container-wide">
          {/* Page Title */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ExposedStructure showMeasurements={isBreaking}>
              <div className="py-12">
                <div className="text-micro font-mono text-hybrid-red mb-2">
                  HYBRID_EXTREME / BREAKING_POINTS
                </div>
                <h1 className="text-display font-black tracking-tightest uppercase">
                  <SacaiLayer layers={2} color1="hybrid-red" color2="black-100">
                    <AsymmetricTransform intensity={extremeLevel / 20}>
                      EXTREME
                    </AsymmetricTransform>
                  </SacaiLayer>
                </h1>
                <div className="text-lg text-gray-steel mt-4 max-w-2xl">
                  Testing the limits of fashion construction. Where Margiela's deconstruction
                  meets Sacai's layered extremity. Breaking points become starting points.
                </div>
              </div>
            </ExposedStructure>
          </motion.div>

          {/* View Controls */}
          <div className="mb-12">
            <div className="flex gap-2">
              {(['EXPERIMENTS', 'MATERIALS', 'PHILOSOPHY', 'ARCHIVE'] as ViewMode[]).map(mode => (
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
            {viewMode === 'MATERIALS' && renderMaterialsView()}
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
              EXTREME MANIFESTO
            </div>
            <h2 className="text-4xl font-black mb-8">
              BREAK TO BUILD • DESTROY TO DISCOVER
            </h2>
            <p className="text-lg text-gray-steel max-w-2xl mx-auto">
              At the extremes of fashion, we find its essence. This is where CINCH LAB
              operates—at the breaking point of convention, the melting point of tradition.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Material Detail Modal */}
      <AnimatePresence>
        {selectedMaterial && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMaterial(null)}
              className="fixed inset-0 bg-black-100/90 z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-16 md:inset-32 bg-white-0 z-50 overflow-auto"
            >
              <div className="p-12">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-micro font-mono text-hybrid-red mb-2">
                      {selectedMaterial.id}
                    </div>
                    <h2 className="text-4xl font-black">{selectedMaterial.name}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedMaterial(null)}
                    className="text-2xl hover:text-hybrid-red transition-colors"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold mb-4">MATERIAL PROPERTIES</h3>
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm">Resistance: </span>
                        <span className="font-bold">{selectedMaterial.resistance}%</span>
                      </div>
                      <div>
                        <span className="text-sm">Flexibility: </span>
                        <span className="font-bold">{selectedMaterial.flexibility}%</span>
                      </div>
                      <div>
                        <span className="text-sm">Layers: </span>
                        <span className="font-bold">{selectedMaterial.layers}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold mb-4">TEST RESULTS</h3>
                    <div className="space-y-2 text-sm font-mono opacity-60">
                      <div>MAX_LOAD: {(selectedMaterial.resistance * 100).toFixed(0)} N/cm²</div>
                      <div>ELASTICITY: {selectedMaterial.flexibility}%</div>
                      <div>RECOVERY: {(selectedMaterial.flexibility * 0.8).toFixed(0)}%</div>
                      <div>FAILURE_POINT: CLASSIFIED</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}