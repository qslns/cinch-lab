'use client'

import { motion } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'

// THE YON custom easing - smoother, more luxurious feel
const yonEase = [0.22, 1, 0.36, 1] as const

interface TemplateProps {
  children: ReactNode
}

export default function Template({ children }: TemplateProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Skip animation if user prefers reduced motion
  if (prefersReducedMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  )
}
