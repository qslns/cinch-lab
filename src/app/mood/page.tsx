'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

// Mood categories with vibrant colors
const moods = [
  { name: 'EUPHORIC', color: '#ff006e', gradient: 'from-pink-500 to-purple-500', emoji: '✨' },
  { name: 'CHAOTIC', color: '#00f5ff', gradient: 'from-cyan-400 to-blue-500', emoji: '🌪️' },
  { name: 'DREAMY', color: '#bfff00', gradient: 'from-lime-400 to-green-500', emoji: '☁️' },
  { name: 'ELECTRIC', color: '#8b00ff', gradient: 'from-purple-500 to-indigo-500', emoji: '⚡' },
  { name: 'SURREAL', color: '#ff6b00', gradient: 'from-orange-500 to-red-500', emoji: '🎭' },
  { name: 'COSMIC', color: '#ffef00', gradient: 'from-yellow-400 to-orange-500', emoji: '🌌' }
]

// Sample images (replace with actual images from 웹 꾸미기 사진 folder)
const moodImages = {
  EUPHORIC: ['/웹 꾸미기 사진/image-1.png', '/웹 꾸미기 사진/image-2.png', '/웹 꾸미기 사진/image-3.png'],
  CHAOTIC: ['/웹 꾸미기 사진/image-4.png', '/웹 꾸미기 사진/image-5.png', '/웹 꾸미기 사진/image-6.png'],
  DREAMY: ['/웹 꾸미기 사진/image-7.png', '/웹 꾸미기 사진/image-8.png', '/웹 꾸미기 사진/image-9.png'],
  ELECTRIC: ['/웹 꾸미기 사진/image-10.png', '/웹 꾸미기 사진/image-11.png', '/웹 꾸미기 사진/image-12.png'],
  SURREAL: ['/웹 꾸미기 사진/image-13.png', '/웹 꾸미기 사진/image-14.png', '/웹 꾸미기 사진/image-15.png'],
  COSMIC: ['/웹 꾸미기 사진/image-16.png', '/웹 꾸미기 사진/image-17.png', '/웹 꾸미기 사진/image-18.png']
}

