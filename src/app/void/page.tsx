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
  AsymmetricGridItem
} from '@/components/MargielaSacaiComponents'

// ==========================================================================
// VOID PAGE - Experimental Negative Space Laboratory
// Margiela's Deconstruction × Sacai's Layering Philosophy
// ==========================================================================

interface VoidLayer {
  id: string
  depth: number
  title: string
  description: string
  opacity: number
}

const voidLayers: VoidLayer[] = [
  {
    id: 'SURFACE',
    depth: 0,
    title: 'SURFACE TENSION',
    description: 'Where presence meets absence',
    opacity: 1.0
  },
  {
    id: 'FIRST',
    depth: 1,
    title: 'FIRST DISSOLUTION',
    description: 'Forms begin to fragment',
    opacity: 0.7
  },
  {
    id: 'HYBRID',
    depth: 2,
    title: 'HYBRID VOID',
    description: 'Multiple negatives create new forms',
    opacity: 0.4
  },
  {
    id: 'CORE',
    depth: 3,
    title: 'VOID CORE',
    description: 'Pure negative space achieved',
    opacity: 0.1
  }
]

// Fashion elements dissolving into void
const dissolvingElements = [
  { name: 'SEAM', type: 'French Seam', state: 'dissolving' },
  { name: 'DART', type: 'Bust Dart', state: 'fragmenting' },
  { name: 'PLEAT', type: 'Box Pleat', state: 'vanishing' },
  { name: 'COLLAR', type: 'Stand Collar', state: 'evaporating' },
  { name: 'SLEEVE', type: 'Set-in Sleeve', state: 'decomposing' },
  { name: 'HEM', type: 'Blind Hem', state: 'disappearing' }
]

