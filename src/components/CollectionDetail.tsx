'use client'

import { motion } from 'framer-motion'
import ImageWithLoading from './ImageWithLoading'

interface CollectionDetailProps {
  collection: {
    id: string
    title: string
    subtitle: string
    description: string
    lookbookImages: string[]
    products: Array<{
      id: string
      name: string
      price: string
      images: string[]
    }>
  }
  onBack: () => void
}

export default function CollectionDetail({ collection, onBack }: CollectionDetailProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex justify-between items-center px-8 md:px-12 py-6">
          <button 
            onClick={onBack}
            className="text-sm tracking-wider hover:opacity-60 transition-opacity"
          >
            ← BACK TO COLLECTIONS
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-light tracking-wider">{collection.title}</h2>
            <p className="text-xs text-gray-600 mt-1">{collection.subtitle}</p>
          </div>
          <div className="w-32" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="relative h-[70vh] mb-20">
          <ImageWithLoading
            src={collection.lookbookImages[0]}
            alt={`${collection.title} Hero`}
            fill
            priority
            objectFit="cover"
            className="w-full h-full"
          />
          <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-sm p-8">
            <h1 className="text-5xl font-thin mb-4">{collection.title}</h1>
            <p className="text-lg text-gray-700 max-w-md">{collection.description}</p>
          </div>
        </div>

        {/* Lookbook Grid */}
        <div className="px-8 md:px-12 mb-32">
          <h3 className="text-3xl font-thin mb-12">LOOKBOOK</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {collection.lookbookImages.slice(1, 5).map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-[3/4] overflow-hidden"
              >
                <ImageWithLoading
                  src={image}
                  alt={`${collection.title} Look ${index + 1}`}
                  fill
                  objectFit="cover"
                  className="hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="px-8 md:px-12">
          <h3 className="text-3xl font-thin mb-12">COLLECTION PIECES</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {collection.products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
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
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <ImageWithLoading
                        src={product.images[1]}
                        alt={`${product.name} Alt`}
                        fill
                        objectFit="cover"
                      />
                    </div>
                  )}
                </div>
                <h4 className="text-lg font-light mb-1">{product.name}</h4>
                <p className="text-sm text-gray-600">{product.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}