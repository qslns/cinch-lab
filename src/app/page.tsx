'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'
import {
  DeconstructedHover,
  SacaiLayer,
  FragmentMosaic,
  ExposedStructure,
  AsymmetricTransform
} from '@/components/HybridLayerEffects'

// ==========================================================================
// CINCH LAB HOME - Margiela × Sacai Philosophy
// NO SALES • ONLY CREATION
// ==========================================================================

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // State management for experimental elements
  const [phase, setPhase] = useState<'CINCH' | 'RELEASE' | 'REPEAT'>('CINCH')
  const [deconstructMode, setDeconstructMode] = useState(false)
  const [currentLine, setCurrentLine] = useState('0')

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 150 }
  const xSpring = useSpring(mouseX, springConfig)
  const ySpring = useSpring(mouseY, springConfig)

  // Parallax transforms
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const scaleParallax = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.02, 1])
  const rotateParallax = useTransform(scrollYProgress, [0, 1], [0, 1])

  // Phase cycling effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(prev => {
        if (prev === 'CINCH') return 'RELEASE'
        if (prev === 'RELEASE') return 'REPEAT'
        return 'CINCH'
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Random deconstruction
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        setDeconstructMode(true)
        setTimeout(() => setDeconstructMode(false), 500)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div ref={containerRef} className="min-h-screen bg-white-0 text-black-100 overflow-hidden">

      {/* ==========================================================================
         HERO SECTION - SLOGAN FOCUSED
         ========================================================================== */}

      <section className="min-h-screen relative flex items-center justify-center">
        {/* Background Layers */}
        <div className="fixed inset-0">
          <div className="absolute inset-0 texture-muslin opacity-[0.02]" />
          <div className="absolute inset-0 texture-canvas opacity-[0.01]" />
        </div>

        {/* Exposed Grid Structure */}
        <motion.div
          className="fixed inset-0 pointer-events-none"
          style={{ opacity: deconstructMode ? 0.1 : 0.02 }}
        >
          {/* Construction Grid */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px bg-gray-plaster"
              style={{ left: `${i * 10}%` }}
              animate={{ opacity: deconstructMode ? 0.2 : 0.05 }}
              transition={{ delay: i * 0.02 }}
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px bg-gray-plaster"
              style={{ top: `${i * 10}%` }}
              animate={{ opacity: deconstructMode ? 0.2 : 0.05 }}
              transition={{ delay: i * 0.02 }}
            />
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          className="relative z-10 text-center px-8"
          style={{
            y: yParallax,
            scale: scaleParallax,
            x: useTransform(xSpring, x => (x - 0.5) * 20),
            rotateY: useTransform(xSpring, x => (x - 0.5) * 5),
          }}
        >
          {/* Pattern Mark */}
          <motion.div
            className="text-micro font-mono text-hybrid-red opacity-40 mb-8"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            PATTERN № 001 — EXPERIMENTAL LABORATORY
          </motion.div>

          {/* Main Slogan - Deconstructed Typography */}
          <ExposedStructure showGrid={deconstructMode} className="inline-block">
            <motion.h1
              className="text-[clamp(60px,10vw,180px)] font-black leading-[0.85] tracking-tightest uppercase"
              animate={{
                rotateX: deconstructMode ? [0, 1, -1, 0] : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              {/* CINCH */}
              <motion.div
                className="relative"
                animate={{
                  x: phase === 'CINCH' ? 0 : phase === 'RELEASE' ? -10 : 10,
                  opacity: phase === 'CINCH' ? 1 : 0.3,
                }}
                transition={{ duration: 0.8 }}
              >
                <SacaiLayer layers={2} color1="hybrid-blue" color2="hybrid-red">
                  <span className="block">CINCH</span>
                </SacaiLayer>
              </motion.div>

              {/* Separator */}
              <motion.div
                className="text-[clamp(20px,3vw,40px)] my-2 opacity-40"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                •
              </motion.div>

              {/* RELEASE */}
              <motion.div
                className="relative"
                animate={{
                  x: phase === 'RELEASE' ? 0 : phase === 'REPEAT' ? -10 : 10,
                  opacity: phase === 'RELEASE' ? 1 : 0.3,
                }}
                transition={{ duration: 0.8 }}
              >
                <DeconstructedHover intensity={1.5}>
                  <span className="block">RELEASE</span>
                </DeconstructedHover>
              </motion.div>

              {/* Separator */}
              <motion.div
                className="text-[clamp(20px,3vw,40px)] my-2 opacity-40"
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                •
              </motion.div>

              {/* REPEAT */}
              <motion.div
                className="relative"
                animate={{
                  x: phase === 'REPEAT' ? 0 : phase === 'CINCH' ? -10 : 10,
                  opacity: phase === 'REPEAT' ? 1 : 0.3,
                }}
                transition={{ duration: 0.8 }}
              >
                <AsymmetricTransform intensity={0.5}>
                  <span className="block">REPEAT</span>
                </AsymmetricTransform>
              </motion.div>
            </motion.h1>
          </ExposedStructure>

          {/* Laboratory Subtitle */}
          <motion.div
            className="mt-12 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-sm font-mono tracking-widest text-gray-steel mb-2">
              LINE_0 / ARTISANAL
            </div>
            <h2 className="text-2xl font-black tracking-wider">
              CINCH LABORATORY
            </h2>
            <div className="text-xs font-mono mt-2 opacity-60">
              EXPERIMENTAL FASHION RESEARCH FACILITY
            </div>
          </motion.div>

          {/* Philosophy Statement */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-sm leading-relaxed tracking-wide">
              NO SALES • ONLY CREATION
            </p>
            <p className="text-xs font-mono mt-4 opacity-60">
              판매하지 않습니다. 창조합니다.
            </p>
          </motion.div>

          {/* Phase Indicator */}
          <motion.div
            className="mt-16 flex items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {['CINCH', 'RELEASE', 'REPEAT'].map((p) => (
              <motion.div
                key={p}
                className="relative"
                animate={{
                  scale: phase === p ? 1.2 : 1,
                  opacity: phase === p ? 1 : 0.3,
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-2 h-2 bg-black-100 rounded-full" />
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-micro font-mono whitespace-nowrap">
                  {p === phase && p}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-micro font-mono text-gray-steel">
            EXPLORE ↓
          </div>
        </motion.div>
      </section>

      {/* ==========================================================================
         LABORATORY SECTIONS - Asymmetric Grid
         ========================================================================== */}

      <section className="py-24 px-8 relative bg-white-1">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-micro font-mono text-hybrid-red opacity-40 mb-4">
              SECTION_01 / NAVIGATION
            </div>
            <h2 className="text-4xl font-black tracking-tighter mb-4">
              LABORATORY DEPARTMENTS
            </h2>
            <p className="text-sm text-gray-steel max-w-xl">
              각 부서는 독립적인 실험 공간입니다. 판매 목적이 아닌 순수한 창작과 연구를 위한 구역입니다.
            </p>
          </motion.div>
        </div>

        {/* Grid Layout - Margiela Inspired */}
        <div className="max-w-7xl mx-auto grid grid-margiela gap-4">

          {/* LAB - Line 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="col-span-2"
          >
            <Link href="/lab">
              <DeconstructedHover className="block h-full" intensity={1.2}>
                <div className="bg-white-0 border border-gray-plaster p-8 h-full relative group">
                  {/* Pattern Mark */}
                  <div className="absolute top-2 right-2 text-micro font-mono text-hybrid-red opacity-30">
                    LINE_1
                  </div>

                  <h3 className="text-2xl font-black mb-4 group-hover:text-deconstructed transition-all">
                    LAB
                  </h3>
                  <p className="text-xs leading-relaxed opacity-60 mb-4">
                    실험적 기술과 프로세스. 해체와 재구성의 작업장.
                    패턴 제작, 소재 연구, 구조 실험.
                  </p>
                  <div className="text-micro font-mono">
                    EXPERIMENTS_ACTIVE
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-hybrid-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </DeconstructedHover>
            </Link>
          </motion.div>

          {/* COLLECTIONS - Line 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Link href="/collections">
              <SacaiLayer className="block h-full" layers={3}>
                <div className="bg-white-0 border border-gray-plaster p-8 h-full relative group">
                  <div className="absolute top-2 right-2 text-micro font-mono text-hybrid-blue opacity-30">
                    LINE_3
                  </div>

                  <h3 className="text-2xl font-black mb-4">
                    COLLECTIONS
                  </h3>
                  <p className="text-xs leading-relaxed opacity-60 mb-4">
                    시각적 기록. 가격 없는 비전.
                    전시를 위한 문서화.
                  </p>
                  <div className="text-micro font-mono">
                    LOOKBOOKS_AVAILABLE
                  </div>
                </div>
              </SacaiLayer>
            </Link>
          </motion.div>

          {/* ARCHIVE - Line 10 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-span-2"
          >
            <Link href="/archive">
              <ExposedStructure showMeasurements={false} className="block h-full">
                <div className="bg-white-0 border border-gray-plaster p-8 h-full relative group">
                  <div className="absolute top-2 right-2 text-micro font-mono text-gray-steel opacity-30">
                    LINE_10
                  </div>

                  <h3 className="text-2xl font-black mb-4">
                    ARCHIVE
                  </h3>
                  <p className="text-xs leading-relaxed opacity-60 mb-4">
                    철학과 프로세스의 기록.
                    실패와 성공의 문서화. 사고의 흔적.
                  </p>
                  <div className="text-micro font-mono">
                    THOUGHTS_DOCUMENTED
                  </div>
                </div>
              </ExposedStructure>
            </Link>
          </motion.div>

          {/* ANALYSIS - Line 11 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Link href="/analysis">
              <AsymmetricTransform className="block h-full">
                <div className="bg-white-0 border border-gray-plaster p-8 h-full relative group">
                  <div className="absolute top-2 right-2 text-micro font-mono opacity-30">
                    LINE_11
                  </div>

                  <h3 className="text-2xl font-black mb-4">
                    ANALYSIS
                  </h3>
                  <p className="text-xs leading-relaxed opacity-60 mb-4">
                    타 브랜드 해체. 기술적 분석.
                    패션계의 비평적 시각.
                  </p>
                  <div className="text-micro font-mono">
                    CRITIQUE_MODE
                  </div>
                </div>
              </AsymmetricTransform>
            </Link>
          </motion.div>

          {/* ABOUT - Line 13 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/about">
              <FragmentMosaic fragments={4} className="block h-full">
                <div className="bg-white-0 border border-gray-plaster p-8 h-full relative group">
                  <div className="absolute top-2 right-2 text-micro font-mono opacity-30">
                    LINE_13
                  </div>

                  <h3 className="text-2xl font-black mb-4">
                    ABOUT
                  </h3>
                  <p className="text-xs leading-relaxed opacity-60 mb-4">
                    정체성 선언. 창작 철학.
                    하이엔드 장인정신.
                  </p>
                  <div className="text-micro font-mono">
                    MANIFESTO_READY
                  </div>
                </div>
              </FragmentMosaic>
            </Link>
          </motion.div>

          {/* CONTACT - Line 22 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link href="/contact">
              <DeconstructedHover className="block h-full">
                <div className="bg-white-0 border border-gray-plaster p-8 h-full relative group">
                  <div className="absolute top-2 right-2 text-micro font-mono opacity-30">
                    LINE_22
                  </div>

                  <h3 className="text-2xl font-black mb-4">
                    CONTACT
                  </h3>
                  <p className="text-xs leading-relaxed opacity-60 mb-4">
                    전시 문의. 협업 제안.
                    판매 문의 불가.
                  </p>
                  <div className="text-micro font-mono">
                    COLLABORATION_ONLY
                  </div>
                </div>
              </DeconstructedHover>
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ==========================================================================
         PHILOSOPHY SECTION - Sacai Layering
         ========================================================================== */}

      <section className="py-24 px-8 bg-black-100 text-white-0 relative overflow-hidden">
        {/* Layered Background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.05) 35px, rgba(255,255,255,0.05) 70px)',
            }}
            animate={{ x: [0, 70] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Philosophy Header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-micro font-mono text-hybrid-yellow opacity-60 mb-4">
              PHILOSOPHY / 철학
            </div>
            <h2 className="text-[clamp(40px,6vw,80px)] font-black leading-[0.9] mb-8">
              <SacaiLayer layers={2} color1="hybrid-yellow" color2="white-4">
                <span>FASHION WITHOUT</span>
                <br />
                <span className="text-gray-plaster">COMMERCE</span>
              </SacaiLayer>
            </h2>
          </motion.div>

          {/* Philosophy Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-sm leading-loose">
              우리는 판매하지 않습니다. 우리는 창조합니다.
              <br />
              전시 이후, 문서화 이후, 어쩌면 한 작품이 주인을 찾습니다.
              <br />
              장바구니를 통해서가 아니라, 이해를 통해서.
            </p>
            <p className="text-xs font-mono opacity-60">
              We don't sell. We create.
              <br />
              After exhibitions, after documentation, maybe one piece finds an owner.
              <br />
              Not through carts, through understanding.
            </p>
            <p className="text-sm leading-loose font-bold">
              이것은 상점이 아닙니다. 이것은 실험실입니다.
              <br />
              This is not a store. This is a laboratory.
            </p>
          </motion.div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-gray-steel"
          >
            <div className="text-micro font-mono opacity-40">
              CINCH LABORATORY © 2025
            </div>
            <div className="text-micro font-mono opacity-40 mt-1">
              EXPERIMENTAL FASHION RESEARCH FACILITY
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
         BOTTOM STATUS BAR - Laboratory Monitoring
         ========================================================================== */}

      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-white-0/90 backdrop-blur-sm border-t border-gray-plaster p-4 z-50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Status */}
          <div className="flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full ${deconstructMode ? 'bg-hybrid-red' : 'bg-hybrid-blue'} animate-pulse`} />
            <span className="text-micro font-mono text-gray-steel">
              {deconstructMode ? 'DECONSTRUCTING' : 'OPERATIONAL'}
            </span>
          </div>

          {/* Current Phase */}
          <div className="text-micro font-mono">
            CURRENT_PHASE: {phase}
          </div>

          {/* No Sales Reminder */}
          <div className="flex items-center gap-4 text-micro font-mono text-gray-steel">
            <span>NO_PRODUCTS</span>
            <span>NO_PRICES</span>
            <span className="text-black-100 font-bold">ONLY_CREATION</span>
          </div>
        </div>
      </motion.div>

    </div>
  )
}