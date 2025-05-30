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
    transition: 'all 0.2s ease',
    position: 'relative' as const
  }
} as const;

const PartyButton: React.FC = () => {
  console.log('[PartyButton] Component mounted');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    // Get the shadow root and its host element
    const shadowRoot = button.closest('web-fragment')?.shadowRoot;
    const host = shadowRoot?.host;
    
    if (host) {
      // Get the host element's position
      const hostRect = host.getBoundingClientRect();
      
      // Calculate the origin point relative to the viewport
      const x = (hostRect.left + rect.width / 2) / window.innerWidth;
      const y = (hostRect.top + rect.height / 2) / window.innerHeight;
      
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
    }
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