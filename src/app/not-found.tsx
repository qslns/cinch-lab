'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function NotFound() {
  const [glitchText, setGlitchText] = useState('404')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 150 })
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 150 })

  useEffect(() => {
    // Sophisticated glitch effect
    const glitchChars = '!@#$%^&*()_+{}[]|;:<>?/'
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitchText(
          '404'
            .split('')
            .map(char => Math.random() > 0.7 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char)
            .join('')
        )
        setTimeout(() => setGlitchText('404'), 100)
      }
    }, 100)

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      mouseX.set(e.clientX - window.innerWidth / 2)
      mouseY.set(e.clientY - window.innerHeight / 2)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearInterval(interval)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])

  return (
    <div className="min-h-screen bg-raw-canvas flex items-center justify-center relative overflow-hidden">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-raw-canvas via-paper to-raw-canvas opacity-50" />

      {/* Mouse Follow Effect */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-specimen-red/5 blur-3xl pointer-events-none"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      />

      {/* Decorative Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* 404 Text with Sophisticated Glitch */}
        <div className="relative mb-12">
          <motion.h1
            className="text-[200px] md:text-[300px] font-light tracking-tighter leading-none text-carbon relative"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <span className="absolute inset-0 text-specimen-red/20 blur-sm" aria-hidden="true">
              {glitchText}
            </span>
            <span className="relative">{glitchText}</span>
          </motion.h1>

          {/* Margiela-style exposed structure lines */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-carbon/10" />
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-carbon/10" />
        </div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 mb-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-concrete">
            Page Not Found
          </p>
          <div className="w-16 h-px bg-carbon mx-auto" />
          <p className="text-sm font-light text-concrete max-w-md mx-auto">
            This experiment has been deconstructed beyond recognition.<br/>
            The page you're looking for exists only in theory.
          </p>
          <p className="text-xs font-mono text-concrete/50">
            Error_Code: MARGIELA_SACAI_NULL_VOID
          </p>
        </motion.div>

        {/* Return Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/">
            <motion.button
              className="group relative px-8 py-4 bg-transparent border border-carbon/20 text-carbon hover:bg-carbon hover:text-raw-canvas transition-all duration-500"
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xs uppercase tracking-[0.3em]">
                Return to Laboratory
              </span>
              <motion.span
                className="inline-block ml-3"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>

              {/* Hover effect overlay */}
              <motion.div
                className="absolute inset-0 bg-carbon"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.button>
          </Link>
        </motion.div>

        {/* Navigation Suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {[
            { label: 'Lab', path: '/lab' },
            { label: 'Archive', path: '/archive' },
            { label: 'Collections', path: '/collections' }
          ].map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
            >
              <Link
                href={link.path}
                className="block p-3 text-xs uppercase tracking-wider text-concrete hover:text-carbon transition-colors"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Corner Markers - Margiela style */}
      <div className="absolute top-8 left-8">
        <div className="w-8 h-px bg-carbon/20" />
        <div className="w-px h-8 bg-carbon/20" />
      </div>
      <div className="absolute top-8 right-8">
        <div className="w-8 h-px bg-carbon/20 ml-auto" />
        <div className="w-px h-8 bg-carbon/20 ml-auto" />
      </div>
      <div className="absolute bottom-8 left-8">
        <div className="w-8 h-px bg-carbon/20 mt-auto" />
        <div className="w-px h-8 bg-carbon/20 -mt-8" />
      </div>
      <div className="absolute bottom-8 right-8">
        <div className="w-8 h-px bg-carbon/20 ml-auto mt-auto" />
        <div className="w-px h-8 bg-carbon/20 ml-auto -mt-8" />
      </div>
    </div>
  )
}