import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class', // Ou 'media' se preferir
  theme: {
    extend: {
      colors: {
        'brand-pink': {
          light: '#FF7EB4',
          DEFAULT: '#F53D95', // Um rosa vibrante principal
          dark: '#D12778',
          glow: 'rgba(245, 61, 149, 0.4)' // Para efeitos de brilho
        },
        'brand-purple': {
          light: '#A49DFF',
          DEFAULT: '#7065F0',
          dark: '#5048A0',
        },
        'neutral': {
          50: '#F8F9FA',
          100: '#F1F3F5',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#868E96',
          700: '#495057', // Texto secundário em dark mode
          800: '#343A40', // Cards/elementos em dark mode
          900: '#212529', // Fundo principal em dark mode
          950: '#13161A', // Fundo mais escuro ainda
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'custom-light': '0 4px 15px rgba(0, 0, 0, 0.08)',
        'custom-medium': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'custom-heavy': '0 12px 45px rgba(0, 0, 0, 0.18)',
        'pink-glow-soft': '0 0 15px 0px rgba(245, 61, 149, 0.3)',
        'pink-glow-medium': '0 0 25px 5px rgba(245, 61, 149, 0.4)',
        'pink-glow-strong': '0 0 35px 10px rgba(245, 61, 149, 0.5)',
        'inner-glow': 'inset 0 0 10px 0px rgba(245, 61, 149, 0.2)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px 2px var(--tw-shadow-color, rgba(245, 61, 149, 0.4))' },
          '50%': { boxShadow: '0 0 30px 8px var(--tw-shadow-color, rgba(245, 61, 149, 0.6))' },
        },
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      },
      animation: {
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        subtleFloat: 'subtleFloat 4s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
        gradientShift: 'gradientShift 10s ease infinite',
      },
      aspectRatio: {
        '9/16': '9 / 16',
      },
      backgroundImage: {
        'gradient-radial-hero': 'radial-gradient(circle at 50% 0%, rgba(245, 61, 149, 0.15) 0%, transparent 40%)',
        'page-bg-gradient': 'linear-gradient(180deg, #13161A 0%, #212529 30%, #212529 70%, #13161A 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
