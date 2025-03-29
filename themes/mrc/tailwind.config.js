/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.{html,md}",
  ],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
