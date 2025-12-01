'use client'

import { motion } from 'framer-motion'

const yonEase = [0.22, 1, 0.36, 1] as const

export default function PhilosophySection() {
  return (
    <section className="relative py-40 md:py-56 lg:py-72 px-6 md:px-8 lg:px-12 bg-yon-ivory overflow-hidden">
      {/* Asymmetric layout - shifted right */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="md:ml-auto md:mr-16 lg:mr-24 md:max-w-xl lg:max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: yonEase }}
        >
          <p className="font-serif text-xl md:text-2xl lg:text-3xl text-yon-black leading-relaxed italic">
            Twisted yet harmonious
          </p>
        </motion.div>
      </div>
    </section>
  )
}
