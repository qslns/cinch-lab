'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  const [glitchText, setGlitchText] = useState(false)
  const [errorCode, setErrorCode] = useState('404')

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchText(true)
      setErrorCode(Math.random() > 0.5 ? '404' : '4O4')
      setTimeout(() => setGlitchText(false), 200)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-carbon-black flex items-center justify-center relative">
      {/* Background Grid */}
      <div className="fixed inset-0 scientific-grid opacity-20 pointer-events-none" />
      <div className="fixed inset-0 noise-overlay opacity-30 pointer-events-none" />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <h1 className={`text-[150px] md:text-[300px] font-black ${glitchText ? 'glitch-text' : ''} text-glitch-red`}>
            {errorCode}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            EXPERIMENT_NOT_FOUND
          </h2>
          <p className="text-xs font-mono text-white/60">
            CRITICAL_ERROR: REQUESTED_RESOURCE_DOES_NOT_EXIST
          </p>
          <p className="text-[10px] font-mono text-safety-orange">
            ERROR_CODE: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 space-y-4"
        >
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-white text-carbon-black font-mono text-sm hover:bg-safety-orange transition-colors"
          >
            RETURN_TO_LABORATORY →
          </Link>

          <div className="text-[10px] font-mono text-white/40 mt-8">
            <div>SYSTEM_STATUS: OPERATIONAL</div>
            <div>REDIRECT_AVAILABLE: TRUE</div>
            <div>RECOVERY_PROTOCOL: ENGAGED</div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 border-2 border-warning-yellow/20 rotate-45" />
        <div className="absolute -bottom-20 -right-20 w-40 h-40 border-2 border-centrifuge-blue/20 rotate-12" />
      </div>
    </div>
  )
}