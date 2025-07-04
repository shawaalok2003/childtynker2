import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import "./Login.css"; // Make sure to create this CSS file

const carouselImages = [
  "https://cdn.pixabay.com/photo/2017/08/30/16/16/robot-2697683_1280.png",
  "https://cdn.pixabay.com/photo/2023/01/15/18/25/ai-generated-7720850_1280.jpg",
  "https://cdn.pixabay.com/photo/2024/06/07/17/12/robot-8815014_1280.jpg",
];

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Sign in with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Get user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Check if user role matches selected role
        if (userData.role !== formData.role) {
          setError(`This account is registered as a ${userData.role}, not a ${formData.role}`);
          return;
        }

        // Store user data in sessionStorage for current session only
        sessionStorage.setItem('userEmail', user.email);
        sessionStorage.setItem('userRole', userData.role);
        sessionStorage.setItem('userId', user.uid);

        // Navigate based on role
        if (userData.role === "student") {
          navigate("/dashboard/student");
        } else if (userData.role === "teacher") {
          navigate("/dashboard/teacher");
        } else if (userData.role === "admin") {
          navigate("/dashboard/admin");
        }
      } else {
        setError("User profile not found. Please contact support.");
      }
    } catch (err) {
      console.error("Login error:", err);
      switch (err.code) {
        case 'auth/user-not-found':
          setError("No account found with this email address.");
          break;
        case 'auth/wrong-password':
          setError("Incorrect password. Please try again.");
          break;
        case 'auth/invalid-email':
          setError("Invalid email address.");
          break;
        case 'auth/too-many-requests':
          setError("Too many failed attempts. Please try again later.");
          break;
        default:
          setError("Login failed. Please check your credentials and try again.");
      }
    } finally {
      setIsLoading(false);
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
          <select name="role" onChange={handleChange} value={formData.role}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
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
            type="password" 
            name="password" 
            placeholder="Password" 
            required 
            onChange={handleChange}
            value={formData.password}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
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