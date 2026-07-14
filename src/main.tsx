import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary';

const handleReset = () => {
  const keys = ['pinkwire-settings-store', 'pinkwire-desktop-store', 'pinkwire-window-store', 'pinkwire-file-store', 'pinkwire-browser-store', 'pinkwire-journal-store', 'pinkwire-disposable-store'];
  keys.forEach(k => localStorage.removeItem(k));
  window.location.reload();
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary onReset={handleReset}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
