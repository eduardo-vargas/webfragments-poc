import { createFragment } from '../../elements';
import PartyButton from './PartyButton';

console.log('[PartyButton] Loading component');

const partyButtonFragment = createFragment('party-button', PartyButton);

export { partyButtonFragment };
export default PartyButton;

console.log('[PartyButton] Fragment registered:', partyButtonFragment); 