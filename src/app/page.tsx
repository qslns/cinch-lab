'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useInView } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// ==========================================================================
// CINCH LAB - Margiela × Sacai Digital Laboratory
// Deconstructive Design, Hybrid Layering, Material Research
// ==========================================================================

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const labRef = useRef<HTMLDivElement>(null)
  const philosophyRef = useRef<HTMLDivElement>(null)

  const { scrollY, scrollYProgress } = useScroll()

  // Mouse position for interactive effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 })

  // State
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState(0)
  const [hoveredArea, setHoveredArea] = useState<string | null>(null)

  // Research areas - sophisticated presentation
  const researchAreas = [
    {
      name: 'LABORATORY',
      desc: 'Technical experiments in garment construction',
      path: '/lab',
      grid: 'col-span-5 row-span-2',
      color: 'carbon'
    },
    {
      name: 'COLLECTIONS',
      desc: 'Seasonal presentations',
      path: '/collections',
      grid: 'col-span-3 row-span-1',
      color: 'graphite'
    },
    {
      name: 'ARCHIVE',
      desc: 'Research documentation',
      path: '/archive',
      grid: 'col-span-4 row-span-2',
      color: 'steel'
    },
    {
      name: 'ANALYSIS',
      desc: 'Fashion critique & deconstruction',
      path: '/analysis',
      grid: 'col-span-4 row-span-1',
      color: 'concrete'
    },
    {
      name: 'PHILOSOPHY',
      desc: 'Design manifesto',
      path: '/about',
      grid: 'col-span-3 row-span-1',
      color: 'aluminum'
    },
    {
      name: 'CONTACT',
      desc: 'Professional inquiries',
      path: '/contact',
      grid: 'col-span-2 row-span-1',
      color: 'titanium'
    }
  ]

  // Parallax transforms
  const heroY = useTransform(scrollY, [0, 1000], [0, -200])
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.9])
  const textY = useTransform(scrollY, [0, 500], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const progressBar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  // Initialize
  useEffect(() => {
    const loadTimer = setTimeout(() => setIsLoading(false), 1200)

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

  // Loading Screen - Minimal
  if (isLoading) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 bg-raw-canvas flex items-center justify-center"
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <div className="text-carbon text-xs font-mono tracking-[0.3em] uppercase">
              Loading Laboratory
            </div>
            <motion.div
              className="w-32 h-px bg-carbon mt-4 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-raw-canvas text-carbon">

      {/* Subtle Noise Texture */}
      <div className="noise-overlay" />

      {/* Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 h-px bg-specimen-red z-50"
        style={{ width: progressBar }}
      />

      {/* Hero Section - Asymmetric Layout */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden"
        style={{ scale: heroScale }}
      >
        <motion.div
          className="absolute inset-0"
          style={{ y: heroY }}
        >
          {/* Background Gradient - Subtle */}
          <div className="absolute inset-0 bg-gradient-to-br from-raw-canvas via-paper to-raw-canvas opacity-50" />
        </motion.div>

        <div className="relative z-10 min-h-screen flex items-center">
          <div className="deconstructed-grid w-full px-8 md:px-16 lg:px-24">

            {/* Main Title - Refined Typography */}
            <motion.div
              className="col-span-3"
              style={{ y: textY, opacity }}
            >
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="kinetic-text"
              >
                <span className="block text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.85]">
                  CINCH
                </span>
                <span className="block text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[0.85] ml-12 md:ml-24">
                  LAB
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-8"
              >
                <div className="text-xs uppercase tracking-[0.3em] text-concrete mb-2">
                  Experimental Fashion Laboratory
                </div>
                <div className="w-16 h-px bg-carbon" />
              </motion.div>
            </motion.div>

            {/* Slogan - Sophisticated */}
            <motion.div
              className="col-span-2 self-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="mb-8">
                <span className="text-lg md:text-xl font-light">Cinch</span>
                <span className="mx-2 text-specimen-red">•</span>
                <span className="text-lg md:text-xl font-light">Release</span>
                <span className="mx-2 text-specimen-red">•</span>
                <span className="text-lg md:text-xl font-light">Repeat</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator - Minimal */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-12 bg-carbon opacity-30" />
        </motion.div>
      </motion.section>

      {/* Research Areas - Asymmetric Grid */}
      <section className="py-24 px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-4">Research Areas</h2>
            <div className="w-24 h-px bg-carbon" />
          </div>

          <div className="grid grid-cols-12 gap-4 auto-rows-[200px]">
            {researchAreas.map((area, index) => (
              <motion.div
                key={area.path}
                className={`${area.grid} relative group`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredArea(area.name)}
                onMouseLeave={() => setHoveredArea(null)}
              >
                <Link href={area.path} className="block h-full">
                  <div className={`
                    h-full p-6
                    border border-graphite/20
                    transition-all duration-500 ease-out
                    hover:border-carbon
                    hover:shadow-xl
                    relative overflow-hidden
                    ${hoveredArea === area.name ? 'bg-carbon text-raw-canvas' : 'bg-paper'}
                  `}>
                    {/* Exposed Structure Effect */}
                    <div className="absolute top-2 right-2 text-[10px] font-mono opacity-40">
                      {String(index + 1).padStart(3, '0')}
                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <h3 className="text-xl md:text-2xl font-light mb-2">
                          {area.name}
                        </h3>
                        <div className="w-8 h-px bg-current opacity-30 mb-3" />
                      </div>

                      <p className="text-xs uppercase tracking-wider opacity-60">
                        {area.desc}
                      </p>
                    </div>

                    {/* Hover Effect - Sophisticated */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-transparent to-carbon/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Philosophy Section - Minimal Statement */}
      <section ref={philosophyRef} className="py-32 px-8 md:px-16 lg:px-24 bg-paper">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h2 className="text-xs uppercase tracking-[0.3em] text-concrete mb-8">
            Design Philosophy
          </h2>

          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-2xl md:text-3xl font-light leading-relaxed">
                We deconstruct to understand.
                <br />
                We layer to create complexity.
                <br />
                We expose process as product.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              <div className="w-16 h-px bg-carbon" />
              <span className="text-xs uppercase tracking-wider text-concrete">
                Established 2024
              </span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Laboratory Status - Technical Display */}
      <section className="py-24 px-8 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-4">Current Research</h2>
            <div className="w-24 h-px bg-carbon" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Pattern Deconstruction', status: 'Active', progress: 78 },
              { title: 'Material Synthesis', status: 'Testing', progress: 45 },
              { title: 'Hybrid Layering', status: 'Complete', progress: 100 },
            ].map((research, index) => (
              <motion.div
                key={research.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border border-graphite/20 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-light">{research.title}</h3>
                  <span className="text-xs uppercase tracking-wider text-concrete">
                    {research.status}
                  </span>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-xs mb-2">
                    <span>Progress</span>
                    <span>{research.progress}%</span>
                  </div>
                  <div className="w-full h-px bg-graphite/20">
                    <motion.div
                      className="h-full bg-carbon"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${research.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer - Minimal */}
      <footer className="border-t border-graphite/20 py-12 px-8 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-sm font-light">CINCH LAB</div>
            <div className="text-xs text-concrete mt-1">
              Experimental Fashion Laboratory
            </div>
          </div>

          <div className="flex space-x-8">
            <Link href="/privacy" className="text-xs hover:text-carbon/60 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs hover:text-carbon/60 transition-colors">
              Terms
            </Link>
            <span className="text-xs text-concrete">
              © 2024
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}