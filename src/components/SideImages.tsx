'use client';

import { useEffect, useState } from 'react';
import FracturedFrame from './FracturedFrame';
import imagesData from '@/data/images.json';

interface SideImagesProps {
  page: string;
}

export default function SideImages({ page }: SideImagesProps) {
  const [sideImages, setSideImages] = useState<{
    images: Array<{
      src: string;
      position: { x: number; y: number };
      side: 'left' | 'right';
      size: 'xs' | 'sm';
      rotation: number;
      cracks: number;
    }>;
  }>({ images: [] });

  useEffect(() => {
    const pageImageMap: { [key: string]: { start: number; count: number } } = {
      home: { start: 400, count: 12 },
      lab: { start: 412, count: 10 },
      collections: { start: 422, count: 10 },
      archive: { start: 432, count: 10 },
      about: { start: 442, count: 10 },
      contact: { start: 452, count: 10 },
    };

    const config = pageImageMap[page] || { start: 400, count: 10 };
    const selectedImages = imagesData.slice(config.start, config.start + config.count);

    const processedImages = selectedImages.map((src, index) => {
      const isLeft = Math.random() > 0.5;
      const sizes: ('xs' | 'sm')[] = ['xs', 'xs', 'sm']; // More xs than sm

      // Different position ranges for each page
      const pageOffsets: { [key: string]: number } = {
        home: 0,
        lab: 100,
        collections: 200,
        archive: 50,
        about: 150,
        contact: 250,
      };

      const baseOffset = pageOffsets[page] || 0;

      return {
        src: src as string,
        position: {
          x: isLeft
            ? 20 + Math.random() * 100
            : window.innerWidth - 120 - Math.random() * 100,
          y: 100 + baseOffset + index * 150 + (Math.random() - 0.5) * 100,
        },
        side: isLeft ? 'left' : 'right' as 'left' | 'right',
        size: sizes[Math.floor(Math.random() * sizes.length)],
        rotation: (Math.random() - 0.5) * 45,
        cracks: Math.floor(Math.random() * 4) + 2,
      };
    });

    setSideImages({ images: processedImages });
  }, [page]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {sideImages.images.map((img, index) => (
        <div
          key={`${img.src}-${index}`}
          className="absolute pointer-events-auto"
          style={{
            left: `${img.position.x}px`,
            top: `${img.position.y}px`,
          }}
        >
          <FracturedFrame
            src={img.src}
            size={img.size}
            rotation={img.rotation}
            cracks={img.cracks}
            delay={index * 0.05}
            className="opacity-80 hover:opacity-100 transition-opacity"
          />
        </div>
      ))}
    </div>
  );
}