'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import CipherText from '@/components/CipherText'

// Type definitions
interface ExtremeTest {
  id: string
  name: string
  type: string
  unit: string
  status: string
  danger: number
  maxLoad?: number
  currentLoad?: number
  maxTemp?: number
  currentTemp?: number
  maxVelocity?: number
  currentVelocity?: number
  maxPressure?: number
  currentPressure?: number
}

// Extreme Experiments
const extremeTests: ExtremeTest[] = [
  {
    id: 'EXT_001',
    name: 'STRESS_TEST_ALPHA',
    type: 'MATERIAL_BREAKING_POINT',
    maxLoad: 10000,
    currentLoad: 0,
    unit: 'PSI',
    status: 'READY',
    danger: 5
  },
  {
    id: 'EXT_002',
    name: 'TEMPERATURE_EXTREMES',
    type: 'THERMAL_RESISTANCE',
    maxTemp: 2000,
    currentTemp: 20,
    unit: '°C',
    status: 'MONITORING',
    danger: 4
  },
  {
    id: 'EXT_003',
    name: 'VELOCITY_TRIALS',
    type: 'SPEED_ENDURANCE',
    maxVelocity: 500,
    currentVelocity: 0,
    unit: 'KM/H',
    status: 'CALIBRATING',
    danger: 5
  },
  {
    id: 'EXT_004',
    name: 'PRESSURE_CHAMBER',
    type: 'ATMOSPHERIC_LIMITS',
    maxPressure: 100,
    currentPressure: 1,
    unit: 'ATM',
    status: 'PRESSURIZING',
    danger: 5
  }
]

// Test Materials
const testMaterials = [
  { id: 'MAT_001', name: 'CARBON_FIBER_X9', resistance: 95, flexibility: 30, weight: 10 },
  { id: 'MAT_002', name: 'TITANIUM_MESH_V2', resistance: 99, flexibility: 15, weight: 45 },
  { id: 'MAT_003', name: 'QUANTUM_FABRIC_Q7', resistance: 85, flexibility: 90, weight: 5 },
  { id: 'MAT_004', name: 'NANO_COMPOSITE_N3', resistance: 92, flexibility: 60, weight: 8 }
]

