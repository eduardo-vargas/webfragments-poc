import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { initializeWebFragments } from 'web-fragments';
import { Layout } from './components/Layout/Layout';
import { Home } from './components/Home/Home';
import { FragmentDemo } from './components/FragmentDemo/FragmentDemo';
import { Dashboard } from './components/Dashboard/Dashboard';

// Initialize web fragments
initializeWebFragments();

// Create the root element
const root = ReactDOM.createRoot(document.getElementById('root')!);

// Get the base URL from the environment
const isDev = !window.location.href.includes('github.io');
const basename = isDev ? '' : '/webfragments-poc';

// Render the app
root.render(
  <React.StrictMode>
    <Router basename={basename}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/fragment-demo" element={<FragmentDemo />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
); 