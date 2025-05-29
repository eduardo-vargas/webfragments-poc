import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeWebFragments, registerFragment } from '../../../elements';
import Dashboard from '../Dashboard';

// Declare the custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'web-fragment': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          'fragment-id'?: string;
        },
        HTMLElement
      >;
    }
  }
}

// Initialize web fragments and register the dashboard
console.log('[Demo] Initializing web fragments');
initializeWebFragments();
console.log('[Demo] Registering dashboard fragment');
registerFragment('dashboard', Dashboard);
console.log('[Demo] Dashboard fragment registered');

const Demo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Check if the fragment is ready
    const checkFragment = () => {
      const fragment = document.querySelector('web-fragment[fragment-id="dashboard"]');
      if (fragment) {
        setIsLoading(false);
      } else {
        setHasError(true);
      }
    };

    // Check immediately and after a short delay
    checkFragment();
    const timer = setTimeout(checkFragment, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f5f5f5',
      padding: '2rem'
    }}>
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <web-fragment fragment-id="dashboard">
          {isLoading && <div slot="loading">Loading dashboard...</div>}
          {hasError && <div slot="error">Failed to load dashboard</div>}
        </web-fragment>
      </div>
    </div>
  );
};

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
    <Demo />
  </React.StrictMode>
); 