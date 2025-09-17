'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import CipherText from '@/components/CipherText'

gsap.registerPlugin(ScrollTrigger)

interface GridItem {
  id: string
  image?: string
  title: string
  subtitle?: string
  size: 'small' | 'medium' | 'large' | 'tall' | 'wide' | 'hero'
  position?: { x?: number; y?: number }
  delay?: number
}

interface AsymmetricGridProps {
  items: GridItem[]
  className?: string
  animated?: boolean
}

export default function AsymmetricGrid({ items, className = '', animated = true }: AsymmetricGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!animated || !gridRef.current) return

    const ctx = gsap.context(() => {
      // Set initial states
      itemRefs.current.forEach((item, index) => {
        if (!item) return

        gsap.set(item, {
          opacity: 0,
          scale: 0.8,
          y: 100,
          rotationY: -30,
          transformPerspective: 1000,
          transformOrigin: "center center"
        })

        // Create scroll trigger for each item
        ScrollTrigger.create({
          trigger: item,
          start: "top 85%",
          onEnter: () => {
            gsap.to(item, {
              opacity: 1,
              scale: 1,
              y: 0,
              rotationY: 0,
              duration: 1.2,
              delay: index * 0.05,
              ease: "power3.out",
              clearProps: "transform",
            })
          },
          once: true
        })
      })

      // Parallax effect on scroll
      itemRefs.current.forEach((item, index) => {
        if (!item) return

        const speed = 0.5 + (index % 3) * 0.2

        gsap.to(item, {
          y: -50 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        })
      })
    }, gridRef)

    return () => ctx.revert()
  }, [animated])

  const getSizeClasses = (size: GridItem['size']) => {
    switch (size) {
      case 'small':
        return 'col-span-1 row-span-1 aspect-square'
      case 'medium':
        return 'col-span-2 row-span-2 aspect-square'
      case 'large':
        return 'col-span-3 row-span-3 aspect-[4/5]'
      case 'tall':
        return 'col-span-1 row-span-2 aspect-[1/2]'
      case 'wide':
        return 'col-span-2 row-span-1 aspect-[2/1]'
      case 'hero':
        return 'col-span-4 row-span-4 aspect-[16/9]'
      default:
        return 'col-span-1 row-span-1 aspect-square'
    }
  }

  return (
    <div
      ref={gridRef}
      className={`grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-4 auto-rows-[100px] md:auto-rows-[150px] ${className}`}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          ref={el => { itemRefs.current[index] = el }}
          className={`${getSizeClasses(item.size)} group relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 cursor-pointer`}
          style={{
            gridColumn: item.position?.x ? `${item.position.x} / span ${getSizeClasses(item.size).match(/col-span-(\d+)/)?.[1] || 1}` : undefined,
            gridRow: item.position?.y ? `${item.position.y} / span ${getSizeClasses(item.size).match(/row-span-(\d+)/)?.[1] || 1}` : undefined,
          }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.05) 35px, rgba(0,0,0,.05) 70px)`
            }} />
          </div>

          {/* Image container */}
          {item.image && (
            <div className="absolute inset-0">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
            </div>
          )}

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
            {/* Index number */}
            <div className="self-start">
              <span className="text-[10px] tracking-widest opacity-60 mix-blend-difference text-white">
                <CipherText text={String(index + 1).padStart(3, '0')} />
              </span>
            </div>

            {/* Title and subtitle */}
            <div className="self-end text-right">
              <h3 className="text-sm md:text-lg font-thin tracking-wide mix-blend-difference text-white mb-1">
                <CipherText text={item.title} />
              </h3>
              {item.subtitle && (
                <p className="text-[10px] md:text-xs opacity-70 mix-blend-difference text-white">
                  <CipherText text={item.subtitle} />
                </p>
              )}
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs tracking-widest mb-2">
                <CipherText text="EXPLORE" />
              </p>
              <div className="w-8 h-[1px] bg-black mx-auto" />
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-white/20 mix-blend-difference" />
          <div className="absolute top-2 right-2 w-2 h-2 border-r border-t border-white/20 mix-blend-difference" />
          <div className="absolute bottom-2 left-2 w-2 h-2 border-l border-b border-white/20 mix-blend-difference" />
          <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-white/20 mix-blend-difference" />
        </div>
      ))}
    </div>
  )
}