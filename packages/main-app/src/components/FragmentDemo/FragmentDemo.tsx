import React from 'react';
import { partyButtonFragment } from '@webfragments/core';

export const FragmentDemo: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Party Button Demo</h2>
      <p>This demo shows a web fragment that creates a fun party effect when clicked!</p>
      
      <div style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        margin: '20px 0',
        backgroundColor: '#f9f9f9'
      }}>
        <web-fragment fragment-id={partyButtonFragment.id} />
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>About this Fragment</h3>
        <ul>
          <li>Fragment ID: {partyButtonFragment.id}</li>
          <li>Source: Local Development</li>
          <li>Dependencies: {partyButtonFragment.dependencies?.length || 0}</li>
        </ul>
      </div>
    </div>
  );
}; 