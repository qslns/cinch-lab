'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'

const collectionsData: { [key: string]: any } = {
  'ss25': {
    title: 'SS25',
    subtitle: 'SPRING SUMMER 2025',
    description: 'Architectural minimalism meets fluid forms.',
    lookbook: [1, 2, 3, 4, 5, 6],
    products: [
      { id: 1, name: 'STRUCTURED BLAZER', price: '$2,450' },
      { id: 2, name: 'WIDE LEG TROUSER', price: '$1,280' },
      { id: 3, name: 'ASYMMETRIC DRESS', price: '$3,200' },
      { id: 4, name: 'OVERSIZED COAT', price: '$4,500' },
      { id: 5, name: 'MINIMAL SHIRT', price: '$980' },
      { id: 6, name: 'LAYERED SKIRT', price: '$1,650' },
    ]
  },
  'fw24': {
    title: 'FW24',
    subtitle: 'FALL WINTER 2024',
    description: 'Embracing the void through monochromatic palettes.',
    lookbook: [1, 2, 3, 4, 5, 6],
    products: [
      { id: 1, name: 'DECONSTRUCTED JACKET', price: '$3,200' },
      { id: 2, name: 'LAYERED KNIT', price: '$1,450' },
      { id: 3, name: 'DRAPED COAT', price: '$5,800' },
      { id: 4, name: 'WIDE PANTS', price: '$1,680' },
      { id: 5, name: 'STRUCTURED TOP', price: '$1,200' },
      { id: 6, name: 'LONG DRESS', price: '$3,900' },
    ]
  },
}

export default function CollectionDetailPage() {
  const params = useParams()
  const [view, setView] = useState<'lookbook' | 'products'>('lookbook')
  const collection = collectionsData[params.id as string] || collectionsData['ss25']

  return (
    <div className="px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/collections" className="text-xs tracking-[0.15em] text-gray-500 hover:text-black mb-4 inline-block">
            ← BACK TO COLLECTIONS
          </Link>
          <h1 className="text-3xl md:text-4xl font-thin mb-2">{collection.title}</h1>
          <p className="text-sm tracking-[0.15em] text-gray-600 mb-4">{collection.subtitle}</p>
          <p className="text-sm max-w-2xl">{collection.description}</p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-6 mb-8 border-b border-gray-200">
          <button
            onClick={() => setView('lookbook')}
            className={`pb-2 text-xs tracking-[0.15em] ${
              view === 'lookbook' ? 'border-b-2 border-black' : 'text-gray-500'
            }`}
          >
            LOOKBOOK
          </button>
          <button
            onClick={() => setView('products')}
            className={`pb-2 text-xs tracking-[0.15em] ${
              view === 'products' ? 'border-b-2 border-black' : 'text-gray-500'
            }`}
          >
            PRODUCTS
          </button>
        </div>

        {/* Content */}
        {view === 'lookbook' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collection.lookbook.map((item: number, index: number) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="aspect-[3/4] bg-gray-100"
              >
                <div className="w-full h-full bg-gray-200 animate-pulse" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collection.products.map((product: any, index: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group"
              >
                <div className="aspect-[3/4] bg-gray-100 mb-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <h3 className="text-sm mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.price}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}