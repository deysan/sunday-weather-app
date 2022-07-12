import { createTheme } from '@mui/material';

export const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#fff',
    },
    warning: {
      main: '#FFD059',
    },
    background: {
      paper: '#1A1C49',
      default: '#000',
    },
  },
  typography: {
    fontFamily: `'Balsamiq Sans', cursive`,
  },
  shape: {
    borderRadius: 20,
  },
});
