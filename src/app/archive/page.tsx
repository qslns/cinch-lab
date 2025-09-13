'use client'

import { motion } from 'framer-motion'
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
  const [selectedYear, setSelectedYear] = useState<string | null>(null)

  return (
    <div className="px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-thin mb-4">Archive</h1>
          <p className="text-sm text-gray-600">Complete collection history since 2022</p>
        </div>

        {/* Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Years */}
          <div className="md:border-r border-gray-200 pr-8">
            <h2 className="text-xs tracking-[0.15em] text-gray-500 mb-6">SELECT YEAR</h2>
            <div className="space-y-2">
              {archiveData.map((yearData) => (
                <button
                  key={yearData.year}
                  onClick={() => setSelectedYear(yearData.year)}
                  className={`block w-full text-left text-lg py-2 transition-all ${
                    selectedYear === yearData.year 
                      ? 'font-medium pl-2 border-l-2 border-black' 
                      : 'hover:pl-2'
                  }`}
                >
                  {yearData.year}
                </button>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div className="md:col-span-3">
            {selectedYear ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xs tracking-[0.15em] text-gray-500 mb-6">
                  COLLECTIONS FROM {selectedYear}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {archiveData
                    .find(d => d.year === selectedYear)
                    ?.collections.map((collection) => (
                      <Link
                        key={collection.id}
                        href={`/collections/${collection.id}`}
                        className="group"
                      >
                        <div className="aspect-[4/5] bg-gray-100 mb-4 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                          {collection.status === 'current' && (
                            <div className="absolute top-4 left-4">
                              <span className="px-2 py-1 bg-black text-white text-xs tracking-[0.15em]">
                                CURRENT
                              </span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        </div>
                        <h3 className="text-sm font-light mb-1 group-hover:underline">
                          {collection.title}
                        </h3>
                        <p className="text-xs text-gray-600">{collection.items} items</p>
                      </Link>
                    ))}
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-16">
                <p className="text-sm text-gray-500">Select a year to view collections</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-2xl font-light mb-1">8</p>
              <p className="text-xs tracking-[0.15em] text-gray-500">COLLECTIONS</p>
            </div>
            <div>
              <p className="text-2xl font-light mb-1">172</p>
              <p className="text-xs tracking-[0.15em] text-gray-500">TOTAL PIECES</p>
            </div>
            <div>
              <p className="text-2xl font-light mb-1">4</p>
              <p className="text-xs tracking-[0.15em] text-gray-500">YEARS</p>
            </div>
            <div>
              <p className="text-2xl font-light mb-1">∞</p>
              <p className="text-xs tracking-[0.15em] text-gray-500">POSSIBILITIES</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}