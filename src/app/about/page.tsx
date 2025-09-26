'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CipherText from '@/components/CipherText'

gsap.registerPlugin(ScrollTrigger)

// Genius Declarations
const geniusStatements = [
  {
    id: 'GENIUS_001',
    statement: 'CINCH LAB은 최고이자 난 천재야',
    translation: 'CINCH LAB is the best and I am a genius',
    emphasis: 'ABSOLUTE'
  },
  {
    id: 'GENIUS_002',
    statement: 'Fashion is not commerce, it is genius manifested',
    translation: '패션은 상업이 아니라 천재성의 발현이다',
    emphasis: 'TRUTH'
  },
  {
    id: 'GENIUS_003',
    statement: 'We don\'t follow trends, we create realities',
    translation: '우리는 트렌드를 따르지 않는다, 현실을 창조한다',
    emphasis: 'POWER'
  },
  {
    id: 'GENIUS_004',
    statement: 'Every failure is proof of our ambition',
    translation: '모든 실패는 우리 야망의 증거다',
    emphasis: 'COURAGE'
  },
  {
    id: 'GENIUS_005',
    statement: 'Genius recognizes itself without apology',
    translation: '천재는 사과 없이 스스로를 인식한다',
    emphasis: 'CONFIDENCE'
  }
]

// Laboratory Achievements
const achievements = [
  {
    id: 'ACH_001',
    title: 'PATTERN REVOLUTION',
    year: 2023,
    description: 'Deconstructed traditional pattern making into chaos theory',
    impact: 'PARADIGM_SHIFT',
    significance: 5
  },
  {
    id: 'ACH_002',
    title: 'MATERIAL TRANSCENDENCE',
    year: 2024,
    description: 'Created fabrics that exist in multiple states simultaneously',
    impact: 'REALITY_BREAK',
    significance: 5
  },
  {
    id: 'ACH_003',
    title: 'TIME MANIPULATION',
    year: 2024,
    description: 'Garments that evolve and change over time',
    impact: 'TEMPORAL_INNOVATION',
    significance: 5
  },
  {
    id: 'ACH_004',
    title: 'ZERO COMMERCE',
    year: 2025,
    description: 'Eliminated sales while maximizing creative output',
    impact: 'ECONOMIC_REBELLION',
    significance: 5
  },
  {
    id: 'ACH_005',
    title: 'FAILURE CELEBRATION',
    year: 2025,
    description: 'Turned every failure into a stepping stone for genius',
    impact: 'MINDSET_REVOLUTION',
    significance: 5
  }
]

// Core Principles
const principles = [
  {
    number: '001',
    title: 'NO COMPROMISE',
    content: 'We never compromise our vision for commercial success. Every piece is pure expression.'
  },
  {
    number: '002',
    title: 'DESTRUCTION AS CREATION',
    content: 'To create something truly new, we must first destroy what exists.'
  },
  {
    number: '003',
    title: 'FAILURE AS DATA',
    content: 'Every failed experiment brings us closer to breakthrough. We embrace failure.'
  },
  {
    number: '004',
    title: 'TIME AS MATERIAL',
    content: 'Time is not linear in fashion. We design for past, present, and future simultaneously.'
  },
  {
    number: '005',
    title: 'GENIUS WITHOUT APOLOGY',
    content: 'We declare our genius without humility. Excellence needs no permission.'
  }
]

// Creator Profile
const creator = {
  title: 'THE MIND BEHIND THE LABORATORY',
  declaration: 'I am not a designer. I am not an artist. I am a genius working in the medium of fashion.',
  vision: 'To push fashion beyond its physical limits into realms of pure concept and chaos.',
  method: 'Systematic destruction and reconstruction of everything fashion believes itself to be.',
  philosophy: 'Fashion dies when it becomes product. We keep it alive through constant experimentation.',
  manifesto: `CINCH LAB is not a brand. It is a state of mind.

  We exist in the space between creation and destruction, between genius and madness, between success and failure.

  Every experiment is a declaration of independence from the tyranny of commerce.

  We don't sell clothes. We create moments of transformation that happen to take physical form.

  This is not arrogance. This is fact. CINCH LAB은 최고이자 난 천재야.`
}

