import React from 'react';
import Navbar from '../components/layout/Navbar';

function About() {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <div className="about-container">
          <h1>About Talent Insight</h1>
          <p>
            Talent Insight is an advanced executive search intelligence platform that helps
            organizations find and connect with top talent across industries.
          </p>
          <p>
            Our AI-powered platform analyzes vast amounts of data to provide actionable
            insights for talent acquisition professionals, executive recruiters, and HR teams.
          </p>
          <h2>Our Mission</h2>
          <p>
            To transform the executive search process through cutting-edge AI technology,
            making it more efficient, accurate, and personalized.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About; 