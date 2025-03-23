import React from 'react';
import './AchievementsSection.css'; // Import the CSS file

const AchievementsSection = () => {
  return (
    <div className="achievements-section">
      {/* Top Info Section */}
      <div className="top-info">
      <div>
          <img src="/images/For kids Age 3-16 yr-min.png" alt="Students" />
          <p>3 to 16 Years Kids</p>
        </div>
        <div>
          <img src="/images/Students (2)-min.png" alt="Students" />
          <p>160+ Students</p>
        </div>
        <div>
          <img src="/images/countries 1-min.png" alt="Countries" />
          <p>3 Countries</p>
        </div>
        <div>
          <img src="/images/rating-min.png" alt="Reviews" />
          <p>100+ reviews</p>
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
          <img
          src="/images/AWARDES & ACCOLADES.png"
          alt="India Book of Records"
          style={{
            width: "120px",
            height: "auto",
            maxWidth: "100%",
          }}
        />
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
            <img src="/images/ACCREDITED BY.png" alt="STEM.org Certified" />
          </div>
        </div>
      </div>

      {/* Product Built by an Alumni */}
      </div>
  );
};

export default AchievementsSection;
