import React, { useState, useEffect } from 'react';

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
    <div>
      <web-fragment fragment-id="dashboard">
        {isLoading && <div slot="loading">Loading Dashboard...</div>}
        {hasError && <div slot="error">Failed to load Dashboard</div>}
      </web-fragment>
    </div>
  );
}; 