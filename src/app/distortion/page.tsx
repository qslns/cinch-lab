'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'

// Custom hook for performance monitoring
const usePerformance = () => {
  const [fps, setFps] = useState(60)
  const frameCount = useRef(0)
  const lastTime = useRef(performance.now())

  useEffect(() => {
    let animationId: number

    const measureFPS = () => {
      frameCount.current++
      const currentTime = performance.now()

      if (currentTime >= lastTime.current + 1000) {
        setFps(Math.round((frameCount.current * 1000) / (currentTime - lastTime.current)))
        frameCount.current = 0
        lastTime.current = currentTime
      }

      animationId = requestAnimationFrame(measureFPS)
    }

    animationId = requestAnimationFrame(measureFPS)
    return () => cancelAnimationFrame(animationId)
  }, [])

  return fps
}

// Optimized Image Section with lazy loading
const DistortedImageSection = ({ src, index }: { src: string; index: number }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  })

  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div
      ref={ref}
      className="relative w-full h-screen overflow-hidden"
      style={{
        transform: inView ? 'scale(1)' : 'scale(0.8)',
        opacity: inView ? 1 : 0,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {inView && (
        <div className="absolute inset-0">
          <Image
            src={`/웹 꾸미기 사진/${src}`}
            alt=""
            fill
            className="object-cover"
            quality={60}
            onLoad={() => setIsLoaded(true)}
            style={{
              filter: `
                contrast(${1.5 + Math.sin(index) * 0.5})
                saturate(${2 + Math.cos(index) * 0.5})
                hue-rotate(${index * 72}deg)
              `,
              transform: isLoaded ? 'scale(1)' : 'scale(1.1)',
              opacity: isLoaded ? 1 : 0,
              transition: 'all 0.5s ease-out',
            }}
          />

          {/* Performance-optimized overlay */}
          <div
            className="absolute inset-0 mix-blend-multiply"
            style={{
              background: `linear-gradient(${index * 45}deg,
                rgba(255,0,255,0.2) 0%,
                transparent 50%,
                rgba(0,255,255,0.2) 100%)`,
              willChange: 'auto',
            }}
          />
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-6xl md:text-9xl font-black text-white mix-blend-difference">
          DISTORT {index}
        </h3>
      </div>
    </div>
  )
}

export default function DistortionPage() {
  const fps = usePerformance()
  const [qualityMode, setQualityMode] = useState<'extreme' | 'balanced' | 'performance'>('balanced')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [touchActive, setTouchActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Throttled scroll handler for performance
  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress((scrolled / maxScroll) * 100)
    })
  }, [])

  // Auto-adjust quality based on FPS
  useEffect(() => {
    if (fps < 30 && qualityMode !== 'performance') {
      setQualityMode('performance')
    } else if (fps > 50 && qualityMode === 'performance') {
      setQualityMode('balanced')
    } else if (fps > 55 && qualityMode === 'balanced') {
      setQualityMode('extreme')
    }
  }, [fps, qualityMode])

  useEffect(() => {
    // Optimized event listeners
    let scrollTimeout: NodeJS.Timeout
    const optimizedScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(handleScroll, 10)
    }

    window.addEventListener('scroll', optimizedScroll, { passive: true })
    window.addEventListener('touchstart', () => setTouchActive(true), { passive: true })
    window.addEventListener('touchend', () => setTouchActive(false), { passive: true })

    return () => {
      window.removeEventListener('scroll', optimizedScroll)
      window.removeEventListener('touchstart', () => setTouchActive(true))
      window.removeEventListener('touchend', () => setTouchActive(false))
    }
  }, [handleScroll])

  const images = [
    'qslna_Abandoned_subway_tunnels_growing_organic_matter_rails_t_e5995bce-2b4a-4611-84c2-40f5d580a07e_0.png',
    'qslna_Abstract_composition_where_film_grain_has_become_three-_34a13c6e-864b-44dc-a756-61074c024369_1.png',
    'qslna_Abstract_macro_composition_exploring_texture_contrasts__226a24e1-97fd-4787-a32e-7caf625d2549_1.png',
    'qslna_Airport_terminal_where_planes_never_land_gates_opening__5cc8aa22-c8bd-412c-9744-51aed62ce1f4_0.png',
    'qslna_Arctic_ice_melting_upward_into_sky_glaciers_growing_bac_7c61370c-b0e7-488c-9202-c0e96d306bbd_0.png',
  ]

  return (
    <div ref={containerRef} className="relative bg-black">
      {/* Performance Monitor */}
      <div className="fixed top-20 right-4 z-50 text-xs font-mono space-y-1 text-cyan-500">
        <div>FPS: {fps}</div>
        <div>MODE: {qualityMode.toUpperCase()}</div>
        <div>SCROLL: {scrollProgress.toFixed(0)}%</div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-black/50 z-50">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-magenta-500 transition-transform duration-100"
          style={{
            transform: `translateX(${scrollProgress - 100}%)`,
            willChange: 'transform'
          }}
        />
      </div>

      {/* Hero Section with Optimized Animation */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {/* Reduced particle count for performance */}
          {qualityMode !== 'performance' && [...Array(qualityMode === 'extreme' ? 100 : 50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${10 + Math.random() * 20}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`,
                opacity: 0.3,
                willChange: 'auto',
              }}
            />
          ))}
        </div>

        <h1 className="text-8xl md:text-[15rem] font-black text-center relative z-10">
          <span className="block" style={{
            background: 'linear-gradient(45deg, #FF0000, #00FFFF, #FF00FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            transform: `perspective(1000px) rotateX(${scrollProgress * 0.5}deg)`,
            willChange: 'transform',
          }}>
            DISTORTION
          </span>
          <span className="block text-2xl md:text-4xl tracking-[0.5em] text-white/50 mt-4">
            OPTIMIZED CHAOS
          </span>
        </h1>
      </section>

      {/* Lazy-loaded Image Sections */}
      {images.map((img, index) => (
        <DistortedImageSection key={img} src={img} index={index} />
      ))}

      {/* Final CTA Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="text-center space-y-8">
          <h2 className="text-6xl md:text-9xl font-black">
            <span className={qualityMode === 'extreme' ? 'glitch-text' : ''}>
              MAXIMUM
            </span>
            <span className="block text-cyan-500">
              PERFORMANCE
            </span>
          </h2>

          {/* Quality Mode Selector */}
          <div className="flex justify-center gap-4 mt-8">
            {(['performance', 'balanced', 'extreme'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setQualityMode(mode)}
                className={`px-6 py-3 border-2 ${
                  qualityMode === mode ? 'border-cyan-500 bg-cyan-500/20' : 'border-white/20'
                } hover:border-magenta-500 transition-all duration-300`}
              >
                <span className="font-bold uppercase">{mode}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          from {
            transform: translateY(0) translateX(0);
          }
          to {
            transform: translateY(-100vh) translateX(50px);
          }
        }
      `}</style>
    </div>
  )
}

// Hook for intersection observer
function useInView(options: { threshold: number; triggerOnce: boolean }) {
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting && options.triggerOnce) {
          observer.disconnect()
        }
      },
      { threshold: options.threshold }
    )

    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref, options.threshold, options.triggerOnce])

  return [setRef, inView] as const
}