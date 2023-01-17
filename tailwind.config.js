/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
require('dotenv').config()
module.exports = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [],
  // plugins: [
  //   require('@tailwindcss/typography'),
  //   // ...
  // ],
});
