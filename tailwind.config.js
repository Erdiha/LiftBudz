/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
require('dotenv').config();
module.exports = withMT({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    boxShadow: {
      sm: '0 2px 4px 0 rgb(0 0 0 / 0.05)',

      // rest of the box shadow values
    },
    extend: {
      fontFamily: {
        sans: [
          '"Inter"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover', 'chatBubble-hover'],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
  // plugins: [
  //   require('@tailwindcss/typography'),
  //   // ...
  // ],
});
