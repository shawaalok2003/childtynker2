import React, { useState, useEffect } from "react";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import "./StudentManagement.css";

const StudentEnrollment = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEnrollmentData();
  }, []);

  const fetchEnrollmentData = async () => {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        navigate('/login');
        return;
      }

      // Get user data
      const userDoc = await getDoc(doc(db, "users", currentUser.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
        setEnrollments(userDoc.data().enrollments || []);
      }

      // Get available courses
      const coursesSnapshot = await getDocs(collection(db, "courses"));
      const coursesList = coursesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAvailableCourses(coursesList);

      // Get available classes
      const classesSnapshot = await getDocs(collection(db, "classes"));
      const classesList = classesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAvailableClasses(classesList);

    } catch (error) {
      console.error("Error fetching enrollment data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTeacherName = async (teacherId) => {
    try {
      const teacherDoc = await getDoc(doc(db, "users", teacherId));
      if (teacherDoc.exists()) {
        const teacherData = teacherDoc.data();
        return `${teacherData.firstName} ${teacherData.lastName}`;
      }
      return "Unknown Teacher";
    } catch (error) {
      return "Unknown Teacher";
    }
  };

  const getCourseDetails = (courseId) => {
    return availableCourses.find(course => course.id === courseId);
  };

  const getClassDetails = (classId) => {
    return availableClasses.find(cls => cls.id === classId);
  };

  const calculateProgress = (enrollment) => {
    // Mock progress calculation - in real app, this would be based on completed lessons/assignments
    const progress = Math.floor(Math.random() * 100);
    return Math.min(progress, 100);
  };

  if (loading) {
    return (
      <div className="student-loading">
        <div className="loading-spinner"></div>
        <p>Loading enrollment data...</p>
      </div>
    );
  }

  return (
    <div className="student-management">
      <div className="student-header">
        <h1>My Enrollments</h1>
        <button onClick={() => navigate('/dashboard/student')} className="back-btn">
          ← Back to Dashboard
        </button>
      </div>

      <div className="enrollment-overview">
        <div className="stats-cards">
          <div className="stat-card">
            <span className="stat-number">{enrollments.length}</span>
            <span className="stat-label">Total Enrollments</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {enrollments.filter(e => e.type === "course").length}
            </span>
            <span className="stat-label">Courses</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">
              {enrollments.filter(e => e.type === "class").length}
            </span>
            <span className="stat-label">Classes</span>
          </div>
        </div>
      </div>

      <div className="enrollments-section">
        <h2>My Enrolled Items</h2>
        
        {enrollments.length > 0 ? (
          <div className="enrollments-grid">
            {enrollments.map((enrollment, index) => {
              const itemDetails = enrollment.type === "course" 
                ? getCourseDetails(enrollment.id)
                : getClassDetails(enrollment.id);
              
              const progress = calculateProgress(enrollment);

              return (
                <div key={index} className="enrollment-card">
                  <div className="enrollment-header">
                    <h3>{enrollment.name}</h3>
                    <span className={`enrollment-type ${enrollment.type}`}>
                      {enrollment.type.toUpperCase()}
                    </span>
                  </div>

                  <div className="enrollment-details">
                    {itemDetails && (
                      <>
                        <p><strong>Description:</strong> {itemDetails.description || "No description available"}</p>
                        <p><strong>Price:</strong> ₹{itemDetails.price?.toLocaleString() || "N/A"}</p>
                        <p><strong>Duration:</strong> {itemDetails.duration || "N/A"}</p>
                        {itemDetails.level && (
                          <p><strong>Level:</strong> {itemDetails.level}</p>
                        )}
                      </>
                    )}

                    <p><strong>Teacher:</strong> {enrollment.teacherName || "Assigned"}</p>
                    <p><strong>Enrolled:</strong> {new Date(enrollment.enrolledAt).toLocaleDateString()}</p>
                  </div>

                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="enrollment-actions">
                    <button className="view-btn">
                      View {enrollment.type === "course" ? "Course" : "Class"}
                    </button>
                    <button className="materials-btn">
                      Learning Materials
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-enrollments">
            <p>You haven't enrolled in any courses or classes yet.</p>
            <p>Contact your admin to get enrolled in courses.</p>
          </div>
        )}
      </div>

      <div className="available-items">
        <h2>Available Courses & Classes</h2>
        <div className="items-grid">
          <div className="courses-section">
            <h3>Available Courses</h3>
            {availableCourses.length > 0 ? (
              <div className="items-list">
                {availableCourses.map(course => (
                  <div key={course.id} className="item-card">
                    <h4>{course.name}</h4>
                    <p>{course.description}</p>
                    <p><strong>Price:</strong> ₹{course.price?.toLocaleString()}</p>
                    <p><strong>Duration:</strong> {course.duration}</p>
                    {course.level && <p><strong>Level:</strong> {course.level}</p>}
                    <button className="request-btn">
                      Request Enrollment
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No courses available.</p>
            )}
          </div>

          <div className="classes-section">
            <h3>Available Classes</h3>
            {availableClasses.length > 0 ? (
              <div className="items-list">
                {availableClasses.map(cls => (
                  <div key={cls.id} className="item-card">
                    <h4>{cls.name}</h4>
                    <p>{cls.description}</p>
                    <p><strong>Price:</strong> ₹{cls.price?.toLocaleString()}</p>
                    <p><strong>Schedule:</strong> {cls.schedule}</p>
                    <p><strong>Teacher:</strong> {cls.teacherName || "TBD"}</p>
                    <button className="request-btn">
                      Request Enrollment
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No classes available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEnrollment; 