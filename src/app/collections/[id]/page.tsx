'use client'

import { useState } from 'react'
import Link from 'next/link'
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
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16">
          <Link href="/collections" className="text-xs tracking-[0.2em] opacity-50 hover:opacity-100 mb-6 inline-block transition-opacity">
            ← BACK TO COLLECTIONS
          </Link>
          <h1 className="text-5xl md:text-7xl mb-4 tracking-wider">{collection.title}</h1>
          <p className="text-sm tracking-[0.2em] opacity-70 mb-4">{collection.subtitle}</p>
          <p className="text-sm max-w-2xl opacity-70">{collection.description}</p>
        </div>

        {/* View Toggle */}
        <div className="flex gap-6 mb-12 border-b border-white/20">
          <button
            onClick={() => setView('lookbook')}
            className={`pb-2 text-sm tracking-[0.2em] transition-colors ${
              view === 'lookbook' ? 'border-b-2 border-white text-white' : 'text-white/50 hover:text-white'
            }`}
          >
            LOOKBOOK
          </button>
          <button
            onClick={() => setView('products')}
            className={`pb-2 text-sm tracking-[0.2em] transition-colors ${
              view === 'products' ? 'border-b-2 border-white text-white' : 'text-white/50 hover:text-white'
            }`}
          >
            PRODUCTS
          </button>
        </div>

        {/* Content */}
        {view === 'lookbook' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collection.lookbook.map((item: number, index: number) => (
              <div
                key={item}
                className="aspect-[3/4] bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-white/30 transition-colors duration-500 fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl opacity-10">{String(index + 1).padStart(2, '0')}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collection.products.map((product: any, index: number) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group block fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-900 to-black border border-white/10 hover:border-white/30 transition-colors duration-500 mb-4">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl opacity-10">{String(product.id).padStart(2, '0')}</span>
                  </div>
                </div>
                <h3 className="text-sm tracking-wider mb-1 group-hover:translate-x-2 transition-transform duration-300">
                  {product.name}
                </h3>
                <p className="text-sm opacity-50">{product.price}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}