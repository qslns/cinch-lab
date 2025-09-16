'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import CipherText from '@/components/CipherText'

// Timeline
const timeline = [
  {
    id: 'origin',
    year: '2020',
    title: 'ORIGIN',
    description: 'Founded with a vision to redefine fashion through minimalist expression and technical innovation.'
  },
  {
    id: 'evolution',
    year: '2021',
    title: 'EVOLUTION',
    description: 'Expanded our creative boundaries, merging traditional craftsmanship with digital aesthetics.'
  },
  {
    id: 'expansion',
    year: '2022',
    title: 'EXPANSION',
    description: 'Developed 475+ unique visual concepts, establishing our signature aesthetic language.'
  },
  {
    id: 'refinement',
    year: '2023',
    title: 'REFINEMENT',
    description: 'Focused on perfecting our craft, creating timeless pieces that transcend seasonal trends.'
  },
  {
    id: 'present',
    year: '2024',
    title: 'PRESENT',
    description: 'Continuing to push boundaries while maintaining our commitment to minimalist excellence.'
  }
]

// Team structure
const team = [
  { name: 'CREATIVE', role: 'Direction & Vision' },
  { name: 'DESIGN', role: 'Form & Function' },
  { name: 'TECHNICAL', role: 'Innovation & Craft' },
  { name: 'DIGITAL', role: 'Experience & Interface' }
]

// Core values
const values = [
  'Minimalism as maximum expression',
  'Quality over quantity',
  'Innovation through simplicity',
  'Timeless over trendy',
  'Craft before commerce'
]

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState(0)
  const { scrollYProgress } = useScroll()

  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.1], [0.95, 1])

  return (
    <motion.div
      className="min-h-screen bg-white"
      style={{ opacity, scale }}
    >
      {/* Subtle grid overlay */}
      <div className="grid-overlay" />

      {/* Header */}
      <motion.section
        className="pt-8 pb-12 px-8 md:px-20 border-b border-black/5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-hero mb-4"><CipherText text="ABOUT" /></h1>
        <p className="text-label text-gray-600"><CipherText text="THE CINCH LAB PHILOSOPHY" /></p>
      </motion.section>

      {/* Main Content */}
      <section className="px-8 md:px-20 py-20">
        {/* Hero Statement */}
        <motion.div
          className="max-w-4xl mx-auto mb-32 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-light mb-8 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <CipherText text="Fashion's Extreme Limits" />
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <CipherText text="Where minimalism meets maximum expression. A laboratory for pushing boundaries through restraint, precision, and relentless innovation." />
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto mb-32">
          <motion.h3
            className="text-sm tracking-[0.2em] mb-12 text-center text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <CipherText text="TIMELINE" />
          </motion.h3>

          <div className="space-y-16">
            {timeline.map((item, index) => (
              <motion.div
                key={item.id}
                className="grid grid-cols-12 gap-4 md:gap-8 items-start"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="col-span-3 md:col-span-2 text-right">
                  <span className="text-sm text-gray-500"><CipherText text={item.year} /></span>
                </div>
                <div className="col-span-1 md:col-span-2 flex justify-center">
                  <div className="w-2 h-2 bg-black rounded-full mt-2" />
                </div>
                <div className="col-span-8">
                  <h4 className="text-xl font-medium mb-2"><CipherText text={item.title} /></h4>
                  <p className="text-gray-600 text-sm md:text-base"><CipherText text={item.description} /></p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Structure */}
        <motion.div
          className="max-w-5xl mx-auto mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-sm tracking-[0.2em] mb-12 text-center text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <CipherText text="STRUCTURE" />
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {team.map((dept, index) => (
              <motion.div
                key={dept.name}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="text-2xl font-light mb-2 group-hover:tracking-wider transition-all duration-300">
                  <CipherText text={dept.name} />
                </h4>
                <p className="text-sm text-gray-600"><CipherText text={dept.role} /></p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          className="max-w-4xl mx-auto mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-sm tracking-[0.2em] mb-12 text-center text-gray-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <CipherText text="VALUES" />
          </motion.h3>

          <div className="space-y-8">
            {values.map((value, index) => (
              <motion.div
                key={value}
                className="text-lg md:text-xl text-center relative group cursor-default"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CipherText text={value} />
                <motion.div
                  className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-2 h-[1px] bg-black opacity-0 group-hover:opacity-100 group-hover:-left-8 transition-all duration-300"
                />
                <motion.div
                  className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-2 h-[1px] bg-black opacity-0 group-hover:opacity-100 group-hover:-right-8 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          className="max-w-5xl mx-auto mb-32"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { number: '475+', label: 'Visuals Created' },
              { number: '5', label: 'Years of Innovation' },
              { number: '100%', label: 'Commitment' },
              { number: '1', label: 'Vision' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <h4 className="text-3xl md:text-4xl font-light mb-2 group-hover:font-normal transition-all">
                  <CipherText text={String(stat.number)} />
                </h4>
                <p className="text-xs tracking-[0.15em] text-gray-500">
                  <CipherText text={stat.label.toUpperCase()} />
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-lg md:text-xl mb-8 text-gray-600">
            <CipherText text="Interested in our vision?" />
          </p>

          <motion.div
            className="inline-block"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/contact"
              className="inline-block px-8 py-3 border border-black text-sm tracking-[0.15em] hover:bg-black hover:text-white transition-colors duration-300"
            >
              <CipherText text="GET IN TOUCH" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-black/5 mt-32">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-xs tracking-[0.2em] text-gray-500">
            <CipherText text="CINCH LAB © 2020-2024" />
          </p>
        </div>
      </footer>
    </motion.div>
  )
}