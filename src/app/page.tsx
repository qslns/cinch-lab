'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CipherText from '@/components/CipherText'

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
          {/* Main Slogan */}
          <div className="mb-12">
            <motion.h1
              className="text-[clamp(50px,8vw,150px)] font-black tracking-tighter leading-[0.9]"
              style={{ scale: scaleParallax }}
            >
              <span className="slogan-word block">
                <CipherText text="CINCH" />
              </span>
              <span className="slogan-word block text-safety-orange">
                •
              </span>
              <span className="slogan-word block">
                <CipherText text="RELEASE" />
              </span>
              <span className="slogan-word block text-safety-orange">
                •
              </span>
              <span className="slogan-word block">
                <CipherText text="REPEAT" />
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

          {/* Laboratory Name */}
          <div className="mb-12">
            <h2 className="text-2xl font-black tracking-[0.3em] opacity-60">
              CINCH LAB
            </h2>
            <p className="text-xs font-mono mt-2 opacity-40">
              EXPERIMENTAL FASHION LABORATORY
            </p>
          </div>

          {/* Genius Declaration */}
          <motion.div
            className="genius-text mb-12 p-8 border border-white/20"
            whileHover={{ borderColor: 'rgba(255, 107, 53, 0.5)' }}
          >
            <p className="text-lg font-bold mb-2">
              "CINCH LAB은 최고이자 난 천재야"
            </p>
            <p className="text-xs font-mono opacity-60">
              GENIUS AT WORK • NO COMPROMISE • PURE CREATION
            </p>
          </motion.div>

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

          {/* Laboratory Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* LAB */}
            <Link href="/lab" className="group" aria-label="Explore the LAB - Experimental techniques and processes">
              <motion.div
                className="p-8 border border-white/20 hover:border-safety-orange transition-all"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-2xl font-black mb-4">LAB</h3>
                <p className="text-xs opacity-60 mb-4">
                  Experimental techniques and processes.
                  Where genius manifests in form.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono">EXPERIMENTS_ACTIVE</span>
                  <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* COLLECTIONS */}
            <Link href="/collections" className="group" aria-label="View COLLECTIONS - Visual documentation of creations">
              <motion.div
                className="p-8 border border-white/20 hover:border-safety-orange transition-all"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-2xl font-black mb-4">COLLECTIONS</h3>
                <p className="text-xs opacity-60 mb-4">
                  Visual documentation of creations.
                  No prices, only visions.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono">LOOKBOOKS_AVAILABLE</span>
                  <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* ARCHIVE */}
            <Link href="/archive" className="group" aria-label="Browse ARCHIVE - Philosophy and process documentation">
              <motion.div
                className="p-8 border border-white/20 hover:border-safety-orange transition-all"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-2xl font-black mb-4">ARCHIVE</h3>
                <p className="text-xs opacity-60 mb-4">
                  The mind behind the laboratory.
                  Philosophy and process.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono">THOUGHTS_DOCUMENTED</span>
                  <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="py-24 px-8 bg-white text-carbon-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[clamp(40px,6vw,80px)] font-black mb-8 leading-[0.9]">
            FASHION WITHOUT
            <br />
            <span className="text-safety-orange">COMMERCE</span>
          </h2>
          <p className="text-sm leading-relaxed opacity-80 max-w-2xl mx-auto">
            We don't sell clothes. We create experiments.
            After exhibitions, after documentation, maybe one piece finds an owner.
            Not through shopping carts, but through understanding.
            This is not a store. This is a laboratory.
          </p>
        </div>
      </section>

      {/* BOTTOM STATUS BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-carbon-black/80 backdrop-blur-sm border-t border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-[10px] font-mono opacity-60">
            CINCH_LAB_V.2025 • GENIUS_MODE_ACTIVE
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-mono opacity-60">
              NO_PRODUCTS
            </span>
            <span className="text-[10px] font-mono opacity-60">
              NO_PRICES
            </span>
            <span className="text-[10px] font-mono text-safety-orange">
              ONLY_CREATION
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}