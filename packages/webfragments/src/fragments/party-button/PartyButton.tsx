import React from 'react';
import confetti from 'canvas-confetti';

console.log('[PartyButton] Loading component version with position-based confetti');

const styles = {
  button: {
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    backgroundColor: '#FF6633',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }
} as const;

const PartyButton: React.FC = () => {
  console.log('[PartyButton] Component mounted');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    // Calculate the origin point relative to the viewport
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    console.log('[PartyButton] Click detected at position:', { x, y });
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      startVelocity: 30,
      gravity: 1.5,
      ticks: 200,
      shapes: ['square', 'circle'],
      colors: ['#FF6633', '#FFA07A', '#FFD700', '#FF8C00']
    });
  };

  return React.createElement('button', {
    style: styles.button,
    onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.currentTarget;
      target.style.transform = 'scale(1.1)';
      target.style.backgroundColor = '#e65c2e';
    },
    onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.currentTarget;
      target.style.transform = 'scale(1)';
      target.style.backgroundColor = '#FF6633';
    },
    onClick: handleClick,
    children: 'Hello world! 👋🏼'
  });
};

export default PartyButton; 