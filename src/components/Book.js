import React from "react";
import { InlineWidget } from "react-calendly";
import "./BookingPage.css";

const BookingPage = () => {
  return (
    <div className="booking-page">
      <h1>Book Your Free Class</h1>
      <p>Select your preferred time slot to get started:</p>
      <div className="calendly-widget">
        <InlineWidget url="https://calendly.com/classes-childtynker/new-meeting" />
      </div>
    </div>
  );
};

export default BookingPage;