/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F5F5F2",
        "text-primary": "#4B4B4B",
        "card-cozinha": "#DDE5D5",
        "card-cama": "#F5F0EA",
        "card-mesa-banho": "#E2E8DF",
        "card-eletrodomesticos": "#F5F0EA",
        "card-outros": "#E2E8DF",
        accent: "#8E9775",
        "accent-hover": "#7c8564",
      },
    },
  },
  plugins: [],
};
