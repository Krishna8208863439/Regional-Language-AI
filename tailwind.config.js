/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        indic: {
          dark: '#0b0f19',
          card: '#131b2e',
          cardLight: '#1e293b',
          accent: '#6366f1',
          teal: '#14b8a6',
          gold: '#eab308',
          emerald: '#10b981',
          crimson: '#f43f5e'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        indic: ['"Noto Sans"', '"Outfit"', 'sans-serif']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'wave': 'wave 1.5s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(0.4)' },
          '50%': { transform: 'scaleY(1.0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(249, 115, 22, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(249, 115, 22, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
