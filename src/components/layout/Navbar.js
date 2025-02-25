import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="nav">
      <div className="logo-container">
        <Link to="/" className="logo-main">
          <span>✦</span> Talent Insight
        </Link>
        <span className="logo-subtitle">Executive Search Intelligence</span>
      </div>
      
      <div className="nav-right">
        <button style={{border:'none', background:'none', cursor:'pointer'}}>
          <span>⚲</span>
        </button>
        <button style={{border:'none', background:'none', cursor:'pointer'}}>
          <span>⚙</span>
        </button>
        <button style={{border:'none', background:'none', cursor:'pointer'}}>
          <span>◐</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar; 