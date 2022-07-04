import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { ThemeProvider } from '@mui/material';
import { customTheme } from './styles';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
