/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
      colors: {
        cream:    '#F7F4EF',
        charcoal: '#1C1C1C',
        muted:    '#8A8580',
        accent:   '#C8A96E',
        border:   '#E2DDD6',
      },
    },
  },
  plugins: [],
}