'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CipherText from '@/components/CipherText'

gsap.registerPlugin(ScrollTrigger)

// Laboratory Personnel Database
const personnel = [
  {
    id: 'DIR_001',
    name: 'DR. K. CHEN',
    role: 'LABORATORY_DIRECTOR',
    clearance: 'LEVEL_5',
    specialization: 'QUANTUM_FASHION_THEORY',
    publications: 47,
    experiments: 312,
    status: 'ACTIVE'
  },
  {
    id: 'RES_001',
    name: 'J. YAMAMOTO',
    role: 'LEAD_RESEARCHER',
    clearance: 'LEVEL_4',
    specialization: 'MATERIAL_DECOMPOSITION',
    publications: 23,
    experiments: 189,
    status: 'ACTIVE'
  },
  {
    id: 'RES_002',
    name: 'M. LAURENT',
    role: 'SENIOR_SCIENTIST',
    clearance: 'LEVEL_4',
    specialization: 'TEMPORAL_DISTORTION',
    publications: 31,
    experiments: 156,
    status: 'ACTIVE'
  },
  {
    id: 'TEC_001',
    name: 'A. PETROV',
    role: 'TECHNICAL_SPECIALIST',
    clearance: 'LEVEL_3',
    specialization: 'CHAOS_ENGINEERING',
    publications: 12,
    experiments: 89,
    status: 'ACTIVE'
  }
]

// Laboratory Milestones
const milestones = [
  {
    year: 2020,
    code: 'GENESIS',
    event: 'LABORATORY_ESTABLISHED',
    description: 'Initial facility construction. First experiments in fashion deconstruction.',
    danger: 1,
    success: true
  },
  {
    year: 2021,
    code: 'BREAKTHROUGH',
    event: 'MOLECULAR_FABRIC_SYNTHESIS',
    description: 'Successfully synthesized first quantum-stable fashion material.',
    danger: 3,
    success: true
  },
  {
    year: 2022,
    code: 'INCIDENT_ALPHA',
    event: 'CONTAINMENT_BREACH',
    description: 'Experimental overflow. 475 unique patterns generated spontaneously.',
    danger: 5,
    success: false
  },
  {
    year: 2023,
    code: 'EVOLUTION',
    event: 'TEMPORAL_FASHION_ACHIEVED',
    description: 'Garments existing in multiple time states simultaneously.',
    danger: 4,
    success: true
  },
  {
    year: 2024,
    code: 'STABILIZATION',
    event: 'CHAOS_CONTROLLED',
    description: 'Entropy maximization protocols established. Fashion-chaos equilibrium achieved.',
    danger: 3,
    success: true
  },
  {
    year: 2025,
    code: 'CURRENT',
    event: 'ONGOING_EXPERIMENTS',
    description: 'Multiple parallel experiments. Reality fabric manipulation in progress.',
    danger: 5,
    success: null
  }
]

// Laboratory Departments
const departments = [
  {
    code: 'QFD',
    name: 'QUANTUM_FASHION_DIVISION',
    experiments: 147,
    personnel: 12,
    hazard: 'EXTREME'
  },
  {
    code: 'MRL',
    name: 'MATERIAL_RESEARCH_LAB',
    experiments: 89,
    personnel: 8,
    hazard: 'HIGH'
  },
  {
    code: 'TDE',
    name: 'TEMPORAL_DISTORTION_ENGINE',
    experiments: 56,
    personnel: 6,
    hazard: 'CRITICAL'
  },
  {
    code: 'CEU',
    name: 'CHAOS_ENGINEERING_UNIT',
    experiments: 234,
    personnel: 15,
    hazard: 'MAXIMUM'
  }
]

