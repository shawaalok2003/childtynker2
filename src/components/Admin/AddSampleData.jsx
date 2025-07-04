import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import "./AdminManagement.css";

const AddSampleData = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const addSampleCourses = async () => {
    setLoading(true);
    setMessage("");

    try {
      const sampleCourses = [
        {
          name: "Introduction to Programming",
          description: "Learn the basics of programming with fun, interactive lessons",
          price: 1500,
          duration: "8 weeks",
          level: "Beginner",
          category: "Programming",
          createdAt: new Date().toISOString()
        },
        {
          name: "Web Development Fundamentals",
          description: "Build your first website with HTML, CSS, and JavaScript",
          price: 2000,
          duration: "10 weeks",
          level: "Intermediate",
          category: "Web Development",
          createdAt: new Date().toISOString()
        },
        {
          name: "Python for Kids",
          description: "Learn Python programming through games and projects",
          price: 1800,
          duration: "12 weeks",
          level: "Beginner",
          category: "Programming",
          createdAt: new Date().toISOString()
        },
        {
          name: "Mobile App Development",
          description: "Create your own mobile apps using modern tools",
          price: 2500,
          duration: "14 weeks",
          level: "Advanced",
          category: "Mobile Development",
          createdAt: new Date().toISOString()
        }
      ];

      for (const course of sampleCourses) {
        await addDoc(collection(db, "courses"), course);
      }

      setMessage("Sample courses added successfully!");
    } catch (error) {
      console.error("Error adding sample courses:", error);
      setMessage("Error adding sample courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const addSampleClasses = async () => {
    setLoading(true);
    setMessage("");

    try {
      const sampleClasses = [
        {
          name: "Coding Club - Beginners",
          description: "Weekly coding sessions for beginners",
          price: 500,
          schedule: "Every Saturday, 10:00 AM",
          maxStudents: 15,
          status: "active",
          teacherName: "TBD",
          studentCount: 0,
          createdAt: new Date().toISOString()
        },
        {
          name: "Advanced Programming Workshop",
          description: "Advanced programming concepts and projects",
          price: 800,
          schedule: "Every Sunday, 2:00 PM",
          maxStudents: 10,
          status: "active",
          teacherName: "TBD",
          studentCount: 0,
          createdAt: new Date().toISOString()
        },
        {
          name: "Game Development Class",
          description: "Learn to create your own games",
          price: 1200,
          schedule: "Every Friday, 4:00 PM",
          maxStudents: 12,
          status: "active",
          teacherName: "TBD",
          studentCount: 0,
          createdAt: new Date().toISOString()
        }
      ];

      for (const classItem of sampleClasses) {
        await addDoc(collection(db, "classes"), classItem);
      }

      setMessage("Sample classes added successfully!");
    } catch (error) {
      console.error("Error adding sample classes:", error);
      setMessage("Error adding sample classes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-management">
      <div className="admin-header">
        <h1>Add Sample Data</h1>
        <p>Add sample courses and classes for testing</p>
      </div>

      <div className="sample-data-section">
        <div className="data-card">
          <h3>Sample Courses</h3>
          <p>Add sample courses to the database for testing purposes.</p>
          <button 
            onClick={addSampleCourses} 
            disabled={loading}
            className="add-btn"
          >
            {loading ? "Adding..." : "Add Sample Courses"}
          </button>
        </div>

        <div className="data-card">
          <h3>Sample Classes</h3>
          <p>Add sample classes to the database for testing purposes.</p>
          <button 
            onClick={addSampleClasses} 
            disabled={loading}
            className="add-btn"
          >
            {loading ? "Adding..." : "Add Sample Classes"}
          </button>
        </div>
      </div>

      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="info-section">
        <h3>What this does:</h3>
        <ul>
          <li>Creates sample courses with realistic data</li>
          <li>Creates sample classes with schedules</li>
          <li>All data is properly structured for the application</li>
          <li>Students can now see and interact with these courses</li>
        </ul>
      </div>
    </div>
  );
};

export default AddSampleData; 