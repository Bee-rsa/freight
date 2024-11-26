module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Default sans font
        serif: ['Georgia', 'serif'],   // Add your serif font here, e.g., Georgia
        poppins: ['Poppins', 'sans-serif'], // Add the Poppins font
      },
      
      colors: {
        'custom-blue': '#000042', // Add your custom color here
        'custom-sage': '#e79f31',
      },
    },
  },
  plugins: [],
};
