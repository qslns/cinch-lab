'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function ProductDetailPage() {
  const params = useParams()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const product = {
    id: params.id,
    name: 'Structured Oversized Blazer',
    price: '$2,450',
    description: 'Architectural blazer featuring exaggerated shoulders and a boxy silhouette. Crafted from premium wool with silk lining.',
    details: [
      '100% Virgin Wool exterior',
      '100% Silk lining',
      'Made in Italy',
      'Dry clean only',
      'Model is 5\'10" wearing size S'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [1, 2, 3, 4, 5],
    category: 'Ready-to-Wear',
    collection: 'Spring Summer 2025',
    sku: 'BLZ-SS25-001'
  }

  return (
    <main className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <Link href="/collections" className="text-xs tracking-[0.2em] opacity-50 hover:opacity-100 mb-8 inline-block transition-opacity">
          ← BACK TO COLLECTIONS
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-900 to-black border border-white/10 mb-4">
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-8xl opacity-10">{String(selectedImage + 1).padStart(2, '0')}</span>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((img, index) => (
                <button
                  key={img}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gradient-to-br from-gray-900 to-black border transition-colors duration-300 ${
                    selectedImage === index ? 'border-white' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <span className="text-xs opacity-30">{String(index + 1).padStart(2, '0')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl mb-2 tracking-wider">{product.name}</h1>
            <p className="text-2xl mb-8">{product.price}</p>

            <p className="text-sm mb-8 opacity-70 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-xs tracking-[0.2em] opacity-50 mb-4">SELECT SIZE</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border transition-colors duration-300 ${
                      selectedSize === size
                        ? 'border-white bg-white text-black'
                        : 'border-white/20 hover:border-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-xs tracking-[0.2em] opacity-50 mb-4">QUANTITY</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-white/20 hover:border-white transition-colors duration-300"
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-white/20 hover:border-white transition-colors duration-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Bag */}
            <button className="w-full py-4 bg-white text-black mb-4 hover:bg-opacity-90 transition-opacity duration-300">
              ADD TO BAG
            </button>

            {/* Wishlist */}
            <button className="w-full py-4 border border-white/20 hover:border-white transition-colors duration-300">
              ADD TO WISHLIST
            </button>

            {/* Product Details */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <h3 className="text-xs tracking-[0.2em] opacity-50 mb-4">DETAILS</h3>
              <ul className="space-y-2 text-sm opacity-70">
                {product.details.map((detail, index) => (
                  <li key={index}>• {detail}</li>
                ))}
              </ul>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="opacity-50">Category:</span>
                  <p>{product.category}</p>
                </div>
                <div>
                  <span className="opacity-50">Collection:</span>
                  <p>{product.collection}</p>
                </div>
                <div>
                  <span className="opacity-50">SKU:</span>
                  <p>{product.sku}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}