import React from 'react';

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  title: {
    color: '#333',
    margin: 0,
    fontSize: '1.5rem'
  }
} as const;

const Dashboard: React.FC = () => {
  console.log('[Dashboard] Component mounted');

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Hello World from Dashboard</h1>
    </div>
  );
};

export default Dashboard; 