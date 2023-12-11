import React from 'react';
import './style.css';

const Positioner = ({ left, right }) => {
  return (
    <div className="positioner">
      <div className="left">{left}</div>
      <div className="right">{right}</div>
    </div>
  );
};

export default Positioner;