const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./pages/**/*.tsx?", "./components/**/*.tsx?"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
    },
    gridTemplateColumns: {
      "right-sidebar": "auto 300px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
