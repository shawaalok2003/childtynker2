import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to course selection page
import "./RegistrationPage.css"; // Add styles here

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // Parent details
  const [occupation, setOccupation] = useState("");
  const [relationship, setRelationship] = useState("");
  
  // Child details
  const [childName, setChildName] = useState("");
  const [childAge, setChildAge] = useState("");
  const [childGender, setChildGender] = useState("");
  const [childInterests, setChildInterests] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can process or send the registration details here if needed
    navigate("/select-course"); // Navigate to course selection page
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

        

        <div className="form-group">
          <label>Child Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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

        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default RegistrationPage;