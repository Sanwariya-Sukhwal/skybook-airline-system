/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        sky: {
          950: "#020d1a",
          900: "#041628",
          800: "#062040",
          700: "#0a3060",
        },
        gold: {
          400: "#f5c842",
          500: "#e6b800",
          600: "#c9a000",
        },
      },
    },
  },
  plugins: [],
}
