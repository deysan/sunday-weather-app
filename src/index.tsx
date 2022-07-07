import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { customTheme } from './styles';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          <GlobalStyles
            styles={{
              body: { backgroundColor: '#101039' },
            }}
          />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
