// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#CCED60',
      secondary: '#142644',
      green: '#1DD197',
      black: '#242323',
      white: '#FFFFFF',
      gray: colors.neutral[300],
      'gray-medium': '#A9A9A9',
      current: 'currentColor',
      transparent: 'transparent',
      // to be replaced
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      blue: colors.blue
    },
    fontFamily: {
      libre: ['Libre Baskerville', 'sans-serif'],
      quicksand: ['Quicksand', 'sans-serif']
    },
    extend: {
      screens: {
        '3xl': '1920px',
        '4xl': '2560px'
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
