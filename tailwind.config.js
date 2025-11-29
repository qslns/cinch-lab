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
        // THE YON - Core Monochrome Palette
        // "Twisted yet harmonious" - Black & White foundation
        'yon-black': '#0A0A0A',
        'yon-charcoal': '#1A1A1A',
        'yon-graphite': '#2D2D2D',
        'yon-steel': '#4A4A4A',
        'yon-grey': '#7A7A7A',
        'yon-silver': '#B0B0B0',
        'yon-platinum': '#D4D4D4',
        'yon-ivory': '#F5F5F0',
        'yon-white': '#FAFAFA',

        // Accent - Warm Taupe (minimal use)
        'yon-accent': '#8B7355',
        'yon-accent-light': '#A89580',

        // Transparent Overlays
        'yon-overlay-dark': 'rgba(10, 10, 10, 0.85)',
        'yon-overlay-light': 'rgba(250, 250, 250, 0.9)',
        'yon-overlay-subtle': 'rgba(10, 10, 10, 0.4)',

        // Legacy support (minimal)
        'void': '#000000',
        'carbon': '#0A0908',
        'paper': '#E8E6E3',
        'snow': '#FAFAF9',
      },
      fontFamily: {
        'sans': ['var(--font-sans)', 'system-ui', 'sans-serif'],
        'serif': ['var(--font-serif)', 'Georgia', 'serif'],
        'mono': ['var(--font-mono)', 'Consolas', 'monospace'],
      },
      fontSize: {
        // THE YON Typography Scale - Extreme contrast
        'hero': ['clamp(4rem, 12vw, 12rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'display': ['clamp(3rem, 8vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'title': ['clamp(2rem, 5vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.01em' }],
        'heading': ['clamp(1.5rem, 3vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'subheading': ['clamp(1.25rem, 2vw, 2rem)', { lineHeight: '1.2' }],
        'body-lg': ['1.25rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'caption': ['0.875rem', { lineHeight: '1.5' }],
        'micro': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
      },
      spacing: {
        // Fibonacci-inspired spacing
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      rotate: {
        // THE YON - Subtle asymmetry rotations
        'subtle': '0.5deg',
        'medium': '1.5deg',
        'strong': '3deg',
        '-subtle': '-0.5deg',
        '-medium': '-1.5deg',
        '-strong': '-3deg',
      },
      borderWidth: {
        '3': '3px',
      },
      aspectRatio: {
        'portrait': '3/4',
        'landscape': '4/3',
        'wide': '16/9',
        'ultrawide': '21/9',
      },
    },
  },
  plugins: [],
}
