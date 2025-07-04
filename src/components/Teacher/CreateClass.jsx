import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../../firebase/config";
import "./TeacherManagement.css";

const CreateClass = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: '',
    maxStudents: 20,
    price: 0,
    schedule: '',
    level: 'beginner',
    category: 'robotics'
  });
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        navigate('/login');
        return;
      }

      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate('/login');
    }
  };

  // Test Firebase connection
  const testFirebaseConnection = async () => {
    try {
      const testQuery = await getDocs(collection(db, "classes"));
      console.log("Firebase connection successful, found", testQuery.size, "classes");
      return true;
    } catch (error) {
      console.error("Firebase connection test failed:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Test Firebase connection first
      const isConnected = await testFirebaseConnection();
      if (!isConnected) {
        alert("Unable to connect to database. Please check your internet connection.");
        return;
      }

      // Validate required fields
      if (!formData.name.trim() || !formData.description.trim() || !formData.duration.trim()) {
        alert("Please fill in all required fields (Class Name, Description, and Duration).");
        return;
      }

      const currentUser = auth.currentUser;
      if (!currentUser || !userData) {
        alert("User session not found. Please login again.");
        navigate('/login');
        return;
      }

      const teacherId = currentUser.uid;
      const teacherName = userData.name || 'Unknown Teacher';

      // Clean up form data
      const cleanFormData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        duration: formData.duration.trim(),
        maxStudents: parseInt(formData.maxStudents) || 20,
        price: parseInt(formData.price) || 0,
        schedule: formData.schedule.trim(),
        level: formData.level,
        category: formData.category,
        prerequisites: formData.prerequisites?.trim() || '',
        materials: formData.materials?.trim() || ''
      };

      const newClass = {
        ...cleanFormData,
        teacherId,
        teacherName,
        createdAt: new Date().toISOString(),
        status: 'active',
        studentCount: 0,
        enrolledStudents: [],
        ratings: [],
        averageRating: 0
      };

      console.log("Attempting to create class with data:", newClass);

      const docRef = await addDoc(collection(db, "classes"), newClass);
      console.log("Class created successfully with ID:", docRef.id);
      
      alert("Class created successfully!");
      navigate('/dashboard/teacher');
    } catch (error) {
      console.error("Error creating class:", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
        stack: error.stack
      });
      
      if (error.code === 'permission-denied') {
        alert("Permission denied. Please check your account permissions.");
      } else if (error.code === 'unavailable') {
        alert("Service temporarily unavailable. Please try again later.");
      } else if (error.code === 'auth/user-not-found') {
        alert("User session expired. Please login again.");
        navigate('/login');
      } else {
        alert(`Error creating class: ${error.message || 'Unknown error occurred'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="teacher-management">
      <div className="teacher-header">
        <h1>Create New Class</h1>
        <button onClick={() => navigate('/dashboard/teacher')} className="back-btn">
          ← Back to Dashboard
        </button>
      </div>

      <div className="create-class-form">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Basic Information</h3>
            
            <div className="form-group">
              <label>Class Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., Robotics Fundamentals"
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Describe what students will learn in this class..."
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Duration *</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 8 weeks, 2 hours per session"
                />
              </div>
              <div className="form-group">
                <label>Maximum Students</label>
                <input
                  type="number"
                  name="maxStudents"
                  value={formData.maxStudents}
                  onChange={handleChange}
                  min="1"
                  max="50"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Class Details</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="robotics">Robotics</option>
                  <option value="coding">Coding</option>
                  <option value="electronics">Electronics</option>
                  <option value="iot">IoT</option>
                  <option value="ai">Artificial Intelligence</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Level</label>
                <select name="level" value={formData.level} onChange={handleChange}>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Schedule</label>
              <input
                type="text"
                name="schedule"
                value={formData.schedule}
                onChange={handleChange}
                placeholder="e.g., Every Saturday 10:00 AM - 12:00 PM"
              />
            </div>

            <div className="form-group">
              <label>Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                placeholder="0 for free classes"
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Class Requirements</h3>
            
            <div className="form-group">
              <label>Prerequisites</label>
              <textarea
                name="prerequisites"
                value={formData.prerequisites || ''}
                onChange={handleChange}
                rows="3"
                placeholder="What students should know before joining this class..."
              />
            </div>

            <div className="form-group">
              <label>Materials Needed</label>
              <textarea
                name="materials"
                value={formData.materials || ''}
                onChange={handleChange}
                rows="3"
                placeholder="List any materials or equipment students need..."
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Creating Class...' : 'Create Class'}
            </button>
            <button type="button" onClick={() => navigate('/dashboard/teacher')} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClass; 