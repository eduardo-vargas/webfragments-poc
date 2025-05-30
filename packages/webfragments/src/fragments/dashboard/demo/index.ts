import { initializeWebFragments, registerFragment } from '../../../elements';
import Dashboard from '../index';

// Initialize web fragments and register the dashboard
initializeWebFragments();
registerFragment('dashboard', Dashboard);

// Create a simple demo component
const container = document.getElementById('root');
if (container) {
  const fragment = document.createElement('web-fragment');
  fragment.setAttribute('fragment-id', 'dashboard');
  container.appendChild(fragment);
} 