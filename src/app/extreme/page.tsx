'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

const ImageDestruction = dynamic(() => import('@/components/ImageDestruction'), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-black animate-pulse" />
})

// Generate random image list from the folder
const generateImageList = (count: number) => {
  const images = []
  const imageNames = [
    'qslna_Abandoned_subway_tunnels_growing_organic_matter_rails_t_e5995bce-2b4a-4611-84c2-40f5d580a07e_0.png',
    'qslna_Abstract_composition_where_film_grain_has_become_three-_34a13c6e-864b-44dc-a756-61074c024369_1.png',
    'qslna_Abstract_macro_composition_exploring_texture_contrasts__226a24e1-97fd-4787-a32e-7caf625d2549_1.png',
    'qslna_Airport_terminal_where_planes_never_land_gates_opening__5cc8aa22-c8bd-412c-9744-51aed62ce1f4_0.png',
    'qslna_Arctic_ice_melting_upward_into_sky_glaciers_growing_bac_7c61370c-b0e7-488c-9202-c0e96d306bbd_0.png',
  ]
  for (let i = 0; i < count; i++) {
    images.push(imageNames[i % imageNames.length])
  }
  return images
}

export default function ExtremePage() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [glitchActive, setGlitchActive] = useState(false)
  const [chaos, setChaos] = useState(1)
  const [imageSet, setImageSet] = useState<string[]>([])
  const [touchPoints, setTouchPoints] = useState<{ x: number; y: number }[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setImageSet(generateImageList(30))

    const handleScroll = () => {
      const scroll = window.scrollY
      setScrollY(scroll)
      setChaos(1 + (scroll * 0.001))
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      if (Math.random() < 0.1) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 100)
      }
    }

    const handleTouch = (e: TouchEvent) => {
      const points = Array.from(e.touches).map(touch => ({
        x: touch.clientX,
        y: touch.clientY
      }))
      setTouchPoints(points)
    }

    // Chaos intensifier
    const chaosInterval = setInterval(() => {
      if (Math.random() < 0.3) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      }
    }, 2000)

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchstart', handleTouch)
    window.addEventListener('touchmove', handleTouch)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouch)
      window.removeEventListener('touchmove', handleTouch)
      clearInterval(chaosInterval)
    }
  }, [])

  const calculateDistortion = (index: number) => {
    const time = Date.now() * 0.001
    const x = Math.sin(time + index) * chaos * 50
    const y = Math.cos(time + index * 0.5) * chaos * 30
    const rotate = Math.sin(time * 0.5 + index) * chaos * 45
    const scale = 1 + Math.sin(time + index * 2) * chaos * 0.3
    return { x, y, rotate, scale }
  }

  return (
    <div ref={containerRef} className="extreme-container">
      {/* EXTREME CURSOR */}
      <div
        className="extreme-cursor"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: `${50 * chaos}px`,
          height: `${50 * chaos}px`,
        }}
      />

      {/* MULTI-LAYER NOISE */}
      <div className="noise-multi">
        <div className="noise-layer-1" />
        <div className="noise-layer-2" />
        <div className="noise-layer-3" />
      </div>

      {/* OPENING CHAOS - FULL SCREEN IMAGE DESTRUCTION */}
      <section className="min-h-[300vh] relative">
        <div className="sticky top-0 h-screen">
          <ImageDestruction
            images={imageSet.slice(0, 10)}
            intensity={chaos * 100}
          />

          {/* FLOATING TEXT CHAOS */}
          <div className="absolute inset-0 pointer-events-none z-50">
            <h1
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                text-[20vw] font-black uppercase tracking-tighter ${glitchActive ? 'glitch-extreme' : ''}`}
              style={{
                transform: `
                  translate(-50%, -50%)
                  rotate(${Math.sin(scrollY * 0.001) * 30}deg)
                  scale(${chaos})
                  skew(${Math.sin(scrollY * 0.002) * 20}deg)
                `,
                filter: `hue-rotate(${scrollY}deg)`,
                mixBlendMode: 'difference',
              }}
            >
              CINCH
            </h1>

            {/* SCATTERED LETTERS */}
            {'LABORATORY'.split('').map((letter, i) => (
              <span
                key={i}
                className="absolute text-6xl md:text-9xl font-black"
                style={{
                  left: `${10 + i * 8}%`,
                  top: `${20 + Math.sin(i) * 30}%`,
                  transform: `
                    rotate(${calculateDistortion(i).rotate}deg)
                    scale(${calculateDistortion(i).scale})
                    translateX(${calculateDistortion(i).x}px)
                    translateY(${calculateDistortion(i).y}px)
                  `,
                  color: ['#FF0000', '#00FFFF', '#FF00FF'][i % 3],
                  textShadow: `${i * 2}px ${i * 2}px 0 rgba(0,0,0,0.5)`,
                  animation: `float-chaos-${i % 3} ${2 + i * 0.5}s infinite`,
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SENSORY OVERLOAD GRID */}
      <section className="relative py-0 overflow-hidden bg-black">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-0">
          {imageSet.slice(10, 35).map((img, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden group"
              style={{
                transform: `rotate(${Math.sin(index) * 15}deg)`,
              }}
            >
              <Image
                src={`/웹 꾸미기 사진/${img}`}
                alt=""
                fill
                className="object-cover transition-all duration-300 group-hover:scale-150"
                style={{
                  filter: `
                    hue-rotate(${index * 72}deg)
                    contrast(${1.5 + Math.sin(index) * 0.5})
                    saturate(${2 + Math.cos(index) * 1})
                  `,
                  mixBlendMode: index % 2 === 0 ? 'screen' : 'multiply',
                }}
              />

              {/* Hover Destruction */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-transparent to-cyan-500 mix-blend-difference" />
                <div className="absolute inset-0 backdrop-filter backdrop-blur-xl" />
              </div>

              {/* Random Text Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white text-9xl font-black transform rotate-45">
                  {String.fromCharCode(33 + index)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3D NAVIGATION VORTEX */}
      <section className="relative h-[200vh] bg-gradient-to-b from-black via-red-900/20 to-black overflow-hidden">
        <div className="sticky top-0 h-screen perspective-1000">
          <div className="absolute inset-0 transform-3d" style={{
            transform: `rotateX(${scrollY * 0.1}deg) rotateY(${mousePos.x * 0.1}deg)`,
          }}>
            {[
              { href: '/chaos', label: 'CHAOS', z: 0 },
              { href: '/destruction', label: 'DESTROY', z: -100 },
              { href: '/void', label: 'VOID', z: -200 },
              { href: '/anarchy', label: 'ANARCHY', z: -300 },
              { href: '/extreme', label: 'EXTREME', z: -400 },
              { href: '/madness', label: 'MADNESS', z: -500 },
            ].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `
                    translate(-50%, -50%)
                    translateZ(${item.z}px)
                    rotateY(${i * 60}deg)
                    translateX(${Math.sin(i) * 300}px)
                  `,
                  fontSize: `${10 - i}rem`,
                  opacity: 1 - (i * 0.15),
                }}
              >
                <span className={`font-black text-white hover:text-red-500 transition-colors ${glitchActive ? 'glitch-text' : ''}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INFINITE SCROLL MADNESS */}
      <section className="relative overflow-hidden bg-black">
        <div className="flex animate-scroll-x">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-screen h-screen relative">
              <Image
                src={`/웹 꾸미기 사진/${imageSet[i % imageSet.length]}`}
                alt=""
                fill
                className="object-cover"
                style={{
                  filter: `hue-rotate(${i * 36}deg) contrast(2)`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-transparent" />
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CHAOS MESSAGE */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-radial from-red-900 via-black to-black">
        <div className="relative z-10 text-center">
          <h2 className="text-6xl md:text-9xl font-black mb-8">
            <span className="block transform rotate-[-5deg] text-red-500">FASHION</span>
            <span className="block transform rotate-[5deg] text-cyan-500">IS</span>
            <span className="block transform rotate-[-3deg] text-white">CHAOS</span>
          </h2>

          <Link
            href="/"
            className="inline-block px-12 py-6 text-2xl font-bold border-4 border-white
              hover:bg-white hover:text-black transition-all duration-500
              transform hover:scale-150 hover:rotate-180"
          >
            ESCAPE IF YOU CAN
          </Link>
        </div>

        {/* Background Chaos */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `chaos-particle ${2 + Math.random() * 3}s infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </section>

      {/* TOUCH RIPPLES FOR MOBILE */}
      {touchPoints.map((point, i) => (
        <div
          key={i}
          className="touch-ripple"
          style={{
            left: point.x,
            top: point.y,
          }}
        />
      ))}

      <style jsx>{`
        .extreme-container {
          position: relative;
          overflow-x: hidden;
          background: black;
        }

        .extreme-cursor {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          border: 2px solid cyan;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          mix-blend-mode: difference;
          animation: cursor-pulse 0.5s infinite;
        }

        @keyframes cursor-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.5); }
        }

        .noise-multi {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 100;
          opacity: 0.05;
        }

        .noise-layer-1,
        .noise-layer-2,
        .noise-layer-3 {
          position: absolute;
          inset: -50%;
          width: 200%;
          height: 200%;
          background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiIC8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==');
        }

        .noise-layer-1 { animation: noise-1 0.2s steps(10) infinite; }
        .noise-layer-2 { animation: noise-2 0.3s steps(10) infinite; }
        .noise-layer-3 { animation: noise-3 0.15s steps(10) infinite; }

        @keyframes noise-1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-5%, 5%); }
        }

        @keyframes noise-2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(5%, -5%); }
        }

        @keyframes noise-3 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-2%, -2%); }
        }

        .glitch-extreme {
          animation: glitch-extreme 0.3s infinite;
        }

        @keyframes glitch-extreme {
          0% {
            text-shadow:
              0.05em 0 0 #FF0000,
              -0.05em 0 0 #00FFFF,
              0 0.05em 0 #FF00FF;
          }
          15% {
            text-shadow:
              -0.05em -0.025em 0 #FF0000,
              0.025em 0.025em 0 #00FFFF,
              0 -0.05em 0 #FF00FF;
          }
          50% {
            text-shadow:
              0.025em 0.05em 0 #FF0000,
              0.025em -0.05em 0 #00FFFF,
              -0.05em 0 0 #FF00FF;
          }
          100% {
            text-shadow:
              -0.025em 0 0 #FF0000,
              0.025em 0 0 #00FFFF,
              0 0.025em 0 #FF00FF;
          }
        }

        @keyframes float-chaos-0 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-50px) rotate(180deg); }
        }

        @keyframes float-chaos-1 {
          0%, 100% { transform: translateX(0) rotate(0deg); }
          50% { transform: translateX(50px) rotate(-180deg); }
        }

        @keyframes float-chaos-2 {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, -30px) rotate(90deg); }
        }

        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-3d {
          transform-style: preserve-3d;
        }

        @keyframes scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll-x {
          animation: scroll-x 30s linear infinite;
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
              calc(var(--random-x, 100) * 1px - 50px),
              calc(var(--random-y, 100) * 1px - 50px)
            ) scale(0);
            opacity: 0;
          }
        }

        .touch-ripple {
          position: fixed;
          width: 100px;
          height: 100px;
          border: 2px solid cyan;
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          animation: ripple 1s ease-out forwards;
        }

        @keyframes ripple {
          0% {
            width: 100px;
            height: 100px;
            opacity: 1;
          }
          100% {
            width: 500px;
            height: 500px;
            opacity: 0;
          }
        }

        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-from), var(--tw-gradient-via), var(--tw-gradient-to));
        }
      `}</style>
    </div>
  )
}