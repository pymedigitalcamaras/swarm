import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a5f7a",
          dark: "#0d3d4d",
          light: "#2a8db3",
        },
        accent: {
          DEFAULT: "#e63946",
          hover: "#c1121f",
        },
        success: "#2a9d8f",
        background: "#f8f9fa",
        card: "#ffffff",
        text: "#1a1a2e",
        "text-muted": "#6c757d",
        border: "#dee2e6",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
