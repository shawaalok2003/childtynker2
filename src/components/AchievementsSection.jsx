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
        <h3 style={{
          backgroundColor: "#93339e",
          color: "white",
          padding: "10px ",
          borderRadius: "10px",
          fontSize: "18px",
          fontWeight: "bold",
          display: "inline-block",
         
        }}>
          Product built by an Alumni of
        </h3>
          <div className="logos">
            <img src="/images/Group 13 .png" alt="Microsoft Award" />
          </div>
        </div>
        
        <div className="achievement-card">
        <h3 style={{
          backgroundColor: "#93339e",
          color: "white",
          padding: "10px ",
          borderRadius: "10px",
          fontSize: "18px",
          fontWeight: "bold",
          display: "inline-block",
         
        }}>
          Awards
        </h3>
          <div className="logos">
            <img src="/images/AWARDES & ACCOLADES.png" alt="India Book of Records" />
          </div>
        </div>
        <div className="achievement-card">
        <h3 style={{
          backgroundColor: "#93339e",
          color: "white",
          padding: "10px ",
          borderRadius: "10px",
          fontSize: "18px",
          fontWeight: "bold",
          display: "inline-block",
         
        }}>
        Accredited by
        </h3>
          <div className="logos">
            <img src="/images/ACCREDITED BY (1).png" alt="STEM.org Certified" />
          </div>
        </div>
      </div>

      {/* Product Built by an Alumni */}
      </div>
  );
};

export default AchievementsSection;
