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

// Void Layers - Sacai Layering Philosophy
const voidLayers = [
  {
    depth: 0,
    title: 'SURFACE TENSION',
    description: 'Where reality meets void',
    color1: 'white-0',
    color2: 'gray-plaster'
  },
  {
    depth: 1,
    title: 'FIRST LAYER',
    description: 'Initial deconstruction begins',
    color1: 'gray-plaster',
    color2: 'gray-steel'
  },
  {
    depth: 2,
    title: 'HYBRID ZONE',
    description: 'Forms merge and separate',
    color1: 'gray-steel',
    color2: 'black-100'
  },
  {
    depth: 3,
    title: 'VOID CORE',
    description: 'Pure nothingness achieved',
    color1: 'black-100',
    color2: 'black-100'
  }
]

// Void Elements - Fashion Components Dissolving
const initialVoidElements = [
  { id: 'SEAM_01', type: 'FRENCH_SEAM', dissolved: false, opacity: 1 },
  { id: 'DART_02', type: 'BUST_DART', dissolved: false, opacity: 1 },
  { id: 'PLEAT_03', type: 'BOX_PLEAT', dissolved: false, opacity: 1 },
  { id: 'COLLAR_04', type: 'STAND_COLLAR', dissolved: false, opacity: 1 },
  { id: 'SLEEVE_05', type: 'SET_IN_SLEEVE', dissolved: false, opacity: 1 },
  { id: 'HEM_06', type: 'BLIND_HEM', dissolved: false, opacity: 1 }
]

// Void Philosophy
const voidPhilosophies = [
  'ABSENCE AS PRESENCE',
  'NEGATIVE SPACE AS FORM',
  'EMPTINESS AS FULLNESS',
  'SILENCE AS STATEMENT',
  'NOTHING AS EVERYTHING'
]

type ViewMode = 'DESCENT' | 'LAYERS' | 'PHILOSOPHY' | 'ARCHIVE'

