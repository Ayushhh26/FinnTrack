/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
   
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617", // slate-900
        surface: "#020617",
        "surface-elevated": "#0f172a", // slate-800
        primary: "#a3e635", // lime-400
        "primary-soft": "#bef264", // lime-300
        muted: "#9ca3af", // gray-400
        border: "#1f2937", // slate-800 border
        danger: "#ef4444",
      },
      borderRadius: {
        card: "1.5rem",
        button: "9999px",
        input: "0.75rem",
      },
      boxShadow: {
        card: "0 18px 45px rgba(15,23,42,0.45)",
        modal: "0 24px 70px rgba(0,0,0,0.75)",
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
    },
  },
  plugins: [],
}