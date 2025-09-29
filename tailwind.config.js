/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Monochrome Foundation
        'void': '#000000',
        'carbon': '#0A0908',
        'graphite': '#1A1918',
        'concrete': '#2E2C2B',
        'steel': '#4A4745',
        'aluminum': '#6B6866',
        'titanium': '#8E8B89',
        'platinum': '#B5B2B0',
        'silver': '#C9C7C5',
        'paper': '#E8E6E3',
        'raw-canvas': '#F7F5F2',
        'snow': '#FAFAF9',

        // Margiela Material
        'tabi-brown': '#4A3426',
        'stitch-white': '#FFFEF9',
        'raw-edge': '#D4D0C9',
        'exposed-seam': '#9B9691',
        'muslin': '#F0EBE3',
        'linen': '#E3DED8',
        'cotton': '#EDEAE6',
        'wool': '#D8D4CF',

        // Sacai Hybrid
        'splice-orange': '#E85D2C',
        'burnt-orange': '#CC5500',
        'layer-navy': '#1F2937',
        'deep-navy': '#0F172A',
        'hybrid-khaki': '#7C7053',
        'olive': '#556B2F',
        'contrast-olive': '#3D4F2F',
        'forest-green': '#2C4F33',

        // Laboratory Signals
        'specimen-red': '#C41E3A',
        'chemical-blue': '#0047AB',
        'petri-blue': '#4A90E2',
        'reaction-green': '#00A86B',
        'caution-amber': '#FFBF00',
        'warning-orange': '#FF6B35',

        // Subtle Accents
        'warm-beige': '#D7CCC8',
        'cool-grey': '#B0BEC5',
        'soft-taupe': '#A89F91',
        'dust-rose': '#C9ADA7',
        'sage': '#9CAF88',
        'clay': '#B7856A',

        // Legacy (keeping for compatibility)
        'off-black': '#0a0a0a',
        'carbon-black': '#1C1C1C',
        'concrete-gray': '#8C8C8C',
        'paper-white': '#FAFAFA',
        'safety-orange': '#FF6B35',
        'centrifuge-blue': '#0066CC',
        'petri-pink': '#FFB6C1',
        'warning-yellow': '#FFD700',
        'hazmat-green': '#00FF41',
        'glitch-red': '#FF0000',
        'glitch-cyan': '#00FFFF',
        'glitch-magenta': '#FF00FF',
        'error-green': '#00FF00',
      },
      animation: {
        'glitch': 'glitch 2s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 30s linear infinite',
        'flicker': 'flicker 0.5s infinite',
        'scan': 'scan 8s linear infinite',
        'distort': 'distort 0.3s infinite',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderWidth: {
        '3': '3px',
      },
      fontFamily: {
        'helvetica': ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}