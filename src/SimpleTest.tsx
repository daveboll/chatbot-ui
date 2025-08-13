import React from 'react';

const SimpleTest: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'purple',
      color: 'white',
      padding: '20px',
      borderRadius: '10px',
      fontSize: '24px',
      fontWeight: 'bold',
      zIndex: 9999,
      border: '5px solid yellow'
    }}>
      🎯 SIMPLE TEST - IF YOU SEE THIS, REACT IS WORKING! 🎯
    </div>
  );
};

export default SimpleTest;
