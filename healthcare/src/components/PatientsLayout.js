import React from 'react';

const PatientsLayout = ({ children }) => {
  return (
    
    <div style={{display: 'flex' }}>
      <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #ccc', overflowY: 'auto', maxHeight: '86vh', background: '#f0f0f0'}}>
        {children[0]}
      </div>
      <div style={{ flex: 2, padding: '20px', maxHeight: '86vh' }}>{children[1]}</div>
    </div>
  );
};

export default PatientsLayout;
