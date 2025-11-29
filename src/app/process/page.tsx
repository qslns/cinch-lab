'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// Process/experimentation data
const processItems = [
  {
    id: 1,
    title: 'Pattern Deconstruction',
    category: 'TECHNIQUE',
    description: 'Breaking down traditional pattern blocks to understand and reimagine garment construction. Each piece is taken apart, analyzed, and reassembled with intentional imperfection.',
    status: 'ongoing',
  },
  {
    id: 2,
    title: 'Material Manipulation',
    category: 'RESEARCH',
    description: 'Exploring how fabrics respond to unconventional treatments. Heat, tension, layering, and destruction become tools for creating new textures.',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Volume Studies',
    category: 'EXPERIMENT',
    description: 'Investigating the relationship between body and space. How much air can a garment hold? Where does the body end and the clothes begin?',
    status: 'ongoing',
  },
  {
    id: 4,
    title: 'Toile Documentation',
    category: 'PROCESS',
    description: 'Every prototype tells a story. The muslin iterations, the pinned adjustments, the marks of making. These are preserved as artifacts of the creative journey.',
    status: 'archive',
  },
  {
    id: 5,
    title: 'Failed Experiments',
    category: 'LEARNING',
    description: 'Not every attempt succeeds. These documented failures are as valuable as successes—each one teaches something essential about the limits of materials and techniques.',
    status: 'archive',
  },
  {
    id: 6,
    title: 'Seam Architecture',
    category: 'TECHNIQUE',
    description: 'Treating seams as design elements rather than hidden necessities. Exposed, exaggerated, and celebrated structural lines become the decoration itself.',
    status: 'ongoing',
  },
]

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-yon-white">
      {/* Header */}
      <section className="pt-32 pb-16 md:pb-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-mono text-micro text-yon-grey tracking-widest uppercase">
              Behind the work
            </span>
            <h1 className="mt-4 font-serif text-display text-yon-black transform rotate-[-0.5deg]">
              Process
            </h1>
            <p className="mt-6 text-body-lg text-yon-steel max-w-xl">
              The journey matters as much as the destination. Here, the making process
              is documented—the experiments, the failures, and the discoveries along the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Items */}
      <section className="pb-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-24 md:space-y-32">
            {processItems.map((item, index) => {
              const isEven = index % 2 === 0

              return (
                <motion.article
                  key={item.id}
                  className={`flex flex-col md:flex-row gap-8 md:gap-16 ${
                    isEven ? '' : 'md:flex-row-reverse'
                  }`}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                >
                  {/* Image placeholder */}
                  <div className="w-full md:w-1/2">
                    <div
                      className="relative aspect-[4/3] bg-yon-platinum overflow-hidden"
                      style={{
                        transform: `rotate(${isEven ? '-1deg' : '1deg'})`
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-mono text-sm text-yon-grey">
                          PROCESS {String(item.id).padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-mono text-micro text-yon-grey tracking-widest uppercase">
                        {item.category}
                      </span>
                      <span className={`font-mono text-micro tracking-widest uppercase ${
                        item.status === 'ongoing'
                          ? 'text-yon-accent'
                          : item.status === 'completed'
                          ? 'text-yon-grey'
                          : 'text-yon-silver'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <h2 className="font-serif text-heading text-yon-black transform rotate-[-0.3deg]">
                      {item.title}
                    </h2>
                    <p className="mt-4 text-body text-yon-steel leading-relaxed">
                      {item.description}
                    </p>
                    <div className="mt-6">
                      <span className="font-mono text-micro text-yon-grey">
                        {String(index + 1).padStart(2, '0')} / {String(processItems.length).padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-yon-ivory">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-serif text-title text-yon-black transform rotate-[-0.5deg]">
              The making is the meaning
            </h2>
            <p className="mt-8 text-body-lg text-yon-steel leading-relaxed max-w-2xl mx-auto">
              In a world of instant everything, we choose to slow down. Every stitch is deliberate,
              every choice intentional. The process itself becomes the art—documented, shared,
              and celebrated.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-micro text-yon-grey tracking-widest uppercase mb-8">
              See the results
            </p>
            <Link
              href="/collections"
              className="inline-block font-serif text-heading text-yon-black hover:text-yon-accent transition-colors duration-300"
            >
              View Collections →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
