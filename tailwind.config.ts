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
        dark: {
          950: "#07080a",
          900: "#0a0b0e",
          850: "#101218",
          800: "#161922",
          700: "#1f2330",
          600: "#2a3040",
        },
        light: {
          50: "#ffffff",
          100: "#faf8f5",
          150: "#f4efe6",
          200: "#ebe3d5",
          300: "#d5c8b5",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
          950: "#030712",
        },
        gold: {
          300: "#fae0a2",
          400: "#e6ca85",
          500: "#c5a059",
          600: "#ab853b",
          700: "#8c6827",
          800: "#6e4f1a",
        },
        wa: {
          DEFAULT: "#25d366",
          dark: "#1ea952",
          light: "#2ae06d",
        }
      },
      fontFamily: {
        display: ["Cinzel", "serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #fae0a2 0%, #c5a059 50%, #9a7830 100%)",
        "gold-gradient-dark": "linear-gradient(135deg, #c5a059 0%, #8c6827 100%)",
        "gold-subtle": "linear-gradient(135deg, rgba(250, 224, 162, 0.15) 0%, rgba(197, 160, 89, 0.05) 100%)",
        "gold-subtle-light": "linear-gradient(135deg, rgba(197, 160, 89, 0.12) 0%, rgba(197, 160, 89, 0.03) 100%)",
        "wa-gradient": "linear-gradient(135deg, #25d366 0%, #1ea952 100%)",
      },
      boxShadow: {
        "gold-glow": "0 0 30px rgba(197, 160, 89, 0.35)",
        "gold-glow-lg": "0 0 50px rgba(197, 160, 89, 0.55)",
        "gold-glow-light": "0 4px 20px rgba(197, 160, 89, 0.25)",
        "wa-glow": "0 0 25px rgba(37, 211, 102, 0.45)",
        "elevation": "0 25px 50px -12px rgba(0, 0, 0, 0.8)",
        "elevation-light": "0 20px 40px -15px rgba(60, 45, 20, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "wa-pulse": "waPulse 2.5s infinite",
      },
      keyframes: {
        waPulse: {
          "0%": { boxShadow: "0 0 0 0 rgba(37, 211, 102, 0.7)" },
          "70%": { boxShadow: "0 0 0 16px rgba(37, 211, 102, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(37, 211, 102, 0)" },
        }
      }
    },
  },
  plugins: [],
};

export default config;
