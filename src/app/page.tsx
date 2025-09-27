'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
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
// CINCH LAB HOME - Professional Experimental Fashion Laboratory
// Margiela × Sacai Philosophy - Rich, Dense, Functional
// ==========================================================================

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
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

  // Current time for laboratory status
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeExperiment, setActiveExperiment] = useState('PATTERN_DECONSTRUCTION')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const experimentTimer = setInterval(() => {
      const experiments = [
        'PATTERN_DECONSTRUCTION',
        'FABRIC_MANIPULATION',
        'HYBRID_LAYERING',
        'VOLUME_STUDIES'
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
      mouseX.set(e.clientX / window.innerWidth - 0.5)
      mouseY.set(e.clientY / window.innerHeight - 0.5)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div ref={containerRef} className="min-h-screen bg-off-white text-carbon overflow-hidden">

      {/* ==========================================================================
         HERO SECTION - Editorial Opening
         ========================================================================== */}

      <section className="relative min-h-screen flex items-center">
        {/* Background Texture */}
        <div className="absolute inset-0 material-fabric opacity-30" />

        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(90deg, var(--accent-blood) 0.5px, transparent 0.5px),
                linear-gradient(180deg, var(--accent-blood) 0.5px, transparent 0.5px)
              `,
              backgroundSize: '100px 100px',
              opacity: 0.03
            }}
          />
        </div>

        {/* Main Content */}
        <motion.div
          className="relative z-10 container max-w-7xl mx-auto px-8 py-24"
          style={{
            y: heroParallax,
            scale: scaleProgress
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
                <span>LAB_STATUS: OPERATIONAL</span>
                <span className="w-2 h-2 bg-accent-blood rounded-full animate-pulse" />
                <span>{currentTime.toLocaleTimeString('en-US', { hour12: false })}</span>
              </div>
              <div className="flex items-center gap-6">
                <span>EXPERIMENT: {activeExperiment}</span>
                <span>TOKYO / PARIS</span>
              </div>
            </div>
          </motion.div>

          {/* Main Typography */}
          <div className="grid grid-cols-12 gap-6">
            <motion.div
              className="col-span-12 lg:col-span-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Slogan */}
              <h1 className="text-hero font-black leading-none tracking-compressed mb-8">
                <motion.span
                  className="block"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <DeconstructedText intensity={2} hover={false}>
                    CINCH
                  </DeconstructedText>
                </motion.span>
                <motion.span
                  className="block text-steel"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <DeconstructedText intensity={2} hover={false}>
                    RELEASE
                  </DeconstructedText>
                </motion.span>
                <motion.span
                  className="block"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <DeconstructedText intensity={2} hover={false}>
                    REPEAT
                  </DeconstructedText>
                </motion.span>
              </h1>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-4 max-w-2xl"
              >
                <p className="text-lg leading-relaxed">
                  Experimental fashion laboratory where commerce doesn't exist.
                  We deconstruct, layer, and reconstruct the boundaries of what clothing can be.
                </p>
                <p className="text-body text-steel">
                  每件作品都是实验的结果。没有产品，只有过程。
                  <br />
                  Each piece is a result of experimentation. No products, only process.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex gap-4 mt-12"
              >
                <RawEdgeButton
                  variant="primary"
                  size="large"
                  onClick={() => document.getElementById('experiments')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Enter Laboratory
                </RawEdgeButton>
                <RawEdgeButton
                  variant="secondary"
                  size="large"
                  onClick={() => {}}
                >
                  View Archive
                </RawEdgeButton>
              </motion.div>
            </motion.div>

            {/* Side Information */}
            <motion.div
              className="col-span-12 lg:col-span-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <ExposedSeam showMeasurements={false}>
                <MaterialCard material="paper" className="p-8">
                  <h3 className="text-label mb-4">Current Research</h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-accent-blood">01</span>
                      <span>Deconstructive pattern making inspired by Margiela's artisanal techniques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-blood">02</span>
                      <span>Hybrid garment splicing following Sacai's layering philosophy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent-blood">03</span>
                      <span>Material manipulation through heat, pressure, and chemical processes</span>
                    </li>
                  </ul>
                  <ConstructionMarker label="RESEARCH_001" position="top-right" />
                </MaterialCard>
              </ExposedSeam>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-2xs font-mono text-steel tracking-widest">
            SCROLL TO EXPLORE
          </span>
        </motion.div>
      </section>

      {/* ==========================================================================
         EXPERIMENTS SECTION - Laboratory Departments
         ========================================================================== */}

      <EditorialSection
        id="experiments"
        lineNumber="00"
        title="Laboratory Departments"
        subtitle="Experimental zones for fashion research"
        description="Each department operates as an independent research facility, focused on pushing the boundaries of garment construction and material innovation."
        className="py-24 px-8"
      >
        <div className="grid-chaos max-w-7xl mx-auto">
          {/* LAB Department */}
          <AsymmetricGridItem span={2} offset={0}>
            <Link href="/lab">
              <LayeredCard layers={3} className="h-full cursor-pointer group">
                <MaterialCard material="concrete" className="p-8 h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">LAB</h3>
                    <span className="text-2xs font-mono text-accent-blood">LINE_01</span>
                  </div>
                  <p className="text-sm text-steel mb-6">
                    Pattern experiments, material research, construction techniques.
                    Where garments are born and deconstructed.
                  </p>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="w-2 h-2 bg-accent-blood rounded-full animate-pulse" />
                    <span>EXPERIMENTS ACTIVE</span>
                  </div>
                </MaterialCard>
              </LayeredCard>
            </Link>
          </AsymmetricGridItem>

          {/* COLLECTIONS Department */}
          <AsymmetricGridItem span={3} offset={40}>
            <Link href="/collections">
              <LayeredCard layers={2} className="h-full cursor-pointer group">
                <MaterialCard material="fabric" className="p-8 h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">COLLECTIONS</h3>
                    <span className="text-2xs font-mono text-accent-ink">LINE_03</span>
                  </div>
                  <p className="text-sm text-steel mb-6">
                    Seasonal documentation of experiments.
                    Visual archives without commerce.
                  </p>
                  <div className="text-xs font-mono">
                    24 EXPERIMENTS DOCUMENTED
                  </div>
                </MaterialCard>
              </LayeredCard>
            </Link>
          </AsymmetricGridItem>

          {/* ARCHIVE Department */}
          <AsymmetricGridItem span={2} offset={-20}>
            <Link href="/archive">
              <LayeredCard layers={4} className="h-full cursor-pointer group">
                <MaterialCard material="paper" className="p-8 h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">ARCHIVE</h3>
                    <span className="text-2xs font-mono text-steel">LINE_10</span>
                  </div>
                  <p className="text-sm text-steel mb-6">
                    Process documentation. Failed experiments.
                    The beauty of imperfection.
                  </p>
                  <div className="text-xs font-mono">
                    ∞ THOUGHTS PRESERVED
                  </div>
                </MaterialCard>
              </LayeredCard>
            </Link>
          </AsymmetricGridItem>

          {/* ANALYSIS Department */}
          <AsymmetricGridItem span={2} offset={20}>
            <Link href="/analysis">
              <LayeredCard layers={2} className="h-full cursor-pointer group">
                <MaterialCard material="glass" className="p-8 h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">ANALYSIS</h3>
                    <span className="text-2xs font-mono text-accent-ochre">LINE_11</span>
                  </div>
                  <p className="text-sm text-steel mb-6">
                    Deconstructing other brands.
                    Technical critique and examination.
                  </p>
                  <div className="text-xs font-mono">
                    CRITIQUE MODE ENABLED
                  </div>
                </MaterialCard>
              </LayeredCard>
            </Link>
          </AsymmetricGridItem>

          {/* ABOUT Department */}
          <AsymmetricGridItem span={1} offset={-40}>
            <Link href="/about">
              <LayeredCard layers={2} className="h-full cursor-pointer group">
                <MaterialCard material="metal" className="p-8 h-full">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold">ABOUT</h3>
                    <span className="text-2xs font-mono text-titanium">LINE_13</span>
                  </div>
                  <p className="text-sm text-steel">
                    Philosophy and manifesto.
                  </p>
                </MaterialCard>
              </LayeredCard>
            </Link>
          </AsymmetricGridItem>
        </div>
      </EditorialSection>

      {/* ==========================================================================
         PHILOSOPHY SECTION - Brand Manifesto
         ========================================================================== */}

      <section className="py-24 px-8 bg-carbon text-off-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Header */}
            <div className="mb-12">
              <span className="text-2xs font-mono text-steel tracking-widest">
                MANIFESTO / 宣言
              </span>
              <h2 className="text-5xl font-black mt-4 mb-8">
                Fashion Without Commerce
              </h2>
            </div>

            {/* Philosophy Text */}
            <div className="space-y-8 text-lg leading-relaxed">
              <p>
                We don't sell. We create.
                In an industry obsessed with seasons and sales,
                we choose permanence through process.
              </p>

              <p className="text-steel">
                Every stitch is a decision. Every cut is a philosophy.
                We document not products, but possibilities—
                the space between what clothing is and what it could become.
              </p>

              <p>
                Inspired by Margiela's deconstruction and Sacai's hybridization,
                we operate at the intersection of destruction and creation,
                where garments exist in perpetual transformation.
              </p>

              <div className="pt-8 border-t border-steel/20">
                <p className="text-sm font-mono">
                  NO SALES • NO SIZES • NO SEASONS
                  <br />
                  ONLY EXPERIMENTATION
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
         RECENT EXPERIMENTS - Gallery Preview
         ========================================================================== */}

      <EditorialSection
        lineNumber="22"
        title="Recent Experiments"
        subtitle="Latest research from the laboratory"
        className="py-24 px-8 bg-ivory"
      >
        <div className="grid grid-sacai max-w-7xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <MaterialCard material={i % 2 === 0 ? 'fabric' : 'paper'} className="aspect-[3/4] relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-carbon/50" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-2xs font-mono text-off-white mb-1">
                    EXP_{String(i).padStart(3, '0')}
                  </p>
                  <p className="text-sm text-off-white">
                    {i % 3 === 0 ? 'Volume Study' : i % 2 === 0 ? 'Pattern Deconstruction' : 'Material Experiment'}
                  </p>
                </div>
                <ConstructionMarker label={`TEST_${i}`} position="top-left" />
              </MaterialCard>
            </motion.div>
          ))}
        </div>
      </EditorialSection>

      {/* ==========================================================================
         CONTACT SECTION - Collaboration Only
         ========================================================================== */}

      <section className="py-24 px-8 bg-off-white border-t border-carbon/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Collaboration Inquiries Only
          </h2>
          <p className="text-steel mb-8">
            We don't sell. We collaborate on exhibitions, research, and experimental projects.
          </p>
          <Link href="/contact">
            <RawEdgeButton variant="primary" size="large">
              Propose Collaboration
            </RawEdgeButton>
          </Link>
        </div>
      </section>

      {/* ==========================================================================
         FOOTER - Laboratory Information
         ========================================================================== */}

      <footer className="py-12 px-8 bg-carbon text-off-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-label mb-4">CINCH LABORATORY</h3>
              <p className="text-xs text-steel">
                Experimental Fashion Research
                <br />
                Est. 2024
              </p>
            </div>

            {/* Locations */}
            <div>
              <h3 className="text-label mb-4">LOCATIONS</h3>
              <p className="text-xs text-steel">
                Tokyo Research Facility
                <br />
                Paris Archive Center
              </p>
            </div>

            {/* Status */}
            <div>
              <h3 className="text-label mb-4">STATUS</h3>
              <p className="text-xs text-steel">
                Laboratory: OPERATIONAL
                <br />
                Commerce: DISABLED
              </p>
            </div>

            {/* Copyright */}
            <div>
              <h3 className="text-label mb-4">© 2024</h3>
              <p className="text-xs text-steel">
                All experiments documented.
                <br />
                No rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}