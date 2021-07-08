module.exports = {
  purge: [
    './public/index.html',
    './src/App.{js, jsx}',
    './src/components/**/*.{js,jsx}',
    './src/features/**/*.{js,jsx}',
  ],
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      black: '#000000',
      white: '#ffffff',
      blue: '#1D355D',
      indigo: '#8085d9',
      green: '#60bf88',
      red: '#ea8282',
      orange: '#f9a826',
    },
    extend: {
      backgroundImage: () => ({
        app: "url('assets/images/background.png')",
      }),
    },
  },
};
