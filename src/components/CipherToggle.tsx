'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useCipher } from '@/contexts/CipherContext'

interface CipherToggleProps {
  className?: string
  variant?: 'default' | 'minimal'
}

export default function CipherToggle({ className = '', variant = 'default' }: CipherToggleProps) {
  const { isCipherEnabled, toggleCipher } = useCipher()

  if (variant === 'minimal') {
    return (
      <motion.button
        onClick={toggleCipher}
        className={`fixed bottom-8 left-8 z-50 text-[10px] tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        CIPHER: {isCipherEnabled ? 'ON' : 'OFF'}
      </motion.button>
    )
  }

  return (
    <motion.div
      className={`fixed top-20 right-8 z-50 ${className}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.button
        onClick={toggleCipher}
        className="group relative flex items-center gap-3 px-4 py-2 bg-white/90 backdrop-blur-sm border border-black/10 hover:border-black/30 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-[10px] tracking-[0.2em] text-gray-600 group-hover:text-black transition-colors">
          CIPHER
        </span>

        {/* Toggle Switch */}
        <div className="relative w-10 h-5 bg-gray-200 rounded-full transition-colors duration-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={isCipherEnabled ? 'on' : 'off'}
              className={`absolute top-0.5 h-4 w-4 rounded-full ${
                isCipherEnabled ? 'bg-black' : 'bg-gray-400'
              }`}
              initial={false}
              animate={{ x: isCipherEnabled ? 22 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </AnimatePresence>
        </div>

        {/* Status Text */}
        <span className={`text-[10px] tracking-[0.15em] ${
          isCipherEnabled ? 'text-black' : 'text-gray-400'
        } transition-colors`}>
          {isCipherEnabled ? 'ON' : 'OFF'}
        </span>

        {/* Hover Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        />
      </motion.button>

      {/* Info Tooltip */}
      <AnimatePresence>
        {!isCipherEnabled && (
          <motion.div
            className="absolute top-full mt-2 right-0 px-3 py-2 bg-black text-white text-[10px] tracking-wider whitespace-nowrap"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ delay: 0.2 }}
          >
            NORMAL TEXT MODE
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}