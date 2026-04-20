/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        secondary: "#1e293b",
        accent: "#00d9ff",
        success: "#10b981",
        danger: "#ef4444",
      },
      fontFamily: {
        sans: ["'Segoe UI'", "sans-serif"],
        mono: ["'Fira Code'", "monospace"],
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        slideIn: "slideIn 0.6s ease-out",
      },
    },
  },
  plugins: [],
}