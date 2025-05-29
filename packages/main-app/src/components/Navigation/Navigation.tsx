import React from 'react';
import { NavLink } from 'react-router-dom';

const styles = {
  nav: {
    position: 'fixed' as const,
    top: '60px', // Header height
    left: 0,
    bottom: 0,
    backgroundColor: '#f0f0f0',
    width: '250px',
    transform: 'translateX(0)',
    transition: 'transform 0.3s ease',
    borderRight: '1px solid #ddd',
    padding: '1rem 0',
    display: 'flex',
    flexDirection: 'column' as const
  },
  navCollapsed: {
    transform: 'translateX(-250px)'
  },
  link: {
    padding: '0.75rem 1.5rem',
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
    display: 'block',
    transition: 'all 0.2s ease',
    borderLeft: '4px solid transparent'
  },
  activeLink: {
    backgroundColor: '#e0e0e0',
    borderLeftColor: '#FF6633',
    color: '#FF6633'
  }
} as const;

interface NavigationProps {
  isCollapsed: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ isCollapsed }) => (
  <nav style={{
    ...styles.nav,
    ...(isCollapsed ? styles.navCollapsed : {})
  }}>
    <NavLink 
      to="/" 
      style={({ isActive }) => ({
        ...styles.link,
        ...(isActive ? styles.activeLink : {})
      })}
    >
      Home
    </NavLink>
    <NavLink 
      to="/fragment-demo" 
      style={({ isActive }) => ({
        ...styles.link,
        ...(isActive ? styles.activeLink : {})
      })}
    >
      Web Fragments Demo
    </NavLink>
    <NavLink 
      to="/dashboard" 
      style={({ isActive }) => ({
        ...styles.link,
        ...(isActive ? styles.activeLink : {})
      })}
    >
      Dashboard
    </NavLink>
  </nav>
); 