export default function VoidPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('DESCENT')
  const [currentDepth, setCurrentDepth] = useState(0)
  const [voidElements, setVoidElements] = useState(initialVoidElements)
  const [isDissolving, setIsDissolving] = useState(false)
  const [selectedLayer, setSelectedLayer] = useState<typeof voidLayers[0] | null>(null)
  const [philosophyIndex, setPhilosophyIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  // Transform values for void effects
  const voidDepth = useTransform(scrollYProgress, [0, 1], [0, 100])
  const dissolution = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])
  const layerSeparation = useTransform(scrollYProgress, [0, 1], [0, 50])

  // Depth progression
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
      const depth = Math.floor(value * 4)
      setCurrentDepth(depth)

      // Trigger dissolution at deeper levels
      if (value > 0.5) {
        setIsDissolving(true)
      } else {
        setIsDissolving(false)
      }
    })
    return unsubscribe
  }, [scrollYProgress])

  // Cycle through philosophies
  useEffect(() => {
    const interval = setInterval(() => {
      setPhilosophyIndex((prev) => (prev + 1) % voidPhilosophies.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // Dissolve elements over time
  useEffect(() => {
    if (isDissolving) {
      const interval = setInterval(() => {
        setVoidElements(prev => prev.map(element => ({
          ...element,
          dissolved: Math.random() > 0.5,
          opacity: Math.max(0, element.opacity - 0.1)
        })))
      }, 500)
      return () => clearInterval(interval)
    }
  }, [isDissolving])

  const renderDescentView = () => (
    <div className="relative">
      {voidLayers.map((layer, index) => (
        <motion.section
          key={layer.depth}
          className="relative min-h-screen flex items-center justify-center"
          style={{
            background: `linear-gradient(180deg, var(--${layer.color1}) 0%, var(--${layer.color2}) 100%)`
          }}
        >
          <SacaiLayer layers={3 - index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="text-center"
            >
              <AsymmetricTransform intensity={index + 1}>
                <div className="relative">
                  <h2 className={`text-display font-black mb-4 ${
                    index < 2 ? 'text-black-100' : 'text-white-0'
                  }`}>
                    {layer.title}
                  </h2>
                  <p className={`text-lg ${
                    index < 2 ? 'text-gray-steel' : 'text-gray-plaster'
                  }`}>
                    {layer.description}
                  </p>

                  {/* Layer Indicator */}
                  <div className="mt-12">
                    <div className="text-micro font-mono opacity-60">
                      DEPTH: {layer.depth * 1000}m
                    </div>
                  </div>
                </div>
              </AsymmetricTransform>
            </motion.div>
          </SacaiLayer>

          {/* Dissolving Elements */}
          {currentDepth >= index && (
            <div className="absolute inset-0 pointer-events-none">
              {voidElements.slice(index * 2, (index + 1) * 2).map((element, i) => (
                <motion.div
                  key={element.id}
                  className="absolute"
                  style={{
                    left: `${20 + i * 60}%`,
                    top: `${30 + i * 40}%`
                  }}
                  animate={{
                    opacity: element.opacity,
                    scale: element.dissolved ? 0 : 1,
                    rotate: element.dissolved ? 180 : 0
                  }}
                  transition={{ duration: 2 }}
                >
                  <DeconstructedHover intensity={3}>
                    <div className={`p-4 ${
                      index < 2 ? 'bg-white-0 border-2 border-black-100' : 'bg-black-100 border-2 border-white-0'
                    }`}>
                      <div className="text-micro font-mono">{element.id}</div>
                      <div className="text-xs font-bold">{element.type}</div>
                    </div>
                  </DeconstructedHover>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      ))}
    </div>
  )

  const renderLayersView = () => (
    <FragmentMosaic fragments={8}>
      <div className="min-h-screen p-12 bg-white-1">
        <h3 className="text-4xl font-black mb-12 text-center">VOID LAYERS</h3>

        {/* Sacai-style Layered Cards */}
        <div className="relative max-w-4xl mx-auto">
          {voidLayers.map((layer, index) => (
            <motion.div
              key={layer.depth}
              className="relative"
              initial={{ x: 0, y: 0 }}
              animate={{
                x: layerSeparation.get() * index,
                y: layerSeparation.get() * index * 0.5
              }}
              style={{
                zIndex: voidLayers.length - index
              }}
              onClick={() => setSelectedLayer(layer)}
            >
              <SacaiLayer layers={2}>
                <div className={`p-12 border-2 cursor-pointer ${
                  index === 0 ? 'bg-white-0 border-black-100' :
                  index === 1 ? 'bg-gray-plaster border-gray-steel' :
                  index === 2 ? 'bg-gray-steel border-black-100 text-white-0' :
                  'bg-black-100 border-white-0 text-white-0'
                }`}>
                  <h4 className="text-2xl font-black mb-4">LAYER {layer.depth}</h4>
                  <h5 className="text-xl font-bold mb-2">{layer.title}</h5>
                  <p className="opacity-80">{layer.description}</p>

                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className={`aspect-square ${
                          index < 2 ? 'bg-black-100' : 'bg-white-0'
                        }`}
                        style={{
                          opacity: 1 - (i * 0.1)
                        }}
                      />
                    ))}
                  </div>
                </div>
              </SacaiLayer>
            </motion.div>
          ))}
        </div>

        {/* Layer Separation Control */}
        <div className="mt-16 text-center">
          <div className="text-sm font-mono mb-4">LAYER SEPARATION</div>
          <div className="text-2xl font-black">{Math.round(layerSeparation.get())}px</div>
        </div>
      </div>
    </FragmentMosaic>
  )

  const renderPhilosophyView = () => (
    <ExposedStructure showGrid showMeasurements>
      <div className="min-h-screen p-12 bg-white-0">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-4xl font-black mb-12">VOID PHILOSOPHY</h3>

          <div className="space-y-12">
            <div>
              <h4 className="text-2xl font-bold mb-4">THE BEAUTY OF ABSENCE</h4>
              <p className="text-lg leading-relaxed">
                In Sacai's philosophy of layering, we find truth not in what is added,
                but in what is removed. The void between layers speaks louder than
                the layers themselves.
              </p>
            </div>

            <div>
              <h4 className="text-2xl font-bold mb-4">NEGATIVE SPACE AS MATERIAL</h4>
              <p className="text-lg leading-relaxed">
                We treat emptiness as a textile. The void becomes our most precious material,
                more valuable than silk, more structural than steel. In the absence of form,
                we find the purest expression of fashion.
              </p>
            </div>

            <div className="border-t border-black-100 pt-8">
              <h4 className="text-xl font-black mb-6">VOID PRINCIPLES</h4>
              <div className="space-y-4">
                {voidPhilosophies.map((philosophy, index) => (
                  <motion.div
                    key={philosophy}
                    className="flex items-center gap-4"
                    animate={{
                      opacity: philosophyIndex === index ? 1 : 0.4
                    }}
                  >
                    <div className={`w-4 h-4 ${
                      philosophyIndex === index ? 'bg-black-100' : 'bg-gray-plaster'
                    }`} />
                    <span className="text-lg font-mono">{philosophy}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="text-center pt-8">
              <p className="text-2xl font-black italic">
                "IN THE VOID, WE FIND EVERYTHING"
              </p>
            </div>
          </div>
        </div>
      </div>
    </ExposedStructure>
  )

  const renderArchiveView = () => (
    <div className="min-h-screen bg-black-100 text-white-0 p-12">
      <h3 className="text-4xl font-black mb-12 text-center">VOID ARCHIVE</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: dissolution.get() }}
            transition={{ delay: i * 0.1 }}
          >
            <DeconstructedHover intensity={2}>
              <div className="aspect-square bg-white-0 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-mono text-black-100 opacity-10">
                    {i.toString().padStart(2, '0')}
                  </span>
                </div>
                <div
                  className="absolute inset-0 bg-black-100"
                  style={{
                    clipPath: `circle(${(i + 1) * 8}% at 50% 50%)`
                  }}
                />
              </div>
              <div className="mt-2 text-xs font-mono opacity-60">
                VOID_STUDY_{(i + 1).toString().padStart(3, '0')}
              </div>
            </DeconstructedHover>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-micro font-mono opacity-60">
          DISSOLUTION LEVEL: {(100 - dissolution.get() * 100).toFixed(0)}%
        </p>
      </div>
    </div>
  )

  return (
    <div ref={containerRef} className="relative bg-white-0">
      {/* Void Status Bar */}
      <motion.div
        className="fixed top-20 left-0 right-0 z-40 bg-black-100 text-white-0 py-2"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between text-micro font-mono">
            <div className="flex items-center gap-6">
              <span>VOID_DEPTH: {Math.round(voidDepth.get())}%</span>
              <span className="opacity-60">|</span>
              <span>DISSOLUTION: {(100 - dissolution.get() * 100).toFixed(0)}%</span>
              <span className="opacity-60">|</span>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {voidPhilosophies[philosophyIndex]}
              </motion.span>
            </div>
            <span>CINCH LAB × VOID ENGINE</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="pt-32">
        {/* Page Title */}
        <motion.div
          className="container-wide mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-micro font-mono text-hybrid-red mb-2">
            SACAI_LAYERING / NEGATIVE_SPACE
          </div>
          <h1 className="text-display font-black tracking-tightest uppercase">
            <SacaiLayer layers={3} color1="black-100" color2="gray-steel">
              VOID
            </SacaiLayer>
          </h1>
          <div className="text-lg text-gray-steel mt-4 max-w-2xl">
            Exploring the space between layers. Where fashion dissolves into nothingness.
            The beauty of absence made manifest.
          </div>
        </motion.div>

        {/* View Controls */}
        <div className="container-wide mb-12">
          <div className="flex gap-2">
            {(['DESCENT', 'LAYERS', 'PHILOSOPHY', 'ARCHIVE'] as ViewMode[]).map(mode => (
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
        <div>
          {viewMode === 'DESCENT' && renderDescentView()}
          {viewMode === 'LAYERS' && renderLayersView()}
          {viewMode === 'PHILOSOPHY' && renderPhilosophyView()}
          {viewMode === 'ARCHIVE' && renderArchiveView()}
        </div>

        {/* Laboratory Statement */}
        <motion.div
          className="container-wide py-20 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-micro font-mono text-gray-steel mb-4">
            VOID MANIFESTO
          </div>
          <h2 className="text-4xl font-black mb-8">
            EMBRACE THE EMPTINESS • LAYER THE NOTHINGNESS
          </h2>
          <p className="text-lg text-gray-steel max-w-2xl mx-auto">
            In the void, we find the ultimate expression of Sacai's layering philosophy.
            Not in what we add, but in what we remove. This is CINCH LAB.
          </p>
        </motion.div>
      </div>

      {/* Layer Detail Modal */}
      <AnimatePresence>
        {selectedLayer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLayer(null)}
              className="fixed inset-0 bg-black-100/90 z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-16 md:inset-32 bg-white-0 z-50 overflow-auto"
            >
              <div className="p-12">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-micro font-mono text-hybrid-red mb-2">
                      LAYER_{selectedLayer.depth}
                    </div>
                    <h2 className="text-4xl font-black">{selectedLayer.title}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedLayer(null)}
                    className="text-2xl hover:text-hybrid-red transition-colors"
                  >
                    ×
                  </button>
                </div>

                <p className="text-lg mb-8">{selectedLayer.description}</p>

                <div className="grid grid-cols-3 gap-4">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-gradient-to-br"
                      style={{
                        background: `linear-gradient(135deg, var(--${selectedLayer.color1}) 0%, var(--${selectedLayer.color2}) 100%)`,
                        opacity: 1 - (i * 0.1)
                      }}
                    />
                  ))}
                </div>

                <div className="mt-8 text-sm font-mono opacity-60">
                  DEPTH: {selectedLayer.depth * 1000}m | PRESSURE: {selectedLayer.depth * 100} ATM
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}