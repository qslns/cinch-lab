'use client'

import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--cdg-void)]">

      {/* HERO MANIFESTO - CDG Style Bold Statement */}
      <section className="min-h-screen flex items-center justify-center px-8 relative">
        <motion.div
          className="text-xs absolute top-8 left-8 transform -rotate-12 text-[var(--margiela-slate)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="margiela-number-tag bg-[var(--margiela-white)]">03</div>
        </motion.div>

        <motion.div
          className="text-xs absolute bottom-8 right-8 transform rotate-6 text-[var(--margiela-slate)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="margiela-tag bg-[var(--margiela-white)] px-3 py-2">
            MARGIELA × SACAI
          </div>
        </motion.div>

        <div className="max-w-6xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <h1 className="text-display-1 font-black leading-none mb-16 text-[var(--margiela-white)]">
              WE ARE
              <br />
              <span className="text-[var(--cdg-blood-red)]">NOT</span>
              <br />
              A BRAND
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="margiela-tag inline-block mb-12 bg-[var(--margiela-white)] px-6 py-3"
            >
              EXPERIMENTAL FASHION LABORATORY
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-heading-1 font-light text-[var(--margiela-off-white)] max-w-4xl mx-auto leading-snug"
            >
              CINCH LAB exists in the liminal space between
              <span className="text-[var(--sacai-burnt-orange)]"> destruction </span>
              and
              <span className="text-[var(--sacai-burnt-orange)]"> creation</span>
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* PHILOSOPHY BLOCKS with broken-symmetry */}
      <section className="broken-symmetry py-32 px-8 md:px-16 lg:px-24 bg-[var(--margiela-white)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[var(--cdg-void)] text-[var(--margiela-white)] p-16 border-8 border-[var(--cdg-blood-red)] transform -rotate-2 hover:rotate-0 transition-all duration-500 exposed-seam"
          >
            <span className="margiela-number-tag text-[var(--cdg-blood-red)]">01</span>

            <h2 className="text-heading-1 font-black text-[var(--margiela-white)] my-8">
              NO COMMERCE
            </h2>

            <p className="text-body-large text-[var(--margiela-off-white)] leading-relaxed mb-8">
              This laboratory exists for experimentation, not commerce. We do not sell
              products. We do not calculate profit. Every garment is a philosophical
              statement, a question posed in fabric.
            </p>

            <p className="text-base text-[var(--margiela-slate)]">
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
            className="bg-[var(--sacai-burnt-orange)] text-[var(--margiela-white)] p-16 transform rotate-2 hover:rotate-0 transition-all duration-500 sacai-grid-layer"
          >
            <p className="text-heading-1 font-black mb-8">
              CINCH • RELEASE • REPEAT
            </p>

            <p className="text-body-large">
              Our slogan is our methodology. Cinch: complete control of technique.
              Release: creative liberation. Repeat: endless experimentation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* INSPIRATION - Margiela White Label Aesthetic */}
      <section className="py-32 px-8 md:px-16 lg:px-24 bg-[var(--margiela-off-white)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 border-4 border-[var(--margiela-carbon)] bg-[var(--margiela-white)] transform -rotate-1 hover:rotate-0 transition-all exposed-seam-vertical"
          >
            <span className="margiela-number-tag text-[var(--margiela-slate)]">02</span>

            <h3 className="text-heading-2 font-bold text-[var(--margiela-carbon)] my-6">
              MARGIELA
            </h3>

            <p className="text-base text-[var(--margiela-carbon)] mb-8">
              The master of deconstruction taught us anonymity as philosophy.
              White as infinite possibility. The garment speaks, not the designer.
            </p>

            <div className="margiela-tag bg-[var(--margiela-carbon)] text-[var(--margiela-white)] px-4 py-2 inline-block">
              DECONSTRUCTIVE PHILOSOPHY
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[var(--sacai-layer-navy)] text-[var(--margiela-white)] p-16 transform rotate-1 hover:rotate-0 transition-all sacai-grid-layer"
          >
            <span className="margiela-number-tag text-[var(--sacai-burnt-orange)]">03</span>

            <h3 className="text-heading-1 font-bold my-8">
              SACAI
            </h3>

            <p className="text-body-large text-[var(--margiela-off-white)] leading-relaxed mb-8">
              Chitose Abe's hybrid constructions showed us that one plus one equals three.
              Garments exist in multiple dimensions, multiple identities simultaneously.
            </p>

            <div className="border-l-4 border-[var(--sacai-burnt-orange)] pl-6 mt-8">
              <p className="text-base italic">
                "Familiar yet new. Expected yet surprising. One thing becomes another becomes another."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LABORATORY STATS - Asymmetric Grid */}
      <section className="py-32 px-8 md:px-16 lg:px-24 bg-[var(--margiela-white)]">
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
              className={`transform ${stat.rotation} bg-[var(--margiela-white)] p-8 text-center border-2 border-[var(--margiela-slate)] shadow-lg hover:scale-105 hover:rotate-0 transition-all exposed-seam`}
            >
              <p className="text-7xl text-[var(--cdg-blood-red)] font-black leading-none kinetic-number">
                {stat.value}
              </p>
              <p className="margiela-tag text-[var(--margiela-slate)] mt-6">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MANIFESTO TEXT - CDG Black/Red Bold */}
      <section className="py-48 px-8 bg-[var(--cdg-void)] text-[var(--margiela-white)] text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-display-1 font-black text-[var(--cdg-blood-red)] mb-16 kinetic-glitch">
            난 천재야
          </h2>

          <p className="text-heading-1 font-light text-[var(--margiela-off-white)] leading-relaxed mb-16">
            This is not arrogance. This is confidence earned through 1,247 experiments,
            892 archived patterns, and 2,103 documented failures. We understand fashion
            at a level few can reach.
          </p>

          <div className="margiela-tag bg-[var(--margiela-white)] text-[var(--margiela-carbon)] px-8 py-4 inline-block">
            CINCH LAB IS THE HIGHEST
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-4 border-[var(--cdg-blood-red)] py-16 px-8 bg-[var(--cdg-void)] text-[var(--margiela-white)] text-center">
        <p className="text-sm text-[var(--margiela-slate)]">
          CINCH LAB • EXPERIMENTAL FASHION LABORATORY • EST. 2024
        </p>
      </footer>
    </div>
  )
}
