'use client'

import { useState, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Link from 'next/link'

const experiments = [
  {
    id: '001',
    title: 'DISTORTION',
    description: 'Spatial manipulation',
    type: 'VISUAL'
  },
  {
    id: '002',
    title: 'FREQUENCY',
    description: 'Wave dynamics',
    type: 'AUDIO'
  },
  {
    id: '003',
    title: 'PARTICLE',
    description: 'Chaos systems',
    type: 'PHYSICS'
  },
  {
    id: '004',
    title: 'MORPH',
    description: 'Shape evolution',
    type: 'GEOMETRY'
  },
  {
    id: '005',
    title: 'NEURAL',
    description: 'Pattern recognition',
    type: 'AI'
  },
  {
    id: '006',
    title: 'VOID',
    description: 'Negative space',
    type: 'CONCEPT'
  }
]

export default function LabPage() {
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useTransform(mouseY, [0, 1], [-5, 5])
  const rotateY = useTransform(mouseX, [0, 1], [5, -5])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="grid-overlay" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-black/10">
        <div className="flex justify-between items-center px-8 py-6">
          <Link href="/">
            <h1 className="text-2xl font-light tracking-tight hover:opacity-50 transition-opacity">CINCH—LAB</h1>
          </Link>
          <div className="flex items-center gap-8">
            <span className="technical-text">EXPERIMENTAL ZONE</span>
            <Link href="/">
              <button className="w-8 h-8 flex items-center justify-center">
                <span className="text-2xl font-light">×</span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="mb-20">
            <h2 className="text-[10vw] font-light leading-none">LAB</h2>
            <p className="technical-text mt-4">SELECT EXPERIMENT TO BEGIN</p>
          </div>

          {/* Experiments Grid */}
          <div
            ref={containerRef}
            className="grid grid-cols-12 gap-4"
            onMouseMove={handleMouseMove}
          >
            {experiments.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="col-span-12 md:col-span-6 lg:col-span-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <motion.button
                  className="w-full text-left border border-black/10 p-8 h-[300px] flex flex-col justify-between group relative overflow-hidden"
                  onClick={() => setActiveExperiment(exp.id)}
                  whileHover={{ scale: 1.02 }}
                  style={{ perspective: 1000 }}
                >
                  <motion.div
                    style={{ rotateX, rotateY }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div>
                      <span className="technical-text">{exp.id}</span>
                      <h3 className="text-3xl font-light mt-4">{exp.title}</h3>
                      <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
                    </div>
                  </motion.div>

                  <div className="flex justify-between items-end">
                    <span className="technical-text text-xs">{exp.type}</span>
                    <div className="w-10 h-10 border border-black/20 group-hover:bg-black group-hover:border-black transition-all duration-300" />
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <span className="text-white text-2xl font-light">ENTER</span>
                  </div>
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
            >
              <button
                className="absolute top-8 right-8 text-3xl"
                onClick={() => setActiveExperiment(null)}
              >
                ×
              </button>

              <div className="text-center">
                <span className="technical-text">EXPERIMENT {activeExperiment}</span>
                <h3 className="text-6xl font-light mt-4">
                  {experiments.find(e => e.id === activeExperiment)?.title}
                </h3>
                <p className="mt-4 text-gray-600">
                  {experiments.find(e => e.id === activeExperiment)?.description}
                </p>

                <div className="mt-20 w-64 h-64 mx-auto relative">
                  {/* Simple visual representation */}
                  <motion.div
                    className="absolute inset-0 border border-black"
                    animate={{
                      rotate: activeExperiment === '001' ? [0, 45, 0] : 0,
                      scale: activeExperiment === '003' ? [1, 1.2, 1] : 1,
                      borderRadius: activeExperiment === '004' ? ['0%', '50%', '0%'] : '0%'
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {activeExperiment === '003' && (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-black rounded-full"
                          style={{
                            left: `${50 + Math.cos(i * 72 * Math.PI / 180) * 30}%`,
                            top: `${50 + Math.sin(i * 72 * Math.PI / 180) * 30}%`
                          }}
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.2,
                            repeat: Infinity
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 border-t border-black/10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-8">
              <h3 className="text-4xl font-light mb-8">
                Experimental protocols for fashion innovation.
              </h3>
              <p className="text-gray-600">
                The LAB serves as our testing ground for new concepts, materials, and methodologies.
                Each experiment pushes the boundaries of what fashion can be, exploring the intersection
                of technology, art, and human experience.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4">
              <p className="technical-text mb-4">ACTIVE RESEARCH</p>
              <ul className="space-y-2">
                <li className="text-sm">→ Material synthesis</li>
                <li className="text-sm">→ Pattern algorithms</li>
                <li className="text-sm">→ Biomimetic structures</li>
                <li className="text-sm">→ Digital fabrication</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center">
            <p className="text-sm">© 2024 CINCH LAB</p>
            <p className="technical-text">LAB—001</p>
          </div>
        </div>
      </footer>
    </div>
  )
}