import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FragmentDemo } from './components/FragmentDemo';
import { Layout } from './components/Layout/Layout';
import { Home } from './components/Home/Home';
import { initializeWebFragments, registerFragment } from '@webfragments/core/elements';
import { partyButtonFragment } from '@webfragments/core';

// Initialize web fragments before rendering
initializeWebFragments();

// Register local fragments
registerFragment(partyButtonFragment.id, partyButtonFragment.content);

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fragments" element={<FragmentDemo />} />
        </Routes>
      </Layout>
    </Router>
  </React.StrictMode>
); 