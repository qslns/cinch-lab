'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: number
  name: string
  price: string
  image: string
  category: string
}

const generateProducts = (): Product[] => {
  const names = ['VOID', 'CHAOS', 'ANARCHY', 'DISTORT', 'FRAGMENT', 'CORRUPT', 'GLITCH', 'BREAK']
  const categories = ['JACKET', 'PANTS', 'SHIRT', 'DRESS', 'ACCESSORY']
  const images = [
    'qslna_Abandoned_subway_tunnels_growing_organic_matter_rails_t_e5995bce-2b4a-4611-84c2-40f5d580a07e_0.png',
    'qslna_Abstract_composition_where_film_grain_has_become_three-_34a13c6e-864b-44dc-a756-61074c024369_1.png',
    'qslna_Abstract_macro_composition_exploring_texture_contrasts__226a24e1-97fd-4787-a32e-7caf625d2549_1.png',
    'qslna_Airport_terminal_where_planes_never_land_gates_opening__5cc8aa22-c8bd-412c-9744-51aed62ce1f4_0.png',
    'qslna_Arctic_ice_melting_upward_into_sky_glaciers_growing_bac_7c61370c-b0e7-488c-9202-c0e96d306bbd_0.png',
  ]

  return Array.from({ length: 50 }, (_, i) => ({
    id: i,
    name: `${names[i % names.length]} ${categories[i % categories.length]}`,
    price: `$${Math.floor(Math.random() * 9000 + 1000)}`,
    image: images[i % images.length],
    category: categories[i % categories.length]
  }))
}

