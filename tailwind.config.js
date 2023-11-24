/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      main: '#21BFDB',
      sub: '#00273E',
      white: '#fff',
      blcak: '#000',
      lightmain: '#E2FEFF',
    },
    extend: {
      fontFamily: {
        heading: "'Poppins', sans-serif",
        body: "'Raleway', sans-serif"
      }
    },
  },
  plugins: [],
}