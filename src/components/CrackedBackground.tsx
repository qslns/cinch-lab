'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function CrackedBackground() {
  const pathname = usePathname();
  const [cracks, setCracks] = useState<{
    path: string;
    opacity: number;
    strokeWidth: number;
    type: 'major' | 'minor' | 'micro';
  }[]>([]);

  useEffect(() => {
    const generatePageSpecificCracks = () => {
      const pageCrackConfigs: { [key: string]: any } = {
        '/': { // Home - dramatic diagonal cracks
          majorCracks: 3,
          minorCracks: 5,
          microCracks: 8,
          seed: 1,
          style: 'diagonal'
        },
        '/lab': { // Lab - technical grid-like cracks
          majorCracks: 2,
          minorCracks: 6,
          microCracks: 10,
          seed: 2,
          style: 'grid'
        },
        '/collections': { // Collections - radial cracks from center
          majorCracks: 4,
          minorCracks: 4,
          microCracks: 6,
          seed: 3,
          style: 'radial'
        },
        '/archive': { // Archive - horizontal emphasis
          majorCracks: 2,
          minorCracks: 7,
          microCracks: 9,
          seed: 4,
          style: 'horizontal'
        },
        '/about': { // About - organic curved cracks
          majorCracks: 3,
          minorCracks: 4,
          microCracks: 7,
          seed: 5,
          style: 'organic'
        },
        '/contact': { // Contact - minimal vertical cracks
          majorCracks: 2,
          minorCracks: 5,
          microCracks: 8,
          seed: 6,
          style: 'vertical'
        }
      };

      const config = pageCrackConfigs[pathname] || pageCrackConfigs['/'];
      const newCracks = [];

      // Seeded random for consistency per page
      const seededRandom = (seed: number) => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
      };

      let seed = config.seed;

      // Generate major cracks (most visible)
      for (let i = 0; i < config.majorCracks; i++) {
        let path = '';

        if (config.style === 'diagonal') {
          const startX = seededRandom(seed++) * 100;
          const startY = seededRandom(seed++) * 30;
          const endX = seededRandom(seed++) * 100;
          const endY = 70 + seededRandom(seed++) * 30;

          path = `M${startX},${startY} L${endX},${endY}`;

          // Add branches
          for (let j = 0; j < 2; j++) {
            const branchX = startX + (endX - startX) * seededRandom(seed++);
            const branchY = startY + (endY - startY) * seededRandom(seed++);
            const branchEndX = branchX + (seededRandom(seed++) - 0.5) * 20;
            const branchEndY = branchY + (seededRandom(seed++) - 0.5) * 20;
            path += ` M${branchX},${branchY} L${branchEndX},${branchEndY}`;
          }
        } else if (config.style === 'grid') {
          const isVertical = seededRandom(seed++) > 0.5;
          if (isVertical) {
            const x = seededRandom(seed++) * 100;
            path = `M${x},0 L${x},100`;
          } else {
            const y = seededRandom(seed++) * 100;
            path = `M0,${y} L100,${y}`;
          }
        } else if (config.style === 'radial') {
          const centerX = 50;
          const centerY = 50;
          const angle = seededRandom(seed++) * Math.PI * 2;
          const length = 30 + seededRandom(seed++) * 40;
          const endX = centerX + Math.cos(angle) * length;
          const endY = centerY + Math.sin(angle) * length;
          path = `M${centerX},${centerY} L${endX},${endY}`;
        } else if (config.style === 'horizontal') {
          const y = seededRandom(seed++) * 100;
          const startX = seededRandom(seed++) * 30;
          const endX = 70 + seededRandom(seed++) * 30;
          path = `M${startX},${y} L${endX},${y}`;
        } else if (config.style === 'vertical') {
          const x = seededRandom(seed++) * 100;
          const startY = seededRandom(seed++) * 30;
          const endY = 70 + seededRandom(seed++) * 30;
          path = `M${x},${startY} L${x},${endY}`;
        } else if (config.style === 'organic') {
          const startX = seededRandom(seed++) * 100;
          const startY = seededRandom(seed++) * 100;
          const cp1X = seededRandom(seed++) * 100;
          const cp1Y = seededRandom(seed++) * 100;
          const cp2X = seededRandom(seed++) * 100;
          const cp2Y = seededRandom(seed++) * 100;
          const endX = seededRandom(seed++) * 100;
          const endY = seededRandom(seed++) * 100;
          path = `M${startX},${startY} C${cp1X},${cp1Y} ${cp2X},${cp2Y} ${endX},${endY}`;
        }

        newCracks.push({
          path,
          opacity: 0.15 + seededRandom(seed++) * 0.1,
          strokeWidth: 0.8 + seededRandom(seed++) * 0.7,
          type: 'major' as const
        });
      }

      // Generate minor cracks
      for (let i = 0; i < config.minorCracks; i++) {
        const startX = seededRandom(seed++) * 100;
        const startY = seededRandom(seed++) * 100;
        const endX = startX + (seededRandom(seed++) - 0.5) * 30;
        const endY = startY + (seededRandom(seed++) - 0.5) * 30;

        const path = `M${startX},${startY} L${endX},${endY}`;

        newCracks.push({
          path,
          opacity: 0.08 + seededRandom(seed++) * 0.05,
          strokeWidth: 0.3 + seededRandom(seed++) * 0.3,
          type: 'minor' as const
        });
      }

      // Generate micro cracks
      for (let i = 0; i < config.microCracks; i++) {
        const startX = seededRandom(seed++) * 100;
        const startY = seededRandom(seed++) * 100;
        const endX = startX + (seededRandom(seed++) - 0.5) * 15;
        const endY = startY + (seededRandom(seed++) - 0.5) * 15;

        const path = `M${startX},${startY} L${endX},${endY}`;

        newCracks.push({
          path,
          opacity: 0.03 + seededRandom(seed++) * 0.03,
          strokeWidth: 0.1 + seededRandom(seed++) * 0.2,
          type: 'micro' as const
        });
      }

      setCracks(newCracks);
    };

    generatePageSpecificCracks();
  }, [pathname]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <filter id="crack-roughness" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.5"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="0.5"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        {/* Render cracks by type for layering */}
        {['major', 'minor', 'micro'].map(type => (
          <g key={type}>
            {cracks.filter(c => c.type === type).map((crack, index) => (
              <path
                key={`${type}-${index}`}
                d={crack.path}
                stroke={`rgba(0, 0, 0, ${crack.opacity})`}
                strokeWidth={crack.strokeWidth}
                fill="none"
                strokeLinecap="round"
                filter={type === 'major' ? 'url(#crack-roughness)' : undefined}
                className={type === 'major' ? 'animate-pulse' : ''}
                style={type === 'major' ? {
                  animationDuration: `${4 + index * 2}s`,
                  animationDelay: `${index * 0.5}s`,
                } : {}}
              />
            ))}
          </g>
        ))}

        {/* Additional texture overlay */}
        <rect
          width="100%"
          height="100%"
          fill="none"
          stroke="rgba(0,0,0,0.02)"
          strokeWidth="0.05"
          strokeDasharray="2,4,1,3"
        />
      </svg>

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' /%3E%3C/svg%3E")`,
          mixBlendMode: 'multiply'
        }}
      />
    </div>
  );
}