import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';
import { BrowserRouter } from "react-router-dom";
import { DeviceProvider } from './components/context/DeviceContext.tsx';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DeviceProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DeviceProvider>
  </StrictMode>
 
);
