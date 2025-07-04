import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Make sure to create this CSS file

const carouselImages = [
  "https://cdn.pixabay.com/photo/2017/08/30/16/16/robot-2697683_1280.png",
  "https://cdn.pixabay.com/photo/2023/01/15/18/25/ai-generated-7720850_1280.jpg",
  "https://cdn.pixabay.com/photo/2024/06/07/17/12/robot-8815014_1280.jpg",
];

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://childtynker-backend-3.onrender.com/api/login", formData);
      localStorage.setItem('userEmail', formData.email);
      if (formData.role === "student") {
        navigate("/dashboard/student");
      } else if (formData.role === "teacher") {
        navigate("/dashboard/teacher");
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  // Carousel Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="login-wrapper">
      <div className="form-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <select name="role" onChange={handleChange}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <button type="submit">Login</button>
        </form>
        <p className="signup-text">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>

      <div className="login-carousel-container">
        <img
          src={carouselImages[currentImageIndex]}
          alt="carousel"
          className="login-carousel-image"
        />
      </div>
    </div>
  );
};

export default Login;