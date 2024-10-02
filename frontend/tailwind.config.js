/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6852",
        secondary: "#F5D7B8",
        lightGray: "#D9D9D9",
        darkGray: "#7F7F7F"
      },
      fontFamily: {
        bungee: ["Bungee", "sans-serif"],
        interLight: ["Inter-Light", "sans-serif"],
        interRegular: ["Inter-Regular", "sans-serif"]
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0px',
        '1': '1px',
        '0.5': '0.5px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      }
    },
  },
  plugins: [],
}

