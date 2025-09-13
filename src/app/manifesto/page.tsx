'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CinchFilters from '@/components/CinchFilters'

export default function ManifestoPage() {
  const [currentLine, setCurrentLine] = useState(0)
  
  const manifesto = [
    { text: "We reject safety.", emphasis: true },
    { text: "We embrace chaos.", emphasis: false },
    { text: "Fashion is not clothing.", emphasis: false },
    { text: "Fashion is revolution.", emphasis: true },
    { text: "Cinch until it hurts.", emphasis: false },
    { text: "Release when it breaks.", emphasis: false },
    { text: "Repeat until transcendence.", emphasis: true },
    { text: "", emphasis: false },
    { text: "We are not designers.", emphasis: false },
    { text: "We are scientists of style.", emphasis: true },
    { text: "Our laboratory births monsters.", emphasis: false },
    { text: "Beautiful, terrible monsters.", emphasis: true },
    { text: "", emphasis: false },
    { text: "Minimalism is our weapon.", emphasis: false },
    { text: "Maximalism is our shield.", emphasis: false },
    { text: "Contradiction is our truth.", emphasis: true },
    { text: "", emphasis: false },
    { text: "Break every rule.", emphasis: false },
    { text: "Including this one.", emphasis: true },
    { text: "", emphasis: false },
    { text: "CINCH • RELEASE • REPEAT", emphasis: true, final: true }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLine((prev) => (prev < manifesto.length - 1 ? prev + 1 : prev))
    }, 2000)
    
    return () => clearInterval(timer)
  }, [manifesto.length])

  return (
    <>
      <CinchFilters />
      
      <main className="min-h-screen flex items-center justify-center px-4 md:px-8">
        <div className="max-w-4xl w-full">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <h1 
              className="glitch text-6xl md:text-8xl mb-4"
              data-text="MANIFESTO"
            >
              MANIFESTO
            </h1>
            <div className="w-full h-[1px] bg-white opacity-20" />
          </motion.div>

          {/* Manifesto Lines */}
          <div className="space-y-6 min-h-[400px]">
            {manifesto.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ 
                  opacity: index <= currentLine ? 1 : 0,
                  x: index <= currentLine ? 0 : -50
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`
                  ${line.emphasis ? 'text-2xl md:text-4xl' : 'text-lg md:text-2xl'}
                  ${line.final ? 'text-center mt-16' : ''}
                  ${line.text === '' ? 'h-8' : ''}
                `}
              >
                {line.emphasis ? (
                  <span 
                    className="glitch font-bold"
                    data-text={line.text}
                  >
                    {line.text}
                  </span>
                ) : (
                  <span className="opacity-80">
                    {line.text}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Signature */}
          {currentLine === manifesto.length - 1 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-center mt-20"
            >
              <div className="inline-block">
                <p className="text-xs tracking-[0.3em] uppercase opacity-50 mb-2">
                  Digital Fashion Laboratory
                </p>
                <p className="text-xs tracking-[0.2em] opacity-30">
                  EST. 2022 • ∞
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Background Effects */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Vertical Lines */}
          <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-white opacity-5" />
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white opacity-5" />
          <div className="absolute left-3/4 top-0 bottom-0 w-[1px] bg-white opacity-5" />
          
          {/* Horizontal Lines */}
          <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-white opacity-5" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white opacity-5" />
          <div className="absolute top-3/4 left-0 right-0 h-[1px] bg-white opacity-5" />
        </div>
      </main>
    </>
  )
}