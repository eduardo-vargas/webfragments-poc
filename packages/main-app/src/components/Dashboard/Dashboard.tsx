import React, { useState, useEffect } from 'react';

const FRAGMENT_URL = 'https://eduardo-vargas.github.io/webfragments-poc/fragments/dashboard/demo/index.html';

export const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Simulate checking if the fragment is ready
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
    <div style={{ padding: '20px' }}>
      <h2>Dashboard Demo</h2>
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
          fragment-id="dashboard"
          src={FRAGMENT_URL}
        >
          {isLoading && <div slot="loading">Loading Dashboard...</div>}
          {hasError && <div slot="error">Failed to load Dashboard</div>}
        </web-fragment>
      </div>
    </div>
  );
}; 