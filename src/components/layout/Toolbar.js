import React from 'react';

function Toolbar({ isHidden }) {
  return (
    <div className={`toolbar ${isHidden ? 'hidden' : ''}`}>
      <button className="tool-button">
        <span>+</span>
        Mapping
      </button>

      <button className="tool-button">
        <span>⏱</span>
        Trends
      </button>

      <button className="tool-button">
        <span>📊</span>
        Analytics
      </button>
      
      <button className="tool-button">
        <span>↗</span>
        Trajectory
      </button>
      
      <button className="tool-button">
        <span>📏</span>
        Benchmark
      </button>
    </div>
  );
}

export default Toolbar; 