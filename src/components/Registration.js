import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegistrationPage.css";

const RegistrationPage = () => {
  const navigate = useNavigate();

  // Parent details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [occupation, setOccupation] = useState("");
  const [relationship, setRelationship] = useState("");

  // Child details
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [childGender, setChildGender] = useState("");
  const [childInterests, setChildInterests] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Optional: Validate or send form data to backend

    // Navigate to course selection
    navigate("/select-course");
  };

  return (
    <div className="registration-page">
      <h1>Register for Your Free Class</h1>
      <form onSubmit={handleSubmit}>
        {/* Parent Details */}
        <div className="form-group">
          <label>Name (Parent/Guardian):</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        {/* Optional Fields */}
        <div className="form-group">
          <label>Occupation:</label>
          <input
            type="text"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Relationship to Child:</label>
          <input
            type="text"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
          />
        </div>

        {/* Child Details */}
        <div className="form-group">
          <label>Child Name:</label>
          <input
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Child Age:</label>
          <input
            type="number"
            min="1"
            value={childAge}
            onChange={(e) => setChildAge(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Child's Gender:</label>
          <select
            value={childGender}
            onChange={(e) => setChildGender(e.target.value)}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Next
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;