import React from "react";
import "./FeaturesCertificates.css"; // Import the CSS file

const FeaturesCertificates = () => {
  return (
    <div className="container">
      <section className="features">
        <h2 className="title">FEATURES</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3 className="feature-number">1</h3>
            <p>
              An opportunity to Showcase your Project in Near by IIT/NITs
              Campus.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-number">2</h3>
            <p>
              Completely Hands-on and Real-life projects and get Certificate{" "}
              <span className="highlight">"Accredited by STEM.org"</span>
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-number">3</h3>
            <p>
              Dive into 1:1 Live Personalized, Interactive Sessions with
              Verified Tutors 4.5+ ratings, with the support of{" "}
              <span className="highlight">Dual Teacher Model</span>.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-number">4</h3>
            <p>
              Trainers from <span className="highlight">IIT/NITs</span> Only or
              Having 5+Yrs. Exp.
            </p>
          </div>
        </div>
      </section>

      <section className="certificates">
        <h2 className="title">CERTIFICATES</h2>
        <div className="certificate-card">
          <h3 className="certificate-title">Junior IOT Engineer</h3>
          <h2 className="certificate-name">Isabel Mercado</h2>
          <p className="certificate-text">
            In recognition of triumphant completion of the curiosity course
            <br />
            <span className="highlight">
              (Certified Expertise in Internet of Things)
            </span>
          </p>
          <p className="certificate-date">27th July 2024</p>
          <p className="certificate-director">Sanjeev, Director</p>
          <p className="certificate-tag">#startupindia</p>
        </div>
      </section>
    </div>
  );
};

export default FeaturesCertificates;