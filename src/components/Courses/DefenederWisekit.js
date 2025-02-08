import React from 'react';
import './DefenderWiseKit.css'; // External CSS file for styling
import { FaRobot, FaCogs, FaMicrochip, FaMoneyBillWave } from 'react-icons/fa';
import { IoSchoolOutline } from 'react-icons/io5';

const DefenderWiseKit = () => {
  return (
    <div className="defender-wisekit-container">
      <h1 className="title">Defender WiseKit</h1>

      {/* Details Section */}
      <div className="details-box">
        <div className="detail-item">
          <IoSchoolOutline className="icon" />
          <strong>Age Group:</strong>
          <p>10+ years</p>
        </div>
        <div className="detail-item">
          <FaCogs className="icon" />
          <strong>Classes:</strong>
          <p>50 classes</p>
        </div>
        <div className="detail-item">
          <FaMicrochip className="icon" />
          <strong>Projects:</strong>
          <p>50+ projects</p>
        </div>
      </div>

      {/* Key Features */}
      <div className="features-box">
        <h2><FaRobot className="icon" /> Key Features:</h2>
        <ul>
          <li>Hands-on robotics with sensors and logic-building tasks</li>
          <li>Focus on automation and complex designs</li>
          <li>Prepared for W.R.O.</li>
        </ul>
      </div>

      {/* Example Projects */}
      <div className="projects-box">
        <h2><FaCogs className="icon" /> Example Projects:</h2>
        <ul>
          <li>Gesture control robot</li>
          <li>Voice control robot</li>
          <li>Firefighting robot</li>
        </ul>
      </div>

      {/* Pricing Section */}
      <div className="pricing-box">
        <h2><FaMoneyBillWave className="icon" /> Pricing:</h2>
        <div className="price-item">
          <strong>₹59,999</strong>
        </div>
      </div>

      {/* Enroll Button */}
      <a href="https://www.childtynker.com" target="_blank" rel="noopener noreferrer" className="enroll-btn">
        Enroll Now
      </a>
    </div>
  );
};

export default DefenderWiseKit;