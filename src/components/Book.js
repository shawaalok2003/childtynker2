import React, { useState, useEffect } from "react";
import { InlineWidget } from "react-calendly";
import "./BookingPage.css";

const BookingPage = () => {
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    // Get student data from localStorage
    const currentStudent = localStorage.getItem('currentStudent');
    if (currentStudent) {
      setStudentData(JSON.parse(currentStudent));
    }

    // Listen for Calendly events
    const handleCalendlyEventScheduled = (e) => {
      if (e.data.event && e.data.event.indexOf('calendly.event_scheduled') !== -1) {
        setIsBookingComplete(true);
        // Store booking completion status
        localStorage.setItem('bookingCompleted', 'true');
      }
    };

    window.addEventListener('message', handleCalendlyEventScheduled);

    return () => {
      window.removeEventListener('message', handleCalendlyEventScheduled);
    };
  }, []);

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  if (isBookingComplete) {
    return (
      <div className="booking-success-page">
        <div className="success-container">
          <div className="success-icon">✅</div>
          <h1>Booking Confirmed!</h1>
          <p>Thank you for booking your free class with ChildTynker!</p>
          
          {studentData && (
            <div className="student-info">
              <h3>Student Details:</h3>
              <p><strong>Name:</strong> {studentData.studentName}</p>
              <p><strong>Age:</strong> {studentData.studentAge} years</p>
              <p><strong>Mobile:</strong> {studentData.mobileNumber}</p>
            </div>
          )}
          
          <div className="next-steps">
            <h3>What's Next?</h3>
            <ul>
              <li>You'll receive a confirmation email with class details</li>
              <li>Join the class at your scheduled time</li>
              <li>Bring your enthusiasm and creativity!</li>
            </ul>
          </div>
          
          <button className="home-btn" onClick={handleBackToHome}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>Book Your Free Class</h1>
        <p>Select your preferred time slot to get started with robotics & coding!</p>
        
        {studentData && (
          <div className="student-welcome">
            <p>Welcome, <strong>{studentData.studentName}</strong>! Ready to start your adventure?</p>
          </div>
        )}
      </div>
      
      <div className="calendly-widget">
        <InlineWidget 
          url="https://calendly.com/classes-childtynker/new-meeting"
          styles={{
            height: '700px',
            width: '100%'
          }}
        />
      </div>
      
      <div className="booking-info">
        <h3>What to Expect:</h3>
        <ul>
          <li>🎯 Interactive 45-minute session</li>
          <li>🤖 Hands-on robotics experience</li>
          <li>💻 Basic coding introduction</li>
          <li>🎮 Fun learning activities</li>
          <li>📚 Course overview and next steps</li>
        </ul>
      </div>
    </div>
  );
};

export default BookingPage;