/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#F5F5F2",
        "text-primary": "#4B4B4B",
        "card-cozinha": "#DDE5D5",
        "card-cama": "#DDE5D5",
        "card-mesa-banho": "#DDE5D5",
        "card-eletrodomesticos": "#DDE5D5",
        "card-outros": "#DDE5D5",
        accent: "#8E9775",
        "accent-hover": "#7c8564",
      },
    },
  },
  plugins: [],
};
