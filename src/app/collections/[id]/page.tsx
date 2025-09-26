'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { collections, type Collection, type Look } from '@/data/collections'
import CipherText from '@/components/CipherText'

export default function BrutalistCollectionDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [view, setView] = useState<'LOOKBOOK' | 'RESEARCH' | 'MATERIALS'>('LOOKBOOK')
  const [selectedLook, setSelectedLook] = useState(0)
  const [systemAlert, setSystemAlert] = useState<string | null>(null)
  const [glitchActive, setGlitchActive] = useState(false)

  // Get collection data
  const collectionData = collections.find(c => c.id === params.id)

  // Random system alerts
  useEffect(() => {
    if (!collectionData) return
    const alertTimer = setInterval(() => {
      if (Math.random() > 0.9) {
        const alerts = [
          `LOADING_${collectionData.code}_DATA`,
          'ANALYZING_PATTERNS',
          'EXPERIMENT_IN_PROGRESS',
          'TEMPORAL_DISTORTION_DETECTED'
        ]
        const alert = alerts[Math.floor(Math.random() * alerts.length)]
        setSystemAlert(alert)
        setGlitchActive(true)
        setTimeout(() => {
          setSystemAlert(null)
          setGlitchActive(false)
        }, 2000)
      }
    }, 10000)

    return () => clearInterval(alertTimer)
  }, [collectionData?.code])

  // Collection not found
  if (!collectionData) {
    return (
      <div className="min-h-screen bg-carbon-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-black text-glitch-red mb-4">404</h1>
          <p className="text-xl text-white mb-8">COLLECTION_NOT_FOUND</p>
          <Link href="/collections" className="text-safety-orange font-mono text-sm hover:underline">
            RETURN_TO_ARCHIVE →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-paper-white">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* System Alert Bar */}
      <AnimatePresence>
        {systemAlert && (
          <motion.div
            className="fixed top-20 left-0 right-0 z-50 bg-warning-yellow text-black p-2 text-center"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
          >
            <p className="text-xs font-mono">[SYSTEM] {systemAlert}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="lab-border bg-carbon-black text-white p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className={`text-6xl font-black mb-2 ${glitchActive ? 'glitch-text' : ''}`}>
              <CipherText text={collectionData.title} />
            </h1>
            <p className="text-sm font-mono opacity-60">{collectionData.subtitle}</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-mono opacity-60">COLLECTION_CODE</p>
            <p className="text-2xl font-black">{collectionData.code}</p>
          </div>
        </div>

        <p className="text-sm leading-relaxed mb-6 max-w-3xl">
          {collectionData.description}
        </p>

        {/* Status Indicators */}
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 ${collectionData.status === 'CURRENT' ? 'bg-hazmat-green animate-pulse' : 'bg-concrete-gray'}`} />
            <span className="text-[10px] font-mono">STATUS_{collectionData.status}</span>
          </div>
          <div className="text-[10px] font-mono opacity-60">
            RELEASE_DATE_{collectionData.releaseDate}
          </div>
          <div className="text-[10px] font-mono opacity-60">
            SEASON_{collectionData.season}_{collectionData.year}
          </div>
        </div>
      </div>

      {/* View Selector */}
      <div className="bg-white border-y-3 border-carbon-black">
        <div className="flex divide-x-3 divide-carbon-black">
          {(['LOOKBOOK', 'RESEARCH', 'MATERIALS'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`flex-1 p-4 text-xs font-mono tracking-wider transition-all ${
                view === v
                  ? 'bg-carbon-black text-white'
                  : 'hover:bg-paper-white'
              }`}
            >
              VIEW_{v}
              {view === v && <span className="ml-2">●</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8">
        {view === 'LOOKBOOK' && (
          <div className="space-y-8">
            <div className="brutalist-grid-asymmetric gap-8">
              {/* Main Look Display */}
              <div className="col-span-2">
                <div className="aspect-[3/4] bg-concrete-gray relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedLook}
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {collectionData.lookbook[selectedLook]?.imageUrl ? (
                        <img
                          src={collectionData.lookbook[selectedLook].imageUrl}
                          alt={collectionData.lookbook[selectedLook].title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <p className="text-6xl font-black text-white/20 mb-4">
                            LOOK_{String(selectedLook + 1).padStart(2, '0')}
                          </p>
                          <p className="text-xs font-mono text-white/40">
                            NO_VISUAL_DATA
                          </p>
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                        <h3 className="text-2xl font-bold mb-2">
                          {collectionData.lookbook[selectedLook]?.title}
                        </h3>
                        <p className="text-xs opacity-80">
                          {collectionData.lookbook[selectedLook]?.description}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Look Selector Grid */}
              <div className="space-y-2">
                {collectionData.lookbook.map((look: Look, index: number) => (
                  <button
                    key={look.id}
                    onClick={() => setSelectedLook(index)}
                    className={`w-full p-4 text-left transition-all ${
                      selectedLook === index
                        ? 'bg-safety-orange text-black'
                        : 'bg-white hover:bg-paper-white lab-border'
                    }`}
                  >
                    <p className="text-[10px] font-mono mb-1">{look.id}</p>
                    <p className="text-sm font-bold">LOOK_{String(index + 1).padStart(2, '0')}</p>
                    <p className="text-xs opacity-60 mt-1">{look.title}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Philosophy Section */}
            <div className="lab-border p-8 bg-paper-white">
              <h3 className="text-xs font-mono mb-4">COLLECTION_PHILOSOPHY</h3>
              <p className="text-lg font-bold">{collectionData.philosophy}</p>
            </div>
          </div>
        )}

        {view === 'RESEARCH' && (
          <div className="space-y-8">
            {/* Research Data */}
            <div className="brutalist-grid-asymmetric gap-2 bg-carbon-black p-2">
              {/* Techniques */}
              <div className="bg-paper-white p-6">
                <h3 className="text-xs font-mono mb-4">TECHNIQUES_APPLIED</h3>
                <ul className="space-y-2">
                  {collectionData.techniques.map((technique: string, i: number) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-glitch-red">▪</span>
                      <span>{technique}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Experimental Status */}
              <div className="bg-carbon-black text-white p-6 col-span-2">
                <h3 className="text-xs font-mono mb-4">EXPERIMENTAL_STATUS</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-mono opacity-60 mb-1">GENIUS_LEVEL</p>
                    <div className="h-2 bg-white/20">
                      <div className="h-full bg-hazmat-green" style={{ width: '95%' }} />
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono opacity-60 mb-1">COMMERCIAL_COMPROMISE</p>
                    <div className="h-2 bg-white/20">
                      <div className="h-full bg-glitch-red" style={{ width: '0%' }} />
                    </div>
                  </div>
                  <p className="text-xs mt-4 opacity-60">
                    NO SALES. ONLY CREATION.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'MATERIALS' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {collectionData.materials.map((material: string, i: number) => (
                <motion.div
                  key={i}
                  className="bg-white lab-border p-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl text-safety-orange">◆</span>
                    <div>
                      <h4 className="text-sm font-bold mb-2">{material}</h4>
                      <p className="text-[10px] font-mono opacity-60">
                        MATERIAL_{String(i + 1).padStart(3, '0')}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Material Philosophy */}
            <div className="lab-border p-8 bg-carbon-black text-white">
              <h3 className="text-xs font-mono mb-4">MATERIAL_PHILOSOPHY</h3>
              <p className="text-sm leading-relaxed">
                Each material selected not for market appeal but for experimental potential.
                We work with substances that challenge conventional fashion construction.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Back Button */}
      <div className="p-8">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-sm font-mono hover:text-safety-orange transition-colors"
        >
          ← RETURN_TO_COLLECTIONS
        </Link>
      </div>
    </div>
  )
}