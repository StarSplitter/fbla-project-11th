/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        boheld: ['Boheld', 'serif'],
        inter: ['Inter', 'sans-serif'],
        caudex: ['Caudex', 'serif'],
        caudexbold: ['CaudexBold', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      gridTemplateColumns: {
        '70/30': '70% 28%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
