import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";

const HeroSection = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [showTrialPopup, setShowTrialPopup] = useState(false);
  const [showPlayzonePopup, setShowPlayzonePopup] = useState(false);

  // Text switching between "robotics" and "coding"
  const options = ["robotics", "coding"];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % options.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Popup timers
  useEffect(() => {
    // Trial class popup after 3 seconds
    const trialTimer = setTimeout(() => {
      setShowTrialPopup(true);
    }, 3000);

    // Playzone popup after 10 seconds
    const playzoneTimer = setTimeout(() => {
      setShowPlayzonePopup(true);
    }, 10000);

    return () => {
      clearTimeout(trialTimer);
      clearTimeout(playzoneTimer);
    };
  }, []);

  // Navigation to registration page
  const handleBookingClick = () => {
    navigate("/register");
  };

  // Open modal for curriculum download
  const handleDownloadClick = () => {
    setIsModalOpen(true);
  };

  // Close trial popup
  const handleCloseTrialPopup = () => {
    setShowTrialPopup(false);
  };

  // Close playzone popup
  const handleClosePlayzonePopup = () => {
    setShowPlayzonePopup(false);
  };

  // Handle trial class booking
  const handleTrialBooking = () => {
    setShowTrialPopup(false);
    navigate("/register");
  };

  // Handle playzone navigation
  const handlePlayzoneClick = () => {
    setShowPlayzonePopup(false);
    // Navigate to playzone or open playzone functionality
    window.open("/playzone", "_blank");
  };

  // Email and phone validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!isValidPhone(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsFormSubmitted(true);
    window.alert("Thank you! Your details have been submitted successfully.");
    downloadCurriculum();
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Trigger the curriculum PDF download
  const downloadCurriculum = () => {
    const link = document.createElement("a");
    link.href = "/images/Course Overview PDF_ChildTynker (2).pdf";
    link.download = "Curriculum.pdf";
    link.click();
    setIsModalOpen(false);
  };

  return (
    <section className="hero">
      <div className="hero__content">
        {/* Hero Text with Dynamic Effect */}
        <div className="hero__text">
          <h1>
            Empower your child's future with{" "}
            <span className="highlight fade-effect">
              {options[textIndex]}
            </span>
          </h1>
          <p>
            Let your child tynker, innovate, and experiment in our next-gen{" "}
            {options[textIndex]} & IoT program, paired with top tutors.
          </p>
          <div className="hero__image">
          <img src="/images/boy.png" alt="Hero" />
        </div>
          <button className="hero1" onClick={handleBookingClick}>
            Book Your First Free Class
          </button>
          <button className="hero1" onClick={handleDownloadClick}>
            Download Curriculum
          </button>
          <div className="hero__logo">
            <span>
              Including course material from Harvard Business Publishing
            </span>
          </div>
        </div>
      </div>

      {/* Trial Class Popup */}
      {showTrialPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="popup-close" onClick={handleCloseTrialPopup}>×</button>
            <h2>🎉 Special Offer!</h2>
            <p>Book your child's first trial class today and discover the world of robotics & coding!</p>
            <div className="popup-buttons">
              <button className="popup-btn primary" onClick={handleTrialBooking}>
                Book Trial Class Now
              </button>
              <button className="popup-btn secondary" onClick={handleCloseTrialPopup}>
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Playzone Popup */}
      {showPlayzonePopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="popup-close" onClick={handleClosePlayzonePopup}>×</button>
            <h2>🎮 Ready to Play?</h2>
            <p>Explore our interactive playzone where learning meets fun! Let your child experiment with coding and robotics in a safe environment.</p>
            <div className="popup-buttons">
              <button className="popup-btn primary" onClick={handlePlayzoneClick}>
                Enter Playzone
              </button>
              <button className="popup-btn secondary" onClick={handleClosePlayzonePopup}>
                Not Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Email & Phone Input */}
      {isModalOpen && !isFormSubmitted && (
        <div className="modal">
          <div className="modal__content">
            <h2>Download Curriculum</h2>
            <p>
              To download the curriculum, please provide your email and phone
              number.
            </p>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </form>
            <button onClick={handleCloseModal} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;