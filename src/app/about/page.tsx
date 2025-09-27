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

// Identity Declarations
const identityStatements = [
  {
    id: '001',
    category: 'PHILOSOPHY',
    title: 'We Are Not Designers',
    content: 'We are mediums. Fashion flows through us, not from us. The ego dissolves in the creation.',
    emphasis: 'FOUNDATIONAL'
  },
  {
    id: '002',
    category: 'METHOD',
    title: 'Deconstruction Is Construction',
    content: 'To destroy is to understand. Every seam we expose teaches us how to build anew.',
    emphasis: 'TECHNICAL'
  },
  {
    id: '003',
    category: 'VISION',
    title: 'No Sales, Only Creation',
    content: 'Commerce is the death of creativity. We create because we must, not because markets demand.',
    emphasis: 'RADICAL'
  },
  {
    id: '004',
    category: 'PROCESS',
    title: 'Failure Is Discovery',
    content: 'Our failures are more valuable than others\' successes. In chaos, we find new forms.',
    emphasis: 'EXPERIMENTAL'
  },
  {
    id: '005',
    category: 'IDENTITY',
    title: 'Anonymous Excellence',
    content: 'The work speaks. The creator disappears. This is the highest form of design.',
    emphasis: 'PURE'
  },
  {
    id: '006',
    category: 'FUTURE',
    title: 'Beyond Fashion',
    content: 'We don\'t follow fashion. We don\'t lead fashion. We exist outside of fashion.',
    emphasis: 'TRANSCENDENT'
  }
]

// Capabilities
const capabilities = [
  { skill: 'PATTERN MAKING', level: 100, category: 'TECHNICAL' },
  { skill: 'DECONSTRUCTION', level: 100, category: 'CONCEPTUAL' },
  { skill: 'MATERIAL RESEARCH', level: 95, category: 'EXPERIMENTAL' },
  { skill: 'STRUCTURAL ENGINEERING', level: 98, category: 'TECHNICAL' },
  { skill: 'PHILOSOPHY', level: 100, category: 'CONCEPTUAL' },
  { skill: 'COMMERCIAL VIABILITY', level: 0, category: 'IRRELEVANT' }
]

// Timeline
const timeline = [
  { year: '2024', event: 'LABORATORY ESTABLISHED', description: 'The beginning of pure creation' },
  { year: '2024', event: 'FIRST DECONSTRUCTION', description: 'Discovery through destruction' },
  { year: '2024', event: 'PHILOSOPHY DEFINED', description: 'No sales, only creation' },
  { year: 'FUTURE', event: 'TRANSCENDENCE', description: 'Beyond fashion, beyond commerce' }
]

type ViewMode = 'MANIFESTO' | 'IDENTITY' | 'PROCESS' | 'PHILOSOPHY'

