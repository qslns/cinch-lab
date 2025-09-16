'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const experiments = [
  {
    id: 'FABRIC',
    title: 'FABRIC',
    description: 'Wave patterns',
    color: '#000000'
  },
  {
    id: 'FORM',
    title: 'FORM',
    description: 'Rotating geometric shapes',
    color: '#333333'
  },
  {
    id: 'VOID',
    title: 'VOID',
    description: 'Expanding circles',
    color: '#666666'
  },
  {
    id: 'TIME',
    title: 'TIME',
    description: 'Clock-like animations',
    color: '#999999'
  }
]

export default function LabPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const renderExperimentVisual = (exp: typeof experiments[0]) => {
    switch (exp.id) {
      case 'FABRIC':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-[2px] bg-black/20"
                style={{
                  top: `${20 + i * 15}%`,
                  animation: `wave ${3 + i * 0.5}s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
            <style jsx>{`
              @keyframes wave {
                0%, 100% { transform: translateX(0) scaleY(1); }
                50% { transform: translateX(10px) scaleY(2); }
              }
            `}</style>
          </div>
        )

      case 'FORM':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-24 h-24 border-2 border-black/20"
              style={{
                animation: 'rotateShape 8s linear infinite'
              }}
            />
            <style jsx>{`
              @keyframes rotateShape {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )

      case 'VOID':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-32 h-32 border border-black/10 rounded-full"
                style={{
                  animation: `expand ${4 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 1}s`
                }}
              />
            ))}
            <style jsx>{`
              @keyframes expand {
                0%, 100% { transform: scale(0); opacity: 0; }
                50% { transform: scale(1); opacity: 0.3; }
              }
            `}</style>
          </div>
        )

      case 'TIME':
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-32 h-32">
              {/* Hour hand */}
              <div
                className="absolute left-1/2 top-1/2 w-[2px] h-10 bg-black/40 origin-bottom"
                style={{
                  transform: 'translate(-50%, -100%)',
                  animation: 'clockHour 120s linear infinite'
                }}
              />
              {/* Minute hand */}
              <div
                className="absolute left-1/2 top-1/2 w-[1px] h-12 bg-black/60 origin-bottom"
                style={{
                  transform: 'translate(-50%, -100%)',
                  animation: 'clockMinute 10s linear infinite'
                }}
              />
              {/* Center dot */}
              <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-black/80 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <style jsx>{`
              @keyframes clockHour {
                0% { transform: translate(-50%, -100%) rotate(0deg); }
                100% { transform: translate(-50%, -100%) rotate(360deg); }
              }
              @keyframes clockMinute {
                0% { transform: translate(-50%, -100%) rotate(0deg); }
                100% { transform: translate(-50%, -100%) rotate(360deg); }
              }
            `}</style>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="pt-24 pb-16 px-8 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-[clamp(48px,8vw,120px)] font-thin tracking-tight mb-4">
            LAB
          </h1>
          <p className="text-[11px] tracking-[0.3em] text-black/40 uppercase">
            Experimental Zone
          </p>
        </motion.div>
      </div>

      {/* Experiments Grid - Clean 2x2 Layout */}
      <div className="px-8 md:px-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
          {experiments.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onMouseEnter={() => setHoveredCard(exp.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-[400px] border border-black/10 overflow-hidden bg-white hover:border-black/30 transition-all duration-300">
                {/* Background Animation */}
                <div className="absolute inset-0">
                  {renderExperimentVisual(exp)}
                </div>

                {/* Content */}
                <div className="relative z-10 p-12 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-4xl font-thin tracking-tight mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-black/50 uppercase tracking-wider">
                      {exp.description}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <motion.div
                    className="text-xs text-black/30 uppercase tracking-wider"
                    animate={{
                      opacity: hoveredCard === exp.id ? 1 : 0,
                      x: hoveredCard === exp.id ? 0 : -10
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    Click to explore →
                  </motion.div>
                </div>

                {/* Subtle hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-black/5 pointer-events-none"
                  animate={{
                    opacity: hoveredCard === exp.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Back to home link */}
      <motion.div
        className="fixed bottom-8 left-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Link
          href="/"
          className="text-[11px] tracking-[0.2em] text-black/40 uppercase hover:text-black/70 transition-colors"
        >
          ← Home
        </Link>
      </motion.div>
    </div>
  )
}