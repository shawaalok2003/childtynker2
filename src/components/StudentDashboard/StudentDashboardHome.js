import React from 'react';

const StudentDashboardHome = ({ student }) => (
  <div>
    <h2>Welcome, {student.profile?.name || student.email}!</h2>
    <div className="dashboard-cards">
      <div className="dashboard-card">
        <h3>Wallet</h3>
        <p>₹{student.wallet || 0}</p>
      </div>
      <div className="dashboard-card">
        <h3>Courses</h3>
        <p>{student.enrolledCourses?.length || 0}</p>
      </div>
      <div className="dashboard-card">
        <h3>Quizzes</h3>
        <p>{student.quizzes?.length || 0}</p>
      </div>
    </div>
  </div>
);

export default StudentDashboardHome;