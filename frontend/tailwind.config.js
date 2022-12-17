/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
         primary:'#031a40',
         secondary:'#facc15'
      }
    },
  },
  plugins: [],
}