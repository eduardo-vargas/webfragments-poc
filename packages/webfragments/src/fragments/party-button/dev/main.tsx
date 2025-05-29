import React from 'react';
import { createRoot } from 'react-dom/client';
import PartyButton from '../PartyButton';

// Add some basic styles
const styles = document.createElement('style');
styles.textContent = `
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
`;
document.head.appendChild(styles);

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f5f5f5',
      gap: '1rem'
    }}>
      <h1>Party Button Demo</h1>
      <p>Click the button to start the party! 🎉</p>
      <PartyButton />
    </div>
  </React.StrictMode>
); 