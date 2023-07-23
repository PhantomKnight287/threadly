/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{j,t}sx"],
  theme: {
    extend: {
      colors:{
        dark:"#0d0d0d",
        text:""
      }
    },
  },
  plugins: [],
};
