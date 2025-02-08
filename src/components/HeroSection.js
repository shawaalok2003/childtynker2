import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to registration page
import "./HeroSection.css";

const HeroSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const navigate = useNavigate();

  // Function to handle the "Book Your First Free Class" button click
  const handleBookingClick = () => {
    navigate("/register"); // Redirect to registration page
  };

  // Function to handle the "Download Curriculum" button click (opens the modal)
  const handleDownloadClick = () => {
    setIsModalOpen(true); // Open the modal to ask for email and phone number
  };

  // Function to validate email and phone number formats
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);

  // Function to handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validate email and phone before submission
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!isValidPhone(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsFormSubmitted(true); // After successful submission, allow download
    window.alert("Thank you! Your details have been submitted successfully.");
    downloadCurriculum(); // Trigger the download automatically
  };

  // Function to handle modal close action (in case user cancels or submits)
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal if user cancels or submits
  };

  // Function to trigger the download of the PDF automatically
  const downloadCurriculum = () => {
    const link = document.createElement("a");
    link.href = "/images/Course Overview PDF_ChildTynker (2).pdf";
    link.download = "Curriculum.pdf"; // Name of the file to download
    link.click(); // Trigger the download
    setIsModalOpen(false); // Close the modal
  };

  return (
    <section className="hero">
      <div className="hero__content">
        {/* Left Side: Text */}
        <div className="hero__text">
          <h1>
            Empower your child's future <span className="highlight">with robotics</span>
          </h1>
          <p>
            Let your child tynker, innovate, and experiment in our next-gen robotics & IoT program, paired with top tutors.
          </p>
          <button className="hero__button" onClick={handleBookingClick}>
            Book Your First Free Class
          </button>
          <button className="hero__button" onClick={handleDownloadClick}>
            Download Curriculum
          </button>
          <div className="hero__logo">
            <span>Including course material from Harvard Business Publishing</span>
          </div>
        </div>
      </div>

      {/* Modal to collect email and phone number */}
      {isModalOpen && !isFormSubmitted && (
        <div className="modal">
          <div className="modal__content">
            <h2>Download Curriculum</h2>
            <p>To download the curriculum, please provide your email and phone number.</p>
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
            <button onClick={handleCloseModal} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;