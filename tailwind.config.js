const colors = require("tailwindcss/colors");
const { default: _default, alt, light, lightest } = require("./colors");

module.exports = {
  purge: ["./pages/**/*.tsx", "./components/**/*.tsx"],
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
