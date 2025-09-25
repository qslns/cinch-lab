'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import gsap from 'gsap'

// Entropy Experiments
const entropyExperiments = [
  {
    id: 'ENT_001',
    name: 'PATTERN_DISSOLUTION',
    entropy: 0,
    maxEntropy: 100,
    status: 'ACCELERATING',
    formula: 'ΔS = k·ln(Ω)',
    particles: 256
  },
  {
    id: 'ENT_002',
    name: 'STRUCTURE_COLLAPSE',
    entropy: 0,
    maxEntropy: 100,
    status: 'CRITICAL',
    formula: 'H = -Σp·log(p)',
    particles: 512
  },
  {
    id: 'ENT_003',
    name: 'ORDER_DECAY',
    entropy: 0,
    maxEntropy: 100,
    status: 'UNSTABLE',
    formula: 'S = -kΣp·ln(p)',
    particles: 1024
  }
]

// Chaos Generators
const chaosGenerators = [
  { id: 'GEN_A', type: 'LORENZ_ATTRACTOR', active: false, power: 0 },
  { id: 'GEN_B', type: 'MANDELBROT_SET', active: false, power: 0 },
  { id: 'GEN_C', type: 'JULIA_FRACTALS', active: false, power: 0 },
  { id: 'GEN_D', type: 'STRANGE_ATTRACTOR', active: false, power: 0 },
  { id: 'GEN_E', type: 'BIFURCATION_CASCADE', active: false, power: 0 },
  { id: 'GEN_F', type: 'QUANTUM_FOAM', active: false, power: 0 }
]

