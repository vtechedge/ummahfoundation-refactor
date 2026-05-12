import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        cream: "#FAF7F0",
        ink: "#1A1A1A",
        muted: "#6B6B6B",
        islamic: {
          50:  "#E8F5EE",
          100: "#C5E6D1",
          200: "#8DCCA7",
          300: "#56B17C",
          400: "#2D9059",
          500: "#1E7A3A",
          600: "#196631",
          700: "#135027",
          800: "#0D3C1D",
          900: "#072814",
        },
        maroon: {
          50:  "#FCE8EA",
          100: "#F5C2C7",
          200: "#ED8C94",
          300: "#E05560",
          400: "#CC2D3A",
          500: "#8B1A20",
          600: "#731519",
        },
        gold: {
          50:  "#FBF6E5",
          100: "#F6ECC4",
          200: "#EDD888",
          300: "#DEC04D",
          400: "#C9A227",
          500: "#A5851C",
          600: "#836916",
        },
      },
      fontFamily: {
        display: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        arabic: ["Noto Naskh Arabic", "Geeza Pro", "Segoe UI", "Traditional Arabic", "serif"],
      },
      boxShadow: {
        soft: "0 8px 30px -10px rgba(30, 122, 58, 0.15)",
        glow: "0 0 0 1px rgba(201, 162, 39, 0.25), 0 20px 50px -20px rgba(30, 122, 58, 0.25)",
        card: "0 1px 2px rgba(17, 24, 39, 0.04), 0 8px 24px -8px rgba(17, 24, 39, 0.08)",
      },
      backgroundImage: {
        "islamic-grid":
          "radial-gradient(circle at 1px 1px, rgba(30,122,58,0.12) 1px, transparent 0)",
        "gold-shine":
          "linear-gradient(135deg, #C9A227 0%, #F6ECC4 50%, #C9A227 100%)",
      },
      backgroundSize: {
        "islamic-grid": "24px 24px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseRing: {
          "0%": { boxShadow: "0 0 0 0 rgba(30,122,58,0.5)" },
          "70%": { boxShadow: "0 0 0 12px rgba(30,122,58,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(30,122,58,0)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%":   { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "banner-gradient": {
          "0%":   { backgroundPosition: "0% 50%" },
          "50%":  { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "banner-sweep": {
          "0%":   { transform: "translateX(-100%) skewX(-15deg)" },
          "100%": { transform: "translateX(300%) skewX(-15deg)" },
        },
      },
      animation: {
        "fade-up":         "fade-up 0.6s ease-out both",
        shimmer:           "shimmer 2.5s linear infinite",
        "pulse-ring":      "pulseRing 2s infinite",
        marquee:           "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        "banner-gradient": "banner-gradient 8s ease infinite",
        "banner-sweep":    "banner-sweep 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
