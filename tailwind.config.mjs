// import { defineConfig } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      fontFamily: {
        montserratLight: ['montserrat-light', 'sans-serif'],
        montserratRegular: ['montserrat-regular', 'sans-serif'],
        montserratMedium: ['montserrat-medium', 'sans-serif'],
        montserratBold: ['montserrat-bold', 'sans-serif'],
        montserratExtraBold: ['montserrat-extra-bold', 'sans-serif'],
        montserratBlack: ['montserrat-black', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#f7f7ff',
          100: '#edeaff',
          200: '#d9d1ff',
          300: '#b9a8ff',
          400: '#9a7bff',
          500: '#7d4dff',
          600: '#6436e6',
          700: '#4e29b4',
          800: '#3b2188',
          900: '#2a1a66',
          950: '#1b1342',
        },
        primary: '#8D1C0E',
        secondary: '#864625',
        terceary: '#e5b131',
        champagne: '#FBEDD7',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          lg: '2rem',
          xl: '2rem',
          '2xl': '3rem',
        },
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(135deg, #f8f6f0 0%, #f5f1e8 15%, #f2ede3 30%, #ede6d9 45%, #e8ddd0 60%, #e3d4c7 75%, #ddc9b8 90%, #d6bea9 100%)',
      },
    },
  },
  plugins: [],
};
