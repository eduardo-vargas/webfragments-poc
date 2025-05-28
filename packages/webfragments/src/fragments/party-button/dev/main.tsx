import React from 'react';
import { createRoot } from 'react-dom/client';
import { PartyButton } from '../PartyButton';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found');

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f5f5f5'
    }}>
      <PartyButton />
    </div>
  </React.StrictMode>
); 