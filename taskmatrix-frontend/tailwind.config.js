/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },

      colors: {
        primary: "#2563EB",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
    },
  },

  plugins: [],
}