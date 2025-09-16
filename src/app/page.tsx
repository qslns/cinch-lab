'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState('')
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Generate floating particles
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 15 + Math.random() * 20
  }))

  return (
    <div className="fixed inset-0 bg-white overflow-hidden">
      {/* Subtle floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-black/10 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Main Typography */}
      <div className="h-full flex items-center justify-center relative">
        <div className="text-center">
          <motion.h1
            className="text-[clamp(48px,12vw,180px)] font-thin leading-[0.8] tracking-tighter select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <div className="mb-[0.1em]">FASHION</div>
            <div className="mb-[0.1em] font-extralight italic opacity-60">EXTREME</div>
            <div className="mb-[0.1em]">TECHNICAL</div>
            <motion.div
              className="relative inline-block group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <span className="relative">
                LABORATORY
                <motion.span
                  className="absolute inset-0 text-transparent"
                  style={{
                    WebkitTextStroke: '1px black'
                  } as React.CSSProperties}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  LABORATORY
                </motion.span>
              </span>
              {/* LAB hover effect */}
              <motion.span
                className="absolute left-0 top-0 text-[0.6em] font-normal opacity-0 -translate-x-4"
                whileHover={{ opacity: 0.4, translateX: -40 }}
                transition={{ duration: 0.3 }}
              >
                LAB
              </motion.span>
            </motion.div>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mt-12 text-[11px] tracking-[0.3em] text-black/40 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            CINCH × RELEASE × REPEAT
          </motion.p>
        </div>
      </div>

      {/* Corner decorative elements */}
      <motion.div
        className="absolute top-8 left-8 w-4 h-4 border-l border-t border-black/20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
      <motion.div
        className="absolute top-8 right-8 w-4 h-4 border-r border-t border-black/20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      />
      <motion.div
        className="absolute bottom-8 left-8 w-4 h-4 border-l border-b border-black/20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-4 h-4 border-r border-b border-black/20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
      />

      {/* Minimalist time display */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[10px] tracking-[0.2em] text-black/30 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        {currentTime}
      </motion.div>

      {/* Custom cursor follower - subtle */}
      <motion.div
        className="fixed w-8 h-8 border border-black/10 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      />
    </div>
  )
}