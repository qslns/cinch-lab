'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  MagneticButton,
  RippleEffect,
  DistortionText,
  ParallaxContainer,
  FabricDrag,
  RevealOnScroll,
  SplitText,
  NoiseBackground,
  Card3D,
  CursorFollower
} from '@/components/InteractiveElements'

// Dynamic imports for heavy components
const MorphingShape = dynamic(() => import('@/components/InteractiveElements').then(mod => mod.MorphingShape), { ssr: false })

// ==========================================================================
// CINCH LAB HOME - Complete Margiela × Sacai Implementation
// Deconstructive, Layered, Interactive, Experimental
// ==========================================================================

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY, scrollYProgress } = useScroll()

  // Mouse position for interactive effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  // State
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [activeExperiment, setActiveExperiment] = useState(0)

  // Experiments data
  const experiments = [
    { id: 'DECONSTRUCTION', name: 'Pattern Deconstruction', status: 'active' },
    { id: 'LAYERING', name: 'Hybrid Layering', status: 'processing' },
    { id: 'MATERIAL', name: 'Material Research', status: 'complete' },
    { id: 'VOLUME', name: 'Volume Studies', status: 'active' }
  ]

  // Parallax transforms
  const heroY = useTransform(scrollY, [0, 1000], [0, -500])
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.8])
  const heroRotate = useTransform(scrollY, [0, 1000], [0, -5])
  const textY = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  // Initialize
  useEffect(() => {
    // Loading animation
    setTimeout(() => setIsLoading(false), 2000)

    // Time update
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)

    // Experiment rotation
    const experimentTimer = setInterval(() => {
      setActiveExperiment(prev => (prev + 1) % experiments.length)
    }, 3000)

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      clearInterval(timer)
      clearInterval(experimentTimer)
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  // Loading Screen
  if (isLoading) {
    return (
      <motion.div
        className="fixed inset-0 z-50 bg-raw-white flex items-center justify-center"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.div
            className="inline-block"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="w-32 h-32 border-4 border-thread-black relative">
              <div className="absolute inset-2 border-2 border-thread-red animate-spin-slow" />
              <div className="absolute inset-4 border border-thread-blue animate-spin-slow reverse" />
            </div>
          </motion.div>
          <motion.p
            className="mt-8 text-xs font-mono uppercase tracking-widest"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Deconstructing Fashion
          </motion.p>
        </div>
      </motion.div>
    )
  }

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Custom Cursor */}
      <CursorFollower />

      {/* Noise Texture Overlay */}
      <NoiseBackground opacity={0.02} />

      {/* Background Layers */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${smoothMouseX}px ${smoothMouseY}px, rgba(255,107,53,0.05) 0%, transparent 50%)`
          }}
        />
      </div>

      {/* ==========================================================================
         HERO SECTION - Fully Interactive & Deconstructed
         ========================================================================== */}

      <section ref={heroRef} className="relative min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY, scale: heroScale, rotate: heroRotate }}
        >
          {/* Floating Shapes */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <MorphingShape size={150} />
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
          {/* Status Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-6">
                <span className="text-thread-red">●</span>
                <DistortionText text="LABORATORY ACTIVE" />
                <span className="opacity-50">
                  {currentTime.toLocaleTimeString('en-US', { hour12: false })}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <span className="opacity-50">EXPERIMENT:</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeExperiment}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-thread-blue"
                  >
                    {experiments[activeExperiment].name}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Hero Typography - Deconstructed Layout */}
          <div className="grid grid-cols-12 gap-4">
            <motion.div
              className="col-span-12 lg:col-span-8"
              style={{ y: textY, opacity }}
            >
              {/* Main Slogan - Split and Layered */}
              <h1 className="relative">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative inline-block"
                >
                  <FabricDrag>
                    <span className="text-[8rem] font-black leading-none tracking-tighter">
                      CINCH
                    </span>
                  </FabricDrag>
                  <div className="absolute -top-2 -left-2 text-[8rem] font-black text-thread-red opacity-30 blur-[2px]">
                    CINCH
                  </div>
                </motion.div>

                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative block ml-[15%] -mt-8"
                >
                  <MagneticButton strength={0.2}>
                    <span className="text-[7rem] font-bold leading-none hybrid-split">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-thread-blue to-safety-orange">
                        RELEASE
                      </span>
                    </span>
                  </MagneticButton>
                </motion.div>

                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="relative block -mt-6"
                >
                  <span className="text-[6rem] font-light leading-none text-oxidized-metal">
                    <SplitText text="REPEAT" delay={0.05} />
                  </span>
                </motion.div>
              </h1>

              {/* Description - Editorial Style */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-12 max-w-2xl"
              >
                <p className="text-xl font-light leading-relaxed mb-4">
                  Experimental fashion laboratory where
                  <span className="font-medium text-thread-red"> destruction </span>
                  meets
                  <span className="font-medium text-thread-blue"> creation</span>.
                  No commerce. No compromise. Only process.
                </p>
                <p className="text-sm opacity-60 font-mono">
                  実験的ファッション研究所 × 해체주의 실험실
                </p>
              </motion.div>

              {/* Interactive CTAs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="mt-12 flex flex-wrap gap-4"
              >
                <RippleEffect color="rgba(220, 20, 60, 0.3)">
                  <button className="btn-deconstructed">
                    <span className="text-xs font-mono uppercase tracking-widest">
                      Enter Laboratory
                    </span>
                  </button>
                </RippleEffect>

                <MagneticButton>
                  <Link href="/archive">
                    <button className="btn-hybrid">
                      <span className="text-xs font-mono uppercase tracking-widest">
                        View Archive
                      </span>
                    </button>
                  </Link>
                </MagneticButton>
              </motion.div>
            </motion.div>

            {/* Side Panel - Floating Information */}
            <motion.div
              className="col-span-12 lg:col-span-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card3D>
                <div className="layer-card p-8 bg-raw-white/90 backdrop-blur-sm border border-thread-black/20 exposed-seam">
                  <h3 className="text-xs font-mono uppercase tracking-widest mb-6 text-thread-red">
                    Current Research
                  </h3>
                  <div className="space-y-4">
                    {[
                      'Deconstructive pattern making through exposed seams',
                      'Hybrid garment splicing: MA-1 meets tailoring',
                      'Zero-waste through pattern tessellation',
                      'Biomaterial cultivation: mycelium leather'
                    ].map((text, i) => (
                      <RevealOnScroll key={i}>
                        <div className="flex items-start gap-3 group cursor-pointer">
                          <span className="text-xs font-mono text-thread-blue">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <p className="text-sm leading-relaxed group-hover:translate-x-1 transition-transform">
                            {text}
                          </p>
                        </div>
                      </RevealOnScroll>
                    ))}
                  </div>
                </div>
              </Card3D>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-thread-black to-transparent" />
            <span className="text-xs font-mono uppercase tracking-widest opacity-50">
              Scroll to Explore
            </span>
          </div>
        </motion.div>
      </section>

      {/* ==========================================================================
         DEPARTMENTS SECTION - Interactive Grid with Hover Effects
         ========================================================================== */}

      <section className="py-32 px-8 bg-gradient-to-b from-raw-white to-unbleached">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="mb-16">
              <h2 className="text-5xl font-black mb-4">
                <DistortionText text="Laboratory" className="mr-2" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-thread-red to-thread-blue">
                  Departments
                </span>
              </h2>
              <p className="text-lg font-light opacity-70">
                Autonomous research units exploring fashion's experimental frontiers
              </p>
            </div>
          </RevealOnScroll>

          {/* Asymmetric Department Grid */}
          <div className="grid-asymmetric">
            {[
              {
                name: 'LAB',
                desc: 'Pattern experiments & material research',
                color: 'from-thread-black to-oxidized-metal',
                size: 'col-span-5 row-span-2',
                link: '/lab'
              },
              {
                name: 'COLLECTIONS',
                desc: 'Seasonal documentation',
                color: 'from-thread-blue to-denim-blue',
                size: 'col-span-3 row-span-1',
                link: '/collections'
              },
              {
                name: 'ARCHIVE',
                desc: 'Process & failure documentation',
                color: 'from-aged-leather to-thread-red',
                size: 'col-span-4 row-span-1',
                link: '/archive'
              },
              {
                name: 'ANALYSIS',
                desc: 'Technical critique',
                color: 'from-hazmat-green to-centrifuge-blue',
                size: 'col-span-2 row-span-1',
                link: '/analysis'
              },
              {
                name: 'ABOUT',
                desc: 'Philosophy & manifesto',
                color: 'from-warning-yellow to-safety-orange',
                size: 'col-span-3 row-span-1',
                link: '/about'
              },
              {
                name: 'CONTACT',
                desc: 'Collaboration inquiries',
                color: 'from-glitch-magenta to-glitch-cyan',
                size: 'col-span-3 row-span-1',
                link: '/contact'
              }
            ].map((dept, i) => (
              <motion.div
                key={dept.name}
                className={`relative group cursor-pointer ${dept.size}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredSection(dept.name)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <Link href={dept.link}>
                  <div className="h-full min-h-[200px] relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${dept.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

                    <div className="relative h-full p-8 border border-thread-black/20 group-hover:border-thread-black/40 transition-all duration-300">
                      <div className="absolute inset-0 exposed-seam opacity-0 group-hover:opacity-100 transition-opacity" />

                      <h3 className="text-3xl font-bold mb-2">
                        {dept.name}
                      </h3>
                      <p className="text-sm opacity-60">
                        {dept.desc}
                      </p>

                      {/* Hover indicator */}
                      <motion.div
                        className="absolute bottom-4 right-4 text-4xl font-black opacity-0 group-hover:opacity-30"
                        animate={hoveredSection === dept.name ? {
                          x: [0, 10, 0],
                        } : {}}
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
         PHILOSOPHY SECTION - Deconstructed Text Layout
         ========================================================================== */}

      <ParallaxContainer offset={100}>
        <section className="py-32 px-8 bg-thread-black text-raw-white relative overflow-hidden">
          {/* Texture overlay */}
          <div className="absolute inset-0 texture-paper opacity-10" />

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {/* Header */}
              <div className="mb-16">
                <span className="text-xs font-mono text-thread-red tracking-widest">
                  MANIFESTO / 宣言 / 선언문
                </span>
                <h2 className="text-6xl font-black mt-4">
                  Fashion Without
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-glitch-cyan to-glitch-magenta">
                    Commerce
                  </span>
                </h2>
              </div>

              {/* Philosophy Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <p className="text-2xl font-light leading-relaxed">
                    We operate at the intersection of
                    <span className="font-semibold text-glitch-cyan"> destruction </span>
                    and
                    <span className="font-semibold text-glitch-magenta"> creation</span>,
                    where garments exist in perpetual transformation.
                  </p>
                  <div className="stitching py-4">
                    <p className="text-sm opacity-70 font-mono">
                      Inspired by Margiela's deconstruction and Sacai's hybrid philosophy
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { label: 'PROCESS', text: 'Every stitch is a decision' },
                    { label: 'PURPOSE', text: 'No sales. Only experimentation' },
                    { label: 'PHILOSOPHY', text: 'The space between what is and what could be' }
                  ].map((item, i) => (
                    <RevealOnScroll key={i}>
                      <div className="border-l-2 border-glitch-cyan/30 pl-6 raw-edge">
                        <p className="text-xs font-mono uppercase tracking-wider mb-2 text-glitch-cyan">
                          {item.label}
                        </p>
                        <p className="opacity-80">{item.text}</p>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </ParallaxContainer>

      {/* ==========================================================================
         RECENT EXPERIMENTS - Masonry Gallery with Interactions
         ========================================================================== */}

      <section className="py-32 px-8 bg-gradient-to-b from-unbleached to-raw-white">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <span className="text-xs font-mono text-thread-red tracking-widest">
                RECENT / 最近 / 최근
              </span>
              <h2 className="text-5xl font-black mt-4">
                Latest Experiments
              </h2>
            </div>
          </RevealOnScroll>

          {/* Masonry Grid with different sizes */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] gap-4">
            {[
              { span: 'col-span-1 row-span-2', gradient: 'from-thread-red/20 to-thread-blue/20' },
              { span: 'col-span-1 row-span-1', gradient: 'from-safety-orange/20 to-warning-yellow/20' },
              { span: 'col-span-2 row-span-1', gradient: 'from-centrifuge-blue/20 to-hazmat-green/20' },
              { span: 'col-span-1 row-span-1', gradient: 'from-glitch-magenta/20 to-glitch-cyan/20' },
              { span: 'col-span-1 row-span-2', gradient: 'from-aged-leather/20 to-oxidized-metal/20' },
              { span: 'col-span-1 row-span-1', gradient: 'from-denim-blue/20 to-thread-black/20' },
              { span: 'col-span-1 row-span-1', gradient: 'from-warning-yellow/20 to-thread-red/20' },
              { span: 'col-span-2 row-span-2', gradient: 'from-glitch-cyan/20 to-safety-orange/20' },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`${item.span} relative group cursor-pointer overflow-hidden`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`h-full bg-gradient-to-br ${item.gradient} relative pattern-piece`}>
                  <div className="absolute inset-0 bg-texture-raw-canvas opacity-20" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-thread-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-xs font-mono text-raw-white mb-1">
                      EXP_{String(i + 1).padStart(3, '0')}
                    </p>
                    <p className="text-sm text-raw-white/80">
                      {i % 3 === 0 ? 'Volume Study' : i % 2 === 0 ? 'Pattern Deconstruction' : 'Material Research'}
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
         CONTACT CTA - Interactive
         ========================================================================== */}

      <section className="py-24 px-8 border-t border-thread-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <RevealOnScroll>
            <h2 className="text-4xl font-bold mb-6">
              Collaboration & Exhibition
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-thread-red to-thread-blue">
                Inquiries
              </span>
            </h2>
            <p className="text-lg font-light opacity-70 mb-12 max-w-2xl mx-auto">
              We collaborate with institutions, galleries, and brands on experimental projects
              that push the boundaries of what fashion can be.
            </p>

            <MagneticButton strength={0.2}>
              <Link href="/contact">
                <button className="btn-deconstructed">
                  <span className="text-xs font-mono uppercase tracking-widest">
                    Start Conversation
                  </span>
                </button>
              </Link>
            </MagneticButton>
          </RevealOnScroll>
        </div>
      </section>

      {/* ==========================================================================
         FOOTER - Minimalist Information
         ========================================================================== */}

      <footer className="py-16 px-8 bg-thread-black text-raw-white relative">
        <div className="absolute inset-0 texture-overlay opacity-5" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {/* Brand */}
            <div>
              <h3 className="text-xs font-mono tracking-widest mb-4 text-thread-red">
                CINCH LAB
              </h3>
              <p className="text-xs opacity-60 leading-relaxed">
                Experimental Fashion
                <br />
                Research Laboratory
                <br />
                Est. 2024
              </p>
            </div>

            {/* Locations */}
            <div>
              <h3 className="text-xs font-mono tracking-widest mb-4">
                LOCATIONS
              </h3>
              <p className="text-xs opacity-60 leading-relaxed">
                Tokyo Research
                <br />
                Paris Archive
                <br />
                Seoul Studio
              </p>
            </div>

            {/* Status */}
            <div>
              <h3 className="text-xs font-mono tracking-widest mb-4">
                STATUS
              </h3>
              <p className="text-xs opacity-60 leading-relaxed">
                Lab: OPERATIONAL
                <br />
                Commerce: DISABLED
                <br />
                Research: ACTIVE
              </p>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-xs font-mono tracking-widest mb-4">
                CONNECT
              </h3>
              <div className="space-y-2">
                {['Instagram', 'Archive', 'Newsletter'].map((link, i) => (
                  <a
                    key={i}
                    href="#"
                    className="block text-xs opacity-60 hover:opacity-100 hover:text-thread-red transition-all"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom line */}
          <div className="pt-8 border-t border-raw-white/10">
            <p className="text-xs font-mono opacity-40 text-center">
              © 2024 CINCH LAB. All experiments documented. No rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}