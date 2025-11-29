'use client'

import { motion } from 'framer-motion'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-yon-white flex items-center justify-center px-6 md:px-12">
      <motion.div
        className="max-w-2xl w-full text-center py-32"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-mono text-micro text-yon-grey tracking-widest uppercase">
          Get in touch
        </span>
        <h1 className="mt-4 font-serif text-display text-yon-black transform rotate-[-0.5deg]">
          Contact
        </h1>

        <p className="mt-8 text-body-lg text-yon-steel">
          For collaborations, exhibitions, press inquiries, or just to say hello.
        </p>

        {/* Contact Info */}
        <div className="mt-16 space-y-8">
          {/* Email */}
          <div>
            <span className="font-mono text-micro text-yon-grey tracking-widest uppercase block mb-3">
              Email
            </span>
            <a
              href="mailto:hello@theyon.com"
              className="font-serif text-heading text-yon-black hover:text-yon-accent transition-colors duration-300"
            >
              hello@theyon.com
            </a>
          </div>

          {/* Instagram */}
          <div>
            <span className="font-mono text-micro text-yon-grey tracking-widest uppercase block mb-3">
              Instagram
            </span>
            <a
              href="https://instagram.com/theyon_studio"
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-heading text-yon-black hover:text-yon-accent transition-colors duration-300"
            >
              @theyon_studio
            </a>
          </div>
        </div>

        {/* Note */}
        <motion.p
          className="mt-24 text-caption text-yon-grey max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          THE YON is not a commercial brand. We focus on experimental fashion research
          and creative collaborations. For exhibition or partnership inquiries, please
          reach out via email.
        </motion.p>
      </motion.div>
    </div>
  )
}