export default function BrutalistChaosPage() {
  const [experiments, setExperiments] = useState(entropyExperiments)
  const [generators, setGenerators] = useState(chaosGenerators)
  const [chaosLevel, setChaosLevel] = useState(0)
  const [systemStability, setSystemStability] = useState(100)
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null)
  const [particles, setParticles] = useState<Array<{x: number, y: number, vx: number, vy: number}>>([])
  const [glitchIntensity, setGlitchIntensity] = useState(0)
  const [systemWarning, setSystemWarning] = useState<string | null>(null)
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'CHAOS_ENGINE_V4.2.0',
    'INITIALIZING_ENTROPY_SYSTEMS...',
    'LOADING_DISORDER_PROTOCOLS...',
    'WARNING: CONTAINMENT_RECOMMENDED'
  ])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize particles
  useEffect(() => {
    const newParticles = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2
    }))
    setParticles(newParticles)
  }, [])

  // Entropy simulation
  useEffect(() => {
    const entropyInterval = setInterval(() => {
      setExperiments(prev => prev.map(exp => ({
        ...exp,
        entropy: Math.min(exp.maxEntropy, exp.entropy + Math.random() * chaosLevel * 0.5)
      })))

      // Update system stability
      setSystemStability(prev => Math.max(0, prev - chaosLevel * 0.1))

      // Random warnings
      if (Math.random() > 0.9 && chaosLevel > 50) {
        const warnings = [
          'ENTROPY_THRESHOLD_EXCEEDED',
          'PATTERN_COHERENCE_LOST',
          'STRUCTURAL_INTEGRITY_FAILING',
          'CHAOS_CASCADE_DETECTED',
          'EMERGENCY_PROTOCOLS_ENGAGED'
        ]
        const warning = warnings[Math.floor(Math.random() * warnings.length)]
        setSystemWarning(warning)
        setTerminalOutput(prev => [...prev.slice(-9), `⚠ ${warning}`])
        setTimeout(() => setSystemWarning(null), 3000)
      }
    }, 100)

    return () => clearInterval(entropyInterval)
  }, [chaosLevel])

  // Particle animation
  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        // Apply chaos forces
        particle.vx += (Math.random() - 0.5) * chaosLevel * 0.01
        particle.vy += (Math.random() - 0.5) * chaosLevel * 0.01

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Boundary conditions
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.fillStyle = chaosLevel > 75 ? '#FF0000' : chaosLevel > 50 ? '#FF6B35' : '#00FF00'
        ctx.fillRect(particle.x, particle.y, 2, 2)
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [particles, chaosLevel])

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.chaos-card', {
        scale: 0,
        rotation: 360,
        stagger: 0.1,
        duration: 1,
        ease: 'back.out'
      })
    })
    return () => ctx.revert()
  }, [])

  // Glitch effect based on chaos level
  useEffect(() => {
    setGlitchIntensity(chaosLevel / 100)
  }, [chaosLevel])

  const toggleGenerator = (id: string) => {
    setGenerators(prev => prev.map(gen => {
      if (gen.id === id) {
        const newActive = !gen.active
        const newPower = newActive ? Math.random() * 100 : 0

        // Update chaos level
        setChaosLevel(current => {
          const delta = newActive ? 10 : -10
          return Math.max(0, Math.min(100, current + delta))
        })

        setTerminalOutput(prev => [...prev.slice(-9),
          `${gen.type}: ${newActive ? 'ACTIVATED' : 'DEACTIVATED'} [POWER: ${newPower.toFixed(0)}%]`
        ])

        return { ...gen, active: newActive, power: newPower }
      }
      return gen
    }))
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-carbon-black relative overflow-hidden">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ opacity: 0.5 }}
      />

      {/* Glitch Overlay */}
      {glitchIntensity > 0 && (
        <div
          className="fixed inset-0 noise-overlay pointer-events-none"
          style={{ opacity: glitchIntensity * 0.5 }}
        />
      )}

      {/* System Warning */}
      <AnimatePresence>
        {systemWarning && (
          <motion.div
            className="fixed top-20 left-0 right-0 z-50 bg-glitch-red text-white py-3 px-8"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono font-bold">⚠ CRITICAL: {systemWarning}</span>
              <span className="text-xs opacity-60">STABILITY: {systemStability.toFixed(1)}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <section className="pt-24 pb-12 px-8 border-b-3 border-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between">
            <div>
              <h1 className={`text-[clamp(60px,8vw,120px)] font-black brutalist-heading leading-[0.8] text-white ${glitchIntensity > 0.5 ? 'glitch-text' : ''}`}>
                CHAOS<br />
                <span className="text-glitch-red">ENGINE</span>
              </h1>
              <p className="text-xs font-mono mt-4 opacity-60 text-white">
                ENTROPY_ACCELERATION_LABORATORY
              </p>
            </div>
            <div className="text-right text-white">
              <div className="text-[10px] font-mono space-y-1">
                <div>CHAOS_LEVEL: {chaosLevel.toFixed(0)}%</div>
                <div>STABILITY: {systemStability.toFixed(1)}%</div>
                <div>ENTROPY: {experiments.reduce((sum, exp) => sum + exp.entropy, 0).toFixed(0)} J/K</div>
                <div className={`${systemStability < 20 ? 'text-glitch-red flicker' : 'text-hazmat-green'}`}>
                  STATUS: {systemStability < 20 ? 'CRITICAL' : systemStability < 50 ? 'UNSTABLE' : 'CONTAINED'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chaos Level Control */}
      <section className="py-8 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-8">
            <label className="text-xs font-mono font-bold">MASTER_CHAOS_CONTROL:</label>
            <div className="flex-1 relative">
              <input
                type="range"
                min="0"
                max="100"
                value={chaosLevel}
                onChange={(e) => setChaosLevel(parseInt(e.target.value))}
                className="w-full"
                style={{
                  background: `linear-gradient(to right, #00FF00 0%, #FF6B35 50%, #FF0000 100%)`
                }}
              />
              <div className="flex justify-between mt-2">
                <span className="text-[10px] font-mono opacity-60">ORDER</span>
                <span className="text-[10px] font-mono opacity-60">CHAOS</span>
                <span className="text-[10px] font-mono opacity-60">SINGULARITY</span>
              </div>
            </div>
            <div className="text-2xl font-black">{chaosLevel}%</div>
          </div>
        </div>
      </section>

      {/* Entropy Experiments */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-8">ENTROPY_EXPERIMENTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {experiments.map((exp) => (
              <motion.div
                key={exp.id}
                className="chaos-card bg-white p-6 relative overflow-hidden group cursor-pointer"
                onMouseEnter={() => setActiveExperiment(exp.id)}
                onMouseLeave={() => setActiveExperiment(null)}
                whileHover={{ scale: 1.05, rotate: Math.random() * 10 - 5 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-mono opacity-60">{exp.id}</span>
                    <h3 className="text-xl font-black mt-1">{exp.name}</h3>
                  </div>
                  <div className={`px-2 py-1 text-[10px] font-mono ${
                    exp.status === 'CRITICAL' ? 'bg-glitch-red' :
                    exp.status === 'ACCELERATING' ? 'bg-safety-orange' :
                    'bg-warning-yellow'
                  } text-white`}>
                    {exp.status}
                  </div>
                </div>

                {/* Entropy Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-[10px] font-mono mb-1">
                    <span>ENTROPY</span>
                    <span>{exp.entropy.toFixed(1)}/{exp.maxEntropy} J/K</span>
                  </div>
                  <div className="h-2 bg-carbon-black/20 relative overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-hazmat-green via-warning-yellow to-glitch-red"
                      animate={{ width: `${(exp.entropy / exp.maxEntropy) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                    {activeExperiment === exp.id && (
                      <div className="absolute inset-0 bg-white/50 animate-pulse" />
                    )}
                  </div>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="opacity-60">FORMULA:</span>
                    <span className="chemical-formula">{exp.formula}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-60">PARTICLES:</span>
                    <span>{exp.particles}</span>
                  </div>
                </div>

                {/* Chaos Visualization */}
                <div className="mt-4 h-20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {activeExperiment === exp.id && (
                      <div className="grid grid-cols-8 gap-1">
                        {[...Array(32)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-carbon-black"
                            animate={{
                              scale: [1, Math.random() * 2, 1],
                              rotate: [0, Math.random() * 360, 0],
                              opacity: [1, Math.random(), 1]
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chaos Generators */}
      <section className="py-16 px-8 bg-concrete-gray">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-8">CHAOS_GENERATORS</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {generators.map((gen) => (
              <motion.button
                key={gen.id}
                onClick={() => toggleGenerator(gen.id)}
                className={`p-4 border-3 transition-all ${
                  gen.active
                    ? 'border-glitch-red bg-glitch-red/20 text-white'
                    : 'border-white/30 bg-white/10 text-white hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-[10px] font-mono mb-2">{gen.id}</div>
                <div className="text-[9px] font-bold mb-3">{gen.type}</div>
                <div className="h-1 bg-carbon-black/30 relative">
                  {gen.active && (
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-safety-orange to-glitch-red"
                      animate={{ width: `${gen.power}%` }}
                    />
                  )}
                </div>
                <div className="text-[10px] font-mono mt-2">
                  {gen.active ? `${gen.power.toFixed(0)}%` : 'OFFLINE'}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Terminal Output */}
      <section className="py-16 px-8 bg-carbon-black">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black p-6 font-mono text-green-500">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs">CHAOS_MONITOR_V4.2.0</span>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
            </div>
            <div className="h-48 overflow-y-auto text-xs space-y-1">
              {terminalOutput.map((line, index) => (
                <div
                  key={index}
                  className={`opacity-80 ${
                    line.includes('⚠') ? 'text-red-500' :
                    line.includes('ACTIVATED') ? 'text-green-400' :
                    line.includes('DEACTIVATED') ? 'text-yellow-500' :
                    'text-green-500'
                  }`}
                >
                  {line}
                </div>
              ))}
              <div className="animate-pulse">MONITORING_CHAOS_LEVELS...</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t-3 border-white bg-carbon-black">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-[10px] font-mono opacity-60 text-white">
            CINCH_LAB © 2025 — CHAOS_DIVISION
          </p>
          <Link href="/lab" className="text-xs font-mono text-white hover:text-glitch-red transition-colors">
            RETURN_TO_LAB →
          </Link>
        </div>
      </footer>
    </div>
  )
}