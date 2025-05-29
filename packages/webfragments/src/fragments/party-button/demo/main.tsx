import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeWebFragments, registerFragment } from '../../../elements';
import PartyButton from '../PartyButton';

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

// Initialize web fragments and register the party button
initializeWebFragments();
registerFragment('party-button', PartyButton);

const Demo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const checkFragment = () => {
      const fragment = document.querySelector('web-fragment[fragment-id="party-button"]');
      if (fragment) {
        setIsLoading(false);
      } else {
        setHasError(true);
      }
    };

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
      background: '#f5f5f5'
    }}>
      <web-fragment fragment-id="party-button">
        {isLoading && <div slot="loading">Loading party button...</div>}
        {hasError && <div slot="error">Failed to load party button</div>}
      </web-fragment>
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