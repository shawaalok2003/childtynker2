import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import "./CreateAdmin.css";

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return false;
    }
    if (!formData.name.trim()) {
      setMessage("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setMessage("Email is required");
      return false;
    }
    return true;
  };

  const createAdmin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Create admin profile in Firestore
      const adminData = {
        uid: user.uid,
        name: formData.name.trim(),
        email: formData.email,
        role: "admin",
        phone: formData.phone,
        createdAt: new Date().toISOString(),
        isActive: true,
        permissions: ["manage_users", "manage_classes", "view_reports", "system_settings"]
      };

      await setDoc(doc(db, "users", user.uid), adminData);

      setMessage("✅ Admin user created successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: ""
      });

      console.log("Admin created:", adminData);

    } catch (error) {
      console.error("Error creating admin:", error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setMessage("❌ An account with this email already exists");
          break;
        case 'auth/invalid-email':
          setMessage("❌ Invalid email address");
          break;
        case 'auth/weak-password':
          setMessage("❌ Password is too weak");
          break;
        default:
          setMessage("❌ Error creating admin: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-admin-container">
      <div className="create-admin-card">
        <h2>Create Admin User</h2>
        <p className="warning">
          ⚠️ This will create a new admin user with full platform access
        </p>

        {message && (
          <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <form onSubmit={createAdmin}>
          <div className="form-group">
            <label>Admin Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter admin name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@childtynker.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />
          </div>

          <button 
            type="submit" 
            className="create-admin-btn"
            disabled={loading}
          >
            {loading ? "Creating Admin..." : "Create Admin User"}
          </button>
        </form>

        <div className="admin-info">
          <h3>Admin Permissions:</h3>
          <ul>
            <li>✅ Manage all users (students, teachers, admins)</li>
            <li>✅ Create and manage classes</li>
            <li>✅ View platform statistics and reports</li>
            <li>✅ Access system settings</li>
            <li>✅ Monitor platform health</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateAdmin; 