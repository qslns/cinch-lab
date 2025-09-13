'use client'

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
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl mb-4 tracking-wider">COLLECTIONS</h1>
          <div className="flex gap-6">
            <button
              onClick={() => setFilter('all')}
              className={`text-sm tracking-[0.2em] pb-1 transition-colors ${
                filter === 'all' ? 'border-b border-white text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              ALL
            </button>
            <button
              onClick={() => setFilter('ss')}
              className={`text-sm tracking-[0.2em] pb-1 transition-colors ${
                filter === 'ss' ? 'border-b border-white text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              SPRING/SUMMER
            </button>
            <button
              onClick={() => setFilter('fw')}
              className={`text-sm tracking-[0.2em] pb-1 transition-colors ${
                filter === 'fw' ? 'border-b border-white text-white' : 'text-white/50 hover:text-white'
              }`}
            >
              FALL/WINTER
            </button>
          </div>
        </header>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCollections.map((collection, index) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.id}`}
              className="group block fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-white/30 transition-colors duration-500 relative overflow-hidden mb-4">
                {collection.status && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white text-black text-xs tracking-[0.2em]">
                      {collection.status}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              </div>
              <h2 className="text-lg tracking-wider mb-1 group-hover:translate-x-2 transition-transform duration-300">
                {collection.title}
              </h2>
              <p className="text-xs tracking-[0.2em] opacity-70">
                {collection.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}