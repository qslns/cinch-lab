'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

export default function VoidPage() {
  const [depth, setDepth] = useState(0)
  const [voidLevel, setVoidLevel] = useState(1)
  const [particles, setParticles] = useState<{ x: number; y: number; z: number; speed: number }[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isDescending, setIsDescending] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioContext = useRef<AudioContext | null>(null)

  useEffect(() => {
    // Initialize particles
    const newParticles = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random() * 1000,
      speed: 0.5 + Math.random() * 2
    }))
    setParticles(newParticles)

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    // Scroll into the void
    const handleScroll = () => {
      const scroll = window.scrollY
      setDepth(scroll)
      setVoidLevel(Math.floor(scroll / 1000) + 1)

      if (scroll > 500) {
        setIsDescending(true)
      }
    }

    // Ambient sound generation (optional)
    const initAudio = () => {
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
    }

    // Canvas animation
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const animate = () => {
        if (!ctx) return

        // Clear with fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw void tendrils
        ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 + Math.sin(Date.now() * 0.001) * 0.05})`
        ctx.lineWidth = 1

        for (let i = 0; i < 10; i++) {
          ctx.beginPath()
          const startX = mousePos.x + Math.sin(Date.now() * 0.001 + i) * 100
          const startY = mousePos.y + Math.cos(Date.now() * 0.001 + i) * 100

          ctx.moveTo(startX, startY)

          for (let j = 0; j < 50; j++) {
            const x = startX + Math.sin(j * 0.1 + Date.now() * 0.001) * j * 2
            const y = startY + Math.cos(j * 0.1 + Date.now() * 0.001) * j * 2
            ctx.lineTo(x, y)
          }

          ctx.stroke()
        }

        requestAnimationFrame(animate)
      }

      animate()
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('click', initAudio, { once: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      if (audioContext.current) {
        audioContext.current.close()
      }
    }
  }, [mousePos.x, mousePos.y])

  // Generate void anomalies
  const generateAnomalies = () => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 50 + Math.random() * 200,
      rotation: Math.random() * 360,
      opacity: 0.1 + Math.random() * 0.3
    }))
  }

  return (
    <div className="relative bg-black overflow-x-hidden">
      {/* Canvas for void effects */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10"
        style={{ opacity: 0.5 }}
      />

      {/* Void Entry */}
      <section className="relative h-screen flex items-center justify-center">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px,
              transparent 0%,
              rgba(0, 0, 0, 0.5) 20%,
              rgba(0, 0, 0, 0.9) 50%,
              black 100%)`
          }}
        />

        <div className="relative z-20 text-center">
          <h1 className="text-9xl md:text-[20rem] font-black tracking-tighter"
              style={{
                opacity: 1 - depth * 0.001,
                transform: `scale(${1 + depth * 0.001}) translateZ(${depth}px)`,
                filter: `blur(${depth * 0.01}px)`,
                color: 'white',
                textShadow: `0 0 ${20 + depth * 0.1}px cyan`
              }}>
            VOID
          </h1>
          <p className="text-xl md:text-2xl text-cyan-500/50 tracking-[1em] mt-8"
             style={{ opacity: 1 - depth * 0.002 }}>
            ENTER THE NOTHINGNESS
          </p>
        </div>

        {/* Floating particles */}
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              transform: `translateZ(${particle.z - depth * particle.speed}px)`,
              opacity: 0.5 - (particle.z / 2000)
            }}
          />
        ))}
      </section>

      {/* Void Levels - Descending into madness */}
      {[...Array(10)].map((_, level) => (
        <section
          key={level}
          className="relative h-[150vh]"
          style={{
            background: `linear-gradient(to bottom,
              black 0%,
              ${level % 2 === 0 ? '#001122' : '#110022'} 50%,
              black 100%)`
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-6xl md:text-9xl font-black"
                style={{
                  opacity: depth > level * 1000 ? 1 : 0,
                  transform: `rotate(${Math.sin(level) * 45}deg) scale(${1 + Math.cos(level) * 0.5})`,
                  color: level % 2 === 0 ? 'cyan' : 'magenta',
                  mixBlendMode: 'difference',
                  filter: `blur(${Math.abs(5 - level)}px)`,
                  transition: 'opacity 2s'
                }}>
              LEVEL {level + 1}
            </h2>
          </div>

          {/* Void Anomalies */}
          {generateAnomalies().map((anomaly) => (
            <div
              key={anomaly.id}
              className="absolute"
              style={{
                left: `${anomaly.x}%`,
                top: `${anomaly.y}%`,
                width: `${anomaly.size}px`,
                height: `${anomaly.size}px`,
                transform: `rotate(${anomaly.rotation + depth * 0.1}deg)`,
                opacity: anomaly.opacity
              }}
            >
              <div className="w-full h-full relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full animate-pulse" />
                <div className="absolute inset-4 bg-gradient-to-tr from-magenta-500/20 to-transparent rounded-full animate-pulse"
                     style={{ animationDelay: '0.5s' }} />
                <div className="absolute inset-8 bg-gradient-to-bl from-white/10 to-transparent rounded-full animate-pulse"
                     style={{ animationDelay: '1s' }} />
              </div>
            </div>
          ))}

          {/* Corrupted Images */}
          {level % 3 === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 opacity-20">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="relative w-32 h-32">
                    <Image
                      src={`/웹 꾸미기 사진/qslna_Abstract_composition_where_film_grain_has_become_three-_34a13c6e-864b-44dc-a756-61074c024369_1.png`}
                      alt=""
                      fill
                      className="object-cover"
                      style={{
                        filter: `invert(1) hue-rotate(${i * 40}deg) contrast(2)`,
                        transform: `scale(${1 + Math.sin(depth * 0.001 + i) * 0.5})`,
                        opacity: Math.sin(depth * 0.001 + i) * 0.5 + 0.5
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      ))}

      {/* The Bottom of the Void */}
      <section className="relative h-screen bg-black flex items-center justify-center">
        <div className="absolute inset-0">
          {/* Void vortex */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[80vw] h-[80vw] max-w-[800px] max-h-[800px]">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-0 border border-cyan-500/20 rounded-full"
                  style={{
                    transform: `scale(${1 - i * 0.05}) rotate(${i * 18 + depth * 0.1}deg)`,
                    animation: `spin ${10 + i}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 glitch-text">
            YOU'VE REACHED THE BOTTOM
          </h2>
          <p className="text-xl text-cyan-500/50 mb-8">
            THERE IS NO ESCAPE
          </p>
          <p className="text-sm tracking-[0.5em] text-white/30">
            VOID LEVEL: {voidLevel}
          </p>
          <p className="text-sm tracking-[0.5em] text-white/30">
            DEPTH: {depth.toFixed(0)}px
          </p>
        </div>
      </section>

      {/* Hidden Messages */}
      {isDescending && (
        <div className="fixed bottom-8 left-8 right-8 text-center z-50">
          <p className="text-xs tracking-[0.5em] text-cyan-500/30 animate-pulse">
            KEEP DESCENDING INTO THE VOID
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}