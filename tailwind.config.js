// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      green: '#1DD197',
      black: '#242323',
      white: '#FFFFFF',
      gray: colors.neutral[300],
      'gray-medium': '#A9A9A9',
      'gray-dark': '#4A4A4A',
      current: 'currentColor',
      transparent: 'transparent',
      red: colors.rose
    },

    extend: {
      screens: {
        '3xl': '1920px',
        '4xl': '2560px'
      },
      fontFamily: {
        libre: ['Libre Baskerville', 'LocalLibreBaskerville', 'sans-serif'],
        quicksand: ['Quicksand', 'LocalQuicksand', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {
      fontWeight: ['hover', 'focus']
    }
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@headlessui/tailwindcss')]
};
