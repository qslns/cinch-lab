'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import CipherText from '@/components/CipherText'

// Dynamic imports for 3D
const InteractiveCanvas = dynamic(() => import('@/components/InteractiveCanvas'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-carbon-black animate-pulse" />
})

// Laboratory Experiments Data
const experiments = [
  {
    id: 'EXP_001',
    title: 'FABRIC',
    subtitle: 'MOLECULAR DECONSTRUCTION',
    formula: 'C₁₀H₁₄N₂',
    status: 'ACTIVE',
    danger: 3,
    description: 'Material decomposition at molecular level',
    color: 'safety-orange'
  },
  {
    id: 'EXP_002',
    title: 'FORM',
    subtitle: 'STRUCTURAL ANALYSIS',
    formula: 'SiO₂',
    status: 'TESTING',
    danger: 2,
    description: 'Geometric transformation protocols',
    color: 'centrifuge-blue'
  },
  {
    id: 'EXP_003',
    title: 'VOID',
    subtitle: 'NEGATIVE SPACE THEORY',
    formula: '∅',
    status: 'UNSTABLE',
    danger: 5,
    description: 'Exploring absence as presence',
    color: 'glitch-red'
  },
  {
    id: 'EXP_004',
    title: 'TIME',
    subtitle: 'TEMPORAL DISTORTION',
    formula: 't → ∞',
    status: 'CALIBRATING',
    danger: 4,
    description: 'Chronological manipulation experiments',
    color: 'hazmat-green'
  },
  {
    id: 'EXP_005',
    title: 'CHAOS',
    subtitle: 'ENTROPY MAXIMIZATION',
    formula: 'ΔS > 0',
    status: 'CRITICAL',
    danger: 5,
    description: 'Controlled disorder generation',
    color: 'glitch-magenta'
  },
  {
    id: 'EXP_006',
    title: 'MORPH',
    subtitle: 'PHASE TRANSITION',
    formula: 'Δ → Ω',
    status: 'PROCESSING',
    danger: 3,
    description: 'Shape-shifting material studies',
    color: 'warning-yellow'
  }
]

