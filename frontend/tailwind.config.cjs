module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Default sans font
        serif: ['Georgia', 'serif'],   // Add your serif font here, e.g., Georgia
        poppins: ['Poppins', 'sans-serif'], // Add the Poppins font
      },
      container: {
        padding: {
          sm: "2rem",  // Add for small screens
          md: "10rem", // Keep for medium screens
          lg: "5rem",  // Example for large screens
          xl: "8rem",  // Example for extra large screens
        },
      },
      colors: {
        'custom-blue': '#000042', // Add your custom color here
        'custom-sage': '#e79f31',
      },
    },
  },
  plugins: [],
};
