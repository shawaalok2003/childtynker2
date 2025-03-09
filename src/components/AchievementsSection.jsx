import React from 'react';
import './AchievementsSection.css'; // Import the CSS file

const AchievementsSection = () => {
  return (
    <div className="achievements-section">
      {/* Top Info Section */}
      <div className="top-info">
      <div>
          <img src="/images/For kids Age 3-16 yr.png" alt="Students" />
          <p>3 to 16 Years Kids</p>
        </div>
        <div>
          <img src="/images/Students (2).png" alt="Students" />
          <p>1000+ Students</p>
        </div>
        <div>
          <img src="/images/countries 1.png" alt="Countries" />
          <p>4 Countries</p>
        </div>
        <div>
          <img src="/images/rating.png" alt="Reviews" />
          <p>1000+ reviews</p>
          <p> 4.6/5 on Google & FB</p>
        </div>
      </div>

      {/* Achievements Details Section */}
      <div className="achievements-details">
        <div className="achievement-card">
          <div className="logos">
            <img src="/images/awards.png" alt="Microsoft Award" />
          </div>
        </div>
        <div className="achievement-card">
          <div className="logos">
            <img src="/images/build.png" alt="India Book of Records" />
          </div>
        </div>
        <div className="achievement-card">
          <div className="logos">
            <img src="/images/stem.org.png" alt="STEM.org Certified" />
          </div>
        </div>
      </div>

      {/* Product Built by an Alumni */}
      <div className="alumni-info">
        <h3>Product built by an Alumni</h3>
        <p> IIT Delhi, NIT Jalandhar</p>
        <p> Company</p>
        <img src="/images/WhatsApp Image 2025-03-09 at 15.06.34.jpeg" alt="DPIIT Certificate" />
        <img src="/images/WhatsApp Image 2025-03-09 at 15.07.52.jpeg" alt="NITI Aayog" />
      </div>

      {/* Recognized by Section */}
      <div className="recognized-by">
        <h3>Recognized by</h3>
        <div className="recognition-logos">
          <img src="/images/Screenshot 2025-03-10 001909.png" alt="DPIIT Certificate" />
        </div>
      </div>
    </div>
  );
};

export default AchievementsSection;
