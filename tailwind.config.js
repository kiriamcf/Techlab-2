const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.{php,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.yellow,
      },
      fontFamily: {
        sans: ['Inter']
      },
      keyframes: {
        'fade-out-down': {
            'from': {
                opacity: '1',
                transform: 'translateY(0px)'
            },
            'to': {
                opacity: '0',
                transform: 'translateY(10px)'
            },
        },
        'fade-in-up': {
            '0%': {
                opacity: '0',
                transform: 'translateY(10px)'
            },
            '100%': {
                opacity: '1',
                transform: 'translateY(0)'
            },
        },
      },
      animation: {
          'fade-out-down': 'fade-out-down 0.5s ease-out',
          'fade-in-up': 'fade-in-up 0.5s ease-out',
      }
    },
  },
  plugins: [],
}
