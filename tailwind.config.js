/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: { colors: { red: "hsl(354, 84%, 57%)" } },
    fontFamily: {
      sans: ["YellowTail", "sans-serif"],
    },
  },
  plugins: [],
};
