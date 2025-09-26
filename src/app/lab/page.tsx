'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { experiments, getActiveExperiments, getTechniques, type Experiment, type Technique } from '@/data/experiments'
import CipherText from '@/components/CipherText'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function LabPage() {
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null)
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETED' | 'FAILED'>('ALL')
  const [viewMode, setViewMode] = useState<'GRID' | 'TIMELINE' | 'CHAOS'>('GRID')
  const [techniqueDetail, setTechniqueDetail] = useState<Technique | null>(null)
  const [labStatus, setLabStatus] = useState('EXPERIMENTING')
  const [dangerLevel, setDangerLevel] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Parallax effects
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const rotateParallax = useTransform(scrollYProgress, [0, 1], [0, 360])

  useEffect(() => {
    // Laboratory status updates
    const statusInterval = setInterval(() => {
      const statuses = ['EXPERIMENTING', 'ANALYZING', 'CREATING', 'DESTROYING', 'RECONSTRUCTING']
      setLabStatus(statuses[Math.floor(Math.random() * statuses.length)])
      setDangerLevel(Math.random() * 100)
    }, 3000)

    // GSAP animations
    const ctx = gsap.context(() => {
      gsap.from('.experiment-card', {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power4.out'
      })

      gsap.from('.technique-badge', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        delay: 0.5,
        ease: 'back.out'
      })
    })

    return () => {
      clearInterval(statusInterval)
      ctx.revert()
    }
  }, [])

  const filteredExperiments = experiments.filter(exp => {
    if (activeFilter === 'ALL') return true
    if (activeFilter === 'ACTIVE') return exp.status === 'ACTIVE' || exp.status === 'ONGOING'
    if (activeFilter === 'COMPLETED') return exp.status === 'COMPLETED'
    if (activeFilter === 'FAILED') return exp.status === 'FAILED'
    return true
  })

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredExperiments.map((exp, index) => (
        <motion.div
          key={exp.id}
          className="experiment-card relative group cursor-pointer"
          onClick={() => setSelectedExperiment(exp)}
          whileHover={{ y: -10, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="p-8 bg-white border-4 border-carbon-black hover:border-safety-orange transition-all">
            {/* Status Badge */}
            <div className="absolute -top-3 -right-3">
              <span className={`px-3 py-1 text-xs font-mono font-bold ${
                exp.status === 'ACTIVE' ? 'bg-hazmat-green text-carbon-black' :
                exp.status === 'COMPLETED' ? 'bg-safety-orange text-white' :
                exp.status === 'ONGOING' ? 'bg-glitch-cyan text-carbon-black' :
                'bg-glitch-red text-white'
              }`}>
                {exp.status}
              </span>
            </div>

            {/* Experiment Header */}
            <div className="mb-6">
              <h3 className="text-2xl font-black mb-2">
                <CipherText text={exp.title} />
              </h3>
              <p className="text-sm opacity-60">{exp.subtitle}</p>
            </div>

            {/* Category */}
            <div className="mb-4">
              <span className="text-xs font-mono opacity-40">CATEGORY:</span>
              <span className="ml-2 text-sm font-bold">{exp.category}</span>
            </div>

            {/* Technique Count */}
            <div className="mb-4 flex items-center gap-4">
              <div>
                <span className="text-xs font-mono opacity-40">TECHNIQUES:</span>
                <span className="ml-2 text-sm font-bold">{exp.techniques.length}</span>
              </div>
              <div>
                <span className="text-xs font-mono opacity-40">DIFFICULTY:</span>
                <div className="inline-flex ml-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xs ${
                        i < Math.max(...exp.techniques.map(t => t.difficulty))
                          ? 'text-glitch-red'
                          : 'text-gray-300'
                      }`}
                    >
                      ■
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs leading-relaxed mb-6 opacity-80">
              {exp.description}
            </p>

            {/* Dates */}
            <div className="text-[10px] font-mono opacity-40 flex justify-between">
              <span>STARTED: {exp.dateStarted}</span>
              <span>MODIFIED: {exp.lastModified}</span>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 bg-safety-orange opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderTimelineView = () => (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20" />

      {filteredExperiments.map((exp, index) => (
        <motion.div
          key={exp.id}
          className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} mb-16`}
          initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {/* Timeline Node */}
          <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-safety-orange" />

          {/* Content Card */}
          <div
            className={`w-5/12 p-6 bg-white border-2 border-carbon-black cursor-pointer ${
              index % 2 === 0 ? 'mr-auto' : 'ml-auto'
            }`}
            onClick={() => setSelectedExperiment(exp)}
          >
            <h3 className="text-xl font-black mb-2">{exp.title}</h3>
            <p className="text-xs opacity-60 mb-2">{exp.subtitle}</p>
            <p className="text-xs mb-4">{exp.description}</p>
            <div className="text-[10px] font-mono opacity-40">
              {exp.dateStarted} → {exp.status}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderChaosView = () => (
    <div className="relative h-[800px] overflow-hidden">
      {filteredExperiments.map((exp, index) => {
        const randomX = Math.random() * 80
        const randomY = Math.random() * 80
        const randomRotate = Math.random() * 30 - 15

        return (
          <motion.div
            key={exp.id}
            className="absolute experiment-chaos-card"
            style={{
              left: `${randomX}%`,
              top: `${randomY}%`,
              transform: `rotate(${randomRotate}deg)`
            }}
            drag
            dragMomentum={false}
            whileHover={{ scale: 1.1, zIndex: 10 }}
            onClick={() => setSelectedExperiment(exp)}
          >
            <div className="p-4 bg-white border-3 border-carbon-black w-64">
              <h3 className="text-lg font-black mb-2">{exp.title}</h3>
              <p className="text-xs opacity-60">{exp.category}</p>
              <div className={`mt-2 text-xs font-mono ${
                exp.status === 'ACTIVE' ? 'text-hazmat-green' :
                exp.status === 'COMPLETED' ? 'text-safety-orange' :
                exp.status === 'ONGOING' ? 'text-glitch-cyan' :
                'text-glitch-red'
              }`}>
                {exp.status}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-carbon-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 scientific-grid opacity-10 pointer-events-none" />
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ rotate: rotateParallax }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-white/5" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-white/5" />
      </motion.div>

      {/* Header */}
      <section className="relative py-24 px-8">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          style={{ y: yParallax }}
        >
          <h1 className="text-[clamp(60px,10vw,180px)] font-black mb-8 leading-[0.85]">
            <CipherText text="LABORATORY" />
          </h1>
          <p className="text-sm font-mono opacity-60 mb-8">
            EXPERIMENTAL TECHNIQUES • NO COMMERCE • PURE CREATION
          </p>

          {/* Status Display */}
          <div className="flex items-center justify-center gap-8 mb-12">
            <div className="text-xs font-mono">
              <span className="opacity-60">STATUS:</span>
              <span className="ml-2 text-hazmat-green">{labStatus}</span>
            </div>
            <div className="text-xs font-mono">
              <span className="opacity-60">DANGER_LEVEL:</span>
              <span className={`ml-2 ${
                dangerLevel > 75 ? 'text-glitch-red' :
                dangerLevel > 50 ? 'text-safety-orange' :
                dangerLevel > 25 ? 'text-hazmat-yellow' :
                'text-hazmat-green'
              }`}>
                {dangerLevel.toFixed(0)}%
              </span>
            </div>
            <div className="text-xs font-mono">
              <span className="opacity-60">EXPERIMENTS:</span>
              <span className="ml-2">{experiments.length}</span>
            </div>
          </div>

          {/* View Controls */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* View Mode */}
            <div className="flex gap-2">
              {(['GRID', 'TIMELINE', 'CHAOS'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 text-xs font-mono transition-all ${
                    viewMode === mode
                      ? 'bg-white text-carbon-black'
                      : 'bg-transparent text-white/60 hover:text-white border border-white/20'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Filter */}
            <div className="flex gap-2">
              {(['ALL', 'ACTIVE', 'COMPLETED', 'FAILED'] as const).map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 text-xs font-mono transition-all ${
                    activeFilter === filter
                      ? 'bg-safety-orange text-carbon-black'
                      : 'bg-transparent text-white/60 hover:text-white border border-white/20'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Experiments Display */}
      <section className="px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          {viewMode === 'GRID' && renderGridView()}
          {viewMode === 'TIMELINE' && renderTimelineView()}
          {viewMode === 'CHAOS' && renderChaosView()}
        </div>
      </section>

      {/* Experiment Detail Modal */}
      <AnimatePresence>
        {selectedExperiment && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExperiment(null)}
              className="fixed inset-0 bg-carbon-black/95 z-50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-8 md:inset-16 bg-white text-carbon-black z-50 overflow-auto"
            >
              <div className="p-8 md:p-12">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-4xl font-black mb-2">
                      {selectedExperiment.title}
                    </h2>
                    <p className="text-sm opacity-60">{selectedExperiment.subtitle}</p>
                  </div>
                  <button
                    onClick={() => setSelectedExperiment(null)}
                    className="w-10 h-10 flex items-center justify-center bg-carbon-black text-white hover:bg-glitch-red transition-colors"
                  >
                    <span className="text-2xl">×</span>
                  </button>
                </div>

                {/* Status and Category */}
                <div className="flex gap-4 mb-8">
                  <span className={`px-3 py-1 text-xs font-mono font-bold ${
                    selectedExperiment.status === 'ACTIVE' ? 'bg-hazmat-green text-carbon-black' :
                    selectedExperiment.status === 'COMPLETED' ? 'bg-safety-orange text-white' :
                    selectedExperiment.status === 'ONGOING' ? 'bg-glitch-cyan text-carbon-black' :
                    'bg-glitch-red text-white'
                  }`}>
                    {selectedExperiment.status}
                  </span>
                  <span className="px-3 py-1 text-xs font-mono bg-carbon-black text-white">
                    {selectedExperiment.category}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-12">
                  <h3 className="text-lg font-black mb-4">EXPERIMENT_OVERVIEW</h3>
                  <p className="leading-relaxed">{selectedExperiment.description}</p>
                </div>

                {/* Techniques */}
                <div className="mb-12">
                  <h3 className="text-lg font-black mb-4">TECHNIQUES_EMPLOYED</h3>
                  <div className="space-y-6">
                    {selectedExperiment.techniques.map(tech => (
                      <div
                        key={tech.id}
                        className="p-6 border-2 border-carbon-black hover:border-safety-orange transition-colors cursor-pointer"
                        onClick={() => setTechniqueDetail(tech)}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-xl font-bold">{tech.name}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono opacity-60">DIFFICULTY:</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <span
                                  key={i}
                                  className={`text-xs ${
                                    i < tech.difficulty
                                      ? 'text-glitch-red'
                                      : 'text-gray-300'
                                  }`}
                                >
                                  ■
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm mb-4 opacity-80">{tech.description}</p>
                        <div className="text-xs font-mono opacity-60">
                          {tech.materials.length} MATERIALS • {tech.process.length} STEPS
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Discoveries & Failures */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  {/* Discoveries */}
                  <div>
                    <h3 className="text-lg font-black mb-4 text-hazmat-green">DISCOVERIES</h3>
                    <ul className="space-y-2">
                      {selectedExperiment.discoveries.map((discovery, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-hazmat-green mr-2">+</span>
                          <span className="text-sm">{discovery}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Failures */}
                  <div>
                    <h3 className="text-lg font-black mb-4 text-glitch-red">FAILURES</h3>
                    <ul className="space-y-2">
                      {selectedExperiment.failures.map((failure, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-glitch-red mr-2">×</span>
                          <span className="text-sm">{failure}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Timeline */}
                <div className="border-t-2 border-carbon-black pt-6">
                  <div className="flex justify-between text-xs font-mono opacity-60">
                    <span>INITIATED: {selectedExperiment.dateStarted}</span>
                    <span>LAST_MODIFIED: {selectedExperiment.lastModified}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Technique Detail Modal */}
      <AnimatePresence>
        {techniqueDetail && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTechniqueDetail(null)}
              className="fixed inset-0 bg-carbon-black/95 z-[60] backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-0 left-0 right-0 z-[60] bg-white text-carbon-black max-h-[80vh] overflow-auto"
            >
              <div className="p-8">
                <div className="max-w-4xl mx-auto">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-8">
                    <h2 className="text-3xl font-black">{techniqueDetail.name}</h2>
                    <button
                      onClick={() => setTechniqueDetail(null)}
                      className="w-8 h-8 flex items-center justify-center bg-carbon-black text-white hover:bg-glitch-red transition-colors"
                    >
                      <span className="text-xl">×</span>
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-lg mb-8">{techniqueDetail.description}</p>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Process */}
                    <div>
                      <h3 className="text-lg font-black mb-4">PROCESS</h3>
                      <ol className="space-y-3">
                        {techniqueDetail.process.map((step, index) => (
                          <li key={index} className="flex items-start">
                            <span className="font-mono text-sm mr-3 text-safety-orange">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="text-sm">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Materials */}
                    <div>
                      <h3 className="text-lg font-black mb-4">MATERIALS</h3>
                      <ul className="space-y-2">
                        {techniqueDetail.materials.map((material, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-2 h-2 bg-carbon-black mr-3" />
                            <span className="text-sm">{material}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Difficulty */}
                      <div className="mt-8 p-4 bg-carbon-black text-white">
                        <div className="text-xs font-mono mb-2">DIFFICULTY_LEVEL</div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-lg ${
                                  i < techniqueDetail.difficulty
                                    ? 'text-safety-orange'
                                    : 'text-white/20'
                                }`}
                              >
                                ■
                              </span>
                            ))}
                          </div>
                          <span className="text-xs font-mono opacity-60 ml-2">
                            {techniqueDetail.difficulty === 5 ? 'EXTREME' :
                             techniqueDetail.difficulty === 4 ? 'HARD' :
                             techniqueDetail.difficulty === 3 ? 'MEDIUM' :
                             techniqueDetail.difficulty === 2 ? 'EASY' :
                             'BEGINNER'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer Status */}
      <div className="fixed bottom-0 left-0 right-0 bg-carbon-black/80 backdrop-blur-sm border-t border-white/10 p-4 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-[10px] font-mono opacity-60">
            CINCH_LAB_EXPERIMENTS • NO_SALES • PURE_RESEARCH
          </p>
          <div className="flex gap-4">
            <span className="text-[10px] font-mono opacity-60">
              ACTIVE: {getActiveExperiments().length}
            </span>
            <span className="text-[10px] font-mono opacity-60">
              TECHNIQUES: {getTechniques().length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}