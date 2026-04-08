/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0b0f1a',
          light: '#141824',
        },
        // Primary dark — used for text, headings, buttons
        navy: {
          DEFAULT: '#1a2035',
          light: '#2c3a5e',
          bright: '#1a2035',
        },
        // UVA orange — the single brand accent color (from icon.svg)
        orange: {
          DEFAULT: '#FF9900',
          dark: '#e08200',
          light: '#ffb340',
        },
        // UVA blue — only used in the particle network background, not in UI
        'uva-blue': '#4986E8',
        // aliases kept so existing classes still compile
        cyan:        { DEFAULT: '#1a2035', dark: '#111827' },
        'brand-cyan':{ DEFAULT: '#1a2035', dark: '#111827' },
        gold:        { DEFAULT: '#FF9900', dark: '#e08200' },
        surface: {
          DEFAULT: '#ffffff',
          light: '#f5f6fa',
          subtle: '#edf0f7',
        },
        txt: {
          DEFAULT: '#111827',
          secondary: '#4b5568',
          muted: '#9ca3af',
        },
        line: '#e5e9f2',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Manrope', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px rgba(0,0,0,0.06)',
        card: '0 4px 16px rgba(0,0,0,0.08)',
        elevated: '0 8px 32px rgba(0,0,0,0.1)',
        hover: '0 12px 40px rgba(0,0,0,0.12)',
      },
      borderRadius: {
        lg: '16px',
        md: '10px',
        sm: '6px',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
        spin: 'spin 0.8s linear infinite',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
