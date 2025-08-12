// import { defineConfig } from 'tailwindcss';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
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
        primary: '#7d4dff',
        secondary: '#f59e0b',
        accent: '#22d3ee',
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
          'linear-gradient(to bottom right, #1b1342, #4e29b4, #7d4dff)',
      },
    },
  },
  plugins: [],
};
