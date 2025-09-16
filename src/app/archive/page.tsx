'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import CipherText from '@/components/CipherText'

// Complete archive data
const archiveData = [
  { year: 2025, events: 12, collections: 2, experiments: 45 },
  { year: 2024, events: 18, collections: 2, experiments: 52 },
  { year: 2023, events: 15, collections: 2, experiments: 48 },
  { year: 2022, events: 14, collections: 2, experiments: 39 },
  { year: 2021, events: 10, collections: 2, experiments: 31 },
  { year: 2020, events: 8, collections: 1, experiments: 22 },
  { year: 2019, events: 5, collections: 1, experiments: 15 },
]

const monthlyEvents = [
  { month: 'JAN', event: 'SS25 Launch', type: 'collection' },
  { month: 'FEB', event: 'Lab Experiment 045', type: 'experiment' },
  { month: 'MAR', event: 'Paris Presentation', type: 'event' },
  { month: 'APR', event: 'Material Research', type: 'research' },
  { month: 'MAY', event: 'Digital Archive Update', type: 'digital' },
  { month: 'JUN', event: 'Collaboration Announcement', type: 'collab' },
  { month: 'JUL', event: 'FW25 Preview', type: 'collection' },
  { month: 'AUG', event: 'Lab Experiment 046', type: 'experiment' },
  { month: 'SEP', event: 'Seoul Exhibition', type: 'event' },
  { month: 'OCT', event: 'Archive Publication', type: 'publication' },
  { month: 'NOV', event: 'Technical Workshop', type: 'workshop' },
  { month: 'DEC', event: 'Year Review', type: 'review' },
]

export default function ArchivePage() {
  const [selectedYear, setSelectedYear] = useState(2025)
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline')

  const currentYearData = archiveData.find(d => d.year === selectedYear)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-8 pb-6 px-8 md:px-20 border-b border-black/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-hero mb-4"><CipherText text="ARCHIVE" /></h1>
          <p className="text-label text-gray-600"><CipherText text="COMPLETE CHRONOLOGICAL HISTORY" /></p>
        </motion.div>

        {/* View Toggle */}
        <div className="mt-12 flex gap-4">
          <button
            onClick={() => setViewMode('timeline')}
            className={`text-xs tracking-[0.15em] ${
              viewMode === 'timeline' ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <CipherText text="TIMELINE" />
          </button>
          <span className="text-xs opacity-20">/</span>
          <button
            onClick={() => setViewMode('grid')}
            className={`text-xs tracking-[0.15em] ${
              viewMode === 'grid' ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <CipherText text="GRID VIEW" />
          </button>
        </div>
      </section>

      {/* Timeline Visualization */}
      {viewMode === 'timeline' ? (
        <section className="px-8 md:px-20 py-8">
          {/* Year Selector Timeline */}
          <div className="relative mb-20">
            <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gray-200" />
            <div className="flex justify-between items-center relative">
              {archiveData.map((data, index) => (
                <motion.button
                  key={data.year}
                  className="relative"
                  onClick={() => setSelectedYear(data.year)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div
                    className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                      selectedYear === data.year
                        ? 'bg-black border-black scale-150'
                        : 'bg-white border-gray-400 hover:border-black'
                    }`}
                  />
                  <span
                    className={`absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap transition-opacity ${
                      selectedYear === data.year ? 'opacity-100' : 'opacity-40'
                    }`}
                  >
                    <CipherText text={String(data.year)} />
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Year Overview */}
          <motion.div
            key={selectedYear}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center">
              <p className="text-5xl font-light"><CipherText text={String(currentYearData?.collections || 0)} /></p>
              <p className="text-xs text-gray-600 mt-2"><CipherText text="COLLECTIONS" /></p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-light"><CipherText text={String(currentYearData?.experiments || 0)} /></p>
              <p className="text-xs text-gray-600 mt-2"><CipherText text="EXPERIMENTS" /></p>
            </div>
            <div className="text-center">
              <p className="text-5xl font-light"><CipherText text={String(currentYearData?.events || 0)} /></p>
              <p className="text-xs text-gray-600 mt-2"><CipherText text="EVENTS" /></p>
            </div>
          </motion.div>

          {/* Monthly Timeline */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gray-200 md:left-1/2" />

            {monthlyEvents.map((event, index) => (
              <motion.div
                key={event.month}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="w-full md:w-1/2 px-8">
                  <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="text-label opacity-60"><CipherText text={`${event.month} ${selectedYear}`} /></span>
                    <h3 className="text-2xl font-light mt-2"><CipherText text={event.event} /></h3>
                    <span className="text-xs text-gray-600 uppercase tracking-wider">
                      <CipherText text={event.type} />
                    </span>
                  </div>
                </div>

                <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-white border-2 border-black rounded-full -translate-x-1/2" />
              </motion.div>
            ))}
          </div>
        </section>
      ) : (
        /* Grid View */
        <section className="px-8 md:px-20 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {archiveData.map((data, index) => (
              <motion.div
                key={data.year}
                className="border border-black/10 p-8 hover:border-black transition-colors duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <h3 className="text-4xl font-light mb-6"><CipherText text={String(data.year)} /></h3>
                <div className="space-y-4">
                  <div className="flex justify-between pb-2 border-b border-gray-200">
                    <span className="text-sm"><CipherText text="Collections" /></span>
                    <span className="text-sm font-light"><CipherText text={String(data.collections)} /></span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-200">
                    <span className="text-sm"><CipherText text="Experiments" /></span>
                    <span className="text-sm font-light"><CipherText text={String(data.experiments)} /></span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-gray-200">
                    <span className="text-sm"><CipherText text="Events" /></span>
                    <span className="text-sm font-light"><CipherText text={String(data.events)} /></span>
                  </div>
                </div>
                <Link
                  href={`/collections?year=${data.year}`}
                  className="text-xs tracking-[0.15em] hover-underline inline-block mt-6"
                >
                  <CipherText text="VIEW YEAR →" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Quote Section */}
      <section className="border-t border-black/5 py-8 px-8 md:px-20">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-display mb-6 leading-tight">
            <CipherText text='"Time is a flat circle."' />
          </h3>
          <p className="text-gray-600">
            <CipherText text="Every moment in our archive represents a point in the continuous evolution of fashion and technology." />
          </p>
        </motion.div>
      </section>
    </div>
  )
}