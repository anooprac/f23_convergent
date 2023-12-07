import React from 'react';

const PatientsLayout = ({ children }) => {
  return (
    
    <div style={{display: 'flex', height: '100%'}}>
      <div style={{ flex: 1, borderRight: '1px solid #ccc', overflowY: 'auto', overflowX: 'hidden', maxHeight: '90vh', minHeight:'90vh', background: '#ffffff', minWidth: '375px' }}>
        {children[0]}
      </div>
      <div style={{ flex: 3, padding: '20px', maxHeight: '86vh' }}>{children[1]}</div>
    </div>
  );
};

export default PatientsLayout;
