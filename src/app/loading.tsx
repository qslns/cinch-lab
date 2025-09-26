'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function BrutalistLoadingPage() {
  const [loadingPhase, setLoadingPhase] = useState(0)
  const [systemStatus, setSystemStatus] = useState('INITIALIZING')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Progress simulation
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100
        return prev + Math.random() * 15
      })
    }, 200)

    // Loading phases
    const phases = [
      'INITIALIZING',
      'LOADING_EXPERIMENTS',
      'CALIBRATING_SYSTEMS',
      'ANALYZING_PATTERNS',
      'PREPARING_LABORATORY'
    ]

    const phaseTimer = setInterval(() => {
      setLoadingPhase(prev => (prev + 1) % phases.length)
    }, 800)

    // Update system status
    const statusTimer = setInterval(() => {
      setSystemStatus(phases[loadingPhase])
    }, 800)

    return () => {
      clearInterval(progressTimer)
      clearInterval(phaseTimer)
      clearInterval(statusTimer)
    }
  }, [loadingPhase])

  return (
    <div className="fixed inset-0 bg-carbon-black z-50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 scientific-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 scan-lines pointer-events-none" />

      {/* Glitch Overlay */}
      <motion.div
        className="absolute inset-0 noise-overlay"
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />

      <div className="relative h-full flex items-center justify-center">
        <div className="text-center max-w-2xl w-full px-8">
          {/* Main Loading Animation */}
          <div className="mb-12 relative">
            <motion.div
              className="w-32 h-32 mx-auto relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              {/* Outer Ring */}
              <div className="absolute inset-0 border-4 border-safety-orange" />

              {/* Inner Ring */}
              <motion.div
                className="absolute inset-4 border-2 border-white"
                animate={{ rotate: -720 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />

              {/* Core */}
              <motion.div
                className="absolute inset-8 bg-glitch-red"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.5, 1]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>

            {/* Corner Markers */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-white" />
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-white" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-white" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-white" />
          </div>

          {/* Title */}
          <motion.h1
            className="text-4xl font-black text-white mb-8 brutalist-heading"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            CINCH_LAB
          </motion.h1>

          {/* System Status */}
          <div className="mb-8">
            <p className="text-xs font-mono text-safety-orange mb-2">
              {systemStatus}
            </p>
            <div className="flex items-center justify-center gap-2">
              {[0, 1, 2, 3, 4].map(i => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-white"
                  animate={{
                    opacity: loadingPhase === i ? [0, 1, 0] : 0.2,
                    scale: loadingPhase === i ? [1, 1.5, 1] : 1
                  }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="h-1 bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-safety-orange to-glitch-red"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ type: 'spring', damping: 20 }}
              />
            </div>
            <div className="mt-2 text-[10px] font-mono text-white/60">
              {Math.floor(Math.min(progress, 100))}% LOADED
            </div>
          </div>

          {/* Loading Messages */}
          <motion.div
            className="mt-8 space-y-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-[10px] font-mono text-white/40">
              EXPERIMENT_STATUS: PREPARING
            </p>
            <p className="text-[10px] font-mono text-white/40">
              DANGER_LEVEL: CALCULATING...
            </p>
            <p className="text-[10px] font-mono text-white/40">
              FASHION_MATRIX: BOOTING
            </p>
          </motion.div>

          {/* Animated Dots */}
          <motion.div
            className="mt-8 flex justify-center gap-4"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-white text-2xl">•</span>
            <span className="text-safety-orange text-2xl">•</span>
            <span className="text-glitch-red text-2xl">•</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/5 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <p className="text-[10px] font-mono text-white/60">
            CINCH_LAB_V2025.1.0
          </p>
          <p className="text-[10px] font-mono text-hazmat-green">
            SYSTEM_BOOT_IN_PROGRESS
          </p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-8 left-8 w-16 h-16 border border-white/20 animate-pulse" />
      <div className="absolute top-8 right-8 w-16 h-16 border border-white/20 animate-pulse animation-delay-500" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border border-white/20 animate-pulse animation-delay-1000" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border border-white/20 animate-pulse animation-delay-1500" />
    </div>
  )
}