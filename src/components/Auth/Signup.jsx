// FRONTEND: Signup.jsx
import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import "./Login.css";

const carouselImages = [
  "https://cdn.pixabay.com/photo/2017/08/30/16/16/robot-2697683_1280.png",
  "https://cdn.pixabay.com/photo/2023/01/15/18/25/ai-generated-7720850_1280.jpg",
  "https://cdn.pixabay.com/photo/2024/06/07/17/12/robot-8815014_1280.jpg",
];

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    phone: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // Create user with Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      const user = userCredential.user;

      // Create user profile in Firestore
      const userData = {
        uid: user.uid,
        name: formData.name.trim(),
        email: formData.email,
        role: formData.role,
        phone: formData.phone,
        createdAt: new Date().toISOString(),
        isActive: true
      };

      await setDoc(doc(db, "users", user.uid), userData);

      // Store minimal session data
      sessionStorage.setItem('userEmail', user.email);
      sessionStorage.setItem('userRole', formData.role);
      sessionStorage.setItem('userId', user.uid);

      // Navigate based on role
      if (formData.role === "student") {
        navigate("/dashboard/student");
      } else if (formData.role === "teacher") {
        navigate("/dashboard/teacher");
      } else if (formData.role === "admin") {
        navigate("/dashboard/admin");
      }

    } catch (err) {
      console.error("Signup error:", err);
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError("An account with this email already exists.");
          break;
        case 'auth/invalid-email':
          setError("Invalid email address.");
          break;
        case 'auth/weak-password':
          setError("Password is too weak. Please choose a stronger password.");
          break;
        default:
          setError("Signup failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="login-wrapper">
      <div className="form-container">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name" 
            placeholder="Full Name" 
            required 
            onChange={handleChange}
            value={formData.name}
          />
          <select name="role" onChange={handleChange} value={formData.role}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            required 
            onChange={handleChange}
            value={formData.email}
          />
          <input 
            type="tel" 
            name="phone" 
            placeholder="Phone Number" 
            required 
            onChange={handleChange}
            value={formData.phone}
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password (min 6 characters)" 
            required 
            onChange={handleChange}
            value={formData.password}
          />
          <input 
            type="password" 
            name="confirmPassword" 
            placeholder="Confirm Password" 
            required 
            onChange={handleChange}
            value={formData.confirmPassword}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        <p className="signup-text">
          Already have an account? <a href="/login">Login</a>
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

export default Signup;