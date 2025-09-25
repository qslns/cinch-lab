'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const [glitchActive, setGlitchActive] = useState(false)
  const [errorCode, setErrorCode] = useState('500')
  const [systemMessages, setSystemMessages] = useState<string[]>([])

  useEffect(() => {
    // Log the error
    console.error('Application error:', error)

    // Generate random error code
    setErrorCode(Math.floor(400 + Math.random() * 200).toString())

    // Glitch effect timer
    const glitchTimer = setInterval(() => {
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 200)
    }, 3000)

    // System messages simulation
    const messages = [
      'SYSTEM_FAILURE_DETECTED',
      'ATTEMPTING_RECOVERY',
      'MEMORY_DUMP_INITIATED',
      'FASHION_MATRIX_CORRUPTED',
      'LABORATORY_BREACH',
      'EXPERIMENTAL_ERROR',
      'AESTHETIC_OVERFLOW'
    ]

    const messageTimer = setInterval(() => {
      const msg = messages[Math.floor(Math.random() * messages.length)]
      setSystemMessages(prev => [...prev.slice(-4), msg])
    }, 1500)

    return () => {
      clearInterval(glitchTimer)
      clearInterval(messageTimer)
    }
  }, [error])

  return (
    <div className="min-h-screen bg-carbon-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 scientific-grid opacity-20 pointer-events-none" />
      <div className="fixed inset-0 scan-lines pointer-events-none" />
      <div className="noise-overlay" />

      {/* Glitch Overlay */}
      <AnimatePresence>
        {glitchActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-glitch-red/10 mix-blend-screen pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          {/* Error Header */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className={`text-[clamp(80px,15vw,200px)] font-black brutalist-heading leading-[0.8] text-glitch-red ${glitchActive ? 'glitch-text' : ''}`} data-text={`ERROR_${errorCode}`}>
              ERROR_{errorCode}
            </h1>
            <div className="mt-4 h-3 bg-glitch-red" style={{ width: `${Math.random() * 100}%` }} />
          </motion.div>

          {/* System Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <div className="bg-white p-6 border-3 border-carbon-black">
              <h2 className="text-xs font-mono font-bold mb-4">SYSTEM_STATUS</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span>LABORATORY:</span>
                  <span className="text-glitch-red">COMPROMISED</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span>EXPERIMENTS:</span>
                  <span className="text-warning-yellow">SUSPENDED</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span>FASHION_MATRIX:</span>
                  <span className="text-glitch-red flicker">OFFLINE</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span>RECOVERY_MODE:</span>
                  <span className="text-hazmat-green">ACTIVE</span>
                </div>
              </div>
            </div>

            <div className="bg-carbon-black text-white p-6 border-3 border-white">
              <h2 className="text-xs font-mono font-bold mb-4">ERROR_LOG</h2>
              <div className="space-y-1 font-mono text-[10px] opacity-80">
                <AnimatePresence mode="popLayout">
                  {systemMessages.map((msg, index) => (
                    <motion.div
                      key={msg + index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 20, opacity: 0 }}
                      className="text-hazmat-green"
                    >
                      [{new Date().toISOString().split('T')[1].split('.')[0]}] {msg}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div className="animate-pulse">_</div>
              </div>
            </div>
          </div>

          {/* Error Details */}
          <div className="bg-concrete-gray p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-3 lab-warning" />
            <h3 className="text-2xl font-black text-white mb-4">MALFUNCTION_DETAILS</h3>
            <p className="text-sm text-gray-300 font-mono leading-relaxed">
              The laboratory's experimental systems have encountered a critical error.
              Fashion protocols have been disrupted. Aesthetic parameters exceed safe thresholds.
              Immediate intervention required.
            </p>
            {error.message && (
              <div className="mt-4 p-4 bg-carbon-black/50 border border-glitch-red/30">
                <p className="text-xs font-mono text-glitch-red">
                  TECHNICAL_ERROR: {error.message}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              onClick={reset}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-8 py-4 bg-glitch-red text-white font-black text-sm tracking-wider hover:bg-red-700 transition-all duration-300 border-3 border-carbon-black"
            >
              RESTART_EXPERIMENT
            </motion.button>

            <Link href="/" className="flex-1">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-white text-carbon-black font-black text-sm tracking-wider hover:bg-paper-white transition-all duration-300 border-3 border-carbon-black text-center"
              >
                EVACUATE_TO_LAB
              </motion.div>
            </Link>
          </div>

          {/* Emergency Protocol */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 p-4 border border-warning-yellow/30 bg-warning-yellow/5"
          >
            <p className="text-[10px] font-mono text-warning-yellow text-center">
              EMERGENCY_PROTOCOL_ACTIVATED • CINCH_LAB_2025 • ERROR_ID: {error.digest || 'UNKNOWN'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="fixed top-4 left-4 w-8 h-8 border-t-3 border-l-3 border-glitch-red" />
      <div className="fixed top-4 right-4 w-8 h-8 border-t-3 border-r-3 border-glitch-red" />
      <div className="fixed bottom-4 left-4 w-8 h-8 border-b-3 border-l-3 border-glitch-red" />
      <div className="fixed bottom-4 right-4 w-8 h-8 border-b-3 border-r-3 border-glitch-red" />
    </div>
  )
}