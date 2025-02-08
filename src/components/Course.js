import React from 'react';
import './Course.css';

const PillarsSection = () => {
  return (
    <div className="pillars-container">
      {/* Left Section */}
      <div className="pillars-text">
        <h1>
          The <span className="highlight">5 pillars</span> of <br />
          <span className="highlight">our curriculum</span>
        </h1>
        <p>
          We've designed one-of-a-kind teaching methodology, <strong>PITLES</strong>, 
          with academicians & accomplished psychologists. An approach that lets kids discover 
          <span className="emphasis"> game design, coding basics, & scientific tools</span> in a fun way.
        </p>
        <button className="cta-button">Book Your First Free Class</button>
      </div>

      {/* Right Section */}
      <div className="pillars-visual">
        <div className="pillar">
          <div className="pillar-number" style={{ backgroundColor: '#FFD700' }}>01</div>
          <div className="pillar-text" style={{ backgroundColor: '#FFD700' }}>Advance Tech</div>
        </div>
        <div className="pillar">
          <div className="pillar-number" style={{ backgroundColor: '#6A5ACD' }}>02</div>
          <div className="pillar-text" style={{ backgroundColor: '#6A5ACD' }}>Creative Thinking</div>
        </div>
        <div className="pillar">
          <div className="pillar-number" style={{ backgroundColor: '#FF4500' }}>03</div>
          <div className="pillar-text" style={{ backgroundColor: '#FF4500' }}>Scientific Exploration</div>
        </div>
        <div className="pillar">
          <div className="pillar-number" style={{ backgroundColor: '#32CD32' }}>04</div>
          <div className="pillar-text" style={{ backgroundColor: '#32CD32' }}>Coding Foundation</div>
        </div>
        <div className="pillar">
          <div className="pillar-number" style={{ backgroundColor: '#1E90FF' }}>05</div>
          <div className="pillar-text" style={{ backgroundColor: '#1E90FF' }}>Team Work</div>
        </div>
      </div>
    </div>
  );
};

export default PillarsSection;