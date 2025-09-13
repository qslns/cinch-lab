'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

const collections = [
  { id: 'ss25', title: 'SS25', subtitle: 'SPRING SUMMER 2025', status: 'NEW' },
  { id: 'fw24', title: 'FW24', subtitle: 'FALL WINTER 2024', status: 'CURRENT' },
  { id: 'ss24', title: 'SS24', subtitle: 'SPRING SUMMER 2024' },
  { id: 'fw23', title: 'FW23', subtitle: 'FALL WINTER 2023' },
  { id: 'ss23', title: 'SS23', subtitle: 'SPRING SUMMER 2023' },
  { id: 'fw22', title: 'FW22', subtitle: 'FALL WINTER 2022' },
]

export default function CollectionsPage() {
  const [filter, setFilter] = useState('all')

  const filteredCollections = filter === 'all' 
    ? collections 
    : collections.filter(c => c.title.toLowerCase().includes(filter))

  return (
    <div className="px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-thin mb-4">Collections</h1>
          <div className="flex gap-4">
            <button 
              onClick={() => setFilter('all')}
              className={`text-xs tracking-[0.15em] pb-1 ${filter === 'all' ? 'border-b border-black' : 'text-gray-500'}`}
            >
              ALL
            </button>
            <button 
              onClick={() => setFilter('ss')}
              className={`text-xs tracking-[0.15em] pb-1 ${filter === 'ss' ? 'border-b border-black' : 'text-gray-500'}`}
            >
              SPRING/SUMMER
            </button>
            <button 
              onClick={() => setFilter('fw')}
              className={`text-xs tracking-[0.15em] pb-1 ${filter === 'fw' ? 'border-b border-black' : 'text-gray-500'}`}
            >
              FALL/WINTER
            </button>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCollections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/collections/${collection.id}`} className="group block">
                <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden mb-4">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  {collection.status && (
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-black text-white text-xs tracking-[0.15em]">
                        {collection.status}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <h2 className="text-lg font-light mb-1 group-hover:underline">{collection.title}</h2>
                <p className="text-xs tracking-[0.15em] text-gray-600">{collection.subtitle}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}