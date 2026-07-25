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
        bebasNeue: ['bebas-neue', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#F4FBFC',
          100: '#DDF8FA',
          200: '#A9F0F6',
          300: '#63E6F1',
          400: '#05DBF2',
          500: '#00B8CB',
          600: '#0099AA',
          700: '#027584',
          800: '#014F59',
          900: '#014040',
          950: '#00162A',
        },
        primary: '#00162A',
        secondary: '#0099AA',
        terceary: '#05DBF2',
        champagne: '#FEBF89',
        celestial: '#014040',
        sky: '#05DBF2',
        peach: '#FEBF89',
        ink: '#00162A',
        surface: '#F4FBFC',
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
          'linear-gradient(135deg, #00162A 0%, #014040 48%, #0099AA 100%)',
        'celestial-glow':
          'radial-gradient(circle at 50% 0%, rgba(5, 219, 242, 0.28), transparent 48%), linear-gradient(180deg, #00162A 0%, #014040 100%)',
      },
    },
  },
  plugins: [],
};
