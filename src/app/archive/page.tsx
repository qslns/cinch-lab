'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Collection {
  id: string
  title: string
  items: number
  status?: string
}

interface ArchiveYear {
  year: string
  collections: Collection[]
}

const archiveData: ArchiveYear[] = [
  {
    year: '2025',
    collections: [
      { id: 'ss25', title: 'Spring Summer 2025', items: 24, status: 'current' }
    ]
  },
  {
    year: '2024',
    collections: [
      { id: 'fw24', title: 'Fall Winter 2024', items: 28 },
      { id: 'ss24', title: 'Spring Summer 2024', items: 22 }
    ]
  },
  {
    year: '2023',
    collections: [
      { id: 'fw23', title: 'Fall Winter 2023', items: 26 },
      { id: 'ss23', title: 'Spring Summer 2023', items: 20 }
    ]
  },
  {
    year: '2022',
    collections: [
      { id: 'fw22', title: 'Fall Winter 2022', items: 18 },
      { id: 'ss22', title: 'Spring Summer 2022', items: 16 }
    ]
  }
]

export default function ArchivePage() {
  const [selectedYear, setSelectedYear] = useState<string>('2025')

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl mb-4 tracking-wider">ARCHIVE</h1>
          <p className="text-sm tracking-[0.2em] opacity-70">
            COMPLETE COLLECTION HISTORY
          </p>
        </header>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Years */}
          <div className="md:border-r border-white/20 pr-8">
            <h2 className="text-xs tracking-[0.2em] opacity-50 mb-8">SELECT YEAR</h2>
            <div className="space-y-3">
              {archiveData.map((yearData) => (
                <button
                  key={yearData.year}
                  onClick={() => setSelectedYear(yearData.year)}
                  className={`block w-full text-left text-lg py-2 transition-all duration-300 ${
                    selectedYear === yearData.year
                      ? 'text-white pl-4 border-l-2 border-white'
                      : 'text-white/50 hover:text-white hover:pl-2'
                  }`}
                >
                  {yearData.year}
                </button>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div className="md:col-span-3">
            <h2 className="text-xs tracking-[0.2em] opacity-50 mb-8">
              COLLECTIONS FROM {selectedYear}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {archiveData
                .find(d => d.year === selectedYear)
                ?.collections.map((collection, index) => (
                  <Link
                    key={collection.id}
                    href={`/collections/${collection.id}`}
                    className="group block fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="border border-white/20 hover:border-white transition-colors duration-500 p-6">
                      {collection.status && (
                        <span className="inline-block px-2 py-1 bg-white text-black text-xs tracking-[0.2em] mb-4">
                          {collection.status.toUpperCase()}
                        </span>
                      )}
                      <h3 className="text-lg mb-2 group-hover:translate-x-2 transition-transform duration-300">
                        {collection.title}
                      </h3>
                      <p className="text-sm opacity-50">
                        {collection.items} pieces
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* Philosophy Quote */}
        <div className="mt-32 text-center">
          <blockquote className="text-xl md:text-2xl font-thin opacity-70">
            "Time is a flat circle. Fashion repeats, but never the same."
          </blockquote>
        </div>
      </div>
    </main>
  )
}