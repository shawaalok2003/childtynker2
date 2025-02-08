import React from 'react';
import './AchievementsSection.css'; // Import the CSS file

const AchievementsSection = () => {
  return (
    <div className="achievements-section">
      <div className="top-info">
        <div>
          <span className="new">For kids</span>
          <p>Age 3-16</p>
        </div>
        <div>
          <span className="new">Students</span>
          <p>1000+</p>
        </div>
        <div>
          <span className="new">Countries</span>
          <p>4</p>
        </div>
        <div>
          <span className="new">100+ reviews</span>
          <p>4.6/5 on Google & FB</p>
        </div>
      </div>

      <div className="achievements-details">
        <div className="achievement-card">
          
          <div className="logos">
            <img src="/images/awards.png" alt="Microsoft" />
          </div>
        </div>
        <div className="achievement-card">
          
          <div className="logos">
            <img src="/images/build.png" alt="India Book of Records" />
          </div>
        </div>
        <div className="achievement-card">
          <div className="logos">
            <img src="/images/stem.org.png" alt="STEM.org" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsSection;