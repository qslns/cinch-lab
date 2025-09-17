'use client';

import { useEffect, useState } from 'react';

export default function CrackedBackground() {
  const [cracks, setCracks] = useState<{ path: string; opacity: number }[]>([]);

  useEffect(() => {
    const generateCracks = () => {
      const newCracks = [];
      const numCracks = 8;

      for (let i = 0; i < numCracks; i++) {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;

        let path = `M${startX},${startY}`;
        const segments = Math.floor(Math.random() * 4) + 3;

        for (let j = 0; j < segments; j++) {
          const angle = (Math.random() - 0.5) * Math.PI;
          const length = Math.random() * 30 + 10;
          const endX = startX + Math.cos(angle) * length;
          const endY = startY + Math.sin(angle) * length;

          const controlX = (startX + endX) / 2 + (Math.random() - 0.5) * 15;
          const controlY = (startY + endY) / 2 + (Math.random() - 0.5) * 15;

          path += ` Q${controlX},${controlY} ${endX},${endY}`;
        }

        newCracks.push({
          path,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }

      setCracks(newCracks);
    };

    generateCracks();

    const interval = setInterval(generateCracks, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="crack-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.02"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>

          <linearGradient id="crack-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="black" stopOpacity="0.1" />
            <stop offset="50%" stopColor="black" stopOpacity="0.3" />
            <stop offset="100%" stopColor="black" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <g filter="url(#crack-filter)">
          {cracks.map((crack, index) => (
            <path
              key={index}
              d={crack.path}
              stroke="url(#crack-gradient)"
              strokeWidth="0.15"
              fill="none"
              opacity={crack.opacity}
              strokeLinecap="round"
              className="animate-pulse"
              style={{
                animationDelay: `${index * 0.5}s`,
                animationDuration: `${4 + index}s`,
              }}
            />
          ))}
        </g>

        <rect
          width="100%"
          height="100%"
          fill="none"
          stroke="rgba(0,0,0,0.05)"
          strokeWidth="0.1"
          strokeDasharray="5,10,2,8,3,12"
          className="animate-pulse"
        />
      </svg>

      <div
        className="absolute inset-0"
        style={{
          background: `
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 200px,
              rgba(0,0,0,0.01) 200px,
              rgba(0,0,0,0.01) 201px
            ),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 200px,
              rgba(0,0,0,0.01) 200px,
              rgba(0,0,0,0.01) 201px
            )
          `,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              circle at 20% 80%,
              transparent 0%,
              rgba(0,0,0,0.02) 50%,
              transparent 100%
            ),
            radial-gradient(
              circle at 80% 20%,
              transparent 0%,
              rgba(0,0,0,0.02) 50%,
              transparent 100%
            ),
            radial-gradient(
              circle at 50% 50%,
              transparent 0%,
              rgba(0,0,0,0.01) 100%
            )
          `,
        }}
      />
    </div>
  );
}