/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-color": "#B931FC",
      },
    },
    fontSize: {
      small: "12px",
    },
  },
  plugins: [],
};
