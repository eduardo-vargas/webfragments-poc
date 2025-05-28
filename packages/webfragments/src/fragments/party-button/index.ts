import React from 'react';
import { createWebFragment } from '../../index';
import { PartyButton } from './PartyButton';

const PRODUCTION_URL = 'https://party-button.demos.web-fragments.dev';

console.log('[PartyButton] Registering fragment with position-based confetti');

// Use development mode to determine whether to include the URL
export const partyButtonFragment = createWebFragment(
  'party-button',
  React.createElement(PartyButton),
  [], // no dependencies
  import.meta.env.MODE === 'production' ? PRODUCTION_URL : undefined
);

console.log('[PartyButton] Fragment registered:', partyButtonFragment); 