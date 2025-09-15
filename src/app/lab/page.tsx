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
      case '001':
        return (
          <motion.div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-32 h-32 border-2 border-black"
              animate={{
                rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360],
                borderRadius: ['0%', '50%', '0%', '50%', '0%']
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        )
      case '002':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-[1px] bg-black"
                style={{ top: `${50 + i * 10}%` }}
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity
                }}
              />
            ))}
          </div>
        )
      case '003':
        return (
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-black rounded-full"
                style={{
                  left: `${30 + Math.random() * 40}%`,
                  top: `${30 + Math.random() * 40}%`
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50, 0],
                  y: [0, Math.random() * 100 - 50, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: i * 0.1,
                  repeat: Infinity
                }}
              />
            ))}
          </div>
        )
      case '004':
        return (
          <motion.div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-32 h-32 bg-black"
              animate={{
                clipPath: [
                  'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                  'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
                  'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                  'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.div>
        )
      case '005':
        return (
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-2 p-12">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                className="bg-black"
                animate={{
                  opacity: [0, Math.random(), 0]
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
      case '006':
        return (
          <motion.div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-32 h-32 border-2 border-black rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.3, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
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
      <section className="pt-20 pb-20 px-8 md:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-hero mb-4"><CipherText text="LAB" /></h2>
            <p className="text-label"><CipherText text="SELECT EXPERIMENT TO BEGIN" /></p>
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
                  className="w-full text-left card card-minimal h-[400px] flex flex-col justify-between p-12 relative overflow-hidden"
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
                    className="relative z-10"
                  >
                    <span className="text-label marker"><CipherText text={exp.id} /></span>
                    <h3 className="text-4xl font-light mt-6"><CipherText text={exp.title} /></h3>
                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                      <CipherText text={exp.description} />
                    </p>
                  </motion.div>

                  <div className="flex justify-between items-end relative z-10">
                    <span className="text-label text-xs"><CipherText text={exp.type} /></span>
                    <motion.div
                      className="w-8 h-8 border border-black/30"
                      animate={hoveredCard === exp.id ? { rotate: 45 } : { rotate: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    {renderExperimentVisual(exp)}
                  </div>

                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black"
                    initial={{ y: '100%' }}
                    animate={{ y: hoveredCard === exp.id ? '0%' : '100%' }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredCard === exp.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white text-2xl font-light"><CipherText text="ENTER" /></span>
                  </motion.div>
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
                  <span className="text-label">
                    <CipherText text={`EXPERIMENT ${activeExperiment}`} />
                  </span>
                  <h3 className="text-display mt-4 mb-2">
                    <CipherText text={experiments.find(e => e.id === activeExperiment)?.title || ''} />
                  </h3>
                  <p className="text-gray-600 mb-16">
                    <CipherText text={experiments.find(e => e.id === activeExperiment)?.description || ''} />
                  </p>
                </motion.div>

                <motion.div
                  className="w-full max-w-2xl h-[400px] mx-auto relative border border-black/10"
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
                  <button className="btn btn-outline"><CipherText text="RANDOMIZE" /></button>
                  <button className="btn btn-primary"><CipherText text="DOWNLOAD" /></button>
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
              <h3 className="text-display mb-8 leading-tight">
                <CipherText text="Experimental protocols for fashion innovation." />
              </h3>
              <p className="text-gray-600 text-body-large">
                <CipherText text="The LAB serves as our testing ground for new concepts, materials, and methodologies. Each experiment pushes the boundaries of what fashion can be, exploring the intersection of technology, art, and human experience." />
              </p>
            </div>
            <div className="md:col-span-4">
              <p className="text-label mb-6"><CipherText text="ACTIVE RESEARCH" /></p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-black rounded-full"></span>
                  <span className="text-sm"><CipherText text="Material synthesis" /></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-black rounded-full"></span>
                  <span className="text-sm"><CipherText text="Pattern algorithms" /></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-black rounded-full"></span>
                  <span className="text-sm"><CipherText text="Biomimetic structures" /></span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-black rounded-full"></span>
                  <span className="text-sm"><CipherText text="Digital fabrication" /></span>
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
            <p className="text-sm"><CipherText text="© 2025 CINCH LAB" /></p>
            <p className="text-label"><CipherText text="LAB—001" /></p>
          </div>
        </div>
      </footer>
    </div>
  )
}