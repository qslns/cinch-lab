'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import OptimizedFracturedFrame from './OptimizedFracturedFrame';
import imagesData from '@/data/images.json';

interface GalleryImage {
  src: string;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rotation: number;
  cracks: number;
  position: { x: number; y: number };
}

export default function OptimizedFracturedGallery() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [visibleImages, setVisibleImages] = useState<Set<number>>(new Set());
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  // Calculate dimensions based on window size
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Initialize gallery images with ALL 475 images
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const sizes: ('xs' | 'sm' | 'md' | 'lg' | 'xl')[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    const processedImages: GalleryImage[] = [];

    const columns = Math.floor(dimensions.width / 150); // Dynamic columns based on width
    const rowHeight = 200;
    const padding = 40;

    // Use ALL images from the data
    imagesData.forEach((src, index) => {
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const column = index % columns;
      const row = Math.floor(index / columns);

      // Create a scattered, asymmetric layout
      const baseX = (column * (dimensions.width / columns));
      const baseY = row * rowHeight;

      // Add randomness for asymmetric effect
      const offsetX = (Math.random() - 0.5) * 80;
      const offsetY = (Math.random() - 0.5) * 60;

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

    // Shuffle for random appearance
    const shuffled = [...processedImages].sort(() => Math.random() - 0.5);
    setGalleryImages(shuffled);

    // Initially show first 30 images
    const initial = new Set<number>();
    for (let i = 0; i < Math.min(30, shuffled.length); i++) {
      initial.add(i);
    }
    setVisibleImages(initial);
  }, [dimensions.width]);

  // Implement viewport-based lazy loading
  useEffect(() => {
    if (!containerRef.current || galleryImages.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '200px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          setVisibleImages(prev => new Set(prev).add(index));
        }
      });
    }, observerOptions);

    // Create placeholder elements for observation
    const placeholders = containerRef.current.querySelectorAll('.image-placeholder');
    placeholders.forEach(placeholder => observer.observe(placeholder));

    return () => observer.disconnect();
  }, [galleryImages]);

  // Progressive loading on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const containerTop = containerRef.current.offsetTop;

      // Calculate which images should be visible based on scroll position
      const visibleRange = {
        top: scrollTop - containerTop - 500, // Load 500px before visible
        bottom: scrollTop + windowHeight - containerTop + 500, // Load 500px after visible
      };

      const newVisible = new Set(visibleImages);

      galleryImages.forEach((img, index) => {
        if (img.position.y >= visibleRange.top && img.position.y <= visibleRange.bottom) {
          newVisible.add(index);
        }
      });

      if (newVisible.size > visibleImages.size) {
        setVisibleImages(newVisible);
      }
    };

    // Throttle scroll event
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 50);
    };

    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [galleryImages, visibleImages]);

  const maxY = Math.max(...galleryImages.map(img => img.position.y)) + 400;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: `${maxY}px`,
        background: `
          radial-gradient(ellipse at center top, transparent 0%, rgba(0,0,0,0.02) 100%),
          linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.01) 100%)
        `
      }}
    >
      {/* Background pattern */}
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

      {/* Render all image placeholders and actual images */}
      <div className="relative">
        {galleryImages.map((img, index) => (
          <div
            key={`${img.src}-${index}`}
            className="image-placeholder"
            data-index={index}
            style={{
              position: 'absolute',
              left: `${img.position.x}px`,
              top: `${img.position.y}px`,
              width: '1px',
              height: '1px',
            }}
          >
            {visibleImages.has(index) && (
              <OptimizedFracturedFrame
                src={img.src}
                size={img.size}
                rotation={img.rotation}
                cracks={img.cracks}
                delay={0} // No delay for lazy loaded images
                priority={index < 10} // First 10 images get priority
                index={index}
              />
            )}
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      {visibleImages.size < galleryImages.length && (
        <div className="fixed bottom-10 right-10 bg-white/90 px-4 py-2 rounded-full shadow-lg z-50">
          <div className="text-sm text-zinc-600">
            {visibleImages.size} / {galleryImages.length} images loaded
          </div>
        </div>
      )}
    </div>
  );
}