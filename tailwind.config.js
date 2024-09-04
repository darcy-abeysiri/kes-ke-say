/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './client/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        "frenchWhite": "#dcd8d6",
        "frenchBlue": "#364da1",
        "frenchRed": "#4f0404",
        "frenchCharcoal": "#333333",
      }
    },
  },
  plugins: [],
}