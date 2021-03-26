const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      ath: ["Satoshi", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        ath: {
          100: "#00FFBA",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
