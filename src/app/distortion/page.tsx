'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const waveforms = [
  { id: 'SINE', frequency: 440 },
  { id: 'SQUARE', frequency: 220 },
  { id: 'SAWTOOTH', frequency: 880 },
  { id: 'TRIANGLE', frequency: 110 }
]

const distortionModes = [
  {
    id: 'DST_001',
    name: 'HARMONIC_SATURATION',
    formula: 'f(x) = tanh(g·x)',
    status: 'STABLE'
  },
  {
    id: 'DST_002',
    name: 'BITCRUSHER',
    formula: 'f(x) = floor(x·2^b)/2^b',
    status: 'PROCESSING'
  },
  {
    id: 'DST_003',
    name: 'WAVESHAPER',
    formula: 'f(x) = x/|x|·(1-e^(-|x|))',
    status: 'EXPERIMENTAL'
  },
  {
    id: 'DST_004',
    name: 'FREQUENCY_SHIFT',
    formula: 'f(x) = x·e^(2πi·Δf·t)',
    status: 'UNSTABLE'
  }
]

export default function DistortionPage() {
  const [activeWaveform, setActiveWaveform] = useState('SINE')
  const [distortionLevel, setDistortionLevel] = useState(0)
  const [selectedMode, setSelectedMode] = useState<string | null>(null)
  const [oscilloscopeData, setOscilloscopeData] = useState<number[]>([])
  const [spectrumData, setSpectrumData] = useState<number[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const generateWaveform = () => {
      const samples = 256
      const data = new Array(samples)

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
        }

        if (distortionLevel > 0) {
          const gain = 1 + distortionLevel / 10
          value = Math.tanh(value * gain)
        }

        data[i] = value
      }

      setOscilloscopeData(data)
    }

    const interval = setInterval(generateWaveform, 50)
    return () => clearInterval(interval)
  }, [activeWaveform, distortionLevel])

  useEffect(() => {
    const generateSpectrum = () => {
      const bins = 32
      const data = new Array(bins)

      for (let i = 0; i < bins; i++) {
        let magnitude = 0

        if (i === Math.floor(bins / 8)) {
          magnitude = 1
        }

        if (distortionLevel > 0) {
          magnitude += (distortionLevel / 100) * Math.exp(-i / 10)
        }

        data[i] = Math.min(1, magnitude)
      }

      setSpectrumData(data)
    }

    const interval = setInterval(generateSpectrum, 100)
    return () => clearInterval(interval)
  }, [distortionLevel])

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

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

      if (oscilloscopeData.length > 0) {
        ctx.strokeStyle = distortionLevel > 75 ? '#FF0000' : distortionLevel > 50 ? 'var(--sacai-burnt-orange)' : '#00FF00'
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--margiela-carbon)' }}>
      <div className="fixed inset-0 exposed-grid opacity-10 pointer-events-none" />

      {/* Header */}
      <section className="pt-24 pb-12 px-8 border-b-3" style={{ borderColor: 'var(--white-label)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-display-1 font-black tracking-tightest leading-none" style={{ color: 'var(--white-label)', rotate: '-1deg' }}>
                WAVE<br />
                <span style={{ color: 'var(--sacai-burnt-orange)' }}>FORM</span>
              </h1>
              <p className="text-label mt-4 opacity-60" style={{ color: 'var(--white-label)' }}>
                SIGNAL_DISTORTION_LABORATORY
              </p>
            </div>
            <div className="text-right" style={{ color: 'var(--white-label)' }}>
              <div className="text-micro font-mono space-y-1">
                <div>DISTORTION: {distortionLevel.toFixed(0)}%</div>
                <div className={distortionLevel > 75 ? 'text-cdg-black' : ''} style={{ color: distortionLevel > 75 ? 'var(--cdg-blood-red)' : 'inherit' }}>
                  STATUS: {distortionLevel > 75 ? 'CLIPPING' : 'CLEAN'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waveform Selector */}
      <section className="py-8 px-8" style={{ backgroundColor: 'var(--white-label)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <span className="text-label font-bold">WAVEFORM:</span>
            {waveforms.map(wave => (
              <button
                key={wave.id}
                onClick={() => setActiveWaveform(wave.id)}
                className="px-4 py-2 text-label font-mono transition-all"
                style={{
                  backgroundColor: activeWaveform === wave.id ? 'var(--margiela-carbon)' : 'var(--white-label)',
                  color: activeWaveform === wave.id ? 'var(--white-label)' : 'var(--margiela-carbon)',
                  border: activeWaveform === wave.id ? 'none' : '1px solid var(--margiela-carbon)'
                }}
              >
                {wave.id}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Control Panel */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto margiela-grid gap-8">
          {/* Oscilloscope */}
          <div className="p-6 border-3" style={{ backgroundColor: 'var(--margiela-carbon)', borderColor: '#00FF00' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-label font-mono" style={{ color: '#00FF00' }}>OSCILLOSCOPE</h3>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#00FF00' }} />
                <span className="text-micro font-mono" style={{ color: '#00FF00' }}>MONITORING</span>
              </div>
            </div>
            <canvas
              ref={canvasRef}
              className="w-full h-64"
              style={{ backgroundColor: 'var(--margiela-carbon)' }}
            />
          </div>

          {/* Spectrum Analyzer */}
          <div className="p-6 border-3" style={{ backgroundColor: 'var(--white-label)', borderColor: 'var(--margiela-carbon)' }}>
            <h3 className="text-label font-mono mb-4">FREQUENCY_SPECTRUM</h3>
            <div className="h-64 flex items-end justify-between gap-1">
              {spectrumData.map((magnitude, i) => (
                <div
                  key={i}
                  className="flex-1 transition-all duration-100"
                  style={{
                    height: `${magnitude * 100}%`,
                    background: `linear-gradient(to top, var(--sacai-burnt-orange), var(--cdg-blood-red))`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Distortion Algorithms */}
      <section className="py-16 px-8" style={{ backgroundColor: 'var(--margiela-concrete)' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-heading-3 font-black mb-8">DISTORTION_ALGORITHMS</h2>
          <div className="diagonal-flow gap-4">
            {distortionModes.map((alg, index) => (
              <div
                key={alg.id}
                className="p-6 cursor-pointer transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: 'var(--white-label)',
                  rotate: `${index * 2 - 3}deg`
                }}
                onClick={() => setSelectedMode(alg.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-micro font-mono opacity-60">{alg.id}</span>
                    <h3 className="text-heading-6 font-black mt-1">{alg.name}</h3>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    alg.status === 'STABLE' ? 'bg-green-500' :
                    alg.status === 'PROCESSING' ? 'bg-yellow-500' :
                    alg.status === 'EXPERIMENTAL' ? 'bg-orange-500' : 'bg-red-500'
                  }`} />
                </div>

                <div className="text-micro font-mono">
                  <div className="chemical-formula">{alg.formula}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Control Sliders */}
      <section className="py-16 px-8" style={{ backgroundColor: 'var(--margiela-carbon)' }}>
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <label className="text-label font-mono block mb-2" style={{ color: 'var(--white-label)' }}>
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
                background: `linear-gradient(to right, #00FF00 0%, var(--sacai-burnt-orange) 50%, var(--cdg-blood-red) 100%)`
              }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t-3" style={{ backgroundColor: 'var(--margiela-carbon)', borderColor: 'var(--white-label)' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-micro font-mono opacity-60" style={{ color: 'var(--white-label)' }}>
            CINCH_LAB © 2025 — WAVEFORM_DIVISION
          </p>
          <Link href="/lab" className="text-label font-mono transition-colors" style={{ color: 'var(--white-label)' }}>
            RETURN_TO_LAB →
          </Link>
        </div>
      </footer>
    </div>
  )
}