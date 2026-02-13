import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('App starting...');

try {
  const root = document.getElementById('root');
  if (!root) throw new Error('Root element not found');

  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  console.log('App rendered');
} catch (e) {
  console.error('Failed to render app:', e);
}
