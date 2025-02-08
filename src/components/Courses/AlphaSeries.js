import React from 'react';
import './AlphaSeries.css';
import { FaRobot, FaCogs, FaMicrochip, FaMoneyBillWave, FaStar, FaTasks, FaAward } from 'react-icons/fa';
import { IoSchoolOutline } from 'react-icons/io5';
import { GiBrain, GiRocket } from 'react-icons/gi';

const AlphaSeriesPackage = () => {
  return (
    <div className="alpha-series-container">
      <h1 className="title"> Alpha Series Package</h1>

      {/* Details Section */}
      <div className="details-box">
        <div className="detail-item">
          <IoSchoolOutline className="icon" />
          <strong>Age Group:</strong> <p>6+ years</p>
        </div>
        <div className="detail-item">
          <FaTasks className="icon" />
          <strong>Classes:</strong> <p>32, 64, or 96 classes</p>
        </div>
        <div className="detail-item">
          <FaMicrochip className="icon" />
          <strong>Projects:</strong> <p>64+ projects</p>
        </div>
      </div>

      {/* Key Features */}
      <div className="features-box">
        <h2><FaCogs className="icon" /> Key Features:</h2>
        <ul>
          <li><FaRobot className="icon" /> Build and control robots with block-based programming</li>
          <li><GiBrain className="icon" /> Advanced projects using robotics concepts</li>
          <li><FaAward className="icon" /> STEM.org accredited</li>
          <li><GiRocket className="icon" /> Prepared for W.R.O.</li>
        </ul>
      </div>

      {/* Example Projects */}
      <div className="projects-box">
        <h2><FaCogs className="icon" /> Example Projects:</h2>
        <ul>
          <li><FaRobot className="icon" /> Dancing robot</li>
          <li><GiRocket className="icon" /> Obstacle avoidance car</li>
          <li><FaRobot className="icon" /> Magic dragon</li>
          <li><GiBrain className="icon" /> Little dancer</li>
          <li><FaCogs className="icon" /> Rocket car</li>
        </ul>
      </div>

      {/* Pricing Section */}
      <div className="pricing-box">
        <h2><FaMoneyBillWave className="icon" /> Pricing:</h2>
        <div className="price-item"><FaMoneyBillWave className="icon" /><strong> Alpha A:</strong> ₹38,399</div>
        <div className="price-item"><FaMoneyBillWave className="icon" /><strong> Alpha B:</strong> ₹70,399</div>
        <div className="price-item"><FaMoneyBillWave className="icon" /><strong> Alpha C:</strong> ₹95,999</div>
      </div>

      {/* Enroll Button */}
      <a href="https://www.childtynker.com" target="_blank" rel="noopener noreferrer" className="enroll-btn">
         Enroll Now
      </a>
    </div>
  );
};

export default AlphaSeriesPackage;