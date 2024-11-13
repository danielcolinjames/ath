/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ath: {
          green: "#00FFBA",
        },
      },
      keyframes: {
        opacityPulse: {
          "0%, 40%, 75%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
      },
      // Add custom animation utilities
      animation: {
        opacityPulse: "opacityPulse 10s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
