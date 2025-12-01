'use client'

import { motion } from 'framer-motion'

const yonEase = [0.22, 1, 0.36, 1] as const

export default function ContactCTASection() {
  return (
    <section className="relative py-32 md:py-40 lg:py-48 px-6 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <motion.a
          href="mailto:hello@theyon.com"
          className="group relative inline-block font-mono text-xs tracking-wider text-yon-grey hover:text-yon-black transition-colors duration-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: yonEase }}
        >
          <span>hello@theyon.com</span>
          {/* Animated underline */}
          <span className="absolute bottom-0 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300" />
        </motion.a>
      </div>
    </section>
  )
}
