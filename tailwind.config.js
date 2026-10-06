/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: { fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], display: ['"Bebas Neue"', 'Impact', 'sans-serif'] } } },
  plugins: [],
};
