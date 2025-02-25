import React from 'react';
import '../../styles/common/main.css';

function Welcome({ isMinimized }) {
  return (
    <div className={`welcome ${isMinimized ? 'minimized' : ''}`}>
      <h1>Good Evening, Chou</h1>
      <p>Where shall we explore talent today?</p>
    </div>
  );
}

export default Welcome; 