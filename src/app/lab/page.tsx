'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'

// Lab experiments with modern aesthetics
const experiments = [
  {
    id: 'DISTORT',
    title: 'REALITY DISTORTION',
    color: '#ff006e',
    emoji: '🌀',
    description: 'Bend the fabric of digital space'
  },
  {
    id: 'GLITCH',
    title: 'GLITCH SYNTHESIS',
    color: '#00f5ff',
    emoji: '⚡',
    description: 'Break the system beautifully'
  },
  {
    id: 'MORPH',
    title: 'SHAPE MORPHING',
    color: '#bfff00',
    emoji: '🔮',
    description: 'Transform between dimensions'
  },
  {
    id: 'PARTICLE',
    title: 'PARTICLE CHAOS',
    color: '#8b00ff',
    emoji: '✨',
    description: 'Universe in motion'
  },
  {
    id: 'WAVE',
    title: 'WAVE DYNAMICS',
    color: '#ff6b00',
    emoji: '🌊',
    description: 'Ride the frequency'
  },
  {
    id: 'NEURAL',
    title: 'NEURAL PATTERNS',
    color: '#ffef00',
    emoji: '🧠',
    description: 'Think in patterns'
  }
]

export default function LabPage() {
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [particles, setParticles] = useState<{x: number, y: number, id: number}[]>([])
  const [glitchText, setGlitchText] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Transform mouse position for parallax
  const rotateX = useTransform(mouseY, [0, 1], [-15, 15])
  const rotateY = useTransform(mouseX, [0, 1], [15, -15])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        mouseX.set(x)
        mouseY.set(y)
        setMousePos({ x: e.clientX, y: e.clientY })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Glitch effect interval
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText(true)
      setTimeout(() => setGlitchText(false), 200)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Particle generation
  useEffect(() => {
    if (activeExperiment === 'PARTICLE') {
      const interval = setInterval(() => {
        setParticles(prev => [...prev, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          id: Date.now()
        }])

        setTimeout(() => {
          setParticles(prev => prev.slice(1))
        }, 2000)
      }, 100)
      return () => clearInterval(interval)
    }
  }, [activeExperiment])

  const renderExperiment = () => {
    switch (activeExperiment) {
      case 'DISTORT':
        return (
          <motion.div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              className="grid grid-cols-5 gap-4"
              style={{ perspective: 1000, rotateX, rotateY }}
            >
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded"
                  animate={{
                    rotateX: [0, 360],
                    rotateY: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3 + i * 0.1,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  whileHover={{ scale: 2, rotateZ: 180 }}
                />
              ))}
            </motion.div>
          </motion.div>
        )

      case 'GLITCH':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.h1
              className={`text-6xl md:text-9xl font-black ${glitchText ? 'distort-text' : ''}`}
              data-text="GLITCH"
              animate={{
                x: glitchText ? [-5, 5, -5, 5, 0] : 0,
                filter: glitchText ? ['hue-rotate(0deg)', 'hue-rotate(90deg)', 'hue-rotate(180deg)', 'hue-rotate(270deg)', 'hue-rotate(360deg)'] : 'hue-rotate(0deg)'
              }}
              transition={{ duration: 0.2 }}
            >
              GLITCH
            </motion.h1>
          </div>
        )

      case 'MORPH':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              className="w-64 h-64"
              animate={{
                borderRadius: ['0%', '50%', '0%'],
                rotate: [0, 180, 360],
                background: [
                  'linear-gradient(45deg, #bfff00, #00f5ff)',
                  'linear-gradient(135deg, #ff006e, #8b00ff)',
                  'linear-gradient(225deg, #ffef00, #ff6b00)',
                  'linear-gradient(315deg, #00f5ff, #bfff00)'
                ]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        )

      case 'PARTICLE':
        return (
          <div className="relative w-full h-full overflow-hidden">
            <AnimatePresence>
              {particles.map(particle => (
                <motion.div
                  key={particle.id}
                  className="absolute w-2 h-2 bg-purple-500 rounded-full"
                  initial={{
                    x: particle.x,
                    y: particle.y,
                    scale: 0,
                    opacity: 0
                  }}
                  animate={{
                    x: particle.x + (Math.random() - 0.5) * 200,
                    y: particle.y - 200,
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              ))}
            </AnimatePresence>
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-4xl md:text-6xl font-black opacity-20">PARTICLES</h2>
            </div>
          </div>
        )

      case 'WAVE':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="flex gap-2">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 h-32 bg-gradient-to-t from-orange-500 to-red-500 rounded-full"
                  animate={{
                    scaleY: [1, 2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.05,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
        )

      case 'NEURAL':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <svg width="400" height="400" className="animate-pulse">
              {[...Array(8)].map((_, i) => {
                const angle = (i * Math.PI * 2) / 8
                const x1 = 200 + Math.cos(angle) * 150
                const y1 = 200 + Math.sin(angle) * 150

                return (
                  <g key={i}>
                    <circle
                      cx={x1}
                      cy={y1}
                      r="10"
                      fill="#ffef00"
                      className="animate-pulse"
                    />
                    {[...Array(8)].map((_, j) => {
                      if (j !== i) {
                        const angle2 = (j * Math.PI * 2) / 8
                        const x2 = 200 + Math.cos(angle2) * 150
                        const y2 = 200 + Math.sin(angle2) * 150

                        return (
                          <motion.line
                            key={`${i}-${j}`}
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#ffef00"
                            strokeWidth="1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.3, 0] }}
                            transition={{
                              duration: 2,
                              delay: (i + j) * 0.1,
                              repeat: Infinity
                            }}
                          />
                        )
                      }
                      return null
                    })}
                  </g>
                )
              })}
            </svg>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Dynamic background */}
      <motion.div
        className="fixed inset-0 opacity-30"
        animate={{
          background: activeExperiment
            ? `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${
                experiments.find(e => e.id === activeExperiment)?.color
              }40 0%, transparent 50%)`
            : 'none'
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-8 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <motion.h1
            className="text-3xl font-black tracking-widest"
            animate={{ letterSpacing: ['0.1em', '0.5em', '0.1em'] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            LAB
          </motion.h1>
          <div className="text-sm tracking-widest opacity-50">
            EXPERIMENTAL ZONE
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="min-h-screen pt-32 px-8">
        {/* Experiment Grid */}
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {!activeExperiment ? (
            <>
              <motion.h2
                className="text-5xl md:text-7xl font-black text-center mb-16"
                animate={{
                  background: [
                    'linear-gradient(45deg, #ff006e, #00f5ff)',
                    'linear-gradient(90deg, #00f5ff, #bfff00)',
                    'linear-gradient(135deg, #bfff00, #8b00ff)',
                    'linear-gradient(180deg, #8b00ff, #ff6b00)',
                    'linear-gradient(225deg, #ff6b00, #ffef00)',
                    'linear-gradient(270deg, #ffef00, #ff006e)'
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                CHOOSE EXPERIMENT
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {experiments.map((exp, index) => (
                  <motion.button
                    key={exp.id}
                    className="relative p-8 rounded-2xl border-2 transition-all duration-300 group overflow-hidden"
                    style={{
                      borderColor: 'rgba(255,255,255,0.2)',
                      background: 'rgba(255,255,255,0.05)'
                    }}
                    onClick={() => setActiveExperiment(exp.id)}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      borderColor: exp.color,
                      background: `linear-gradient(135deg, ${exp.color}20, transparent)`
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(135deg, ${exp.color}20, transparent)` }}
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative z-10">
                      <span className="text-5xl mb-4 block">{exp.emoji}</span>
                      <h3 className="text-xl font-bold mb-2" style={{ color: exp.color }}>
                        {exp.title}
                      </h3>
                      <p className="text-sm opacity-70">{exp.description}</p>
                    </div>

                    <motion.div
                      className="absolute bottom-4 right-4 text-2xl opacity-0 group-hover:opacity-100"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      →
                    </motion.div>
                  </motion.button>
                ))}
              </div>
            </>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExperiment}
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                {/* Back button */}
                <motion.button
                  className="mb-8 px-6 py-3 border-2 border-white/20 rounded-full font-bold tracking-widest"
                  onClick={() => setActiveExperiment(null)}
                  whileHover={{ scale: 1.05, borderColor: '#fff' }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← BACK TO LAB
                </motion.button>

                {/* Experiment display */}
                <motion.div
                  className="relative h-[60vh] rounded-3xl overflow-hidden border-2"
                  style={{
                    borderColor: experiments.find(e => e.id === activeExperiment)?.color,
                    background: 'rgba(0,0,0,0.5)'
                  }}
                >
                  {renderExperiment()}
                </motion.div>

                {/* Experiment info */}
                <motion.div
                  className="mt-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3
                    className="text-3xl md:text-5xl font-black mb-4"
                    style={{ color: experiments.find(e => e.id === activeExperiment)?.color }}
                  >
                    {experiments.find(e => e.id === activeExperiment)?.title}
                  </h3>
                  <p className="text-xl opacity-70">
                    {experiments.find(e => e.id === activeExperiment)?.description}
                  </p>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-sm tracking-[0.3em] opacity-50">
            EXPERIMENTAL LABORATORY × CINCH LAB
          </p>
        </div>
      </footer>
    </div>
  )
}