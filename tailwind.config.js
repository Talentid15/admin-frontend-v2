/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-purple": "0px 2px 17.6px 0px #803CD8",
        "custom-green": "0px 2px 17.6px 0px #3DBF28",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "custom-gray": "#373737",
      },
      animation: {
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-in",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(1rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-1rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        variants: {
          scrollbar: ['hidden'], // Enable hidden scrollbar variant
        },
      },
    },
  },
  plugins: [],
};
