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