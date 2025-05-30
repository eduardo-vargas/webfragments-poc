import React, { useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';

console.log('[PartyButton] Loading component version with position-based confetti');

const styles = {
  container: {
    position: 'relative' as const,
    display: 'inline-block'
  },
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
  },
  canvas: {
    position: 'fixed' as const,
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none' as const,
    zIndex: 999999
  }
} as const;

const PartyButton: React.FC = () => {
  console.log('[PartyButton] Component mounted');
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Create canvas on mount
    const canvas = document.createElement('canvas');
    canvas.className = 'confetti-canvas';
    Object.assign(canvas.style, styles.canvas);
    canvasRef.current = canvas;

    // Find the root node (either shadow root or document body)
    const container = containerRef.current;
    if (container) {
      const root = container.getRootNode() as Document | ShadowRoot;
      root.appendChild(canvas);
    }

    // Cleanup on unmount
    return () => {
      canvas.remove();
      canvasRef.current = null;
    };
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('[PartyButton] Button clicked');
    
    try {
      const button = event.currentTarget;
      console.log('[PartyButton] Button element:', button);
      
      const rect = button.getBoundingClientRect();
      console.log('[PartyButton] Button rect:', rect);

      // Get the container's root node
      const container = containerRef.current;
      if (!container) return;
      
      // Calculate position relative to the viewport for better scaling
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      console.log('[PartyButton] Calculated position:', { x, y, viewportWidth: window.innerWidth, viewportHeight: window.innerHeight });
      
      // Use the canvas we created on mount
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error('[PartyButton] Canvas not found');
        return;
      }
      
      // Initialize confetti with the canvas
      const myConfetti = confetti.create(canvas) as (options?: confetti.Options) => Promise<null>;
      
      console.log('[PartyButton] Launching confetti');
      myConfetti({
        particleCount: 250,
        spread: 40,
        origin: { x, y },
        startVelocity: 45,
        gravity: 1.5,
        scalar: 0.3,
        ticks: 150,
        decay: 0.88,
        shapes: ['square', 'circle'],
        colors: ['#FF6633', '#FFA07A', '#FFD700', '#FF8C00']
      }).then(() => {
        console.log('[PartyButton] Confetti animation completed');
      }).catch((error) => {
        console.error('[PartyButton] Error during confetti animation:', error);
      });
    } catch (error) {
      console.error('[PartyButton] Error in click handler:', error);
    }
  };

  return React.createElement('div', {
    ref: containerRef,
    style: styles.container
  }, React.createElement('button', {
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
  }));
};

export default PartyButton; 