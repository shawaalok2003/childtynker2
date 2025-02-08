import React from 'react';
import './AIMLMasterPackage.css'; // External CSS file for styling

const AIMLMasterPackage = () => {
  return (
    <div className="aiml-master-container">
      <h1 className="title">AI/ML Master Package</h1>
      
      {/* Details Section */}
      <div className="details-box">
        <div className="detail-item">
          <strong>Age Group:</strong>
          <p>12+ years</p>
        </div>
        <div className="detail-item">
          <strong>Classes:</strong>
          <p>50 or 100 classes</p>
        </div>
        <div className="detail-item">
          <strong>Projects:</strong>
          <p>12+ or 40+ projects</p>
        </div>
      </div>

      {/* Key Features */}
      <div className="features-box">
        <h2>Key Features:</h2>
        <ul>
          <li>Learn artificial intelligence and machine learning</li>
          <li>Build AI-enabled robots and tracking systems</li>
        </ul>
      </div>

      {/* Example Projects */}
      <div className="projects-box">
        <h2>Example Projects:</h2>
        <ul>
          <li>Face recognition robot</li>
          <li>Vision line-tracking robot</li>
          <li>Human face tracking</li>
        </ul>
      </div>

      {/* Pricing Section */}
      <div className="pricing-box">
        <h2>Pricing:</h2>
        <p>₹48,399 to ₹75,399 depending on the selected plan</p>
      </div>

      {/* Enroll Button */}
      <a href="https://www.childtynker.com" target="_blank" rel="noopener noreferrer" className="enroll-btn">
        Enroll Now
      </a>
    </div>
  );
};

export default AIMLMasterPackage;