'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LabPage() {
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null)

  const experiments = [
    {
      id: 'fabric',
      title: 'FABRIC',
      description: 'Digital textile exploration',
      type: 'wave'
    },
    {
      id: 'form',
      title: 'FORM',
      description: 'Geometric transformations',
      type: 'rotate'
    },
    {
      id: 'void',
      title: 'VOID',
      description: 'Negative space studies',
      type: 'scale'
    },
    {
      id: 'time',
      title: 'TIME',
      description: 'Temporal fashion',
      type: 'clock'
    }
  ]

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl mb-4 tracking-wider">LABORATORY</h1>
          <p className="text-sm tracking-[0.2em] opacity-70">
            DIGITAL EXPERIMENTS IN FASHION
          </p>
        </header>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {experiments.map((exp) => (
            <div
              key={exp.id}
              className="group cursor-pointer"
              onMouseEnter={() => setActiveExperiment(exp.id)}
              onMouseLeave={() => setActiveExperiment(null)}
            >
              <div className="aspect-square border border-white/20 hover:border-white transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-3xl md:text-4xl mb-2 tracking-wider transition-transform duration-500 group-hover:scale-110">
                      {exp.title}
                    </h2>
                    <p className="text-xs tracking-widest opacity-0 group-hover:opacity-70 transition-opacity duration-500">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* CSS-based animations */}
                <div className="absolute inset-0 pointer-events-none">
                  {exp.type === 'wave' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="wave-animation" />
                    </div>
                  )}
                  {exp.type === 'rotate' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rotating-square" />
                    </div>
                  )}
                  {exp.type === 'scale' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`scaling-circle ${activeExperiment === exp.id ? 'active' : ''}`} />
                    </div>
                  )}
                  {exp.type === 'clock' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="clock-container">
                        <div className="hour-hand" />
                        <div className="minute-hand" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <section className="border-t border-white/20 pt-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl mb-4 tracking-wider">PROCESS</h3>
              <p className="text-sm leading-relaxed opacity-70">
                Each experiment represents a unique exploration of digital fashion concepts.
                Through code and design, we push the boundaries of what fashion can be in the digital age.
              </p>
            </div>
            <div>
              <h3 className="text-xl mb-4 tracking-wider">PHILOSOPHY</h3>
              <p className="text-sm leading-relaxed opacity-70">
                The laboratory is where chaos meets control. Every pixel, every animation,
                every interaction is deliberately crafted to challenge conventional fashion paradigms.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <Link
            href="/collections"
            className="inline-block border border-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-500"
          >
            VIEW COLLECTIONS
          </Link>
        </div>
      </div>
    </main>
  )
}