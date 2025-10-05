'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Link from 'next/link'

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY, scrollYProgress } = useScroll()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 1000], [0, -300])
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const numberOpacity = useTransform(scrollY, [0, 200], [0.3, 0])

  const researchAreas = [
    {
      name: 'LABORATORY',
      desc: 'Pattern deconstruction research',
      path: '/lab',
      color: 'bg-lab-chemical-blue',
      hoverColor: 'hover:bg-lab-petri-blue',
      rotation: 'rotate-1',
      number: '01',
      size: 'large'
    },
    {
      name: 'COLLECTIONS',
      desc: 'Seasonal experiments',
      path: '/collections',
      color: 'bg-sacai-burnt-orange',
      hoverColor: 'hover:bg-sacai-splice-orange',
      rotation: '-rotate-2',
      number: '02',
      size: 'medium'
    },
    {
      name: 'ARCHIVE',
      desc: 'Documentation & process',
      path: '/archive',
      color: 'bg-cdg-blood-red',
      hoverColor: 'hover:bg-cdg-crimson',
      rotation: 'rotate-2',
      number: '03',
      size: 'small'
    },
    {
      name: 'ANALYSIS',
      desc: 'Critical fashion study',
      path: '/analysis',
      color: 'bg-margiela-steel',
      hoverColor: 'hover:bg-margiela-aluminum',
      rotation: '-rotate-1',
      number: '04',
      size: 'medium'
    },
    {
      name: 'PHILOSOPHY',
      desc: 'Design manifesto',
      path: '/about',
      color: 'bg-margiela-carbon',
      hoverColor: 'hover:bg-margiela-graphite',
      rotation: 'rotate-3',
      number: '05',
      size: 'large'
    }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-margiela-raw-canvas">

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-sacai-burnt-orange via-cdg-blood-red to-lab-chemical-blue z-50"
        style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
      />

      {/* SECTION 1: HERO - Margiela White Label + Ultra Typography */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-margiela-paper via-margiela-raw-canvas to-margiela-snow"
      >
        {/* Animated Background with Radial Gradient */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 30% 50%, rgba(232, 93, 44, 0.15) 0%, transparent 50%)',
            y: heroY
          }}
        />

        <div className="w-full px-6 md:px-12 lg:px-20 relative z-10">
          {/* Margiela Number Tags - Floating */}
          <motion.div
            className="absolute top-8 right-8 md:top-16 md:right-16 font-mono text-[10px] tracking-wider text-margiela-aluminum transform rotate-3"
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: isHeroInView ? 0.6 : 0, rotate: 3 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div>0 1 2 3 4 5 6 7 8 9 10 11</div>
            <div className="mt-1">12 13 14 15 16 17 18 19 20</div>
            <div className="mt-1">21 22 23 • MARGIELA</div>
          </motion.div>

          {/* Main Logo - Deconstructed */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isHeroInView ? 1 : 0, y: isHeroInView ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ opacity: textOpacity }}
            className="relative"
          >
            {/* CINCH - Ultra Large, Extralight */}
            <div className="relative transform -rotate-1">
              <h1 className="text-[clamp(4rem,15vw,12rem)] font-extralight leading-none tracking-tighter text-margiela-carbon">
                CINCH
              </h1>
              {/* Exposed Seam Effect */}
              <div className="absolute -bottom-2 left-0 w-3/4 h-[2px] bg-margiela-exposed-seam opacity-40" />
            </div>

            {/* LAB - Offset, Lighter Weight */}
            <div className="relative transform rotate-1 ml-8 md:ml-32 -mt-4 md:-mt-8">
              <h1 className="text-[clamp(4rem,15vw,12rem)] font-light leading-none tracking-tight text-margiela-steel">
                LAB
              </h1>
            </div>

            {/* Margiela White Label Tag */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isHeroInView ? 1 : 0, scale: isHeroInView ? 1 : 0.9 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 inline-block bg-margiela-white-label border border-margiela-exposed-seam px-4 py-2 transform -rotate-1"
            >
              <div className="font-mono text-[10px] tracking-widest text-margiela-graphite">
                0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
              </div>
            </motion.div>
          </motion.div>

          {/* Tagline - Sacai Splice Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isHeroInView ? 1 : 0, y: isHeroInView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative mt-12 md:mt-16"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight">
              <span className="text-margiela-carbon">Cinch</span>
              <span className="text-sacai-burnt-orange mx-2">•</span>
              <span className="text-cdg-blood-red">Release</span>
              <span className="text-lab-chemical-blue mx-2">•</span>
              <span className="text-margiela-steel">Repeat</span>
            </h2>

            <p className="text-sm md:text-base mt-4 tracking-[0.3em] uppercase text-margiela-aluminum font-mono">
              Experimental Fashion Laboratory
            </p>
          </motion.div>

          {/* Status Info - Top Right, Rotated */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHeroInView ? 1 : 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute top-12 md:top-16 right-6 md:right-12 text-xs text-right font-mono transform rotate-2"
          >
            <div className="text-margiela-aluminum tracking-wider">EST. 2024</div>
            <div className="mt-2 text-cdg-blood-red font-bold">NO SALES</div>
            <div className="mt-1 text-margiela-steel">ONLY CREATION</div>
          </motion.div>
        </div>

        {/* Scroll Indicator - Minimal */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="w-[1px] h-16 bg-margiela-steel opacity-30" />
        </motion.div>
      </section>

      {/* SECTION 2: PHILOSOPHY - Sacai Layered Grid */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-margiela-paper overflow-hidden">
        <div className="max-w-7xl mx-auto">
          {/* Sacai Grid - 3 Overlapping Sections */}
          <div className="sacai-grid relative min-h-[600px]">

            {/* Layer 1: Base - Margiela Neutral */}
            <motion.div
              className="sacai-grid-layer-1 bg-margiela-snow p-8 md:p-16 transform -rotate-1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="font-mono text-[10px] tracking-wider text-margiela-aluminum mb-6">
                LABORATORY MANIFESTO
              </div>

              <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight text-margiela-carbon">
                Fashion is not
                <br />
                commerce.
                <br />
                <span className="text-margiela-steel">Fashion is</span>
                <br />
                <span className="text-cdg-blood-red">experiment.</span>
              </h2>
            </motion.div>

            {/* Layer 2: Contrasting Splice - Sacai Navy */}
            <motion.div
              className="sacai-grid-layer-2 bg-sacai-layer-navy text-margiela-paper p-8 md:p-16 transform rotate-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-lg md:text-2xl leading-relaxed font-light">
                We deconstruct patterns to understand construction.
                <br />
                We layer materials to create new possibilities.
                <br />
                We expose process as the final product.
              </p>

              <div className="mt-8 h-[2px] w-24 bg-sacai-burnt-orange" />
            </motion.div>

            {/* Layer 3: Accent - Sacai Orange */}
            <motion.div
              className="sacai-grid-layer-3 bg-sacai-burnt-orange text-margiela-snow p-6 md:p-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-xl md:text-3xl font-bold tracking-tight leading-tight">
                NO PRODUCTS
                <br />
                NO PRICES
                <br />
                ONLY PURE
                <br />
                CREATION
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: RESEARCH AREAS - Broken Symmetry Grid with Actual Rotations */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-margiela-raw-canvas">
        <div className="max-w-7xl mx-auto">
          {/* Section Header - Deconstructed */}
          <motion.div
            className="mb-16 md:mb-24 transform -rotate-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-light text-margiela-carbon">
              Research Areas
            </h2>
            <div className="mt-4 w-32 h-[2px] bg-margiela-carbon" />
          </motion.div>

          {/* Margiela Grid - Broken, Rotated Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {researchAreas.map((area, index) => {
              const sizes = {
                large: 'md:col-span-2 min-h-[400px]',
                medium: 'md:col-span-1 min-h-[350px]',
                small: 'md:col-span-1 min-h-[300px]'
              }

              return (
                <motion.div
                  key={area.path}
                  className={`${sizes[area.size]} transform ${area.rotation} hover:rotate-0 transition-all duration-500`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <Link href={area.path} className="block h-full">
                    <div
                      className={`
                        h-full p-8 md:p-12 border-2 transition-all duration-500
                        ${hoveredIndex === index
                          ? `${area.color} text-white border-transparent shadow-2xl`
                          : 'bg-white text-margiela-carbon border-margiela-exposed-seam'}
                      `}
                    >
                      {/* Margiela Number Tag */}
                      <div className="font-mono text-[10px] text-margiela-aluminum mb-6 tracking-widest">
                        {area.number}
                      </div>

                      <div className="flex flex-col justify-between h-full">
                        {/* Title */}
                        <div>
                          <h3 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 tracking-tight">
                            {area.name}
                          </h3>
                          <div className="w-12 h-[1px] bg-current opacity-30" />
                        </div>

                        {/* Description */}
                        <div>
                          <p className="text-sm md:text-base mt-8 opacity-70 tracking-wide">
                            {area.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: CURRENT EXPERIMENTS - CDG Radical Minimal Grid */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-margiela-paper">
        <div className="max-w-7xl mx-auto">
          {/* CDG Grid - Extreme Asymmetry */}
          <div className="cdg-grid">

            {/* Title - Massive, Bold */}
            <motion.div
              className="cdg-grid-item-1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-light text-margiela-carbon leading-none">
                Current
                <br />
                Experiments
              </h2>
            </motion.div>

            {/* Experiment 1 - Active (Rotated) */}
            <motion.div
              className="cdg-grid-item-2 transform -rotate-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="border-2 border-margiela-steel p-8 md:p-10 bg-white hover:bg-lab-chemical-blue hover:text-white hover:border-transparent transition-all duration-500">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-lab-warning-orange animate-pulse" />
                  <span className="text-xs font-bold tracking-widest uppercase">ACTIVE</span>
                </div>

                <h3 className="text-2xl md:text-3xl mb-4 font-light">Pattern Deconstruction</h3>

                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2 font-mono">
                    <span>Progress</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full h-[2px] bg-margiela-exposed-seam">
                    <motion.div
                      className="h-full bg-lab-chemical-blue"
                      initial={{ width: 0 }}
                      whileInView={{ width: '78%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Experiment 2 - Testing */}
            <motion.div
              className="cdg-grid-item-3 transform rotate-1"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="border-2 border-margiela-steel p-8 bg-white hover:bg-sacai-olive hover:text-white hover:border-transparent transition-all duration-500">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-sacai-burnt-orange" />
                  <span className="text-xs font-bold tracking-widest uppercase">TESTING</span>
                </div>

                <h3 className="text-xl md:text-2xl mb-4 font-light">Material Synthesis</h3>

                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2 font-mono">
                    <span>Progress</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full h-[2px] bg-margiela-exposed-seam">
                    <motion.div
                      className="h-full bg-sacai-burnt-orange"
                      initial={{ width: 0 }}
                      whileInView={{ width: '45%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.6 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Experiment 3 - Complete (High Contrast) */}
            <motion.div
              className="cdg-grid-item-4 transform -rotate-1"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="p-8 bg-cdg-absolute-black text-margiela-paper hover:bg-cdg-blood-red transition-all duration-500">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-lab-reaction-green" />
                  <span className="text-xs font-bold tracking-widest uppercase text-lab-reaction-green">COMPLETE</span>
                </div>

                <h3 className="text-xl md:text-2xl mb-4 font-light">Hybrid Layering</h3>

                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2 font-mono">
                    <span>Progress</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full h-[2px] bg-margiela-steel">
                    <motion.div
                      className="h-full bg-lab-reaction-green"
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
        </div>
      </section>

      {/* SECTION 5: FOOTER - Broken Symmetry */}
      <footer className="border-t-2 border-margiela-exposed-seam py-16 md:py-20 px-6 md:px-12 lg:px-20 bg-margiela-snow">
        <div className="max-w-7xl mx-auto">
          <div className="broken-symmetry-left">
            {/* Left - Logo */}
            <div className="transform -rotate-1">
              <div className="text-2xl md:text-3xl font-light mb-4 text-margiela-carbon tracking-tight">
                CINCH LAB
              </div>

              <div className="text-sm text-margiela-steel font-mono tracking-wide">
                Experimental Fashion Laboratory
                <br />
                Est. 2024 — No Sales, Only Creation
              </div>
            </div>

            {/* Right - Links */}
            <div className="flex flex-col gap-6 transform rotate-1">
              <Link
                href="/about"
                className="text-sm uppercase tracking-[0.3em] text-margiela-steel hover:text-cdg-blood-red transition-colors duration-300"
              >
                Philosophy
              </Link>
              <Link
                href="/contact"
                className="text-sm uppercase tracking-[0.3em] text-margiela-steel hover:text-cdg-blood-red transition-colors duration-300"
              >
                Collaboration
              </Link>

              <span className="text-xs font-mono text-margiela-aluminum mt-4">
                © 2024 CINCH LAB
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
