'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import gsap from 'gsap'

// Waveform Types
const waveforms = [
  { id: 'SINE', frequency: 440, amplitude: 1, phase: 0 },
  { id: 'SQUARE', frequency: 220, amplitude: 1, phase: 0 },
  { id: 'SAWTOOTH', frequency: 880, amplitude: 1, phase: 0 },
  { id: 'TRIANGLE', frequency: 110, amplitude: 1, phase: 0 },
  { id: 'NOISE', frequency: 0, amplitude: 1, phase: 0 }
]

// Distortion Algorithms
const distortionModes = [
  {
    id: 'DST_001',
    name: 'HARMONIC_SATURATION',
    formula: 'f(x) = tanh(g·x)',
    intensity: 0,
    harmonics: 8,
    status: 'STABLE'
  },
  {
    id: 'DST_002',
    name: 'BITCRUSHER',
    formula: 'f(x) = floor(x·2^b)/2^b',
    intensity: 0,
    bitDepth: 16,
    status: 'PROCESSING'
  },
  {
    id: 'DST_003',
    name: 'WAVESHAPER',
    formula: 'f(x) = x/|x|·(1-e^(-|x|))',
    intensity: 0,
    curve: 'EXPONENTIAL',
    status: 'EXPERIMENTAL'
  },
  {
    id: 'DST_004',
    name: 'FREQUENCY_SHIFT',
    formula: 'f(x) = x·e^(2πi·Δf·t)',
    intensity: 0,
    shift: 0,
    status: 'UNSTABLE'
  }
]

