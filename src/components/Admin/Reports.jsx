import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import "./AdminManagement.css";

const Reports = () => {
  const [reports, setReports] = useState({
    userStats: {},
    classStats: {},
    revenueStats: {},
    activityStats: {}
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('month');
  const navigate = useNavigate();

  useEffect(() => {
    generateReports();
  }, [dateRange]);

  const generateReports = async () => {
    try {
      // Fetch all users
      const usersSnapshot = await getDocs(collection(db, "users"));
      const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Fetch all classes
      const classesSnapshot = await getDocs(collection(db, "classes"));
      const classes = classesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Calculate user statistics
      const userStats = {
        total: users.length,
        students: users.filter(u => u.role === 'student').length,
        teachers: users.filter(u => u.role === 'teacher').length,
        admins: users.filter(u => u.role === 'admin').length,
        active: users.filter(u => u.isActive).length,
        inactive: users.filter(u => !u.isActive).length,
        newThisMonth: users.filter(u => {
          const userDate = new Date(u.createdAt);
          const now = new Date();
          return userDate.getMonth() === now.getMonth() && 
                 userDate.getFullYear() === now.getFullYear();
        }).length
      };

      // Calculate class statistics
      const classStats = {
        total: classes.length,
        active: classes.filter(c => c.status === 'active').length,
        inactive: classes.filter(c => c.status === 'inactive').length,
        totalStudents: classes.reduce((sum, c) => sum + (c.studentCount || 0), 0),
        averageStudents: classes.length > 0 ? 
          Math.round(classes.reduce((sum, c) => sum + (c.studentCount || 0), 0) / classes.length) : 0
      };

      // Calculate revenue statistics (mock data for now)
      const revenueStats = {
        totalRevenue: 150000,
        monthlyRevenue: 25000,
        averagePerClass: 5000,
        topPerformingClass: "Robotics Fundamentals"
      };

      // Calculate activity statistics
      const activityStats = {
        totalBookings: 45,
        completedSessions: 38,
        upcomingSessions: 7,
        averageSessionRating: 4.6
      };

      setReports({
        userStats,
        classStats,
        revenueStats,
        activityStats
      });
    } catch (error) {
      console.error("Error generating reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = (type) => {
    const data = {
      userStats: reports.userStats,
      classStats: reports.classStats,
      revenueStats: reports.revenueStats,
      activityStats: reports.activityStats,
      generatedAt: new Date().toISOString(),
      dateRange: dateRange
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `childtynker-report-${type}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Generating reports...</p>
      </div>
    );
  }

  return (
    <div className="admin-management">
      <div className="admin-header">
        <h1>Platform Reports</h1>
        <div className="header-actions">
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="date-range-select"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button onClick={() => exportReport('summary')} className="export-btn">
            Export Report
          </button>
          <button onClick={() => navigate('/dashboard/admin')} className="back-btn">
            ← Back to Dashboard
          </button>
        </div>
      </div>

      <div className="reports-grid">
        {/* User Statistics */}
        <div className="report-card">
          <h3>User Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{reports.userStats.total}</span>
              <span className="stat-label">Total Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{reports.userStats.students}</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{reports.userStats.teachers}</span>
              <span className="stat-label">Teachers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{reports.userStats.newThisMonth}</span>
              <span className="stat-label">New This Month</span>
            </div>
          </div>
          <div className="chart-placeholder">
            <p>📊 User Growth Chart</p>
            <p>Active: {reports.userStats.active} | Inactive: {reports.userStats.inactive}</p>
          </div>
        </div>

        {/* Class Statistics */}
        <div className="report-card">
          <h3>Class Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{reports.classStats.total}</span>
              <span className="stat-label">Total Classes</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{reports.classStats.active}</span>
              <span className="stat-label">Active Classes</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{reports.classStats.totalStudents}</span>
              <span className="stat-label">Total Students</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{reports.classStats.averageStudents}</span>
              <span className="stat-label">Avg per Class</span>
            </div>
          </div>
          <div className="chart-placeholder">
            <p>📈 Class Performance Chart</p>
            <p>Active: {reports.classStats.active} | Inactive: {reports.classStats.inactive}</p>
          </div>
        </div>

        {/* Revenue Statistics */}
        <div className="report-card">
          <h3>Revenue Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">₹{reports.revenueStats.totalRevenue.toLocaleString()}</span>
              <span className="stat-label">Total Revenue</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">₹{reports.revenueStats.monthlyRevenue.toLocaleString()}</span>
              <span className="stat-label">Monthly Revenue</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">₹{reports.revenueStats.averagePerClass.toLocaleString()}</span>
              <span className="stat-label">Avg per Class</span>
            </div>
          </div>
          <div className="chart-placeholder">
            <p>💰 Revenue Chart</p>
            <p>Top Class: {reports.revenueStats.topPerformingClass}</p>
          </div>
        </div>

        {/* Activity Statistics */}
        <div className="report-card">
          <h3>Activity Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{reports.activityStats.totalBookings}</span>
              <span className="stat-label">Total Bookings</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{reports.activityStats.completedSessions}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{reports.activityStats.upcomingSessions}</span>
              <span className="stat-label">Upcoming</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{reports.activityStats.averageSessionRating}/5</span>
              <span className="stat-label">Avg Rating</span>
            </div>
          </div>
          <div className="chart-placeholder">
            <p>📅 Activity Chart</p>
            <p>Completion Rate: {Math.round((reports.activityStats.completedSessions / reports.activityStats.totalBookings) * 100)}%</p>
          </div>
        </div>
      </div>

      {/* Detailed Reports */}
      <div className="detailed-reports">
        <h2>Detailed Analytics</h2>
        
        <div className="report-sections">
          <div className="report-section">
            <h3>User Growth Trends</h3>
            <div className="trend-chart">
              <div className="trend-item">
                <span>📈 Monthly Growth: +15%</span>
              </div>
              <div className="trend-item">
                <span>👥 Student Conversion: 78%</span>
              </div>
              <div className="trend-item">
                <span>🎓 Teacher Retention: 92%</span>
              </div>
            </div>
          </div>

          <div className="report-section">
            <h3>Class Performance</h3>
            <div className="performance-list">
              <div className="performance-item">
                <span className="class-name">Robotics Fundamentals</span>
                <span className="performance-stats">
                  Students: 25 | Rating: 4.8 | Revenue: ₹12,500
                </span>
              </div>
              <div className="performance-item">
                <span className="class-name">Coding Basics</span>
                <span className="performance-stats">
                  Students: 18 | Rating: 4.6 | Revenue: ₹9,000
                </span>
              </div>
              <div className="performance-item">
                <span className="class-name">IoT Mastery</span>
                <span className="performance-stats">
                  Students: 12 | Rating: 4.9 | Revenue: ₹15,000
                </span>
              </div>
            </div>
          </div>

          <div className="report-section">
            <h3>Platform Health</h3>
            <div className="health-metrics">
              <div className="metric-item">
                <span className="metric-label">System Uptime</span>
                <span className="metric-value success">99.9%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Response Time</span>
                <span className="metric-value success">0.2s</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Error Rate</span>
                <span className="metric-value success">0.1%</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">User Satisfaction</span>
                <span className="metric-value success">4.6/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 