export default function AboutPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('MANIFESTO')
  const [selectedStatement, setSelectedStatement] = useState<typeof identityStatements[0] | null>(null)
  const [isRevealing, setIsRevealing] = useState(false)
  const [philosophyIndex, setPhilosophyIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Transform values
  const identityReveal = useTransform(scrollYProgress, [0, 1], [0, 100])
  const philosophyDepth = useTransform(scrollYProgress, [0, 0.5, 1], [0, 50, 100])

  // Philosophy cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setPhilosophyIndex((prev) => (prev + 1) % identityStatements.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Random reveal effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        setIsRevealing(true)
        setTimeout(() => setIsRevealing(false), 1000)
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const renderManifestoView = () => (
    <div className="max-w-4xl mx-auto">
      <ExposedStructure showGrid showMeasurements>
        <div className="p-12 bg-white-0">
          <h2 className="text-5xl font-black mb-8">CINCH LAB MANIFESTO</h2>

          <div className="space-y-12 text-lg leading-relaxed">
            <p className="text-2xl font-bold">
              We are not a brand. We are a laboratory.
            </p>

            <p>
              In this space, fashion is not product—it is process. Not commodity—it is philosophy.
              We exist in the gap between what fashion was and what it could become.
            </p>

            <p>
              Every garment we create is a question: What if clothes were not meant to be worn?
              What if fashion existed purely as thought? What if the seam was more important than the silhouette?
            </p>

            <p>
              We follow the path of Margiela's anonymity and Kawakubo's rebellion. We splice like Sacai,
              deconstruct like Margiela, think like Yamamoto. But we are none of them. We are the next step.
            </p>

            <p className="italic">
              "Cinch • Release • Repeat" is not just our process—it is our existence.
              We grip ideas, release them transformed, and repeat infinitely.
            </p>

            <div className="pt-8 border-t border-black-100">
              <p className="text-3xl font-black">
                NO SALES. NO COMPROMISE. ONLY CREATION.
              </p>
            </div>
          </div>
        </div>
      </ExposedStructure>
    </div>
  )

  const renderIdentityView = () => (
    <div className="space-y-8">
      {identityStatements.map((statement, index) => (
        <motion.div
          key={statement.id}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => setSelectedStatement(statement)}
          className="cursor-pointer"
        >
          <DeconstructedHover intensity={2}>
            <AsymmetricTransform intensity={1.5}>
              <div className="p-8 bg-white-1 border-2 border-gray-plaster">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-micro font-mono text-hybrid-red mb-2">
                      STATEMENT_{statement.id} • {statement.category}
                    </div>
                    <h3 className="text-3xl font-black mb-4">{statement.title}</h3>
                  </div>
                  <div className={`px-3 py-1 text-xs font-mono ${
                    statement.emphasis === 'FOUNDATIONAL' ? 'bg-black-100 text-white-0' :
                    statement.emphasis === 'RADICAL' ? 'bg-hybrid-red text-white-0' :
                    statement.emphasis === 'PURE' ? 'bg-white-0 border-2 border-black-100' :
                    'bg-gray-steel text-white-0'
                  }`}>
                    {statement.emphasis}
                  </div>
                </div>
                <p className="text-lg leading-relaxed italic">
                  "{statement.content}"
                </p>
              </div>
            </AsymmetricTransform>
          </DeconstructedHover>
        </motion.div>
      ))}
    </div>
  )

  const renderProcessView = () => (
    <div>
      {/* Capabilities */}
      <div className="mb-16">
        <h3 className="text-2xl font-black mb-8">LABORATORY CAPABILITIES</h3>
        <div className="space-y-4">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.skill}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-bold">{cap.skill}</span>
                  <span className={`ml-3 text-micro font-mono ${
                    cap.category === 'IRRELEVANT' ? 'text-hybrid-red' : 'text-gray-steel'
                  }`}>
                    {cap.category}
                  </span>
                </div>
                <span className="text-sm font-mono">{cap.level}%</span>
              </div>
              <div className="relative h-2 bg-gray-plaster">
                <motion.div
                  className={`absolute left-0 top-0 h-full ${
                    cap.category === 'IRRELEVANT' ? 'bg-hybrid-red' : 'bg-black-100'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${cap.level}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div>
        <h3 className="text-2xl font-black mb-8">LABORATORY TIMELINE</h3>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-plaster" />

          {timeline.map((item, index) => (
            <motion.div
              key={index}
              className="relative flex items-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="absolute left-8 w-4 h-4 bg-black-100 -translate-x-1/2" />
              <div className="ml-16">
                <div className="text-micro font-mono text-hybrid-red mb-1">{item.year}</div>
                <h4 className="text-xl font-black mb-1">{item.event}</h4>
                <p className="text-sm opacity-60">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderPhilosophyView = () => (
    <FragmentMosaic fragments={9}>
      <div className="grid grid-cols-3 gap-0">
        {[
          'DECONSTRUCTION',
          'RECONSTRUCTION',
          'ANONYMITY',
          'LAYERING',
          'VOLUME',
          'VOID',
          'PATTERN',
          'CHAOS',
          'CREATION'
        ].map((concept, index) => (
          <motion.div
            key={concept}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="aspect-square p-8 bg-white-1 border border-gray-plaster flex items-center justify-center group cursor-pointer hover:bg-black-100 hover:text-white-0 transition-all"
          >
            <div className="text-center">
              <div className="text-2xl font-black mb-2">{concept}</div>
              <div className="text-micro font-mono opacity-60">
                PHILOSOPHY_{(index + 1).toString().padStart(3, '0')}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </FragmentMosaic>
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-white-0 relative">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 overlay-grid opacity-20" />
        <div className="absolute inset-0 texture-muslin opacity-10" />
      </div>

      {/* Identity Status Bar */}
      <motion.div
        className="fixed top-20 left-0 right-0 z-40 bg-black-100 text-white-0 py-2"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between text-micro font-mono">
            <div className="flex items-center gap-6">
              <span>IDENTITY_REVEAL: {Math.round(identityReveal.get())}%</span>
              <span className="opacity-60">|</span>
              <span>PHILOSOPHY_DEPTH: {Math.round(philosophyDepth.get())}%</span>
              <span className="opacity-60">|</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {identityStatements[philosophyIndex].title}
              </motion.span>
            </div>
            <span>WE ARE CINCH LAB</span>
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
            <SacaiLayer layers={3}>
              <ExposedStructure showGrid={isRevealing}>
                <div className="py-12">
                  <div className="text-micro font-mono text-hybrid-red mb-2">
                    IDENTITY_DECLARATION / PHILOSOPHY_CORE
                  </div>
                  <h1 className="text-display font-black tracking-tightest uppercase">
                    ABOUT
                  </h1>
                  <div className="text-lg text-gray-steel mt-4 max-w-2xl">
                    The mind behind the laboratory. The philosophy behind the fashion.
                    This is who we are when the seams are exposed.
                  </div>
                </div>
              </ExposedStructure>
            </SacaiLayer>
          </motion.div>

          {/* View Controls */}
          <div className="mb-12">
            <div className="flex gap-2">
              {(['MANIFESTO', 'IDENTITY', 'PROCESS', 'PHILOSOPHY'] as ViewMode[]).map(mode => (
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
            {viewMode === 'MANIFESTO' && renderManifestoView()}
            {viewMode === 'IDENTITY' && renderIdentityView()}
            {viewMode === 'PROCESS' && renderProcessView()}
            {viewMode === 'PHILOSOPHY' && renderPhilosophyView()}
          </div>

          {/* Core Values */}
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-micro font-mono text-gray-steel mb-4">
              CORE VALUES
            </div>
            <h2 className="text-4xl font-black mb-8">
              DECONSTRUCTION • RECONSTRUCTION • TRANSCENDENCE
            </h2>
            <p className="text-lg text-gray-steel max-w-2xl mx-auto">
              We exist in the space between what fashion was and what it will become.
              Every creation is a step toward something that has never existed.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Statement Detail Modal */}
      <AnimatePresence>
        {selectedStatement && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStatement(null)}
              className="fixed inset-0 bg-black-100/90 z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-16 md:inset-32 bg-white-0 z-50 flex items-center justify-center"
            >
              <div className="p-12 text-center max-w-2xl">
                <div className="text-micro font-mono text-hybrid-red mb-4">
                  {selectedStatement.category}
                </div>
                <h2 className="text-5xl font-black mb-8">{selectedStatement.title}</h2>
                <p className="text-2xl leading-relaxed italic mb-8">
                  "{selectedStatement.content}"
                </p>
                <button
                  onClick={() => setSelectedStatement(null)}
                  className="px-6 py-3 bg-black-100 text-white-0 text-sm font-mono hover:bg-hybrid-red transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}