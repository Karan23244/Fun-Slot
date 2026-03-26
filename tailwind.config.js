/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Outfit", "sans-serif"], // 👈 main font
        display: ["Bebas Neue", "sans-serif"],
      },
      colors: {
        brand: {
          purple: "#7C3AED",
          violet: "#8B5CF6",
          indigo: "#4F46E5",
          blue: "#2563EB",
          cyan: "#06B6D4",
          neon: "#A855F7",
          gold: "#F59E0B",
        },
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(ellipse at 60% 20%, rgba(124,58,237,0.35) 0%, rgba(15,3,38,0) 60%), radial-gradient(ellipse at 10% 80%, rgba(37,99,235,0.3) 0%, transparent 55%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(79,70,229,0.08) 100%)",
        "cta-gradient": "linear-gradient(90deg, #7C3AED 0%, #2563EB 100%)",
        "glow-gradient":
          "radial-gradient(ellipse at center, rgba(124,58,237,0.6) 0%, transparent 70%)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.6s ease forwards",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "count-up": "countUp 0.5s ease forwards",
        "slide-in-left": "slideInLeft 0.6s ease forwards",
        "slide-in-right": "slideInRight 0.6s ease forwards",
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 3s infinite",
        "loader-bar": "loaderBar 2s ease-in-out forwards",
        "loader-pulse": "loaderPulse 1.5s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow:
              "0 0 20px rgba(124,58,237,0.5), 0 0 40px rgba(124,58,237,0.2)",
          },
          "50%": {
            boxShadow:
              "0 0 40px rgba(124,58,237,0.9), 0 0 80px rgba(124,58,237,0.4)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(60px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        loaderBar: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        loaderPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      boxShadow: {
        "glow-purple":
          "0 0 30px rgba(124,58,237,0.6), 0 0 60px rgba(124,58,237,0.3)",
        "glow-blue":
          "0 0 30px rgba(37,99,235,0.6), 0 0 60px rgba(37,99,235,0.3)",
        "glow-btn": "0 0 25px rgba(124,58,237,0.7), 0 4px 20px rgba(0,0,0,0.5)",
        card: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
      },
    },
  },
  plugins: [],
};
