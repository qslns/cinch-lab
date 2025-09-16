'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import CipherText from '@/components/CipherText'

const experiments = [
  {
    id: '001',
    title: 'DISTORTION',
    description: 'Spatial manipulation through warped perspectives',
    type: 'VISUAL',
    color: '#0038ff'
  },
  {
    id: '002',
    title: 'FREQUENCY',
    description: 'Wave dynamics and resonance patterns',
    type: 'AUDIO',
    color: '#000000'
  },
  {
    id: '003',
    title: 'PARTICLE',
    description: 'Chaos systems and emergent behaviors',
    type: 'PHYSICS',
    color: '#333333'
  },
  {
    id: '004',
    title: 'MORPH',
    description: 'Shape evolution and transformation',
    type: 'GEOMETRY',
    color: '#666666'
  },
  {
    id: '005',
    title: 'NEURAL',
    description: 'Pattern recognition and AI aesthetics',
    type: 'AI',
    color: '#999999'
  },
  {
    id: '006',
    title: 'VOID',
    description: 'Negative space as primary element',
    type: 'CONCEPT',
    color: '#ffffff'
  }
]

export default function LabPage() {
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring animation for mouse tracking
  const springConfig = { stiffness: 150, damping: 15 }
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [-8, 8]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [8, -8]), springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const renderExperimentVisual = (exp: typeof experiments[0]) => {
    switch (exp.id) {
      case '001': // DISTORTION
        return (
          <motion.div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-32 h-32 border-2 border-black/20"
              animate={{
                rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
                borderRadius: ['0%', '50%', '0%', '50%', '0%'],
                scale: [1, 1.2, 1, 0.8, 1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute w-24 h-24 border border-black/10"
              animate={{
                rotate: [360, 315, 270, 225, 180, 135, 90, 45, 0],
                scale: [1, 0.8, 1, 1.2, 1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )

      case '002': // FREQUENCY
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-[1px] bg-black/20"
                style={{ top: `${35 + i * 5}%` }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        )

      case '003': // PARTICLE
        return (
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-black/30 rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 100 - 50, 0],
                  scale: [0, 1.5, 0],
                  opacity: [0, 0.8, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        )

      case '004': // MORPH
        return (
          <motion.div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-32 h-32 bg-black/10"
              animate={{
                clipPath: [
                  'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
                  'polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%)',
                  'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                  'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                ],
                rotate: [0, 45, 90, 135, 180]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        )

      case '005': // NEURAL
        return (
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-5 gap-1 p-12">
            {[...Array(25)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-black/20"
                animate={{
                  opacity: [0, Math.random() * 0.8 + 0.2, 0],
                  scale: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 2 + Math.random(),
                  delay: i * 0.05,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        )

      case '006': // VOID
        return (
          <motion.div className="absolute inset-0 flex items-center justify-center">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-32 h-32 border border-black/10 rounded-full"
                animate={{
                  scale: [0.5 + i * 0.2, 1.5 + i * 0.2, 0.5 + i * 0.2],
                  opacity: [0, 0.5 - i * 0.1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 4 + i,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="grid-overlay" />

      {/* Main Content */}
      <section className="pt-20 pb-8 px-8 md:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[clamp(60px,8vw,120px)] font-thin mb-4 tracking-tight">
              <CipherText text="LAB" />
            </h2>
            <p className="text-[10px] tracking-widest opacity-40 uppercase">
              <CipherText text="SELECT EXPERIMENT TO BEGIN" />
            </p>
          </motion.div>

          {/* Experiments Grid */}
          <div
            ref={containerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {experiments.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                onMouseEnter={() => setHoveredCard(exp.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <motion.button
                  className="w-full text-left h-[400px] p-12 border border-black/10 hover:border-black/30 transition-all duration-300 relative overflow-hidden bg-white"
                  onClick={() => setActiveExperiment(exp.id)}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    perspective: 1000,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <motion.div
                    style={{
                      rotateX: hoveredCard === exp.id ? rotateX : 0,
                      rotateY: hoveredCard === exp.id ? rotateY : 0
                    }}
                    className="relative z-10 h-full flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] tracking-widest opacity-40">
                        <CipherText text={exp.id} />
                      </span>
                      <h3 className="text-4xl font-thin mt-6 tracking-tight">
                        <CipherText text={exp.title} />
                      </h3>
                      <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                        <CipherText text={exp.description} />
                      </p>
                    </div>

                    <div className="flex justify-between items-end">
                      <span className="text-[10px] tracking-widest opacity-40">
                        <CipherText text={exp.type} />
                      </span>
                      <motion.div
                        className="w-8 h-8 border border-black/30"
                        animate={hoveredCard === exp.id ? { rotate: 45 } : { rotate: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>

                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    {renderExperimentVisual(exp)}
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === exp.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Active Experiment Display */}
          {activeExperiment && (
            <motion.div
              className="fixed inset-0 bg-white z-[60] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button
                className="absolute top-8 right-8 text-4xl hover:rotate-90 transition-transform duration-300"
                onClick={() => setActiveExperiment(null)}
              >
                <CipherText text="×" />
              </button>

              <div className="text-center max-w-4xl mx-auto px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="text-[10px] tracking-widest opacity-40">
                    <CipherText text={`EXPERIMENT ${activeExperiment}`} />
                  </span>
                  <h3 className="text-[clamp(48px,6vw,96px)] font-thin mt-4 mb-2 tracking-tight">
                    <CipherText text={experiments.find(e => e.id === activeExperiment)?.title || ''} />
                  </h3>
                  <p className="text-sm text-gray-600 mb-16 max-w-xl mx-auto">
                    <CipherText text={experiments.find(e => e.id === activeExperiment)?.description || ''} />
                  </p>
                </motion.div>

                <motion.div
                  className="w-full max-w-2xl h-[400px] mx-auto relative border border-black/10 bg-gradient-to-br from-gray-50 to-white"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {renderExperimentVisual(
                    experiments.find(e => e.id === activeExperiment)!
                  )}
                </motion.div>

                <motion.div
                  className="mt-16 flex justify-center gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <button className="px-8 py-3 border border-black/20 text-xs tracking-widest hover:bg-black hover:text-white transition-colors">
                    <CipherText text="RANDOMIZE" />
                  </button>
                  <button className="px-8 py-3 bg-black text-white text-xs tracking-widest hover:bg-gray-800 transition-colors">
                    <CipherText text="DOWNLOAD" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 border-t border-black/5">
        <div className="max-w-7xl mx-auto px-8 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <h3 className="text-[clamp(32px,4vw,64px)] font-thin mb-8 leading-tight tracking-tight">
                <CipherText text="Experimental protocols for fashion innovation." />
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                <CipherText text="The LAB serves as our testing ground for new concepts, materials, and methodologies. Each experiment pushes the boundaries of what fashion can be, exploring the intersection of technology, art, and human experience." />
              </p>
            </div>
            <div className="md:col-span-4">
              <p className="text-[10px] tracking-widest opacity-40 mb-6">
                <CipherText text="ACTIVE RESEARCH" />
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-black rounded-full"></span>
                  <span className="text-xs"><CipherText text="Material synthesis" /></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-black rounded-full"></span>
                  <span className="text-xs"><CipherText text="Pattern algorithms" /></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-black rounded-full"></span>
                  <span className="text-xs"><CipherText text="Biomimetic structures" /></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-black rounded-full"></span>
                  <span className="text-xs"><CipherText text="Digital fabrication" /></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 py-12">
        <div className="max-w-7xl mx-auto px-8 md:px-20">
          <div className="flex justify-between items-center">
            <p className="text-sm font-thin">
              <CipherText text="© 2025 CINCH LAB" />
            </p>
            <p className="text-[10px] tracking-widest opacity-40">
              <CipherText text="LAB—001" />
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}