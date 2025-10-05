'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollY, scrollYProgress } = useScroll()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const researchAreas = [
    { name: 'LABORATORY', desc: 'Pattern deconstruction research', path: '/lab', color: 'bg-blue-600', hoverColor: 'hover:bg-blue-700', rotation: 'rotate-1' },
    { name: 'COLLECTIONS', desc: 'Seasonal experiments', path: '/collections', color: 'bg-orange-500', hoverColor: 'hover:bg-orange-600', rotation: '-rotate-2' },
    { name: 'ARCHIVE', desc: 'Documentation & process', path: '/archive', color: 'bg-red-600', hoverColor: 'hover:bg-red-700', rotation: 'rotate-2' },
    { name: 'ANALYSIS', desc: 'Critical fashion study', path: '/analysis', color: 'bg-sky-600', hoverColor: 'hover:bg-sky-700', rotation: '-rotate-1' },
    { name: 'PHILOSOPHY', desc: 'Design manifesto', path: '/about', color: 'bg-gray-900', hoverColor: 'hover:bg-black', rotation: 'rotate-3' },
    { name: 'CONTACT', desc: 'Collaboration gateway', path: '/contact', color: 'bg-slate-700', hoverColor: 'hover:bg-slate-800', rotation: '-rotate-2' }
  ]

  const heroY = useTransform(scrollY, [0, 1000], [0, -300])
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <div ref={containerRef} className="min-h-screen bg-zinc-50">

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-orange-500 z-50"
        style={{ width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']) }}
      />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <motion.div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-blue-100 opacity-40" style={{ y: heroY }} />

        <div className="w-full px-8 md:px-16 lg:px-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ opacity: textOpacity }}
          >
            <h1 className="text-9xl font-extralight leading-none text-black transform -rotate-1">
              CINCH
            </h1>
            <h1 className="text-9xl font-light leading-none text-gray-700 ml-32 transform rotate-1">
              LAB
            </h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 inline-block text-xs tracking-widest text-gray-500 transform -rotate-1"
            >
              0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative mt-16"
          >
            <div className="text-4xl font-light text-gray-900">
              Cinch • Release • Repeat
            </div>
            <div className="mt-4 text-sm tracking-widest text-gray-500">
              Experimental Fashion Laboratory
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute top-8 right-8 text-xs tracking-wider text-right text-gray-500"
          >
            <div>EST. 2024</div>
            <div className="mt-1">NO SALES</div>
            <div className="mt-1">ONLY CREATION</div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="w-px h-16 bg-gray-400 opacity-30" />
        </motion.div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="py-32 px-8 md:px-16 lg:px-24 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="transform -rotate-1"
          >
            <div className="text-xs tracking-widest mb-8 text-gray-500">
              Laboratory Manifesto
            </div>
            <h2 className="text-6xl font-light leading-tight text-black">
              Fashion is not commerce.
              <br />
              Fashion is experiment.
              <br />
              Fashion is research.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="transform rotate-1 bg-orange-500 p-12 text-white"
          >
            <p className="text-xl leading-relaxed">
              We deconstruct patterns to understand construction.
              We layer materials to create new possibilities.
              We expose process as the final product.
            </p>
            <div className="mt-8 h-px w-24 bg-white opacity-50" />
            <div className="mt-8 text-2xl font-bold">
              NO PRODUCTS • NO PRICES • ONLY PURE CREATION
            </div>
          </motion.div>
        </div>
      </section>

      {/* RESEARCH AREAS GRID */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-gray-100">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-24">
            <h2 className="text-7xl font-light text-black">Research Areas</h2>
            <div className="mt-4 h-px w-32 bg-black" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {researchAreas.map((area, index) => (
              <motion.div
                key={area.path}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                className={`transform ${area.rotation} transition-all duration-500`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link href={area.path} className="block">
                  <div
                    className={`h-96 p-8 md:p-12 border-2 transition-all duration-500 ${
                      hoveredIndex === index
                        ? `${area.color} text-white border-transparent`
                        : 'bg-white text-gray-900 border-gray-300'
                    } ${area.hoverColor}`}
                  >
                    <div className="text-xs absolute top-4 right-4 opacity-40">
                      {String(index + 1).padStart(3, '0')}
                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <h3 className="text-3xl font-light mb-4">
                          {area.name}
                        </h3>
                        <div className="w-12 h-px bg-current opacity-30" />
                      </div>

                      <div>
                        <p className="text-sm mt-8 opacity-70">
                          {area.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CURRENT EXPERIMENTS */}
      <section className="py-32 px-8 md:px-16 lg:px-24 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl font-light text-black">
              Current
              <br />
              Experiments
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="border-2 border-gray-300 p-8 transform -rotate-1 bg-white hover:bg-blue-50 transition-all">
              <div className="text-xs mb-4 text-red-600 font-bold tracking-widest">
                ACTIVE
              </div>
              <h3 className="text-3xl mb-4 text-black">Pattern Deconstruction</h3>
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>78%</span>
                </div>
                <div className="w-full h-1 bg-gray-200">
                  <motion.div
                    className="h-full bg-blue-600"
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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-start-2"
          >
            <div className="border-2 border-gray-300 p-8 transform rotate-2 bg-white hover:bg-green-50 transition-all">
              <div className="text-xs mb-4 text-yellow-600 font-bold tracking-widest">
                TESTING
              </div>
              <h3 className="text-2xl mb-4 text-black">Material Synthesis</h3>
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>45%</span>
                </div>
                <div className="w-full h-1 bg-gray-200">
                  <motion.div
                    className="h-full bg-green-600"
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
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-start-1"
          >
            <div className="p-8 bg-black text-white transform -rotate-2 hover:rotate-0 transition-all">
              <div className="text-xs mb-4 text-green-400 font-bold tracking-widest">
                COMPLETE
              </div>
              <h3 className="text-2xl mb-4">Hybrid Layering</h3>
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>100%</span>
                </div>
                <div className="w-full h-1 bg-gray-700">
                  <motion.div
                    className="h-full bg-green-400"
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

      {/* FOOTER */}
      <footer className="border-t border-gray-300 py-16 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="text-xl font-bold mb-2 text-black">CINCH LAB</div>
            <div className="text-sm text-gray-600">
              Experimental Fashion Laboratory
              <br />
              Est. 2024 — No Sales, Only Creation
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <Link href="/privacy" className="text-sm text-gray-600 hover:text-black transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-gray-600 hover:text-black transition-colors">
              Terms
            </Link>
            <span className="text-sm text-gray-500">
              © 2024 CINCH LAB
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
