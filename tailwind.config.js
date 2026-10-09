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
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#243B53',
          900: '#14213D', // specified Navy Blue
          950: '#0B1324',
        },
        royal: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB', // specified Royal Blue
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        emerald: {
          500: '#10B981', // specified Emerald Green
          600: '#059669',
        },
        slate: {
          850: '#151F30',
          900: '#0F172A',
          950: '#090D16',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'premium': '0 4px 20px -2px rgba(20, 33, 61, 0.08), 0 2px 6px -1px rgba(20, 33, 61, 0.04)',
        'elevated': '0 10px 25px -5px rgba(20, 33, 61, 0.12), 0 8px 10px -6px rgba(20, 33, 61, 0.06)',
      }
    },
  },
  plugins: [],
}
