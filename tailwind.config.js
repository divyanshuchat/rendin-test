module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        rendin: "#fd5b01",
      },
      fontSize: {
        xs: ".75rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
