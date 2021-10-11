module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      colors:{
        primary:"#7C3AED",
        secondary:"#A855F7",
        tertiary:"#E9D5FF",
        dark:"#24045c",
        white:"#fff"
      },
    },
  },
  plugins: [],
}
