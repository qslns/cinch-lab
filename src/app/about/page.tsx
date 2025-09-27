'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  MagneticButton,
  RippleEffect,
  DistortionText,
  ParallaxContainer,
  RevealOnScroll,
  SplitText,
  Card3D,
  NoiseBackground,
  MorphingShape
} from '@/components/InteractiveElements'

// ==========================================================================
// ABOUT PAGE - Philosophical Narrative
// Margiela × Sacai Identity Statement
// ==========================================================================

interface Philosophy {
  id: string
  title: string
  description: string
  icon: string
}

const philosophies: Philosophy[] = [
  {
    id: 'deconstruction',
    title: 'DECONSTRUCTION',
    description: 'Every garment begins whole, then is methodically taken apart. We expose seams, reveal structure, celebrate the internal architecture of clothing. The process is the product.',
    icon: '解体'
  },
  {
    id: 'hybridization',
    title: 'HYBRIDIZATION',
    description: 'Two become one. Three become one. Multiple garments fuse into singular forms that defy categorization. We create new identities from existing ones.',
    icon: '融合'
  },
  {
    id: 'experimentation',
    title: 'EXPERIMENTATION',
    description: 'Failure is data. Success is temporary. Every experiment teaches us something new about form, function, and the limits of fabric. We document everything.',
    icon: '実験'
  },
  {
    id: 'anonymity',
    title: 'ANONYMITY',
    description: 'The designer disappears. We are not authors but translators, converting abstract ideas into wearable philosophy. The ego dissolves into the garment.',
    icon: '無名'
  }
]

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activePhilosophy, setActivePhilosophy] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-rotate philosophies
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhilosophy((prev) => (prev + 1) % philosophies.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.9, 0.7, 0.5])
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 0.95])

  return (
    <div ref={containerRef} className="min-h-screen bg-raw-white relative overflow-hidden">

      <NoiseBackground opacity={0.02} />

      {/* Dynamic Background Elements */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ y: parallaxY }}
      >
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-96 h-96 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)',
              left: mousePosition.x - 192,
              top: mousePosition.y - 192,
              filter: 'blur(60px)'
            }}
          />
        </div>
      </motion.div>

      {/* ==========================================================================
         HERO - Manifesto
         ========================================================================== */}

      <section className="relative min-h-screen flex items-center px-8 py-32">
        {/* Deconstructed Grid */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, #000 0px, transparent 1px, transparent 80px, #000 81px),
                repeating-linear-gradient(90deg, #000 0px, transparent 1px, transparent 80px, #000 81px)
              `,
              transform: 'perspective(1000px) rotateX(60deg) translateZ(-100px)'
            }}
          />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: 'linear'
              }}
            >
              <MorphingShape size={60 + i * 20} />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            style={{ opacity: textOpacity }}
          >
            {/* Status */}
            <motion.div
              className="mb-8 font-mono text-xs text-carbon/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-thread-red">●</span>
              <span className="ml-2">MANIFESTO_v3.0</span>
              <span className="ml-4">|</span>
              <span className="ml-4">NO_COMMERCE_PHILOSOPHY</span>
            </motion.div>

            {/* Main Statement */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-12 leading-none">
              <DistortionText text="WE ARE NOT" className="block" />
              <motion.span
                className="text-thread-red block"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                A BRAND
              </motion.span>
            </h1>

            {/* Philosophy Grid */}
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-xl leading-relaxed">
                  CINCH LAB exists in the liminal space between destruction and creation.
                  We are an experimental fashion laboratory where commerce is irrelevant,
                  where sales don't exist, where every piece is a philosophical statement.
                </p>
                <p className="text-lg text-carbon/70">
                  Inspired by Margiela's anonymity and Sacai's hybrid constructions,
                  we operate beyond commercial constraints. Our work is not for sale—it
                  is for study, contemplation, and pushing the boundaries of what garments can be.
                </p>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="p-6 bg-carbon/5 border-l-4 border-thread-red">
                  <p className="text-sm italic mb-2">
                    "解構不是破壞，而是理解的開始"
                  </p>
                  <p className="text-xs text-carbon/60">
                    Deconstruction is not destruction, but the beginning of understanding
                  </p>
                </div>
                <div className="p-6 bg-carbon/5 border-l-4 border-thread-white">
                  <p className="text-sm italic mb-2">
                    "重建不是修復，而是重新想像"
                  </p>
                  <p className="text-xs text-carbon/60">
                    Reconstruction is not repair, but reimagination
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================================================
         CORE PHILOSOPHIES - Interactive Cards
         ========================================================================== */}

      <section className="py-24 px-8 relative">
        <div className="absolute inset-0 material-paper opacity-20" />
        <div className="absolute inset-0 exposed-seam" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.h2
            className="text-5xl font-black mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SplitText text="CORE PHILOSOPHIES" delay={0.03} />
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {philosophies.map((philosophy, index) => (
              <RevealOnScroll key={philosophy.id}>
                <motion.div
                  whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                  onClick={() => setActivePhilosophy(index)}
                  className={`cursor-pointer ${activePhilosophy === index ? 'z-10' : ''}`}
                >
                  <Card3D>
                    <div className={`
                      layer-card p-6 h-full transition-all
                      ${activePhilosophy === index
                        ? 'bg-carbon text-raw-white'
                        : 'bg-raw-white text-carbon'}
                    `}>
                      {/* Icon */}
                      <div className="text-4xl font-black mb-4 opacity-20">
                        {philosophy.icon}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold mb-3">
                        {philosophy.title}
                      </h3>

                      {/* Description */}
                      <p className={`
                        text-sm leading-relaxed
                        ${activePhilosophy === index ? 'text-raw-white/80' : 'text-carbon/70'}
                      `}>
                        {philosophy.description}
                      </p>

                      {/* Index */}
                      <div className="mt-6 text-xs font-mono opacity-50">
                        0{index + 1}/04
                      </div>
                    </div>
                  </Card3D>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         PROCESS VISUALIZATION
         ========================================================================== */}

      <ParallaxContainer offset={50}>
        <section className="py-24 px-8 bg-gradient-to-b from-raw-white to-ivory">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-4xl font-black mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <DistortionText text="OUR PROCESS" />
            </motion.h2>

            <div className="relative">
              {/* Process Flow */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-thread-red/20 -translate-x-1/2" />

              {[
                { phase: 'OBSERVE', description: 'Study existing forms and their limitations' },
                { phase: 'DECONSTRUCT', description: 'Take apart systematically, understand the architecture' },
                { phase: 'EXPERIMENT', description: 'Test new combinations, embrace failure as data' },
                { phase: 'RECONSTRUCT', description: 'Build new forms from fragments of understanding' },
                { phase: 'DOCUMENT', description: 'Archive the process, not just the product' }
              ].map((step, index) => (
                <motion.div
                  key={step.phase}
                  className={`flex items-center gap-8 mb-12 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="hybrid-split bg-raw-white p-6">
                      <h3 className="text-2xl font-bold mb-2">{step.phase}</h3>
                      <p className="text-sm text-carbon/70">{step.description}</p>
                    </div>
                  </div>

                  {/* Node */}
                  <motion.div
                    className="w-12 h-12 bg-carbon rounded-full flex items-center justify-center text-raw-white font-bold relative z-10"
                    whileHover={{ scale: 1.2, rotate: 180 }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Spacer */}
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ParallaxContainer>

      {/* ==========================================================================
         INSPIRATIONS - Margiela & Sacai
         ========================================================================== */}

      <section className="py-24 px-8 bg-carbon text-raw-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black mb-16 text-center">
            <SplitText text="OUR INSPIRATIONS" delay={0.02} />
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Margiela */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="exposed-seam bg-carbon/50 p-8">
                <h3 className="text-3xl font-bold mb-6">MARTIN MARGIELA</h3>
                <p className="text-lg mb-6 text-raw-white/80">
                  The master of deconstruction taught us that fashion is not about the designer,
                  but about the garment itself. Anonymity as philosophy. White as infinite possibility.
                </p>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-thread-red">Techniques</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['Exposed linings', 'Blank labels', 'Trompe-l\'œil', 'Raw edges'].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-raw-white/10 text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wider text-thread-white">Philosophy</span>
                    <p className="mt-2 text-sm text-raw-white/70">
                      "The garment speaks for itself. The process is visible. The inside becomes the outside."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sacai */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="exposed-seam bg-carbon/50 p-8">
                <h3 className="text-3xl font-bold mb-6">CHITOSE ABE / SACAI</h3>
                <p className="text-lg mb-6 text-raw-white/80">
                  The architect of hybrid forms showed us that one plus one equals three.
                  Garments exist in multiple dimensions, multiple identities simultaneously.
                </p>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-thread-red">Techniques</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['Hybrid construction', 'Spliced patterns', 'Multiple identities', 'Layered reality'].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-raw-white/10 text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wider text-thread-white">Philosophy</span>
                    <p className="mt-2 text-sm text-raw-white/70">
                      "Familiar yet new. Expected yet surprising. One thing becomes another becomes another."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
         LABORATORY STATS
         ========================================================================== */}

      <section className="py-24 px-8 relative">
        <div className="absolute inset-0 material-concrete opacity-10" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'EXPERIMENTS', value: '1,247', unit: 'CONDUCTED' },
              { label: 'PATTERNS', value: '892', unit: 'ARCHIVED' },
              { label: 'FAILURES', value: '2,103', unit: 'DOCUMENTED' },
              { label: 'THOUGHTS', value: '∞', unit: 'PRESERVED' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-5xl font-black mb-2">
                  <DistortionText text={stat.value} />
                </div>
                <div className="text-xs font-mono text-carbon/60">
                  {stat.label}
                </div>
                <div className="text-xs text-carbon/40">
                  {stat.unit}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
         FINAL STATEMENT
         ========================================================================== */}

      <section className="py-32 px-8 bg-gradient-to-b from-raw-white to-carbon text-raw-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ scale: scaleProgress }}
          >
            <h2 className="text-6xl font-black mb-8">
              <DistortionText text="NO SALES" className="text-thread-red" />
            </h2>
            <p className="text-2xl mb-12 font-light">
              This is not commerce.
              <br />
              This is philosophy rendered in fabric.
            </p>
            <p className="text-lg mb-16 text-raw-white/70 max-w-2xl mx-auto">
              We exist to push boundaries, question conventions,
              explore what fashion becomes when freed from commercial constraints.
              Our work is documentation, not product. Our goal is understanding, not profit.
            </p>

            <MagneticButton strength={0.4}>
              <Link href="/lab">
                <motion.button
                  className="px-8 py-4 bg-raw-white text-carbon hover:bg-thread-red hover:text-raw-white transition-colors text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Enter the Laboratory
                </motion.button>
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </div>
  )
}