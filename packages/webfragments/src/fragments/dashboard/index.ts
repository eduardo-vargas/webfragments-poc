import { createFragment } from '../../elements';
import Dashboard from './Dashboard';

console.log('[Dashboard] Loading component');

const dashboardFragment = createFragment('dashboard', Dashboard);

export { dashboardFragment };
export default Dashboard;

console.log('[Dashboard] Fragment registered:', dashboardFragment); 