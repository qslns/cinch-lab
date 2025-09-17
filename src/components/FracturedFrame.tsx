'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface FracturedFrameProps {
  src: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rotation?: number;
  cracks?: number;
  position?: { x: number; y: number };
  delay?: number;
  className?: string;
}

const sizeMap = {
  xs: { width: 80, height: 100 },
  sm: { width: 120, height: 150 },
  md: { width: 180, height: 220 },
  lg: { width: 240, height: 300 },
  xl: { width: 320, height: 400 },
};

export default function FracturedFrame({
  src,
  alt = '',
  size = 'md',
  rotation = 0,
  cracks = 3,
  position,
  delay = 0,
  className = '',
}: FracturedFrameProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [crackPaths, setCrackPaths] = useState<string[]>([]);
  const dimensions = sizeMap[size];

  useEffect(() => {
    const paths = [];
    for (let i = 0; i < cracks; i++) {
      const startX = Math.random() * dimensions.width;
      const startY = Math.random() * dimensions.height;
      const endX = Math.random() * dimensions.width;
      const endY = Math.random() * dimensions.height;
      const midX = (startX + endX) / 2 + (Math.random() - 0.5) * 30;
      const midY = (startY + endY) / 2 + (Math.random() - 0.5) * 30;

      paths.push(
        `M${startX},${startY} Q${midX},${midY} ${endX},${endY}`
      );
    }
    setCrackPaths(paths);
  }, [cracks, dimensions.width, dimensions.height]);

  const randomRotation = rotation + (Math.random() - 0.5) * 10;
  const randomSkew = (Math.random() - 0.5) * 8;

  return (
    <motion.div
      className={`relative fractured-frame ${className}`}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        ...(position && {
          position: 'absolute',
          left: position.x,
          top: position.y,
        }),
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: randomRotation,
      }}
      transition={{
        delay,
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      whileHover={{
        scale: 1.05,
        rotate: randomRotation + 2,
        transition: { duration: 0.3 }
      }}
    >
      <div
        className="relative w-full h-full overflow-hidden"
        style={{
          transform: `skew(${randomSkew}deg)`,
          filter: 'contrast(1.1) brightness(0.95)',
        }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-zinc-900/5 to-transparent pointer-events-none z-10"
          style={{
            mixBlendMode: 'multiply',
          }}
        />

        <Image
          src={`/images/gallery/${src}`}
          alt={alt}
          fill
          sizes={`${dimensions.width}px`}
          className="object-cover"
          onLoad={() => setIsLoaded(true)}
          quality={85}
          loading="lazy"
        />

        {isLoaded && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-20"
            style={{ mixBlendMode: 'overlay' }}
          >
            <defs>
              <filter id={`roughPaper-${src}`}>
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.04"
                  numOctaves="5"
                  result="noise"
                />
                <feDiffuseLighting
                  in="noise"
                  lightingColor="white"
                  surfaceScale="1"
                >
                  <feDistantLight azimuth="45" elevation="60" />
                </feDiffuseLighting>
              </filter>
            </defs>

            {crackPaths.map((path, i) => (
              <path
                key={i}
                d={path}
                stroke="rgba(0,0,0,0.3)"
                strokeWidth={Math.random() * 2 + 0.5}
                fill="none"
                strokeLinecap="round"
                style={{
                  filter: 'blur(0.5px)',
                }}
              />
            ))}
          </svg>
        )}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              repeating-linear-gradient(
                ${45 + randomSkew}deg,
                transparent,
                transparent 10px,
                rgba(0,0,0,0.03) 10px,
                rgba(0,0,0,0.03) 11px
              )
            `,
          }}
        />
      </div>

      <div
        className="absolute -inset-2 border border-zinc-200/20"
        style={{
          clipPath: `polygon(
            ${2 + Math.random() * 5}% 0%,
            ${95 + Math.random() * 5}% ${Math.random() * 3}%,
            ${98 + Math.random() * 2}% ${97 + Math.random() * 3}%,
            ${Math.random() * 5}% ${95 + Math.random() * 5}%
          )`,
        }}
      />
    </motion.div>
  );
}