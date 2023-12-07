import React from 'react';

const PatientsLayout1 = ({ children }) => {
  return (
    
    <div style={{display: 'flex', height: '100%'}}>
      <div style={{ flex: 5, overflowY: 'auto', overflowX: 'hidden', maxHeight: '79vh', minHeight:'79vh', background: '#ffffff' }}>
        {children[0]}
      </div>
      <div style={{ flex: 1, padding: '20px', maxHeight: '86vh', maxWidth: '35vh' }}>{children[1]}</div>
    </div>
  );
};

export default PatientsLayout1;