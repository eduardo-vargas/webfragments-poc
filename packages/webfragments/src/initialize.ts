import { initializeWebFragments } from './elements';

// Initialize web fragments when the module is loaded
initializeWebFragments();

console.log('[WebFragments] Custom elements initialized');

// Export the initialization function in case it needs to be called again
export { initializeWebFragments }; 