export default function BrutalistDistortionPage() {
  const [activeWaveform, setActiveWaveform] = useState('SINE')
  const [distortionLevel, setDistortionLevel] = useState(0)
  const [selectedMode, setSelectedMode] = useState<string | null>(null)
  const [algorithms, setAlgorithms] = useState(distortionModes)
  const [signalStrength, setSignalStrength] = useState(100)
  const [noiseLevel, setNoiseLevel] = useState(0)
  const [systemAlert, setSystemAlert] = useState<string | null>(null)
  const [oscilloscopeData, setOscilloscopeData] = useState<number[]>([])
  const [spectrumData, setSpectrumData] = useState<number[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const oscillatorRef = useRef<OscillatorNode | null>(null)

  // Generate oscilloscope data
  useEffect(() => {
    const generateWaveform = () => {
      const samples = 256
      const data = new Array(samples)
      const waveform = waveforms.find(w => w.id === activeWaveform)
      if (!waveform) return

      for (let i = 0; i < samples; i++) {
        const t = i / samples
        let value = 0

        switch (activeWaveform) {
          case 'SINE':
            value = Math.sin(2 * Math.PI * t * 4)
            break
          case 'SQUARE':
            value = Math.sin(2 * Math.PI * t * 4) > 0 ? 1 : -1
            break
          case 'SAWTOOTH':
            value = 2 * (t * 4 - Math.floor(t * 4 + 0.5))
            break
          case 'TRIANGLE':
            value = 2 * Math.abs(2 * (t * 4 - Math.floor(t * 4 + 0.5))) - 1
            break
          case 'NOISE':
            value = Math.random() * 2 - 1
            break
        }

        // Apply distortion
        if (distortionLevel > 0) {
          const gain = 1 + distortionLevel / 10
          value = Math.tanh(value * gain)

          // Add harmonics
          if (distortionLevel > 50) {
            value += Math.sin(4 * Math.PI * t * 4) * 0.2 * (distortionLevel / 100)
            value += Math.sin(8 * Math.PI * t * 4) * 0.1 * (distortionLevel / 100)
          }
        }

        // Add noise
        if (noiseLevel > 0) {
          value += (Math.random() - 0.5) * noiseLevel / 100
        }

        data[i] = value * (signalStrength / 100)
      }

      setOscilloscopeData(data)
    }

    const interval = setInterval(generateWaveform, 50)
    return () => clearInterval(interval)
  }, [activeWaveform, distortionLevel, signalStrength, noiseLevel])

  // Generate spectrum data
  useEffect(() => {
    const generateSpectrum = () => {
      const bins = 32
      const data = new Array(bins)

      for (let i = 0; i < bins; i++) {
        let magnitude = 0

        // Primary frequency
        if (i === Math.floor(bins / 8)) {
          magnitude = 1 * (signalStrength / 100)
        }

        // Harmonics from distortion
        if (distortionLevel > 0) {
          const harmonicIndex = Math.floor(bins / 4) * (i + 1)
          if (harmonicIndex < bins) {
            magnitude += (distortionLevel / 100) * Math.exp(-i / 10)
          }
        }

        // Noise floor
        magnitude += Math.random() * 0.1 * (noiseLevel / 100)

        data[i] = Math.min(1, magnitude)
      }

      setSpectrumData(data)
    }

    const interval = setInterval(generateSpectrum, 100)
    return () => clearInterval(interval)
  }, [distortionLevel, signalStrength, noiseLevel])

  // Draw oscilloscope
  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const draw = () => {
      // Clear canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.1)'
      ctx.lineWidth = 1
      for (let i = 0; i <= 10; i++) {
        ctx.beginPath()
        ctx.moveTo(0, (canvas.height / 10) * i)
        ctx.lineTo(canvas.width, (canvas.height / 10) * i)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo((canvas.width / 10) * i, 0)
        ctx.lineTo((canvas.width / 10) * i, canvas.height)
        ctx.stroke()
      }

      // Draw waveform
      if (oscilloscopeData.length > 0) {
        ctx.strokeStyle = distortionLevel > 75 ? '#FF0000' : distortionLevel > 50 ? '#FF6B35' : '#00FF00'
        ctx.lineWidth = 2
        ctx.beginPath()

        oscilloscopeData.forEach((value, i) => {
          const x = (i / oscilloscopeData.length) * canvas.width
          const y = canvas.height / 2 - value * (canvas.height / 3)

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })

        ctx.stroke()
      }

      requestAnimationFrame(draw)
    }

    draw()
  }, [oscilloscopeData, distortionLevel])

  // System warnings
  useEffect(() => {
    if (distortionLevel > 80) {
      setSystemAlert('SIGNAL_CLIPPING_DETECTED')
      setTimeout(() => setSystemAlert(null), 3000)
    } else if (noiseLevel > 70) {
      setSystemAlert('EXCESSIVE_NOISE_FLOOR')
      setTimeout(() => setSystemAlert(null), 3000)
    }
  }, [distortionLevel, noiseLevel])

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.distortion-card', {
        y: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out'
      })
    })
    return () => ctx.revert()
  }, [])

  const toggleAlgorithm = (id: string) => {
    setAlgorithms(prev => prev.map(alg => {
      if (alg.id === id) {
        const newIntensity = alg.intensity === 0 ? Math.random() * 100 : 0
        setDistortionLevel(current => Math.min(100, current + (newIntensity > 0 ? 20 : -20)))
        return { ...alg, intensity: newIntensity }
      }
      return alg
    }))
    setSelectedMode(id)
  }

  return (
    <div className="min-h-screen bg-carbon-black relative">
      {/* Background Grid */}
      <div className="fixed inset-0 scientific-grid opacity-10 pointer-events-none" />

      {/* System Alert */}
      <AnimatePresence>
        {systemAlert && (
          <motion.div
            className="fixed top-20 left-0 right-0 z-50 bg-warning-yellow text-carbon-black py-2 px-8"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold">⚠ {systemAlert}</span>
              <span className="text-[10px] opacity-60">DISTORTION: {distortionLevel.toFixed(0)}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <section className="pt-24 pb-12 px-8 border-b-3 border-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-[clamp(60px,8vw,120px)] font-black brutalist-heading leading-[0.8] text-white">
                WAVE<br />
                <span className="text-safety-orange">FORM</span>
              </h1>
              <p className="text-xs font-mono mt-4 opacity-60 text-white">
                SIGNAL_DISTORTION_LABORATORY
              </p>
            </div>
            <div className="text-right text-white">
              <div className="text-[10px] font-mono space-y-1">
                <div>DISTORTION: {distortionLevel.toFixed(0)}%</div>
                <div>SIGNAL: {signalStrength.toFixed(0)}%</div>
                <div>NOISE: {noiseLevel.toFixed(0)}dB</div>
                <div className={`${distortionLevel > 75 ? 'text-glitch-red flicker' : 'text-hazmat-green'}`}>
                  STATUS: {distortionLevel > 75 ? 'CLIPPING' : 'CLEAN'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waveform Selector */}
      <section className="py-8 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono font-bold">WAVEFORM:</span>
            {waveforms.map(wave => (
              <button
                key={wave.id}
                onClick={() => setActiveWaveform(wave.id)}
                className={`px-4 py-2 text-xs font-mono transition-all ${
                  activeWaveform === wave.id
                    ? 'bg-carbon-black text-white'
                    : 'bg-white border border-carbon-black hover:bg-gray-100'
                }`}
              >
                {wave.id}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Control Panel */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Oscilloscope */}
          <div className="bg-black p-6 border-3 border-hazmat-green">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-mono text-hazmat-green">OSCILLOSCOPE</h3>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-hazmat-green rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-hazmat-green">MONITORING</span>
              </div>
            </div>
            <canvas
              ref={canvasRef}
              className="w-full h-64 bg-black"
            />
            <div className="mt-4 grid grid-cols-2 gap-4 text-[10px] font-mono text-hazmat-green">
              <div>TIME/DIV: 1ms</div>
              <div>VOLT/DIV: 500mV</div>
              <div>TRIGGER: AUTO</div>
              <div>COUPLING: AC</div>
            </div>
          </div>

          {/* Spectrum Analyzer */}
          <div className="bg-white p-6 border-3 border-carbon-black">
            <h3 className="text-xs font-mono mb-4">FREQUENCY_SPECTRUM</h3>
            <div className="h-64 flex items-end justify-between gap-1">
              {spectrumData.map((magnitude, i) => (
                <motion.div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-safety-orange to-glitch-red"
                  animate={{ height: `${magnitude * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              ))}
            </div>
            <div className="mt-4 flex justify-between text-[10px] font-mono opacity-60">
              <span>20Hz</span>
              <span>200Hz</span>
              <span>2kHz</span>
              <span>20kHz</span>
            </div>
          </div>
        </div>
      </section>

      {/* Distortion Algorithms */}
      <section className="py-16 px-8 bg-concrete-gray">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-8">DISTORTION_ALGORITHMS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {algorithms.map(alg => (
              <motion.div
                key={alg.id}
                className="distortion-card bg-white p-6 cursor-pointer"
                onClick={() => toggleAlgorithm(alg.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[10px] font-mono opacity-60">{alg.id}</span>
                    <h3 className="text-sm font-black mt-1">{alg.name}</h3>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    alg.intensity > 0 ? 'bg-glitch-red animate-pulse' : 'bg-gray-300'
                  }`} />
                </div>

                <div className="text-[10px] font-mono space-y-2">
                  <div className="chemical-formula">{alg.formula}</div>
                  <div className="flex justify-between">
                    <span className="opacity-60">INTENSITY:</span>
                    <span>{alg.intensity.toFixed(0)}%</span>
                  </div>
                  <div className="h-1 bg-carbon-black/20 relative">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-safety-orange"
                      animate={{ width: `${alg.intensity}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Control Sliders */}
      <section className="py-16 px-8 bg-carbon-black">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <label className="text-xs font-mono text-white block mb-2">
              MASTER_DISTORTION: {distortionLevel.toFixed(0)}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={distortionLevel}
              onChange={(e) => setDistortionLevel(parseInt(e.target.value))}
              className="w-full"
              style={{
                background: `linear-gradient(to right, #00FF00 0%, #FF6B35 50%, #FF0000 100%)`
              }}
            />
          </div>

          <div>
            <label className="text-xs font-mono text-white block mb-2">
              SIGNAL_STRENGTH: {signalStrength.toFixed(0)}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={signalStrength}
              onChange={(e) => setSignalStrength(parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-white block mb-2">
              NOISE_FLOOR: {noiseLevel.toFixed(0)}dB
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={noiseLevel}
              onChange={(e) => setNoiseLevel(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t-3 border-white bg-carbon-black">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-[10px] font-mono opacity-60 text-white">
            CINCH_LAB © 2025 — WAVEFORM_DIVISION
          </p>
          <Link href="/lab" className="text-xs font-mono text-white hover:text-safety-orange transition-colors">
            RETURN_TO_LAB →
          </Link>
        </div>
      </footer>
    </div>
  )
}