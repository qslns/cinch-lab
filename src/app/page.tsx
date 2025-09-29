'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import Link from 'next/link'

// ==========================================================================
// CINCH LAB - Complete Asymmetric Reconstruction
// Margiela Deconstruction × Sacai Layering × CDG Minimalism
// ==========================================================================

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY, scrollYProgress } = useScroll()

  // Mouse interaction
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  // State
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Research areas with asymmetric positioning
  const researchAreas = [
    {
      name: 'LABORATORY',
      desc: 'Pattern deconstruction research',
      path: '/lab',
      color: 'var(--lab-chemical-blue)',
      rotation: -1.2,
      size: 'large'
    },
    {
      name: 'COLLECTIONS',
      desc: 'Seasonal experiments',
      path: '/collections',
      color: 'var(--sacai-burnt-orange)',
      rotation: 2.5,
      size: 'medium'
    },
    {
      name: 'ARCHIVE',
      desc: 'Documentation & process',
      path: '/archive',
      color: 'var(--margiela-tabi-brown)',
      rotation: -2,
      size: 'large'
    },
    {
      name: 'ANALYSIS',
      desc: 'Critical fashion study',
      path: '/analysis',
      color: 'var(--lab-petri-blue)',
      rotation: 1.5,
      size: 'small'
    },
    {
      name: 'PHILOSOPHY',
      desc: 'Design manifesto',
      path: '/about',
      color: 'var(--cdg-blood-red)',
      rotation: -1.8,
      size: 'medium'
    },
    {
      name: 'CONTACT',
      desc: 'Collaboration gateway',
      path: '/contact',
      color: 'var(--margiela-steel)',
      rotation: 0.8,
      size: 'small'
    }
  ]

  // Parallax transforms
  const heroY = useTransform(scrollY, [0, 1000], [0, -300])
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const sloganY = useTransform(scrollY, [0, 600], [0, 150])

  // Initialize
  useEffect(() => {
    const loadTimer = setTimeout(() => setIsLoading(false), 1500)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      clearTimeout(loadTimer)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  // Loading Screen
  if (isLoading) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'var(--margiela-raw-canvas)' }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="text-xs uppercase tracking-[0.4em]" style={{ color: 'var(--margiela-carbon)' }}>
              Experimental Fashion Laboratory
            </div>
            <motion.div
              className="w-48 h-[1px] mt-6 mx-auto origin-left"
              style={{ backgroundColor: 'var(--margiela-carbon)' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div ref={containerRef} className="min-h-screen relative" style={{ backgroundColor: 'var(--zone-home-surface)' }}>

      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Progress Bar - Top */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-50"
        style={{
          width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
          backgroundColor: 'var(--zone-home-accent-1)'
        }}
      />

      {/* ========== SECTION 1: HERO - RADICAL ASYMMETRY ========== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY }}
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at 30% 50%, var(--sacai-burnt-orange), transparent 70%),
                          radial-gradient(circle at 70% 40%, var(--lab-petri-blue), transparent 60%)`
            }}
          />
        </motion.div>

        {/* Margiela Deconstructed Grid */}
        <div className="margiela-grid w-full px-8 md:px-16 lg:px-24 relative z-10">

          {/* Main Title - Ultra Large */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ opacity: textOpacity }}
            className="relative"
          >
            <h1 className="text-display-1 kinetic-text leading-none">
              <motion.span
                className="block"
                style={{
                  color: 'var(--margiela-void)',
                  fontWeight: 200
                }}
              >
                CINCH
              </motion.span>
              <motion.span
                className="block ml-[15%]"
                style={{
                  color: 'var(--margiela-graphite)',
                  fontWeight: 300
                }}
              >
                LAB
              </motion.span>
            </h1>

            {/* White Label Tag - Margiela Signature */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-white-label mt-8 inline-block"
              style={{ transform: 'rotate(-0.5deg)' }}
            >
              0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
            </motion.div>
          </motion.div>

          {/* Slogan - Offset Position */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ y: sloganY }}
            className="relative mt-16"
          >
            <div className="text-splice">
              <span className="text-heading-4 font-light block">
                Cinch • Release • Repeat
              </span>
            </div>
            <div className="text-overline mt-4" style={{ color: 'var(--margiela-aluminum)' }}>
              Experimental Fashion Laboratory
            </div>
          </motion.div>

          {/* Exposed Structure Corner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute top-8 right-8 text-number-tag"
          >
            <div className="text-right">
              <div>EST. 2024</div>
              <div className="mt-1">NO SALES</div>
              <div className="mt-1">ONLY CREATION</div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div
            className="w-[1px] h-16 opacity-30"
            style={{ backgroundColor: 'var(--margiela-carbon)' }}
          />
        </motion.div>
      </section>

      {/* ========== SECTION 2: PHILOSOPHY - LAYERED TEXT ========== */}
      <section className="py-32 px-8 md:px-16 lg:px-24 relative">
        <div className="sacai-grid">
          {/* Layer 1: Main Statement */}
          <motion.div
            className="sacai-grid-layer-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-overline mb-8" style={{ color: 'var(--margiela-aluminum)' }}>
              Laboratory Manifesto
            </div>
            <h2 className="text-display-3 font-light leading-tight">
              Fashion is not commerce.
              <br />
              Fashion is experiment.
              <br />
              Fashion is research.
            </h2>
          </motion.div>

          {/* Layer 2: Contrasting Accent */}
          <motion.div
            className="sacai-grid-layer-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-body-large leading-relaxed">
              We deconstruct patterns to understand construction.
              We layer materials to create new possibilities.
              We expose process as the final product.
            </p>
            <div className="mt-8 h-[1px] w-24 bg-current opacity-30" />
          </motion.div>

          {/* Layer 3: Accent Block */}
          <motion.div
            className="sacai-grid-layer-3"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-heading-6">
              NO PRODUCTS
            </div>
            <div className="text-heading-6 mt-2">
              NO PRICES
            </div>
            <div className="text-heading-6 mt-2">
              ONLY PURE CREATION
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== SECTION 3: RESEARCH AREAS - BROKEN GRID ========== */}
      <section className="py-24 px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-24">
            <h2 className="text-display-2 font-light">Research Areas</h2>
            <div className="mt-4 h-[1px] w-32" style={{ backgroundColor: 'var(--margiela-carbon)' }} />
          </div>

          {/* Hybrid Irregular Grid */}
          <div className="hybrid-grid">
            {researchAreas.map((area, index) => (
              <motion.div
                key={area.path}
                className={`
                  relative group cursor-pointer
                  ${area.size === 'large' ? 'col-span-2 row-span-2' : ''}
                  ${area.size === 'medium' ? 'col-span-1 row-span-2' : ''}
                  ${area.size === 'small' ? 'col-span-1 row-span-1' : ''}
                `}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: area.rotation
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  type: 'spring',
                  stiffness: 100
                }}
                whileHover={{
                  scale: 1.03,
                  rotate: 0,
                  transition: { duration: 0.4 }
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link href={area.path} className="block h-full min-h-[300px]">
                  <div
                    className="h-full p-8 md:p-12 border transition-all duration-500 relative overflow-hidden"
                    style={{
                      backgroundColor: hoveredIndex === index
                        ? area.color
                        : 'var(--margiela-paper)',
                      borderColor: hoveredIndex === index
                        ? area.color
                        : 'var(--margiela-exposed-seam)',
                      color: hoveredIndex === index
                        ? 'var(--margiela-snow)'
                        : 'var(--margiela-graphite)'
                    }}
                  >
                    {/* Number Tag */}
                    <div
                      className="text-number-tag absolute top-4 right-4"
                      style={{
                        opacity: 0.4,
                        color: hoveredIndex === index ? 'currentColor' : 'inherit'
                      }}
                    >
                      {String(index + 1).padStart(3, '0')}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <h3 className="text-heading-4 font-light mb-4">
                          {area.name}
                        </h3>
                        <div
                          className="w-12 h-[1px] opacity-30"
                          style={{ backgroundColor: 'currentColor' }}
                        />
                      </div>

                      <div>
                        <p className="text-label mt-8 opacity-70">
                          {area.desc}
                        </p>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 0.1 : 0 }}
                      style={{
                        background: 'radial-gradient(circle at center, white 0%, transparent 70%)'
                      }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ========== SECTION 4: CURRENT EXPERIMENTS - CDG MINIMAL ========== */}
      <section
        className="py-32 px-8 md:px-16 lg:px-24"
        style={{ backgroundColor: 'var(--margiela-paper)' }}
      >
        <div className="cdg-grid">
          <motion.div
            className="cdg-grid-item-1"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-display-2 font-light">
              Current
              <br />
              Experiments
            </h2>
          </motion.div>

          <motion.div
            className="cdg-grid-item-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="border p-8"
              style={{ borderColor: 'var(--margiela-exposed-seam)' }}
            >
              <div className="text-overline mb-4" style={{ color: 'var(--lab-specimen-red)' }}>
                ACTIVE
              </div>
              <h3 className="text-heading-4 mb-4">Pattern Deconstruction</h3>
              <div className="mt-6">
                <div className="flex justify-between text-caption mb-2">
                  <span>Progress</span>
                  <span>78%</span>
                </div>
                <div
                  className="w-full h-[2px]"
                  style={{ backgroundColor: 'var(--margiela-silver)' }}
                >
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: 'var(--lab-chemical-blue)' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '78%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="cdg-grid-item-3"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div
              className="border p-8"
              style={{ borderColor: 'var(--margiela-exposed-seam)' }}
            >
              <div className="text-overline mb-4" style={{ color: 'var(--lab-caution-amber)' }}>
                TESTING
              </div>
              <h3 className="text-heading-5 mb-4">Material Synthesis</h3>
              <div className="mt-6">
                <div className="flex justify-between text-caption mb-2">
                  <span>Progress</span>
                  <span>45%</span>
                </div>
                <div
                  className="w-full h-[2px]"
                  style={{ backgroundColor: 'var(--margiela-silver)' }}
                >
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: 'var(--lab-reaction-green)' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '45%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.6 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="cdg-grid-item-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div
              className="p-8"
              style={{
                backgroundColor: 'var(--cdg-absolute-black)',
                color: 'var(--margiela-paper)'
              }}
            >
              <div className="text-overline mb-4" style={{ color: 'var(--lab-reaction-green)' }}>
                COMPLETE
              </div>
              <h3 className="text-heading-5 mb-4">Hybrid Layering</h3>
              <div className="mt-6">
                <div className="flex justify-between text-caption mb-2">
                  <span>Progress</span>
                  <span>100%</span>
                </div>
                <div
                  className="w-full h-[2px]"
                  style={{ backgroundColor: 'var(--margiela-steel)' }}
                >
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: 'var(--lab-reaction-green)' }}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.7 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== SECTION 5: FOOTER - EXPOSED STRUCTURE ========== */}
      <footer
        className="border-t py-16 px-8 md:px-16 lg:px-24"
        style={{ borderColor: 'var(--margiela-exposed-seam)' }}
      >
        <div className="broken-symmetry-left">
          <div>
            <div className="text-heading-6 mb-2">CINCH LAB</div>
            <div className="text-caption">
              Experimental Fashion Laboratory
              <br />
              Est. 2024 — No Sales, Only Creation
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-end">
            <Link
              href="/privacy"
              className="text-label transition-opacity hover:opacity-60"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-label transition-opacity hover:opacity-60"
            >
              Terms
            </Link>
            <span className="text-caption">
              © 2024 CINCH LAB
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}