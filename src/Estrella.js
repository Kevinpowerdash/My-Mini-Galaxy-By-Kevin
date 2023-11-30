// Estrella.js

import React from 'react';
import './Estrella.css';

const Estrella = ({ left, top, color, explotando }) => {
  return (
    <div
      className={`estrella ${explotando ? 'explotando' : ''}`}
      style={{ left, top, backgroundColor: color }}
    ></div>
  );
};

export default Estrella;
