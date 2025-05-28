import React from 'react';

const styles = {
  container: {
    padding: '2rem'
  }
} as const;

export const Home: React.FC = () => (
  <div style={styles.container}>
    <h1>Welcome to WebFragments Demo</h1>
    <p>This demo shows how web fragments can be:</p>
    <ul>
      <li>Loaded locally during development</li>
      <li>Loaded remotely in production</li>
      <li>Easily integrated into any React application</li>
    </ul>
    <p>Click on "Web Fragments Demo" to see it in action!</p>
  </div>
); 