export default function MoodPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [colorMode, setColorMode] = useState('#ff006e')
  const [floatingShapes, setFloatingShapes] = useState<{x: number, y: number, shape: string}[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 0.8])

  // Auto-cycle through moods when none selected
  useEffect(() => {
    if (!selectedMood) {
      const interval = setInterval(() => {
        const randomMood = moods[Math.floor(Math.random() * moods.length)]
        setColorMode(randomMood.color)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [selectedMood])

  // Generate floating shapes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.95) {
        const shapes = ['◆', '◇', '○', '△', '▽', '□', '▭']
        setFloatingShapes(prev => [...prev, {
          x: e.clientX,
          y: e.clientY,
          shape: shapes[Math.floor(Math.random() * shapes.length)]
        }])

        setTimeout(() => {
          setFloatingShapes(prev => prev.slice(1))
        }, 3000)
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-slide images when mood is selected
  useEffect(() => {
    if (selectedMood) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % 3)
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [selectedMood])

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood === selectedMood ? null : mood)
    setCurrentImageIndex(0)
    const selected = moods.find(m => m.name === mood)
    if (selected) {
      setColorMode(selected.color)
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Dynamic gradient background */}
      <motion.div
        className="fixed inset-0"
        animate={{
          background: [
            `radial-gradient(circle at 20% 50%, ${colorMode}40 0%, transparent 50%)`,
            `radial-gradient(circle at 80% 50%, ${colorMode}40 0%, transparent 50%)`,
            `radial-gradient(circle at 50% 20%, ${colorMode}40 0%, transparent 50%)`,
            `radial-gradient(circle at 50% 80%, ${colorMode}40 0%, transparent 50%)`
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating shapes */}
      <AnimatePresence>
        {floatingShapes.map((item, index) => (
          <motion.div
            key={`${item.x}-${item.y}-${index}`}
            className="fixed text-4xl pointer-events-none z-20"
            style={{ color: colorMode }}
            initial={{ x: item.x - 20, y: item.y - 20, scale: 0, opacity: 0 }}
            animate={{
              y: item.y - 300,
              scale: [0, 2, 1],
              rotate: 360,
              opacity: [0, 1, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            {item.shape}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 p-8"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-widest">MOOD</h1>
          <motion.div
            className="text-sm tracking-widest opacity-50"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            SELECT YOUR VIBE
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content */}
      <section className="min-h-screen pt-32 px-8">
        {/* Mood Selector Grid */}
        <motion.div
          className="max-w-7xl mx-auto mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {moods.map((mood, index) => (
              <motion.button
                key={mood.name}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 group overflow-hidden ${
                  selectedMood === mood.name ? 'scale-105' : ''
                }`}
                style={{
                  borderColor: selectedMood === mood.name ? mood.color : 'rgba(255,255,255,0.2)',
                  background: selectedMood === mood.name
                    ? `linear-gradient(135deg, ${mood.color}20, transparent)`
                    : 'rgba(255,255,255,0.05)'
                }}
                onClick={() => handleMoodSelect(mood.name)}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: [-2, 2, -2] }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-3xl mb-2 block">{mood.emoji}</span>
                <span className="text-xs font-bold tracking-widest">{mood.name}</span>

                {/* Animated background on hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${mood.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Selected Mood Display */}
        <AnimatePresence mode="wait">
          {selectedMood && (
            <motion.div
              key={selectedMood}
              className="max-w-7xl mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              {/* Mood Title */}
              <motion.h2
                className="text-6xl md:text-9xl font-black text-center mb-16"
                style={{ color: colorMode }}
                animate={{
                  textShadow: [
                    `0 0 20px ${colorMode}`,
                    `0 0 40px ${colorMode}`,
                    `0 0 20px ${colorMode}`
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {selectedMood}
              </motion.h2>

              {/* Image Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {moodImages[selectedMood as keyof typeof moodImages].map((img, index) => (
                  <motion.div
                    key={img}
                    className="relative aspect-[3/4] overflow-hidden rounded-2xl group cursor-pointer"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      moods.find(m => m.name === selectedMood)?.gradient
                    } opacity-30 z-10`} />

                    <Image
                      src={img}
                      alt={`${selectedMood} mood ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay text */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                      <motion.p
                        className="text-white font-bold text-lg"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        #{selectedMood.toLowerCase()}_{String(index + 1).padStart(3, '0')}
                      </motion.p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mood Description */}
              <motion.div
                className="mt-16 text-center max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-2xl md:text-3xl font-light leading-relaxed">
                  <span style={{ color: colorMode }}>"{selectedMood}"</span> is not just a feeling,
                  it's a whole universe of possibilities waiting to be explored.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Inspiration Words */}
        {!selectedMood && (
          <motion.div
            className="max-w-7xl mx-auto text-center"
            style={{ y }}
          >
            <motion.h2
              className="text-6xl md:text-9xl font-black mb-8"
              animate={{
                backgroundImage: [
                  'linear-gradient(45deg, #ff006e, #00f5ff)',
                  'linear-gradient(45deg, #00f5ff, #bfff00)',
                  'linear-gradient(45deg, #bfff00, #8b00ff)',
                  'linear-gradient(45deg, #8b00ff, #ff6b00)',
                  'linear-gradient(45deg, #ff6b00, #ffef00)',
                  'linear-gradient(45deg, #ffef00, #ff006e)'
                ]
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              CHOOSE YOUR MOOD
            </motion.h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16">
              {['VIBE', 'ENERGY', 'AURA', 'SPIRIT', 'ESSENCE', 'FREQUENCY'].map((word, index) => (
                <motion.div
                  key={word}
                  className="text-3xl md:text-5xl font-bold opacity-30"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    y: [0, -20, 0]
                  }}
                  transition={{
                    duration: 3,
                    delay: index * 0.3,
                    repeat: Infinity
                  }}
                >
                  {word}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </section>

      {/* Interactive Color Palette */}
      <section className="py-20 px-8">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center tracking-widest">COLOR PALETTE</h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {moods.map((mood) => (
              <motion.button
                key={mood.name}
                className="w-20 h-20 rounded-full border-2 border-white/20"
                style={{ backgroundColor: mood.color }}
                whileHover={{ scale: 1.2, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setColorMode(mood.color)}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-sm tracking-[0.3em] opacity-50">
            MOOD BOARD × CINCH LAB
          </p>
        </div>
      </footer>
    </div>
  )
}