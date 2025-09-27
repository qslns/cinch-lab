'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import CipherText from '@/components/CipherText'
import {
  DeconstructedHover,
  SacaiLayer,
  FragmentMosaic,
  ExposedStructure,
  AsymmetricTransform
} from '@/components/HybridLayerEffects'

// Real fashion collections data
const collections = [
  {
    id: 'ss25-deconstructed',
    name: 'DECONSTRUCTED TAILORING',
    season: 'SS25',
    year: '2025',
    status: 'UPCOMING',
    lookCount: 24,
    location: 'CINCH LAB ATELIER, SEOUL',
    date: 'MARCH 2025',
    theme: 'Dismantling the architecture of traditional suiting. Each piece begins as a complete garment, then methodically deconstructed to reveal new silhouettes and unexpected volumes.',
    keyPieces: [
      'Deconstructed Blazer with Exposed Seams',
      'Inside-Out Trench with Raw Edges',
      'Fragmented Shirt Dress',
      'Asymmetric Jacket with Floating Panels'
    ],
    techniques: ['Seam Reversal', 'Pattern Interruption', 'Structural Exposure', 'Volume Displacement'],
    materials: ['Japanese Cotton Twill', 'Deconstructed Wool', 'Raw Silk', 'Exposed Interfacing'],
    looks: Array.from({ length: 24 }, (_, i) => ({
      number: String(i + 1).padStart(3, '0'),
      title: `Look ${String(i + 1).padStart(3, '0')}`,
      description: i === 0 ? 'Opening look: Deconstructed blazer with exposed construction' :
                   i === 5 ? 'Signature piece: Inside-out trench revealing internal structure' :
                   i === 12 ? 'Mid-collection statement: Fragmented shirt dress' :
                   i === 23 ? 'Finale: Complete deconstruction and reconstruction' :
                   `Experimental tailoring with ${['asymmetric cuts', 'exposed seams', 'raw finishes', 'structural elements'][i % 4]}`,
      garments: i === 0 ? ['Deconstructed Blazer', 'Wide-leg Trousers'] :
               i === 5 ? ['Inside-out Trench', 'Minimal Dress'] :
               i === 12 ? ['Fragmented Shirt Dress', 'Deconstructed Belt'] :
               ['Experimental Jacket', 'Tailored Trousers']
    }))
  },
  {
    id: 'fw24-industrial',
    name: 'INDUSTRIAL ROMANCE',
    season: 'FW24',
    year: '2024',
    status: 'CURRENT',
    lookCount: 18,
    location: 'ABANDONED FACTORY, BUSAN',
    date: 'SEPTEMBER 2024',
    theme: 'The brutal beauty of industrial decay meets romantic silhouettes. Heavy fabrics shaped by machinery, softness carved from hardness.',
    keyPieces: [
      'Metal-studded Ballgown',
      'Industrial Corset with Exposed Hardware',
      'Concrete-washed Wool Coat',
      'Machinery-inspired Jewelry'
    ],
    techniques: ['Metal Fusion', 'Concrete Washing', 'Industrial Pleating', 'Hardware Integration'],
    materials: ['Heavy Wool', 'Industrial Cotton', 'Metal Hardware', 'Concrete-treated Fabric'],
    looks: Array.from({ length: 18 }, (_, i) => ({
      number: String(i + 1).padStart(3, '0'),
      title: `Look ${String(i + 1).padStart(3, '0')}`,
      description: i === 0 ? 'Opening: Industrial romance meets brutal elegance' :
                   i === 8 ? 'Centerpiece: Metal-studded ballgown with industrial corsetry' :
                   i === 17 ? 'Finale: Complete fusion of soft and hard elements' :
                   `Industrial romance featuring ${['heavy textures', 'metal details', 'romantic silhouettes', 'concrete finishes'][i % 4]}`,
      garments: ['Industrial Coat', 'Romantic Dress', 'Metal Accessories']
    }))
  },
  {
    id: 'capsule-experimental',
    name: 'EXPERIMENTAL BASICS',
    season: 'CAPSULE',
    year: '2024',
    status: 'ARCHIVED',
    lookCount: 12,
    location: 'CINCH LAB STUDIO',
    date: 'ONGOING',
    theme: 'What if the most basic garments were completely reimagined? T-shirts that deconstruct, jeans that fragment, basics that challenge everything.',
    keyPieces: [
      'Deconstructed T-shirt Series',
      'Fragmented Denim',
      'Inside-out Sweatshirt',
      'Reconstructed Basic Dress'
    ],
    techniques: ['Basic Deconstruction', 'Fragment Assembly', 'Inside-out Construction', 'Minimal Maximalism'],
    materials: ['Organic Cotton', 'Recycled Denim', 'Deconstructed Knits', 'Raw Jersey'],
    looks: Array.from({ length: 12 }, (_, i) => ({
      number: String(i + 1).padStart(3, '0'),
      title: `Look ${String(i + 1).padStart(3, '0')}`,
      description: i === 0 ? 'Basic redefined: Deconstructed T-shirt with architectural elements' :
                   i === 5 ? 'Denim fragments reconstructed into new silhouettes' :
                   i === 11 ? 'The final basic: Everything and nothing' :
                   `Experimental basic featuring ${['deconstructed elements', 'fragmented construction', 'inside-out details', 'minimal complexity'][i % 4]}`,
      garments: ['Experimental Top', 'Reconstructed Bottom']
    }))
  },
  {
    id: 'ss24-artisanal',
    name: 'ARTISANAL CHAOS',
    season: 'SS24',
    year: '2024',
    status: 'ARCHIVED',
    lookCount: 20,
    location: 'JEJU ISLAND WORKSHOP',
    date: 'MAY 2024',
    theme: 'Controlled chaos through artisanal techniques. Every stitch tells a story of deliberate imperfection, every seam a moment of beautiful disorder.',
    keyPieces: [
      'Hand-frayed Silk Kimono',
      'Chaotic Embroidery Jacket',
      'Deliberately Damaged Dress',
      'Imperfect Perfection Coat'
    ],
    techniques: ['Controlled Fraying', 'Chaotic Embroidery', 'Deliberate Damage', 'Imperfect Perfection'],
    materials: ['Raw Silk', 'Handwoven Cotton', 'Natural Linen', 'Organic Wool'],
    looks: Array.from({ length: 20 }, (_, i) => ({
      number: String(i + 1).padStart(3, '0'),
      title: `Look ${String(i + 1).padStart(3, '0')}`,
      description: i === 0 ? 'Chaos begins: Hand-frayed silk with intentional imperfections' :
                   i === 9 ? 'Peak chaos: Deliberately damaged dress with chaotic embroidery' :
                   i === 19 ? 'Order from chaos: Perfect imperfection achieved' :
                   `Artisanal chaos with ${['hand-frayed details', 'chaotic embroidery', 'deliberate damage', 'imperfect beauty'][i % 4]}`,
      garments: ['Artisanal Top', 'Chaotic Bottom', 'Imperfect Accessories']
    }))
  }
]

