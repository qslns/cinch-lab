'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Dynamic imports
const InteractiveCanvas = dynamic(() => import('@/components/InteractiveCanvas'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-concrete-gray animate-pulse" />
})

gsap.registerPlugin(ScrollTrigger)

export default function BrutalistHomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const [currentTime, setCurrentTime] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [glitchMode, setGlitchMode] = useState(false)
  const [systemErrors, setSystemErrors] = useState<string[]>([])

  // Parallax transforms
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const scaleParallax = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1])
  const rotateParallax = useTransform(scrollYProgress, [0, 1], [0, 5])

  // Initialize
  useEffect(() => {
    setIsLoaded(true)

    // Time update with glitches
    const timer = setInterval(() => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })

      // Random time glitch
      if (Math.random() > 0.95) {
        setCurrentTime('##:##:##')
        setTimeout(() => setCurrentTime(timeStr), 100)
      } else {
        setCurrentTime(timeStr)
      }
    }, 1000)

    // Random system errors
    const errorTimer = setInterval(() => {
      if (Math.random() > 0.9) {
        const errors = [
          'MEMORY_OVERFLOW',
          'AESTHETIC_BREACH',
          'STYLE_CORRUPTION',
          'GRID_MALFUNCTION',
          'FASHION_EXCEPTION'
        ]
        const error = errors[Math.floor(Math.random() * errors.length)]
        setSystemErrors(prev => [...prev, error])
        setTimeout(() => {
          setSystemErrors(prev => prev.filter(e => e !== error))
        }, 3000)
      }
    }, 5000)

    // GSAP Animations
    const ctx = gsap.context(() => {
      // Brutalist text reveal
      gsap.from('.brutal-text', {
        y: 100,
        opacity: 0,
        skewY: 10,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out'
      })

      // Glitch effect on scroll
      ScrollTrigger.create({
        trigger: '#laboratory',
        start: 'top 80%',
        onEnter: () => setGlitchMode(true),
        onLeaveBack: () => setGlitchMode(false)
      })
    })

    return () => {
      clearInterval(timer)
      clearInterval(errorTimer)
      ctx.revert()
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-paper-white relative overflow-hidden">
      {/* Scientific Grid Background */}
      <div className="fixed inset-0 scientific-grid opacity-30 pointer-events-none" />

      {/* Scan Lines */}
      <div className="fixed inset-0 scan-lines pointer-events-none" />

      {/* System Errors Display */}
      <AnimatePresence>
        {systemErrors.map((error, index) => (
          <motion.div
            key={error + index}
            className="fixed z-[999] error-box"
            style={{ top: `${80 + index * 40}px`, right: '20px' }}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
          >
            ERROR: {error}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* HERO SECTION - Brutalist Layout */}
      <section className="min-h-screen relative brutalist-grid-asymmetric">
        {/* Cell 1: System Info */}
        <div className="p-8 border-r-3 border-carbon-black bg-white">
          <div className="text-[10px] font-mono space-y-2">
            <div>SYSTEM_BOOT</div>
            <div>VERSION_2025.1.0</div>
            <div>MODE: EXPERIMENTAL</div>
            <div className="mt-4">
              <div className={`inline-block w-2 h-2 ${glitchMode ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
              <span className="ml-2">{glitchMode ? 'UNSTABLE' : 'STABLE'}</span>
            </div>
          </div>
        </div>

        {/* Cell 2: Main Title */}
        <motion.div
          className="p-12 flex flex-col justify-center bg-white relative overflow-hidden"
          style={{ scale: scaleParallax }}
        >
          <div className={glitchMode ? 'glitch-text' : ''} data-text="CINCH LAB">
            <h1 className="brutal-text text-[clamp(60px,10vw,180px)] font-black leading-[0.8] tracking-tighter">
              CINCH
            </h1>
            <h1 className="brutal-text text-[clamp(60px,10vw,180px)] font-black leading-[0.8] tracking-tighter text-safety-orange">
              LAB
            </h1>
          </div>
          <div className="mt-8">
            <p className="text-sm font-mono tracking-wider">
              LABORATORY <span className="text-safety-orange">∴</span> BRUTALISM
            </p>
            <p className="text-xs font-mono opacity-60 mt-2">
              WHERE FASHION MEETS CONTROLLED CHAOS
            </p>
          </div>

          {/* Rotating element */}
          <motion.div
            className="absolute -bottom-10 -right-10 w-40 h-40 border-3 border-carbon-black"
            style={{ rotate: rotateParallax }}
          />
        </motion.div>

        {/* Cell 3: Navigation Grid */}
        <div className="p-6 bg-concrete-gray text-white">
          <div className="h-full flex flex-col justify-between">
            <div className="text-[10px] font-mono">
              NAV_MATRIX
            </div>
            <div className="space-y-4">
              {['LAB', 'ARCHIVE', 'CONTACT'].map((item, i) => (
                <div key={item} className="border-t border-white/30 pt-2">
                  <span className="text-[10px] opacity-60">00{i + 1}</span>
                  <div className="text-sm font-bold">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Cell 4: Time Display */}
        <div className="p-8 bg-carbon-black text-white flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-mono font-bold">
              {currentTime}
            </div>
            <div className="text-[10px] opacity-60 mt-2">
              TEMPORAL_COORDINATE
            </div>
          </div>
        </div>

        {/* Additional cells for asymmetric layout */}
        <div className="col-span-2 p-8 bg-white border-t-3 border-carbon-black">
          <div className="flex items-center gap-4">
            <div className="lab-warning w-20 h-20" />
            <div>
              <p className="text-xs font-mono">CAUTION</p>
              <p className="text-[10px] opacity-60">EXPERIMENTAL ZONE AHEAD</p>
            </div>
          </div>
        </div>

        <div className="p-8 bg-safety-orange text-white">
          <p className="text-xs font-mono">CURRENT_EXPERIMENT</p>
          <p className="text-2xl font-black mt-2">CHAOS</p>
        </div>

        <div className="p-8 bg-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <InteractiveCanvas type="particles" interactive={false} />
          </div>
          <p className="relative z-10 text-xs font-mono">PARTICLE_SYSTEM</p>
        </div>
      </section>

      {/* LABORATORY SECTION */}
      <section id="laboratory" className="py-24 px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 lab-border p-8 bg-paper-white">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-[clamp(40px,6vw,80px)] font-black brutalist-heading">
                  LABORATORY
                </h2>
                <p className="text-xs font-mono mt-2 opacity-60">
                  EXPERIMENTAL_FASHION_RESEARCH_FACILITY
                </p>
              </div>
              <div className="text-right">
                <div className="chemical-formula">
                  C₈H₁₀N₄O₂
                </div>
                <p className="text-[10px] mt-2 opacity-60">CAFFEINE</p>
              </div>
            </div>
          </div>

          {/* Experiment Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-carbon-black p-2">
            {/* Card 1: FABRIC */}
            <Link href="/lab">
              <motion.div
                className="bg-white p-8 h-96 relative overflow-hidden group cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <div className="absolute top-4 right-4 text-[10px] font-mono opacity-60">
                  EXP_001
                </div>
                <h3 className="text-4xl font-black mb-4">FABRIC</h3>
                <div className="h-48 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border-3 border-carbon-black transform rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                  </div>
                </div>
                <p className="text-xs font-mono opacity-60">
                  MATERIAL_DECOMPOSITION
                </p>
              </motion.div>
            </Link>

            {/* Card 2: FORM */}
            <Link href="/lab">
              <motion.div
                className="bg-concrete-gray text-white p-8 h-96 relative overflow-hidden group cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <div className="absolute top-4 right-4 text-[10px] font-mono opacity-60">
                  EXP_002
                </div>
                <h3 className="text-4xl font-black mb-4">FORM</h3>
                <div className="h-48 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-1 bg-white group-hover:h-32 transition-all duration-500" />
                    <div className="w-1 h-32 bg-white absolute group-hover:w-32 transition-all duration-500" />
                  </div>
                </div>
                <p className="text-xs font-mono opacity-60">
                  STRUCTURAL_ANALYSIS
                </p>
              </motion.div>
            </Link>

            {/* Card 3: VOID */}
            <Link href="/lab">
              <motion.div
                className="bg-carbon-black text-white p-8 h-96 relative overflow-hidden group cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <div className="absolute top-4 right-4 text-[10px] font-mono opacity-60">
                  EXP_003
                </div>
                <h3 className="text-4xl font-black mb-4 text-safety-orange">VOID</h3>
                <div className="h-48 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-3 border-safety-orange group-hover:scale-150 transition-transform duration-500" />
                  </div>
                </div>
                <p className="text-xs font-mono opacity-60">
                  NEGATIVE_SPACE_THEORY
                </p>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* COLLECTIONS GRID */}
      <section className="py-24 bg-concrete-gray">
        <div className="px-8">
          <div className="mb-16">
            <h2 className="text-[clamp(40px,6vw,80px)] font-black text-white brutalist-heading">
              COLLECTIONS
            </h2>
            <div className="flex items-center gap-4 mt-4">
              <div className="h-1 bg-safety-orange flex-grow" />
              <span className="text-xs font-mono text-white">2020—2025</span>
            </div>
          </div>

          {/* Asymmetric Collection Grid */}
          <div className="brutalist-grid-asymmetric max-w-7xl mx-auto">
            {['SS25', 'FW24', 'SS24', 'FW23', 'ARCHIVE'].map((collection, i) => (
              <Link key={collection} href="/collections">
                <motion.div
                  className={`p-8 ${i % 2 === 0 ? 'bg-white text-carbon-black' : 'bg-carbon-black text-white'} cursor-pointer relative overflow-hidden group`}
                  whileHover={{ scale: 0.98 }}
                  style={{ gridRow: `span ${i === 0 ? 2 : 1}` }}
                >
                  <h3 className="text-2xl font-black">{collection}</h3>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-4xl">→</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="lab-border p-12 bg-paper-white">
            <h2 className="text-[clamp(40px,6vw,100px)] font-black brutalist-heading leading-[0.8]">
              FASHION
              <br />
              <span className="text-safety-orange">EXCEEDS</span>
              <br />
              LIMITS
            </h2>
            <div className="mt-8 border-t-3 border-carbon-black pt-8">
              <p className="text-sm font-mono leading-relaxed">
                In this laboratory, we deconstruct fashion to its molecular level.
                Every thread is an experiment. Every seam, a hypothesis.
                We don't follow trends—we engineer mutations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-carbon-black text-white">
        <div className="px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div>
              <p className="text-xs font-mono opacity-60">LOCATION</p>
              <p className="text-sm font-bold mt-2">SEOUL</p>
            </div>
            <div>
              <p className="text-xs font-mono opacity-60">CONTACT</p>
              <p className="text-sm font-bold mt-2">LAB@CINCH.COM</p>
            </div>
            <div>
              <p className="text-xs font-mono opacity-60">STATUS</p>
              <p className="text-sm font-bold mt-2">OPERATIONAL</p>
            </div>
            <div>
              <p className="text-xs font-mono opacity-60">VERSION</p>
              <p className="text-sm font-bold mt-2">2025.1.0</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-[10px] font-mono opacity-40 text-center">
              © 2025 CINCH LAB — EXPERIMENTAL FASHION LABORATORY
            </p>
          </div>
        </div>
      </footer>

      {/* Fixed Position Elements */}
      <div className="fixed bottom-8 right-8 text-[10px] font-mono opacity-40 z-50">
        SCROLL: {Math.round(scrollYProgress.get() * 100)}%
      </div>
    </div>
  )
}