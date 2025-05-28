import React from 'react';

const styles = {
  header: {
    height: '60px',
    backgroundColor: '#f0f0f0',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    alignItems: 'center',
    padding: '0 1.5rem',
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    color: '#333'
  },
  toggleButton: {
    marginRight: '1rem',
    padding: '0.5rem',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.5rem',
    transition: 'all 0.2s ease',
    borderRadius: '4px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#333'
  }
} as const;

interface HeaderProps {
  onToggleNav: () => void;
  isNavCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleNav, isNavCollapsed }) => (
  <header style={styles.header}>
    <button 
      style={styles.toggleButton}
      onClick={onToggleNav}
      aria-label="Toggle navigation"
      onMouseEnter={(e) => {
        const target = e.currentTarget;
        target.style.backgroundColor = '#e0e0e0';
        target.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        const target = e.currentTarget;
        target.style.backgroundColor = 'transparent';
        target.style.transform = 'scale(1)';
      }}
    >
      {isNavCollapsed ? '☰' : '✕'}
    </button>
    <h1 style={styles.title}>WebFragments Demo</h1>
  </header>
); 