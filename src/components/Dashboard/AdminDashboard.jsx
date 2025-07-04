import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/config";
import "./Dashboard.css";

const AdminDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    totalRevenue: 0
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentClasses, setRecentClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        navigate('/login');
        return;
      }

      try {
        // Get admin data from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.role !== 'admin') {
            navigate('/login');
            return;
          }
          setUserData(userData);
        } else {
          navigate('/login');
          return;
        }

        // Get platform statistics
        await fetchPlatformStats();
        
        // Get recent users
        await fetchRecentUsers();
        
        // Get recent classes
        await fetchRecentClasses();

      } catch (error) {
        console.error("Error fetching admin data:", error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const fetchPlatformStats = async () => {
    try {
      // Get total students
      const studentsQuery = query(collection(db, "users"), where("role", "==", "student"));
      const studentsSnapshot = await getDocs(studentsQuery);
      
      // Get total teachers
      const teachersQuery = query(collection(db, "users"), where("role", "==", "teacher"));
      const teachersSnapshot = await getDocs(teachersQuery);
      
      // Get total classes
      const classesSnapshot = await getDocs(collection(db, "classes"));
      
      setStats({
        totalStudents: studentsSnapshot.size,
        totalTeachers: teachersSnapshot.size,
        totalClasses: classesSnapshot.size,
        totalRevenue: 0 // This would be calculated from payments/transactions
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchRecentUsers = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const usersList = usersSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentUsers(usersList);
    } catch (error) {
      console.error("Error fetching recent users:", error);
    }
  };

  const fetchRecentClasses = async () => {
    try {
      const classesSnapshot = await getDocs(collection(db, "classes"));
      const classesList = classesSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentClasses(classesList);
    } catch (error) {
      console.error("Error fetching recent classes:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.clear();
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const manageUsers = () => {
    navigate('/admin/users');
  };

  const manageClasses = () => {
    navigate('/admin/classes');
  };

  const viewReports = () => {
    navigate('/admin/reports');
  };

  const systemSettings = () => {
    navigate('/admin/settings');
  };

  const contentManagement = () => {
    navigate('/admin/content');
  };

  const paymentManagement = () => {
    navigate('/admin/payments');
  };

  const courseAllocation = () => {
    navigate('/admin/course-allocation');
  };

  const manageCourses = () => {
    navigate('/admin/courses');
  };

  const addSampleData = () => {
    navigate('/admin/add-sample-data');
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2>ChildTynker Admin</h2>
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
          <h1>Admin Dashboard</h1>
          <p>Manage the entire ChildTynker platform</p>
        </div>

        <div className="dashboard-grid">
          {/* Platform Statistics */}
          <div className="dashboard-card stats-overview">
            <h3>Platform Overview</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{stats.totalStudents}</span>
                <span className="stat-label">Total Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.totalTeachers}</span>
                <span className="stat-label">Total Teachers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{stats.totalClasses}</span>
                <span className="stat-label">Total Classes</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">₹{stats.totalRevenue.toLocaleString()}</span>
                <span className="stat-label">Total Revenue</span>
              </div>
            </div>
          </div>

          {/* Recent Users */}
          <div className="dashboard-card recent-users">
            <h3>Recent Users</h3>
            <div className="users-list">
              {recentUsers.map((user) => (
                <div key={user.id} className="user-item">
                  <div className="user-info">
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                    <span className={`role-badge ${user.role}`}>{user.role}</span>
                  </div>
                  <div className="user-date">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
            <button className="view-all-btn" onClick={manageUsers}>
              View All Users
            </button>
          </div>

          {/* Recent Classes */}
          <div className="dashboard-card recent-classes">
            <h3>Recent Classes</h3>
            <div className="classes-list">
              {recentClasses.map((classItem) => (
                <div key={classItem.id} className="class-item">
                  <h4>{classItem.name}</h4>
                  <p>{classItem.description}</p>
                  <div className="class-meta">
                    <span>Teacher: {classItem.teacherName}</span>
                    <span>Students: {classItem.studentCount || 0}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="view-all-btn" onClick={manageClasses}>
              View All Classes
            </button>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-card actions-card">
            <h3>Admin Actions</h3>
            <div className="quick-actions">
              <button className="action-btn" onClick={manageUsers}>
                Manage Users
              </button>
              <button className="action-btn" onClick={manageClasses}>
                Manage Classes
              </button>
              <button className="action-btn" onClick={manageCourses}>
                Manage Courses
              </button>
              <button className="action-btn" onClick={courseAllocation}>
                Course Allocation
              </button>
              <button className="action-btn" onClick={addSampleData}>
                Add Sample Data
              </button>
              <button className="action-btn" onClick={viewReports}>
                View Reports
              </button>
              <button className="action-btn" onClick={systemSettings}>
                System Settings
              </button>
              <button className="action-btn" onClick={contentManagement}>
                Content Management
              </button>
              <button className="action-btn" onClick={paymentManagement}>
                Payment Management
              </button>
            </div>
          </div>

          {/* System Health */}
          <div className="dashboard-card system-health">
            <h3>System Health</h3>
            <div className="health-indicators">
              <div className="health-item">
                <span className="health-label">Database</span>
                <span className="health-status online">Online</span>
              </div>
              <div className="health-item">
                <span className="health-label">Authentication</span>
                <span className="health-status online">Online</span>
              </div>
              <div className="health-item">
                <span className="health-label">Storage</span>
                <span className="health-status online">Online</span>
              </div>
              <div className="health-item">
                <span className="health-label">Analytics</span>
                <span className="health-status online">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 