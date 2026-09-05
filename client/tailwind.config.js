/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          50: '#f2f9f3',
          100: '#e1f2e4',
          200: '#c5e5cc',
          300: '#99d2a6',
          400: '#67b77b',
          500: '#439c59',
          600: '#327f46',
          700: '#29653a',
          800: '#245131',
          900: '#1e432a',
          950: '#0c2515',
        },
        earth: {
          50: '#fbf8f3',
          100: '#f5efe4',
          200: '#eadcc9',
          300: '#dbc1a5',
          400: '#caa37f',
          500: '#bc8a63',
          600: '#a77150',
          700: '#875841',
          800: '#704838',
          900: '#5e3d31',
        },
        sun: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
