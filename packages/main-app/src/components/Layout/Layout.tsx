import React, { useState } from 'react';
import { Navigation } from '../Navigation/Navigation';
import { Header } from '../Header/Header';

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const
  },
  main: {
    flex: 1,
    marginTop: '60px', // Header height
    marginLeft: '250px', // Navigation width
    padding: '2rem',
    transition: 'margin-left 0.3s ease'
  },
  mainWithCollapsedNav: {
    marginLeft: 0
  }
} as const;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  const toggleNav = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  return (
    <div style={styles.container}>
      <Header onToggleNav={toggleNav} isNavCollapsed={isNavCollapsed} />
      <Navigation isCollapsed={isNavCollapsed} />
      <main style={{
        ...styles.main,
        ...(isNavCollapsed ? styles.mainWithCollapsedNav : {})
      }}>
        {children}
      </main>
    </div>
  );
}; 