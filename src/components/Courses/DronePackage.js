import React from 'react';
import './DronePackage.css'; // External CSS file for styling
import { FaRocket, FaCogs, FaCode, FaMoneyBillWave } from 'react-icons/fa';
import { IoSchoolOutline } from 'react-icons/io5';

const DronePackage = () => {
  return (
    <div className="drone-package-container">
      <h1 className="title">Drone Package</h1>

      {/* Details Section */}
      <div className="details-box">
        <div className="detail-item">
          <IoSchoolOutline className="icon" />
          <strong>Age Group:</strong>
          <p>10+ years</p>
        </div>
        <div className="detail-item">
          <FaRocket className="icon" />
          <strong>Classes:</strong>
          <p>32 classes</p>
        </div>
        <div className="detail-item">
          <FaCogs className="icon" />
          <strong>Projects:</strong>
          <p>20+ projects</p>
        </div>
      </div>

      {/* Key Features */}
      <div className="features-box">
        <h2><FaRocket className="icon" /> Key Features:</h2>
        <ul>
          <li>Build and fly your own drone</li>
          <li>Learn basic drone mechanics and aerodynamics</li>
          <li>Coding for drones with real-world applications</li>
        </ul>
      </div>

      {/* Example Projects */}
      <div className="projects-box">
        <h2><FaCode className="icon" /> Example Projects:</h2>
        <ul>
          <li>Rolling drone</li>
          <li>Reactive drone</li>
          <li>Gyroscope drone</li>
        </ul>
      </div>

      {/* Pricing Section */}
      <div className="pricing-box">
        <h2><FaMoneyBillWave className="icon" /> Pricing:</h2>
        <div className="price-item">
          <strong>₹47,999</strong>
        </div>
      </div>

      {/* Enroll Button */}
      <a href="https://www.childtynker.com" target="_blank" rel="noopener noreferrer" className="enroll-btn">
        Enroll Now
      </a>
    </div>
  );
};

export default DronePackage;