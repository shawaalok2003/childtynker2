import React from "react";
import "./FeaturesCertificates.css"; // Import the CSS file

const FeaturesCertificates = () => {
  return (
    <div className="container">
      <section className="features">
        <h2 className="title">FEATURES</h2>
        <div
  className="features-grid"
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
    textAlign: "center",
  }}
>
  <div
    className="feature-card"
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    }}
  >
    <img
      src="/images/An opportunity to Showcase your Project in Near by IITNITs Campus.-min.png"
      alt="Showcase Project"
      style={{ width: "80px", height: "auto", marginBottom: "10px" }}
    />
    <h3 className="feature-number" style={{ fontSize: "24px", margin: "10px 0" }}>1</h3>
    <p>An opportunity to showcase your project in nearby IIT/NITs campus.</p>
  </div>

  <div
    className="feature-card"
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    }}
  >
    <img
      src="/images/Completely Hands-on and Real-life projects and get Certificate Accredited by STEM.org-min_2_11zon.png"
      alt="Certificate"
      style={{ width: "80px", height: "auto", marginBottom: "10px" }}
    />
    <h3 className="feature-number" style={{ fontSize: "24px", margin: "10px 0" }}>2</h3>
    <p>
      Completely Hands-on and real-life projects and get a Certificate{" "}
      <span className="highlight">"Accredited by STEM.org"</span>
    </p>
  </div>

  <div
    className="feature-card"
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    }}
  >
    <img
      src="/images/Dive into 11 Live Personalized, Interactive Sessions with Verified Tutors 4.5+ ratings, with the suppo.png"
      alt="Live Sessions"
      style={{ width: "80px", height: "auto", marginBottom: "10px" }}
    />
    <h3 className="feature-number" style={{ fontSize: "24px", margin: "10px 0" }}>3</h3>
    <p>
      Dive into 1:1 Live Personalized, Interactive Sessions with Verified Tutors
      4.5+ ratings, with the support of{" "}
      <span className="highlight">Dual Teacher Model</span>.
    </p>
  </div>

  <div
    className="feature-card"
    style={{
      background: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    }}
  >
    <img
      src="/images/Trainers from IITNITs Only or Having 5+Yrs. Exp.-min_5_11zon.png"
      alt="Trainers"
      style={{ width: "80px", height: "auto", marginBottom: "10px" }}
    />
    <h3 className="feature-number" style={{ fontSize: "24px", margin: "10px 0" }}>4</h3>
    <p>
      Trainers from <span className="highlight">IIT/NITs</span> Only or Having
      5+ Yrs. Exp.
    </p>
  </div>
</div>
      </section>

      <section
  style={{
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    fontFamily: "Arial, sans-serif",
  }}
>
  <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>
    CERTIFICATES
  </h2>
  <div
    style={{
      maxWidth: "500px",
      margin: "20px auto",
      padding: "15px",
      borderRadius: "10px",
      backgroundColor: "#fff",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "left",
    }}
  >
    <img
      src="/images/Image Gallery-20250306T121018Z-001/Image Gallery/Sample Certificate (1).png"
      alt="Certificate"
      style={{
        width: "100%",
        borderRadius: "8px",
        marginBottom: "15px",
      }}
    />
  </div>
</section>
    </div>
  );
};

export default FeaturesCertificates;