'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import {
  DeconstructedText,
  LayeredCard,
  ExposedSeam,
  MaterialCard,
  EditorialSection,
  FragmentMosaic,
  AsymmetricGridItem,
  ConstructionMarker,
  RawEdgeButton
} from '@/components/MargielaSacaiComponents'

// ==========================================================================
// CHAOS PAGE - Systematic Deconstruction Laboratory
// Margiela's Philosophy of Controlled Destruction
// ==========================================================================

interface ChaosExperiment {
  line: string
  title: string
  status: 'ACTIVE' | 'CRITICAL' | 'UNSTABLE' | 'COMPLETE'
  description: string
  entropy: number
  technique: string
}

const experiments: ChaosExperiment[] = [
  {
    line: '0',
    title: 'PATTERN DISSOLUTION',
    status: 'ACTIVE',
    description: 'Systematic deconstruction of traditional pattern making',
    entropy: 0,
    technique: 'FLAT PATTERN CHAOS'
  },
  {
    line: '1',
    title: 'STRUCTURAL COLLAPSE',
    status: 'CRITICAL',
    description: 'Intentional failure of garment architecture',
    entropy: 0,
    technique: 'DRAPING ENTROPY'
  },
  {
    line: '10',
    title: 'SEAM REBELLION',
    status: 'UNSTABLE',
    description: 'Exposed construction as design philosophy',
    entropy: 0,
    technique: 'RAW EDGE THEORY'
  },
  {
    line: '4',
    title: 'VOLUME DISTORTION',
    status: 'COMPLETE',
    description: 'Asymmetric expansion and compression',
    entropy: 0,
    technique: 'SPACE MANIPULATION'
  }
]

// Deconstructed fashion elements
const chaosElements = [
  { name: 'SLEEVE', state: 'DISPLACING', progress: 0 },
  { name: 'COLLAR', state: 'INVERTING', progress: 0 },
  { name: 'HEM', state: 'FRACTURING', progress: 0 },
  { name: 'POCKET', state: 'MIGRATING', progress: 0 },
  { name: 'BUTTON', state: 'REBELLING', progress: 0 },
  { name: 'LINING', state: 'EXPOSING', progress: 0 }
]