export default function BrutalistLabPage() {
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null)
  const [systemAlert, setSystemAlert] = useState<string | null>(null)
  const [labMode, setLabMode] = useState<'RESEARCH' | 'EXPERIMENT' | 'ANALYSIS'>('RESEARCH')
  const [glitchActive, setGlitchActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Random system alerts
  useEffect(() => {
    const alertTimer = setInterval(() => {
      if (Math.random() > 0.8) {
        const alerts = [
          'EXPERIMENT BREACH DETECTED',
          'RECALIBRATING PARAMETERS',
          'ANOMALY IN SECTOR 7',
          'QUANTUM FLUCTUATION OBSERVED',
          'PATTERN RECOGNITION FAILED'
        ]
        const alert = alerts[Math.floor(Math.random() * alerts.length)]
        setSystemAlert(alert)
        setGlitchActive(true)
        setTimeout(() => {
          setSystemAlert(null)
          setGlitchActive(false)
        }, 2000)
      }
    }, 5000)

    return () => clearInterval(alertTimer)
  }, [])

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lab-card', {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out'
      })
    })
    return () => ctx.revert()
  }, [])

  const renderExperimentVisualization = (exp: typeof experiments[0]) => {
    switch (exp.id) {
      case 'EXP_001': // FABRIC
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="grid grid-cols-8 gap-[1px] w-32 h-32 bg-carbon-black p-[1px]">
              {[...Array(64)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-white"
                  animate={{
                    backgroundColor: ['#FFFFFF', '#FF6B35', '#FFFFFF'],
                    scale: [1, 0.8, 1]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.02,
                    repeat: Infinity
                  }}
                />
              ))}
            </div>
          </div>
        )

      case 'EXP_002': // FORM
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              className="w-32 h-32 border-4 border-centrifuge-blue"
              animate={{
                rotate: 360,
                borderRadius: ['0%', '50%', '0%']
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute w-24 h-24 border-2 border-centrifuge-blue/50"
              animate={{
                rotate: -360,
                scale: [1, 1.5, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        )

      case 'EXP_003': // VOID
        return (
          <div className="relative w-full h-full flex items-center justify-center bg-carbon-black">
            <motion.div
              className="w-32 h-32 rounded-full bg-gradient-radial from-transparent to-glitch-red"
              animate={{
                scale: [0, 2, 0],
                opacity: [1, 0, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>
        )

      case 'EXP_004': // TIME
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[1px] h-16 bg-hazmat-green origin-bottom"
                style={{
                  transform: `rotate(${i * 30}deg) translateY(-32px)`
                }}
                animate={{
                  opacity: [0, 1, 0],
                  height: [0, 64, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity
                }}
              />
            ))}
          </div>
        )

      default:
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="text-xs font-mono opacity-60">NO_VISUAL_DATA</div>
          </div>
        )
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-paper-white relative">
      {/* Background Effects */}
      <div className="fixed inset-0 scientific-grid opacity-20 pointer-events-none" />
      {glitchActive && <div className="fixed inset-0 noise-overlay" />}

      {/* System Alert */}
      <AnimatePresence>
        {systemAlert && (
          <motion.div
            className="fixed top-20 left-0 right-0 z-50 bg-glitch-red text-white py-2 px-8"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold">⚠ {systemAlert}</span>
              <span className="text-[10px] opacity-60">CODE: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <section className="pt-24 pb-12 px-8 border-b-3 border-carbon-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-[clamp(60px,8vw,120px)] font-black brutalist-heading leading-[0.8]">
                <CipherText text="THE" /><br />
                <span className="text-safety-orange"><CipherText text="LAB" /></span>
              </h1>
              <p className="text-xs font-mono mt-4 opacity-60">
                EXPERIMENTAL_FASHION_RESEARCH_FACILITY
              </p>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-mono space-y-1">
                <div>TEMP: 21.3°C</div>
                <div>HUMIDITY: 45%</div>
                <div>PRESSURE: 1013 hPa</div>
                <div className={`${glitchActive ? 'text-glitch-red flicker' : 'text-hazmat-green'}`}>
                  STATUS: {glitchActive ? 'UNSTABLE' : 'NOMINAL'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Mode Selector */}
      <section className="py-8 px-8 bg-carbon-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            {(['RESEARCH', 'EXPERIMENT', 'ANALYSIS'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setLabMode(mode)}
                className={`px-6 py-3 text-xs font-mono font-bold transition-all ${
                  labMode === mode
                    ? 'bg-white text-carbon-black'
                    : 'bg-transparent text-white border border-white/30 hover:bg-white/10'
                }`}
              >
                {mode}_MODE
              </button>
            ))}
            <div className="ml-auto text-white text-[10px] font-mono opacity-60">
              ACTIVE_EXPERIMENTS: {experiments.filter(e => e.status === 'ACTIVE').length}
            </div>
          </div>
        </div>
      </section>

      {/* Experiments Grid */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 bg-carbon-black p-2">
            {experiments.map((exp) => (
              <motion.div
                key={exp.id}
                className="lab-card bg-white relative overflow-hidden group cursor-pointer"
                onMouseEnter={() => setActiveExperiment(exp.id)}
                onMouseLeave={() => setActiveExperiment(null)}
                whileHover={{ y: -8 }}
                onClick={() => {
                  setSystemAlert(`ACCESSING ${exp.id}`)
                  setTimeout(() => setSystemAlert(null), 1000)
                }}
              >
                {/* Card Header */}
                <div className="p-6 border-b-3 border-carbon-black">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono opacity-60">{exp.id}</span>
                      <h3 className="text-3xl font-black mt-1">{exp.title}</h3>
                      <p className="text-[10px] font-mono mt-1 opacity-60">
                        {exp.subtitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="chemical-formula text-xs">
                        {exp.formula}
                      </div>
                      <div className={`text-[10px] font-mono mt-2 ${
                        exp.status === 'CRITICAL' ? 'text-glitch-red' :
                        exp.status === 'ACTIVE' ? 'text-hazmat-green' :
                        'text-carbon-black opacity-60'
                      }`}>
                        {exp.status}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visualization Area */}
                <div className="h-48 relative bg-paper-white">
                  {activeExperiment === exp.id && renderExperimentVisualization(exp)}
                  {activeExperiment !== exp.id && (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-xs font-mono opacity-40">HOVER_TO_ACTIVATE</div>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="p-6 border-t-3 border-carbon-black">
                  <p className="text-xs leading-relaxed mb-4">{exp.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono opacity-60">DANGER:</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 ${
                              i < exp.danger
                                ? exp.danger > 3 ? 'bg-glitch-red' : 'bg-warning-yellow'
                                : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <motion.div
                      className="text-xs font-mono"
                      animate={{ opacity: activeExperiment === exp.id ? 1 : 0 }}
                    >
                      ACCESS →
                    </motion.div>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className={`absolute inset-0 bg-${exp.color} pointer-events-none`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeExperiment === exp.id ? 0.05 : 0 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Laboratory Equipment Section */}
      <section className="py-16 px-8 bg-concrete-gray">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-8">EQUIPMENT_STATUS</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { name: 'PARTICLE_ACCELERATOR', status: 'ONLINE', usage: 67 },
              { name: 'QUANTUM_PROCESSOR', status: 'CALIBRATING', usage: 89 },
              { name: 'NEURAL_NETWORK', status: 'LEARNING', usage: 45 },
              { name: 'CHAOS_GENERATOR', status: 'ACTIVE', usage: 92 }
            ].map((equipment) => (
              <div key={equipment.name} className="bg-white p-4">
                <p className="text-[10px] font-mono mb-2">{equipment.name}</p>
                <div className="h-1 bg-carbon-black/20 relative">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-safety-orange"
                    initial={{ width: 0 }}
                    animate={{ width: `${equipment.usage}%` }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] font-mono opacity-60">{equipment.status}</span>
                  <span className="text-[10px] font-mono">{equipment.usage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Terminal */}
      <section className="py-16 px-8 bg-carbon-black">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black p-8 font-mono text-green-500">
            <div className="text-xs space-y-2 opacity-80">
              <div>&gt; CINCH_LAB_TERMINAL_V2.0.1</div>
              <div>&gt; INITIALIZING_SYSTEMS...</div>
              <div>&gt; LOADING_EXPERIMENTS...</div>
              <div>&gt; {experiments.length} EXPERIMENTS_FOUND</div>
              <div>&gt; READY_FOR_INPUT</div>
              <div className="flex items-center">
                <span>&gt; </span>
                <span className="ml-2 animate-pulse">_</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t-3 border-carbon-black bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-[10px] font-mono opacity-60">
            CINCH_LAB © 2025 — EXPERIMENTAL_DIVISION
          </p>
          <Link href="/" className="text-xs font-mono hover:underline">
            EXIT_LAB →
          </Link>
        </div>
      </footer>
    </div>
  )
}