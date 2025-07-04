import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import "./Dashboard.css";

const TeacherDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        console.log("No current user found, redirecting to login");
        navigate('/login');
        return;
      }

      console.log("Current user:", currentUser.uid);

      try {
        // Get teacher data from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        console.log("User document exists:", userDoc.exists());
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log("User data:", userData);
          
          if (userData.role !== 'teacher') {
            console.log("User role is not teacher:", userData.role);
            navigate('/login');
            return;
          }
          setUserData(userData);
          
          // Get teacher's students
          try {
            const studentsQuery = query(
              collection(db, "users"),
              where("teacherId", "==", currentUser.uid)
            );
            const studentsSnapshot = await getDocs(studentsQuery);
            const studentsList = studentsSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            console.log("Students found:", studentsList.length);
            setStudents(studentsList);
          } catch (studentsError) {
            console.error("Error fetching students:", studentsError);
            setStudents([]);
          }

          // Get teacher's classes
          try {
            const classesQuery = query(
              collection(db, "classes"),
              where("teacherId", "==", currentUser.uid)
            );
            const classesSnapshot = await getDocs(classesQuery);
            const classesList = classesSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            console.log("Classes found:", classesList.length);
            setClasses(classesList);
          } catch (classesError) {
            console.error("Error fetching classes:", classesError);
            setClasses([]);
          }
        } else {
          console.log("User document does not exist");
          navigate('/login');
        }
      } catch (error) {
        console.error("Error fetching teacher data:", error);
        console.error("Error details:", {
          code: error.code,
          message: error.message,
          stack: error.stack
        });
        
        // Don't redirect on permission errors, just show empty data
        if (error.code === 'permission-denied') {
          console.log("Permission denied, showing empty dashboard");
          setStudents([]);
          setClasses([]);
        } else {
          navigate('/login');
        }
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

  const createClass = () => {
    navigate('/create-class');
  };

  const viewStudent = (studentId) => {
    navigate(`/student/${studentId}`);
  };

  const scheduleSession = () => {
    navigate('/schedule-session');
  };

  const viewReports = () => {
    navigate('/teacher-reports');
  };

  const manageContent = () => {
    navigate('/manage-content');
  };

  const viewWallet = () => {
    navigate('/teacher-wallet');
  };

  const viewAssignments = () => {
    navigate('/teacher-assignments');
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
          <h1>Teacher Dashboard</h1>
          <p>Manage your students and classes</p>
        </div>

        <div className="dashboard-grid">
          {/* Profile Section */}
          <div className="dashboard-card profile-card">
            <h3>My Profile</h3>
            <div className="profile-info">
              <p><strong>Name:</strong> {userData?.name}</p>
              <p><strong>Email:</strong> {userData?.email}</p>
              <p><strong>Phone:</strong> {userData?.phone}</p>
              <p><strong>Teacher Since:</strong> {new Date(userData?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Students Overview */}
          <div className="dashboard-card students-card">
            <h3>My Students ({students.length})</h3>
            <div className="students-list">
              {students.length > 0 ? (
                students.slice(0, 5).map((student) => (
                  <div key={student.id} className="student-item">
                    <div className="student-info">
                      <h4>{student.name}</h4>
                      <p>{student.email}</p>
                    </div>
                    <button 
                      className="view-btn"
                      onClick={() => viewStudent(student.id)}
                    >
                      View Progress
                    </button>
                  </div>
                ))
              ) : (
                <p>No students assigned yet.</p>
              )}
              {students.length > 5 && (
                <button className="view-all-btn">
                  View All Students ({students.length})
                </button>
              )}
            </div>
          </div>

          {/* Classes Overview */}
          <div className="dashboard-card classes-card">
            <h3>My Classes ({classes.length})</h3>
            <div className="classes-list">
              {classes.length > 0 ? (
                classes.slice(0, 3).map((classItem) => (
                  <div key={classItem.id} className="class-item">
                    <h4>{classItem.name}</h4>
                    <p>{classItem.description}</p>
                    <p><strong>Students:</strong> {classItem.studentCount || 0}</p>
                    <p><strong>Status:</strong> {classItem.status}</p>
                  </div>
                ))
              ) : (
                <p>No classes created yet.</p>
              )}
            </div>
            <button className="create-class-btn" onClick={createClass}>
              Create New Class
            </button>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-card actions-card">
            <h3>Quick Actions</h3>
            <div className="quick-actions">
              <button className="action-btn" onClick={createClass}>
                Create Class
              </button>
              <button className="action-btn" onClick={scheduleSession}>
                Schedule Session
              </button>
              <button className="action-btn" onClick={viewReports}>
                View Reports
              </button>
              <button className="action-btn" onClick={manageContent}>
                Manage Content
              </button>
              <button className="action-btn wallet-btn" onClick={viewWallet}>
                My Wallet
              </button>
              <button className="action-btn" onClick={viewAssignments}>
                My Assignments
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div className="dashboard-card stats-card">
            <h3>Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{students.length}</span>
                <span className="stat-label">Total Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{classes.length}</span>
                <span className="stat-label">Active Classes</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {classes.filter(c => c.status === 'active').length}
                </span>
                <span className="stat-label">Ongoing Classes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard; 