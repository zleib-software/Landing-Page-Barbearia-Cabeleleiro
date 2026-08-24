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
          950: "#05080e", // Preto carvão profundo
          900: "#0a101d", // Fundo principal das seções
          850: "#0e1726", // Cards base e containers
          800: "#172338", // Superfícies elevadas
          700: "#243552", // Bordas nítidas
          600: "#3d5175", // Bordas secundárias
        },
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf", // Destaque teal vivo
          500: "#14b8a6", // Cor de assinatura do ateliê
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
        terracotta: {
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
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
        display: ["var(--font-display)", "Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "teal-gradient": "linear-gradient(135deg, #14b8a6 0%, #2dd4bf 100%)",
        "radial-subtle": "radial-gradient(circle at 50% 0%, rgba(20, 184, 166, 0.12) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
