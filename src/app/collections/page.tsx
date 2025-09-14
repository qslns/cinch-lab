'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Modern collections data
const collections = [
  {
    id: 'cyber-dreams',
    title: 'CYBER DREAMS',
    year: '2024',
    season: 'SS',
    color: '#ff006e',
    gradient: 'from-pink-500 to-purple-500',
    emoji: '🌐',
    images: ['/웹 꾸미기 사진/image-1.png', '/웹 꾸미기 사진/image-2.png', '/웹 꾸미기 사진/image-3.png'],
    tags: ['DIGITAL', 'NEON', 'FUTURE']
  },
  {
    id: 'acid-rain',
    title: 'ACID RAIN',
    year: '2024',
    season: 'FW',
    color: '#00f5ff',
    gradient: 'from-cyan-400 to-blue-500',
    emoji: '☔',
    images: ['/웹 꾸미기 사진/image-4.png', '/웹 꾸미기 사진/image-5.png', '/웹 꾸미기 사진/image-6.png'],
    tags: ['DYSTOPIA', 'LIQUID', 'CHROME']
  },
  {
    id: 'neo-garden',
    title: 'NEO GARDEN',
    year: '2023',
    season: 'SS',
    color: '#bfff00',
    gradient: 'from-lime-400 to-green-500',
    emoji: '🌿',
    images: ['/웹 꾸미기 사진/image-7.png', '/웹 꾸미기 사진/image-8.png', '/웹 꾸미기 사진/image-9.png'],
    tags: ['ORGANIC', 'SYNTHETIC', 'BLOOM']
  },
  {
    id: 'void-walker',
    title: 'VOID WALKER',
    year: '2023',
    season: 'FW',
    color: '#8b00ff',
    gradient: 'from-purple-500 to-indigo-500',
    emoji: '🌌',
    images: ['/웹 꾸미기 사진/image-10.png', '/웹 꾸미기 사진/image-11.png', '/웹 꾸미기 사진/image-12.png'],
    tags: ['DARKNESS', 'SPACE', 'MINIMAL']
  },
  {
    id: 'solar-punk',
    title: 'SOLAR PUNK',
    year: '2022',
    season: 'SS',
    color: '#ff6b00',
    gradient: 'from-orange-500 to-red-500',
    emoji: '☀️',
    images: ['/웹 꾸미기 사진/image-13.png', '/웹 꾸미기 사진/image-14.png', '/웹 꾸미기 사진/image-15.png'],
    tags: ['ENERGY', 'REBELLION', 'HEAT']
  },
  {
    id: 'quantum-flux',
    title: 'QUANTUM FLUX',
    year: '2022',
    season: 'FW',
    color: '#ffef00',
    gradient: 'from-yellow-400 to-orange-500',
    emoji: '⚛️',
    images: ['/웹 꾸미기 사진/image-16.png', '/웹 꾸미기 사진/image-17.png', '/웹 꾸미기 사진/image-18.png'],
    tags: ['PARTICLE', 'WAVE', 'CHAOS']
  }
]

