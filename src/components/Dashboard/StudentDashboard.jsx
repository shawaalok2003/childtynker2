import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { doc, getDoc, updateDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import "./Dashboard.css";

const StudentDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        navigate('/login');
        return;
      }

      try {
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role !== 'student') {
            navigate('/login');
            return;
          }
          setUserData(userData);
          
          // Get available courses for students
          const coursesQuery = query(collection(db, "courses"));
          const coursesSnapshot = await getDocs(coursesQuery);
          const availableCourses = coursesSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setCourses(availableCourses);
          
          // Get student progress from user document
          setProgress(userData.progress || {});
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.clear();
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const startCourse = async (courseId) => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        navigate('/login');
        return;
      }

      // Update progress in the user's document
      const newProgress = {
        ...progress,
        [courseId]: {
          started: true,
          startDate: new Date().toISOString(),
          completed: false
        }
      };
      
      // Update the user document with progress
      await updateDoc(doc(db, "users", currentUser.uid), {
        progress: newProgress
      });
      
      setProgress(newProgress);
      // Navigate to course or show course content
      alert(`Starting ${courseId} course!`);
    } catch (error) {
      console.error("Error starting course:", error);
      alert("Failed to start course. Please try again.");
    }
  };

  const continueCourse = (courseId) => {
    alert(`Continuing ${courseId} course!`);
  };

  const viewCertificates = () => {
    navigate('/student/certificates');
  };

  const viewEnrollments = () => {
    navigate('/student/enrollments');
  };

  const viewAssignments = () => {
    navigate('/student/assignments');
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2>ChildTynker</h2>
        </div>
        <div className="nav-user">
          <span>Welcome, {userData?.name}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Student Dashboard</h1>
          <p>Welcome back! Ready to continue your learning journey?</p>
        </div>

        <div className="dashboard-grid">
          {/* Profile Section */}
          <div className="dashboard-card profile-card">
            <h3>My Profile</h3>
            <div className="profile-info">
              <p><strong>Name:</strong> {userData?.name}</p>
              <p><strong>Email:</strong> {userData?.email}</p>
              <p><strong>Phone:</strong> {userData?.phone}</p>
              <p><strong>Member Since:</strong> {new Date(userData?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Available Courses */}
          <div className="dashboard-card courses-card">
            <h3>Available Courses</h3>
            <div className="courses-list">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <div key={course.id} className="course-item">
                    <h4>{course.name}</h4>
                    <p>{course.description}</p>
                    <div className="course-actions">
                      {progress[course.id]?.started ? (
                        <button 
                          className="continue-btn"
                          onClick={() => continueCourse(course.id)}
                        >
                          Continue Course
                        </button>
                      ) : (
                        <button 
                          className="start-btn"
                          onClick={() => startCourse(course.id)}
                        >
                          Start Course
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No courses available yet. Check back soon!</p>
              )}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="dashboard-card progress-card">
            <h3>My Progress</h3>
            <div className="progress-stats">
              <div className="stat-item">
                <span className="stat-number">{Object.keys(progress).length}</span>
                <span className="stat-label">Courses Started</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {Object.values(progress).filter(p => p.completed).length}
                </span>
                <span className="stat-label">Courses Completed</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-card actions-card">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <button className="action-btn" onClick={() => navigate('/book')}>
                Book a Class
              </button>
              <button className="action-btn" onClick={() => navigate('/playzone')}>
                Enter Playzone
              </button>
              <button className="action-btn" onClick={viewEnrollments}>
                My Enrollments
              </button>
              <button className="action-btn" onClick={viewAssignments}>
                My Assignments
              </button>
              <button className="action-btn" onClick={viewCertificates}>
                View Certificates
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 