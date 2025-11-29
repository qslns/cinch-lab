'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Footer from '@/components/Footer'

// Scattered decorative elements
const decorativeElements = [
  {
    id: 1,
    type: 'shape',
    position: { top: '10%', left: '5%' },
    size: 'w-[20vw] md:w-[12vw]',
    rotation: -8,
    variant: 'light' as const,
  },
  {
    id: 2,
    type: 'shape',
    position: { top: '25%', right: '8%' },
    size: 'w-[15vw] md:w-[10vw]',
    rotation: 12,
    variant: 'medium' as const,
  },
  {
    id: 3,
    type: 'shape',
    position: { bottom: '20%', left: '10%' },
    size: 'w-[18vw] md:w-[8vw]',
    rotation: -3,
    variant: 'dark' as const,
  },
]

const variantStyles = {
  light: 'bg-yon-platinum',
  medium: 'bg-yon-silver',
  dark: 'bg-yon-charcoal',
}

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const parallax1 = useTransform(scrollYProgress, [0, 1], [0, -40])
  const parallax2 = useTransform(scrollYProgress, [0, 1], [0, -80])

  return (
    <div ref={containerRef} className="min-h-screen bg-yon-white relative overflow-hidden">
      {/* Scattered decorative shapes */}
      {decorativeElements.map((el, index) => (
        <motion.div
          key={el.id}
          className={`absolute ${el.size} pointer-events-none`}
          style={{
            ...el.position,
            y: index % 2 === 0 ? parallax1 : parallax2,
            zIndex: 1,
          }}
          initial={{ opacity: 0, scale: 0.8, rotate: el.rotation - 10 }}
          animate={{ opacity: 0.6, scale: 1, rotate: el.rotation }}
          transition={{
            duration: 1.2,
            delay: 0.5 + index * 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div
            className={`${variantStyles[el.variant]} w-full`}
            style={{ aspectRatio: '1/1' }}
          />
        </motion.div>
      ))}

      {/* Decorative large letter */}
      <span className="absolute top-20 right-[-5%] font-mono text-[200px] md:text-[400px] text-yon-platinum/20 leading-none select-none pointer-events-none">
        C
      </span>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 py-32">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            {/* Left column - Title */}
            <motion.div
              className="md:col-span-5"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-mono text-xs text-yon-grey tracking-[0.2em] uppercase">
                Get in touch
              </span>
              <h1 className="mt-4 font-serif text-[12vw] md:text-[6vw] text-yon-black leading-[0.9]">
                <span className="block transform rotate-[-1deg]">Con</span>
                <span className="block transform rotate-[0.5deg] ml-[10%]">tact</span>
              </h1>

              <motion.p
                className="mt-8 text-lg text-yon-steel leading-relaxed max-w-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                For collaborations, exhibitions, press inquiries, or just to say hello.
              </motion.p>
            </motion.div>

            {/* Right column - Contact info */}
            <motion.div
              className="md:col-span-6 md:col-start-7 md:mt-16"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Contact items */}
              <div className="space-y-12">
                {/* Email */}
                <motion.div
                  className="group"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-mono text-xs text-yon-grey tracking-[0.2em] uppercase block mb-3">
                    01 — Email
                  </span>
                  <a
                    href="mailto:hello@theyon.com"
                    className="group/link font-serif text-2xl md:text-3xl text-yon-black hover:text-yon-accent focus-visible:text-yon-accent transition-colors duration-300 inline-flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-yon-black focus-visible:ring-offset-4"
                  >
                    <span>hello@theyon.com</span>
                    <span className="opacity-0 group-hover/link:opacity-100 transform -translate-x-2 group-hover/link:translate-x-0 transition-all duration-300">→</span>
                  </a>
                </motion.div>

                {/* Instagram */}
                <motion.div
                  className="group"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-mono text-xs text-yon-grey tracking-[0.2em] uppercase block mb-3">
                    02 — Instagram
                  </span>
                  <a
                    href="https://instagram.com/theyon_studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link font-serif text-2xl md:text-3xl text-yon-black hover:text-yon-accent focus-visible:text-yon-accent transition-colors duration-300 inline-flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-yon-black focus-visible:ring-offset-4"
                  >
                    <span>@theyon_studio</span>
                    <svg className="w-4 h-4 opacity-50 group-hover/link:opacity-100 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </motion.div>

                {/* Location */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="font-mono text-xs text-yon-grey tracking-[0.2em] uppercase block mb-3">
                    03 — Based in
                  </span>
                  <p className="font-serif text-2xl md:text-3xl text-yon-black">
                    <span className="block">Seoul &</span>
                    <span className="block ml-[5%]">Tokyo</span>
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Bottom note - rotated */}
          <motion.div
            className="mt-24 md:mt-32 relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Decorative line */}
            <div className="w-16 h-px bg-yon-silver mb-8" />

            <p className="text-sm text-yon-grey max-w-md leading-relaxed">
              THE YON is not a commercial brand. We focus on experimental fashion research
              and creative collaborations. For exhibition or partnership inquiries, please
              reach out via email.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom decorative section */}
      <section className="relative py-24 md:py-32 bg-yon-charcoal overflow-hidden">
        {/* Scattered numbers */}
        <span className="absolute top-8 left-8 font-mono text-[100px] md:text-[180px] text-yon-graphite/20 leading-none select-none pointer-events-none transform rotate-[-5deg]">
          04
        </span>
        <span className="absolute bottom-8 right-8 font-mono text-[80px] md:text-[140px] text-yon-graphite/15 leading-none select-none pointer-events-none transform rotate-[8deg]">
          ∞
        </span>

        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-yon-white leading-[1.3]">
              <span className="block">Every conversation</span>
              <span className="block">is a new possibility</span>
            </p>
            <p className="mt-8 font-mono text-xs text-yon-silver tracking-[0.2em] uppercase">
              THE YON — Beyond Fashion
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
