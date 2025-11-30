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
      className="fixed top-[64px] md:top-[80px] left-0 right-0 h-[2px] bg-yon-accent origin-left z-[999]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}
