'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CipherText from '@/components/CipherText'
import KineticText, { KineticDisplay, WaveText } from '@/components/KineticText'
import DeconstructedHover, { ExposedStructure } from '@/components/DeconstructedHover'
import AsymmetricGrid, { BrokenContainer, ShiftedLayers, DiagonalFlow } from '@/components/AsymmetricLayout'

const InteractiveCanvas = dynamic(() => import('@/components/InteractiveCanvas'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-carbon-black animate-pulse" />
})

gsap.registerPlugin(ScrollTrigger)

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [currentTime, setCurrentTime] = useState('')
  const [experimentStatus, setExperimentStatus] = useState('IDLE')
  const [glitchMode, setGlitchMode] = useState(false)

  // Parallax transforms
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const scaleParallax = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])

  useEffect(() => {
    // Time display with Cinch•Release•Repeat cycle
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))

      // Cycle through slogan states
      const seconds = now.getSeconds()
      if (seconds % 20 < 7) {
        setExperimentStatus('CINCH')
      } else if (seconds % 20 < 14) {
        setExperimentStatus('RELEASE')
      } else {
        setExperimentStatus('REPEAT')
      }

      // Random glitch
      if (Math.random() > 0.97) {
        setGlitchMode(true)
        setTimeout(() => setGlitchMode(false), 150)
      }
    }, 1000)

    // GSAP Animations
    const ctx = gsap.context(() => {
      gsap.from('.slogan-word', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.3,
        ease: 'power4.out'
      })

      gsap.from('.genius-text', {
        opacity: 0,
        scale: 0.9,
        duration: 2,
        delay: 1.5,
        ease: 'power2.out'
      })
    })

    return () => {
      clearInterval(timer)
      ctx.revert()
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-carbon-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 scientific-grid opacity-10 pointer-events-none" />
      {glitchMode && <div className="fixed inset-0 noise-overlay" />}

      {/* HERO SECTION - SLOGAN FOCUSED */}
      <section className="min-h-screen relative flex items-center justify-center" aria-label="Hero section">
        <motion.div
          className="text-center relative z-10"
          style={{ y: yParallax }}
        >
          {/* Main Slogan with Kinetic Typography */}
          <div className="mb-12">
            <motion.h1
              className="text-[clamp(50px,8vw,150px)] font-black tracking-tighter leading-[0.9]"
              style={{ scale: scaleParallax }}
            >
              <span className="slogan-word block kinetic-morph">
                <KineticText text="CINCH" mode="morph" className="variable-weight" />
              </span>
              <span className="slogan-word block text-safety-orange">
                <KineticText text="•" mode="glitch" />
              </span>
              <span className="slogan-word block">
                <KineticText text="RELEASE" mode="deconstruct" className="hover-explode" />
              </span>
              <span className="slogan-word block text-safety-orange">
                <KineticText text="•" mode="glitch" />
              </span>
              <span className="slogan-word block">
                <KineticText text="REPEAT" mode="elastic" />
              </span>
            </motion.h1>
          </div>

          {/* Status Indicator */}
          <motion.div
            className="mb-8 flex items-center justify-center gap-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            role="status"
            aria-live="polite"
          >
            <div className="h-px w-20 bg-white/30" />
            <span className="text-xs font-mono tracking-wider">
              STATUS: {experimentStatus}
            </span>
            <div className="h-px w-20 bg-white/30" />
          </motion.div>

          {/* Laboratory Name with Exposed Structure */}
          <div className="mb-12">
            <ExposedStructure>
              <h2 className="text-2xl font-black tracking-[0.3em] opacity-60 exposed-seams">
                <KineticDisplay text="CINCH LAB" className="text-outline" />
              </h2>
              <p className="text-xs font-mono mt-2 opacity-40 pattern-marks">
                EXPERIMENTAL FASHION LABORATORY
              </p>
            </ExposedStructure>
          </div>

          {/* Genius Declaration - Removed */}

          {/* Navigation Hint */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs font-mono opacity-40"
          >
            EXPLORE THE LABORATORY ↓
          </motion.div>
        </motion.div>

        {/* Corner Time Display */}
        <div className="fixed top-8 right-8 text-[10px] font-mono opacity-60" aria-live="polite" aria-atomic="true" aria-label="Current time">
          <span className="sr-only">Current time: </span>{currentTime}
        </div>

        {/* Rotating Element */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
      </section>

      {/* LABORATORY PREVIEW */}
      <section className="py-24 px-8 relative" aria-labelledby="lab-preview-title">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 id="lab-preview-title" className="text-4xl font-black mb-4">
              <CipherText text="NO SALES" />
            </h2>
            <p className="text-sm font-mono opacity-60">
              ONLY EXPERIMENTS • ONLY CREATION • ONLY GENIUS
            </p>
          </div>

          {/* Laboratory Sections - Asymmetric Grid */}
          <AsymmetricGrid mode="scattered" className="max-w-7xl mx-auto">
            {/* LAB */}
            <DeconstructedHover mode="layer" intensity={1.5}>
              <Link href="/lab" className="group block" aria-label="Explore the LAB - Experimental techniques and processes">
                <BrokenContainer className="p-8 border-decon bg-white hover:bg-raw-linen transition-all">
                  <h3 className="text-2xl font-black mb-4 text-outline">
                    <KineticText text="LAB" mode="distort" />
                  </h3>
                  <p className="text-xs opacity-60 mb-4 pattern-marks">
                    Experimental techniques and processes.
                    Where creation happens.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono kinetic-stretch">EXPERIMENTS_ACTIVE</span>
                    <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                </BrokenContainer>
              </Link>
            </DeconstructedHover>

            {/* COLLECTIONS */}
            <DeconstructedHover mode="slice" intensity={1.2}>
              <Link href="/collections" className="group block" aria-label="View COLLECTIONS - Visual documentation of creations">
                <div className="p-8 border-fragment bg-white hover:bg-muslin transition-all hybrid-layer">
                  <h3 className="text-2xl font-black mb-4 text-shadow-brutal">
                    <KineticText text="COLLECTIONS" mode="split" />
                  </h3>
                  <p className="text-xs opacity-60 mb-4">
                    Visual documentation.
                    No prices, only visions.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono">LOOKBOOKS_AVAILABLE</span>
                    <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </DeconstructedHover>

            {/* ARCHIVE */}
            <DeconstructedHover mode="fragment" intensity={1}>
              <Link href="/archive" className="group block" aria-label="Browse ARCHIVE - Philosophy and process documentation">
                <ExposedStructure className="p-8 shadow-layer-3 bg-white hover:bg-tyvek-white transition-all">
                  <h3 className="text-2xl font-black mb-4">
                    <WaveText text="ARCHIVE" />
                  </h3>
                  <p className="text-xs opacity-60 mb-4 distressed">
                    The mind behind.
                    Philosophy and process.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono">THOUGHTS_DOCUMENTED</span>
                    <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </div>
                </ExposedStructure>
              </Link>
            </DeconstructedHover>
          </AsymmetricGrid>
        </div>
      </section>

      {/* PHILOSOPHY SECTION - Deconstructed */}
      <section className="py-24 px-8 bg-white text-carbon-black texture-raw-canvas">
        <DiagonalFlow angle={-3}>
          <div className="max-w-4xl mx-auto">
            <ShiftedLayers
              layers={[
                <h2 key="1" className="text-[clamp(40px,6vw,80px)] font-black mb-8 leading-[0.8] text-outline">
                  <KineticDisplay text="FASHION WITHOUT" />
                </h2>,
                <h2 key="2" className="text-[clamp(40px,6vw,80px)] font-black mb-8 leading-[0.8] text-medical-red">
                  <KineticText text="COMMERCE" mode="glitch" />
                </h2>
              ]}
            />
            <div className="mt-16">
              <p className="text-sm leading-relaxed opacity-80 max-w-2xl mx-auto exposed-seams p-4">
                We don't sell. We create.
                After exhibitions, maybe one piece finds an owner.
                Not through carts, through understanding.
                This is not a store. This is a laboratory.
              </p>
            </div>
          </div>
        </DiagonalFlow>
      </section>

      {/* BOTTOM STATUS BAR - Laboratory Style */}
      <div className="fixed bottom-0 left-0 right-0 bg-carbon-black/90 backdrop-blur-sm border-t-3 border-medical-red p-4 lab-warning">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-[10px] font-mono opacity-80 flicker">
            CINCH_LAB_V.2025 • EXPERIMENTAL_MODE
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-mono opacity-60">
              NO_PRODUCTS
            </span>
            <span className="text-[10px] font-mono opacity-60">
              NO_PRICES
            </span>
            <span className="text-[10px] font-mono text-acid-yellow kinetic-morph">
              ONLY_CREATION
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}