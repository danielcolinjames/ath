/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "text-red-900",
    "text-red-800",
    "text-red-700",
    "text-yellow-800",
    "text-yellow-700",
    "text-yellow-600",
    "text-yellow-500",
    "text-gray-500",
    "text-green-500",
    "text-gray-400",
  ],
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
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        opacityPulse: "opacityPulse 10s ease-in-out infinite",
        drift: "drift 10s ease-in-out infinite",
        tickerTape: "ticker 30s linear infinite",
      },
    },
  },
  plugins: [],
};
