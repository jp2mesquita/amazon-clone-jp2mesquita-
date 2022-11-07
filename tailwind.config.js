/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      colors:{
        amazon_blue:{
          light: '#232F3E',
          DEFAULT: '#121921'
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
