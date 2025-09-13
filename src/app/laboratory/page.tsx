'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import CinchFilters from '@/components/CinchFilters'
import { animationController, effectObserver, isMobile } from '@/lib/performance'

export default function LaboratoryPage() {
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  const experiments = [
    {
      id: 'distortion',
      title: 'FABRIC DISTORTION',
      description: 'Textile manipulation through digital waves',
      type: 'visual'
    },
    {
      id: 'particles',
      title: 'THREAD PARTICLES',
      description: 'Deconstructed fibers in motion',
      type: 'interactive'
    },
    {
      id: 'glitch',
      title: 'PATTERN GLITCH',
      description: 'Corrupted textile patterns',
      type: 'generative'
    },
    {
      id: 'sound',
      title: 'SONIC FABRIC',
      description: 'Sound-reactive material visualization',
      type: 'audio'
    },
    {
      id: 'morph',
      title: 'FORM MORPHING',
      description: 'Shapeshifting garment structures',
      type: 'animated'
    },
    {
      id: 'void',
      title: 'VOID SPACE',
      description: 'Negative space exploration',
      type: 'conceptual'
    }
  ]

  // Canvas Animation for Particle System
  useEffect(() => {
    if (!canvasRef.current || isMobile()) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      life: number
    }> = []

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3,
      life: 1
    })

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push(createParticle())
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life -= 0.01

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Reset dead particles
        if (particle.life <= 0) {
          particles[index] = createParticle()
        }

        // Draw particle
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.life})`
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size)
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Audio Visualization Setup
  const initAudio = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      setAudioEnabled(true)
      
      // Create oscillator for demo
      const oscillator = audioContextRef.current.createOscillator()
      const gainNode = audioContextRef.current.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContextRef.current.destination)
      
      oscillator.frequency.value = 440
      gainNode.gain.value = 0.1
      
      oscillator.start()
      setTimeout(() => oscillator.stop(), 1000)
    }
  }

  const handleExperimentClick = (id: string) => {
    setActiveExperiment(activeExperiment === id ? null : id)
    
    if (id === 'sound' && !audioEnabled) {
      initAudio()
    }
  }

  return (
    <>
      <CinchFilters />
      
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{ zIndex: 1 }}
      />

      {/* Main Content */}
      <main className="min-h-screen pt-20 px-4 md:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 
            className="glitch text-5xl md:text-7xl lg:text-8xl mb-4"
            data-text="LABORATORY"
          >
            LABORATORY
          </h1>
          <p className="text-sm tracking-[0.3em] uppercase opacity-70">
            Digital Fashion Experiments
          </p>
        </motion.div>

        {/* Experiments Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiments.map((experiment, index) => (
              <motion.div
                key={experiment.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => handleExperimentClick(experiment.id)}
                className="cursor-pointer group"
              >
                <div 
                  className={`
                    aspect-square border border-white relative overflow-hidden
                    ${activeExperiment === experiment.id ? 'bg-white text-black' : 'bg-black text-white'}
                    transition-all duration-500
                  `}
                >
                  {/* Experiment Visualization */}
                  <div className="absolute inset-0">
                    {experiment.id === 'distortion' && (
                      <div className="w-full h-full distortion-container" />
                    )}
                    
                    {experiment.id === 'glitch' && (
                      <div className="w-full h-full flex items-center justify-center">
                        <span 
                          className="glitch text-6xl"
                          data-text="⊗"
                        >
                          ⊗
                        </span>
                      </div>
                    )}
                    
                    {experiment.id === 'morph' && (
                      <div className="w-full h-full flex items-center justify-center">
                        <motion.div
                          className="w-20 h-20 border-2 border-current"
                          animate={{
                            rotate: [0, 90, 180, 270, 360],
                            borderRadius: ['0%', '50%', '0%', '50%', '0%']
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'linear'
                          }}
                        />
                      </div>
                    )}
                    
                    {experiment.id === 'void' && (
                      <div className="w-full h-full flex items-center justify-center">
                        <motion.div
                          className="w-32 h-32 border border-current"
                          animate={{
                            scale: [1, 1.2, 0.8, 1],
                            opacity: [1, 0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity
                          }}
                        />
                      </div>
                    )}
                    
                    {experiment.id === 'particles' && (
                      <div className="w-full h-full relative">
                        {[...Array(20)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-current"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`
                            }}
                            animate={{
                              x: [0, Math.random() * 100 - 50, 0],
                              y: [0, Math.random() * 100 - 50, 0],
                              opacity: [0, 1, 0]
                            }}
                            transition={{
                              duration: 3 + Math.random() * 2,
                              repeat: Infinity,
                              delay: Math.random() * 2
                            }}
                          />
                        ))}
                      </div>
                    )}
                    
                    {experiment.id === 'sound' && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-current"
                              animate={{
                                height: [10, 40, 10],
                              }}
                              transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                delay: i * 0.1
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-sm font-bold tracking-wider mb-1">
                      {experiment.title}
                    </h3>
                    <p className="text-xs opacity-70">
                      {experiment.description}
                    </p>
                    <p className="text-xs mt-2 uppercase tracking-widest opacity-50">
                      {experiment.type}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center mt-16 mb-8"
        >
          <p className="text-xs tracking-[0.3em] uppercase opacity-50">
            Click to activate • ESC to reset • Konami for extreme mode
          </p>
        </motion.div>
      </main>
    </>
  )
}