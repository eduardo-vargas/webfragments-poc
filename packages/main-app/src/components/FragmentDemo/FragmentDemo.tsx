import React, { useState, useEffect } from 'react';

const FRAGMENT_URL = 'https://eduardo-vargas.github.io/webfragments-poc/fragments/party-button/demo/index.html';

export const FragmentDemo: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Simulate checking if the fragment is ready
    const checkFragment = () => {
      const fragment = document.querySelector('web-fragment[fragment-id="party-button"]');
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
    <div style={{ padding: '20px' }}>
      <h2>Party Button Demo</h2>
      <p>This demo shows a web fragment that creates a fun party effect when clicked!</p>
      
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        margin: '20px 0',
        backgroundColor: '#f9f9f9'
      }}>
        <p style={{ 
          fontFamily: 'monospace', 
          backgroundColor: '#eee', 
          padding: '10px', 
          borderRadius: '4px',
          wordBreak: 'break-all'
        }}>
          Loading fragment from: {FRAGMENT_URL}
        </p>
        <web-fragment 
          fragment-id="party-button"
          src={FRAGMENT_URL}
        >
          {isLoading && <div slot="loading">Loading Party Button...</div>}
          {hasError && <div slot="error">Failed to load Party Button</div>}
        </web-fragment>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>About this Fragment</h3>
        <ul>
          <li>Fragment ID: party-button</li>
          <li>Source: Local Development</li>
          <li>Type: Interactive Button</li>
        </ul>
      </div>
    </div>
  );
}; 