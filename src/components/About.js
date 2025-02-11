import React from "react";
import { FaMedal, FaGlobe, FaBookOpen } from "react-icons/fa"; // React Icons
import './About.css'; // CSS file for styling

const ChildTynker = () => {
  return (
    <div className="container">
      <h1 className="title1">
        Why choose <span className="highlight1">ChildTynker</span>
      </h1>
      <div className="features">
        {/* Feature 1 */}
        <div className="feature-card">
          <FaMedal className="feature-icon" />
          <h2 className="feature-title">Top 1% Global Educators</h2>
          <p className="feature-description">
            Our educators are rigorously trained to inspire and nurture children's curiosity, creativity, and learning abilities.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="feature-card">
          <FaBookOpen className="feature-icon" />
          <h2 className="feature-title">Futuristic Curriculum</h2>
          <p className="feature-description">
            Expert-designed curriculum aligned with global standards, focused on robotics, coding, and AI for real-world applications.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="feature-card">
          <FaGlobe className="feature-icon" />
          <h2 className="feature-title">Global Learning Arena</h2>
          <p className="feature-description">
            Join a community of 1M+ future innovators and gain access to international competitions, hackathons, and challenges.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChildTynker;