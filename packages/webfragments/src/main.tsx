import { initializeWebFragments, registerFragment } from './elements';
import PartyButton from './fragments/party-button/PartyButton';
import Dashboard from './fragments/dashboard/Dashboard';

// Initialize web fragments first
console.log('[Main] Starting initialization');
const init = async () => {
  // Initialize web fragments
  await initializeWebFragments();
  
  // Register all components
  console.log('[Main] Registering components');
  registerFragment('party-button', PartyButton);
  registerFragment('dashboard', Dashboard);
  
  console.log('[Main] All components registered');
};

// Start initialization
init().catch(console.error);

// Now that everything is registered, we can let the page load
window.addEventListener('load', () => {
  console.log('[Main] Window loaded, fragments are ready');
});

// Initialize any global settings or configurations here
console.log('Web Fragments Development Environment initialized'); 