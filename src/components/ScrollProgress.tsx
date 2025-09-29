'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <motion.div
      className="scroll-progress fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-specimen-red via-splice-orange to-chemical-blue origin-left z-[9999]"
      style={{ scaleX }}
    />
  )
}