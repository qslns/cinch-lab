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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: yonEase }}
        >
          <a
            href="mailto:hello@theyon.com"
            className="font-mono text-base md:text-lg text-yon-black hover:text-yon-grey transition-colors tracking-wider"
          >
            hello@theyon.com
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
