import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationPage.css";

const carouselImages = [
  "https://cdn.pixabay.com/photo/2017/08/30/16/16/robot-2697683_1280.png",
  "https://cdn.pixabay.com/photo/2023/01/15/18/25/ai-generated-7720850_1280.jpg",
  "https://cdn.pixabay.com/photo/2024/06/07/17/12/robot-8815014_1280.jpg",
];

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Simplified form fields
  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Carousel Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Validation functions
  const isValidName = (name) => name.trim().length >= 2;
  const isValidAge = (age) => age >= 3 && age <= 16;
  const isValidMobile = (mobile) => /^\d{10}$/.test(mobile);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!isValidName(studentName)) {
      alert("Please enter a valid student name (at least 2 characters)");
      return;
    }
    
    if (!isValidAge(studentAge)) {
      alert("Please enter a valid age between 3 and 16 years");
      return;
    }
    
    if (!isValidMobile(mobileNumber)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsSubmitting(true);

    try {
      // Store registration data
      const registrationData = {
        studentName: studentName.trim(),
        studentAge: parseInt(studentAge),
        mobileNumber: mobileNumber,
        registrationDate: new Date().toISOString(),
        id: Date.now() // Simple unique ID
      };

      // Store in localStorage
      const existingRegistrations = JSON.parse(localStorage.getItem('studentRegistrations') || '[]');
      existingRegistrations.push(registrationData);
      localStorage.setItem('studentRegistrations', JSON.stringify(existingRegistrations));

      // Also store current student data for session
      localStorage.setItem('currentStudent', JSON.stringify(registrationData));

      console.log("Registration data stored:", registrationData);
      
      // Show success message
      alert("Registration successful! Welcome to ChildTynker!");
      
      // Navigate to course selection or dashboard
      navigate("/booking");
      
    } catch (error) {
      console.error("Error storing registration data:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registration-wrapper">
      <div className="form-container">
        <h2>Student Registration</h2>
        <p className="subtitle">Join our robotics & coding adventure!</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Student Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
              minLength="2"
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              placeholder="Student Age (3-16 years)"
              min="3"
              max="16"
              value={studentAge}
              onChange={(e) => setStudentAge(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              placeholder="Mobile Number (10 digits)"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
              required
              maxLength="10"
              pattern="[0-9]{10}"
            />
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register for Free Class"}
          </button>
        </form>
        
        <p className="login-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>

      <div className="registration-carousel-container">
        <img
          src={carouselImages[currentImageIndex]}
          alt="carousel"
          className="registration-carousel-image"
        />
      </div>
    </div>
  );
};

export default RegistrationPage;