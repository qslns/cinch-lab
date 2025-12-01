'use client'

import { motion } from 'framer-motion'
import Footer from '@/components/Footer'

// Custom easing
const yonEase = [0.22, 1, 0.36, 1] as const

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-yon-white">
      {/* Main content - Just the email */}
      <section className="min-h-[80vh] flex items-center justify-center px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: yonEase }}
        >
          <a
            href="mailto:hello@theyon.com"
            className="group relative inline-block font-mono text-sm md:text-base text-yon-black hover:text-yon-grey transition-colors duration-500 tracking-wider"
          >
            <span>hello@theyon.com</span>
            <span className="absolute bottom-0 left-0 w-0 h-px bg-current group-hover:w-full transition-all duration-300" />
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
