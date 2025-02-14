import React from 'react';
import './Course.css';

const PillarsSection = () => {
  return (
    <div className="pillars-container">
      {/* Left Section */}
      <div className="pillars-text">
        <h1>
          The <span className="highlight">5 Pillars</span> of <br />
          <span className="highlight">Our Curriculum</span>
        </h1>
        <p>
          Our curriculum nurtures your child's potential with a comprehensive technology program, 
          covering coding, scientific exploration, design thinking, and robotics. It's the only platform 
          offering specialized teaching expertise across various technology disciplines.
        </p>
      </div>

      {/* Right Section - Circular Pillars */}
      <div className="pillars-visual-circle">
        <div className="pillar-circle robotics">Foundation of Robotics</div>
        <div className="pillar-circle thinking">Creative Thinking</div>
        <div className="pillar-circle exploration">Scientific Exploration</div>
        <div className="pillar-circle tech">Advanced Tech</div>
        <div className="pillar-circle teamwork">Social Teamwork and Collaboration</div>
      </div>
    </div>
  );
};

export default PillarsSection;