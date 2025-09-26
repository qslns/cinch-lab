'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

// 실험실 검색 - 판매 아님, 순수 연구 자료 검색
export default function BrutalistSearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchMode, setSearchMode] = useState<'EXPERIMENTS' | 'ARCHIVES' | 'ALL'>('ALL')
  const [isSearching, setIsSearching] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  // 실험실 데이터 (판매 정보 없음)
  const labExperiments = [
    { id: 'EXP_001', title: 'PATTERN_DECONSTRUCTION', category: 'TECHNIQUE' },
    { id: 'EXP_002', title: 'MATERIAL_MANIPULATION', category: 'RESEARCH' },
    { id: 'EXP_003', title: 'STRUCTURAL_EXPERIMENTATION', category: 'FORM' },
    { id: 'EXP_004', title: 'TEXTILE_ALCHEMY', category: 'MATERIAL' },
    { id: 'EXP_005', title: 'DIMENSIONAL_CUTTING', category: 'TECHNIQUE' }
  ]

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    const timer = setTimeout(() => {
      const results: any[] = []

      // 실험 검색
      if (searchMode === 'EXPERIMENTS' || searchMode === 'ALL') {
        const experimentResults = labExperiments
          .filter(exp =>
            exp.title.toLowerCase().includes(query.toLowerCase()) ||
            exp.category.toLowerCase().includes(query.toLowerCase())
          )
          .map(exp => ({
            type: 'EXPERIMENT',
            id: exp.id,
            title: exp.title,
            subtitle: exp.category,
            href: '/lab#' + exp.id
          }))
        results.push(...experimentResults)
      }

      setSearchResults(results)
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [query, searchMode])

  useEffect(() => {
    if (!isOpen) return
    const glitchTimer = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 100)
      }
    }, 2000)
    return () => clearInterval(glitchTimer)
  }, [isOpen])

  const handleResultClick = (href: string) => {
    router.push(href)
    onClose()
    setQuery('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-carbon-black/95 z-[100] backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-0 left-0 right-0 z-[101] max-h-[80vh] overflow-hidden"
          >
            <div className="bg-paper-white border-b-4 border-carbon-black relative">
              {glitchActive && (
                <div className="absolute inset-0 bg-glitch-red/10 pointer-events-none" />
              )}

              <div className="p-8 bg-carbon-black text-white">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-black brutalist-heading">
                      SEARCH_LABORATORY
                    </h2>
                    <button
                      onClick={onClose}
                      className="w-8 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <span className="text-2xl">×</span>
                    </button>
                  </div>

                  <div className="flex gap-2 mb-4">
                    {(['ALL', 'EXPERIMENTS', 'ARCHIVES'] as const).map(mode => (
                      <button
                        key={mode}
                        onClick={() => setSearchMode(mode)}
                        className={`px-4 py-2 text-xs font-mono transition-all ${
                          searchMode === mode
                            ? 'bg-white text-carbon-black'
                            : 'bg-transparent text-white/60 hover:text-white border border-white/20'
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Escape' && onClose()}
                      placeholder="SEARCH_EXPERIMENTS..."
                      className="w-full px-4 py-4 bg-white text-carbon-black text-lg font-mono placeholder:text-gray-400 border-3 border-carbon-black focus:outline-none focus:border-safety-orange"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      {isSearching ? (
                        <div className="w-5 h-5 border-2 border-safety-orange border-t-transparent animate-spin" />
                      ) : (
                        <span className="text-xs font-mono text-gray-500">
                          {searchResults.length > 0 && `${searchResults.length} RESULTS`}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto bg-white">
                <div className="max-w-4xl mx-auto">
                  {query && searchResults.length === 0 && !isSearching && (
                    <div className="p-8 text-center">
                      <p className="text-xl font-black text-glitch-red mb-2">NO_EXPERIMENTS_FOUND</p>
                      <p className="text-xs font-mono opacity-60">
                        RESEARCH "{query.toUpperCase()}" NOT IN DATABASE
                      </p>
                    </div>
                  )}

                  {searchResults.length > 0 && (
                    <div className="p-4">
                      <AnimatePresence mode="popLayout">
                        {searchResults.map((result, index) => (
                          <motion.div
                            key={result.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <button
                              onClick={() => handleResultClick(result.href)}
                              className="w-full text-left p-4 border-b border-carbon-black/10 hover:bg-paper-white transition-colors group"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    <span className="text-[10px] font-mono px-2 py-1 bg-carbon-black text-white">
                                      {result.type}
                                    </span>
                                    <h3 className="text-lg font-bold group-hover:text-safety-orange transition-colors">
                                      {result.title}
                                    </h3>
                                  </div>
                                  <p className="text-xs opacity-60">{result.subtitle}</p>
                                </div>
                                <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                  →
                                </span>
                              </div>
                            </button>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>

              {!query && (
                <div className="p-8 bg-concrete-gray">
                  <div className="max-w-4xl mx-auto">
                    <p className="text-xs font-mono text-white mb-4">QUICK_ACCESS</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { label: 'LABORATORY', href: '/lab' },
                        { label: 'COLLECTIONS', href: '/collections' },
                        { label: 'ARCHIVE', href: '/archive' },
                        { label: 'ANALYSIS', href: '/analysis' }
                      ].map(link => (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={onClose}
                          className="px-4 py-3 bg-white text-center text-xs font-mono font-bold hover:bg-safety-orange hover:text-black transition-colors"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}