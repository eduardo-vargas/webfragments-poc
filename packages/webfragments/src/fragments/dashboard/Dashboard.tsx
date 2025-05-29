import React from 'react';

export interface DashboardProps {
  className?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ className }) => {
  return (
    <div
      className={className}
      style={{
        padding: '2rem',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ marginTop: 0, color: '#333' }}>Dashboard Overview</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div style={{ padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
          <h3 style={{ margin: 0, color: '#0369a1' }}>Users</h3>
          <p style={{ fontSize: '2rem', margin: '0.5rem 0' }}>1,234</p>
        </div>
        <div style={{ padding: '1rem', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
          <h3 style={{ margin: 0, color: '#166534' }}>Revenue</h3>
          <p style={{ fontSize: '2rem', margin: '0.5rem 0' }}>$5,678</p>
        </div>
        <div style={{ padding: '1rem', backgroundColor: '#fef2f2', borderRadius: '8px' }}>
          <h3 style={{ margin: 0, color: '#991b1b' }}>Orders</h3>
          <p style={{ fontSize: '2rem', margin: '0.5rem 0' }}>567</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 