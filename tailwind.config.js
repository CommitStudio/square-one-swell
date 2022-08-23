module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#cced60',
      secondary: '#142644',
      green: '#38c385',
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      'white-soft': '#FFFFFF33',
      black: '#101010',
      'black-medium': '#10101099',
      'black-medium-soft': '#10101066',
      'black-soft': '#1010101F',
      grey: '#EFEFEF'
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
  plugins: [require('@tailwindcss/line-clamp')]
};
