'use client'

import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black">

      {/* HERO MANIFESTO */}
      <section className="min-h-screen flex items-center justify-center px-8 relative">
        <motion.div
          className="text-xs absolute top-8 left-8 transform -rotate-12 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          003
        </motion.div>

        <motion.div
          className="text-xs absolute bottom-8 right-8 transform rotate-6 text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          MARGIELA × SACAI
        </motion.div>

        <div className="max-w-6xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <h1 className="text-9xl font-black leading-none mb-16 text-white">
              WE ARE
              <br />
              <span className="text-red-600">NOT</span>
              <br />
              A BRAND
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-sm tracking-widest inline-block mb-12 bg-white px-6 py-3"
            >
              EXPERIMENTAL FASHION LABORATORY
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-4xl font-light text-gray-400 max-w-4xl mx-auto leading-snug"
            >
              CINCH LAB exists in the liminal space between
              <span className="text-orange-500"> destruction </span>
              and
              <span className="text-orange-500"> creation</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* PHILOSOPHY BLOCKS */}
      <section className="py-32 px-8 md:px-16 lg:px-24 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-black text-white p-16 border-8 border-red-600 transform -rotate-2 hover:rotate-0 transition-all duration-500"
          >
            <span className="text-xs text-red-600 tracking-widest">01</span>

            <h2 className="text-5xl font-black text-white my-8">
              NO COMMERCE
            </h2>

            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              This laboratory exists for experimentation, not commerce. We do not sell
              products. We do not calculate profit. Every garment is a philosophical
              statement, a question posed in fabric.
            </p>

            <p className="text-base text-gray-400">
              When fashion is freed from commercial constraints, it becomes pure research.
              We archive our work, we document our processes, we share our failures.
              The goal is understanding, not revenue.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-orange-500 text-white p-16 transform rotate-2 hover:rotate-0 transition-all duration-500"
          >
            <p className="text-5xl font-black mb-8">
              CINCH • RELEASE • REPEAT
            </p>

            <p className="text-xl">
              Our slogan is our methodology. Cinch: complete control of technique.
              Release: creative liberation. Repeat: endless experimentation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* INSPIRATION */}
      <section className="py-32 px-8 md:px-16 lg:px-24 bg-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 border-4 border-gray-900 bg-white transform -rotate-1 hover:rotate-0 transition-all"
          >
            <span className="text-xs tracking-widest text-gray-500">02</span>

            <h3 className="text-3xl font-bold text-black my-6">
              MARGIELA
            </h3>

            <p className="text-base text-gray-700 mb-8">
              The master of deconstruction taught us anonymity as philosophy.
              White as infinite possibility. The garment speaks, not the designer.
            </p>

            <div className="text-xs tracking-widest bg-gray-900 text-white px-4 py-2 inline-block">
              DECONSTRUCTIVE PHILOSOPHY
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-blue-900 text-white p-16 transform rotate-1 hover:rotate-0 transition-all"
          >
            <span className="text-xs tracking-widest text-orange-500">03</span>

            <h3 className="text-5xl font-bold my-8">
              SACAI
            </h3>

            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Chitose Abe's hybrid constructions showed us that one plus one equals three.
              Garments exist in multiple dimensions, multiple identities simultaneously.
            </p>

            <div className="border-l-4 border-orange-500 pl-6 mt-8">
              <p className="text-base italic">
                "Familiar yet new. Expected yet surprising. One thing becomes another becomes another."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LABORATORY STATS */}
      <section className="py-32 px-8 md:px-16 lg:px-24 bg-white">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { label: 'EXPERIMENTS', value: '1,247', rotation: '-rotate-1' },
            { label: 'PATTERNS', value: '892', rotation: 'rotate-2' },
            { label: 'FAILURES', value: '2,103', rotation: '-rotate-1' },
            { label: 'THOUGHTS', value: '∞', rotation: 'rotate-1' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`transform ${stat.rotation} bg-white p-8 text-center border-2 border-gray-300 shadow-lg hover:scale-105 hover:rotate-0 transition-all`}
            >
              <p className="text-7xl text-red-600 font-black leading-none">
                {stat.value}
              </p>
              <p className="text-xs tracking-widest text-gray-500 mt-6">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MANIFESTO TEXT */}
      <section className="py-48 px-8 bg-black text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-9xl font-black text-red-600 mb-16">
            난 천재야
          </h2>

          <p className="text-4xl font-light text-gray-300 leading-relaxed mb-16">
            This is not arrogance. This is confidence earned through 1,247 experiments,
            892 archived patterns, and 2,103 documented failures. We understand fashion
            at a level few can reach.
          </p>

          <div className="text-base tracking-widest bg-white text-black px-8 py-4 inline-block">
            CINCH LAB IS THE HIGHEST
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-4 border-red-600 py-16 px-8 bg-black text-white text-center">
        <p className="text-sm text-gray-500">
          CINCH LAB • EXPERIMENTAL FASHION LABORATORY • EST. 2024
        </p>
      </footer>
    </div>
  )
}
