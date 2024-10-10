/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js}", "./node_modules/daisyui/dist/**/*.js"],
  theme: {
    extend: { },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
} 