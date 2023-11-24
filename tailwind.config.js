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
      darkgray: '#747474',
    },
    extend: {
      fontFamily: {
        heading: "'Poppins', sans-serif",
        body: "'Montserrat', sans-serif"
      }
    },
  },
  plugins: [require("daisyui")],
}