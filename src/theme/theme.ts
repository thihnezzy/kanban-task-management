import { createTheme } from '@mantine/core';

const theme = createTheme({
  white: '#FFFFFF',
  breakpoints: {
    xs: '375px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
});

export default theme;
