/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fefdf7',
          100: '#fdf9e3',
          200: '#fbf0b8',
          300: '#f8e47a',
          400: '#f4d03f',
          500: '#D4AF37',
          600: '#b8962e',
          700: '#9a7a24',
          800: '#7d621c',
          900: '#654f16',
        },
        cream: {
          50: '#fefefe',
          100: '#F5F0E8',
          200: '#EDE4D3',
          300: '#DDD0B8',
          400: '#C9B99A',
        },
        charcoal: {
          800: '#1a1a1a',
          900: '#0d0d0d',
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        'ultra-wide': '0.35em',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
