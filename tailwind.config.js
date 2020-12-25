const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["pages/**/*.tsx", "components/**/*.tsx"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      theme: {
        DEFAULT: colors.blueGray[900],
        alt: "#0c111f",
      },
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
