/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brown: {
            50: '#f8f1e9',
            200: '#d2b48c',
            700: '#8b4513',
            800: '#5d3a1a',
        },
    },
    },
  },
  plugins: [],
}