export default function CollectionsPage() {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [filter, setFilter] = useState<'ALL' | 'SS' | 'FW'>('ALL')
  const [viewMode, setViewMode] = useState<'GRID' | 'STACK' | 'CAROUSEL'>('GRID')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5])

  // Filter collections
  const filteredCollections = filter === 'ALL'
    ? collections
    : collections.filter(c => c.season === filter)

  // Auto-rotate carousel
  useEffect(() => {
    if (viewMode === 'CAROUSEL' && !selectedCollection) {
      const interval = setInterval(() => {
        setSelectedCollection(prev => {
          const currentIndex = collections.findIndex(c => c.id === prev)
          const nextIndex = (currentIndex + 1) % collections.length
          return collections[nextIndex].id
        })
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [viewMode, selectedCollection])

  const renderViewMode = () => {
    switch (viewMode) {
      case 'GRID':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredCard(collection.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                <Link href={`/collections/${collection.id}`}>
                  <motion.div
                    className="relative group cursor-pointer overflow-hidden rounded-2xl"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Background gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}
                    />

                    {/* Image stack */}
                    <div className="relative aspect-[3/4] overflow-hidden">
                      {collection.images.slice(0, 3).map((img, i) => (
                        <motion.div
                          key={i}
                          className="absolute inset-0"
                          initial={{ x: i * 20, y: i * 20, rotate: i * 5 }}
                          animate={{
                            x: hoveredCard === collection.id ? i * 10 : i * 20,
                            y: hoveredCard === collection.id ? i * 10 : i * 20,
                            rotate: hoveredCard === collection.id ? i * 2 : i * 5
                          }}
                          transition={{ duration: 0.3 }}
                          style={{ zIndex: 3 - i }}
                        >
                          <Image
                            src={img}
                            alt={collection.title}
                            fill
                            className="object-cover border-2 border-white/10"
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Content overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: hoveredCard === collection.id ? 0.9 : 0.7 }}
                    />

                    {/* Text content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                      <motion.span
                        className="text-4xl mb-2 block"
                        animate={{
                          rotate: hoveredCard === collection.id ? [0, -10, 10, 0] : 0
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {collection.emoji}
                      </motion.span>

                      <h3
                        className="text-2xl font-black mb-2"
                        style={{ color: collection.color }}
                      >
                        {collection.title}
                      </h3>

                      <p className="text-sm opacity-70 mb-3">
                        {collection.season} {collection.year}
                      </p>

                      {/* Tags */}
                      <div className="flex gap-2 flex-wrap">
                        {collection.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 border border-white/20 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Hover indicator */}
                      <motion.div
                        className="absolute top-4 right-4 text-2xl"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: hoveredCard === collection.id ? 1 : 0,
                          scale: hoveredCard === collection.id ? 1 : 0
                        }}
                      >
                        →
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        )

      case 'STACK':
        return (
          <div className="relative h-[80vh] flex items-center justify-center">
            {filteredCollections.map((collection, index) => (
              <motion.div
                key={collection.id}
                className="absolute w-full max-w-md"
                initial={{
                  scale: 1 - index * 0.05,
                  y: index * 30,
                  rotate: (index % 2 === 0 ? 1 : -1) * (index * 2)
                }}
                animate={{
                  scale: hoveredCard === collection.id ? 1.1 : 1 - index * 0.05,
                  y: hoveredCard === collection.id ? -20 : index * 30,
                  rotate: hoveredCard === collection.id ? 0 : (index % 2 === 0 ? 1 : -1) * (index * 2),
                  zIndex: hoveredCard === collection.id ? 100 : filteredCollections.length - index
                }}
                onHoverStart={() => setHoveredCard(collection.id)}
                onHoverEnd={() => setHoveredCard(null)}
                whileTap={{ scale: 0.95 }}
              >
                <Link href={`/collections/${collection.id}`}>
                  <div
                    className="aspect-[3/4] rounded-2xl overflow-hidden border-2 cursor-pointer"
                    style={{ borderColor: collection.color }}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={collection.images[0]}
                        alt={collection.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-3xl font-black" style={{ color: collection.color }}>
                          {collection.title}
                        </h3>
                        <p className="text-sm opacity-70">
                          {collection.season} {collection.year}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )

      case 'CAROUSEL':
        return (
          <div className="relative h-[70vh] overflow-hidden">
            <AnimatePresence mode="wait">
              {filteredCollections.map((collection, index) => {
                const isActive = selectedCollection === collection.id || (!selectedCollection && index === 0)

                return isActive ? (
                  <motion.div
                    key={collection.id}
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="max-w-6xl w-full px-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <span className="text-6xl mb-4 block">{collection.emoji}</span>
                          <h2
                            className="text-6xl md:text-8xl font-black mb-4"
                            style={{ color: collection.color }}
                          >
                            {collection.title}
                          </h2>
                          <p className="text-2xl mb-6 opacity-70">
                            {collection.season} {collection.year}
                          </p>
                          <div className="flex gap-3 mb-8">
                            {collection.tags.map(tag => (
                              <span
                                key={tag}
                                className="px-4 py-2 border-2 rounded-full"
                                style={{ borderColor: collection.color }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <Link href={`/collections/${collection.id}`}>
                            <motion.button
                              className="px-8 py-4 font-bold text-lg rounded-full"
                              style={{
                                background: collection.color,
                                color: '#000'
                              }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              EXPLORE COLLECTION →
                            </motion.button>
                          </Link>
                        </motion.div>

                        <motion.div
                          className="relative aspect-[3/4] rounded-2xl overflow-hidden"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Image
                            src={collection.images[0]}
                            alt={collection.title}
                            fill
                            className="object-cover"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-br ${collection.gradient} mix-blend-multiply opacity-30`} />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ) : null
              })}
            </AnimatePresence>

            {/* Navigation dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
              {filteredCollections.map((collection) => (
                <button
                  key={collection.id}
                  className="w-3 h-3 rounded-full transition-all duration-300"
                  style={{
                    background: selectedCollection === collection.id ? collection.color : 'rgba(255,255,255,0.3)',
                    transform: selectedCollection === collection.id ? 'scale(1.5)' : 'scale(1)'
                  }}
                  onClick={() => setSelectedCollection(collection.id)}
                />
              ))}
            </div>
          </div>
        )
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Dynamic mesh gradient */}
      <div className="fixed inset-0 mesh-gradient" />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 p-8 backdrop-blur-sm bg-black/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-black tracking-widest">COLLECTIONS</h1>

          {/* View mode switcher */}
          <div className="flex gap-4">
            {(['GRID', 'STACK', 'CAROUSEL'] as const).map(mode => (
              <motion.button
                key={mode}
                className={`px-4 py-2 text-sm font-bold rounded-full border-2 transition-all ${
                  viewMode === mode
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent text-white border-white/30'
                }`}
                onClick={() => setViewMode(mode)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {mode}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <section className="min-h-screen pt-32 px-8 pb-20">
        {/* Filter buttons */}
        <motion.div
          className="max-w-7xl mx-auto mb-12 flex justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {(['ALL', 'SS', 'FW'] as const).map((season, index) => (
            <motion.button
              key={season}
              className={`px-6 py-3 font-bold rounded-full border-2 transition-all ${
                filter === season
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-transparent'
                  : 'bg-transparent text-white border-white/30'
              }`}
              onClick={() => setFilter(season)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {season === 'ALL' ? 'ALL SEASONS' : `${season} COLLECTION`}
            </motion.button>
          ))}
        </motion.div>

        {/* Collections display */}
        <motion.div
          className="max-w-7xl mx-auto"
          style={{ y, opacity }}
        >
          {renderViewMode()}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <motion.p
            className="text-sm tracking-[0.3em] opacity-50"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {filteredCollections.length} COLLECTIONS × CINCH LAB
          </motion.p>
        </div>
      </footer>
    </div>
  )
}