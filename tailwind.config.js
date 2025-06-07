const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    screens: {
      sm: "640px",
      md: "1248px",
      tablet: "1268px",
      xl: "1280px",
      lg: "1300px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: {
          100: "#c4def9",
          200: "#88bdf2",
          300: "#489aeb",
          400: "#1776d6",
          500: "#105396",
        },
        secondary: {
          100: "#cdd8e2",
          200: "#9cb0c4",
          300: "#6a89a7",
          400: "#4e6a85",
          500: "#374b5e",
        },
        neutral: {
          100: "#384959",
          200: "#3d5062",
          300: "#42576b",
          400: "#485e74",
          500: "#4d657d",
          600: "#526d86",
          700: "#577490",
          800: "#5c7b99",
          900: "#6182a1",
          1000: "#6a89a7",
        },
        red: {
          100: "#fb3748",
          200: "#d00416",
        },
        yellow: {
          100: "#ffdb43",
          200: "#dfb400",
        },
        green: {
          100: "#84ebb4",
          200: "#1fc16b",
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
};