export default function VoidPage() {
  const [currentDepth, setCurrentDepth] = useState(0)
  const [activeElement, setActiveElement] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const voidDepth = useTransform(scrollYProgress, [0, 1], [0, 100])
  const dissolution = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])
  const layerSeparation = useTransform(scrollYProgress, [0, 1], ['0px', '100px'])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      setCurrentDepth(Math.floor(value * 4))
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveElement((prev) => (prev + 1) % dissolvingElements.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-off-white">

      {/* ==========================================================================
         HERO - Void Descent
         ========================================================================== */}

      <section className="relative min-h-screen flex items-center justify-center px-8">
        {/* Layered backgrounds representing void depth */}
        {voidLayers.map((layer, index) => (
          <motion.div
            key={layer.id}
            className="absolute inset-0"
            style={{
              opacity: layer.opacity,
              transform: `translateZ(${index * 50}px)`,
              background: `radial-gradient(circle, transparent ${50 - index * 10}%, var(--carbon) 100%)`
            }}
            animate={{
              scale: 1 + (currentDepth >= index ? 0.1 : 0)
            }}
            transition={{ duration: 2 }}
          />
        ))}

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <h1 className="text-6xl md:text-hero font-black text-center mb-8">
              <DeconstructedText intensity={3} hover={false}>
                V O I D
              </DeconstructedText>
            </h1>

            <p className="text-xl text-steel text-center max-w-2xl mx-auto mb-12">
              Enter the negative space laboratory.<br/>
              Where fashion dissolves into pure concept.
            </p>

            {/* Depth indicator */}
            <div className="text-center">
              <span className="text-label text-accent-blood">CURRENT DEPTH</span>
              <motion.div className="text-4xl font-black mt-2">
                {currentDepth * 1000}m
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
         VOID LAYERS - Sacai-inspired Layered Exploration
         ========================================================================== */}

      <EditorialSection
        lineNumber="00"
        title="Void Layers"
        subtitle="Descending through negative space"
        className="py-24 px-8 bg-ivory"
      >
        <div className="max-w-6xl mx-auto">
          {/* Layered cards showing void depth */}
          <div className="relative">
            {voidLayers.map((layer, index) => (
              <motion.div
                key={layer.id}
                className="relative mb-8"
                style={{
                  marginLeft: layerSeparation,
                  zIndex: voidLayers.length - index
                }}
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <LayeredCard layers={3 - index}>
                  <MaterialCard
                    material={index === 0 ? 'paper' : index === 1 ? 'fabric' : index === 2 ? 'concrete' : 'glass'}
                    className="p-12"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-label text-accent-ink mb-2 block">
                          DEPTH {layer.depth}
                        </span>
                        <h3 className="text-3xl font-bold mb-4">{layer.title}</h3>
                        <p className="text-body text-steel">{layer.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-5xl font-black opacity-20">
                          {layer.depth}
                        </div>
                        <div className="text-xs font-mono mt-2">
                          OPACITY: {(layer.opacity * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>

                    {/* Visual representation of void */}
                    <div className="mt-8 grid grid-cols-6 gap-2">
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="aspect-square bg-carbon"
                          animate={{
                            opacity: layer.opacity * (1 - i * 0.15)
                          }}
                          transition={{ delay: i * 0.1 }}
                        />
                      ))}
                    </div>
                  </MaterialCard>
                </LayeredCard>
              </motion.div>
            ))}
          </div>
        </div>
      </EditorialSection>

      {/* ==========================================================================
         DISSOLVING ELEMENTS - Fashion Components Into Void
         ========================================================================== */}

      <section className="py-24 px-8 bg-carbon text-off-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-4">Dissolution Process</h2>
            <p className="text-lg text-steel mb-12">
              Fashion elements fragmenting into negative space
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {dissolvingElements.map((element, index) => (
                <motion.div
                  key={element.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  animate={{
                    opacity: activeElement === index ? 0.3 : 1
                  }}
                >
                  <ExposedSeam showMeasurements={false} showStitching={true}>
                    <div className="p-8 bg-carbon">
                      <h4 className="text-xl font-bold mb-2">{element.name}</h4>
                      <p className="text-sm text-steel mb-4">{element.type}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-2xs font-mono text-accent-blood">
                          STATE:
                        </span>
                        <span className="text-xs font-mono uppercase">
                          {element.state}
                        </span>
                      </div>

                      {/* Dissolution visualization */}
                      <div className="mt-6 h-1 bg-steel/20">
                        <motion.div
                          className="h-full bg-off-white"
                          animate={{
                            width: activeElement === index ? '0%' : '100%'
                          }}
                          transition={{ duration: 3 }}
                        />
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
         VOID PHILOSOPHY
         ========================================================================== */}

      <EditorialSection
        lineNumber="01"
        title="Void Philosophy"
        subtitle="The beauty of absence"
        className="py-24 px-8"
      >
        <div className="max-w-4xl mx-auto">
          <FragmentMosaic fragments={4}>
            <div className="p-12 bg-off-white">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">ABSENCE AS PRESENCE</h3>
                  <p className="text-body text-steel">
                    In the tradition of Margiela's invisible garments and Sacai's negative space,
                    we explore fashion that exists through its absence. The void becomes our most
                    precious material.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">NEGATIVE CONSTRUCTION</h3>
                  <p className="text-body text-steel">
                    We build by removing. Each subtraction creates new form.
                    The space between layers speaks louder than the layers themselves.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-4">DISSOLUTION AS CREATION</h3>
                  <p className="text-body text-steel">
                    As garments dissolve into void, they achieve their purest form.
                    This is not destruction but transformation into essence.
                  </p>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-steel/20">
                <p className="text-xl font-black text-center">
                  "IN THE VOID, WE FIND EVERYTHING"
                </p>
              </div>
            </div>
          </FragmentMosaic>
        </div>
      </EditorialSection>

      {/* ==========================================================================
         VOID ARCHIVE - Visual Studies
         ========================================================================== */}

      <section className="py-24 px-8 bg-ivory">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Void Archive</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <AsymmetricGridItem index={i}>
                  <div className="aspect-square bg-gradient-to-br from-off-white to-carbon relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-carbon"
                      style={{
                        clipPath: `circle(${(i + 1) * 12}% at 50% 50%)`
                      }}
                    />
                    <div className="absolute bottom-2 left-2 text-xs font-mono text-off-white">
                      VOID_{(i + 1).toString().padStart(3, '0')}
                    </div>
                  </div>
                </AsymmetricGridItem>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         STATUS INDICATORS
         ========================================================================== */}

      <motion.div
        className="fixed bottom-8 right-8 bg-carbon text-off-white p-4 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="text-xs font-mono space-y-1">
          <div>VOID_DEPTH: {Math.round(voidDepth.get())}%</div>
          <div>DISSOLUTION: {(100 - dissolution.get() * 100).toFixed(0)}%</div>
          <div>LAYER: {currentDepth}/3</div>
        </div>
      </motion.div>
    </div>
  )
}