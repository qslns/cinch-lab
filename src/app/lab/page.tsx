'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const experiments = [
  {
    id: 'fabric',
    title: 'FABRIC',
    description: 'Exploring textile behaviors and patterns',
    type: 'wave'
  },
  {
    id: 'form',
    title: 'FORM',
    description: 'Geometric transformations in space',
    type: 'rotate'
  },
  {
    id: 'void',
    title: 'VOID',
    description: 'The beauty of negative space',
    type: 'expand'
  },
  {
    id: 'time',
    title: 'TIME',
    description: 'Temporal patterns and rhythms',
    type: 'clock'
  },
  {
    id: 'texture',
    title: 'TEXTURE',
    description: 'Surface qualities and depth',
    type: 'grain'
  },
  {
    id: 'light',
    title: 'LIGHT',
    description: 'Illumination and shadow play',
    type: 'glow'
  }
]

export default function LabPage() {
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null)

  return (
    <div className="px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-thin mb-4">Experimental Lab</h1>
          <p className="text-sm text-gray-600 max-w-2xl">
            A digital playground where fashion meets technology. Interactive experiments 
            exploring form, texture, and movement in the context of contemporary design.
          </p>
        </div>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.map((experiment, index) => (
            <motion.div
              key={experiment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setActiveExperiment(experiment.id)}
              onMouseLeave={() => setActiveExperiment(null)}
            >
              <div className="aspect-square border border-gray-200 relative overflow-hidden hover:border-black transition-colors">
                {/* Animation based on type */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {experiment.type === 'wave' && (
                    <div className="w-full h-0.5 bg-black animate-pulse" />
                  )}
                  {experiment.type === 'rotate' && (
                    <div className="w-16 h-16 border border-black animate-spin" 
                         style={{ animationDuration: '8s' }} />
                  )}
                  {experiment.type === 'expand' && (
                    <motion.div
                      className="w-2 h-2 bg-black rounded-full"
                      animate={activeExperiment === experiment.id ? {
                        scale: [1, 10, 1]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  {experiment.type === 'clock' && (
                    <div className="relative w-20 h-20">
                      <div className="absolute top-1/2 left-1/2 w-10 h-0.5 bg-black origin-left -translate-y-1/2 animate-spin"
                           style={{ animationDuration: '4s' }} />
                      <div className="absolute top-1/2 left-1/2 w-6 h-0.5 bg-black origin-left -translate-y-1/2 animate-spin"
                           style={{ animationDuration: '60s' }} />
                    </div>
                  )}
                  {experiment.type === 'grain' && (
                    <div className="absolute inset-0 opacity-20"
                         style={{
                           backgroundImage: `repeating-linear-gradient(45deg, #000, #000 1px, transparent 1px, transparent 3px)`,
                         }} />
                  )}
                  {experiment.type === 'glow' && (
                    <motion.div
                      className="w-32 h-32 bg-gradient-radial from-black/20 to-transparent rounded-full"
                      animate={{
                        opacity: [0.3, 0.8, 0.3]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  )}
                </div>
                
                {/* Overlay text */}
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-lg font-light mb-1">{experiment.title}</h2>
                  <p className="text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    {experiment.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 py-8 border-t border-gray-200">
          <h3 className="text-xs tracking-[0.15em] text-gray-500 mb-4">ABOUT THE LAB</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h4 className="font-medium mb-2">Process</h4>
              <p className="text-gray-600">
                Each experiment begins with a concept drawn from our collections, 
                translated into interactive digital form.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Technology</h4>
              <p className="text-gray-600">
                Built with modern web technologies, focusing on performance 
                and smooth interactions across all devices.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Philosophy</h4>
              <p className="text-gray-600">
                Fashion is not just clothing—it's movement, rhythm, and the 
                space between form and function.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}