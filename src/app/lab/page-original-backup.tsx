'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import CipherText from '@/components/CipherText'
import CrackedBackground from '@/components/CrackedBackground'
import SideImages from '@/components/SideImages'

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

  // Decorative elements for empty spaces
  const decorativeElements = [
    { type: 'line', position: 'top-20 left-10', width: '100px', angle: 45 },
    { type: 'circle', position: 'top-40 right-20', size: 12 },
    { type: 'square', position: 'bottom-32 left-32', size: 8 },
    { type: 'line', position: 'bottom-20 right-10', width: '80px', angle: -30 },
    { type: 'dots', position: 'top-1/3 left-16' },
    { type: 'cross', position: 'top-2/3 right-24' }
  ]

  return (
    <div className="min-h-screen bg-white relative">
      {/* Cracked Background */}
      <CrackedBackground />

      {/* Side Images */}
      <SideImages page="lab" />

      <div className="grid-overlay" />

      {/* Decorative Elements */}
      {decorativeElements.map((element, index) => (
        <motion.div
          key={index}
          className={`absolute ${element.position} pointer-events-none`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
        >
          {element.type === 'line' && (
            <div
              className="h-[1px] bg-black"
              style={{
                width: element.width,
                transform: `rotate(${element.angle}deg)`
              }}
            />
          )}
          {element.type === 'circle' && (
            <div
              className="border border-black rounded-full"
              style={{
                width: element.size,
                height: element.size
              }}
            />
          )}
          {element.type === 'square' && (
            <div
              className="border border-black"
              style={{
                width: element.size,
                height: element.size,
                transform: 'rotate(45deg)'
              }}
            />
          )}
          {element.type === 'dots' && (
            <div className="grid grid-cols-3 gap-2">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-black rounded-full" />
              ))}
            </div>
          )}
          {element.type === 'cross' && (
            <div className="relative w-4 h-4">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black -translate-y-1/2" />
              <div className="absolute left-1/2 top-0 h-full w-[1px] bg-black -translate-x-1/2" />
            </div>
          )}
        </motion.div>
      ))}

      {/* Main Content */}
      <section className="pt-20 pb-8 px-8 md:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Title with decorative element */}
          <motion.div
            className="mb-20 relative"
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

            {/* Decorative line after title */}
            <motion.div
              className="absolute -right-8 top-1/2 w-32 h-[1px] bg-black/10"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>

          {/* Experiments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                >
                  <div className="relative z-10 h-full flex flex-col justify-between">
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
                  </div>

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

                  {/* Corner decoration on hover */}
                  <motion.div
                    className="absolute top-0 right-0 w-8 h-8"
                    animate={{
                      opacity: hoveredCard === exp.id ? 0.3 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="absolute top-2 right-2 w-4 h-[1px] bg-black" />
                    <div className="absolute top-2 right-2 h-4 w-[1px] bg-black" />
                  </motion.div>
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Decorative grid pattern */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.02 }}
            transition={{ delay: 1 }}
          >
            <div className="grid grid-cols-8 gap-8">
              {[...Array(64)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-black rounded-full" />
              ))}
            </div>
          </motion.div>

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

      {/* Info Section with decorative elements */}
      <section className="py-20 border-t border-black/5 relative">
        {/* Floating decorative shapes */}
        <motion.div
          className="absolute top-10 left-20 w-16 h-16 border border-black/5 rounded-full"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-20 w-12 h-12 border border-black/5"
          animate={{
            rotate: [0, 90, 180, 270, 360]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="max-w-7xl mx-auto px-8 md:px-20 relative z-10">
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
      <footer className="border-t border-black/5 py-12 relative">
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