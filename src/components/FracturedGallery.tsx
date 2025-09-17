'use client';

import { useState, useEffect } from 'react';
import FracturedFrame from './FracturedFrame';
import imagesData from '@/data/images.json';

interface GalleryImage {
  src: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rotation: number;
  cracks: number;
  position: { x: number; y: number };
}

export default function FracturedGallery() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [visibleCount, setVisibleCount] = useState(20); // Start with fewer images

  useEffect(() => {
    const sizes: ('xs' | 'sm' | 'md' | 'lg' | 'xl')[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    const processedImages: GalleryImage[] = [];

    const columns = 12;
    const rowHeight = 250;
    const padding = 20;

    // Use only first 300 images for better performance
    const limitedImages = imagesData.slice(0, 300);
    limitedImages.forEach((src, index) => {
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const column = index % columns;
      const row = Math.floor(index / columns);

      const baseX = (column * (window.innerWidth / columns));
      const baseY = row * rowHeight;

      const offsetX = (Math.random() - 0.5) * 100;
      const offsetY = (Math.random() - 0.5) * 80;

      processedImages.push({
        src: src as string,
        size,
        rotation: (Math.random() - 0.5) * 25,
        cracks: Math.floor(Math.random() * 4) + 2,
        position: {
          x: baseX + offsetX + padding,
          y: baseY + offsetY + padding,
        }
      });
    });

    const shuffled = processedImages.sort(() => Math.random() - 0.5);
    setGalleryImages(shuffled);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;

      if (scrollPercentage > 0.7 && visibleCount < galleryImages.length) {
        setVisibleCount(prev => Math.min(prev + 15, galleryImages.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleCount, galleryImages.length]);

  const maxY = Math.max(...galleryImages.map(img => img.position.y)) + 400;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        minHeight: `${maxY}px`,
        background: `
          radial-gradient(ellipse at center top, transparent 0%, rgba(0,0,0,0.02) 100%),
          linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.01) 100%)
        `
      }}
    >
      <div className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full opacity-5">
          <defs>
            <pattern
              id="fractured-pattern"
              x="0"
              y="0"
              width="200"
              height="200"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0,100 L50,120 L100,80 L150,110 L200,90"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
              />
              <path
                d="M100,0 L120,50 L80,100 L110,150 L90,200"
                stroke="currentColor"
                strokeWidth="0.5"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#fractured-pattern)" />
        </svg>
      </div>

      <div className="relative">
        {galleryImages.slice(0, visibleCount).map((img, index) => (
          <FracturedFrame
            key={`${img.src}-${index}`}
            src={img.src}
            size={img.size}
            rotation={img.rotation}
            cracks={img.cracks}
            position={img.position}
            delay={Math.min(index * 0.01, 1)} // Cap delay at 1 second
          />
        ))}
      </div>

      {visibleCount < galleryImages.length && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="text-sm text-zinc-500 animate-pulse">
            Scroll for more...
          </div>
        </div>
      )}
    </div>
  );
}