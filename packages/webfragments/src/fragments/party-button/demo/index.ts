import { initializeWebFragments, registerFragment } from '../../../elements';
import PartyButton from '../index';

// Initialize web fragments and register the party button
initializeWebFragments();
registerFragment('party-button', PartyButton);

// Create a simple demo component
const container = document.getElementById('root');
if (container) {
  const fragment = document.createElement('web-fragment');
  fragment.setAttribute('fragment-id', 'party-button');
  container.appendChild(fragment);
} 