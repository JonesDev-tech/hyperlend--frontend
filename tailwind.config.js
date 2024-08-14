/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        lufga: ['Lufga', 'sans-serif'],
      },
      colors: {
        primary: '#050F0D',
        'primary-light': '#071311',
        secondary: '#CAEAE5',
        gray: '#4F4F4F',
        'gray-dark': '#081A16',
        'gray-light': '#D9D9D9',
        grey: '#1A1D1E',
        'grey-light': '#E1E1E1',
        success: '#2DC24E',
        warning:'#FFD542',
      },
      blur: {
        xs: '2px'
      },
    },
  },
  plugins: [],
};
