const colors = require("tailwindcss/colors");
const { default: _default, alt, light, lightest, subtle } = require("./colors");

module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx", "!node_modules/*"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    borderWidth: {
      1: "1px",
    },
    colors: {
      ...colors,
      blurple: "rgb(114, 137, 218)",
      theme: {
        DEFAULT: _default,
        alt,
        light,
        lightest,
        subtle,
      },
    },
    minWidth: {
      image: "800px",
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
