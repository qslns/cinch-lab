'use client';

import { useEffect, useState } from 'react';
import FracturedFrame from './FracturedFrame';
import imagesData from '@/data/images.json';

interface SideImagesProps {
  page: string;
}

export default function SideImages({ page }: SideImagesProps) {
  const [sideImages, setSideImages] = useState<{
    left: string[];
    right: string[];
  }>({ left: [], right: [] });

  useEffect(() => {
    const pageImageMap: { [key: string]: { start: number; count: number } } = {
      home: { start: 400, count: 8 },
      lab: { start: 408, count: 6 },
      collections: { start: 414, count: 6 },
      archive: { start: 420, count: 6 },
      about: { start: 426, count: 6 },
      contact: { start: 432, count: 6 },
    };

    const config = pageImageMap[page] || { start: 400, count: 6 };
    const selectedImages = imagesData.slice(config.start, config.start + config.count);

    const shuffled = [...selectedImages].sort(() => Math.random() - 0.5);
    const midpoint = Math.ceil(shuffled.length / 2);

    setSideImages({
      left: shuffled.slice(0, midpoint) as string[],
      right: shuffled.slice(midpoint) as string[],
    });
  }, [page]);

  const sizes: ('xs' | 'sm' | 'md')[] = ['xs', 'sm', 'md'];

  return (
    <>
      <div className="fixed left-0 top-0 h-full pointer-events-none z-10">
        <div className="relative h-full">
          {sideImages.left.map((src, index) => {
            const size = sizes[Math.floor(Math.random() * sizes.length)];
            const yPosition = 150 + index * 180 + (Math.random() - 0.5) * 60;
            const xPosition = -20 + (Math.random() * 40);

            return (
              <div
                key={src}
                className="absolute pointer-events-auto"
                style={{
                  top: `${yPosition}px`,
                  left: `${xPosition}px`,
                }}
              >
                <FracturedFrame
                  src={src}
                  size={size}
                  rotation={(Math.random() - 0.5) * 30}
                  cracks={Math.floor(Math.random() * 3) + 2}
                  delay={index * 0.1}
                  className="opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="fixed right-0 top-0 h-full pointer-events-none z-10">
        <div className="relative h-full">
          {sideImages.right.map((src, index) => {
            const size = sizes[Math.floor(Math.random() * sizes.length)];
            const yPosition = 200 + index * 190 + (Math.random() - 0.5) * 50;
            const xPosition = -60 + (Math.random() * 40);

            return (
              <div
                key={src}
                className="absolute pointer-events-auto"
                style={{
                  top: `${yPosition}px`,
                  right: `${xPosition}px`,
                }}
              >
                <FracturedFrame
                  src={src}
                  size={size}
                  rotation={(Math.random() - 0.5) * 30}
                  cracks={Math.floor(Math.random() * 3) + 2}
                  delay={index * 0.1 + 0.5}
                  className="opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}