export default function BrutalistAboutPage() {
  const [activeSection, setActiveSection] = useState<'PERSONNEL' | 'HISTORY' | 'DEPARTMENTS' | 'MISSION'>('MISSION')
  const [selectedPersonnel, setSelectedPersonnel] = useState<string | null>(null)
  const [systemWarning, setSystemWarning] = useState<string | null>(null)
  const [accessGranted, setAccessGranted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Parallax transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '-10%'])

  // System warnings
  useEffect(() => {
    const warningTimer = setInterval(() => {
      if (Math.random() > 0.85) {
        const warnings = [
          'RADIATION_LEVELS_NOMINAL',
          'EXPERIMENT_47_IN_PROGRESS',
          'TEMPORAL_FLUX_DETECTED',
          'PATTERN_RECOGNITION_ACTIVE',
          'QUANTUM_COHERENCE_STABLE'
        ]
        const warning = warnings[Math.floor(Math.random() * warnings.length)]
        setSystemWarning(warning)
        setTimeout(() => setSystemWarning(null), 3000)
      }
    }, 5000)
    return () => clearInterval(warningTimer)
  }, [])

  // Access sequence
  useEffect(() => {
    setTimeout(() => setAccessGranted(true), 1500)
  }, [])

  // GSAP animations
  useEffect(() => {
    if (!accessGranted) return

    const ctx = gsap.context(() => {
      gsap.from('.personnel-card', {
        x: -100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.personnel-grid',
          start: 'top 80%'
        }
      })

      gsap.from('.milestone-entry', {
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 70%'
        }
      })
    })

    return () => ctx.revert()
  }, [accessGranted])

  return (
    <div ref={containerRef} className="min-h-screen bg-carbon-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 scientific-grid opacity-5 pointer-events-none" />
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-safety-orange/5 to-transparent" />
      </motion.div>

      {/* Access Sequence */}
      <AnimatePresence>
        {!accessGranted && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <div className="text-hazmat-green font-mono text-xs mb-4">
                ACCESSING_PERSONNEL_DATABASE...
              </div>
              <div className="text-2xl font-mono animate-pulse">
                AUTHORIZATION_REQUIRED
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* System Warning */}
      <AnimatePresence>
        {systemWarning && (
          <motion.div
            className="fixed top-20 right-0 z-50 bg-warning-yellow text-black px-6 py-2"
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
          >
            <span className="text-xs font-mono font-bold">{systemWarning}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="pt-24 pb-12 px-8 border-b-3 border-safety-orange">
        <div className="max-w-7xl mx-auto">
          <motion.div style={{ y: textY }}>
            <h1 className="text-[clamp(60px,8vw,120px)] font-black brutalist-heading leading-[0.8]">
              <CipherText text="ABOUT" />
              <br />
              <span className="text-safety-orange"><CipherText text="THE LAB" /></span>
            </h1>
            <p className="text-xs font-mono mt-4 opacity-60">
              CINCH_LABORATORY // EXPERIMENTAL_FASHION_RESEARCH_FACILITY
            </p>
          </motion.div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <section className="py-4 px-8 bg-concrete-gray">
        <div className="max-w-7xl mx-auto flex gap-4">
          {(['MISSION', 'PERSONNEL', 'HISTORY', 'DEPARTMENTS'] as const).map(section => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-6 py-3 text-xs font-mono font-bold transition-all ${
                activeSection === section
                  ? 'bg-white text-carbon-black'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {section}
            </button>
          ))}
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          {/* MISSION STATEMENT */}
          {activeSection === 'MISSION' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="lab-border p-12 bg-paper-white text-carbon-black">
                <h2 className="text-5xl font-black mb-8 brutalist-heading">
                  MISSION_PROTOCOL
                </h2>
                <div className="space-y-6 text-lg leading-relaxed">
                  <p>
                    The CINCH Laboratory operates at the intersection of fashion and chaos theory,
                    conducting high-risk experiments in material decomposition, temporal distortion,
                    and quantum fashion synthesis.
                  </p>
                  <p>
                    Our primary objective: To push fashion beyond its molecular limits,
                    exploring territories where traditional design collapses and new forms emerge
                    from controlled chaos.
                  </p>
                  <div className="mt-8 p-6 bg-black text-hazmat-green font-mono text-sm">
                    &gt; DIRECTIVE_001: FASHION_EXCEEDS_REALITY
                    <br />
                    &gt; DIRECTIVE_002: CHAOS_CREATES_ORDER
                    <br />
                    &gt; DIRECTIVE_003: LIMITS_EXIST_TO_BE_BROKEN
                    <br />
                    &gt; DIRECTIVE_004: FAILURE_IS_DATA
                  </div>
                </div>
              </div>

              {/* Core Values Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px] bg-carbon-black p-[2px]">
                {[
                  { label: 'EXPERIMENTS', value: '526', unit: 'TOTAL' },
                  { label: 'BREAKTHROUGHS', value: '47', unit: 'MAJOR' },
                  { label: 'INCIDENTS', value: '13', unit: 'CONTAINED' },
                  { label: 'SUCCESS_RATE', value: '87%', unit: 'OPTIMAL' }
                ].map((stat) => (
                  <div key={stat.label} className="bg-white text-carbon-black p-8 text-center">
                    <div className="text-4xl font-black mb-2">{stat.value}</div>
                    <div className="text-[10px] font-mono opacity-60">{stat.label}</div>
                    <div className="text-[9px] font-mono opacity-40">{stat.unit}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PERSONNEL DATABASE */}
          {activeSection === 'PERSONNEL' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="personnel-grid space-y-4"
            >
              {personnel.map((person) => (
                <motion.div
                  key={person.id}
                  className="personnel-card bg-white text-carbon-black p-6 lab-border cursor-pointer hover:bg-paper-white transition-colors"
                  onClick={() => setSelectedPersonnel(person.id)}
                  whileHover={{ x: -8 }}
                >
                  <div className="grid grid-cols-12 items-center gap-4">
                    <div className="col-span-1">
                      <div className={`w-3 h-3 ${
                        person.clearance === 'LEVEL_5' ? 'bg-glitch-red' :
                        person.clearance === 'LEVEL_4' ? 'bg-safety-orange' :
                        'bg-hazmat-green'
                      }`} />
                    </div>
                    <div className="col-span-3">
                      <div className="text-xs font-mono opacity-60">{person.id}</div>
                      <div className="font-black text-lg">{person.name}</div>
                    </div>
                    <div className="col-span-3">
                      <div className="text-xs font-mono opacity-60">ROLE</div>
                      <div className="text-sm font-bold">{person.role}</div>
                    </div>
                    <div className="col-span-3">
                      <div className="text-xs font-mono opacity-60">SPECIALIZATION</div>
                      <div className="text-sm">{person.specialization}</div>
                    </div>
                    <div className="col-span-2 text-right">
                      <div className="text-xs font-mono">
                        <div>PUB: {person.publications}</div>
                        <div>EXP: {person.experiments}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* HISTORY/TIMELINE */}
          {activeSection === 'HISTORY' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="timeline-container"
            >
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-24 top-0 bottom-0 w-[2px] bg-safety-orange" />

                {/* Milestones */}
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.code}
                    className="milestone-entry relative mb-12 pl-32"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Year Node */}
                    <div className="absolute left-20 w-8 h-8 bg-carbon-black border-3 border-white flex items-center justify-center">
                      <span className="text-[10px] font-mono text-white">{milestone.year}</span>
                    </div>

                    {/* Content */}
                    <div className={`p-6 ${
                      milestone.success === false ? 'bg-glitch-red/10 border-3 border-glitch-red' :
                      milestone.success === true ? 'bg-white' :
                      'bg-warning-yellow/20 border-3 border-warning-yellow'
                    } lab-border`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-black">{milestone.code}</h3>
                          <p className="text-xs font-mono opacity-60 mt-1">{milestone.event}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono">DANGER:</span>
                          <div className="flex gap-[2px]">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 ${
                                  i < milestone.danger ? 'bg-glitch-red' : 'bg-gray-400'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm">{milestone.description}</p>
                      {milestone.success !== null && (
                        <div className="mt-4 text-[10px] font-mono">
                          STATUS: {milestone.success ? 'SUCCESS' : 'FAILURE'}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* DEPARTMENTS */}
          {activeSection === 'DEPARTMENTS' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {departments.map((dept) => (
                <motion.div
                  key={dept.code}
                  className="bg-white text-carbon-black p-8 lab-border"
                  whileHover={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-3xl font-black">{dept.code}</h3>
                      <p className="text-xs font-mono mt-2">{dept.name}</p>
                    </div>
                    <div className={`px-3 py-1 text-[10px] font-mono font-bold ${
                      dept.hazard === 'MAXIMUM' ? 'bg-glitch-red text-white' :
                      dept.hazard === 'CRITICAL' ? 'bg-safety-orange text-black' :
                      dept.hazard === 'EXTREME' ? 'bg-warning-yellow text-black' :
                      'bg-hazmat-green text-black'
                    }`}>
                      {dept.hazard}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div>
                      <p className="text-2xl font-bold">{dept.experiments}</p>
                      <p className="text-[10px] font-mono opacity-60">EXPERIMENTS</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{dept.personnel}</p>
                      <p className="text-[10px] font-mono opacity-60">PERSONNEL</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Personnel Detail Modal */}
      <AnimatePresence>
        {selectedPersonnel && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPersonnel(null)}
          >
            <motion.div
              className="bg-paper-white text-carbon-black max-w-2xl w-full p-8 lab-border"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-black">PERSONNEL_FILE</h2>
                <button
                  onClick={() => setSelectedPersonnel(null)}
                  className="text-2xl hover:rotate-90 transition-transform"
                >
                  ×
                </button>
              </div>
              <div className="bg-black text-hazmat-green p-6 font-mono text-xs">
                <div>&gt; ACCESSING_CLASSIFIED_RECORDS...</div>
                <div>&gt; CLEARANCE_VERIFIED</div>
                <div>&gt; FILE_LOADED</div>
                <br />
                <div>ID: {selectedPersonnel}</div>
                <div>STATUS: ACTIVE</div>
                <div>LAST_ACCESS: {new Date().toISOString()}</div>
                <br />
                <div className="text-glitch-red">[ADDITIONAL_DATA_CLASSIFIED]</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-8 px-8 bg-black border-t-3 border-safety-orange">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs font-mono">
            <div>
              <p className="text-safety-orange mb-2">LOCATION</p>
              <p>CLASSIFIED_COORDINATES</p>
              <p className="opacity-60">SEOUL_SECTOR_7</p>
            </div>
            <div>
              <p className="text-safety-orange mb-2">CONTACT</p>
              <p>LAB@CINCH.COM</p>
              <p className="opacity-60">SECURITY_CLEARANCE_REQUIRED</p>
            </div>
            <div>
              <p className="text-safety-orange mb-2">STATUS</p>
              <p className="text-hazmat-green">OPERATIONAL</p>
              <p className="opacity-60">24/7_MONITORING</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}