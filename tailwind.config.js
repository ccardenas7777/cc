/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef2f8',
          100: '#d4dff0',
          200: '#aabfe1',
          300: '#7a97ce',
          400: '#4f71ba',
          500: '#3355a3',
          600: '#264186',
          700: '#1e3069',
          800: '#1a2855',
          900: '#121a3a',
        },
        gold: {
          50: '#fdf8ec',
          100: '#faefd0',
          200: '#f4db9e',
          300: '#edc265',
          400: '#e5a833',
          500: '#c9891a',
          600: '#a86b14',
          700: '#874f12',
          800: '#6b3c13',
          900: '#572f14',
        },
      },
    },
  },
  plugins: [],
}
