/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        ink: '#0b0b0d',
        bone: '#f5f1ea',
        gold: '#c8a96a',
      },
    },
  },
  plugins: [],
};
