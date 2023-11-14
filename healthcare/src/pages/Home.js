import React from 'react';
import PatientsSummaryCard from '../components/PatientsSummaryCard';

  const Home = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ width: '66%', padding: '20px' }}>
        </div>
        <div style={{ width: '33%', padding: '20px' }}>
          <PatientsSummaryCard />
        </div>
      </div>
    );
  };

export default Home;