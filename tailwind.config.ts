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
        obsidian: {
          950: "#060708",
          900: "#0b0d10",
          850: "#101317",
          800: "#161a20",
          700: "#222731",
          600: "#323946",
        },
        sand: {
          50: "#faf9f6",
          100: "#f4f1ea",
          200: "#e8e3d7",
          300: "#d6cebe",
          400: "#a99f8d",
          500: "#7d7463",
          600: "#5a5345",
          700: "#3d382e",
        },
        bronze: {
          300: "#e5cbb0",
          400: "#d6b58f",
          500: "#c49d68",
          600: "#a67f49",
          700: "#7c5c2d",
        },
        emeraldAction: {
          DEFAULT: "#1e8e5a",
          hover: "#177247",
        },
        wa: {
          DEFAULT: "#1ea952",
          dark: "#168841",
          light: "#25d366",
        },
        gold: {
          300: "#fae0a2",
          400: "#e9be6a",
          500: "#c49d68",
          600: "#a67f49",
          700: "#7c5c2d",
        },
        dark: {
          950: "#060708",
          900: "#0b0d10",
          850: "#101317",
          800: "#161a20",
          700: "#222731",
        },
        light: {
          50: "#faf9f6",
          100: "#f4f1ea",
          150: "#ebe5d8",
          200: "#e0d8c7",
          300: "#cfc4b0",
          400: "#a99f8d",
          600: "#5a5345",
          700: "#3d382e",
          800: "#23201a",
          900: "#14120e",
          950: "#0a0907",
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "luxury-glow": "0 0 35px -8px rgba(196, 157, 104, 0.25)",
        "soft-card": "0 10px 30px -10px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        "bronze-gradient": "linear-gradient(135deg, #d6b58f 0%, #c49d68 50%, #9e7640 100%)",
        "radial-spotlight": "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(196, 157, 104, 0.12), transparent 40%)",
      },
    },
  },
  plugins: [],
};

export default config;
