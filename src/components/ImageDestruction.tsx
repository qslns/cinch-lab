'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface DestructionProps {
  images: string[]
  intensity?: number
}

export default function ImageDestruction({ images, intensity = 100 }: DestructionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [activeLayer, setActiveLayer] = useState(0)
  const [glitchAmount, setGlitchAmount] = useState(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setMousePos({ x, y })
      setGlitchAmount(Math.random() * intensity)
    }

    const layerInterval = setInterval(() => {
      setActiveLayer(prev => (prev + 1) % images.length)
    }, 100)

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      clearInterval(layerInterval)
    }
  }, [images.length, intensity])

  return (
    <div
      ref={containerRef}
      className="image-destruction-container"
      style={{
        '--mouse-x': `${mousePos.x}%`,
        '--mouse-y': `${mousePos.y}%`,
        '--glitch': glitchAmount,
      } as React.CSSProperties}
    >
      {images.map((src, index) => (
        <div
          key={src}
          className={`destruction-layer layer-${index}`}
          style={{
            zIndex: index === activeLayer ? 50 : index,
            opacity: index === activeLayer ? 1 : 0.1 + (index * 0.05),
            transform: `
              translateX(${Math.sin(index) * glitchAmount}px)
              translateY(${Math.cos(index) * glitchAmount}px)
              rotate(${(mousePos.x - 50) * 0.1 * (index + 1)}deg)
              scale(${1 + (Math.sin(Date.now() * 0.001 + index) * 0.1)})
            `,
            filter: `
              hue-rotate(${index * 30}deg)
              contrast(${1 + (index * 0.1)})
              brightness(${1 + (Math.sin(index) * 0.2)})
            `,
            mixBlendMode: index % 3 === 0 ? 'screen' :
                         index % 3 === 1 ? 'multiply' : 'difference',
          }}
        >
          <Image
            src={`/images/${src}`}
            alt=""
            fill
            className="object-cover"
            quality={30}
            priority={index < 3}
          />

          {/* RGB Channel Split */}
          <div className="channel-split">
            <div className="channel-r" style={{
              transform: `translateX(${glitchAmount * 0.5}px)`,
              opacity: 0.5,
            }} />
            <div className="channel-g" style={{
              transform: `translateX(${-glitchAmount * 0.5}px)`,
              opacity: 0.5,
            }} />
            <div className="channel-b" style={{
              transform: `translateY(${glitchAmount * 0.5}px)`,
              opacity: 0.5,
            }} />
          </div>

          {/* Fragment Overlay */}
          <div className="fragment-overlay" style={{
            clipPath: `polygon(
              ${20 + mousePos.x * 0.3}% ${10 + mousePos.y * 0.2}%,
              ${80 - mousePos.x * 0.2}% ${5 + mousePos.y * 0.3}%,
              ${90 - mousePos.x * 0.1}% ${95 - mousePos.y * 0.2}%,
              ${10 + mousePos.x * 0.2}% ${90 - mousePos.y * 0.1}%
            )`
          }} />
        </div>
      ))}

      {/* Scan Lines */}
      <div className="scan-lines" />

      {/* Noise Texture */}
      <div className="noise-texture" />

      {/* Data Corruption Text */}
      <div className="corruption-text">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              fontSize: `${10 + Math.random() * 30}px`,
              opacity: Math.random() * 0.5,
              color: ['#FF0000', '#00FFFF', '#FF00FF', '#00FF00'][Math.floor(Math.random() * 4)],
              animation: `glitch-text ${0.1 + Math.random() * 2}s infinite`,
              fontFamily: 'monospace',
            }}
          >
            {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
          </span>
        ))}
      </div>
    </div>
  )
}