export default function ChaosCollections() {
  const [products, setProducts] = useState<Product[]>([])
  const [viewMode, setViewMode] = useState<'chaos' | 'grid' | 'vortex' | 'explode'>('chaos')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [glitchText, setGlitchText] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setProducts(generateProducts())

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const glitchInterval = setInterval(() => {
      setGlitchText(true)
      setTimeout(() => setGlitchText(false), 200)
    }, 3000)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      clearInterval(glitchInterval)
    }
  }, [])

  const getProductStyle = (index: number) => {
    const time = Date.now() * 0.001

    switch (viewMode) {
      case 'chaos':
        return {
          position: 'absolute' as const,
          left: `${(Math.sin(index * 0.5) + 1) * 40}%`,
          top: `${(Math.cos(index * 0.3) + 1) * 40}%`,
          transform: `
            rotate(${Math.sin(time + index) * 30}deg)
            scale(${0.8 + Math.sin(time * 0.5 + index) * 0.3})
            translateZ(${Math.sin(index) * 100}px)
          `,
          zIndex: Math.floor(Math.random() * 100),
          transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }

      case 'vortex':
        const angle = (index / products.length) * Math.PI * 2
        const radius = 200 + index * 5
        return {
          position: 'absolute' as const,
          left: '50%',
          top: '50%',
          transform: `
            translate(-50%, -50%)
            translateX(${Math.cos(angle + time) * radius}px)
            translateY(${Math.sin(angle + time) * radius}px)
            rotate(${angle * 180 / Math.PI + time * 50}deg)
            scale(${0.5 + (index / products.length) * 0.5})
          `,
          zIndex: products.length - index,
          transition: 'none'
        }

      case 'explode':
        const explodeX = (Math.random() - 0.5) * window.innerWidth
        const explodeY = (Math.random() - 0.5) * window.innerHeight
        return {
          position: 'absolute' as const,
          left: '50%',
          top: '50%',
          transform: `
            translate(-50%, -50%)
            translateX(${explodeX}px)
            translateY(${explodeY}px)
            rotate(${Math.random() * 720 - 360}deg)
            scale(${Math.random() * 2})
          `,
          opacity: Math.random(),
          zIndex: Math.floor(Math.random() * 100),
          transition: 'all 2s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        }

      default:
        return {}
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black overflow-hidden">
      {/* Custom Cursor Effect */}
      <div
        className="fixed w-20 h-20 border-2 border-cyan-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePos.x - 40,
          top: mousePos.y - 40,
          transform: `scale(${1 + scrollY * 0.001})`,
        }}
      />

      {/* Header Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          {/* Animated Background Grid */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
                style={{
                  top: `${i * 5}%`,
                  transform: `translateX(${Math.sin(scrollY * 0.01 + i) * 50}px)`,
                }}
              />
            ))}
            {[...Array(20)].map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute h-full w-px bg-gradient-to-b from-transparent via-magenta-500/20 to-transparent"
                style={{
                  left: `${i * 5}%`,
                  transform: `translateY(${Math.cos(scrollY * 0.01 + i) * 50}px)`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center">
          <h1 className={`text-9xl md:text-[15rem] font-black ${glitchText ? 'glitch-text' : ''}`}
              style={{
                transform: `rotate(${Math.sin(scrollY * 0.001) * 5}deg)`,
                filter: `hue-rotate(${scrollY * 0.5}deg)`,
              }}>
            CHAOS
          </h1>
          <p className="text-2xl md:text-4xl text-cyan-500 tracking-[0.5em]">
            COLLECTION
          </p>
        </div>
      </section>

      {/* View Mode Controls */}
      <section className="relative z-50 flex justify-center gap-4 py-8">
        {(['chaos', 'grid', 'vortex', 'explode'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-6 py-3 border-2 ${
              viewMode === mode ? 'border-cyan-500 bg-cyan-500/20' : 'border-white/20'
            } hover:border-magenta-500 transition-all duration-300 transform hover:scale-110 hover:rotate-3`}
          >
            <span className="font-bold tracking-wider uppercase">{mode}</span>
          </button>
        ))}
      </section>

      {/* Products Display */}
      <section className="relative min-h-[200vh]">
        <div className={`relative ${viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-0' : ''}`}
             style={{ height: viewMode === 'grid' ? 'auto' : '200vh' }}>
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`${viewMode === 'grid' ? 'relative' : 'absolute'} group cursor-pointer`}
              style={viewMode !== 'grid' ? getProductStyle(index) : {}}
              onClick={() => setSelectedProduct(product)}
              onMouseEnter={() => {
                if (viewMode === 'explode') {
                  setViewMode('chaos')
                  setTimeout(() => setViewMode('explode'), 100)
                }
              }}
            >
              <div className={`relative overflow-hidden ${
                viewMode === 'grid' ? 'aspect-square' : 'w-48 h-64'
              }`}>
                <Image
                  src={`/웹 꾸미기 사진/${product.image}`}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-150"
                  style={{
                    filter: `
                      hue-rotate(${index * 30}deg)
                      contrast(${1.5 + Math.sin(index) * 0.5})
                      saturate(${1.5 + Math.cos(index) * 0.5})
                    `,
                    mixBlendMode: index % 3 === 0 ? 'screen' :
                                 index % 3 === 1 ? 'multiply' : 'normal',
                  }}
                />

                {/* Glitch Overlay on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/50 via-transparent to-cyan-500/50" />
                  <div className="absolute inset-0 mix-blend-difference">
                    <div className="h-full w-full bg-white opacity-20" />
                  </div>
                </div>

                {/* Product Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-sm font-bold tracking-wider text-white group-hover:glitch-text">
                    {product.name}
                  </h3>
                  <p className="text-xs text-cyan-500">
                    {product.price}
                  </p>
                </div>

                {/* Random Decorative Elements */}
                {viewMode === 'chaos' && index % 5 === 0 && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-magenta-500 rounded-full animate-ping" />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative max-w-4xl w-full mx-4 bg-black border-2 border-cyan-500 p-8"
            style={{
              transform: `rotate(${Math.random() * 10 - 5}deg)`,
              clipPath: 'polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 w-8 h-8 border-2 border-white hover:border-red-500 hover:bg-red-500 transition-all duration-300 transform hover:rotate-180"
            >
              <span className="block w-full h-full relative">
                <span className="absolute inset-0 flex items-center justify-center text-white">×</span>
              </span>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative aspect-square">
                <Image
                  src={`/웹 꾸미기 사진/${selectedProduct.image}`}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                  style={{
                    filter: 'contrast(1.5) saturate(1.5)',
                  }}
                />
              </div>

              <div className="flex flex-col justify-center space-y-4">
                <h2 className="text-4xl md:text-6xl font-black glitch-text">
                  {selectedProduct.name}
                </h2>
                <p className="text-2xl text-cyan-500">
                  {selectedProduct.price}
                </p>
                <p className="text-sm uppercase tracking-[0.3em] text-white/50">
                  Category: {selectedProduct.category}
                </p>
                <button className="mt-8 px-8 py-4 border-2 border-white hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-110 hover:rotate-3">
                  <span className="font-bold tracking-wider">ADD TO CHAOS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}