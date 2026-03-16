/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#f97316',
          DEFAULT: '#ea580c',
          dark: '#c2410c',
        },
        secondary: '#0f172a',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
