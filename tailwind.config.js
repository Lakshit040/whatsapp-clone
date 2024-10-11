/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'contact-active': '#2d2e2e',
        contact: '#212121',
        error: '#D22B2B',
        success: '#50C878',
        warning: '#FDDA0D',
      },
      backgroundImage: {
        'custom-bg': "url('/whatsapp.jpg')",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        fira: ['Fira Code', 'sans-serif'],
      },
      screens: {
        sm: '600px',
        md: '876px',
        lg: '1300px',
        xl: '1725px',
      },
    },
  },
  plugins: [],
};