// Viewing modes
type ViewMode = 'GRID' | 'LIST' | 'RUNWAY'
type FilterMode = 'ALL' | 'CURRENT' | 'UPCOMING' | 'ARCHIVED'

export default function CollectionsPage() {
  const [selectedCollection, setSelectedCollection] = useState<typeof collections[0] | null>(null)
  const [selectedLook, setSelectedLook] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('GRID')
  const [filterMode, setFilterMode] = useState<FilterMode>('ALL')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  })

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50])

  // Filter collections based on status
  const filteredCollections = collections.filter(col => {
    if (filterMode === 'ALL') return true
    return col.status === filterMode
  })

  // Collection card component
  const CollectionCard = ({ collection, index }: { collection: typeof collections[0], index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={() => setSelectedCollection(collection)}
    >
      <DeconstructedHover intensity={1.5}>
        <div className="bg-white-0 border-2 border-gray-plaster hover:border-black-100 transition-all duration-300 p-8 relative overflow-hidden">
          {/* Status indicator */}
          <div className="absolute top-4 right-4">
            <div className={`w-3 h-3 rounded-full ${
              collection.status === 'CURRENT' ? 'bg-hybrid-blue animate-pulse' :
              collection.status === 'UPCOMING' ? 'bg-hybrid-red animate-pulse' :
              'bg-gray-steel'
            }`} />
          </div>

          {/* Collection header */}
          <div className="mb-6">
            <div className="text-micro font-mono text-hybrid-red mb-2">
              <CipherText mode="hover">{collection.season} {collection.year}</CipherText>
            </div>
            <h3 className="text-2xl font-black mb-2 group-hover:text-hybrid-red transition-colors">
              <CipherText mode="hover" delay={100}>
                {collection.name}
              </CipherText>
            </h3>
            <div className="text-micro font-mono text-gray-steel mb-4">
              {collection.lookCount} LOOKS • {collection.location}
            </div>
          </div>

          {/* Theme preview */}
          <p className="text-sm italic opacity-70 mb-6 line-clamp-3">
            {collection.theme}
          </p>

          {/* Key pieces */}
          <div className="mb-6">
            <div className="text-micro font-mono text-black-100 mb-2">KEY PIECES:</div>
            <div className="space-y-1">
              {collection.keyPieces.slice(0, 2).map((piece, i) => (
                <div key={i} className="text-xs text-gray-steel">• {piece}</div>
              ))}
              {collection.keyPieces.length > 2 && (
                <div className="text-xs text-gray-steel">+ {collection.keyPieces.length - 2} more</div>
              )}
            </div>
          </div>

          {/* Look preview grid */}
          <div className="grid grid-cols-4 gap-1">
            {collection.looks.slice(0, 8).map((look, i) => (
              <div
                key={look.number}
                className="aspect-[3/4] bg-gradient-to-b from-gray-plaster to-gray-steel flex items-center justify-center"
              >
                <span className="text-white-0 text-micro font-mono opacity-60">
                  {look.number}
                </span>
              </div>
            ))}
          </div>

          {/* Techniques */}
          <div className="mt-6 flex flex-wrap gap-2">
            {collection.techniques.slice(0, 3).map(tech => (
              <span key={tech} className="text-micro px-2 py-1 border border-gray-plaster">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </DeconstructedHover>
    </motion.div>
  )

  // Look card component for detailed view
  const LookCard = ({ look, collection }: { look: any, collection: typeof collections[0] }) => (
    <motion.div
      className="group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      onClick={() => setSelectedLook(look.number)}
    >
      <div className="bg-white-0 border border-gray-plaster hover:border-black-100 transition-all">
        {/* Look image placeholder */}
        <div className="aspect-[3/4] bg-gradient-to-b from-gray-plaster to-gray-steel relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-black text-white-0/20">
              {look.number}
            </span>
          </div>

          {/* Hover overlay with details */}
          <div className="absolute inset-0 bg-black-100/90 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
            <div className="text-center text-white-0">
              <div className="text-lg font-black mb-2">LOOK {look.number}</div>
              <div className="text-micro font-mono mb-3">{collection.name}</div>
              <div className="text-xs mb-3 opacity-80">{look.description}</div>
              <div className="text-micro">
                {look.garments.join(' • ')}
              </div>
            </div>
          </div>
        </div>

        {/* Look info */}
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-black">
              <CipherText mode="hover">LOOK {look.number}</CipherText>
            </span>
            <span className="text-micro font-mono text-gray-steel">
              {collection.season}
            </span>
          </div>
          <p className="text-xs opacity-70 line-clamp-2">
            {look.description}
          </p>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div ref={containerRef} className="min-h-screen bg-white-0 relative">
      {/* Background patterns */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <div className="absolute inset-0 overlay-grid" />
        <div className="absolute inset-0 overlay-muslin" />
      </div>

      {/* Status bar */}
      <motion.div
        className="fixed top-20 left-0 right-0 z-40 bg-black-100 text-white-0 py-2"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between text-micro font-mono">
            <div className="flex items-center gap-6">
              <span>LOOKBOOK_STATUS: ACTIVE</span>
              <span className="opacity-60">|</span>
              <span>COLLECTIONS: {filteredCollections.length}</span>
              <span className="opacity-60">|</span>
              <span>TOTAL_LOOKS: {filteredCollections.reduce((acc, col) => acc + col.lookCount, 0)}</span>
            </div>
            <span>NO SALES • VISUAL DOCUMENTATION ONLY</span>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="pt-32 pb-20">
        <div className="container-wide">
          {/* Page header */}
          <ExposedStructure showMeasurements className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-micro font-mono text-hybrid-red mb-2">
                VISUAL_ARCHIVE / LOOKBOOK_DOCUMENTATION
              </div>
              <h1 className="text-display font-black tracking-tightest uppercase mb-4">
                <SacaiLayer layers={2}>
                  <CipherText mode="auto" delay={500} scrambleDuration={1500}>
                    COLLECTIONS
                  </CipherText>
                </SacaiLayer>
              </h1>
              <div className="text-lg text-gray-steel max-w-3xl">
                <CipherText mode="auto" delay={1500}>
                  Digital archive of experimental fashion collections. Each collection documents our journey through deconstruction, reconstruction, and the endless pursuit of perfect imperfection. This is not a catalog—this is visual philosophy.
                </CipherText>
              </div>
            </motion.div>
          </ExposedStructure>

          {/* Controls */}
          <motion.div
            className="mb-12 flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {/* View mode controls */}
            <div className="flex gap-2">
              <span className="text-micro font-mono self-center mr-4">VIEW:</span>
              {(['GRID', 'LIST', 'RUNWAY'] as ViewMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 text-xs font-mono transition-all ${
                    viewMode === mode
                      ? 'bg-black-100 text-white-0'
                      : 'bg-white-0 text-black-100 border border-gray-plaster hover:border-black-100'
                  }`}
                >
                  <CipherText mode="hover">{mode}</CipherText>
                </button>
              ))}
            </div>

            {/* Filter controls */}
            <div className="flex gap-2">
              <span className="text-micro font-mono self-center mr-4">FILTER:</span>
              {(['ALL', 'CURRENT', 'UPCOMING', 'ARCHIVED'] as FilterMode[]).map(filter => (
                <button
                  key={filter}
                  onClick={() => setFilterMode(filter)}
                  className={`px-4 py-2 text-xs font-mono transition-all ${
                    filterMode === filter
                      ? 'bg-hybrid-red text-white-0'
                      : 'bg-white-0 text-black-100 border border-gray-plaster hover:border-hybrid-red'
                  }`}
                >
                  <CipherText mode="hover">{filter}</CipherText>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Collections display */}
          <div className="mb-20">
            {viewMode === 'GRID' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCollections.map((collection, index) => (
                  <CollectionCard key={collection.id} collection={collection} index={index} />
                ))}
              </div>
            )}

            {viewMode === 'LIST' && (
              <div className="space-y-12">
                {filteredCollections.map((collection, index) => (
                  <motion.div
                    key={collection.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="cursor-pointer"
                    onClick={() => setSelectedCollection(collection)}
                  >
                    <SacaiLayer layers={2} color1="hybrid-blue" color2="hybrid-red">
                      <div className="p-12 bg-white-0 border-2 border-gray-plaster hover:border-black-100 transition-all">
                        <div className="flex items-start gap-12">
                          {/* Collection info */}
                          <div className="flex-1">
                            <div className="text-micro font-mono text-hybrid-red mb-2">
                              {collection.season} {collection.year} • {collection.status}
                            </div>
                            <h3 className="text-4xl font-black mb-4">
                              <CipherText mode="hover">{collection.name}</CipherText>
                            </h3>
                            <p className="text-lg mb-6 opacity-80">{collection.theme}</p>

                            <div className="grid grid-cols-2 gap-6 mb-6">
                              <div>
                                <div className="text-micro font-mono text-black-100 mb-2">TECHNIQUES:</div>
                                {collection.techniques.map(tech => (
                                  <div key={tech} className="text-sm opacity-70">• {tech}</div>
                                ))}
                              </div>
                              <div>
                                <div className="text-micro font-mono text-black-100 mb-2">MATERIALS:</div>
                                {collection.materials.map(material => (
                                  <div key={material} className="text-sm opacity-70">• {material}</div>
                                ))}
                              </div>
                            </div>

                            <div className="text-micro font-mono">
                              {collection.lookCount} LOOKS • {collection.location} • {collection.date}
                            </div>
                          </div>

                          {/* Look previews */}
                          <div className="grid grid-cols-3 gap-2">
                            {collection.looks.slice(0, 9).map((look, i) => (
                              <div
                                key={look.number}
                                className="w-20 h-24 bg-gradient-to-b from-gray-plaster to-gray-steel flex items-center justify-center group-hover:scale-105 transition-transform"
                              >
                                <span className="text-white-0 text-micro font-mono opacity-60">
                                  {look.number}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </SacaiLayer>
                  </motion.div>
                ))}
              </div>
            )}

            {viewMode === 'RUNWAY' && (
              <div className="space-y-20">
                {filteredCollections.map((collection, collectionIndex) => (
                  <motion.div
                    key={collection.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: collectionIndex * 0.2 }}
                  >
                    {/* Collection header */}
                    <div className="mb-12 text-center">
                      <div className="text-micro font-mono text-hybrid-red mb-2">
                        {collection.season} {collection.year}
                      </div>
                      <h3 className="text-5xl font-black mb-4">
                        <CipherText mode="auto" delay={collectionIndex * 500}>
                          {collection.name}
                        </CipherText>
                      </h3>
                      <p className="text-lg italic opacity-70 max-w-3xl mx-auto">
                        {collection.theme}
                      </p>
                    </div>

                    {/* Runway looks */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                      {collection.looks.map((look, lookIndex) => (
                        <LookCard key={look.number} look={look} collection={collection} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Collection modal */}
      <AnimatePresence>
        {selectedCollection && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCollection(null)}
              className="fixed inset-0 bg-black-100/95 z-50"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 md:inset-8 bg-white-0 z-50 overflow-auto"
            >
              <div className="p-8 md:p-12">
                {/* Modal header */}
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-micro font-mono text-hybrid-red mb-2">
                      {selectedCollection.season} {selectedCollection.year} • {selectedCollection.status}
                    </div>
                    <h2 className="text-6xl font-black mb-4">
                      <CipherText mode="auto" delay={300}>
                        {selectedCollection.name}
                      </CipherText>
                    </h2>
                    <p className="text-xl italic opacity-70 max-w-4xl">
                      {selectedCollection.theme}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCollection(null)}
                    className="w-12 h-12 bg-black-100 text-white-0 flex items-center justify-center hover:bg-hybrid-red transition-colors"
                  >
                    ×
                  </button>
                </div>

                {/* Collection details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div>
                    <div className="text-micro font-mono text-black-100 mb-3">KEY PIECES:</div>
                    {selectedCollection.keyPieces.map(piece => (
                      <div key={piece} className="text-sm mb-1 opacity-80">• {piece}</div>
                    ))}
                  </div>
                  <div>
                    <div className="text-micro font-mono text-black-100 mb-3">TECHNIQUES:</div>
                    {selectedCollection.techniques.map(tech => (
                      <div key={tech} className="text-sm mb-1 opacity-80">• {tech}</div>
                    ))}
                  </div>
                  <div>
                    <div className="text-micro font-mono text-black-100 mb-3">MATERIALS:</div>
                    {selectedCollection.materials.map(material => (
                      <div key={material} className="text-sm mb-1 opacity-80">• {material}</div>
                    ))}
                  </div>
                </div>

                {/* Lookbook grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {selectedCollection.looks.map((look, index) => (
                    <motion.div
                      key={look.number}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group cursor-pointer"
                      onClick={() => setSelectedLook(look.number)}
                    >
                      <div className="aspect-[3/4] bg-gradient-to-b from-gray-plaster to-gray-steel relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-4xl font-black text-white-0/30">
                            {look.number}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-hybrid-red opacity-0 group-hover:opacity-30 transition-opacity" />
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black-100/90 text-white-0 text-micro font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                          LOOK {look.number}
                        </div>
                      </div>
                      <div className="mt-2 text-center">
                        <div className="text-micro font-mono">LOOK {look.number}</div>
                        <div className="text-xs opacity-60 line-clamp-1">{look.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Look detail modal */}
      <AnimatePresence>
        {selectedLook && selectedCollection && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLook(null)}
              className="fixed inset-0 bg-black-100/98 z-60"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-8 bg-white-0 z-60 flex"
            >
              {/* Look image */}
              <div className="flex-1 bg-gradient-to-b from-gray-plaster to-gray-steel flex items-center justify-center">
                <div className="text-center">
                  <div className="text-9xl font-black text-white-0/20 mb-4">
                    {selectedLook}
                  </div>
                  <div className="text-2xl font-black text-white-0/60">
                    LOOK {selectedLook}
                  </div>
                </div>
              </div>

              {/* Look details */}
              <div className="w-80 p-8 overflow-auto">
                <button
                  onClick={() => setSelectedLook(null)}
                  className="w-full mb-8 py-2 bg-black-100 text-white-0 hover:bg-hybrid-red transition-colors"
                >
                  CLOSE
                </button>

                <div className="space-y-6">
                  <div>
                    <div className="text-micro font-mono text-hybrid-red mb-2">
                      {selectedCollection.season} {selectedCollection.year}
                    </div>
                    <h3 className="text-2xl font-black mb-2">
                      {selectedCollection.name}
                    </h3>
                    <div className="text-lg font-black mb-2">LOOK {selectedLook}</div>
                  </div>

                  {(() => {
                    const look = selectedCollection.looks.find(l => l.number === selectedLook)
                    return look ? (
                      <>
                        <div>
                          <div className="text-micro font-mono text-black-100 mb-2">DESCRIPTION:</div>
                          <p className="text-sm opacity-80">{look.description}</p>
                        </div>

                        <div>
                          <div className="text-micro font-mono text-black-100 mb-2">GARMENTS:</div>
                          {look.garments.map(garment => (
                            <div key={garment} className="text-sm opacity-80">• {garment}</div>
                          ))}
                        </div>

                        <div>
                          <div className="text-micro font-mono text-black-100 mb-2">COLLECTION TECHNIQUES:</div>
                          {selectedCollection.techniques.map(tech => (
                            <div key={tech} className="text-xs opacity-60">• {tech}</div>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-gray-plaster text-micro font-mono opacity-60">
                          PHOTOGRAPHED: {selectedCollection.location}<br />
                          DATE: {selectedCollection.date}<br />
                          STATUS: {selectedCollection.status}
                        </div>

                        <div className="p-4 bg-gray-plaster/20 text-xs italic text-center">
                          This is documentation only.<br />
                          NO SALES • NO PURCHASES<br />
                          VISUAL ARCHIVE PURPOSES
                        </div>
                      </>
                    ) : null
                  })()}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scroll progress indicator */}
      <motion.div
        className="fixed bottom-8 right-8 text-micro font-mono"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
      >
        <div className="bg-white-0 border border-black-100 p-4">
          ARCHIVE_PROGRESS: {Math.round(scrollYProgress.get() * 100)}%
        </div>
      </motion.div>

      {/* Philosophy footer */}
      <div className="fixed bottom-8 left-8 text-micro font-mono opacity-60">
        <CipherText mode="auto" delay={3000}>
          CINCH • RELEASE • REPEAT
        </CipherText>
      </div>
    </div>
  )
}