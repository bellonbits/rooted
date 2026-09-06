/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#4B5B3F",
          50: "#F1F3ED",
          100: "#E1E6D8",
          200: "#C3CDB1",
          300: "#A4B48A",
          400: "#869B63",
          500: "#4B5B3F",
          600: "#3E4C34",
          700: "#333F2A",
          800: "#283220",
          900: "#1D2417",
        },
        cream: {
          DEFAULT: "#F7F2E7",
          50: "#FEFDFB",
          100: "#F7F2E7",
          200: "#EFE7D3",
          300: "#E4D8BB",
        },
        ink: "#2B2A24",
        clay: {
          DEFAULT: "#B98249",
          light: "#D9A876",
        },
      },
      fontFamily: {
        serif: ["'Lora'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(43,42,36,0.06), 0 4px 16px rgba(43,42,36,0.06)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
