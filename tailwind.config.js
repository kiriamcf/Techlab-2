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
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
