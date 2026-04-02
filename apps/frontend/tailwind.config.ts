import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: '#0A0A0A',
        foreground: '#F5F5F5',
        card: {
          DEFAULT: '#121212',
          foreground: '#F5F5F5',
        },
        popover: {
          DEFAULT: '#121212',
          foreground: '#F5F5F5',
        },
        primary: {
          DEFAULT: '#8A2BE2', // Electric Violet
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#00F0FF', // Neon Cyan
          foreground: '#0A0A0A',
        },
        muted: {
          DEFAULT: '#1E1E1E',
          foreground: '#A1A1AA',
        },
        accent: {
          DEFAULT: '#2A2A2A',
          foreground: '#FFFFFF',
        },
        destructive: {
          DEFAULT: '#FF3B3B',
          foreground: '#F5F5F5',
        },
        border: 'rgba(255, 255, 255, 0.1)',
        input: 'rgba(255, 255, 255, 0.05)',
        ring: '#8A2BE2',
      },
      boxShadow: {
        'glow-primary': '0 0 15px rgba(138, 43, 226, 0.5)',
        'glow-primary-lg': '0 0 30px rgba(138, 43, 226, 0.6)',
        'glow-secondary': '0 0 15px rgba(0, 240, 255, 0.5)',
        'glow-secondary-lg': '0 0 30px rgba(0, 240, 255, 0.6)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
