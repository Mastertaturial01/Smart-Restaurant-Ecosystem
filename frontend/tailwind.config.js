/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        'sm': '375px',
        'md': '425px',
        'lg': '768px',
        'xl': '820px',
        '2xl': '1024px',
        '3xl': '1280px',
        '4xl': '1440px',
        '5xl': '1920px',
      },
    },
  },
  plugins: [],
}
