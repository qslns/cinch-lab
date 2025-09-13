'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'

export default function ProductDetailPage() {
  const params = useParams()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [showZoom, setShowZoom] = useState(false)

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

  const relatedProducts = [
    { id: 2, name: 'Wide Leg Trouser', price: '$1,280' },
    { id: 3, name: 'Silk Camisole', price: '$680' },
    { id: 4, name: 'Minimal Shirt', price: '$980' },
    { id: 5, name: 'Leather Belt', price: '$450' },
  ]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="container-wide py-4">
        <nav className="text-xs text-gray-500">
          <Link href="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-black">Shop</Link>
          <span className="mx-2">/</span>
          <Link href="/shop/ready-to-wear" className="hover:text-black">Ready-to-Wear</Link>
          <span className="mx-2">/</span>
          <span className="text-black">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <section className="container-wide pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            {/* Main Image */}
            <div 
              className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden cursor-zoom-in"
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleMouseMove}
            >
              <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              
              {/* Zoom Preview */}
              {showZoom && (
                <div 
                  className="absolute inset-0 bg-gray-300 origin-center transition-transform"
                  style={{
                    transform: `scale(2)`,
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                  }}
                />
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-5 gap-2">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-[3/4] bg-gray-100 border-2 transition-colors ${
                    selectedImage === index ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <div className="w-full h-full bg-gray-200 animate-pulse" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            {/* Header */}
            <div className="mb-8">
              <p className="text-xs text-gray-500 mb-2">{product.collection}</p>
              <h1 className="text-3xl font-light mb-2">{product.name}</h1>
              <p className="text-xl">{product.price}</p>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs tracking-wider uppercase">Size</label>
                <button 
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border text-sm transition-all ${
                      selectedSize === size 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="text-xs tracking-wider uppercase mb-3 block">Quantity</label>
              <div className="flex items-center border border-gray-300 w-32">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  -
                </button>
                <span className="flex-1 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 mb-8">
              <button className="w-full btn btn-primary">
                Add to Cart
              </button>
              <button 
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="w-full btn btn-secondary flex items-center justify-center gap-2"
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill={isWishlisted ? 'currentColor' : 'none'} 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer py-3">
                  <span className="text-sm">Details & Care</span>
                  <span className="text-xs group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="pb-4">
                  <ul className="text-xs text-gray-600 space-y-2">
                    {product.details.map((detail, index) => (
                      <li key={index}>• {detail}</li>
                    ))}
                  </ul>
                </div>
              </details>

              <details className="group border-t border-gray-200">
                <summary className="flex justify-between items-center cursor-pointer py-3">
                  <span className="text-sm">Shipping & Returns</span>
                  <span className="text-xs group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="pb-4 text-xs text-gray-600 space-y-2">
                  <p>• Complimentary shipping on all orders</p>
                  <p>• Delivered within 3-5 business days</p>
                  <p>• Free returns within 14 days</p>
                </div>
              </details>

              <div className="border-t border-gray-200 pt-4 text-xs text-gray-500">
                <p>SKU: {product.sku}</p>
                <p>Category: {product.category}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="bg-gray-50">
        <div className="container-wide py-20">
          <h2 className="text-2xl font-light mb-8">Complete the Look</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/product/${item.id}`} className="group">
                <div className="aspect-product bg-gray-100 mb-3 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                </div>
                <h3 className="text-sm mb-1 group-hover:underline">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-modal flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white max-w-2xl w-full p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl">Size Guide</h2>
              <button onClick={() => setShowSizeGuide(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Size</th>
                  <th className="py-2">Chest</th>
                  <th className="py-2">Waist</th>
                  <th className="py-2">Hip</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">XS</td>
                  <td className="py-2 text-center">32-34"</td>
                  <td className="py-2 text-center">24-26"</td>
                  <td className="py-2 text-center">34-36"</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">S</td>
                  <td className="py-2 text-center">34-36"</td>
                  <td className="py-2 text-center">26-28"</td>
                  <td className="py-2 text-center">36-38"</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">M</td>
                  <td className="py-2 text-center">36-38"</td>
                  <td className="py-2 text-center">28-30"</td>
                  <td className="py-2 text-center">38-40"</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">L</td>
                  <td className="py-2 text-center">38-40"</td>
                  <td className="py-2 text-center">30-32"</td>
                  <td className="py-2 text-center">40-42"</td>
                </tr>
                <tr>
                  <td className="py-2">XL</td>
                  <td className="py-2 text-center">40-42"</td>
                  <td className="py-2 text-center">32-34"</td>
                  <td className="py-2 text-center">42-44"</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-500 mt-4">
              All measurements are in inches. For the best fit, we recommend sizing up if you are between sizes.
            </p>
          </motion.div>
        </div>
      )}
    </>
  )
}