import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        midnight: {
          950: "#060913", // Profundo absoluto
          900: "#0b1120", // Fundo principal
          850: "#0f172a", // Cards base
          800: "#1e293b", // Superfícies elevadas
          700: "#334155", // Bordas
          600: "#475569", // Textos secundários
        },
        babyblue: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd", // Azul bebê suave
          300: "#7dd3fc", // Azul bebê vibrante
          400: "#38bdf8", // Azul bebê destaque
          500: "#0ea5e9", // Acento
          600: "#0284c7",
          700: "#0369a1",
        },
        ice: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
        },
        wa: {
          DEFAULT: "#1ea952",
          dark: "#168841",
          light: "#25d366",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
