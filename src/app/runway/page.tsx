'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Model {
  id: number
  name: string
  look: string
  image: string
  position: number
}

export default function RunwayPage() {
  const [currentModel, setCurrentModel] = useState(0)
  const [isWalking, setIsWalking] = useState(false)
  const [strobeActive, setStrobeActive] = useState(false)
  const [cameraAngle, setCameraAngle] = useState(0)
  const [audioLevel, setAudioLevel] = useState(0)
  const runwayRef = useRef<HTMLDivElement>(null)

  const models: Model[] = [
    {
      id: 1,
      name: 'CHAOS INCARNATE',
      look: 'VOID COLLECTION SS25',
      image: 'qslna_Abandoned_subway_tunnels_growing_organic_matter_rails_t_e5995bce-2b4a-4611-84c2-40f5d580a07e_0.png',
      position: 0
    },
    {
      id: 2,
      name: 'DIGITAL DECAY',
      look: 'CORRUPTION FW25',
      image: 'qslna_Abstract_composition_where_film_grain_has_become_three-_34a13c6e-864b-44dc-a756-61074c024369_1.png',
      position: 100
    },
    {
      id: 3,
      name: 'FRAGMENTED REALITY',
      look: 'DISTORTION SS25',
      image: 'qslna_Abstract_macro_composition_exploring_texture_contrasts__226a24e1-97fd-4787-a32e-7caf625d2549_1.png',
      position: 200
    },
    {
      id: 4,
      name: 'TERMINAL FASHION',
      look: 'LIMINAL FW25',
      image: 'qslna_Airport_terminal_where_planes_never_land_gates_opening__5cc8aa22-c8bd-412c-9744-51aed62ce1f4_0.png',
      position: 300
    },
    {
      id: 5,
      name: 'ARCTIC MELTDOWN',
      look: 'CLIMATE CHAOS SS25',
      image: 'qslna_Arctic_ice_melting_upward_into_sky_glaciers_growing_bac_7c61370c-b0e7-488c-9202-c0e96d306bbd_0.png',
      position: 400
    }
  ]

  useEffect(() => {
    // Auto-walk sequence
    const walkInterval = setInterval(() => {
      setIsWalking(true)
      setTimeout(() => {
        setCurrentModel((prev) => (prev + 1) % models.length)
        setIsWalking(false)
      }, 3000)
    }, 5000)

    // Strobe effect
    const strobeInterval = setInterval(() => {
      setStrobeActive(true)
      setTimeout(() => setStrobeActive(false), 100)
    }, 8000)

    // Camera movement
    const cameraInterval = setInterval(() => {
      setCameraAngle((prev) => (prev + 1) % 360)
    }, 50)

    // Simulated audio levels
    const audioInterval = setInterval(() => {
      setAudioLevel(Math.random() * 100)
    }, 100)

    return () => {
      clearInterval(walkInterval)
      clearInterval(strobeInterval)
      clearInterval(cameraInterval)
      clearInterval(audioInterval)
    }
  }, [models.length])

  return (
    <div ref={runwayRef} className="relative min-h-screen bg-black overflow-hidden">
      {/* Strobe Effect */}
      {strobeActive && (
        <div className="fixed inset-0 bg-white z-[9999] pointer-events-none animate-pulse" />
      )}

      {/* Audio Visualizer Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 flex items-end justify-center">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="w-[2%] bg-gradient-to-t from-cyan-500 to-magenta-500 mx-px"
              style={{
                height: `${(Math.sin(i * 0.5 + audioLevel * 0.1) + 1) * 50}%`,
                opacity: 0.3,
                transition: 'height 0.1s ease-out'
              }}
            />
          ))}
        </div>
      </div>

      {/* Stage Lights */}
      <div className="fixed top-0 left-0 right-0 h-32 z-20">
        <div className="relative h-full">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute top-8"
              style={{
                left: `${i * 10}%`,
                transform: `rotate(${Math.sin(cameraAngle * 0.1 + i) * 30}deg)`
              }}
            >
              <div className="w-16 h-16 bg-white rounded-full opacity-50 animate-pulse"
                   style={{
                     boxShadow: `0 0 100px 50px rgba(255,255,255,0.5)`,
                     animationDelay: `${i * 0.1}s`
                   }} />
            </div>
          ))}
        </div>
      </div>

      {/* Runway Title */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="text-center z-30">
          <h1 className="text-9xl md:text-[20rem] font-black tracking-tighter">
            <span className="block" style={{
              background: 'linear-gradient(90deg, #FF0000, #FF00FF, #00FFFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transform: `perspective(1000px) rotateY(${cameraAngle}deg)`,
              animation: 'text-warp 3s ease-in-out infinite'
            }}>
              RUNWAY
            </span>
          </h1>
          <p className="text-2xl md:text-4xl text-white/50 tracking-[1em] mt-4">
            EXTREME FASHION SHOW
          </p>
        </div>

        {/* Floating runway markers */}
        <div className="absolute bottom-0 left-0 right-0 h-32">
          <div className="relative h-full">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-0 w-1 h-full bg-gradient-to-t from-white to-transparent opacity-20"
                style={{
                  left: `${i * 5}%`,
                  transform: `scaleY(${Math.sin(cameraAngle * 0.05 + i) * 0.5 + 0.5})`
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* The Runway */}
      <section className="relative min-h-[150vh] perspective-1000">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          {/* Runway Floor */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white/10 to-transparent"
               style={{
                 transform: `perspective(500px) rotateX(70deg) translateZ(-100px)`,
                 transformOrigin: 'bottom center'
               }}>
            <div className="absolute inset-0">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 h-px bg-cyan-500/30"
                  style={{
                    top: `${i * 3.33}%`,
                    transform: `translateZ(${i * 10}px)`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Models */}
          <div className="relative z-20 w-full max-w-6xl mx-auto">
            {models.map((model, index) => (
              <div
                key={model.id}
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-3000 ${
                  index === currentModel ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}
                style={{
                  transform: `
                    translate(-50%, -50%)
                    translateZ(${index === currentModel ? 0 : -500}px)
                    rotateY(${index === currentModel ? 0 : 180}deg)
                    ${isWalking && index === currentModel ? 'translateX(100vw)' : ''}
                  `,
                  transition: isWalking ? 'all 3s linear' : 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div className="relative w-96 h-[600px]">
                  <Image
                    src={`/웹 꾸미기 사진/${model.image}`}
                    alt={model.name}
                    fill
                    className="object-cover"
                    style={{
                      filter: `contrast(2) saturate(1.5) hue-rotate(${index * 72}deg)`,
                      clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'
                    }}
                  />

                  {/* Model Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-3xl font-black text-white mb-2 glitch-text">
                      {model.name}
                    </h3>
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-500">
                      {model.look}
                    </p>
                  </div>

                  {/* Glitch overlay */}
                  {index === currentModel && (
                    <div className="absolute inset-0 mix-blend-screen opacity-50">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-transparent to-cyan-500"
                           style={{
                             animation: 'glitch-slide 0.5s infinite',
                             backgroundSize: '200% 100%'
                           }} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Model Counter */}
          <div className="absolute top-8 left-8 z-30">
            <div className="text-6xl font-black text-white/20">
              {String(currentModel + 1).padStart(2, '0')}
              <span className="text-2xl">/{String(models.length).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-4">
            {models.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentModel(index)}
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  index === currentModel ? 'border-cyan-500 bg-cyan-500' : 'border-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* After Party */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {/* Chaos background */}
          <div className="absolute inset-0">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `chaos-particle ${2 + Math.random() * 3}s infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center">
          <h2 className="text-6xl md:text-9xl font-black mb-8">
            <span className="block text-red-500">SHOW</span>
            <span className="block text-cyan-500">NEVER</span>
            <span className="block text-white">ENDS</span>
          </h2>

          <Link
            href="/chaos"
            className="inline-block px-12 py-6 text-2xl font-bold border-4 border-white hover:bg-white hover:text-black transition-all duration-500 transform hover:scale-110 hover:rotate-3"
          >
            ENTER AFTERPARTY
          </Link>
        </div>
      </section>

      <style jsx>{`
        @keyframes glitch-slide {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        @keyframes chaos-particle {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(100px - 50px),
              calc(-100px)
            ) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}