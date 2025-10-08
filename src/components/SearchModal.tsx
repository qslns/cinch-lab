'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface SearchResult {
  type: 'page' | 'collection' | 'experiment' | 'archive' | 'analysis'
  title: string
  href: string
  description?: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const searchableContent: SearchResult[] = [
  { type: 'page', title: 'Home', href: '/', description: 'Experimental Fashion Laboratory' },
  { type: 'page', title: 'Laboratory', href: '/lab', description: 'Pattern deconstruction experiments' },
  { type: 'page', title: 'Collections', href: '/collections', description: 'Seasonal experimental lookbooks' },
  { type: 'page', title: 'Archive', href: '/archive', description: 'Documentation & process' },
  { type: 'page', title: 'Analysis', href: '/analysis', description: 'Fashion brand analysis' },
  { type: 'page', title: 'About', href: '/about', description: 'Philosophy & manifesto' },
  { type: 'page', title: 'Contact', href: '/contact', description: 'Collaboration gateway' },
]

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (query.trim() === '') {
      setResults([])
      return
    }

    const searchQuery = query.toLowerCase()
    const filtered = searchableContent.filter(
      item =>
        item.title.toLowerCase().includes(searchQuery) ||
        item.description?.toLowerCase().includes(searchQuery)
    )
    setResults(filtered)
    setSelectedIndex(0)
  }, [query])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0))
          break
        case 'Enter':
          e.preventDefault()
          if (results[selectedIndex]) {
            router.push(results[selectedIndex].href)
            onClose()
            setQuery('')
          }
          break
      }
    },
    [isOpen, results, selectedIndex, router, onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'page': return 'text-lab-chemical-blue'
      case 'collection': return 'text-sacai-burnt-orange'
      case 'experiment': return 'text-lab-reaction-green'
      case 'archive': return 'text-margiela-steel'
      case 'analysis': return 'text-cdg-blood-red'
      default: return 'text-margiela-aluminum'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-margiela-carbon/60 backdrop-blur-md z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4">
            <motion.div
              className="w-full max-w-2xl bg-margiela-raw-canvas border-2 border-margiela-exposed-seam transform -rotate-1"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6 border-b border-margiela-exposed-seam">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-margiela-aluminum" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search CINCH LAB..."
                    className="flex-1 bg-transparent text-lg text-margiela-carbon placeholder:text-margiela-aluminum outline-none font-light"
                    autoFocus
                  />
                  <button onClick={onClose} className="p-2 hover:bg-margiela-paper transition-colors">
                    <svg className="w-4 h-4 text-margiela-steel" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto">
                {results.length === 0 && query.trim() !== '' && (
                  <div className="p-12 text-center">
                    <p className="text-margiela-aluminum">No results found for "{query}"</p>
                  </div>
                )}

                {results.length === 0 && query.trim() === '' && (
                  <div className="p-12 text-center">
                    <p className="text-margiela-aluminum">Start typing to search...</p>
                  </div>
                )}

                {results.map((result, index) => (
                  <Link
                    key={result.href}
                    href={result.href}
                    onClick={onClose}
                    className={`block p-4 border-b border-margiela-exposed-seam/30 transition-all duration-200
                      ${index === selectedIndex ? 'bg-margiela-paper' : 'hover:bg-margiela-muslin'}
                    `}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-medium text-margiela-carbon">{result.title}</h3>
                        {result.description && (
                          <p className="mt-1 text-sm text-margiela-aluminum">{result.description}</p>
                        )}
                      </div>
                      <span className={`text-xs uppercase tracking-wider ${getTypeColor(result.type)}`}>
                        {result.type}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
