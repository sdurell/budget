import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import { AuthProvider } from "./contexts/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <MantineProvider>
          <App />
        </MantineProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
