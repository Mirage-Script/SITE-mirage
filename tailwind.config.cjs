const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./public/index.html', './src/**/*.{ts,tsx,js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0F3A66',
        secondary: '#5A6B7D',
        accent: '#4A7BA7',
        neutral: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5F5',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A'
        }
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        heading: ['Orbitron', ...defaultTheme.fontFamily.sans]
      },
      boxShadow: {
        subtle: '0 12px 30px -12px rgba(15, 58, 102, 0.35)'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        glow: {
          '0%, 100%': { opacity: 0.35 },
          '50%': { opacity: 0.8 }
        }
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        float: 'float 8s ease-in-out infinite',
        'pulse-glow': 'glow 6s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
