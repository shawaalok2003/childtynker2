import React from 'react';
import './IOTMasterPackage.css'; // External CSS file for styling
import { FaRobot, FaLightbulb, FaMoneyBillWave } from 'react-icons/fa';
import { IoSchoolOutline } from 'react-icons/io5';

const IOTMasterPackage = () => {
  return (
    <div className="iot-master-container">
      <h1 className="title">IOT Master Package</h1>

      {/* Details Section */}
      <div className="details-box">
        <div className="detail-item">
          <IoSchoolOutline className="icon" />
          <strong>Age Group:</strong>
          <p>12+ years</p>
        </div>
        <div className="detail-item">
          <FaRobot className="icon" />
          <strong>Classes:</strong>
          <p>50 classes</p>
        </div>
        <div className="detail-item">
          <FaLightbulb className="icon" />
          <strong>Projects:</strong>
          <p>10+ projects</p>
        </div>
      </div>

      {/* Key Features */}
      <div className="features-box">
        <h2><FaRobot className="icon" /> Key Features:</h2>
        <ul>
          <li>Learn IoT and its applications in robotics</li>
          <li>Design and implement smart automation systems</li>
        </ul>
      </div>

      {/* Example Projects */}
      <div className="projects-box">
        <h2><FaLightbulb className="icon" /> Example Projects:</h2>
        <ul>
          <li>Smart traffic management</li>
          <li>Home automation</li>
          <li>Health monitoring systems</li>
        </ul>
      </div>

      {/* Pricing Section */}
      <div className="pricing-box">
        <h2><FaMoneyBillWave className="icon" /> Pricing:</h2>
        <p>₹48,399 to ₹75,399 depending on the selected plan</p>
      </div>

      {/* Enroll Button */}
      <a href="https://www.childtynker.com" target="_blank" rel="noopener noreferrer" className="enroll-btn">
        Enroll Now
      </a>
    </div>
  );
};

export default IOTMasterPackage;