export default function ChaosPage() {
  const [chaosLevel, setChaosLevel] = useState(0)
  const [activeExperiment, setActiveExperiment] = useState<ChaosExperiment | null>(null)
  const [elements, setElements] = useState(chaosElements)
  const [isDeconstructing, setIsDeconstructing] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const distortion = useTransform(scrollYProgress, [0, 0.5, 1], [0, 10, 0])
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 180])

  // Animate chaos progression
  useEffect(() => {
    const interval = setInterval(() => {
      setElements(prev => prev.map(el => ({
        ...el,
        progress: Math.min(100, el.progress + Math.random() * chaosLevel * 0.5)
      })))
    }, 500)
    return () => clearInterval(interval)
  }, [chaosLevel])

  // Random deconstruction events
  useEffect(() => {
    const interval = setInterval(() => {
      if (chaosLevel > 50 && Math.random() > 0.9) {
        setIsDeconstructing(true)
        setTimeout(() => setIsDeconstructing(false), 2000)
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [chaosLevel])

  return (
    <div ref={containerRef} className="min-h-screen bg-off-white">

      {/* ==========================================================================
         HERO - Chaos Introduction
         ========================================================================== */}

      <section className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden">
        {/* Deconstructed background layers */}
        <motion.div
          className="absolute inset-0"
          style={{ rotate: rotation }}
        >
          <div className="absolute inset-0 material-paper opacity-30" />
          <div className="absolute inset-0 material-fabric opacity-20 transform rotate-3" />
          <div className="absolute inset-0 material-concrete opacity-10 transform -rotate-2" />
        </motion.div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            style={{ transform: `rotate(${distortion.get()}deg)` }}
          >
            <h1 className="text-6xl md:text-hero font-black text-center mb-8">
              <DeconstructedText intensity={chaosLevel / 20} hover={false}>
                C H A O S
              </DeconstructedText>
            </h1>

            <p className="text-xl text-steel text-center max-w-2xl mx-auto mb-12">
              Controlled destruction laboratory.<br/>
              Where order dissolves into beauty.
            </p>

            {/* Chaos control */}
            <div className="max-w-md mx-auto">
              <label className="text-label block text-center mb-4">CHAOS LEVEL</label>
              <input
                type="range"
                min="0"
                max="100"
                value={chaosLevel}
                onChange={(e) => setChaosLevel(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center mt-2 text-4xl font-black">
                {chaosLevel}%
              </div>
            </div>
          </motion.div>
        </div>

        {/* Chaos particles */}
        {isDeconstructing && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-carbon"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight
                }}
                animate={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  rotate: Math.random() * 360
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* ==========================================================================
         CHAOS EXPERIMENTS - Margiela Line System
         ========================================================================== */}

      <EditorialSection
        lineNumber="00"
        title="Chaos Experiments"
        subtitle="Systematic destruction as creative methodology"
        className="py-24 px-8 bg-ivory"
      >
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {experiments.map((exp, index) => (
            <motion.div
              key={exp.line}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              onClick={() => setActiveExperiment(exp)}
              className="cursor-pointer"
            >
              <LayeredCard layers={chaosLevel > 50 ? 3 : 2}>
                <MaterialCard
                  material={index % 2 === 0 ? 'paper' : 'fabric'}
                  className="p-8 h-full hover:shadow-xl transition-shadow"
                >
                  <ConstructionMarker label={`LINE ${exp.line}`} position="top-left" />

                  <div className="mt-8">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold">{exp.title}</h3>
                      <span className={`text-xs px-2 py-1 font-mono ${
                        exp.status === 'CRITICAL' ? 'bg-accent-blood text-off-white' :
                        exp.status === 'ACTIVE' ? 'bg-carbon text-off-white' :
                        exp.status === 'UNSTABLE' ? 'bg-steel text-off-white' :
                        'bg-ivory text-carbon'
                      }`}>
                        {exp.status}
                      </span>
                    </div>

                    <p className="text-sm text-steel mb-6">
                      {exp.description}
                    </p>

                    <div className="border-t border-steel/20 pt-4">
                      <span className="text-2xs font-mono text-steel block mb-2">
                        TECHNIQUE: {exp.technique}
                      </span>

                      {/* Entropy visualization */}
                      <div className="h-1 bg-steel/20">
                        <motion.div
                          className="h-full bg-carbon"
                          animate={{ width: `${chaosLevel}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                </MaterialCard>
              </LayeredCard>
            </motion.div>
          ))}
        </div>
      </EditorialSection>

      {/* ==========================================================================
         DECONSTRUCTING ELEMENTS
         ========================================================================== */}

      <section className="py-24 px-8 bg-carbon text-off-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4">Deconstruction Process</h2>
            <p className="text-lg text-steel mb-12">
              Fashion elements undergoing controlled chaos
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {elements.map((element, index) => (
                <motion.div
                  key={element.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  animate={{
                    rotate: isDeconstructing ? Math.random() * 10 - 5 : 0
                  }}
                >
                  <ExposedSeam showMeasurements={false} showStitching={true}>
                    <div className="p-6 bg-carbon">
                      <h4 className="text-xl font-bold mb-2">{element.name}</h4>
                      <p className="text-sm text-steel mb-4">STATE: {element.state}</p>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-mono">
                          <span>PROGRESS</span>
                          <span>{element.progress.toFixed(0)}%</span>
                        </div>
                        <div className="h-2 bg-steel/20">
                          <motion.div
                            className="h-full bg-off-white"
                            animate={{ width: `${element.progress}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                    </div>
                  </ExposedSeam>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
         CHAOS PHILOSOPHY
         ========================================================================== */}

      <EditorialSection
        lineNumber="01"
        title="Chaos Philosophy"
        subtitle="Destruction as creation methodology"
        className="py-24 px-8"
      >
        <div className="max-w-4xl mx-auto">
          <FragmentMosaic fragments={chaosLevel > 50 ? 6 : 3}>
            <div className="p-12 bg-off-white">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">CONTROLLED DESTRUCTION</h3>
                  <p className="text-body text-steel">
                    Following Margiela's principle of deconstruction, we treat chaos as a creative force.
                    Every seam we expose, every pattern we fracture, every structure we collapse
                    teaches us the true nature of garment construction.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">INTENTIONAL ACCIDENTS</h3>
                  <p className="text-body text-steel">
                    The exposed lining becomes the exterior. The unfinished edge becomes the statement.
                    The mistake becomes the masterpiece. This is the beauty of controlled chaos.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">ENTROPY AS ART</h3>
                  <p className="text-body text-steel">
                    Chaos reveals the truth beneath the surface. Order is temporary, entropy is eternal.
                    In destruction, we find the purest form of creation.
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-steel/20">
                <p className="text-xl font-black text-center">
                  "DESTROY TO CREATE • DECONSTRUCT TO UNDERSTAND"
                </p>
              </div>
            </div>
          </FragmentMosaic>
        </div>
      </EditorialSection>

      {/* ==========================================================================
         CHAOS ARCHIVE
         ========================================================================== */}

      <section className="py-24 px-8 bg-ivory">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Chaos Archive</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{
                  rotate: Math.random() * 10 - 5,
                  scale: 1.05
                }}
              >
                <AsymmetricGridItem index={i}>
                  <div className="aspect-square bg-gradient-to-br from-carbon to-steel relative overflow-hidden">
                    {/* Chaos pattern */}
                    <div className="absolute inset-0">
                      {[...Array(5)].map((_, j) => (
                        <div
                          key={j}
                          className="absolute bg-off-white"
                          style={{
                            width: `${Math.random() * 50}%`,
                            height: '2px',
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            transform: `rotate(${Math.random() * 180}deg)`
                          }}
                        />
                      ))}
                    </div>
                    <div className="absolute bottom-2 left-2 text-xs font-mono text-off-white">
                      CHAOS_{(i + 1).toString().padStart(3, '0')}
                    </div>
                  </div>
                </AsymmetricGridItem>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         CHAOS CONTROL CENTER
         ========================================================================== */}

      <section className="py-32 px-8 bg-carbon text-off-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl font-black mb-8">
              <DeconstructedText intensity={2}>
                EMBRACE CHAOS
              </DeconstructedText>
            </h2>
            <p className="text-xl mb-12">
              In chaos, we find truth. In destruction, we find beauty.
            </p>
            <p className="text-body text-steel max-w-2xl mx-auto mb-12">
              CINCH LAB's chaos laboratory explores the creative potential of controlled destruction.
              Every experiment pushes the boundaries of what fashion can become
              when freed from the constraints of order.
            </p>
            <RawEdgeButton
              variant="secondary"
              size="large"
              onClick={() => setChaosLevel(100)}
            >
              Initiate Maximum Chaos
            </RawEdgeButton>
          </motion.div>
        </div>
      </section>

      {/* Experiment detail modal */}
      {activeExperiment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-carbon/90 z-50 flex items-center justify-center p-8"
          onClick={() => setActiveExperiment(null)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-off-white max-w-2xl w-full p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-label text-accent-blood">LINE {activeExperiment.line}</span>
                <h2 className="text-3xl font-bold mt-2">{activeExperiment.title}</h2>
              </div>
              <button
                onClick={() => setActiveExperiment(null)}
                className="text-2xl hover:text-accent-blood transition-colors"
              >
                ×
              </button>
            </div>

            <p className="text-lg mb-8">{activeExperiment.description}</p>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-mono text-sm">STATUS:</span>
                <span className="font-bold">{activeExperiment.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-sm">TECHNIQUE:</span>
                <span className="font-bold">{activeExperiment.technique}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-sm">CHAOS LEVEL:</span>
                <span className="font-bold">{chaosLevel}%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}