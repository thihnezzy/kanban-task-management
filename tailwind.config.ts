/** @type {import('tailwindcss').Config} */
export default { 
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], 
  corePlugins: { preflight: false, }, 
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'purple-primary': '#635FC7',
        'purple-secondary': '#A8A4FF',
        'black-primary': '#000112',
        'very-dark-grey': '#20212C',
        'dark-grey': '#2B2C37',
        'lines-dark': '#3E3F4E',
        'lines-light': '#E4EBFA',
        'medium-grey': '#828FA3',
        'light-grey': '#F4F7FD',
        'red-primary': '#EA5555',
        'red-secondary': '#FF9898',
      },
      screens: {
        xs: '376px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  darkMode: ['class', '[data-mantine-color-scheme="dark"]'],
  plugins: [],
};