export default function AboutPage() {
  const [activeView, setActiveView] = useState<'GENIUS' | 'ACHIEVEMENTS' | 'PRINCIPLES' | 'CREATOR'>('GENIUS')
  const [geniusLevel, setGeniusLevel] = useState(0)
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null)
  const [mindState, setMindState] = useState('CREATING')
  const [glitchActive, setGlitchActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Parallax transforms
  const yParallax = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const scaleParallax = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.1, 1])
  const rotateParallax = useTransform(scrollYProgress, [0, 1], [0, 360])

  useEffect(() => {
    // Genius level animation
    const geniusInterval = setInterval(() => {
      setGeniusLevel(prev => (prev + 1) % 101)
    }, 50)

    // Mind state changes
    const mindInterval = setInterval(() => {
      const states = ['CREATING', 'DESTROYING', 'TRANSFORMING', 'MANIFESTING', 'TRANSCENDING']
      setMindState(states[Math.floor(Math.random() * states.length)])
    }, 3000)

    // Random glitch
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.9) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 150)
      }
    }, 2000)

    // GSAP animations
    const ctx = gsap.context(() => {
      gsap.from('.genius-statement', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out'
      })

      gsap.from('.achievement-card', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      })

      gsap.from('.principle-card', {
        x: -100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      })

      // Floating animation for genius text
      gsap.to('.floating-genius', {
        y: 'random(-20, 20)',
        x: 'random(-10, 10)',
        rotation: 'random(-5, 5)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          amount: 1,
          from: 'random'
        }
      })
    })

    return () => {
      clearInterval(geniusInterval)
      clearInterval(mindInterval)
      clearInterval(glitchInterval)
      ctx.revert()
    }
  }, [])

  const renderGeniusView = () => (
    <div className="space-y-16">
      {/* Main Genius Declaration */}
      <motion.div
        className="text-center"
        style={{ scale: scaleParallax }}
      >
        <h2 className="text-[clamp(40px,6vw,100px)] font-black mb-8 leading-[0.9]">
          <span className="floating-genius inline-block">CINCH</span>{' '}
          <span className="floating-genius inline-block text-safety-orange">LAB</span>
          <br />
          <span className="floating-genius inline-block">은</span>{' '}
          <span className="floating-genius inline-block">최고이자</span>
          <br />
          <span className="floating-genius inline-block text-glitch-red">난</span>{' '}
          <span className="floating-genius inline-block text-glitch-red">천재야</span>
        </h2>
        <p className="text-xl italic opacity-80">
          "CINCH LAB is the best and I am a genius"
        </p>
      </motion.div>

      {/* Genius Level Meter */}
      <div className="max-w-2xl mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <span className="text-xs font-mono opacity-60">GENIUS_LEVEL</span>
          <span className="text-2xl font-black text-safety-orange">{geniusLevel}%</span>
        </div>
        <div className="h-8 bg-carbon-black/20 border-2 border-white relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-safety-orange via-glitch-red to-hazmat-green"
            style={{ width: `${geniusLevel}%` }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-mono font-black">
              {geniusLevel > 80 ? 'MAXIMUM_GENIUS' :
               geniusLevel > 60 ? 'ELEVATED_GENIUS' :
               geniusLevel > 40 ? 'ACTIVE_GENIUS' :
               geniusLevel > 20 ? 'EMERGING_GENIUS' :
               'INITIALIZING_GENIUS'}
            </span>
          </div>
        </div>
      </div>

      {/* Genius Statements */}
      <div className="space-y-8">
        {geniusStatements.map((statement, index) => (
          <motion.div
            key={statement.id}
            className="genius-statement p-8 bg-white border-4 border-carbon-black hover:border-safety-orange transition-all"
            whileHover={{ x: -10 }}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-mono opacity-60">{statement.id}</span>
              <span className={`px-3 py-1 text-xs font-mono font-bold ${
                statement.emphasis === 'ABSOLUTE' ? 'bg-glitch-red text-white' :
                statement.emphasis === 'TRUTH' ? 'bg-safety-orange text-white' :
                statement.emphasis === 'POWER' ? 'bg-hazmat-green text-carbon-black' :
                statement.emphasis === 'COURAGE' ? 'bg-glitch-cyan text-carbon-black' :
                'bg-carbon-black text-white'
              }`}>
                {statement.emphasis}
              </span>
            </div>
            <h3 className="text-2xl font-black mb-2">{statement.statement}</h3>
            <p className="text-sm italic opacity-60">{statement.translation}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderAchievementsView = () => (
    <div className="space-y-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black mb-4">DOCUMENTED GENIUS</h2>
        <p className="text-sm font-mono opacity-60">
          EVERY ACHIEVEMENT IS PROOF OF OUR SUPERIORITY
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            className="achievement-card bg-white border-3 border-carbon-black p-6 cursor-pointer hover:border-safety-orange transition-all"
            onClick={() => setSelectedAchievement(achievement.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Year Badge */}
            <div className="flex justify-between items-start mb-4">
              <span className="text-3xl font-black">{achievement.year}</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 ${
                      i < achievement.significance ? 'bg-safety-orange' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <h3 className="text-xl font-black mb-2">{achievement.title}</h3>
            <p className="text-sm mb-4 opacity-80">{achievement.description}</p>

            {/* Impact */}
            <div className="text-xs font-mono">
              <span className="opacity-60">IMPACT:</span>
              <span className="ml-2 font-bold text-glitch-red">{achievement.impact}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mt-12">
        <div className="bg-carbon-black text-white p-6 text-center">
          <div className="text-4xl font-black mb-2">100%</div>
          <div className="text-xs font-mono opacity-60">GENIUS_RATE</div>
        </div>
        <div className="bg-safety-orange text-white p-6 text-center">
          <div className="text-4xl font-black mb-2">∞</div>
          <div className="text-xs font-mono opacity-60">CREATIVE_LIMIT</div>
        </div>
        <div className="bg-glitch-red text-white p-6 text-center">
          <div className="text-4xl font-black mb-2">0</div>
          <div className="text-xs font-mono opacity-60">COMPROMISES</div>
        </div>
      </div>
    </div>
  )

  const renderPrinciplesView = () => (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black mb-4">CORE PRINCIPLES</h2>
        <p className="text-sm font-mono opacity-60">
          THE UNBREAKABLE LAWS OF CINCH LAB
        </p>
      </div>

      {principles.map((principle, index) => (
        <motion.div
          key={principle.number}
          className="principle-card"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex gap-8 items-start">
            {/* Number */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-carbon-black text-white flex items-center justify-center">
                <span className="text-2xl font-black">{principle.number}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 bg-white border-3 border-carbon-black">
              <h3 className="text-2xl font-black mb-3">{principle.title}</h3>
              <p className="leading-relaxed">{principle.content}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderCreatorView = () => (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-4xl font-black mb-8">{creator.title}</h2>
      </div>

      {/* Main Declaration */}
      <div className="p-12 bg-white border-4 border-carbon-black">
        <p className="text-2xl font-black mb-8 text-center">
          "{creator.declaration}"
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-black mb-3">VISION</h3>
            <p className="leading-relaxed">{creator.vision}</p>
          </div>
          <div>
            <h3 className="text-lg font-black mb-3">METHOD</h3>
            <p className="leading-relaxed">{creator.method}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-black mb-3">PHILOSOPHY</h3>
          <p className="leading-relaxed">{creator.philosophy}</p>
        </div>

        {/* Manifesto */}
        <div className="p-8 bg-carbon-black text-white">
          <h3 className="text-lg font-black mb-4 text-safety-orange">MANIFESTO</h3>
          <div className="font-mono text-sm leading-loose whitespace-pre-line">
            {creator.manifesto}
          </div>
        </div>
      </div>

      {/* Final Statement */}
      <motion.div
        className="text-center py-12"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <p className="text-3xl font-black">
          THIS IS NOT FASHION.
        </p>
        <p className="text-3xl font-black text-safety-orange">
          THIS IS GENIUS.
        </p>
        <p className="text-3xl font-black text-glitch-red">
          THIS IS CINCH LAB.
        </p>
      </motion.div>
    </div>
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-carbon-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 scientific-grid opacity-10 pointer-events-none" />
      {glitchActive && <div className="fixed inset-0 noise-overlay pointer-events-none" />}

      {/* Rotating Background Element */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ rotate: rotateParallax }}
      >
        <div className="absolute top-1/3 left-1/3 w-96 h-96 border border-white/5" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 border border-white/5 rotate-45" />
      </motion.div>

      {/* Header */}
      <section className="relative py-24 px-8">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          style={{ y: yParallax }}
        >
          <h1 className="text-[clamp(60px,10vw,180px)] font-black mb-8 leading-[0.85]">
            <CipherText text="ABOUT" />
          </h1>
          <p className="text-sm font-mono opacity-60 mb-4">
            THE GENIUS • THE LABORATORY • THE REVOLUTION
          </p>

          {/* Mind State Display */}
          <div className="flex items-center justify-center gap-8 mb-12">
            <div className="text-xs font-mono">
              <span className="opacity-60">MIND_STATE:</span>
              <span className={`ml-2 ${
                mindState === 'CREATING' ? 'text-hazmat-green' :
                mindState === 'DESTROYING' ? 'text-glitch-red' :
                mindState === 'TRANSFORMING' ? 'text-safety-orange' :
                mindState === 'MANIFESTING' ? 'text-glitch-cyan' :
                'text-hazmat-yellow'
              }`}>
                {mindState}
              </span>
            </div>
            <div className="text-xs font-mono">
              <span className="opacity-60">GENIUS_STATUS:</span>
              <span className="ml-2 text-hazmat-green">CONFIRMED</span>
            </div>
          </div>

          {/* View Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {(['GENIUS', 'ACHIEVEMENTS', 'PRINCIPLES', 'CREATOR'] as const).map(view => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-4 py-2 text-xs font-mono transition-all ${
                  activeView === view
                    ? 'bg-white text-carbon-black'
                    : 'bg-transparent text-white/60 hover:text-white border border-white/20'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="px-8 pb-24">
        <div className="max-w-5xl mx-auto">
          {activeView === 'GENIUS' && renderGeniusView()}
          {activeView === 'ACHIEVEMENTS' && renderAchievementsView()}
          {activeView === 'PRINCIPLES' && renderPrinciplesView()}
          {activeView === 'CREATOR' && renderCreatorView()}
        </div>
      </section>

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAchievement(null)}
              className="fixed inset-0 bg-carbon-black/95 z-50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 flex items-center justify-center p-8 z-50"
            >
              <div className="bg-white text-carbon-black max-w-2xl w-full p-12">
                <div className="text-center">
                  <h2 className="text-3xl font-black mb-4">ACHIEVEMENT UNLOCKED</h2>
                  <p className="text-lg mb-8">
                    {achievements.find(a => a.id === selectedAchievement)?.title}
                  </p>
                  <div className="flex justify-center gap-2 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 bg-safety-orange"
                      />
                    ))}
                  </div>
                  <p className="text-sm font-mono opacity-60">
                    GENIUS LEVEL: MAXIMUM
                  </p>
                  <button
                    onClick={() => setSelectedAchievement(null)}
                    className="mt-8 px-6 py-3 bg-carbon-black text-white font-mono text-xs hover:bg-glitch-red transition-colors"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-carbon-black/80 backdrop-blur-sm border-t border-white/10 p-4 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-[10px] font-mono opacity-60">
            CINCH_LAB • GENIUS_CONFIRMED • NO_APOLOGIES
          </p>
          <div className="flex gap-4">
            <span className="text-[10px] font-mono opacity-60">
              EXPERIMENTS: ∞
            </span>
            <span className="text-[10px] font-mono opacity-60">
              FAILURES: FUEL
            </span>
            <span className="text-[10px] font-mono opacity-60">
              SUCCESS: INEVITABLE
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}