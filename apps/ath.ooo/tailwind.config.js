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
        drift: {
          "0%, 100%": {
            transform: "translate(-50%, -50%) translate(0px, 0px)",
          },
          "25%": { transform: "translate(-50%, -50%) translate(25px, 25px)" },
          "50%": { transform: "translate(-50%, -50%) translate(0px, 50px)" },
          "75%": { transform: "translate(-50%, -50%) translate(-25px, 25px)" },
        },
      },
      // Add custom animation utilities
      animation: {
        opacityPulse: "opacityPulse 10s ease-in-out infinite",
        drift: "drift 10s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
