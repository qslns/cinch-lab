'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ImageWithLoading from './ImageWithLoading'

interface Product {
  id: string
  name: string
  price: string
  category: string
  images: string[]
  description?: string
}

interface ProductGalleryProps {
  products: Product[]
  title?: string
}

export default function ProductGallery({ products, title = 'Shop' }: ProductGalleryProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))]

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter)

  return (
    <>
      <section className="px-8 md:px-12 py-20">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl md:text-6xl font-thin">{title}</h2>
          <div className="flex gap-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-sm tracking-wider transition-all ${
                  filter === cat 
                    ? 'opacity-100 border-b border-black' 
                    : 'opacity-50 hover:opacity-100'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative aspect-[3/4] mb-4 overflow-hidden bg-gray-50">
                  <ImageWithLoading
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.images[1] && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ImageWithLoading
                        src={product.images[1]}
                        alt={`${product.name} Alt`}
                        fill
                        objectFit="cover"
                      />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 text-xs tracking-wider">
                      QUICK VIEW
                    </div>
                  </div>
                </div>
                <h3 className="text-sm font-light mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.price}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-8"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-[3/4]">
                  <ImageWithLoading
                    src={selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    fill
                    objectFit="cover"
                  />
                </div>
                <div className="p-12 flex flex-col justify-center">
                  <h2 className="text-3xl font-light mb-4">{selectedProduct.name}</h2>
                  <p className="text-xl text-gray-600 mb-8">{selectedProduct.price}</p>
                  {selectedProduct.description && (
                    <p className="text-sm text-gray-700 leading-relaxed mb-8">
                      {selectedProduct.description}
                    </p>
                  )}
                  <div className="space-y-4">
                    <button className="w-full py-3 bg-black text-white text-sm tracking-wider hover:bg-gray-900 transition-colors">
                      ADD TO BAG
                    </button>
                    <button 
                      onClick={() => setSelectedProduct(null)}
                      className="w-full py-3 border border-gray-300 text-sm tracking-wider hover:border-black transition-colors"
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}