export default function BrutalistExtremePage() {
  const [tests, setTests] = useState<ExtremeTest[]>(extremeTests)
  const [activeTest, setActiveTest] = useState<string | null>(null)
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
  const [extremeLevel, setExtremeLevel] = useState(0)
  const [systemStatus, setSystemStatus] = useState('STABLE')
  const [criticalAlert, setCriticalAlert] = useState<string | null>(null)
  const [dataStream, setDataStream] = useState<string[]>([])
  const [breakingPoint, setBreakingPoint] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Simulate extreme testing
  useEffect(() => {
    if (!activeTest) return

    const testInterval = setInterval(() => {
      setTests(prev => prev.map(test => {
        if (test.id === activeTest) {
          let newValue = 0
          switch (test.type) {
            case 'MATERIAL_BREAKING_POINT':
              if (test.maxLoad && test.currentLoad !== undefined) {
                newValue = Math.min(test.maxLoad, test.currentLoad + Math.random() * 500)
                if (newValue > test.maxLoad * 0.9) {
                  setCriticalAlert('APPROACHING_BREAKING_POINT')
                  setSystemStatus('CRITICAL')
                }
                return { ...test, currentLoad: newValue }
              }
              break
            case 'THERMAL_RESISTANCE':
              if (test.maxTemp && test.currentTemp !== undefined) {
                newValue = Math.min(test.maxTemp, test.currentTemp + Math.random() * 100)
                if (newValue > test.maxTemp * 0.8) {
                  setCriticalAlert('THERMAL_LIMIT_WARNING')
                  setSystemStatus('DANGER')
                }
                return { ...test, currentTemp: newValue }
              }
              break
            case 'SPEED_ENDURANCE':
              if (test.maxVelocity && test.currentVelocity !== undefined) {
                newValue = Math.min(test.maxVelocity, test.currentVelocity + Math.random() * 50)
                return { ...test, currentVelocity: newValue }
              }
              break
            case 'ATMOSPHERIC_LIMITS':
              if (test.maxPressure && test.currentPressure !== undefined) {
                newValue = Math.min(test.maxPressure, test.currentPressure + Math.random() * 10)
                return { ...test, currentPressure: newValue }
              }
              break
          }
        }
        return test
      }))

      // Update data stream
      setDataStream(prev => [...prev.slice(-9),
        `[${new Date().toISOString().split('T')[1].split('.')[0]}] TEST_${activeTest}: ${Math.random().toFixed(4)}`
      ])
    }, 100)

    return () => clearInterval(testInterval)
  }, [activeTest])

  // Critical alerts
  useEffect(() => {
    if (extremeLevel > 80) {
      setCriticalAlert('SYSTEM_OVERLOAD_IMMINENT')
      setBreakingPoint(true)
      setTimeout(() => setBreakingPoint(false), 3000)
    }
  }, [extremeLevel])

  // Stress visualization
  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const drawStress = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stress lines
      ctx.strokeStyle = extremeLevel > 70 ? '#FF0000' : extremeLevel > 40 ? '#FF6B35' : '#00FF00'
      ctx.lineWidth = 2

      for (let i = 0; i < 10; i++) {
        ctx.beginPath()
        const y = (canvas.height / 10) * i
        const amplitude = extremeLevel * 2
        for (let x = 0; x < canvas.width; x += 5) {
          const offset = Math.sin((x + Date.now() * 0.01) * 0.01) * amplitude
          ctx.lineTo(x, y + offset)
        }
        ctx.stroke()
      }

      requestAnimationFrame(drawStress)
    }

    drawStress()
  }, [extremeLevel])

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.extreme-card', {
        scale: 0,
        rotation: 180,
        stagger: 0.1,
        duration: 1,
        ease: 'back.out'
      })
    })
    return () => ctx.revert()
  }, [])

  const startTest = (testId: string) => {
    setActiveTest(testId)
    setExtremeLevel(prev => Math.min(100, prev + 20))
    setDataStream(prev => [...prev.slice(-9), `INITIATING_TEST: ${testId}`])
  }

  const stopTest = () => {
    setActiveTest(null)
    setTests(prev => prev.map(test => ({
      ...test,
      currentLoad: 0,
      currentTemp: 20,
      currentVelocity: 0,
      currentPressure: 1
    })))
    setExtremeLevel(0)
    setSystemStatus('STABLE')
    setCriticalAlert(null)
    setDataStream(prev => [...prev.slice(-9), 'ALL_TESTS_TERMINATED'])
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-carbon-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 scientific-grid opacity-10 pointer-events-none" />
      {breakingPoint && <div className="fixed inset-0 bg-glitch-red/20 animate-pulse pointer-events-none" />}

      {/* Stress Visualization Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Critical Alert */}
      <AnimatePresence>
        {criticalAlert && (
          <motion.div
            className="fixed top-20 left-0 right-0 z-50 bg-glitch-red text-white py-4 px-8"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-mono font-bold animate-pulse">
                ⚠ CRITICAL: {criticalAlert}
              </span>
              <span className="text-xs opacity-60">
                EXTREME_LEVEL: {extremeLevel.toFixed(0)}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <section className="pt-24 pb-12 px-8 border-b-3 border-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between">
            <div>
              <h1 className={`text-[clamp(60px,8vw,120px)] font-black brutalist-heading leading-[0.8] text-white ${breakingPoint ? 'glitch-text' : ''}`}>
                <CipherText text="EXTREME" /><br />
                <span className="text-glitch-red"><CipherText text="LIMITS" /></span>
              </h1>
              <p className="text-xs font-mono mt-4 opacity-60 text-white">
                MATERIAL_STRESS_TESTING_FACILITY
              </p>
            </div>
            <div className="text-right text-white">
              <div className="text-[10px] font-mono space-y-1">
                <div>EXTREME_LEVEL: {extremeLevel.toFixed(0)}%</div>
                <div>ACTIVE_TESTS: {activeTest ? '1' : '0'}</div>
                <div>MATERIALS_LOADED: {testMaterials.length}</div>
                <div className={`${systemStatus === 'CRITICAL' ? 'text-glitch-red flicker' : systemStatus === 'DANGER' ? 'text-warning-yellow' : 'text-hazmat-green'}`}>
                  STATUS: {systemStatus}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Material Selector */}
      <section className="py-8 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs font-mono font-bold mb-4">TEST_MATERIALS</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {testMaterials.map(material => (
              <button
                key={material.id}
                onClick={() => setSelectedMaterial(material.id)}
                className={`p-4 border-2 transition-all ${
                  selectedMaterial === material.id
                    ? 'border-safety-orange bg-safety-orange/10'
                    : 'border-carbon-black hover:border-safety-orange'
                }`}
              >
                <div className="text-xs font-mono mb-2">{material.id}</div>
                <div className="text-sm font-black mb-3">{material.name}</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span>RESISTANCE:</span>
                    <span>{material.resistance}%</span>
                  </div>
                  <div className="h-1 bg-carbon-black/20">
                    <div
                      className="h-full bg-gradient-to-r from-hazmat-green to-glitch-red"
                      style={{ width: `${material.resistance}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono">
                    <span>FLEXIBILITY:</span>
                    <span>{material.flexibility}%</span>
                  </div>
                  <div className="h-1 bg-carbon-black/20">
                    <div
                      className="h-full bg-centrifuge-blue"
                      style={{ width: `${material.flexibility}%` }}
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Extreme Tests */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-8">EXTREME_TESTING_PROTOCOLS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tests.map(test => (
              <motion.div
                key={test.id}
                className="extreme-card bg-white p-8 relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-[10px] font-mono opacity-60">{test.id}</span>
                    <h3 className="text-2xl font-black mt-1">{test.name}</h3>
                    <p className="text-xs font-mono opacity-60 mt-1">{test.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono">DANGER:</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 ${
                            i < test.danger ? 'bg-glitch-red' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Progress Display */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span>{test.type.includes('BREAKING') ? 'LOAD' :
                           test.type.includes('THERMAL') ? 'TEMPERATURE' :
                           test.type.includes('SPEED') ? 'VELOCITY' : 'PRESSURE'}</span>
                    <span>
                      {test.type.includes('BREAKING') && test.currentLoad !== undefined && test.maxLoad ? `${test.currentLoad.toFixed(0)}/${test.maxLoad}` :
                       test.type.includes('THERMAL') && test.currentTemp !== undefined && test.maxTemp ? `${test.currentTemp.toFixed(0)}/${test.maxTemp}` :
                       test.type.includes('SPEED') && test.currentVelocity !== undefined && test.maxVelocity ? `${test.currentVelocity.toFixed(0)}/${test.maxVelocity}` :
                       test.currentPressure !== undefined && test.maxPressure ? `${test.currentPressure.toFixed(1)}/${test.maxPressure}` : '0/0'} {test.unit}
                    </span>
                  </div>
                  <div className="h-4 bg-carbon-black/20 relative overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full"
                      style={{
                        background: `linear-gradient(to right, #00FF00, #FF6B35, #FF0000)`,
                        width: `${
                          test.type.includes('BREAKING') && test.currentLoad !== undefined && test.maxLoad ? (test.currentLoad / test.maxLoad) * 100 :
                          test.type.includes('THERMAL') && test.currentTemp !== undefined && test.maxTemp ? (test.currentTemp / test.maxTemp) * 100 :
                          test.type.includes('SPEED') && test.currentVelocity !== undefined && test.maxVelocity ? (test.currentVelocity / test.maxVelocity) * 100 :
                          test.currentPressure !== undefined && test.maxPressure ? (test.currentPressure / test.maxPressure) * 100 : 0
                        }%`
                      }}
                      animate={{
                        opacity: activeTest === test.id ? [1, 0.7, 1] : 1
                      }}
                      transition={{
                        opacity: { duration: 0.5, repeat: Infinity }
                      }}
                    />
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    onClick={() => startTest(test.id)}
                    disabled={activeTest === test.id}
                    className={`flex-1 py-3 text-xs font-mono font-bold transition-all ${
                      activeTest === test.id
                        ? 'bg-safety-orange text-white'
                        : 'bg-carbon-black text-white hover:bg-safety-orange'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {activeTest === test.id ? 'TESTING...' : 'START_TEST'}
                  </motion.button>
                  {activeTest === test.id && (
                    <motion.button
                      onClick={stopTest}
                      className="px-6 py-3 bg-glitch-red text-white text-xs font-mono font-bold hover:bg-red-700 transition-colors"
                      whileTap={{ scale: 0.95 }}
                    >
                      ABORT
                    </motion.button>
                  )}
                </div>

                {/* Status Indicator */}
                {activeTest === test.id && (
                  <motion.div
                    className="absolute top-2 right-2 w-3 h-3 bg-glitch-red rounded-full"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Stream Terminal */}
      <section className="py-16 px-8 bg-carbon-black">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black p-6 font-mono text-green-500">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs">EXTREME_DATA_STREAM_V1.0</span>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
            </div>
            <div className="h-48 overflow-y-auto text-xs space-y-1">
              {dataStream.map((line, index) => (
                <div
                  key={index}
                  className={`opacity-80 ${
                    line.includes('CRITICAL') || line.includes('WARNING') ? 'text-red-500' :
                    line.includes('INITIATING') ? 'text-yellow-500' :
                    'text-green-500'
                  }`}
                >
                  {line}
                </div>
              ))}
              {activeTest && (
                <div className="animate-pulse">
                  MONITORING_EXTREME_CONDITIONS...
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Master Control */}
      <section className="py-16 px-8 bg-concrete-gray">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-white mb-6">MASTER_EXTREME_CONTROL</h2>
          <div className="bg-white p-8">
            <label className="text-xs font-mono font-bold block mb-4">
              GLOBAL_EXTREME_LEVEL: {extremeLevel.toFixed(0)}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={extremeLevel}
              onChange={(e) => setExtremeLevel(parseInt(e.target.value))}
              className="w-full mb-4"
              style={{
                background: `linear-gradient(to right, #00FF00 0%, #FF6B35 50%, #FF0000 100%)`
              }}
            />
            <div className="flex justify-between text-[10px] font-mono opacity-60">
              <span>SAFE</span>
              <span>EXTREME</span>
              <span>BREAKING_POINT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t-3 border-white bg-carbon-black">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-[10px] font-mono opacity-60 text-white">
            CINCH_LAB © 2025 — EXTREME_TESTING_DIVISION
          </p>
          <Link href="/lab" className="text-xs font-mono text-white hover:text-glitch-red transition-colors">
            RETURN_TO_LAB →
          </Link>
        </div>
      </footer>
    </div>
  )
}