/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "send-answer": "url('src/assets/img/send-answer.svg')",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "0px",
        sm: "40px",
        lg: "60px",
      },
    },
    fontFamily: {
      sans: ["Helvetica Neue", "sans-serif"],
    },
    screens: {
      sm: "576px",
      md: "768px",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
