import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/style.css';
import App from './App.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- root element is guaranteed to exist
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
