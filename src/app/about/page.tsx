'use client'

import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="px-4 md:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-thin mb-8">About</h1>
        </motion.div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Philosophy */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="text-xs tracking-[0.15em] text-gray-500 mb-4">PHILOSOPHY</h2>
            <p className="text-lg font-light leading-relaxed mb-4">
              CINCH LAB is an experimental fashion house that challenges the boundaries 
              between art and wearability.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Founded in 2022, we create limited collections that explore minimalism, 
              architectural forms, and the poetry of negative space. Each piece is a 
              meditation on restraint and intention.
            </p>
          </motion.section>

          {/* Process */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xs tracking-[0.15em] text-gray-500 mb-4">PROCESS</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-light mb-2">Concept</h3>
                <p className="text-sm text-gray-600">
                  Each collection begins with a philosophical exploration, 
                  drawing from architecture, nature, and abstract concepts.
                </p>
              </div>
              <div>
                <h3 className="font-light mb-2">Design</h3>
                <p className="text-sm text-gray-600">
                  Silhouettes are refined through countless iterations, 
                  removing everything unnecessary until only essence remains.
                </p>
              </div>
              <div>
                <h3 className="font-light mb-2">Creation</h3>
                <p className="text-sm text-gray-600">
                  Limited quantities ensure attention to detail and exclusivity, 
                  with each piece numbered and documented.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Team */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-xs tracking-[0.15em] text-gray-500 mb-4">TEAM</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-light mb-2">Creative Direction</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Led by a collective of designers who believe fashion 
                  should provoke thought as much as it adorns the body.
                </p>
              </div>
              <div>
                <h3 className="font-light mb-2">Craftsmanship</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Working with master artisans who share our commitment 
                  to precision and innovation in construction.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Values */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-xs tracking-[0.15em] text-gray-500 mb-4">VALUES</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center py-8 border border-gray-200">
                <p className="text-xs tracking-[0.15em]">MINIMALISM</p>
              </div>
              <div className="text-center py-8 border border-gray-200">
                <p className="text-xs tracking-[0.15em]">QUALITY</p>
              </div>
              <div className="text-center py-8 border border-gray-200">
                <p className="text-xs tracking-[0.15em]">INNOVATION</p>
              </div>
              <div className="text-center py-8 border border-gray-200">
                <p className="text-xs tracking-[0.15em]">TIMELESSNESS</p>
              </div>
            </div>
          </motion.section>

          {/* Quote */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="py-12 border-t border-b border-gray-200"
          >
            <blockquote className="text-center">
              <p className="text-xl font-light italic mb-4">
                "Fashion's extreme limits lie not in excess, but in absence."
              </p>
              <cite className="text-xs tracking-[0.15em] text-gray-500">
                CINCH LAB MANIFESTO
              </cite>
            </blockquote>
          </motion.section>
        </div>
      </div>
    </div>
  )
}