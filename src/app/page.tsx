'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import {
  DeconstructedText,
  LayeredCard,
  ExposedSeam,
  MaterialCard,
  AsymmetricGridItem,
  EditorialSection,
  RawEdgeButton,
  ConstructionMarker
} from '@/components/MargielaSacaiComponents'

// ==========================================================================
// CINCH LAB HOME - Avant-Garde Fashion Laboratory
// Margiela × Sacai Philosophy - Deconstructive Asymmetry
// ==========================================================================

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const xSpring = useSpring(mouseX, springConfig)
  const ySpring = useSpring(mouseY, springConfig)

  // Parallax transforms
  const heroParallax = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const rotateProgress = useTransform(scrollYProgress, [0, 1], [0, 5])

  // Current time for laboratory status
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeExperiment, setActiveExperiment] = useState('PATTERN_DECONSTRUCTION')
  const [hoveredDepartment, setHoveredDepartment] = useState<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const experimentTimer = setInterval(() => {
      const experiments = [
        'PATTERN_DECONSTRUCTION',
        'FABRIC_MANIPULATION',
        'HYBRID_LAYERING',
        'VOLUME_STUDIES',
        'MATERIAL_RESEARCH',
        'COLOR_EXTRACTION'
      ]
      setActiveExperiment(experiments[Math.floor(Math.random() * experiments.length)])
    }, 5000)

    return () => {
      clearInterval(timer)
      clearInterval(experimentTimer)
    }
  }, [])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 20)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 20)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const departmentColors = {
    LAB: 'var(--accent-electric)',
    COLLECTIONS: 'var(--accent-violet)',
    ARCHIVE: 'var(--accent-amber)',
    ANALYSIS: 'var(--accent-teal)',
    ABOUT: 'var(--accent-rose)',
    CONTACT: 'var(--accent-lime)'
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-off-white via-ivory to-bone text-carbon overflow-hidden">

      {/* ==========================================================================
         HERO SECTION - Asymmetric Editorial Opening
         ========================================================================== */}

      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Dynamic Background Layers */}
        <motion.div
          className="absolute inset-0"
          style={{
            x: xSpring,
            y: ySpring,
          }}
        >
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-96 h-96 bg-accent-electric rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent-violet rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-coral rounded-full blur-3xl animate-breathe" />
          </div>
        </motion.div>

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(0,51,255,0.03) 1px, transparent 1px),
                linear-gradient(180deg, rgba(0,51,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>

        {/* Main Content */}
        <motion.div
          className="relative z-10 container max-w-7xl mx-auto px-8 py-24"
          style={{
            y: heroParallax,
            scale: scaleProgress,
            rotate: rotateProgress
          }}
        >
          {/* Laboratory Status Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center justify-between text-2xs font-mono text-steel">
              <div className="flex items-center gap-6">
                <span className="hover-glitch cursor-pointer">LAB_STATUS: OPERATIONAL</span>
                <span className="w-2 h-2 bg-gradient-to-r from-accent-electric to-accent-lime rounded-full animate-pulse" />
                <span>{currentTime.toLocaleTimeString('en-US', { hour12: false })}</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="hover-text-split" data-text={`EXPERIMENT: ${activeExperiment}`}>
                  EXPERIMENT: {activeExperiment}
                </span>
                <span className="opacity-50">TOKYO / PARIS / SEOUL</span>
              </div>
            </div>
          </motion.div>

          {/* Main Typography - Asymmetric Layout */}
          <div className="grid grid-cols-12 gap-6">
            <motion.div
              className="col-span-12 lg:col-span-7 lg:col-start-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Slogan - Deconstructed Typography */}
              <h1 className="text-hero font-black leading-none tracking-compressed mb-8">
                <motion.span
                  className="block hover-layer cursor-default"
                  initial={{ x: -100, opacity: 0, rotate: -2 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{ color: 'var(--carbon)' }}
                >
                  CINCH
                </motion.span>
                <motion.span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-electric to-accent-violet hover-deconstruct cursor-default"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 50, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  style={{ marginLeft: '10%' }}
                >
                  RELEASE
                </motion.span>
                <motion.span
                  className="block hover-asymmetric cursor-default"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: -30, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  style={{ color: 'var(--accent-coral)' }}
                >
                  REPEAT
                </motion.span>
              </h1>

              {/* Description - Editorial Typography */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-4 max-w-2xl"
              >
                <p className="text-lg leading-relaxed font-light">
                  Experimental fashion laboratory exploring the space between
                  <span className="font-semibold text-accent-electric"> destruction </span>
                  and
                  <span className="font-semibold text-accent-violet"> creation</span>.
                  Where traditional garment construction meets radical deconstruction.
                </p>
                <p className="text-body text-steel opacity-70">
                  実験的ファッション研究所 • 해체주의 패션 실험실
                  <br />
                  No products. No sales. Only experiments.
                </p>
              </motion.div>

              {/* CTA Buttons - Interactive */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex gap-4 mt-12"
              >
                <button
                  className="btn-interactive px-8 py-4 border-2 border-carbon hover-brutal"
                  onClick={() => document.getElementById('experiments')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="text-xs uppercase tracking-widest font-medium">
                    Enter Laboratory
                  </span>
                </button>
                <Link href="/archive">
                  <button className="px-8 py-4 border border-steel/30 hover:bg-carbon hover:text-off-white transition-all duration-300">
                    <span className="text-xs uppercase tracking-widest">
                      View Archive
                    </span>
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Side Information - Floating Card */}
            <motion.div
              className="col-span-12 lg:col-span-4 lg:col-start-9"
              initial={{ opacity: 0, x: 20, rotate: 2 }}
              animate={{ opacity: 1, x: 0, rotate: -1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative hover-layer">
                <MaterialCard material="glass" className="p-8 backdrop-blur-sm bg-white/50 border border-carbon/10">
                  <h3 className="text-label mb-4 text-accent-electric">CURRENT RESEARCH</h3>
                  <ul className="space-y-3 text-sm">
                    {[
                      { label: '01', text: 'Deconstructive pattern making via algorithmic design', color: 'var(--accent-electric)' },
                      { label: '02', text: 'Hybrid garment splicing: East meets West', color: 'var(--accent-violet)' },
                      { label: '03', text: 'Bio-material cultivation & textile futures', color: 'var(--accent-teal)' }
                    ].map((item) => (
                      <li key={item.label} className="flex items-start gap-3 hover-fabric cursor-pointer group">
                        <span className="font-mono text-xs" style={{ color: item.color }}>{item.label}</span>
                        <span className="group-hover:translate-x-1 transition-transform">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </MaterialCard>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-carbon to-transparent" />
          <span className="text-2xs font-mono text-steel tracking-widest uppercase">
            Explore
          </span>
        </motion.div>
      </section>

      {/* ==========================================================================
         EXPERIMENTS SECTION - Asymmetric Grid Layout
         ========================================================================== */}

      <section id="experiments" className="py-32 px-8 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, var(--accent-electric) 35px, var(--accent-electric) 70px)`
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-2xs font-mono text-accent-electric tracking-widest">
              DEPARTMENTS / 部門 / 부서
            </span>
            <h2 className="text-6xl font-black mt-4 mb-6">
              Laboratory
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-violet to-accent-coral"> Departments</span>
            </h2>
            <p className="text-lg text-steel max-w-3xl">
              Each department operates as an autonomous research unit,
              pushing boundaries through experimental methodologies and radical approaches.
            </p>
          </motion.div>

          {/* Asymmetric Department Grid */}
          <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
            {/* LAB Department - Large */}
            <motion.div
              className="col-span-12 md:col-span-5 row-span-2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredDepartment('LAB')}
              onMouseLeave={() => setHoveredDepartment(null)}
            >
              <Link href="/lab">
                <div className="h-full relative group hover-deconstruct cursor-pointer">
                  <div className="h-full p-8 bg-gradient-to-br from-carbon to-anthracite text-off-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-electric/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <h3 className="text-4xl font-bold mb-2">LAB</h3>
                      <span className="text-xs font-mono opacity-60">LINE_01 / RESEARCH</span>
                    </div>
                    <div className="relative z-10">
                      <p className="text-sm opacity-80 mb-4">
                        Pattern experiments. Material research. Construction techniques.
                        Where garments are deconstructed and reborn.
                      </p>
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="w-2 h-2 bg-accent-electric rounded-full animate-pulse" />
                        <span>EXPERIMENTS ACTIVE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* COLLECTIONS Department */}
            <motion.div
              className="col-span-12 md:col-span-7 row-span-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              onMouseEnter={() => setHoveredDepartment('COLLECTIONS')}
              onMouseLeave={() => setHoveredDepartment(null)}
            >
              <Link href="/collections">
                <div className="h-full relative group hover-layer cursor-pointer">
                  <div className="h-full p-8 bg-gradient-to-br from-accent-violet/10 to-accent-violet/5 border-2 border-accent-violet/30 flex items-center justify-between overflow-hidden">
                    <div>
                      <h3 className="text-3xl font-bold text-accent-violet mb-1">COLLECTIONS</h3>
                      <p className="text-sm text-steel">Seasonal documentation. Visual archives.</p>
                    </div>
                    <span className="text-5xl font-black opacity-10 group-hover:opacity-30 transition-opacity">→</span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* ARCHIVE Department */}
            <motion.div
              className="col-span-12 md:col-span-4 row-span-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              onMouseEnter={() => setHoveredDepartment('ARCHIVE')}
              onMouseLeave={() => setHoveredDepartment(null)}
            >
              <Link href="/archive">
                <div className="h-full relative group hover-asymmetric cursor-pointer">
                  <div className="h-full p-6 bg-gradient-to-br from-accent-amber/10 to-accent-ochre/10 border border-accent-amber/30 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-accent-ochre mb-2">ARCHIVE</h3>
                    <p className="text-xs text-steel">Process documentation. The beauty of failure.</p>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* ANALYSIS Department */}
            <motion.div
              className="col-span-12 md:col-span-3 row-span-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/analysis">
                <div className="h-full relative group hover-brutal cursor-pointer">
                  <div className="h-full p-6 bg-accent-teal/5 border-2 border-accent-teal/30 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-accent-teal">ANALYSIS</h3>
                    <p className="text-xs text-steel mt-1">Technical critique.</p>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* ABOUT & CONTACT - Split Cell */}
            <motion.div
              className="col-span-12 md:col-span-5 row-span-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="h-full grid grid-cols-2 gap-4">
                <Link href="/about">
                  <div className="h-full relative group hover-fabric cursor-pointer">
                    <div className="h-full p-6 bg-gradient-to-br from-accent-rose/10 to-accent-rose/5 border border-accent-rose/30 flex flex-col justify-center">
                      <h3 className="text-lg font-bold text-accent-rose">ABOUT</h3>
                      <p className="text-xs text-steel mt-1">Philosophy.</p>
                    </div>
                  </div>
                </Link>
                <Link href="/contact">
                  <div className="h-full relative group hover-glitch cursor-pointer">
                    <div className="h-full p-6 bg-gradient-to-br from-accent-lime/10 to-accent-lime/5 border border-accent-lime/30 flex flex-col justify-center">
                      <h3 className="text-lg font-bold" style={{ color: 'var(--accent-lime)' }}>CONTACT</h3>
                      <p className="text-xs text-steel mt-1">Collaborate.</p>
                    </div>
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         PHILOSOPHY SECTION - Minimalist Statement
         ========================================================================== */}

      <section className="py-32 px-8 bg-gradient-to-b from-carbon to-obsidian text-off-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-electric/5 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Header */}
            <div className="mb-16">
              <span className="text-xs font-mono text-accent-electric tracking-widest">
                MANIFESTO / 宣言 / 선언문
              </span>
              <h2 className="text-6xl font-black mt-6 mb-8">
                Fashion Without
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-electric via-accent-violet to-accent-coral"> Commerce</span>
              </h2>
            </div>

            {/* Philosophy Text - Clean Typography */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-xl font-light leading-relaxed">
                  We operate at the intersection of
                  <span className="font-semibold text-accent-electric"> destruction </span>
                  and
                  <span className="font-semibold text-accent-violet"> creation</span>,
                  where garments exist in perpetual transformation.
                </p>
                <p className="text-base opacity-70">
                  Inspired by Margiela's deconstruction and Sacai's hybrid philosophy,
                  we document possibilities, not products.
                </p>
              </div>

              <div className="space-y-6">
                <div className="border-l-2 border-accent-electric/30 pl-6">
                  <p className="text-sm font-mono uppercase tracking-wider mb-2">Process</p>
                  <p className="opacity-70">Every stitch is a decision. Every cut is philosophy.</p>
                </div>
                <div className="border-l-2 border-accent-violet/30 pl-6">
                  <p className="text-sm font-mono uppercase tracking-wider mb-2">Purpose</p>
                  <p className="opacity-70">No sales. No seasons. Only experimentation.</p>
                </div>
                <div className="border-l-2 border-accent-coral/30 pl-6">
                  <p className="text-sm font-mono uppercase tracking-wider mb-2">Philosophy</p>
                  <p className="opacity-70">The space between what clothing is and what it could become.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
         RECENT EXPERIMENTS - Gallery Preview
         ========================================================================== */}

      <section className="py-32 px-8 bg-gradient-to-b from-ivory to-off-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <span className="text-2xs font-mono text-accent-violet tracking-widest">
              RECENT / 最近 / 최근
            </span>
            <h2 className="text-5xl font-black mt-4 mb-6">
              Latest Experiments
            </h2>
          </motion.div>

          {/* Masonry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { id: 1, span: 'col-span-1 row-span-2', color: 'from-accent-electric/20 to-accent-violet/20' },
              { id: 2, span: 'col-span-1 row-span-1', color: 'from-accent-coral/20 to-accent-rose/20' },
              { id: 3, span: 'col-span-1 row-span-1', color: 'from-accent-teal/20 to-accent-lime/20' },
              { id: 4, span: 'col-span-2 row-span-1', color: 'from-accent-violet/20 to-accent-electric/20' },
              { id: 5, span: 'col-span-1 row-span-1', color: 'from-accent-amber/20 to-accent-ochre/20' },
              { id: 6, span: 'col-span-1 row-span-2', color: 'from-accent-rose/20 to-accent-coral/20' },
              { id: 7, span: 'col-span-1 row-span-1', color: 'from-accent-lime/20 to-accent-teal/20' },
              { id: 8, span: 'col-span-1 row-span-1', color: 'from-accent-electric/20 to-accent-indigo/20' },
            ].map((item) => (
              <motion.div
                key={item.id}
                className={`${item.span} relative group cursor-pointer hover-layer`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: item.id * 0.05 }}
              >
                <div className={`h-full min-h-[200px] bg-gradient-to-br ${item.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-carbon/30" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-2xs font-mono text-off-white mb-1">
                      EXP_{String(item.id).padStart(3, '0')}
                    </p>
                    <p className="text-xs text-off-white/80">
                      {item.id % 3 === 0 ? 'Volume Study' : item.id % 2 === 0 ? 'Pattern Deconstruction' : 'Material Research'}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         CONTACT SECTION - Minimal CTA
         ========================================================================== */}

      <section className="py-24 px-8 border-t border-carbon/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Collaboration & Exhibition Inquiries
          </h2>
          <p className="text-steel mb-8 max-w-2xl mx-auto">
            We collaborate with institutions, galleries, and forward-thinking brands on experimental projects that push the boundaries of fashion.
          </p>
          <Link href="/contact">
            <button className="btn-interactive px-10 py-4 border-2 border-carbon hover-brutal">
              <span className="text-xs uppercase tracking-widest font-medium">
                Start Conversation
              </span>
            </button>
          </Link>
        </div>
      </section>

      {/* ==========================================================================
         FOOTER - Minimal Laboratory Information
         ========================================================================== */}

      <footer className="py-16 px-8 bg-carbon text-off-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-xs font-mono tracking-widest mb-4 text-accent-electric">CINCH LAB</h3>
              <p className="text-xs opacity-60">
                Experimental Fashion
                <br />
                Research Laboratory
                <br />
                Est. 2024
              </p>
            </div>

            {/* Locations */}
            <div>
              <h3 className="text-xs font-mono tracking-widest mb-4">LOCATIONS</h3>
              <p className="text-xs opacity-60">
                Tokyo Facility
                <br />
                Paris Archive
                <br />
                Seoul Studio
              </p>
            </div>

            {/* Status */}
            <div>
              <h3 className="text-xs font-mono tracking-widest mb-4">STATUS</h3>
              <p className="text-xs opacity-60">
                Lab: OPERATIONAL
                <br />
                Commerce: DISABLED
                <br />
                Research: ACTIVE
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-xs font-mono tracking-widest mb-4">CONNECT</h3>
              <div className="space-y-2">
                <a href="#" className="text-xs opacity-60 hover:opacity-100 hover:text-accent-electric transition-all block">
                  Instagram
                </a>
                <a href="#" className="text-xs opacity-60 hover:opacity-100 hover:text-accent-electric transition-all block">
                  Archive
                </a>
                <a href="#" className="text-xs opacity-60 hover:opacity-100 hover:text-accent-electric transition-all block">
                  Newsletter
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-steel/20">
            <p className="text-xs font-mono opacity-40 text-center">
              © 2024 CINCH LAB. All experiments documented. No rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}