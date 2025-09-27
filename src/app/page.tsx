'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// ==========================================================================
// CINCH LAB HOME - Margiela × Sacai Digital Laboratory
// Deconstructive Design, Hybrid Layering, Anti-Design Principles
// ==========================================================================

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const labRef = useRef<HTMLDivElement>(null)
  const { scrollY, scrollYProgress } = useScroll()

  // Mouse position tracking for interactive effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  // State management
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [activeExperiment, setActiveExperiment] = useState(0)
  const [labStatus, setLabStatus] = useState('OPERATIONAL')
  const [glitchActive, setGlitchActive] = useState(false)

  // Laboratory experiments data
  const experiments = [
    { id: '001', name: 'PATTERN DECONSTRUCTION', status: 'IN_PROGRESS', color: 'thread-red' },
    { id: '002', name: 'HYBRID LAYERING', status: 'TESTING', color: 'thread-blue' },
    { id: '003', name: 'MATERIAL SYNTHESIS', status: 'COMPLETE', color: 'safety-orange' },
    { id: '004', name: 'VOLUME DISTORTION', status: 'FAILED', color: 'hazmat-green' },
    { id: '005', name: 'SEAM EXPOSURE', status: 'IN_PROGRESS', color: 'warning-yellow' }
  ]

  // Research areas for navigation
  const researchAreas = [
    { name: 'LAB', desc: 'Technical experiments & process', path: '/lab', span: 'col-span-5 row-span-2' },
    { name: 'COLLECTIONS', desc: 'Seasonal archives', path: '/collections', span: 'col-span-3 row-span-1' },
    { name: 'ARCHIVE', desc: 'Failed experiments & iterations', path: '/archive', span: 'col-span-4 row-span-1' },
    { name: 'ANALYSIS', desc: 'Fashion critique', path: '/analysis', span: 'col-span-2 row-span-1' },
    { name: 'ABOUT', desc: 'Philosophy & manifesto', path: '/about', span: 'col-span-3 row-span-1' },
    { name: 'CONTACT', desc: 'Collaboration only', path: '/contact', span: 'col-span-3 row-span-1' }
  ]

  // Parallax transforms
  const heroY = useTransform(scrollY, [0, 1000], [0, -300])
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.85])
  const heroRotate = useTransform(scrollY, [0, 1000], [0, -2])
  const textY = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])

  // Initialize and lifecycle
  useEffect(() => {
    // Loading animation
    const loadTimer = setTimeout(() => setIsLoading(false), 1800)

    // Clock update
    const clockTimer = setInterval(() => setCurrentTime(new Date()), 1000)

    // Experiment rotation
    const experimentTimer = setInterval(() => {
      setActiveExperiment(prev => (prev + 1) % experiments.length)
    }, 4000)

    // Random glitch effect
    const glitchTimer = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 8000)

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearTimeout(loadTimer)
      clearInterval(clockTimer)
      clearInterval(experimentTimer)
      clearInterval(glitchTimer)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY, experiments.length])

  // Loading Screen with Deconstructed Animation
  if (isLoading) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 bg-lab-white flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            {/* Deconstructed Loading Shape */}
            <motion.div className="relative w-48 h-48">
              <motion.div
                className="absolute inset-0 border-2 border-thread-black"
                animate={{
                  rotate: [0, 90, 180, 270, 360],
                  scale: [1, 1.1, 1, 0.9, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute inset-4 border border-thread-red"
                animate={{
                  rotate: [360, 270, 180, 90, 0],
                  scale: [1, 0.9, 1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute inset-8 border border-thread-blue"
                animate={{
                  rotate: [0, -90, -180, -270, -360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>

            {/* Loading Text */}
            <motion.p
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-xs font-mono uppercase tracking-widest whitespace-nowrap"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              INITIALIZING LABORATORY
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-lab-white overflow-hidden">
      {/* Background Texture Layers */}
      <div className="fixed inset-0 texture-graph opacity-5 pointer-events-none" />
      <div className="fixed inset-0 texture-scan pointer-events-none" />

      {/* Interactive Background Gradient */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 800px at ${smoothMouseX}px ${smoothMouseY}px,
            rgba(220, 20, 60, 0.02) 0%,
            transparent 40%)`,
        }}
      />

      {/* ==========================================================================
         HEADER - Laboratory Status Bar
         ========================================================================== */}

      <header className="fixed top-0 left-0 right-0 z-50 nav-laboratory">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Lab Identity */}
            <div className="flex items-center gap-8">
              <Link href="/">
                <motion.div
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-8 h-8 border-2 border-lab-carbon rotate-45">
                    <div className="w-full h-full border border-thread-red rotate-45 scale-75" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-widest">
                    CINCH LAB
                  </span>
                </motion.div>
              </Link>

              {/* Status Indicators */}
              <div className="hidden md:flex items-center gap-4 text-xs font-mono">
                <span className={`inline-flex items-center gap-2 ${glitchActive ? 'text-glitch' : ''}`}>
                  <span className="w-2 h-2 bg-hazmat-green rounded-full animate-pulse" />
                  {labStatus}
                </span>
                <span className="opacity-50">|</span>
                <span className="tabular-nums">
                  {currentTime.toLocaleTimeString('en-US', { hour12: false })}
                </span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {['LAB', 'COLLECTIONS', 'ARCHIVE', 'ABOUT'].map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`}>
                  <motion.span
                    className="nav-item text-xs font-medium tracking-wider"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item}
                  </motion.span>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2">
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className="block w-full h-[1px] bg-lab-carbon" />
                <span className="block w-3/4 h-[1px] bg-lab-carbon" />
                <span className="block w-1/2 h-[1px] bg-lab-carbon" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================================================
         HERO SECTION - Deconstructed Typography & Experiments
         ========================================================================== */}

      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20">
        {/* Background Shapes - Floating Elements */}
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY, scale: heroScale, rotate: heroRotate }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${20 + i * 12}%`,
                left: `${10 + i * 15}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 90, 180, 270, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <div className={`w-24 h-24 border border-lab-carbon opacity-10 rotate-${i * 15} animate-morph`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{ y: textY, opacity }}
          >
            {/* Experiment Status */}
            <div className="mb-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExperiment}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-4 text-xs font-mono"
                >
                  <span className="text-thread-red">EXP_{experiments[activeExperiment].id}</span>
                  <span className="opacity-50">|</span>
                  <span className="tracking-wider">{experiments[activeExperiment].name}</span>
                  <span className={`px-2 py-1 bg-lab-carbon/10 text-${experiments[activeExperiment].color}`}>
                    {experiments[activeExperiment].status}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Main Typography - Deconstructed Layout */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-9">
                <h1 className="relative">
                  {/* CINCH */}
                  <motion.span
                    className="block text-[clamp(4rem,12vw,10rem)] font-black leading-[0.8] tracking-tighter"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <span className="inline-block relative">
                      CINCH
                      <span className="absolute -top-1 -left-1 text-thread-red opacity-20 blur-[1px]">
                        CINCH
                      </span>
                    </span>
                  </motion.span>

                  {/* RELEASE */}
                  <motion.span
                    className="block text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[0.8] -mt-4 ml-[10%]"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <span className="inline-block relative hybrid-split" data-text="RELEASE">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-thread-blue to-safety-orange">
                        RELEASE
                      </span>
                    </span>
                  </motion.span>

                  {/* REPEAT */}
                  <motion.span
                    className="block text-[clamp(3rem,8vw,6rem)] font-light leading-[0.8] -mt-2"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    <span className="text-lab-carbon/60">REPEAT</span>
                  </motion.span>
                </h1>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mt-8 max-w-2xl"
                >
                  <p className="text-lg font-light leading-relaxed mb-4">
                    Experimental fashion laboratory exploring the space between
                    <span className="font-medium text-thread-red"> destruction </span>
                    and
                    <span className="font-medium text-thread-blue"> reconstruction</span>.
                  </p>
                  <p className="text-sm opacity-60 font-mono">
                    NO SALES • NO COMPROMISE • ONLY PROCESS
                  </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="mt-12 flex flex-wrap gap-4"
                >
                  <Link href="/lab">
                    <button className="btn-deconstructed group">
                      <span className="relative z-10">ENTER LABORATORY</span>
                    </button>
                  </Link>

                  <Link href="/archive">
                    <button className="btn-hybrid">
                      <span>VIEW ARCHIVE</span>
                    </button>
                  </Link>
                </motion.div>
              </div>

              {/* Side Info Panel */}
              <div className="col-span-12 lg:col-span-3 mt-12 lg:mt-0">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="layer-card p-6 exposed-seam"
                >
                  <h3 className="text-xs font-mono uppercase tracking-widest mb-4 text-thread-red">
                    CURRENT RESEARCH
                  </h3>
                  <div className="space-y-3">
                    {[
                      'Exposed seam methodology',
                      'Hybrid garment splicing',
                      'Zero-waste tessellation',
                      'Biomaterial synthesis'
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + i * 0.1 }}
                        className="flex items-start gap-3 group cursor-pointer"
                      >
                        <span className="text-xs font-mono text-thread-blue">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="text-sm leading-relaxed group-hover:translate-x-1 transition-transform">
                          {item}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-lab-carbon/50 to-transparent" />
            <span className="text-xs font-mono uppercase tracking-widest opacity-40">
              SCROLL
            </span>
          </div>
        </motion.div>
      </section>

      {/* ==========================================================================
         RESEARCH AREAS - Asymmetric Grid
         ========================================================================== */}

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold mb-2">RESEARCH DEPARTMENTS</h2>
            <p className="text-sm opacity-60 font-mono">AUTONOMOUS UNITS • EXPERIMENTAL PROCESSES</p>
          </motion.div>

          {/* Asymmetric Department Grid */}
          <div className="grid-asymmetric">
            {researchAreas.map((area, i) => (
              <motion.div
                key={area.name}
                className={`relative group ${area.span}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={area.path}>
                  <div className="h-full min-h-[160px] relative overflow-hidden pattern-piece cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-lab-carbon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative h-full p-6 border border-lab-carbon/20 group-hover:border-lab-carbon/40 transition-all duration-300">
                      <div className="construction-mark" data-mark={`DEPT_00${i + 1}`} />

                      <h3 className="text-2xl font-bold mb-2 group-hover:text-thread-red transition-colors">
                        {area.name}
                      </h3>
                      <p className="text-sm opacity-60">
                        {area.desc}
                      </p>

                      {/* Hover Arrow */}
                      <motion.div
                        className="absolute bottom-4 right-4 text-2xl font-black opacity-0 group-hover:opacity-30"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         PHILOSOPHY SECTION - Deconstructed Text
         ========================================================================== */}

      <section ref={labRef} className="py-24 px-6 bg-lab-carbon text-lab-white relative overflow-hidden">
        <div className="absolute inset-0 texture-scan opacity-10" />

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Header */}
            <div className="mb-12">
              <span className="text-xs font-mono text-thread-red tracking-widest">
                MANIFESTO / 宣言 / 선언문
              </span>
              <h2 className="text-5xl font-black mt-4">
                FASHION WITHOUT
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-glitch-cyan to-glitch-magenta">
                  COMMERCE
                </span>
              </h2>
            </div>

            {/* Philosophy Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <p className="text-xl font-light leading-relaxed">
                  We exist at the intersection of
                  <span className="font-semibold text-glitch-cyan"> deconstruction </span>
                  and
                  <span className="font-semibold text-glitch-magenta"> reconstruction</span>,
                  where garments become living experiments.
                </p>
                <div className="stitching py-4">
                  <p className="text-sm opacity-70 font-mono">
                    Inspired by Margiela's raw edges and Sacai's hybrid philosophy
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { label: 'PROCESS', text: 'Every stitch tells a story of experimentation' },
                  { label: 'PURPOSE', text: 'No products. Only prototypes' },
                  { label: 'PHILOSOPHY', text: 'The beauty of unfinished work' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="border-l-2 border-glitch-cyan/30 pl-6 raw-edge"
                  >
                    <p className="text-xs font-mono uppercase tracking-wider mb-2 text-glitch-cyan">
                      {item.label}
                    </p>
                    <p className="opacity-80">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
         RECENT EXPERIMENTS - Gallery
         ========================================================================== */}

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs font-mono text-thread-red tracking-widest">
              RECENT / 最近 / 최근
            </span>
            <h2 className="text-4xl font-black mt-4">LATEST EXPERIMENTS</h2>
          </motion.div>

          {/* Experiment Gallery */}
          <div className="grid-broken">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02, rotate: -0.5 }}
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-lab-carbon/5 to-lab-carbon/10 relative pattern-piece">
                  <div className="absolute inset-0 bg-gradient-to-t from-lab-carbon/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-lab-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs font-mono mb-1">
                      EXP_{String(i + 1).padStart(3, '0')}
                    </p>
                    <p className="text-sm">
                      {i % 3 === 0 ? 'Volume Study' : i % 2 === 0 ? 'Pattern Research' : 'Material Test'}
                    </p>
                  </div>

                  {/* Construction marks */}
                  <div className="absolute top-4 left-4 construction-mark" data-mark={`TEST_${i + 1}`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         FOOTER - Laboratory Information
         ========================================================================== */}

      <footer className="py-16 px-6 bg-lab-carbon text-lab-white relative">
        <div className="absolute inset-0 texture-overlay opacity-5" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Lab Identity */}
            <div>
              <h3 className="text-xs font-mono tracking-widest mb-4 text-thread-red">
                CINCH LAB
              </h3>
              <p className="text-xs opacity-60 leading-relaxed">
                Experimental Fashion
                <br />
                Research Laboratory
                <br />
                Seoul × Tokyo × Paris
              </p>
            </div>

            {/* Research */}
            <div>
              <h3 className="text-xs font-mono tracking-widest mb-4">
                RESEARCH
              </h3>
              <div className="space-y-2">
                {['Process', 'Materials', 'Techniques'].map((item) => (
                  <Link key={item} href={`/${item.toLowerCase()}`}>
                    <span className="block text-xs opacity-60 hover:opacity-100 hover:text-thread-red transition-all">
                      {item}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 className="text-xs font-mono tracking-widest mb-4">
                STATUS
              </h3>
              <p className="text-xs opacity-60 leading-relaxed">
                Lab: ACTIVE
                <br />
                Commerce: DISABLED
                <br />
                Experiments: ONGOING
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xs font-mono tracking-widest mb-4">
                COLLABORATION
              </h3>
              <p className="text-xs opacity-60 leading-relaxed">
                Exhibitions only
                <br />
                No commercial inquiries
                <br />
                <Link href="/contact" className="underline hover:text-thread-red">
                  Submit proposal
                </Link>
              </p>
            </div>
          </div>

          {/* Bottom Line */}
          <div className="pt-8 border-t border-lab-white/10">
            <p className="text-xs font-mono opacity-40 text-center">
              © 2024 CINCH LAB • NO SALES • EXPERIMENTAL ONLY • 실험실
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}