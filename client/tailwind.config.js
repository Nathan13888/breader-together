/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: '#F53C44',
        beige: '#FAF5E9',
      },
    },
  },
  plugins: [],
}
