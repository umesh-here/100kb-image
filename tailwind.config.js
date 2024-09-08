/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: {
          400: "#0d1117",
        },
        white: {
          50: "#ffffff",
          100: "#fafafa",
        },
        brand: "#ffdb70",
        primary: "#fafafa",
        secondary: "#d6d6d6",
      },
    },
  },
  plugins: [],
};
