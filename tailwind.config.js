/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      main: '#16CCF5',
      sub: '#000B1A',
      third: '#001751',
      white: '#fff',
      black: '#000',
      lightmain: '#E2FEFF',
      darkgray: '#747474',
      lightgray: '#dbdbdb'
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