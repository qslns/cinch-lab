'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Mood images with minimalist aesthetic
const moodItems = [
  { id: 1, aspect: 'portrait', category: 'texture', title: 'SURFACE 001' },
  { id: 2, aspect: 'landscape', category: 'form', title: 'STRUCTURE 002' },
  { id: 3, aspect: 'square', category: 'shadow', title: 'LIGHT 003' },
  { id: 4, aspect: 'portrait', category: 'minimal', title: 'VOID 004' },
  { id: 5, aspect: 'landscape', category: 'texture', title: 'GRAIN 005' },
  { id: 6, aspect: 'portrait', category: 'form', title: 'SHAPE 006' },
  { id: 7, aspect: 'square', category: 'shadow', title: 'CONTRAST 007' },
  { id: 8, aspect: 'landscape', category: 'minimal', title: 'SPACE 008' },
  { id: 9, aspect: 'portrait', category: 'texture', title: 'MATERIAL 009' },
  { id: 10, aspect: 'square', category: 'form', title: 'GEOMETRY 010' },
  { id: 11, aspect: 'landscape', category: 'shadow', title: 'DEPTH 011' },
  { id: 12, aspect: 'portrait', category: 'minimal', title: 'ESSENCE 012' },
]

const categories = ['ALL', 'TEXTURE', 'FORM', 'SHADOW', 'MINIMAL']

export default function MoodPage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [columns, setColumns] = useState(3)
  const containerRef = useRef<HTMLDivElement>(null)

  // Responsive columns
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) setColumns(1)
      else if (width < 1024) setColumns(2)
      else if (width < 1536) setColumns(3)
      else setColumns(4)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Filter items
  const filteredItems = selectedCategory === 'ALL'
    ? moodItems
    : moodItems.filter(item => item.category === selectedCategory.toLowerCase())

  // Distribute items into columns for masonry
  const distributeIntoColumns = () => {
    const cols: typeof moodItems[] = Array.from({ length: columns }, () => [])

    filteredItems.forEach((item, index) => {
      const columnIndex = index % columns
      cols[columnIndex].push(item)
    })

    return cols
  }

  const columnizedItems = distributeIntoColumns()

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="pt-20 pb-12 px-8 md:px-20 border-b border-black/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-hero mb-4">MOOD</h1>
          <p className="text-label text-gray-600">VISUAL RESEARCH & INSPIRATION</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="mt-12 flex flex-wrap gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-xs tracking-[0.15em] px-4 py-2 border transition-all duration-300 ${
                selectedCategory === category
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 hover:border-black'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Masonry Grid */}
      <section className="px-8 md:px-20 py-12" ref={containerRef}>
        <div className="grid gap-6" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {columnizedItems.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-6">
              {column.map((item, index) => (
                <motion.div
                  key={item.id}
                  className="relative group cursor-pointer overflow-hidden"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: colIndex * 0.1 + index * 0.05,
                    duration: 0.6
                  }}
                  onClick={() => setSelectedItem(item.id)}
                  whileHover={{ scale: 0.98 }}
                  style={{
                    aspectRatio:
                      item.aspect === 'portrait' ? '3/4' :
                      item.aspect === 'landscape' ? '4/3' : '1/1'
                  }}
                >
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-gray-200">
                    <Image
                      src={`/placeholder-${item.id}.jpg`}
                      alt={item.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </div>

                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Title on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 px-6 py-3">
                      <p className="text-label text-black">{item.title}</p>
                    </div>
                  </div>

                  {/* Number marker */}
                  <span className="absolute top-4 left-4 text-label text-white mix-blend-difference">
                    {String(item.id).padStart(3, '0')}
                  </span>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="fixed inset-0 bg-white z-50 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedItem(null)}
          >
            <button
              className="absolute top-8 right-8 text-3xl hover:rotate-90 transition-transform duration-300"
              onClick={() => setSelectedItem(null)}
            >
              ×
            </button>

            <motion.div
              className="max-w-4xl w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-[3/2] bg-gradient-to-b from-gray-100 to-gray-200 relative">
                <Image
                  src={`/placeholder-${selectedItem}.jpg`}
                  alt={moodItems.find(i => i.id === selectedItem)?.title || ''}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
              </div>

              <div className="mt-8 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-light">
                    {moodItems.find(i => i.id === selectedItem)?.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Category: {moodItems.find(i => i.id === selectedItem)?.category?.toUpperCase()}
                  </p>
                </div>
                <div className="flex gap-4">
                  <button className="text-xs tracking-[0.15em] hover:opacity-60 transition-opacity">
                    SAVE
                  </button>
                  <button className="text-xs tracking-[0.15em] hover:opacity-60 transition-opacity">
                    SHARE
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Info */}
      <section className="border-t border-black/5 py-16 px-8 md:px-20">
        <div className="max-w-3xl">
          <h3 className="text-display mb-6 leading-tight">
            Visual research archive.
          </h3>
          <p className="text-gray-600 text-body-large">
            A curated collection of textures, forms, and concepts that inform our design process.
            Each image represents a study in minimalism and the interplay between light, shadow, and material.
          </p>
        </div>
      </section>
    </div>
  )
}