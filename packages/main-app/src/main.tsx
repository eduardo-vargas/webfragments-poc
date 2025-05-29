import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initializeWebFragments, registerFragment } from '@webfragments/core/elements';
import PartyButton from '@webfragments/core/fragments/party-button';
import Dashboard from '@webfragments/core/fragments/dashboard';
import { Layout } from './components/Layout/Layout';
import { Home } from './components/Home/Home';
import { FragmentDemo } from './components/FragmentDemo/FragmentDemo';
import { Dashboard as DashboardPage } from './components/Dashboard/Dashboard';

// Initialize web fragments before rendering
initializeWebFragments();

// Register fragments
console.log('[Main] Registering party-button fragment');
registerFragment('party-button', PartyButton);
console.log('[Main] Party button fragment registered');

console.log('[Main] Registering dashboard fragment');
registerFragment('dashboard', Dashboard);
console.log('[Main] Dashboard fragment registered');

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Render the app
root.render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/fragment-demo" element={<FragmentDemo />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
); 